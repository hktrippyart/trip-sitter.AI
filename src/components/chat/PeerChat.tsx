"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { toTraditionalHant } from "@/lib/i18n/simplified-to-traditional";
import { getChatCopy, getTrainingChatCopy } from "@/lib/chat/ui-copy";
import { ChatDisclaimerModal } from "@/components/chat/ChatDisclaimerModal";
import { chatDisclaimerStorageKey } from "@/lib/chat/disclaimer";
import { parseTrainingModuleComplete } from "@/lib/chat/training-module-complete";
import { getTrainingBasicsModuleOpening } from "@/lib/chat/training-module-copy";
import type { TrainingTrackSlug } from "@/lib/training/product-keys";
import type { PeerBasicsSlug } from "@/lib/training/progress";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Props = {
  locale: Locale;
  /** Home peer support vs paid training coach */
  mode?: "peer" | "training";
  trainingTrack?: TrainingTrackSlug;
  /** Fill parent flex column (training page with footer) */
  fillParent?: boolean;
  /** Current Peer Support Basics module (modules 1–5) */
  trainingBasicsModule?: PeerBasicsSlug | null;
  /** Fired when the coach signals module completion in chat */
  onTrainingModuleComplete?: (
    basicsModule: PeerBasicsSlug,
  ) => void | Promise<void>;
};

