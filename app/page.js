import Link from "next/link";
import Image from "next/image";
import { portfolioList } from "@/data/portfolios";

const services = [
  {
    icon: "bi-palette",
    title: "UI Consistency",
    description: "One polished template style across every personal portfolio profile."
  },
  {
    icon: "bi-layout-text-window-reverse",
    title: "Content System",
    description: "Profile content is centralized and easy to update for each person.",
    featured: true
  },
  {
    icon: "bi-code-slash",
    title: "Modern Implementation",
    description: "Built with Next.js while preserving the exact Craftivo visual language."
  },
  {
    icon: "bi-diagram-3",
    title: "Scalable Workflow",
    description: "Add more people without duplicating template files across the project."
  }
];

const categoryCount = new Set(portfolioList.map((portfolio) => portfolio.category)).size;

export default function HomePage() {
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
                <a href="#about">LetsCode</a>
              </li>
              <li>
                <a href="#services">Approach</a>
              </li>
              <li>
                <a href="#portfolio-tabs">Portfolio Tabs</a>
              </li>
              <li className="dropdown">
                <a href="#">
                  <span>Portfolios</span>
                  <i className="bi bi-chevron-down toggle-dropdown"></i>
                </a>
                <ul>
                  {portfolioList.map((portfolio) => (
                    <li key={portfolio.slug}>
                      <Link href={`/${portfolio.slug}`}>{portfolio.name}</Link>
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

          <a className="btn-getstarted" href="#portfolio-tabs">View Tabs</a>
        </div>
      </header>

      <main className="main">
        <section id="hero" className="hero section dark-background">
          <Image
            src="/assets/img/profile/profile-bg-5.webp"
            alt="LetsCode background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectFit: "cover" }}
            data-aos="fade-in"
          />

          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row justify-content-center">
              <div className="col-lg-9 text-center">
                <span className="letscode-hero-badge mb-4">
                  <i className="bi bi-stars"></i>
                  LetsCode Collective
                </span>
                <h2>We Build Scalable Portfolio Experiences</h2>
                <p>
                  We are a team of <span className="typed" data-typed-items="Designers, Developers, Mentors, Collaborators"></span>
                  <span className="typed-cursor" aria-hidden="true"></span>
                </p>
                <div className="social-links">
                  <a href="#portfolio-tabs"><i className="bi bi-person-lines-fill"></i></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about section">
          <div className="container section-title" data-aos="fade-up">
            <span className="subtitle">About LetsCode</span>
            <h2>About LetsCode</h2>
            <p>
              This is a unique homepage that explains LetsCode first, then routes visitors into each person portfolio
              through navbar tabs and profile links.
            </p>
          </div>

          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-5">
              <div className="col-lg-4" data-aos="zoom-in" data-aos-delay="150">
                <div className="profile-card">
                  <div className="profile-header">
                    <div className="profile-avatar">
                      <Image
                        src="/assets/img/profile/profile-square-3.webp"
                        width={200}
                        height={200}
                        className="img-fluid"
                        alt="LetsCode Team"
                      />
                      <div className="status-indicator"></div>
                    </div>
                    <h3>LetsCode Team</h3>
                    <span className="role">Portfolio Experience Studio</span>
                  </div>

                  <div className="profile-stats">
                    <div className="stat-item">
                      <h4>{portfolioList.length}</h4>
                      <p>Profiles</p>
                    </div>
                    <div className="stat-item">
                      <h4>{categoryCount}</h4>
                      <p>Tracks</p>
                    </div>
                    <div className="stat-item">
                      <h4>1</h4>
                      <p>Unified UI</p>
                    </div>
                  </div>

                  <div className="profile-actions">
                    <a href="#portfolio-tabs" className="btn-primary"><i className="bi bi-grid"></i> Open Tabs</a>
                    <a href="#contact" className="btn-secondary"><i className="bi bi-envelope"></i> Contact</a>
                  </div>
                </div>
              </div>

              <div className="col-lg-8" data-aos="fade-left" data-aos-delay="200">
                <div className="content-wrapper">
                  <div className="bio-section">
                    <div className="section-tag">Landing Context</div>
                    <h2>Craftivo Style, LetsCode Story</h2>
                    <p>
                      The animations, colors, typography, and spacing follow the original static template files.
                    </p>
                    <p>
                      Navbar tabs now include direct portfolio access for each person while preserving the same UI language.
                    </p>
                  </div>

                  <div className="details-grid">
                    <div className="detail-item"><i className="bi bi-briefcase"></i><div className="detail-content"><span>System</span><strong>Next.js Multi-Portfolio</strong></div></div>
                    <div className="detail-item"><i className="bi bi-palette"></i><div className="detail-content"><span>Design</span><strong>Template Matched</strong></div></div>
                    <div className="detail-item"><i className="bi bi-people"></i><div className="detail-content"><span>People</span><strong>{portfolioList.length} Profiles</strong></div></div>
                    <div className="detail-item"><i className="bi bi-phone"></i><div className="detail-content"><span>Layout</span><strong>Responsive Ready</strong></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="services section">
          <div className="container section-title" data-aos="fade-up">
            <span className="subtitle">Approach</span>
            <h2>LetsCode Approach</h2>
            <p>Reusable system with the same static template visual direction and behavior.</p>
          </div>

          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4">
              {services.map((service, index) => (
                <div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay={100 + index * 100} key={service.title}>
                  <div className={`service-item ${service.featured ? "featured" : ""}`}>
                    {service.featured ? <div className="featured-tag">Featured</div> : null}
                    <div className="icon-wrapper"><i className={`bi ${service.icon}`}></i></div>
                    <h4>{service.title}</h4>
                    <p>{service.description}</p>
                    <a href="#portfolio-tabs" className="read-more"><span>Explore</span><i className="bi bi-arrow-right"></i></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio-tabs" className="portfolio section">
          <div className="container section-title" data-aos="fade-up">
            <span className="subtitle">Portfolio Tabs</span>
            <h2>Open Each Person Portfolio</h2>
            <p>Use these tabs or the navbar dropdown to open each dedicated profile page.</p>
          </div>

          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <ul className="portfolio-filters portfolio-person-tabs" data-aos="fade-up" data-aos-delay="200">
              {portfolioList.map((portfolio, index) => (
                <li className={index === 0 ? "filter-active" : ""} key={portfolio.slug}>
                  <Link href={`/${portfolio.slug}`}>{portfolio.name}</Link>
                </li>
              ))}
            </ul>

            <div className="row gy-4" data-aos="fade-up" data-aos-delay="300">
              {portfolioList.map((portfolio) => (
                <div className="col-lg-4 col-md-6" key={portfolio.slug}>
                  <div className="person-tab-card">
                    <h4>{portfolio.name}</h4>
                    <p>{portfolio.headline}</p>
                    <Link className="person-tab-link" href={`/${portfolio.slug}`}>View Portfolio <i className="bi bi-arrow-right"></i></Link>
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
            <p>Reach out for profile updates, onboarding new people, or UI customization.</p>
          </div>

          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-4">
                <div className="info-item"><div className="icon-wrapper"><i className="bi bi-geo-alt"></i></div><div><h3>Address</h3><p>Kumasi, Ghana</p></div></div>
                <div className="info-item"><div className="icon-wrapper"><i className="bi bi-envelope"></i></div><div><h3>Email</h3><p>letscode@example.com</p></div></div>
              </div>

              <div className="col-lg-8">
                <div className="php-email-form">
                  <div className="row gy-4">
                    <div className="col-md-12 text-center">
                      <p className="mb-3">Visit our portfolio tabs to explore each team member&apos;s profile.</p>
                      <a href="#portfolio-tabs">
                        <button type="button">View Portfolios</button>
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
