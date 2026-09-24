import type { NewsArticleSection } from "@/lib/content/news/load-article";

function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  if (parts.length === 1) {
    return <>{text}</>;
  }
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={`${part.slice(0, 12)}-${i}`} className="font-semibold text-fog">
            {part}
          </strong>
        ) : (
          <span key={`${part.slice(0, 12)}-${i}`}>{part}</span>
        ),
      )}
    </>
  );
}

export function ArticleBody({ sections }: { sections: NewsArticleSection[] }) {
  return (
    <div className="mt-10 space-y-12">
      {sections.map((section) => (
        <section key={section.heading} className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight text-fog md:text-2xl">
            {section.heading}
          </h2>
          {section.blocks.map((block, i) =>
            block.type === "paragraph" ? (
              <p
                key={`${section.heading}-p-${i}`}
                className="text-base leading-relaxed text-mist"
              >
                <RichText text={block.text} />
              </p>
            ) : (
              <ul
                key={`${section.heading}-ul-${i}`}
                className="list-disc space-y-2 pl-5 text-base leading-relaxed text-mist"
              >
                {block.items.map((item) => (
                  <li key={item.slice(0, 48)}>
                    <RichText text={item} />
                  </li>
                ))}
              </ul>
            ),
          )}
        </section>
      ))}
    </div>
  );
}
