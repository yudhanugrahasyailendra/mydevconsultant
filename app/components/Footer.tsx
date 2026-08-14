import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
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
              <strong>MyDEV</strong> hadir sebagai mitra strategis dan penyedia solusi IT terpercaya untuk mengakselerasi bisnis Anda. Kami berfokus pada pengembangan custom website, aplikasi mobile, serta layanan digital terintegrasi yang dirancang khusus untuk menjawab tantangan industri. Didukung oleh ekosistem teknologi mutakhir seperti Java, PHP, React, Angular, dan AWS, kami berkomitmen untuk mendorong efisiensi operasional dan memastikan kesuksesan transformasi digital perusahaan Anda.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="foot-social"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
              </svg>
            </a>
          </div>
          <div className="foot-menu">
            <h4>Menu</h4>
            <div className="foot-menu-grid">
              <div className="foot-menu-col">
                <Link href="/home">Beranda</Link>
                <Link href="/about">Tentang Kami</Link>
                <Link href="/services">Layanan</Link>
              </div>
              <div className="foot-menu-col">
                <Link href="/portofolio">Portofolio</Link>
                <Link href="/contact">Kontak</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 MyDEV. Building your future.</span>
        </div>
      </div>
    </footer>
  );
}
