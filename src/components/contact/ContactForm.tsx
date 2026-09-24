"use client";

import { FormEvent, useState } from "react";
import type { ContactContent } from "@/lib/content/contact";

type Props = {
  copy: ContactContent["form"];
  formEnabled: boolean;
};

export function ContactForm({ copy, formEnabled }: Props) {
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorText, setErrorText] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!formEnabled) {
      setStatus("error");
      setErrorText(copy.errorUnavailable);
      return;
    }

    setStatus("loading");
    setErrorText(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, title, message }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
      };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorText(
          data.code === "unavailable" ? copy.errorUnavailable : copy.errorGeneric,
        );
        return;
      }

      setStatus("success");
      setEmail("");
      setTitle("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorText(copy.errorGeneric);
    }
  }

  const fieldClass =
    "w-full rounded-xl border border-line bg-void/60 px-3 py-2.5 text-fog outline-none placeholder:text-muted focus:border-glow";
  const labelClass = "text-sm font-medium text-fog";

  if (status === "success") {
    return (
      <p className="rounded-3xl bg-void p-6 text-base leading-relaxed text-mist ring-1 ring-line md:p-8">
        {copy.success}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="contact-email" className={labelClass}>
          {copy.emailLabel}
        </label>
        <input
          id="contact-email"
          type="email"
          required
          autoComplete="email"
          disabled={!formEnabled || status === "loading"}
          placeholder={copy.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-title" className={labelClass}>
          {copy.titleLabel}
        </label>
        <input
          id="contact-title"
          type="text"
          required
          maxLength={200}
          disabled={!formEnabled || status === "loading"}
          placeholder={copy.titlePlaceholder}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-message" className={labelClass}>
          {copy.messageLabel}
        </label>
        <textarea
          id="contact-message"
          required
          rows={8}
          maxLength={8000}
          disabled={!formEnabled || status === "loading"}
          placeholder={copy.messagePlaceholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${fieldClass} resize-y min-h-[10rem]`}
        />
      </div>

      {errorText ? <p className="text-sm text-danger">{errorText}</p> : null}

      <button
        type="submit"
        disabled={!formEnabled || status === "loading"}
        className="rounded-full bg-ember px-8 py-2.5 text-sm font-semibold text-void disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? copy.submitting : copy.submit}
      </button>
    </form>
  );
}
