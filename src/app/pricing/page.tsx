"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

const PLANS = [
  {
    tier: "Starter",
    amount: 2000, // $20 in cents
    period: "/mo",
    desc: "Perfect for small businesses getting started.",
    features: [
      "Basic SEO Audit",
      "2 Social Media Accounts",
      "Monthly Analytics Report",
      "Email Support",
    ],
    excluded: "Dedicated Manager",
    cta: "Get Started",
    style: "outline",
  },
  {
    tier: "Professional",
    amount: 19900, // $199 in cents
    period: "/yrs",
    desc: "For growing businesses ready to scale.",
    features: [
      "Full SEO Strategy",
      "5 Social Media Accounts",
      "Weekly Analytics",
      "Priority Support",
    ],
    excluded: "Dedicated Manager",
    cta: "Get Started",
    style: "featured",
  },
  {
    tier: "Enterprise",
    amount: null,
    period: "",
    desc: "Full-scale solutions for large teams.",
    features: [
      "Advanced SEO + Content",
      "Unlimited Channels",
      "Real-time Dashboard",
      "24/7 Dedicated Support",
      "Dedicated Account Manager",
    ],
    excluded: null,
    cta: "Contact Sales",
    style: "accent",
  },
];

function PriceCard({
  tier,
  amount,
  period,
  desc,
  features,
  excluded,
  cta,
  style,
}: (typeof PLANS)[0]) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("loading");
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setStatus(user ? "authenticated" : "unauthenticated");
    });
  }, []);

  async function handleCheckout() {
    if (tier === "Enterprise") {
      window.location.href = "/#contact";
      return;
    }
    if (status !== "authenticated") {
      router.push("/login?callbackUrl=/pricing");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          productName: `TechStack ${tier}`,
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error ?? "Checkout failed");
    } catch (e) {
      console.error(e);
      alert("Checkout failed. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-[#6C5CE7]/40 ${style === "featured" ? "border-[#6C5CE7]/50 scale-105" : ""
        }`}
    >
      <div className="mb-4 text-sm font-bold uppercase tracking-wider text-[#00CEC9]">
        {tier}
      </div>
      <div className="mb-2 text-4xl font-extrabold text-white">
        {amount != null ? (
          <>
            ${(amount / 100).toFixed(amount >= 100 ? 0 : 2)}
            <span className="text-lg font-normal text-white/70">{period}</span>
          </>
        ) : (
          "Custom"
        )}
      </div>
      <p className="mb-6 text-sm text-white/70">{desc}</p>
      <ul className="mb-8 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-white/90">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00CEC9]/20 text-[#00CEC9]">
              ✓
            </span>
            {f}
          </li>
        ))}
        {excluded && (
          <li className="flex items-center gap-2 text-sm text-white/40">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5">✕</span>
            {excluded}
          </li>
        )}
      </ul>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`w-full rounded-xl py-3 font-semibold transition disabled:opacity-50 ${style === "featured"
            ? "bg-gradient-to-r from-[#6C5CE7] to-[#0984E3] text-white hover:opacity-90"
            : style === "accent"
              ? "bg-gradient-to-r from-[#00CEC9] to-[#0984E3] text-white hover:opacity-90"
              : "border border-white/20 bg-transparent text-white hover:border-[#00CEC9] hover:bg-[#00CEC9]/5"
          }`}
      >
        {loading ? "Redirecting…" : cta}
      </button>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#6C5CE7]/20 bg-[#6C5CE7]/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#6C5CE7]">
          <span>Pricing</span>
        </div>
        <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
          Simple <span className="bg-gradient-to-r from-[#6C5CE7] to-[#00CEC9] bg-clip-text text-transparent">Pricing</span>
        </h1>
        <p className="mx-auto max-w-2xl text-white/70">
          Transparent plans. No hidden fees. Cancel anytime. Secure payments via Stripe.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {PLANS.map((plan) => (
          <PriceCard key={plan.tier} {...plan} />
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-white/50">
        <Link href="/" className="text-[#00CEC9] hover:underline">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}
