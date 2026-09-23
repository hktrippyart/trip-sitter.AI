import type { Metadata } from "next";
import Link from "next/link";
import {
  categoryLabels,
  resources,
  type ResourceCategory,
} from "@/lib/resources";

export const metadata: Metadata = {
  title: "Resources",
  description: "Curated harm-reduction and integration links.",
};

const order: ResourceCategory[] = [
  "knowledge",
  "testing",
  "integration",
  "crisis",
  "community",
];

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
      <p className="text-sm font-medium text-ember">
        Resources
      </p>
      <h1 className="mt-3 font-display text-4xl text-fog md:text-5xl">
        Harm reduction library
      </h1>
      <p className="mt-4 max-w-2xl text-mist">
        External pointers we trust as starting points — plus our own shop and
        integration hub. Always verify information for your context.
      </p>

      <div className="mt-12 space-y-12">
        {order.map((category) => {
          const items = resources.filter((r) => r.category === category);
          return (
            <section key={category}>
              <h2 className="font-display text-2xl text-glow">
                {categoryLabels[category]}
              </h2>
              <ul className="mt-5 grid gap-4 md:grid-cols-2">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-3xl bg-void shadow-sm ring-1 ring-line p-5"
                  >
                    <Link
                      href={item.url}
                      className="font-display text-xl text-fog hover:text-ember-bright"
                      {...(item.url.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {item.title}
                    </Link>
                    <p className="mt-2 text-sm leading-relaxed text-mist">
                      {item.blurb}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
