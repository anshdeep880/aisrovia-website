import React from "react";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="site-footer__main">
        <div className="site-footer__identity">
          <a className="brand brand--footer" href="/" aria-label="Anshdeep Singh Randev home">
            <img className="brand-logo brand-logo--footer" src="/assets/Logo/Footer.png" alt="ASR" />
          </a>
          <p>Engineering intelligent products with clarity and intent.</p>
        </div>
        <div className="site-footer__links">
          <p className="site-footer__heading">Quick links</p>
          <nav className="footer-nav" aria-label="Footer navigation">
            <Link href="/work">Work</Link>
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <div className="site-footer__contact">
          <p className="site-footer__heading">Contact</p>
          <a className="site-footer__email" href="mailto:contact@aisrovia.com">contact@aisrovia.com</a>
          <p className="site-footer__location">Perth, Australia.</p>
        </div>
        <div className="site-footer__connect">
          <p className="site-footer__heading">Connect</p>
          <div className="footer-socials" aria-label="Social links">
            <a href="mailto:contact@aisrovia.com" aria-label="Email">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3.5 6.5h17v11h-17zM4 7l8 6 8-6" />
              </svg>
            </a>
            <a href="https://wa.me/" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.4 3.6A11.7 11.7 0 0 0 2.8 19.1L2 22l3-0.8A11.7 11.7 0 1 0 20.4 3.6Z" />
                <path d="M8.5 7.2c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.9 2.1c.1.3.1.5-.1.7l-.6.7c.6 1.1 1.5 2 2.7 2.6l.7-.8c.2-.2.4-.2.7-.1l2 .9c.3.1.4.3.4.5v.5c0 .3-.2.6-.5.7-.6.2-1.3.3-2 .1-2.9-.9-5.3-3.2-6.3-6.1-.2-.6-.2-1.3 0-2Z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 9v10M5 5v.1M10 19v-5.6c0-1.8 1.1-3 2.8-3s2.7 1.2 2.7 3V19M10 10.4V19" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="site-footer__bottom">
        <p>© 2026 AiSROvia. All rights reserved.</p>
      </div>
    </footer>
  );
}
