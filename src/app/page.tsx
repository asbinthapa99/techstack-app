import Link from 'next/link'
import { Contact } from './components/Contact'
import { CryptoDashboard } from './components/CryptoDashboard'
import { NewsFeed } from './components/NewsFeed'

export default function Home() {
  return (
    <>
      {/* ===== NAVBAR ===== */}
      <nav className="navbar" id="navbar">
        <div className="container">
          <Link href="#" className="nav-logo">
            <svg className="logo-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
                  <stop offset="0%" stopColor="#6C5CE7" />
                  <stop offset="100%" stopColor="#00CEC9" />
                </linearGradient>
              </defs>
              <rect x="4" y="4" width="12" height="12" rx="3" fill="url(#logoGrad)" opacity="0.9" />
              <rect x="10" y="10" width="12" height="12" rx="3" fill="url(#logoGrad)" opacity="0.7" />
              <rect x="16" y="16" width="12" height="12" rx="3" fill="url(#logoGrad)" opacity="0.5" />
            </svg> Cyphora Tech<span>Stack</span>
          </Link>
          <div className="nav-links" id="navLinks">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#pricing">Pricing</a>
            <a href="#crypto">Crypto</a>
            <a href="#news">News</a>
            <Link href="/login" className="nav-cta">Client Login</Link>
          </div>
          <button className="nav-toggle" id="navToggle" aria-label="Menu"><i className="fas fa-bars"></i></button>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero" id="home">
        <div className="hero-bg"></div>
        <div className="hero-particles" id="heroParticles"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge"><i className="fas fa-bolt"></i> Self-Started Tech Company</div>
            <h1 className="hero-title">
              We Build<br /><span className="gradient">Digital Empires</span>
            </h1>
            <div className="hero-typed-wrap">
              Providing <span className="hero-typed" id="heroTyped"></span><br />
              for businesses worldwide.
            </div>
            <div className="hero-btns">
              <a href="#services" className="btn btn-primary"><i className="fas fa-rocket"></i> Our Services</a>
              <a href="#pricing" className="btn btn-outline"><i className="fas fa-play"></i> Get Started</a>
            </div>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-num" data-count="1800">1800+</div>
                <div className="hero-stat-label"><i className="fas fa-briefcase"></i> Projects</div>
              </div>
              <div>
                <div className="hero-stat-num" data-count="1500">1500+</div>
                <div className="hero-stat-label">Clients</div>
              </div>
              <div>
                <div className="hero-stat-num" data-count="50">50+</div>
                <div className="hero-stat-label"><i className="fas fa-globe"></i> Countries</div>
              </div>
            </div>
          </div>
          <div className="hero-3d">
            <div className="hero-orbit hero-orbit-1"></div>
            <div className="hero-orbit hero-orbit-2"></div>
            <div className="hero-3d-cube">
              <div className="face face-front"><i className="fas fa-code"></i></div>
              <div className="face face-back"><i className="fas fa-shield-halved"></i></div>
              <div className="face face-left"><i className="fas fa-chart-line"></i></div>
              <div className="face face-right"><i className="fas fa-users"></i></div>
              <div className="face face-top"><i className="fab fa-bitcoin"></i></div>
              <div className="face face-bottom"><i className="fas fa-search"></i></div>
            </div>
            <div className="hero-float-shape hfs-1"></div>
            <div className="hero-float-shape hfs-2"></div>
            <div className="hero-float-shape hfs-3"></div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="section" id="services">
        <div className="container">
          <div className="reveal" style={{ textAlign: "center" }}>
            <div className="section-badge"><i className="fas fa-cogs"></i> What We Do</div>
            <h2 className="section-title">Our <span>Services</span></h2>
            <p className="section-sub" style={{ marginLeft: "auto", marginRight: "auto" }}>End-to-end digital solutions — from SEO domination to team building.</p>
          </div>
          <div className="services-grid">
            <div className="glass-card service-card reveal reveal-delay-1">
              <div className="service-icon si-seo"><i className="fas fa-search"></i></div>
              <h3>SEO Optimization</h3>
              <p>Dominate search rankings with advanced on-page, off-page, and technical SEO strategies that drive organic traffic.</p>
              <div className="service-tags"><span className="service-tag">On-Page SEO</span><span className="service-tag">Link Building</span><span className="service-tag">Analytics</span></div>
            </div>
            <div className="glass-card service-card reveal reveal-delay-2">
              <div className="service-icon si-growth"><i className="fas fa-chart-line"></i></div>
              <h3>Follower Growth</h3>
              <p>Organic audience building across Instagram, Twitter, TikTok, and LinkedIn with data-driven engagement strategies.</p>
              <div className="service-tags"><span className="service-tag">Social Media</span><span className="service-tag">Engagement</span><span className="service-tag">Analytics</span></div>
            </div>
            <div className="glass-card service-card reveal reveal-delay-3">
              <div className="service-icon si-hiring"><i className="fas fa-user-tie"></i></div>
              <h3>Staffing & Hiring</h3>
              <p>Find top talent for your tech team. We handle sourcing, screening, and onboarding remote & on-site employees.</p>
              <div className="service-tags"><span className="service-tag">Recruitment</span><span className="service-tag">Screening</span><span className="service-tag">Onboarding</span></div>
            </div>
            <div className="glass-card service-card reveal reveal-delay-4">
              <div className="service-icon si-social"><i className="fas fa-hands-helping"></i></div>
              <h3>Social Work</h3>
              <p>Community-driven initiatives, volunteer coordination, and social impact projects that make a real difference.</p>
              <div className="service-tags"><span className="service-tag">Community</span><span className="service-tag">Volunteer</span><span className="service-tag">Impact</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="section" id="about" style={{ background: "linear-gradient(180deg,rgba(108,92,231,0.03) 0%,transparent 100%)" }}>
        <div className="container">
          <div className="about-grid">
            <div className="about-visual reveal">
              <div className="about-img-wrap">
                {/* Place your image at public/img/Tech-stacker.png */}
<div className="absolute inset-0 flex items-center justify-center bg-[#6C5CE7]/10 rounded-2xl">
                <span className="text-6xl opacity-50">👤</span>
              </div>
              </div>
            </div>
            <div className="about-content reveal reveal-delay-2">
              <div className="section-badge"><i className="fas fa-building"></i> About Us</div>
              <h2 className="section-title">A Self-Started<br /><span>Tech Venture</span></h2>
              <div className="about-text">
                <h3>Our Story</h3>
                <p>TechStacker was born from a passion for technology and a vision to democratize digital growth. Founded by Asbin Thapa -a cybersecurity expert, computer science student, and blockchain developer — we started as a one-person operation and grew into a global tech solutions provider.</p>
                <p>Today, we serve 100+ clients across 10+ countries, delivering SEO optimization, audience growth, staffing solutions, and community-driven social work initiatives.</p>
              </div>
              <div className="about-stats">
                <div className="about-stat-card">
                  <div className="about-stat-num" data-count="1800">1800+</div>
                  <div className="about-stat-label"><i className="fas fa-briefcase"></i> Projects</div>
                </div>
                <div className="about-stat-card">
                  <div className="about-stat-num" data-count="1500">1500+</div>
                  <div className="about-stat-label">Clients</div>
                </div>
                <div className="about-stat-card">
                  <div className="about-stat-num" data-count="2">2+</div>
                  <div className="about-stat-label">Team Members</div>
                </div>
                <div className="about-stat-card">
                  <div className="about-stat-num" data-count="50">50+</div>
                  <div className="about-stat-label"><i className="fas fa-globe"></i> Countries</div>
                </div>
              </div>
              <div className="tech-stack">
                <span className="tech-badge">HTML5</span><span className="tech-badge">CSS3</span><span className="tech-badge">JavaScript</span>
                <span className="tech-badge">Python</span><span className="tech-badge">React</span><span className="tech-badge">Node.js</span>
                <span className="tech-badge">Solidity</span><span className="tech-badge">Next.js</span><span className="tech-badge">TypeScript</span>
                <span className="tech-badge">cloud</span><span className="tech-badge">Docker</span><span className="tech-badge">AWS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="section" id="pricing">
        <div className="container">
          <div className="reveal" style={{ textAlign: "center" }}>
            <div className="section-badge"><i className="fas fa-tags"></i> Pricing</div>
            <h2 className="section-title">Simple <span>Pricing</span></h2>
            <p className="section-sub" style={{ marginLeft: "auto", marginRight: "auto" }}>Transparent plans. No hidden fees. Cancel anytime. Crypto accepted.</p>
          </div>
          <div className="pricing-grid">
            <div className="glass-card price-card reveal reveal-delay-1">
              <div className="price-tier">Starter</div>
              <div className="price-amount">$20<span>/mo</span></div>
              <p className="price-desc">Perfect for small businesses getting started.</p>
              <ul className="price-features">
                <li><i className="fas fa-check"></i> Basic SEO Audit</li>
                <li><i className="fas fa-check"></i> 2 Social Media Accounts</li>
                <li><i className="fas fa-check"></i> Monthly Analytics Report</li>
                <li><i className="fas fa-check"></i> Email Support</li>
                <li className="disabled"><i className="fas fa-times"></i> Dedicated Manager</li>
              </ul>
              <button className="btn btn-outline" style={{ width: "100%", justifyContent: "center" }}>Get Started</button>
            </div>
            <div className="glass-card price-card featured reveal reveal-delay-2">
              <div className="price-tier">Professional</div>
              <div className="price-amount">$199<span>/yrs</span></div>
              <p className="price-desc">For growing businesses ready to scale.</p>
              <ul className="price-features">
                <li><i className="fas fa-check"></i> Full SEO Strategy</li>
                <li><i className="fas fa-check"></i> 5 Social Media Accounts</li>
                <li><i className="fas fa-check"></i> Weekly Analytics</li>
                <li><i className="fas fa-check"></i> Priority Support</li>
                <li className="disabled"><i className="fas fa-times"></i> Dedicated Manager</li>
              </ul>
              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>Get Started</button>
            </div>
            <div className="glass-card price-card reveal reveal-delay-3">
              <div className="price-tier">Enterprise</div>
              <div className="price-amount">Custom</div>
              <p className="price-desc">Full-scale solutions for large teams.</p>
              <ul className="price-features">
                <li><i className="fas fa-check"></i> Advanced SEO + Content</li>
                <li><i className="fas fa-check"></i> Unlimited Channels</li>
                <li><i className="fas fa-check"></i> Real-time Dashboard</li>
                <li><i className="fas fa-check"></i> 24/7 Dedicated Support</li>
                <li><i className="fas fa-check"></i> Dedicated Account Manager</li>
              </ul>
              <button className="btn btn-accent" style={{ width: "100%", justifyContent: "center" }}>Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CRYPTO DASHBOARD ===== */}
      <CryptoDashboard />

      {/* ===== NEWS FEED ===== */}
      <NewsFeed />

      {/* ===== CONTACT ===== */}
      <Contact />

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="nav-logo" style={{ fontSize: "1.8rem" }}>
                <svg className="logo-icon" width="36" height="36" viewBox="0 0 32 32" fill="none">
                  <defs>
                    <linearGradient id="logoGrad2" x1="0" y1="0" x2="32" y2="32">
                      <stop offset="0%" stopColor="#6C5CE7" />
                      <stop offset="100%" stopColor="#00CEC9" />
                    </linearGradient>
                  </defs>
                  <rect x="4" y="4" width="12" height="12" rx="3" fill="url(#logoGrad2)" opacity="0.9" />
                  <rect x="10" y="10" width="12" height="12" rx="3" fill="url(#logoGrad2)" opacity="0.7" />
                  <rect x="16" y="16" width="12" height="12" rx="3" fill="url(#logoGrad2)" opacity="0.5" />
                </svg> Tech<span>Stacker</span>
              </div>
              <p>A selfstarted tech company building digital empires. SEO, growth, hiring, and social impact — we do it all.</p>
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <a href="#services">SEO Optimization</a>
              <a href="#services">Follower Growth</a>
              <a href="#services">Staffing & Hiring</a>
              <a href="#services">Social Work</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2025 TechStacker. Built by Asbin Thapa</span>
            <span>All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  )
}
