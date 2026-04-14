import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { teamBySlug, teamMembers } from "@/data/team";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export function generateStaticParams() {
  return teamMembers.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const member = teamBySlug[slug];

  if (!member) {
    return {
      title: "Developer Not Found | LetsCode",
      description: "The requested developer profile was not found.",
    };
  }

  return {
    title: `${member.name} — ${member.role} | LetsCode`,
    description: member.bio.substring(0, 160),
  };
}

export default async function TeamMemberPage({ params }) {
  const { slug } = await params;
  const member = teamBySlug[slug];

  if (!member) {
    notFound();
  }

  return (
    <main>
      {/* ── Hero ── */}
      <section className="profile-hero">
        <div className="profile-hero__bg" />
        <div className="profile-hero__content">
          <AnimateOnScroll>
            <div className="profile-hero__avatar-wrap">
              <Image
                src={member.image}
                alt={member.name}
                width={180}
                height={180}
                className="profile-hero__avatar"
                priority
                sizes="180px"
              />
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={80}>
            <div className="profile-hero__info">
              <h1 className="profile-hero__name">{member.name}</h1>
              <p className="profile-hero__role">{member.role}</p>
              <p className="profile-hero__location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {member.location}
              </p>
              <div className="profile-hero__actions">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--primary"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
                <Link href="/" className="btn btn--secondary">
                  ← Back to LetsCode
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── Bio ── */}
      <section className="section">
        <div className="section__inner">
          <AnimateOnScroll>
            <h2 className="profile-section-title">About</h2>
            <div className="profile-bio">
              <p>{member.bio}</p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── Expertise & Stack ── */}
      <section className="section section--alt">
        <div className="section__inner">
          <div className="about-grid">
            <AnimateOnScroll>
              <div>
                <h2 className="profile-section-title">Expertise</h2>
                <div className="profile-skills">
                  {member.expertise.map((skill) => (
                    <span key={skill} className="profile-skill">{skill}</span>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={80}>
              <div>
                <h2 className="profile-section-title">Tech Stack</h2>
                <div className="profile-stack">
                  {member.stack.map((tech) => (
                    <span key={tech} className="profile-stack-item">{tech}</span>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="section">
        <div className="section__inner">
          <AnimateOnScroll>
            <div className="section__header">
              <span className="section-label">Work</span>
              <h2 className="section__title">Projects</h2>
              <p className="section__desc">
                Selected projects that highlight {member.name.split(" ")[0]}&apos;s contributions and capabilities.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="projects-grid">
            {member.projects.map((project, i) => (
              <AnimateOnScroll key={project.title} delay={i * 80}>
                <div className="project-card">
                  <div className="project-card__number">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__desc">{project.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other Team Members ── */}
      <section className="section section--alt">
        <div className="section__inner">
          <AnimateOnScroll>
            <div className="section__header">
              <span className="section-label">Team</span>
              <h2 className="section__title">Other developers</h2>
            </div>
          </AnimateOnScroll>

          <div className="team-grid">
            {teamMembers
              .filter((m) => m.slug !== member.slug)
              .slice(0, 3)
              .map((m, i) => (
                <AnimateOnScroll key={m.slug} delay={i * 60}>
                  <Link href={`/team/${m.slug}`} className="team-card" id={`other-team-${m.slug}`}>
                    <div className="team-card__image-wrap">
                      <Image
                        src={m.image}
                        alt={m.name}
                        width={280}
                        height={320}
                        className="team-card__image"
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                      />
                      <div className="team-card__overlay">
                        <span className="team-card__view">View Portfolio →</span>
                      </div>
                    </div>
                    <div className="team-card__info">
                      <h3 className="team-card__name">{m.name}</h3>
                      <p className="team-card__role">{m.role}</p>
                    </div>
                  </Link>
                </AnimateOnScroll>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
