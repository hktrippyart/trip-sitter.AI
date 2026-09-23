"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function IntegrationComposer() {
  const router = useRouter();
  const [type, setType] = useState<"text" | "image" | "video">("text");
  const [title, setTitle] = useState("");
  const [reflection, setReflection] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("integration");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const form = new FormData();
      form.set("type", type);
      form.set("title", title);
      form.set("reflection", reflection);
      form.set("body", body);
      form.set("tags", tags);
      if (file) form.set("file", file);

      const res = await fetch("/api/integration", {
        method: "POST",
        body: form,
      });
      const data = (await res.json()) as { id?: string; error?: string };
      if (!res.ok || !data.id) {
        throw new Error(data.error || "Could not publish");
      }
      router.push(`/integration/${data.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not publish");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-3xl bg-void shadow-sm ring-1 ring-line p-6">
      <div>
        <label className="text-xs font-medium text-muted">
          Medium
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {(["text", "image", "video"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setType(option)}
              className={`rounded-full px-4 py-1.5 text-sm capitalize ${
                type === option
                  ? "bg-glow text-void"
                  : "border border-line text-mist"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <Field label="Title">
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-line bg-void/60 px-3 py-2 text-fog outline-none focus:border-glow"
          placeholder="What did you make?"
        />
      </Field>

      <Field label="What this helped integrate">
        <textarea
          required
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          rows={3}
          className="w-full rounded-xl border border-line bg-void/60 px-3 py-2 text-fog outline-none focus:border-glow"
          placeholder="A short reflection — feeling, theme, or shift after the experience."
        />
      </Field>

      {type === "text" ? (
        <Field label="Piece">
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={8}
            className="w-full rounded-xl border border-line bg-void/60 px-3 py-2 text-fog outline-none focus:border-glow"
            placeholder="Poem, journal excerpt, letter to self…"
          />
        </Field>
      ) : (
        <Field label={type === "image" ? "Image file" : "Video file"}>
          <input
            required
            type="file"
            accept={type === "image" ? "image/*" : "video/*"}
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="w-full text-sm text-mist file:mr-3 file:rounded-full file:border-0 file:bg-moss file:px-4 file:py-2 file:text-fog"
          />
        </Field>
      )}

      <Field label="Tags (comma-separated)">
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full rounded-xl border border-line bg-void/60 px-3 py-2 text-fog outline-none focus:border-glow"
        />
      </Field>

      {error ? <p className="text-sm text-danger">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-void disabled:opacity-60"
      >
        {loading ? "Publishing…" : "Share integration piece"}
      </button>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-medium text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}
