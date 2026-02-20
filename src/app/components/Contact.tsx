export function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#6C5CE7]/20 bg-[#6C5CE7]/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#6C5CE7]">
            ✉️ Get In Touch
          </div>
          <h2 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
            Contact <span className="bg-gradient-to-r from-[#6C5CE7] to-[#00CEC9] bg-clip-text text-transparent">Us</span>
          </h2>
          <p className="mx-auto max-w-2xl text-white/70">
            Have a project in mind? Let&apos;s build something amazing together.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h3 className="mb-6 text-xl font-bold text-white">Let&apos;s Connect</h3>
            <div className="space-y-6">
              {[
                { icon: "✉️", label: "Email", value: "asbinthapa27@gmail.com" },
                { icon: "📞", label: "Phone", value: "+44 07386 811087" },
                { icon: "📍", label: "Location", value: "London, United Kingdom" },
                { icon: "🌐", label: "Website", value: "asbinthapa.info.np" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#6C5CE7]/10 text-xl">
                    {icon}
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-white/50">{label}</div>
                    <div className="text-white">{value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              {[
                { href: "https://github.com/asbinthapa99", icon: "GitHub" },
                { href: "https://www.linkedin.com/in/asbin-thapa-6a9a4733b/", icon: "LinkedIn" },
                { href: "https://twitter.com/MeHope55586", icon: "X" },
                { href: "https://www.instagram.com/asbin_chetrri/", icon: "Instagram" },
                { href: "https://www.facebook.com/ThapaXetrry99", icon: "Facebook" },
              ].map(({ href, icon }) => (
                <a
                  key={icon}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:border-[#6C5CE7]/30 hover:bg-[#6C5CE7]/10 hover:text-[#6C5CE7]"
                >
                  {icon[0]}
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h3 className="mb-6 text-xl font-bold text-white">Send a Message</h3>
            <form
              action="https://formspree.io/f/myzgbqrb"
              method="POST"
              className="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-[#6C5CE7] focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-[#6C5CE7] focus:outline-none"
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-[#6C5CE7] focus:outline-none"
              />
              <textarea
                name="message"
                placeholder="Your message..."
                required
                rows={5}
                className="w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-[#6C5CE7] focus:outline-none"
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#0984E3] px-6 py-3 font-semibold text-white transition hover:opacity-90"
              >
                ✉️ Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
