import type { Metadata } from "next";
import Link from "next/link";
import { listIntegrationPosts } from "@/lib/integration/queries";
import { isSupabaseConfigured } from "@/lib/config";
import { getIntegrationPageContent } from "@/lib/content/integration-page";
import { getCurrentUserId } from "@/lib/entitlements";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const content = getIntegrationPageContent(locale);
  return {
    title: content.metaTitle,
    description: content.metaDescription,
  };
}

export default async function IntegrationPage() {
  const locale = await getLocale();
  const content = getIntegrationPageContent(locale);
  const posts = await listIntegrationPosts();
  const userId = await getCurrentUserId();
  const canCreate = Boolean(userId) && isSupabaseConfigured();

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-fog md:text-4xl">
          {content.title}
        </h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-mist md:text-base">
          {content.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
        <ul className="mt-8 space-y-5">
          {content.features.map((feature) => (
            <li key={feature.heading} className="text-sm md:text-base">
              <p className="font-semibold text-fog">{feature.heading}</p>
              <p className="mt-1 leading-relaxed text-mist">{feature.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-mist md:text-base">
          {content.closing.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8">
          {canCreate ? (
            <Link
              href="/integration/new"
              className="inline-flex rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-void"
            >
              {content.shareCta}
            </Link>
          ) : (
            <Link
              href="/auth/login?next=/integration/new"
              className="inline-flex rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-fog"
            >
              {content.signInCta}
            </Link>
          )}
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/integration/${post.id}`}
            className="group overflow-hidden rounded-3xl bg-void shadow-sm ring-1 ring-line transition hover:border-glow/50"
          >
            {post.type === "image" && post.media_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.media_url}
                alt=""
                className="aspect-[4/3] w-full object-cover opacity-90 transition group-hover:opacity-100"
              />
            ) : post.type === "video" && post.media_url ? (
              <div className="flex aspect-[4/3] items-center justify-center bg-moss/60 text-sm text-mist">
                Video piece
              </div>
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-moss to-deep px-6">
                <p className="line-clamp-5 font-display text-lg leading-snug text-fog">
                  {post.body?.slice(0, 140) || post.title}
                </p>
              </div>
            )}
            <div className="p-5">
              <p className="text-xs font-medium text-muted">
                {post.type} · {post.author_name}
              </p>
              <h2 className="mt-2 font-display text-xl text-fog group-hover:text-ember-bright">
                {post.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm text-mist">
                {post.reflection}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
