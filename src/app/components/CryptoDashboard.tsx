"use client";

import { useEffect, useRef } from "react";

const WIDGETS = [
  { id: "tv-btc", symbol: "BINANCE:BTCUSDT" },
  { id: "tv-eth", symbol: "BINANCE:ETHUSDT" },
  { id: "tv-sol", symbol: "BINANCE:SOLUSDT" },
  { id: "tv-xau", symbol: "OANDA:XAUUSD" },
  { id: "tv-nvda", symbol: "NASDAQ:NVDA" },
  { id: "tv-googl", symbol: "NASDAQ:GOOGL" },
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
    <div ref={containerRef} className="tradingview-widget-container rounded-xl overflow-hidden">
      <div className="tradingview-widget-container__widget" />
    </div>
  );
}

export function CryptoDashboard() {
  return (
    <section id="crypto" className="border-t border-white/5 bg-gradient-to-b from-transparent via-[#0984E3]/5 to-transparent py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#6C5CE7]/20 bg-[#6C5CE7]/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#6C5CE7]">
            📊 Live Market
          </div>
          <h2 className="text-4xl font-extrabold text-white md:text-5xl">
            Crypto & stock <span className="bg-gradient-to-r from-[#6C5CE7] to-[#00CEC9] bg-clip-text text-transparent">Dashboard</span>
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WIDGETS.map((w) => (
            <div
              key={w.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
            >
              <TradingViewWidget id={w.id} symbol={w.symbol} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
