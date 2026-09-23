import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { z } from "zod";
import {
  buildSitterSystemPrompt,
  crisisResponse,
  detectHardCrisis,
  resolveReplyLocale,
} from "@/lib/chat/sitter-prompt";
import { isLocale, type Locale } from "@/lib/i18n";
import { toTraditionalHant } from "@/lib/i18n/simplified-to-traditional";

export const runtime = "nodejs";
export const maxDuration = 60;

const bodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(8000),
      }),
    )
    .min(1)
    .max(40),
  locale: z.string().optional(),
});

function getLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : "en";
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not configured" },
      { status: 503 },
    );
  }

  let parsed: z.infer<typeof bodySchema>;
  try {
    parsed = bodySchema.parse(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const uiLocale = getLocale(parsed.locale);
  const history = parsed.messages.slice(-20);
  const lastUser = [...history].reverse().find((m) => m.role === "user");
  const userTexts = history
    .filter((m) => m.role === "user")
    .map((m) => m.content);
  const assistantTexts = history
    .filter((m) => m.role === "assistant")
    .map((m) => m.content);
  const replyLocale = resolveReplyLocale(uiLocale, userTexts, {
    assistantMessagesInOrder: assistantTexts,
  });

  if (lastUser && detectHardCrisis(lastUser.content)) {
    let text = crisisResponse(replyLocale);
    if (replyLocale === "zh-Hant") {
      text = toTraditionalHant(text);
    }
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ text })}\n\n`),
        );
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  }

  const model =
    process.env.GEMINI_MODEL_NAME?.trim() || "gemini-3.6-flash";
  const ai = new GoogleGenAI({ apiKey });

  const lastAssistant = assistantTexts[assistantTexts.length - 1]?.trim();
  const continuingChinese =
    replyLocale === "zh-Hant" &&
    lastAssistant &&
    /[\u4e00-\u9fff]/.test(lastAssistant);

  const languageAnchor =
    replyLocale === "zh-Hant"
      ? continuingChinese
        ? "[Language lock: Your last reply was Chinese. Continue in 繁體中文 — do NOT switch to English for this turn.]"
        : "[Language lock: Traditional Chinese only for this turn unless they asked for English.]"
      : "[Language lock: English only for this turn unless they asked for Chinese.]";

  const contents = history.map((m) => {
    const text =
      m.role === "user" ? `${languageAnchor}\n\n${m.content}` : m.content;
    return {
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text }],
    };
  });

  try {
    const result = await ai.models.generateContentStream({
      model,
      contents,
      config: {
        systemInstruction: buildSitterSystemPrompt(replyLocale),
        temperature: 0.75,
        maxOutputTokens: 4096,
      },
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result) {
            const text = chunk.text;
            if (text) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text })}\n\n`),
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Generation failed";
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: message })}\n\n`,
            ),
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("Gemini chat error", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Chat failed" },
      { status: 502 },
    );
  }
}
