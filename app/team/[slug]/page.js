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
    <main className="pb-24 pt-24 lg:pt-32 min-h-screen">
      {/* ── Personal Portfolio Hero ── */}
      <section className="relative px-6 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-[radial-gradient(ellipse_at_center,var(--color-accent-soft)_0%,transparent_60%)] -z-10 blur-xl" />
        
        <div className="max-w-6xl mx-auto">
          <Link href="/#team" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-heading)] transition-colors mb-12">
            ← Back to Team
          </Link>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 lg:gap-16">
            <AnimateOnScroll className="shrink-0 w-full md:w-auto flex justify-center">
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-[var(--radius-xl)] p-2 bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-2xl group">
                <div className="relative w-full h-full rounded-[var(--radius-lg)] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 192px, 256px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll delay={100} className="text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-[var(--color-accent-soft)] border border-[var(--color-border)] text-[var(--color-accent)] text-sm font-semibold tracking-wide uppercase">
                {member.role}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-[var(--color-heading)] mb-6 font-sans">
                Hi, I&apos;m {member.name.split(' ')[0]}.
              </h1>
              <p className="text-lg text-[var(--color-text)] mb-8 max-w-2xl leading-relaxed mx-auto md:mx-0">
                {member.bio}
              </p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--primary py-3 px-8 text-base shadow-[0_0_20px_var(--color-accent-soft)]"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Connect with Me
                </a>
                <a
                  href={member.github || "https://github.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="btn py-3 px-8 text-base bg-transparent border border-[var(--color-border)] text-[var(--color-heading)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-card)] transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a
                  href="#projects"
                  className="btn py-3 px-8 text-base bg-transparent border border-[var(--color-border)] text-[var(--color-heading)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-card)] transition-colors"
                >
                  View My Work
                </a>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── Expertise & Stack Section ── */}
      <section className="py-16 bg-[var(--color-bg-card)] border-y border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            <AnimateOnScroll>
              <h3 className="text-xl lg:text-2xl font-semibold text-[var(--color-heading)] mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                Core Expertise
              </h3>
              <div className="flex flex-wrap gap-3">
                {member.expertise.map((skill) => (
                  <span key={skill} className="px-4 py-2 rounded-full bg-[var(--color-bg-raised)] border border-[var(--color-border)] text-[var(--color-text)] text-sm font-medium hover:text-[var(--color-accent)] hover:border-[var(--color-text-muted)] transition-colors cursor-default shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={100}>
              <h3 className="text-xl lg:text-2xl font-semibold text-[var(--color-heading)] mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                </div>
                Technologies
              </h3>
              <div className="flex flex-wrap gap-3">
                {member.stack.map((tech) => (
                  <span key={tech} className="px-4 py-2 rounded-lg bg-transparent border border-[var(--color-border-hover)] text-[var(--color-text)] text-sm hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-heading)] transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── Custom Projects Showcase ── */}
      <section id="projects" className="py-24 relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle_at_center,var(--color-accent-soft)_0%,transparent_70%)] -z-10 blur-3xl opacity-50" />
        
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="mb-12 md:mb-16">
              <span className="inline-flex px-3 py-1 mb-4 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-muted)] text-xs font-bold tracking-widest uppercase">
                Portfolio
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-heading)] mb-4">Featured Work</h2>
              <p className="text-[var(--color-text)] max-w-2xl text-lg">
                Showcasing practical solutions, creative designs, and system architectures built to deliver real impact.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {member.projects.map((project, i) => (
              <AnimateOnScroll key={project.title} delay={i * 100}>
                <div className="group h-full p-8 rounded-[var(--radius-lg)] bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-bg-raised)] transition-all duration-300 flex flex-col hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                  <div className="w-14 h-14 rounded-[var(--radius-md)] bg-[var(--color-bg)] border border-[var(--color-border-hover)] text-[var(--color-text-muted)] flex items-center justify-center font-bold text-2xl mb-8 group-hover:scale-110 group-hover:bg-[var(--color-accent)] group-hover:text-white group-hover:border-[var(--color-accent)] transition-all duration-300 shadow-inner">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-heading)] mb-4 group-hover:text-[var(--color-accent)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[var(--color-text)] leading-relaxed flex-1">
                    {project.description}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Call to Action ── */}
      <section className="py-16 md:py-24 border-t border-[var(--color-border)] bg-gradient-to-b from-[var(--color-bg-card)] to-transparent relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22noise%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.65%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23noise)%22_opacity=%220.04%22/%3E%3C/svg%3E')] opacity-50 mix-blend-overlay pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <AnimateOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-heading)] mb-6">Want to collaborate?</h2>
            <p className="text-[var(--color-text)] mb-10 max-w-xl mx-auto text-lg">
              I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href={member.linkedin} target="_blank" rel="noreferrer" className="btn btn--primary py-4 px-8 text-base">
                Let&apos;s Connect
              </a>
              <a href={member.github || "https://github.com"} target="_blank" rel="noreferrer" className="btn py-4 px-8 text-base bg-transparent border border-[var(--color-border)] text-[var(--color-heading)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-card)] transition-colors rounded-xl flex items-center justify-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View GitHub
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  );
}
