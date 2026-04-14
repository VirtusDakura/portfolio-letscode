"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
      >
        <div className="navbar__inner">
          <Link href="/" className="navbar__logo" onClick={() => setMobileOpen(false)}>
            <Image src="/Logo.jpeg" alt="LetsCode" width={36} height={36} className="navbar__logo-img" />
            LetsCode
          </Link>

          {/* Desktop nav */}
          <nav className="navbar__links">
            <Link href="/" className="navbar__link">Home</Link>
            <Link href="/#about" className="navbar__link">About</Link>
            <Link href="/#services" className="navbar__link">Services</Link>
            <Link href="/#team" className="navbar__link">Our Team</Link>
            <Link href="/#contact" className="navbar__link">Contact</Link>
          </nav>

          <div className="navbar__actions">
            <Link href="/#contact" className="btn btn--primary navbar__cta">
              Get in Touch
            </Link>
            <button
              className="navbar__hamburger"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`mobile-nav ${mobileOpen ? "mobile-nav--open" : ""}`}
        onClick={() => setMobileOpen(false)}
      >
        <div className="mobile-nav__panel" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-nav__header">
            <Link href="/" className="navbar__logo" onClick={() => setMobileOpen(false)}>
              <Image src="/Logo.jpeg" alt="LetsCode" width={36} height={36} className="navbar__logo-img" />
              LetsCode
            </Link>
            <button
              className="mobile-nav__close"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <nav className="mobile-nav__links">
            <Link href="/" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/#about" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>About</Link>
            <Link href="/#services" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>Services</Link>
            <Link href="/#team" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>Our Team</Link>
            <Link href="/#contact" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>Contact</Link>
          </nav>

          <div className="mobile-nav__footer">
            <Link href="/#contact" className="btn btn--primary btn--full" onClick={() => setMobileOpen(false)}>
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
