"use client";

import { useEffect, useRef, useState } from "react";

const CONTACT_ITEMS = [
  { icon: "✉️", label: "Email",    value: "asbinthapa27@gmail.com" },
  { icon: "📞", label: "Phone",    value: "+44 07386 811087" },
  { icon: "📍", label: "Location", value: "London, United Kingdom" },
  { icon: "🌐", label: "Website",  value: "asbinthapa.info.np" },
];

const SOCIALS = [
  { href: "https://github.com/asbinthapa99",                        label: "GH", title: "GitHub" },
  { href: "https://www.linkedin.com/in/asbin-thapa-6a9a4733b/",     label: "in", title: "LinkedIn" },
  { href: "https://twitter.com/MeHope55586",                        label: "𝕏",  title: "X" },
  { href: "https://www.instagram.com/asbin_chetrri/",               label: "IG", title: "Instagram" },
  { href: "https://www.facebook.com/ThapaXetrry99",                 label: "fb", title: "Facebook" },
];

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export function Contact() {
  const header  = useReveal(0.1);
  const left    = useReveal(0.1);
  const right   = useReveal(0.1);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    try {
      await fetch("https://formspree.io/f/myzgbqrb", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      setSent(true);
      form.reset();
    } catch {
      // fallback – let native submit handle it
      form.submit();
    }
    setSending(false);
  }

  return (
    <section id="contact" className="relative overflow-hidden py-28">
      {/* animated background orbs */}
      <div
        className="pointer-events-none absolute -top-24 left-1/4 h-80 w-80 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #6C5CE7, transparent 70%)",
          animation: "cryptoOrbFloat 9s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #00CEC9, transparent 70%)",
          animation: "cryptoOrbFloat 13s ease-in-out infinite reverse",
        }}
      />

      <div className="relative container mx-auto max-w-6xl px-6">
        {/* header */}
        <div
          ref={header.ref}
          className="mb-16 text-center transition-all duration-700"
          style={{
            opacity: header.visible ? 1 : 0,
            transform: header.visible ? "translateY(0)" : "translateY(28px)",
          }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#6C5CE7]/30 bg-[#6C5CE7]/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#6C5CE7]">
            ✉️ Get In Touch
          </div>
          <h2 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
            Contact{" "}
            <span className="bg-gradient-to-r from-[#6C5CE7] to-[#00CEC9] bg-clip-text text-transparent">
              Us
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-white/60">
            Have a project in mind? Let&apos;s build something amazing together.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* ── LEFT: contact info ── */}
          <div
            ref={left.ref}
            className="contact-glass group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-700"
            style={{
              opacity: left.visible ? 1 : 0,
              transform: left.visible ? "translateX(0)" : "translateX(-32px)",
            }}
          >
            {/* card glow on hover */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(circle at 30% 30%, rgba(108,92,231,0.1) 0%, transparent 60%)" }} />

            <h3 className="mb-6 text-xl font-bold text-white">Let&apos;s Connect</h3>

            <div className="space-y-5">
              {CONTACT_ITEMS.map(({ icon, label, value }, i) => (
                <div
                  key={label}
                  className="flex items-center gap-4 transition-all duration-500"
                  style={{
                    opacity: left.visible ? 1 : 0,
                    transform: left.visible ? "translateX(0)" : "translateX(-16px)",
                    transitionDelay: `${i * 80 + 200}ms`,
                  }}
                >
                  <div className="contact-icon-wrap flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#6C5CE7]/10 text-xl transition-all duration-300 hover:bg-[#6C5CE7]/25 hover:scale-110">
                    {icon}
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-white/40">{label}</div>
                    <div className="text-white">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* social icons */}
            <div className="mt-8 flex gap-3">
              {SOCIALS.map(({ href, label, title }, i) => (
                <a
                  key={title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={title}
                  className="social-icon flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-white/60 transition-all duration-300 hover:-translate-y-1 hover:border-[#6C5CE7]/50 hover:bg-[#6C5CE7]/15 hover:text-[#6C5CE7] hover:shadow-[0_4px_20px_rgba(108,92,231,0.3)]"
                  style={{
                    opacity: left.visible ? 1 : 0,
                    transform: left.visible ? "translateY(0)" : "translateY(12px)",
                    transitionDelay: `${i * 60 + 400}ms`,
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT: form ── */}
          <div
            ref={right.ref}
            className="contact-glass group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-700"
            style={{
              opacity: right.visible ? 1 : 0,
              transform: right.visible ? "translateX(0)" : "translateX(32px)",
              transitionDelay: "100ms",
            }}
          >
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(circle at 70% 20%, rgba(9,132,227,0.1) 0%, transparent 60%)" }} />

            <h3 className="mb-6 text-xl font-bold text-white">Send a Message</h3>

            {sent ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-3xl">✓</div>
                <p className="text-lg font-semibold text-white">Message sent!</p>
                <p className="text-white/60">We&apos;ll get back to you soon.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/70 transition hover:bg-white/10"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="contact-input w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:border-[#6C5CE7]/60 focus:bg-[#6C5CE7]/5 focus:shadow-[0_0_0_3px_rgba(108,92,231,0.15)]"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="contact-input w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:border-[#6C5CE7]/60 focus:bg-[#6C5CE7]/5 focus:shadow-[0_0_0_3px_rgba(108,92,231,0.15)]"
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="contact-input w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:border-[#6C5CE7]/60 focus:bg-[#6C5CE7]/5 focus:shadow-[0_0_0_3px_rgba(108,92,231,0.15)]"
                />
                <textarea
                  name="message"
                  placeholder="Your message..."
                  required
                  rows={5}
                  className="contact-input w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:border-[#6C5CE7]/60 focus:bg-[#6C5CE7]/5 focus:shadow-[0_0_0_3px_rgba(108,92,231,0.15)]"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="contact-btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#0984E3] px-6 py-3.5 font-semibold text-white transition-all duration-300 hover:shadow-[0_4px_30px_rgba(108,92,231,0.5)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                >
                  <span className="relative z-10">
                    {sending ? "Sending…" : "✉️ Send Message"}
                  </span>
                  {/* shimmer sweep */}
                  <span className="contact-btn-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 hover:translate-x-full" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
