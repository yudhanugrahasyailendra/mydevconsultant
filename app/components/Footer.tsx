import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="modern-footer">
      <div className="wrap">
        <div className="foot-cta-banner">
          <div className="foot-cta-text">
            <h2>Siap Mengakselerasi Bisnis Anda?</h2>
            <p>Mari diskusikan kebutuhan website dan aplikasi Anda bersama tim ahli kami.</p>
          </div>
          <Link href="/contact" className="btn btn-primary foot-cta-btn">
            Mulai Konsultasi Gratis
          </Link>
        </div>

        <div className="foot-top">
          <div className="foot-brand">
            <div className="foot-logo-wrapper">
              <Image
                src="/images/logo/MyDEV.png"
                alt="MyDEV logo"
                width={200}
                height={200}
                className="foot-logo-img"
              />
            </div>
            <p className="foot-desc">
              Mitra strategis dan penyedia solusi IT terpercaya untuk pengembangan custom website, aplikasi mobile, dan layanan digital terintegrasi.
            </p>
            <div className="foot-socials">
              <a href="#" className="social-icon-link" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="social-icon-link" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="#" className="social-icon-link" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="foot-menu">
            <div className="foot-menu-col">
              <h4>Perusahaan</h4>
              <Link href="/home">Beranda</Link>
              <Link href="/about">Tentang Kami</Link>
              <Link href="/portofolio">Portofolio Klien</Link>
            </div>
            <div className="foot-menu-col">
              <h4>Layanan Kami</h4>
              <Link href="/services">Web Development</Link>
              <Link href="/services">Mobile Apps</Link>
              <Link href="/services">UI/UX Design</Link>
              <Link href="/services">IT Consulting</Link>
            </div>
            <div className="foot-menu-col">
              <h4>Kontak</h4>
              <Link href="/contact">Hubungi Kami</Link>
              <a href="mailto:mydev9883@gmail.com">mydev9883@gmail.com</a>
              <a href="#">WhatsApp Admin</a>
            </div>
          </div>
        </div>

        <div className="foot-bottom">
          <div className="foot-copyright">
            © 2026 MyDEV. Building your future.
          </div>
          <div className="foot-legal">
            <Link href="#">Syarat & Ketentuan</Link>
            <Link href="#">Kebijakan Privasi</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
