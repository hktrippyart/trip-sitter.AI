import { AuthStatus } from "@/components/AuthStatus";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { SiteSidebar } from "@/components/SiteSidebar";
import { getT } from "@/lib/locale";

export async function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale, t } = await getT();

  return (
    <div className="flex min-h-full flex-1">
      <SiteSidebar locale={locale} />
      <div className="flex min-w-0 flex-1 flex-col">
        <div
          data-site-chrome-bar
          className="sticky top-0 z-20 flex items-center justify-end gap-4 border-b border-line/80 bg-void/80 px-5 py-3 backdrop-blur-xl md:px-8"
        >
          <LocaleSwitcher locale={locale} />
          <AuthStatus signInLabel={t.signIn} signOutLabel={t.signOut} />
        </div>
        <main className="relative z-10 flex-1">{children}</main>
        <footer className="border-t border-line/80 px-5 py-6 text-center text-xs text-muted md:px-8">
          {t.footerDisclaimer}
        </footer>
      </div>
    </div>
  );
}
