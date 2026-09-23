"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getDisclaimerContent } from "@/lib/chat/disclaimer";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  open: boolean;
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
  onAccept: () => void;
  onDecline: () => void;
};

const SCROLL_END_TOLERANCE_PX = 48;

function readScrollEnd(el: HTMLElement): boolean {
  const remaining = el.scrollHeight - el.scrollTop - el.clientHeight;
  const noOverflow = el.scrollHeight - el.clientHeight <= SCROLL_END_TOLERANCE_PX;
  return noOverflow || remaining <= SCROLL_END_TOLERANCE_PX;
}

export function ChatDisclaimerModal({
  locale,
  open,
  checked,
  onCheckedChange,
  onAccept,
  onDecline,
}: Props) {
  const d = getDisclaimerContent(locale);
  const [mounted, setMounted] = useState(false);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const scrollCleanupRef = useRef<(() => void) | null>(null);
  const onCheckedChangeRef = useRef(onCheckedChange);
  onCheckedChangeRef.current = onCheckedChange;

  const syncScrollEnd = useCallback((el: HTMLElement) => {
    const atEnd = readScrollEnd(el);
    setHasScrolledToEnd(atEnd);
    if (!atEnd) {
      onCheckedChangeRef.current(false);
    }
  }, []);

  const bindScrollContainer = useCallback(
    (node: HTMLDivElement | null) => {
      scrollCleanupRef.current?.();
      scrollCleanupRef.current = null;
      if (!node || !open) return;

      const onScroll = () => syncScrollEnd(node);
      onScroll();
      node.addEventListener("scroll", onScroll, { passive: true });
      const ro =
        typeof ResizeObserver !== "undefined"
          ? new ResizeObserver(onScroll)
          : null;
      ro?.observe(node);

      scrollCleanupRef.current = () => {
        node.removeEventListener("scroll", onScroll);
        ro?.disconnect();
      };
    },
    [open, syncScrollEnd],
  );

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prevOverflow = document.body.style.overflow;
    root.dataset.disclaimerOpen = "true";
    document.body.style.overflow = "hidden";
    return () => {
      delete root.dataset.disclaimerOpen;
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open) {
      setHasScrolledToEnd(false);
      return;
    }
    setHasScrolledToEnd(false);
    onCheckedChangeRef.current(false);
  }, [open, locale]);

  useLayoutEffect(() => {
    return () => {
      scrollCleanupRef.current?.();
      scrollCleanupRef.current = null;
    };
  }, []);

  if (!open || !mounted) return null;

  const canAgree = hasScrolledToEnd && checked;

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] isolate"
      role="presentation"
      aria-hidden={false}
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-[#202124]/55"
        onClick={onDecline}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 sm:p-6">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="disclaimer-title"
          className="pointer-events-auto flex h-[min(calc(100dvh-2rem),820px)] max-h-[min(calc(100dvh-2rem),820px)] w-full max-w-2xl min-h-0 flex-col overflow-hidden rounded-3xl bg-void shadow-2xl ring-1 ring-line md:max-w-3xl"
        >
          <div className="shrink-0 border-b border-line px-5 py-4 sm:px-6">
            <p className="text-xs font-medium text-muted">trip-sitter.AI</p>
            <h2
              id="disclaimer-title"
              className="mt-1 text-lg font-semibold leading-snug text-fog"
            >
              {d.documents[0]?.title}
            </h2>
          </div>

          <div className="relative min-h-0 flex-1 overflow-hidden">
            <div
              ref={bindScrollContainer}
              className="h-full min-h-0 overflow-y-auto overscroll-contain px-5 py-4 text-sm leading-relaxed text-mist sm:px-6"
            >
              {d.documents.map((doc, docIndex) => (
                <article
                  key={doc.title}
                  className={docIndex > 0 ? "mt-8 border-t border-line pt-8" : ""}
                >
                  {docIndex > 0 ? (
                    <h2 className="text-base font-semibold text-fog">{doc.title}</h2>
                  ) : null}
                  {doc.intro ? (
                    <p className={`text-fog/90 ${docIndex > 0 ? "mt-2" : "mt-3"}`}>
                      {doc.intro}
                    </p>
                  ) : null}
                  {doc.blocks.map((block) => (
                    <section key={block.id} className="mt-5">
                      <h3 className="font-semibold text-fog">{block.heading}</h3>
                      {block.paragraphs.map((p, i) => (
                        <p key={`${block.id}-p-${i}`} className="mt-2">
                          {p}
                        </p>
                      ))}
                      {block.bullets?.length ? (
                        <ul className="mt-2 list-disc space-y-1.5 pl-5">
                          {block.bullets.map((b, i) => (
                            <li key={`${block.id}-b-${i}`}>{b}</li>
                          ))}
                        </ul>
                      ) : null}
                    </section>
                  ))}
                </article>
              ))}
              <div className="h-6 w-full shrink-0" aria-hidden />
            </div>
            {!hasScrolledToEnd ? (
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-void via-void/90 to-transparent"
                aria-hidden
              />
            ) : null}
          </div>

          <div className="shrink-0 border-t border-line bg-deep/80 px-5 py-4 sm:px-6">
            <label
              className={`flex items-start gap-3 ${hasScrolledToEnd ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}
            >
              <input
                type="checkbox"
                checked={checked}
                disabled={!hasScrolledToEnd}
                onChange={(e) => onCheckedChange(e.target.checked)}
                className="mt-1 size-4 shrink-0 rounded border-line text-ember focus:ring-ember disabled:cursor-not-allowed"
              />
              <span className="text-sm text-fog">{d.checkbox}</span>
            </label>
            <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onDecline}
                className="rounded-full px-5 py-2.5 text-sm font-medium text-mist ring-1 ring-line hover:bg-void"
              >
                {d.decline}
              </button>
              <button
                type="button"
                disabled={!canAgree}
                onClick={onAccept}
                className="rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-void transition hover:bg-ember-bright disabled:cursor-not-allowed disabled:opacity-40"
              >
                {d.accept}
              </button>
            </div>
            {!hasScrolledToEnd ? (
              <p className="mt-2 text-center text-xs text-muted sm:text-right">
                {d.scrollHint}
              </p>
            ) : !checked ? (
              <p className="mt-2 text-center text-xs text-muted sm:text-right">
                {d.declineNote}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
