"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const WORDS = ["SEO Optimization", "Follower Growth", "Team Hiring", "Social Impact", "Crypto Solutions", "Web Development"];

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = WORDS[wordIndex];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (charIndex <= word.length) {
            setCharIndex((c) => c + 1);
          } else {
            setTimeout(() => setDeleting(true), 2000);
          }
        } else {
          if (charIndex > 0) {
            setCharIndex((c) => c - 1);
          } else {
            setDeleting(false);
            setWordIndex((w) => (w + 1) % WORDS.length);
          }
        }
      },
      deleting ? 30 : 60
    );
    return () => clearTimeout(timeout);
  }, [wordIndex, charIndex, deleting]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7]/5 to-transparent" />
      <div className="container relative z-10 mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FDCB6E]/30 bg-[#FDCB6E]/10 px-4 py-2 text-sm font-medium text-[#FDCB6E]">
            ⚡ Self-Started Tech Company
          </div>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            We Build
            <br />
            <span className="bg-gradient-to-r from-[#6C5CE7] to-[#00CEC9] bg-clip-text text-transparent">
              Digital Empires
            </span>
          </h1>
          <p className="mb-10 min-h-[3rem] text-lg text-white/70">
            Providing <span className="font-semibold text-[#00CEC9]">{WORDS[wordIndex].slice(0, charIndex)}|</span>
            <br />
            for businesses worldwide.
          </p>
          <div className="mb-12 flex flex-wrap gap-4">
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6C5CE7] to-[#0984E3] px-8 py-4 font-semibold text-white transition hover:opacity-90"
            >
              🚀 Our Services
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 font-semibold text-white transition hover:border-[#00CEC9] hover:bg-[#00CEC9]/5"
            >
              ▶ Get Started
            </Link>
          </div>
          <div className="flex flex-wrap gap-10 border-t border-white/10 pt-10">
            <div>
              <div className="text-2xl font-extrabold text-white">1800+</div>
              <div className="text-xs uppercase tracking-wider text-white/50">Projects</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">1500+</div>
              <div className="text-xs uppercase tracking-wider text-white/50">Clients</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">50+</div>
              <div className="text-xs uppercase tracking-wider text-white/50">Countries</div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative h-64 w-64 rounded-2xl border border-[#6C5CE7]/30 bg-[#6C5CE7]/5 p-8 backdrop-blur-sm" style={{ animation: "spin 20s linear infinite" }}>
            <div className="flex h-full w-full items-center justify-center text-4xl text-[#6C5CE7]/80">💻</div>
          </div>
        </div>
      </div>
    </section>
  );
}
