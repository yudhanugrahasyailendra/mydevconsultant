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
            <p>Jasa pembuatan website—berbasis di Makassar, melayani klien di seluruh Indonesia.</p>
          </div>
          <div className="foot-cols">
            <div className="foot-col">
              <h4>LAYANAN</h4>
              <Link href="/services">Landing Page</Link>
              <Link href="/services">Company Profile</Link>
              <Link href="/services">Toko Online</Link>
              <Link href="/services">Web App Custom</Link>
            </div>
            <div className="foot-col">
              <h4>PERUSAHAAN</h4>
              <Link href="/about">Tentang Kami</Link>
              <Link href="/#portofolio">Portofolio</Link>
              <Link href="/#paket">Paket & Harga</Link>
            </div>
            <div className="foot-col">
              <h4>KONTAK</h4>
              <Link href="/contact">Hubungi Kami</Link>
              <Link href="#">hello@mydev.id</Link>
              <Link href="#">Makassar, Sulawesi Selatan</Link>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 MyDEV. Building your future.</span>
          <span>Dibangun dengan &lt;/&gt; dan kopi Makassar.</span>
        </div>
      </div>
    </footer>
  );
}
