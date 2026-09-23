import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getIntegrationPost } from "@/lib/integration/queries";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getIntegrationPost(id);
  return { title: post?.title || "Integration piece" };
}

export default async function IntegrationDetailPage({ params }: Props) {
  const { id } = await params;
  const post = await getIntegrationPost(id);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-14 md:px-8">
      <Link href="/integration" className="text-sm text-mist hover:text-fog">
        ← Gallery
      </Link>
      <p className="mt-6 text-xs font-medium text-muted">
        {post.type} · {post.author_name}
      </p>
      <h1 className="mt-3 font-display text-4xl text-fog">{post.title}</h1>
      <p className="mt-4 rounded-xl border border-line bg-moss/40 px-4 py-3 text-mist">
        <span className="text-xs font-medium text-ember">
          What this helped integrate
        </span>
        <span className="mt-2 block text-fog">{post.reflection}</span>
      </p>

      {post.type === "image" && post.media_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.media_url}
          alt={post.title}
          className="mt-8 w-full rounded-2xl border border-line"
        />
      ) : null}

      {post.type === "video" && post.media_url ? (
        <video
          controls
          src={post.media_url}
          className="mt-8 w-full rounded-2xl border border-line"
        />
      ) : null}

      {post.body ? (
        <div className="mt-8 whitespace-pre-wrap text-lg leading-relaxed text-fog">
          {post.body}
        </div>
      ) : null}

      {post.tags.length ? (
        <ul className="mt-10 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line px-3 py-1 text-xs text-mist"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      <form action={`/api/integration/${post.id}/report`} method="post" className="mt-12">
        <button type="submit" className="text-xs text-muted underline hover:text-danger">
          Flag for review
        </button>
      </form>
    </article>
  );
}
