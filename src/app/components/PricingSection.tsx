import Link from "next/link";

export function PricingSection() {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#6C5CE7]/20 bg-[#6C5CE7]/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#6C5CE7]">
            💰 Pricing
          </div>
          <h2 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
            Simple <span className="bg-gradient-to-r from-[#6C5CE7] to-[#00CEC9] bg-clip-text text-transparent">Pricing</span>
          </h2>
          <p className="mx-auto max-w-2xl text-white/70">
            Transparent plans. No hidden fees. Cancel anytime.
          </p>
        </div>
        <div className="mb-12 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6C5CE7] to-[#0984E3] px-8 py-4 font-semibold text-white transition hover:opacity-90"
          >
            View full pricing →
          </Link>
        </div>
      </div>
    </section>
  );
}
