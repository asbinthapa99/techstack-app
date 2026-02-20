import Link from "next/link";

function Logo() {
  return (
    <svg className="h-9 w-9 shrink-0" viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="logoGrad2" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#6C5CE7" />
          <stop offset="100%" stopColor="#00CEC9" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="12" height="12" rx="3" fill="url(#logoGrad2)" opacity="0.9" />
      <rect x="10" y="10" width="12" height="12" rx="3" fill="url(#logoGrad2)" opacity="0.7" />
      <rect x="16" y="16" width="12" height="12" rx="3" fill="url(#logoGrad2)" opacity="0.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080818] py-16">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold text-white">
              <Logo />
              Tech<span className="text-[#6C5CE7]">Stacker</span>
            </Link>
            <p className="mt-4 text-sm text-white/70">
              A self-started tech company building digital empires. SEO, growth, hiring, and social impact — we do it all.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-white">Services</h4>
            <div className="space-y-2">
              {["SEO Optimization", "Follower Growth", "Staffing & Hiring", "Social Work"].map((s) => (
                <Link key={s} href="/#services" className="block text-sm text-white/70 hover:text-[#00CEC9]">
                  {s}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-white">Company</h4>
            <div className="space-y-2">
              <Link href="/#about" className="block text-sm text-white/70 hover:text-[#00CEC9]">About Us</Link>
              <Link href="/pricing" className="block text-sm text-white/70 hover:text-[#00CEC9]">Pricing</Link>
              <Link href="/#contact" className="block text-sm text-white/70 hover:text-[#00CEC9]">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-white">Resources</h4>
            <div className="space-y-2">
              <Link href="/#crypto" className="block text-sm text-white/70 hover:text-[#00CEC9]">Crypto Dashboard</Link>
              <Link href="/#news" className="block text-sm text-white/70 hover:text-[#00CEC9]">Tech News</Link>
              <a href="https://asbinthapa.info.np" target="_blank" rel="noopener noreferrer" className="block text-sm text-white/70 hover:text-[#00CEC9]">Portfolio</a>
              <a href="https://github.com/asbinthapa99" target="_blank" rel="noopener noreferrer" className="block text-sm text-white/70 hover:text-[#00CEC9]">GitHub</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-sm text-white/50 sm:flex-row">
          <span>
            © 2025 TechStacker. Built by{" "}
            <a href="https://asbinthapa.info.np" target="_blank" rel="noopener noreferrer" className="text-[#00CEC9] hover:underline">
              Asbin Thapa
            </a>
          </span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
