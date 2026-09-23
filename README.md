# trip-sitter.AI

Phase 1 site for [trip-sitter.AI](https://trip-sitter.ai): anonymous AI peer-support chat, paid trip-sitter training, creative integration sharing, curated harm-reduction resources, and a small Stripe shop.

## Stack

- Next.js (App Router) + TypeScript + Tailwind
- Google Gemini (`GEMINI_API_KEY`) for the peer-support chat on `/`
- Supabase (Auth, Postgres, Storage)
- Stripe Checkout + webhooks
- Vercel hosting

## Local development

```bash
export PATH="$HOME/.local/node/bin:$PATH"   # if needed
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Set `GEMINI_API_KEY` for the home-tab chat. Without Supabase/Stripe env vars, other pages still render; course unlock and checkout need real credentials.

To preview lesson decks without paying:

```bash
DEMO_UNLOCK_COURSE=true
```

## Peer-support chat

- UI: `/` (nav label `trip-sitter.AI`)
- API: `POST /api/chat` (SSE stream)
- Curriculum SOPs: [`content/curriculum/`](content/curriculum/) (Modules 1–5)
- Crisis phrases short-circuit to a fixed emergency response

## Supabase setup

1. Create a project and run [`supabase/schema.sql`](supabase/schema.sql) in the SQL editor.
2. Create a **public** Storage bucket named `integration-media`.
3. Add Auth URL config for `http://localhost:3000/auth/callback` and your production callback.
4. Copy URL, anon key, and service role key into `.env.local`.

## Stripe setup

1. Create Products + Prices for: Online Trip-Sitter Training, Grounded Anchor Tee, Starter Reagent Test Kit.
2. Put Price IDs in `STRIPE_PRICE_COURSE`, `STRIPE_PRICE_TEE`, `STRIPE_PRICE_TEST_KIT`.
3. Point a webhook to `/api/webhook/stripe` for `checkout.session.completed`.
4. Use the webhook signing secret as `STRIPE_WEBHOOK_SECRET`.

## Deploy (Vercel)

```bash
npx vercel --prod
```

Set env vars in the Vercel project (at minimum `GEMINI_API_KEY`, `NEXT_PUBLIC_APP_URL=https://trip-sitter.ai`). Point `trip-sitter.ai` DNS to Vercel if not already.

## Content notes

Peer-support SOPs are adapted from peer harm-reduction curriculum (ethics, co-regulation, triage, integration boundaries). The chat is educational peer support only — not medical care.
