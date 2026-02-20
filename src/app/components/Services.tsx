import Link from "next/link";

const SERVICES = [
  {
    icon: "🔍",
    title: "SEO Optimization",
    desc: "Dominate search rankings with advanced on-page, off-page, and technical SEO strategies that drive organic traffic.",
    tags: ["On-Page SEO", "Link Building", "Analytics"],
  },
  {
    icon: "📈",
    title: "Follower Growth",
    desc: "Organic audience building across Instagram, Twitter, TikTok, and LinkedIn with data-driven engagement strategies.",
    tags: ["Social Media", "Engagement", "Analytics"],
  },
  {
    icon: "👔",
    title: "Staffing & Hiring",
    desc: "Find top talent for your tech team. We handle sourcing, screening, and onboarding remote & on-site employees.",
    tags: ["Recruitment", "Screening", "Onboarding"],
  },
  {
    icon: "🤝",
    title: "Social Work",
    desc: "Community-driven initiatives, volunteer coordination, and social impact projects that make a real difference.",
    tags: ["Community", "Volunteer", "Impact"],
  },
];

export function Services() {
  return (
    <section id="services" className="py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#6C5CE7]/20 bg-[#6C5CE7]/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#6C5CE7]">
            ⚙️ What We Do
          </div>
          <h2 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
            Our <span className="bg-gradient-to-r from-[#6C5CE7] to-[#00CEC9] bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="mx-auto max-w-2xl text-white/70">
            End-to-end digital solutions — from SEO domination to team building.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:border-[#00CEC9]/30 hover:bg-white/10"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#6C5CE7]/10 text-2xl">
                {s.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">{s.title}</h3>
              <p className="mb-4 text-sm text-white/70">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
