import type { Metadata } from "next";
import { PeerChat } from "@/components/chat/PeerChat";
import { getLocale } from "@/lib/locale";

export const metadata: Metadata = {
  title: "trip-sitter.AI",
  description:
    "Anonymous online peer support for intense emotional experiences and altered states — not medical care.",
};

export default async function HomePage() {
  const locale = await getLocale();
  return <PeerChat key={locale} locale={locale} />;
}
