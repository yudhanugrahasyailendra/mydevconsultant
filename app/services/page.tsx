import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Layanan | MyDEV - Building Your Future",
  description: "Layanan pembuatan website MyDEV: landing page, company profile, toko online, web app custom, redesign, dan maintenance.",
};

export default function Services() {
  return (
    <>
      <Navbar />

      <div className="page-header">
        <div className="wrap">
          <div className="eyebrow">LAYANAN KAMI</div>
          <h1>Satu tim, semua kebutuhan web Anda</h1>
          <p>Mulai dari halaman promosi sederhana sampai sistem custom—dikerjakan langsung oleh tim kami, tanpa lempar-lempar ke banyak vendor.</p>
        </div>
      </div>

      <section>
        <div className="wrap">
          <div className="grid-3">
            <div className="svc-card">
              <div className="svc-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg></div>
              <h3>Landing Page</h3>
              <p>Satu halaman fokus untuk kampanye, produk, atau personal branding. Cepat tayang, cepat konversi.</p>
            </div>
            <div className="svc-card">
              <div className="svc-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 21V9l8-6 8 6v12h-5v-7H9v7H4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg></div>
              <h3>Company Profile</h3>
              <p>Website resmi bisnis Anda—profil, layanan, portofolio, dan kontak—yang meyakinkan calon klien.</p>
            </div>
            <div className="svc-card">
              <div className="svc-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 6h18l-2 12H5L3 6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><circle cx="9" cy="21" r="1" fill="currentColor" /><circle cx="17" cy="21" r="1" fill="currentColor" /></svg></div>
              <h3>Toko Online</h3>
              <p>Sistem jual-beli lengkap dengan katalog, keranjang, dan pembayaran—siap terima pesanan 24 jam.</p>
            </div>
            <div className="svc-card">
              <div className="svc-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M8 9l-5 5 5 5M16 9l5 5-5 5M13 3L9 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
              <h3>Web App Custom</h3>
              <p>Sistem internal, dashboard, atau aplikasi khusus sesuai alur kerja bisnis Anda—dibangun dari nol.</p>
            </div>
            <div className="svc-card">
              <div className="svc-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M8 12h8M8 8h8M8 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></div>
              <h3>Redesign & UI/UX</h3>
              <p>Website lama terasa kaku? Kami rombak tampilan dan alurnya tanpa mengganggu isi yang sudah jalan.</p>
            </div>
            <div className="svc-card">
              <div className="svc-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></div>
              <h3>Maintenance & SEO</h3>
              <p>Website tetap aman, cepat, dan mudah ditemukan di Google—kami yang pantau, Anda fokus bisnis.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="process-alt">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">ALUR KERJA KAMI</div>
            <h2>5 Langkah Terstruktur Menuju Peluncuran Website Anda</h2>
            <p>Alur kerja profesional dan transparan agar Anda selalu mengetahui perkembangan proyek secara pasti.</p>
          </div>
          <div className="log">
            <div className="log-item">
              <div className="log-hash">Tahap 01 • Riset & Konsultasi</div>
              <h3>Diskusi & Riset Kebutuhan</h3>
              <p>Kami gali tujuan bisnis, target pengunjung, dan referensi yang Anda suka lewat chat atau call singkat.</p>
            </div>
            <div className="log-item">
              <div className="log-hash">Tahap 02 • Perancangan Visual</div>
              <h3>Wireframe & Desain UI/UX</h3>
              <p>Susunan tata letak dan tampilan visual interaktif disiapkan dulu, Anda review sebelum tahap produksi dimulai.</p>
            </div>
            <div className="log-item">
              <div className="log-hash">Tahap 03 • Pengerjaan & Integrasi</div>
              <h3>Development & Integrasi Sistem</h3>
              <p>Desain yang disetujui kami ubah jadi website yang berfungsi—cepat, rapi, aman, dan mobile-friendly.</p>
            </div>
            <div className="log-item">
              <div className="log-hash">Tahap 04 • Uji Coba Kualitas</div>
              <h3>Quality Assurance & Review Klien</h3>
              <p>Dicek di berbagai perangkat dan browser, lalu disempurnakan sesuai masukan Anda sampai benar-benar pas.</p>
            </div>
            <div className="log-item">
              <div className="log-hash">Tahap 05 • Go-Live & Garansi</div>
              <h3>Peluncuran & Pendampingan</h3>
              <p>Website naik ke domain resmi Anda, plus pendampingan pasca-launch agar langsung siap digunakan.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="cta-band">
          <div className="eyebrow" style={{ justifyContent: "center" }}>SIAP MEMULAI?</div>
          <h2>Ceritakan kebutuhan website Anda</h2>
          <p>Konsultasi awal gratis, tanpa komitmen. Kami balas lewat WhatsApp dalam hitungan menit.</p>
          <div className="hero-ctas">
            <Link href="/contact" className="btn btn-primary">Hubungi Kami →</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
