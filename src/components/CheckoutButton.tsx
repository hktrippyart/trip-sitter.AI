"use client";

import { useState } from "react";

type Props = {
  productId: string;
  label?: string;
  className?: string;
};

export function CheckoutButton({
  productId,
  label = "Buy with Stripe",
  className,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Checkout failed");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={startCheckout}
        disabled={loading}
        className={
          className ||
          "rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-void transition hover:bg-ember-bright disabled:opacity-60"
        }
      >
        {loading ? "Redirecting…" : label}
      </button>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
    </div>
  );
}
