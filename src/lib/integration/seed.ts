export type IntegrationPost = {
  id: string;
  type: "text" | "image" | "video";
  title: string;
  reflection: string;
  body: string | null;
  media_url: string | null;
  tags: string[];
  author_name: string;
  published_at: string;
};

/** Seed pieces shown when Supabase is empty / not configured. */
export const seedIntegrationPosts: IntegrationPost[] = [
  {
    id: "seed-ink-tide",
    type: "text",
    title: "Letter to the morning after",
    reflection:
      "Writing settled the leftover awe so it didn’t turn into rumination.",
    body: "You don’t have to explain the colors to anyone.\nDrink water. Name one ordinary thing you love.\nThe insight can wait until your hands stop humming.",
    media_url: null,
    tags: ["integration", "writing"],
    author_name: "Archive",
    published_at: "2026-03-01T12:00:00.000Z",
  },
  {
    id: "seed-moss-study",
    type: "image",
    title: "Moss study #3",
    reflection:
      "Painting slow green fields helped my body remember the calm that arrived near the end.",
    body: null,
    media_url:
      "data:image/svg+xml," +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop stop-color="#1c332c"/>
              <stop offset="0.55" stop-color="#6fbfa8"/>
              <stop offset="1" stop-color="#e59a6d"/>
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="#0a1210"/>
          <circle cx="420" cy="280" r="220" fill="url(#g)" opacity="0.85"/>
          <path d="M40 480 C 200 400, 320 520, 760 420" stroke="#d4e0d8" stroke-width="3" fill="none" opacity="0.5"/>
        </svg>`,
      ),
    tags: ["integration", "visual"],
    author_name: "Archive",
    published_at: "2026-03-08T15:00:00.000Z",
  },
  {
    id: "seed-breath-score",
    type: "text",
    title: "Four bars of breath",
    reflection:
      "A tiny score I hummed while washing dishes — creative integration doesn’t need a gallery.",
    body: "In for four / hold the kettle’s click / out for six / name the tile color.\nRepeat until the kitchen is just a kitchen again.",
    media_url: null,
    tags: ["integration", "music", "somatic"],
    author_name: "Archive",
    published_at: "2026-03-14T09:30:00.000Z",
  },
];
