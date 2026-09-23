"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/training";
  const urlError = searchParams.get("error");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(() => {
    if (urlError === "confirm") {
      return "Email link expired or already used. Sign in with your password, or request a new confirmation email from sign up.";
    }
    if (urlError === "supabase") {
      return "Auth is not configured on this deployment. Check Vercel env vars and redeploy.";
    }
    return null;
  });
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) throw authError;
      window.location.href = next;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Sign-in failed.";
      setError(
        msg === "Supabase is not configured"
          ? "Supabase keys are missing in this build. In Vercel, set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (your sb_publishable key), then redeploy."
          : msg,
      );
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4">
      <input
        type="email"
        required
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-xl border border-line bg-void/60 px-3 py-2 text-fog outline-none focus:border-glow"
      />
      <input
        type="password"
        required
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-xl border border-line bg-void/60 px-3 py-2 text-fog outline-none focus:border-glow"
      />
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-ember py-2.5 text-sm font-semibold text-void disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
      <p className="text-center text-sm text-mist">
        No account?{" "}
        <Link href={`/auth/signup?next=${encodeURIComponent(next)}`} className="text-glow">
          Create one
        </Link>
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-5 py-16 md:px-8">
      <h1 className="font-display text-3xl text-fog">Sign in</h1>
      <p className="mt-2 text-mist">
        Sign in to continue to Online Courses and save your training progress.
      </p>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
