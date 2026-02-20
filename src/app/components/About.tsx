export function About() {
  return (
    <section id="about" className="border-t border-white/5 bg-gradient-to-b from-[#6C5CE7]/5 to-transparent py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex justify-center">
            <div className="relative h-80 w-64 overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(108,92,231,0.15)] md:h-96 md:w-80">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-6xl opacity-50">👤</span>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#6C5CE7]/20 bg-[#6C5CE7]/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#6C5CE7]">
              🏢 About Us
            </div>
            <h2 className="mb-6 text-4xl font-extrabold text-white md:text-5xl">
              A Self-Started
              <br />
              <span className="bg-gradient-to-r from-[#6C5CE7] to-[#00CEC9] bg-clip-text text-transparent">
                Tech Venture
              </span>
            </h2>
            <div className="mb-8">
              <h3 className="mb-3 text-lg font-bold text-[#00CEC9]">Our Story</h3>
              <p className="mb-3 text-white/70">
                TechStacker was born from a passion for technology and a vision to democratize digital growth.
                Founded by Asbin Thapa — a cybersecurity expert, computer science student, and blockchain developer —
                we started as a one-person operation and grew into a global tech solutions provider.
              </p>
              <p className="text-white/70">
                Today, we serve 100+ clients across 10+ countries, delivering SEO optimization, audience growth,
                staffing solutions, and community-driven social work initiatives.
              </p>
            </div>
            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { n: "1800+", l: "Projects" },
                { n: "1500", l: "Clients" },
                { n: "2", l: "Team Members" },
                { n: "50", l: "Countries" },
              ].map(({ n, l }) => (
                <div
                  key={l}
                  className="rounded-xl border border-white/5 bg-white/5 p-4 text-center"
                >
                  <div className="text-xl font-extrabold text-white">{n}</div>
                  <div className="text-xs uppercase tracking-wider text-white/50">{l}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {["HTML5", "CSS3", "JavaScript", "Python", "React", "Node.js", "Solidity", "Next.js", "TypeScript", "Docker", "AWS"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-xl border border-white/5 bg-white/5 px-4 py-2 text-sm font-medium text-white/80"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
