import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Portofolio — MyDEV",
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
          <div className="trust-item"><div className="num">100%</div><div className="lbl">source code milik Anda</div></div>
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
              </div>
              <div className="port-info">
                <div className="tag">COMPANY PROFILE</div>
                <h3>Kopi Anoa Roastery</h3>
                <p>Profil bisnis kedai kopi lokal Makassar dengan katalog menu digital.</p>
              </div>
            </div>
            <div className="port-card">
              <div className="port-thumb" style={{ background: "linear-gradient(135deg,#0D1117,#3D444D)" }}>
                <div className="browser-dots"><span></span><span></span><span></span></div>
              </div>
              <div className="port-info">
                <div className="tag">TOKO ONLINE</div>
                <h3>Rumah Tenun Sengkang</h3>
                <p>Toko online kain tenun dengan katalog produk dan checkout WhatsApp.</p>
              </div>
            </div>
            <div className="port-card">
              <div className="port-thumb" style={{ background: "linear-gradient(135deg,#9ECE6A,#1E7FB8)" }}>
                <div className="browser-dots"><span></span><span></span><span></span></div>
              </div>
              <div className="port-info">
                <div className="tag">WEB APP</div>
                <h3>Dashboard Klinik Sehati</h3>
                <p>Sistem booking dan rekam pasien untuk klinik keluarga.</p>
              </div>
            </div>
            <div className="port-card">
              <div className="port-thumb" style={{ background: "linear-gradient(135deg,#F0B15F,#C8791E)" }}>
                <div className="browser-dots"><span></span><span></span><span></span></div>
              </div>
              <div className="port-info">
                <div className="tag">LANDING PAGE</div>
                <h3>Warung Nusantara</h3>
                <p>Landing page promosi untuk peluncuran menu baru restoran keluarga.</p>
              </div>
            </div>
            <div className="port-card">
              <div className="port-thumb" style={{ background: "linear-gradient(135deg,#D18FE0,#7A3FA0)" }}>
                <div className="browser-dots"><span></span><span></span><span></span></div>
              </div>
              <div className="port-info">
                <div className="tag">TOKO ONLINE</div>
                <h3>Butik Zahra Hijab</h3>
                <p>Toko online busana muslim dengan filter produk dan integrasi pembayaran.</p>
              </div>
            </div>
            <div className="port-card">
              <div className="port-thumb" style={{ background: "linear-gradient(135deg,#5FC1F0,#3D444D)" }}>
                <div className="browser-dots"><span></span><span></span><span></span></div>
              </div>
              <div className="port-info">
                <div className="tag">WEB APP</div>
                <h3>EduTrack LMS</h3>
                <p>Platform belajar daring untuk bimbingan belajar dengan pelacakan progres siswa.</p>
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
