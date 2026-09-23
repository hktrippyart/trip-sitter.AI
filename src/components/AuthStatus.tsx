import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/config";
import { getCurrentUserId } from "@/lib/entitlements";

type Props = {
  signInLabel?: string;
  signOutLabel?: string;
};

export async function AuthStatus({
  signInLabel = "Sign in",
  signOutLabel = "Sign out",
}: Props) {
  const className =
    "rounded-full bg-void px-3.5 py-1.5 text-sm font-medium text-mist ring-1 ring-line transition hover:text-fog";

  if (!isSupabaseConfigured()) {
    return (
      <Link href="/auth/login" className={className}>
        {signInLabel}
      </Link>
    );
  }

  const userId = await getCurrentUserId();
  if (!userId) {
    return (
      <Link href="/auth/login" className={className}>
        {signInLabel}
      </Link>
    );
  }

  return (
    <form action="/auth/signout" method="post">
      <button type="submit" className={className}>
        {signOutLabel}
      </button>
    </form>
  );
}
