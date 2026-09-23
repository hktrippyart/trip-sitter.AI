"use client";

import { useCallback, useEffect, useState } from "react";
import type { Slide } from "@/lib/training/types";

type Props = {
  title: string;
  slides: Slide[];
  moduleSlug?: string;
  onCompleteModule?: () => void;
};

export function LessonDeck({
  title,
  slides,
  moduleSlug,
  onCompleteModule,
}: Props) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const total = slides.length;

  const go = useCallback(
    (next: number) => {
      setIndex(Math.max(0, Math.min(total - 1, next)));
    },
    [total],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (["ArrowRight", " ", "PageDown"].includes(e.key)) {
        e.preventDefault();
        go(index + 1);
      }
      if (["ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        go(index - 1);
      }
      if (e.key === "Home") go(0);
      if (e.key === "End") go(total - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, total]);

  if (!slide) return null;

  return (
    <div className="flex min-h-[70vh] flex-col overflow-hidden rounded-3xl bg-void shadow-sm ring-1 ring-line">
      <div className="flex items-center justify-between border-b border-line px-5 py-3 text-xs font-medium text-muted">
        <span>{title}</span>
        <span>
          {index + 1} / {total}
        </span>
      </div>

      <div
        className="relative flex flex-1 cursor-pointer flex-col p-6 md:p-10"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          if (x < rect.width / 2) go(index - 1);
          else go(index + 1);
        }}
      >
        <div key={index} className="deck-slide-enter flex flex-1 flex-col">
          <p className="text-sm font-medium text-ember">{slide.kicker}</p>
          <h2
            className={`mt-3 font-semibold leading-[1.15] tracking-tight text-fog ${
              slide.layout === "title"
                ? "text-3xl md:text-4xl"
                : "text-2xl md:text-3xl"
            }`}
          >
            {slide.title}
          </h2>
          {slide.body ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist md:text-lg">
              {slide.body}
            </p>
          ) : null}

          {slide.points ? (
            <ul className="mt-6 max-w-2xl space-y-3">
              {slide.points.map((point) => (
                <li
                  key={point}
                  className="border-l-2 border-glow/50 pl-4 text-sm leading-relaxed text-fog md:text-base"
                >
                  {point}
                </li>
              ))}
            </ul>
          ) : null}

          {slide.columns ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {slide.columns.map((col) => (
                <div
                  key={col.heading}
                  className="rounded-2xl bg-deep p-4 ring-1 ring-line"
                >
                  <h3 className="text-base font-semibold text-ember">
                    {col.heading}
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-mist">
                    {col.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}

          {slide.punch ? (
            <div className="mt-auto pt-8">
              <p className="rounded-2xl bg-deep px-4 py-3 text-base font-medium text-fog md:text-lg">
                {slide.punch}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="border-t border-line px-5 py-3">
        <div className="mb-3 h-1 overflow-hidden rounded-full bg-moss">
          <div
            className="h-full rounded-full bg-ember transition-all duration-300"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            className="rounded-full border border-line px-4 py-2 text-sm text-mist disabled:opacity-30"
          >
            Previous
          </button>
          <p className="hidden text-xs text-muted sm:block">
            Click sides or use arrow keys
          </p>
          {index === total - 1 && onCompleteModule ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onCompleteModule();
              }}
              className="rounded-full bg-ember px-4 py-2 text-sm font-semibold text-void"
            >
              Mark module complete
            </button>
          ) : (
            <button
              type="button"
              onClick={() => go(index + 1)}
              disabled={index === total - 1}
              className="rounded-full bg-ember px-4 py-2 text-sm font-semibold text-void disabled:opacity-30"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
