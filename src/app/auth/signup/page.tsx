"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { createClient } from "@/lib/supabase/client";

function SignupForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/training";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: displayName || email.split("@")[0] },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });
      if (authError) throw authError;
      if (data.session) {
        window.location.href = next;
        return;
      }
      setMessage(
        "Check your email to confirm your account. After confirming, you’ll go to Online Courses—or sign in here with the same password.",
      );
      setLoading(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Sign-up failed.";
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
        type="text"
        placeholder="Display name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        className="w-full rounded-xl border border-line bg-void/60 px-3 py-2 text-fog outline-none focus:border-glow"
      />
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
        minLength={8}
        placeholder="Password (min 8)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-xl border border-line bg-void/60 px-3 py-2 text-fog outline-none focus:border-glow"
      />
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      {message ? <p className="text-sm text-glow">{message}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-ember py-2.5 text-sm font-semibold text-void disabled:opacity-60"
      >
        {loading ? "Creating…" : "Create account"}
      </button>
      <p className="text-center text-sm text-mist">
        Already have an account?{" "}
        <Link href={`/auth/login?next=${encodeURIComponent(next)}`} className="text-glow">
          Sign in
        </Link>
      </p>
    </form>
  );
}

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-md px-5 py-16 md:px-8">
      <h1 className="font-display text-3xl text-fog">Create account</h1>
      <p className="mt-2 text-mist">
        Saves progress for Online Courses and integration sharing.
      </p>
      <Suspense>
        <SignupForm />
      </Suspense>
    </div>
  );
}
