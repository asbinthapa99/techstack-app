import { NextRequest, NextResponse } from "next/server";

// Upstash rate limiting — only active when env vars are present.
// Falls back to a no-op so the app works without Redis in development.

let Ratelimit: typeof import("@upstash/ratelimit").Ratelimit | null = null;
let Redis: typeof import("@upstash/redis").Redis | null = null;

async function loadUpstash() {
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return null;
  }
  try {
    const [rl, rd] = await Promise.all([
      import("@upstash/ratelimit"),
      import("@upstash/redis"),
    ]);
    Ratelimit = rl.Ratelimit;
    Redis = rd.Redis;
    return { Ratelimit, Redis };
  } catch {
    return null;
  }
}

const limiters = new Map<string, InstanceType<typeof import("@upstash/ratelimit").Ratelimit>>();

/**
 * Apply rate limiting.
 *
 * @param id  Unique identifier (IP or user ID)
 * @param key Limiter key (e.g. "auth:login")
 * @param requests Max requests in window
 * @param windowSeconds Window in seconds
 * @returns NextResponse with 429 if rate-limited, null otherwise
 */
export async function rateLimit(
  id: string,
  key: string,
  requests: number,
  windowSeconds: number
): Promise<NextResponse | null> {
  const upstash = await loadUpstash();
  if (!upstash) return null; // no-op when unconfigured

  const { Ratelimit: RL, Redis: RD } = upstash;
  const cacheKey = `${key}:${requests}:${windowSeconds}`;

  if (!limiters.has(cacheKey)) {
    const redis = new RD({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
    limiters.set(
      cacheKey,
      new RL({
        redis,
        limiter: RL.slidingWindow(requests, `${windowSeconds} s`),
        prefix: `ratelimit:${key}`,
      })
    );
  }

  const limiter = limiters.get(cacheKey)!;
  const { success, limit, remaining, reset } = await limiter.limit(id);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": String(limit),
          "X-RateLimit-Remaining": String(remaining),
          "X-RateLimit-Reset": String(reset),
          "Retry-After": String(Math.ceil((reset - Date.now()) / 1000)),
        },
      }
    );
  }
  return null;
}

/** Extract best-effort client IP from a Next.js request */
export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "127.0.0.1"
  );
}
