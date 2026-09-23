import { Manrope } from "next/font/google";
import type { Metadata } from "next";
import { SiteChrome } from "@/components/SiteChrome";
import { htmlLang } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans-face",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "trip-sitter.AI",
    template: "%s · trip-sitter.AI",
  },
  description:
    "Peer trip-sitting skills training, creative integration sharing, and harm-reduction resources.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://trip-sitter.ai",
  ),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={htmlLang(locale)} className={`${manrope.variable} h-full`}>
      <body className="atmosphere flex min-h-full flex-col antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
