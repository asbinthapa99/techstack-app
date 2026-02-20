"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

function Logo() {
  return (
    <svg className="h-8 w-8 shrink-0" viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#6C5CE7" />
          <stop offset="100%" stopColor="#00CEC9" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="12" height="12" rx="3" fill="url(#logoGrad)" opacity="0.9" />
      <rect x="10" y="10" width="12" height="12" rx="3" fill="url(#logoGrad)" opacity="0.7" />
      <rect x="16" y="16" width="12" height="12" rx="3" fill="url(#logoGrad)" opacity="0.5" />
    </svg>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);

    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = (
    <>
      <Link href="/#services" className="text-white/70 transition hover:text-white">Services</Link>
      <Link href="/#about" className="text-white/70 transition hover:text-white">About</Link>
      <Link href="/pricing" className="text-white/70 transition hover:text-white">Pricing</Link>
      <Link href="/#crypto" className="text-white/70 transition hover:text-white">Crypto</Link>
      <Link href="/#news" className="text-white/70 transition hover:text-white">News</Link>
      <Link
        href="/#contact"
        className="rounded-full bg-gradient-to-r from-[#6C5CE7] to-[#0984E3] px-6 py-2 font-semibold text-white transition hover:opacity-90"
      >
        Contact
      </Link>
      {session ? (
        <Link
          href="/dashboard"
          className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
        >
          Dashboard
        </Link>
      ) : (
        <>
          <Link href="/login" className="text-white/70 transition hover:text-white">Login</Link>
          <Link
            href="/register"
            className="rounded-full bg-gradient-to-r from-[#6C5CE7] to-[#0984E3] px-6 py-2 font-semibold text-white transition hover:opacity-90"
          >
            Register
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300 ${scrolled ? "border-white/10 bg-[#050505]/80 backdrop-blur-xl" : "border-transparent bg-transparent"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-white">
          <Logo />
          Cyphora Tech<span className="text-[#6C5CE7]">Stack</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">{navLinks}</div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white"
          aria-label="Menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <div className="flex flex-col gap-4 border-t border-white/10 bg-[#050505]/95 px-6 py-4 md:hidden">
          {navLinks}
        </div>
      )}
    </nav>
  );
}
