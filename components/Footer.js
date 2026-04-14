import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <Link href="/" className="navbar__logo">
              <Image src="/Logo.jpeg" alt="LetsCode" width={36} height={36} className="navbar__logo-img" />
              LetsCode
            </Link>
            <p className="footer__tagline">
              Turning ideas into impactful, real-world solutions that improve efficiency and drive growth.
            </p>
            <div className="flex items-center gap-2 mt-4 text-[var(--color-text-muted)] text-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Kumasi, Ghana
            </div>
          </div>

          <div className="footer__columns">
            <div className="footer__col">
              <h4 className="footer__col-title">Company</h4>
              <Link href="/#about" className="footer__link">About</Link>
              <Link href="/#services" className="footer__link">Services</Link>
              <Link href="/#contact" className="footer__link">Contact</Link>
            </div>
            <div className="footer__col">
              <h4 className="footer__col-title">Connect</h4>
              <a href="mailto:letscode@example.com" className="footer__link">Email</a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="footer__link">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer__link">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {year} LetsCode. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
