"use client";

import { useEffect, useState } from "react";

type NewsItem = { title: string; link: string; author: string; pubDate: string };

export function NewsFeed() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="news" className="py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#6C5CE7]/20 bg-[#6C5CE7]/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#6C5CE7]">
            📡 Tech Feed
          </div>
          <h2 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
            Latest <span className="bg-gradient-to-r from-[#6C5CE7] to-[#00CEC9] bg-clip-text text-transparent">News</span>
          </h2>
          <p className="mx-auto max-w-2xl text-white/70">
            Tech headlines aggregated in real-time.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d1a] shadow-xl">
          <div className="flex items-center gap-2 border-b border-white/5 px-6 py-4">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-3 font-mono text-xs text-white/50">news_feed --source=rss</span>
          </div>
          <div className="max-h-[500px] overflow-y-auto p-6">
            {loading ? (
              <div className="py-12 text-center font-mono text-white/60">
                ⏳ Fetching latest headlines...
              </div>
            ) : items.length === 0 ? (
              <div className="py-12 text-center font-mono text-white/60">
                No headlines available.
              </div>
            ) : (
              <ul className="space-y-2">
                {items.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 rounded-lg p-4 transition hover:bg-white/5"
                  >
                    <span className="shrink-0 font-mono text-sm text-[#00CEC9]/70">$ feed&gt;</span>
                    <div>
                      <h4 className="font-semibold text-white">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#00CEC9]"
                        >
                          {item.title}
                        </a>
                      </h4>
                      <p className="text-xs text-white/50">
                        {new Date(item.pubDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        — {item.author}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
