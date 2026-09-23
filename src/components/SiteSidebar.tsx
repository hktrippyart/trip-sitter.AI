"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary, sidebarNav, type Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

export function SiteSidebar({ locale }: Props) {
  const pathname = usePathname();
  const t = getDictionary(locale);

  return (
    <aside
      data-site-sidebar
      className="sticky top-0 flex h-svh w-44 shrink-0 flex-col overflow-y-auto border-r border-line bg-void/90 px-3 py-5 backdrop-blur-xl sm:w-52 md:w-60 md:px-4"
    >
      <nav aria-label="Main" className="flex flex-col gap-0.5">
        {sidebarNav.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`rounded-2xl px-3 py-2.5 text-sm font-medium leading-snug transition ${
                active
                  ? "bg-moss text-fog"
                  : "text-mist hover:bg-deep hover:text-fog"
              }`}
            >
              {t.nav[item.key]}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
