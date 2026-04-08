import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { portfolioBySlug, portfolioList } from "@/data/portfolios";

const serviceIcons = [
  "bi-briefcase",
  "bi-bar-chart",
  "bi-code-slash",
  "bi-layers",
  "bi-lightbulb",
  "bi-people"
];

function skillPercent(index) {
  return Math.max(65, 95 - index * 6);
}

export function generateStaticParams() {
  return portfolioList.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const portfolio = portfolioBySlug[slug];

  if (!portfolio) {
    return {
      title: "Portfolio Not Found | LetsCode",
      description: "Requested portfolio was not found."
    };
  }

  return {
    title: `${portfolio.name} | LetsCode Portfolio`,
    description: portfolio.intro
  };
}

export default async function PortfolioPage({ params }) {
  const { slug } = await params;
  const portfolio = portfolioBySlug[slug];

  if (!portfolio) {
    notFound();
  }

  const currentYear = new Date().getFullYear();

  return (
    <>
      <header id="header" className="header d-flex align-items-center fixed-top">
        <div className="container-fluid container-xl position-relative d-flex align-items-center">
          <Link href="/" className="logo d-flex align-items-center me-auto">
            <h1 className="sitename">LetsCode</h1>
          </Link>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <a href="#hero" className="active">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#portfolio">Portfolio</a>
              </li>
              <li className="dropdown">
                <a href="#">
                  <span>Switch Profile</span>
                  <i className="bi bi-chevron-down toggle-dropdown"></i>
                </a>
                <ul>
                  {portfolioList.map((person) => (
                    <li key={person.slug}>
                      <Link className={person.slug === portfolio.slug ? "active" : ""} href={`/${person.slug}`}>
                        {person.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

          <a className="btn-getstarted" href={portfolio.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </header>

      <main className="main">
        <section id="hero" className="hero section dark-background">
          <Image
            src={portfolio.cover}
            alt={portfolio.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectFit: "cover" }}
            data-aos="fade-in"
          />
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <h2>{portfolio.name}</h2>
                <p>
                  I am a <span className="typed" data-typed-items={portfolio.skills.join(", ")}></span>
                  <span className="typed-cursor" aria-hidden="true"></span>
                </p>
                <div className="social-links">
                  <a href={portfolio.linkedin} target="_blank" rel="noreferrer">
                    <i className="bi bi-linkedin"></i>
                  </a>
                  <Link href="/">
                    <i className="bi bi-house"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about section">
          <div className="container section-title" data-aos="fade-up">
            <span className="subtitle">About</span>
            <h2>About</h2>
            <p>{portfolio.headline}</p>
          </div>

          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-5">
              <div className="col-lg-4" data-aos="zoom-in" data-aos-delay="150">
                <div className="profile-card">
                  <div className="profile-header">
                    <div className="profile-avatar">
                      <Image
                        src={portfolio.image}
                        width={200}
                        height={200}
                        className="img-fluid"
                        alt={portfolio.name}
                      />
                      <div className="status-indicator"></div>
                    </div>
                    <h3>{portfolio.name}</h3>
                    <span className="role">{portfolio.headline}</span>
                  </div>

                  <div className="profile-stats">
                    <div className="stat-item">
                      <h4>{portfolio.projects.length}</h4>
                      <p>Projects</p>
                    </div>
                    <div className="stat-item">
                      <h4>{portfolio.services.length}</h4>
                      <p>Services</p>
                    </div>
                    <div className="stat-item">
                      <h4>{portfolio.skills.length}</h4>
                      <p>Skills</p>
                    </div>
                  </div>

                  <div className="profile-actions">
                    <a href={portfolio.linkedin} target="_blank" rel="noreferrer" className="btn-primary">
                      <i className="bi bi-linkedin"></i> LinkedIn
                    </a>
                    <a href="#contact" className="btn-secondary">
                      <i className="bi bi-envelope"></i> Contact
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-8" data-aos="fade-left" data-aos-delay="200">
                <div className="content-wrapper">
                  <div className="bio-section">
                    <div className="section-tag">Profile Bio</div>
                    <h2>Professional Summary</h2>
                    {portfolio.about.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="details-grid">
                    <div className="detail-item">
                      <i className="bi bi-geo-alt"></i>
                      <div className="detail-content">
                        <span>Based In</span>
                        <strong>{portfolio.location}</strong>
                      </div>
                    </div>
                    {portfolio.highlights.map((item) => (
                      <div className="detail-item" key={item.label}>
                        <i className="bi bi-check-circle"></i>
                        <div className="detail-content">
                          <span>{item.label}</span>
                          <strong>{item.value}</strong>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="skills-showcase" data-aos="fade-up" data-aos-delay="250">
                    <div className="section-tag">Core Skills</div>
                    <h3>Technical Proficiency</h3>
                    <div className="skills-list skills-animation">
                      {portfolio.skills.map((skill, index) => (
                        <div className="skill-item" key={skill}>
                          <div className="skill-info">
                            <span className="skill-name">{skill}</span>
                            <span className="skill-percent">{skillPercent(index)}%</span>
                          </div>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              aria-valuenow={skillPercent(index)}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="services section">
          <div className="container section-title" data-aos="fade-up">
            <span className="subtitle">Services</span>
            <h2>Services</h2>
            <p>{portfolio.intro}</p>
          </div>

          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4">
              {portfolio.services.map((service, index) => (
                <div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay={100 + index * 100} key={service.title}>
                  <div className={`service-item ${index === 1 ? "featured" : ""}`}>
                    {index === 1 ? <div className="featured-tag">Featured</div> : null}
                    <div className="icon-wrapper">
                      <i className={`bi ${serviceIcons[index % serviceIcons.length]}`}></i>
                    </div>
                    <h4>{service.title}</h4>
                    <p>{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="portfolio section">
          <div className="container section-title" data-aos="fade-up">
            <span className="subtitle">Portfolio</span>
            <h2>Portfolio</h2>
            <p>Selected concepts and feature ideas for this profile.</p>
          </div>

          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4">
              {portfolio.projects.map((project, index) => (
                <div className="col-lg-4 col-md-6" key={project.title}>
                  <div className="portfolio-card">
                    <div className="portfolio-image-container">
                      <Image
                        src={`/assets/img/portfolio/portfolio-${(index % 6) + 1}.webp`}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="img-fluid"
                        loading="lazy"
                      />
                    </div>
                    <div className="portfolio-meta">
                      <h4>{project.title}</h4>
                      <p>{project.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact section">
          <div className="container section-title" data-aos="fade-up">
            <span className="subtitle">Contact</span>
            <h2>Contact</h2>
            <p>Use the details below to connect directly.</p>
          </div>

          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-4">
                <div className="info-item"><div className="icon-wrapper"><i className="bi bi-geo-alt"></i></div><div><h3>Address</h3><p>{portfolio.location}</p></div></div>
                <div className="info-item"><div className="icon-wrapper"><i className="bi bi-linkedin"></i></div><div><h3>LinkedIn</h3><p>{portfolio.name}</p></div></div>
                <div className="info-item"><div className="icon-wrapper"><i className="bi bi-house"></i></div><div><h3>Hub</h3><p><Link href="/">Back to LetsCode Home</Link></p></div></div>
              </div>

              <div className="col-lg-8">
                <div className="php-email-form">
                  <div className="row gy-4">
                    <div className="col-md-12 text-center">
                      <p className="mb-3">Open the official profile link for full details.</p>
                      <a href={portfolio.linkedin} target="_blank" rel="noreferrer">
                        <button type="button">Visit LinkedIn</button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" className="footer">
        <div className="container copyright text-center mt-4">
          <p>
            © {currentYear}{" "}
            <strong className="px-1 sitename">LetsCode</strong>
            <span> All Rights Reserved</span>
          </p>
        </div>
      </footer>

      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>

      <div id="preloader"></div>
    </>
  );
}
