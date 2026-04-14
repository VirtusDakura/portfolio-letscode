import { teamMembers } from "@/data/team";
import TeamCard from "@/components/TeamCard";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import TypeWriter from "@/components/TypeWriter";

const services = [
  {
    title: "Web & Mobile Applications",
    description:
      "We build fast, responsive web and mobile applications using modern frameworks like React, Next.js, and Node.js — optimised for performance and real-world use.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    title: "AI-Powered Systems",
    description:
      "From intelligent automation to machine learning integrations — we build AI-powered solutions that help businesses make smarter decisions and scale efficiently.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 014 4c0 1.95-1.4 3.58-3.25 3.93V12h2.75a2.5 2.5 0 012.5 2.5V16a4 4 0 11-2 0v-1.5a.5.5 0 00-.5-.5h-6a.5.5 0 00-.5.5V16a4 4 0 11-2 0v-1.5A2.5 2.5 0 019.5 12h2.75V9.93A4.001 4.001 0 0112 2z"/>
      </svg>
    ),
  },
  {
    title: "API & Backend Systems",
    description:
      "Reliable server-side architecture — REST APIs, database design, authentication, and integrations that power your applications behind the scenes.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
        <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
      </svg>
    ),
  },
  {
    title: "UI/UX Implementation",
    description:
      "Turning designs into pixel-perfect, accessible interfaces with smooth interactions, responsive layouts, and attention to every detail.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>
      </svg>
    ),
  },
  {
    title: "Digital Transformation",
    description:
      "We help businesses move beyond manual processes and embrace smart, digital solutions — improving efficiency and driving growth across operations.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    title: "Technical Consulting",
    description:
      "Need guidance on architecture, stack selection, or scaling? We advise teams on making the right technical decisions early.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section id="hero" className="hero">
        <div className="hero__bg">
          <div className="hero__bg-gradient" />
          <div className="hero__grid" />
          <div className="hero__orb hero__orb--1" />
          <div className="hero__orb hero__orb--2" />
          <div className="hero__orb hero__orb--3" />
          <div className="hero__glow-ring" />
        </div>
        <div className="hero__content">
          <AnimateOnScroll>
            <span className="section-label">Technology Company</span>
          </AnimateOnScroll>
          <AnimateOnScroll delay={80}>
            <h1 className="hero__title text-balance">
              Turning ideas into{" "}
              <span className="gradient-text">impactful solutions</span>
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll delay={160}>
            <p className="hero__subtitle">
              LetsCode builds intelligent, scalable digital solutions for businesses and organizations — from web and mobile applications to{" "}
              <TypeWriter
                words={["AI-powered systems", "smart platforms", "digital products", "scalable solutions"]}
                className="gradient-text"
              />
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={240}>
            <div className="hero__actions">
              <a href="#team" className="btn btn--primary">
                Meet the Team
              </a>
              <a href="#services" className="btn btn--secondary">
                Our Services
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="section section--alt">
        <div className="section__inner">
          <AnimateOnScroll>
            <div className="section__header">
              <span className="section-label">About Us</span>
              <h2 className="section__title">From a simple vision to real impact</h2>
              <p className="section__desc">
                Every great idea starts small. LetsCode began with a simple
                vision — to help businesses move beyond manual processes and
                embrace smart, digital solutions.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="about-grid">
            <AnimateOnScroll>
              <div className="about-text">
                <p>
                  What started as just an idea has now grown into something real.
                  Today, we are proud to introduce LetsCode — a technology
                  company focused on building intelligent, scalable digital
                  solutions for businesses and organizations.
                </p>
                <p>
                  From web and mobile applications to AI-powered systems, our
                  goal is to turn ideas into impactful, real-world solutions
                  that improve efficiency and drive growth.
                </p>
                <p>
                  We believe the future belongs to those who build, innovate,
                  and adapt — and we are here to be part of that future. Based
                  in Ghana with collaborators across borders, this is just the
                  beginning of our journey. 🚀
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={100}>
              <div className="about-stats">
                <div className="about-stat">
                  <div className="about-stat__value">{teamMembers.length}</div>
                  <div className="about-stat__label">Developers</div>
                </div>
                <div className="about-stat">
                  <div className="about-stat__value">10+</div>
                  <div className="about-stat__label">Projects Delivered</div>
                </div>
                <div className="about-stat">
                  <div className="about-stat__value">3</div>
                  <div className="about-stat__label">Countries</div>
                </div>
                <div className="about-stat">
                  <div className="about-stat__value">2024</div>
                  <div className="about-stat__label">Founded</div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="section section--glow-top">
        <div className="section__inner">
          <AnimateOnScroll>
            <div className="section__header">
              <span className="section-label">What We Do</span>
              <h2 className="section__title">Services</h2>
              <p className="section__desc">
                From web and mobile applications to AI-powered systems — we
                build intelligent solutions that improve efficiency and drive
                growth for your business.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="services-grid">
            {services.map((service, i) => (
              <AnimateOnScroll key={service.title} delay={i * 60}>
                <div className="service-card">
                  <div className="service-card__icon">{service.icon}</div>
                  <h3 className="service-card__title">{service.title}</h3>
                  <p className="service-card__desc">{service.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section id="team" className="section section--alt">
        <div className="section__inner">
          <AnimateOnScroll>
            <div className="section__header">
              <span className="section-label">Our People</span>
              <h2 className="section__title">Meet the team</h2>
              <p className="section__desc">
                Every developer has their own portfolio. Click on anyone to see
                their work, skills, and projects in detail.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="team-grid">
            {teamMembers.map((member, i) => (
              <AnimateOnScroll key={member.slug} delay={i * 80}>
                <TeamCard member={member} index={i} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="section section--glow-top">
        <div className="section__inner">
          <AnimateOnScroll>
            <div className="section__header">
              <span className="section-label">Get in Touch</span>
              <h2 className="section__title">Let&apos;s work together</h2>
              <p className="section__desc">
                Have a project in mind? Reach out and let&apos;s talk about what
                we can build for you.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="contact-grid">
            <AnimateOnScroll>
              <a href="mailto:letscode@example.com" className="contact-item">
                <div className="contact-item__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M22 4l-10 8L2 4"/>
                  </svg>
                </div>
                <div>
                  <span className="contact-item__label">Email</span>
                  <span className="contact-item__value">letscode@example.com</span>
                </div>
              </a>
            </AnimateOnScroll>

            <AnimateOnScroll delay={60}>
              <div className="contact-item">
                <div className="contact-item__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <span className="contact-item__label">Location</span>
                  <span className="contact-item__value">Kumasi, Ghana</span>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={120}>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="contact-item">
                <div className="contact-item__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <span className="contact-item__label">GitHub</span>
                  <span className="contact-item__value">LetsCode</span>
                </div>
              </a>
            </AnimateOnScroll>

            <AnimateOnScroll delay={180}>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="contact-item">
                <div className="contact-item__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <span className="contact-item__label">LinkedIn</span>
                  <span className="contact-item__value">LetsCode</span>
                </div>
              </a>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </main>
  );
}