export function PeerChat({
  locale,
  mode = "peer",
  trainingTrack = "peer-basics",
  fillParent = false,
  trainingBasicsModule = null,
  onTrainingModuleComplete,
}: Props) {
  const disclaimerKey = chatDisclaimerStorageKey(
    locale,
    mode,
    trainingTrack,
  );
  const t =
    mode === "training"
      ? getTrainingChatCopy(locale, trainingTrack)
      : getChatCopy(locale);
  const openingMessage =
    mode === "training" &&
    trainingTrack === "peer-basics" &&
    trainingBasicsModule
      ? getTrainingBasicsModuleOpening(locale, trainingBasicsModule)
      : t.openingMessage;
  const [accepted, setAccepted] = useState(false);
  const [disclaimerChecked, setDisclaimerChecked] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(disclaimerKey) === "1";
      setAccepted(stored);
      setShowDisclaimer(!stored);
      if (!stored) {
        setDisclaimerChecked(false);
      }
    } catch {
      setAccepted(false);
      setShowDisclaimer(true);
      setDisclaimerChecked(false);
    }
  }, [disclaimerKey]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  useEffect(() => {
    if (!accepted) return;
    setMessages([
      {
        id: `opening-assistant-${trainingBasicsModule ?? "default"}`,
        role: "assistant",
        content:
          locale === "zh-Hant"
            ? toTraditionalHant(openingMessage)
            : openingMessage,
      },
    ]);
  }, [accepted, locale, openingMessage, trainingBasicsModule]);

  function acceptDisclaimer() {
    if (!disclaimerChecked) return;
    try {
      sessionStorage.setItem(disclaimerKey, "1");
    } catch {
      // ignore
    }
    setAccepted(true);
    setShowDisclaimer(false);
    requestAnimationFrame(() => textareaRef.current?.focus());
  }

  function declineDisclaimer() {
    window.location.href = "/about";
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    setError(null);
    setInput("");
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
    };
    const assistantId = `a-${Date.now()}`;
    const basicsModuleAtSend = trainingBasicsModule;
    const nextMessages = [...messages, userMsg];
    setMessages([
      ...nextMessages,
      { id: assistantId, role: "assistant", content: "" },
    ]);
    setStreaming(true);

    try {
      const endpoint =
        mode === "training" ? "/api/training/chat" : "/api/chat";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
          ...(mode === "training"
            ? {
                track: trainingTrack,
                ...(trainingTrack === "peer-basics" && trainingBasicsModule
                  ? { basicsModule: trainingBasicsModule }
                  : {}),
              }
            : {}),
        }),
      });

      if (res.status === 403) {
        throw new Error("FORBIDDEN");
      }

      if (res.status === 503) {
        throw new Error("CONFIG");
      }
      if (!res.ok) {
        let detail = "";
        try {
          const data = (await res.json()) as { error?: string };
          detail = data.error || "";
        } catch {
          // ignore
        }
        console.error("chat api error", res.status, detail);
        throw new Error("GENERIC");
      }
      if (!res.body) {
        throw new Error("GENERIC");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assembled = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() || "";

        for (const part of parts) {
          const line = part
            .split("\n")
            .map((l) => l.trim())
            .find((l) => l.startsWith("data:"));
          if (!line) continue;
          const payload = line.slice(5).trim();
          if (payload === "[DONE]") continue;
          try {
            const json = JSON.parse(payload) as {
              text?: string;
              error?: string;
            };
            if (json.error) throw new Error(json.error);
            if (json.text) {
              assembled += json.text;
              let snapshot = assembled;
              if (locale === "zh-Hant") {
                snapshot = toTraditionalHant(snapshot);
              }
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, content: snapshot } : m,
                ),
              );
            }
          } catch (err) {
            if (err instanceof SyntaxError) continue;
            throw err;
          }
        }
      }

      let assembledOut = assembled;
      if (locale === "zh-Hant") {
        assembledOut = toTraditionalHant(assembledOut);
      }

      const { displayText, shouldComplete } = parseTrainingModuleComplete(
        assembledOut,
        basicsModuleAtSend,
      );

      if (!displayText.trim()) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: t.errorGeneric }
              : m,
          ),
        );
      } else if (displayText !== assembled) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: displayText } : m,
          ),
        );
      }

      if (
        shouldComplete &&
        mode === "training" &&
        trainingTrack === "peer-basics" &&
        onTrainingModuleComplete &&
        basicsModuleAtSend
      ) {
        await onTrainingModuleComplete(basicsModuleAtSend);
      }
    } catch (err) {
      const code = err instanceof Error ? err.message : "GENERIC";
      if (code === "FORBIDDEN") {
        setError(
          locale === "zh-Hant"
            ? "需要有效訂閱。請返回訓練頁面訂閱或登入。"
            : "Active subscription required. Return to training to subscribe or sign in.",
        );
      } else {
        setError(code === "CONFIG" ? t.errorConfig : t.errorGeneric);
      }
      setMessages((prev) =>
        prev.filter((m) => m.id !== assistantId || m.content.trim()),
      );
    } finally {
      setStreaming(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    void sendMessage(input);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage(input);
    }
  }

  const chatLocked = !accepted;

  return (
    <div
      className={`relative flex flex-col ${
        fillParent ? "min-h-0 flex-1" : "h-[calc(100svh-7.5rem)]"
      }`}
    >
      <ChatDisclaimerModal
        locale={locale}
        open={showDisclaimer && !accepted}
        checked={disclaimerChecked}
        onCheckedChange={setDisclaimerChecked}
        onAccept={acceptDisclaimer}
        onDecline={declineDisclaimer}
      />

      <div className="border-b border-line bg-moss/60 px-4 py-2.5 text-center text-xs font-medium text-fog md:text-sm">
        {t.crisisStrip}{" "}
        <a
          href="https://findahelpline.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ember underline-offset-2 hover:underline"
        >
          findahelpline.com
        </a>
      </div>

      <>
          <div
            className={`flex-1 overflow-y-auto px-4 py-6 md:px-8 ${chatLocked ? "pointer-events-none select-none opacity-40" : ""}`}
            aria-hidden={chatLocked}
          >
            <div className="mx-auto flex max-w-2xl flex-col gap-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col gap-1 ${
                    m.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <span className="text-xs font-medium text-muted">
                    {m.role === "user" ? t.you : t.assistant}
                  </span>
                  <div
                    className={`max-w-[90%] whitespace-pre-wrap rounded-3xl px-4 py-3 text-sm leading-relaxed md:text-base ${
                      m.role === "user"
                        ? "bg-ember text-void"
                        : "bg-void text-fog shadow-sm ring-1 ring-line"
                    }`}
                  >
                    {m.content || (streaming ? "…" : "")}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </div>

          <div
            className={`border-t border-line bg-void/90 px-4 py-3 backdrop-blur-md md:px-8 ${chatLocked ? "pointer-events-none opacity-40" : ""}`}
          >
            <form
              onSubmit={onSubmit}
              className="mx-auto flex max-w-2xl items-end gap-2"
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                disabled={streaming || chatLocked}
                placeholder={t.placeholder}
                className="max-h-40 min-h-[44px] flex-1 resize-none rounded-3xl bg-deep px-4 py-3 text-sm text-fog outline-none ring-1 ring-line focus:ring-ember/40 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={streaming || chatLocked || !input.trim()}
                className="shrink-0 rounded-full bg-ember px-5 py-3 text-sm font-semibold text-void transition hover:bg-ember-bright disabled:opacity-40"
              >
                {streaming ? t.sending : t.send}
              </button>
            </form>
            {error ? (
              <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-danger">
                {error}
              </p>
            ) : null}
          </div>
        </>
    </div>
  );
}
