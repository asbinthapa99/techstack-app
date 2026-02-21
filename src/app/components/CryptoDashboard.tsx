"use client";

import { useEffect, useRef, useState } from "react";

const WIDGETS = [
  { id: "tv-btc",  symbol: "BINANCE:BTCUSDT",  label: "Bitcoin",  ticker: "BTC", color: "#F7931A" },
  { id: "tv-eth",  symbol: "BINANCE:ETHUSDT",  label: "Ethereum", ticker: "ETH", color: "#627EEA" },
  { id: "tv-sol",  symbol: "BINANCE:SOLUSDT",  label: "Solana",   ticker: "SOL", color: "#9945FF" },
  { id: "tv-xau",  symbol: "OANDA:XAUUSD",     label: "Gold",     ticker: "XAU", color: "#FFD700" },
  { id: "tv-nvda", symbol: "NASDAQ:NVDA",      label: "NVIDIA",   ticker: "NVDA", color: "#76B900" },
  { id: "tv-googl",symbol: "NASDAQ:GOOGL",     label: "Google",   ticker: "GOOGL", color: "#4285F4" },
];

function TradingViewWidget({ id, symbol }: { id: string; symbol: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol,
      width: "100%",
      height: "220",
      locale: "en",
      dateRange: "1M",
      colorTheme: "dark",
      isTransparent: true,
      autosize: false,
      chartOnly: false,
    });
    containerRef.current.appendChild(script);
    return () => {
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [id, symbol]);

  return (
    <div ref={containerRef} className="tradingview-widget-container overflow-hidden rounded-xl">
      <div className="tradingview-widget-container__widget" />
    </div>
  );
}

function CryptoCard({
  widget,
  index,
}: {
  widget: (typeof WIDGETS)[number];
  index: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="crypto-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      {/* animated glow border on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${widget.color}22 0%, transparent 70%)`,
          border: `1px solid ${widget.color}33`,
        }}
      />

      {/* card header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold"
            style={{ background: `${widget.color}22`, color: widget.color }}
          >
            {widget.ticker.slice(0, 2)}
          </span>
          <span className="text-sm font-semibold text-white">{widget.label}</span>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
          <span className="animate-pulse">●</span> live
        </span>
      </div>

      <TradingViewWidget id={widget.id} symbol={widget.symbol} />
    </div>
  );
}

export function CryptoDashboard() {
  return (
    <section
      id="crypto"
      className="relative overflow-hidden border-t border-white/5 py-28"
      style={{
        background:
          "linear-gradient(180deg, transparent 0%, rgba(9,132,227,0.04) 40%, rgba(108,92,231,0.04) 70%, transparent 100%)",
      }}
    >
      {/* animated background orbs */}
      <div
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #6C5CE7 0%, transparent 70%)",
          animation: "cryptoOrbFloat 8s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-20 h-96 w-96 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #0984E3 0%, transparent 70%)",
          animation: "cryptoOrbFloat 11s ease-in-out infinite reverse",
        }}
      />

      <div className="container relative mx-auto max-w-6xl px-6">
        {/* header */}
        <div className="mb-14 text-center">
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#6C5CE7]/30 bg-[#6C5CE7]/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#6C5CE7]"
            style={{ animation: "fadeInUp 0.6s ease both" }}
          >
            <span className="animate-pulse text-emerald-400">●</span>
            Live Market Data
          </div>
          <h2
            className="text-4xl font-extrabold text-white md:text-5xl"
            style={{ animation: "fadeInUp 0.6s ease 0.1s both" }}
          >
            Crypto &amp; Stock{" "}
            <span className="bg-gradient-to-r from-[#6C5CE7] via-[#0984E3] to-[#00CEC9] bg-clip-text text-transparent">
              Dashboard
            </span>
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-white/60"
            style={{ animation: "fadeInUp 0.6s ease 0.2s both" }}
          >
            Real-time charts powered by TradingView — updated every second.
          </p>
        </div>

        {/* chart grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WIDGETS.map((w, i) => (
            <CryptoCard key={w.id} widget={w} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
