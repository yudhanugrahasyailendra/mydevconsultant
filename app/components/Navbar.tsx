import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image
            src="/images/logo/MyDEV.png"
            alt="MyDEV logo"
            width={100}
            height={100}
            className="logo-img"
            priority
          />
        </Link>
        <ul className="links">
          <li><Link href="/about">Tentang Kami</Link></li>
          <li><Link href="/services">Layanan</Link></li>
          <li><Link href="/#proses">Proses</Link></li>
          <li><Link href="/#paket">Paket</Link></li>
          <li><Link href="/contact">Kontak</Link></li>
        </ul>
        <div className="nav-cta">
          <Link href="/contact" className="btn btn-primary" style={{ padding: "11px 20px", fontSize: "14px" }}>Hubungi Kami</Link>
        </div>
      </nav>
    </header>
  );
}
