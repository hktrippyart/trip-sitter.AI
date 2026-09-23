import type { Metadata } from "next";
import Link from "next/link";
import { listIntegrationPosts } from "@/lib/integration/queries";
import { isSupabaseConfigured } from "@/lib/config";
import { getCurrentUserId } from "@/lib/entitlements";

export const metadata: Metadata = {
  title: "Creative Integration",
  description:
    "Share image, text, and video that help metabolize post-psychedelic experience.",
};

export default async function IntegrationPage() {
  const posts = await listIntegrationPosts();
  const userId = await getCurrentUserId();
  const canCreate = Boolean(userId) && isSupabaseConfigured();

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-ember">Creative Integration</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl text-fog md:text-5xl">
            After the wave, make something
          </h1>
          <p className="mt-4 max-w-2xl text-mist">
            Integration isn’t only talking. Image, writing, and video can help
            meaning land in the body. Share the piece — and what it helped
            settle.
          </p>
        </div>
        {canCreate ? (
          <Link
            href="/integration/new"
            className="rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-void"
          >
            Share a piece
          </Link>
        ) : (
          <Link
            href="/auth/login?next=/integration/new"
            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-fog"
          >
            Sign in to share
          </Link>
        )}
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
