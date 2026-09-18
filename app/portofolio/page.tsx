import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Portofolio | MyDEV - Building Your Future",
  description: "Kumpulan proyek website yang sudah dibangun MyDEV—dari landing page, company profile, toko online, sampai web app custom.",
};

export default function Portofolio() {
  return (
    <>
      <Navbar />

      <div className="page-header">
        <div className="wrap">
          <div className="eyebrow">PORTOFOLIO</div>
          <h1>Proyek yang sudah kami bangun</h1>
          <p>Sebagian pekerjaan MyDEV untuk klien di Makassar dan berbagai kota lain—mulai dari landing page sederhana sampai sistem web custom.</p>
        </div>
      </div>

      <div className="trust">
        <div className="wrap">
          <div className="trust-item"><div className="num">50+</div><div className="lbl">website sudah diluncurkan</div></div>
          <div className="trust-item"><div className="num">4.9/5</div><div className="lbl">rata-rata rating klien</div></div>
          <div className="trust-item"><div className="num">3–14</div><div className="lbl">hari waktu pengerjaan</div></div>
          <div className="trust-item"><div className="num">100%</div><div className="lbl">hak milik penuh & aset digital</div></div>
        </div>
      </div>

      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">PROYEK TERBARU</div>
            <h2>Enam contoh pekerjaan kami</h2>
            <p>Tampilan mockup untuk gambaran gaya visual dan jenis proyek yang bisa kami kerjakan.</p>
          </div>
          <div className="port-grid">
            <div className="port-card">
              <div className="port-thumb" style={{ background: "linear-gradient(135deg,#5FC1F0,#1E7FB8)" }}>
                <div className="browser-dots"><span></span><span></span><span></span></div>
                <Image src="/images/portofolio/Center Coconut.jpg" alt="Center Coconut" fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
              </div>
              <div className="port-info">
                <div className="tag">COMPANY PROFILE</div>
                <h3>Center Coconut</h3>
                <p>Website company profile dan katalog produk untuk Center Coconut.</p>
              </div>
            </div>
            <div className="port-card">
              <div className="port-thumb" style={{ background: "linear-gradient(135deg,#0D1117,#3D444D)" }}>
                <div className="browser-dots"><span></span><span></span><span></span></div>
                <Image src="/images/portofolio/MAN Bindu.jpg" alt="MAN Bindu" fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
              </div>
              <div className="port-info">
                <div className="tag">WEBSITE SEKOLAH</div>
                <h3>MAN Bindu</h3>
                <p>Website resmi instansi pendidikan MAN Bindu dengan sistem informasi sekolah.</p>
              </div>
            </div>
            <div className="port-card">
              <div className="port-thumb" style={{ background: "linear-gradient(135deg,#9ECE6A,#1E7FB8)" }}>
                <div className="browser-dots"><span></span><span></span><span></span></div>
                <Image src="/images/portofolio/SMPN 1 Tinggimoncong.jpg" alt="SMPN 1 Tinggimoncong" fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
              </div>
              <div className="port-info">
                <div className="tag">WEBSITE SEKOLAH</div>
                <h3>SMPN 1 Tinggimoncong</h3>
                <p>Platform informasi dan portal sekolah untuk SMPN 1 Tinggimoncong.</p>
              </div>
            </div>
            <div className="port-card">
              <div className="port-thumb" style={{ background: "linear-gradient(135deg,#F0B15F,#C8791E)" }}>
                <div className="browser-dots"><span></span><span></span><span></span></div>
                <Image src="/images/portofolio/ME Record Studio.png" alt="ME Record Studio" fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
              </div>
              <div className="port-info">
                <div className="tag">COMPANY PROFILE</div>
                <h3>ME Record Studio</h3>
                <p>Website resmi untuk ME Record Studio dengan katalog layanan dan portfolio musik.</p>
              </div>
            </div>
            <div className="port-card">
              <div className="port-thumb" style={{ background: "linear-gradient(135deg,#D18FE0,#7A3FA0)" }}>
                <div className="browser-dots"><span></span><span></span><span></span></div>
                <Image src="/images/portofolio/Wisata Malino.png" alt="Wisata Malino" fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
              </div>
              <div className="port-info">
                <div className="tag">PORTAL WISATA</div>
                <h3>Wisata Malino</h3>
                <p>Portal informasi pariwisata untuk destinasi Wisata Malino, lengkap dengan direktori tempat wisata.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="cta-band">
          <div className="eyebrow" style={{ justifyContent: "center" }}>&lt;/&gt; PROYEK BERIKUTNYA</div>
          <h2>Ingin website Anda ada di sini?</h2>
          <p>Ceritakan kebutuhan Anda, kami bantu wujudkan dari perencanaan sampai launch.</p>
          <div className="hero-ctas">
            <Link href="/contact" className="btn btn-primary">Mulai Proyek Anda →</Link>
            <Link href="/services" className="btn btn-ghost">Lihat Layanan</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
