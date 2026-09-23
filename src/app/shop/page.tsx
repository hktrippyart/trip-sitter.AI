import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutButton } from "@/components/CheckoutButton";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Grounded Anchor tee and starter test kits.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
      <p className="text-sm font-medium text-ember">
        Shop
      </p>
      <h1 className="mt-3 font-display text-4xl text-fog md:text-5xl">
        Tools & merch
      </h1>
      <p className="mt-4 max-w-2xl text-mist">
        A simple tee and a starter reagent kit. Free AI training is under{" "}
        <Link href="/training" className="text-ember hover:underline">
          Online Courses
        </Link>
        . Physical
        goods ship to allowlisted regions; kits are educational tools, not safety
        guarantees.
      </p>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            id={product.id === "test-kit" ? "test-kit" : product.id}
            className="flex flex-col rounded-3xl bg-void shadow-sm ring-1 ring-line p-6"
          >
            {product.badge ? (
              <span className="text-xs font-medium text-muted">
                {product.badge}
              </span>
            ) : null}
            <h2 className="mt-2 font-display text-2xl text-fog">
              {product.name}
            </h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">
              {product.description}
            </p>
            <p className="mt-6 font-display text-3xl text-ember-bright">
              {product.priceDisplay}
            </p>
            <p className="mt-2 text-xs text-muted">{product.fulfillmentNote}</p>
            <div className="mt-5">
              <CheckoutButton
                productId={product.id}
                label={`Checkout · ${product.priceDisplay}`}
              />
            </div>
          </article>
        ))}
      </div>

      <p className="mt-10 max-w-3xl text-sm text-muted">
        By purchasing a test kit you confirm you are of legal age where you live
        and will use it only for personal harm-reduction education in jurisdictions
        where that is permitted.
      </p>
    </div>
  );
}
