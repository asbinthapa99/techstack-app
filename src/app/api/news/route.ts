import { NextResponse } from "next/server";

const RSS_SOURCES = [
  "https://api.rss2json.com/v1/api.json?rss_url=https://feeds.feedburner.com/TechCrunch/",
  "https://api.rss2json.com/v1/api.json?rss_url=https://www.coindesk.com/arc/outboundfeeds/rss/",
  "https://api.rss2json.com/v1/api.json?rss_url=https://cointelegraph.com/rss",
];

const FALLBACK_ITEMS = [
  { title: "Bitcoin Surges Past Key Resistance Level", author: "CoinDesk", link: "#", pubDate: new Date().toISOString() },
  { title: "Ethereum Layer 2 Networks See Record Volume", author: "CoinTelegraph", link: "#", pubDate: new Date().toISOString() },
  { title: "Web3 Adoption Accelerates Across Enterprise", author: "TechCrunch", link: "#", pubDate: new Date().toISOString() },
  { title: "AI and Blockchain Convergence Creates New Opportunities", author: "Forbes", link: "#", pubDate: new Date().toISOString() },
];

export async function GET() {
  for (const url of RSS_SOURCES) {
    try {
      const res = await fetch(url, { next: { revalidate: 300 } });
      const data = await res.json();
      if (data.items?.length) {
        return NextResponse.json(
          data.items.slice(0, 8).map((item: { title: string; link: string; pubDate: string; author?: string }) => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            author: item.author ?? "News",
          }))
        );
      }
    } catch {
      continue;
    }
  }
  return NextResponse.json(FALLBACK_ITEMS);
}
