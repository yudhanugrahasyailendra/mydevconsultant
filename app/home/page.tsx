import HeroShowcase from "../components/HeroShowcase";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Counter from "../components/Counter";

export default function Home() {
  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="wrap">
          <div>
            <h1>Website Profesional & Modern<br />untuk <span className="accent">Pertumbuhan Bisnis.</span></h1>
            <p className="lead">MyDEV membantu bisnis dan profesional di Makassar—serta seluruh Indonesia—memiliki website cepat, elegan, dan siap menghasilkan. Dari landing page konversi tinggi sampai aplikasi web custom.</p>
            <div className="hero-ctas">
              <Link href="/contact" className="btn btn-primary">Mulai Proyek Anda →</Link>
              <Link href="/portofolio" className="btn btn-ghost">Lihat Portofolio</Link>
            </div>
            <div className="hero-meta">
              <span><i className="dot"></i> Respon Cepat &lt; 1 Jam</span>
              <span><i className="dot"></i> Basis Makassar, Layanan Seluruh Indonesia</span>
              <span><i className="dot"></i> Garansi & Pendampingan Penuh</span>
            </div>
          </div>
          <div className="stage">
            <HeroShowcase />
          </div>
        </div>
      </section>

      <div className="trust">
        <div className="wrap">
          <div className="trust-item">
            <div className="num"><Counter end={50} suffix="+" /></div>
            <div className="lbl">website sudah diluncurkan</div>
          </div>
          <div className="trust-item">
            <div className="num"><Counter end={4.9} decimals={1} suffix="/5" /></div>
            <div className="lbl">rata-rata rating klien</div>
          </div>
          <div className="trust-item">
            <div className="num"><Counter end={3} />–<Counter end={14} /></div>
            <div className="lbl">hari waktu pengerjaan</div>
          </div>
          <div className="trust-item">
            <div className="num"><Counter end={100} suffix="%" /></div>
            <div className="lbl">hak milik penuh & aset digital</div>
          </div>
        </div>
      </div>

      <section id="layanan">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">LAYANAN KAMI</div>
            <h2>Satu tim, semua kebutuhan web Anda</h2>
            <p>Mulai dari halaman promosi sederhana sampai sistem custom—dikerjakan langsung oleh tim kami, tanpa lempar-lempar ke banyak vendor.</p>
          </div>
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

      <section id="proses" className="process-alt">
        <div className="wrap">
          <div className="section-head text-center" style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>ALUR KERJA KAMI</div>
            <h2>5 Langkah Terstruktur Menuju Website Impian Anda</h2>
            <p>Alur kerja profesional, terukur, dan transparan di setiap tahap—memastikan hasil sesuai ekspektasi Anda.</p>
          </div>
          <div className="commit-grid">
            <div className="commit-card">
              <div className="commit-header">
                <span className="commit-hash">Tahap 01</span>
                <span className="commit-tag">Discovery</span>
              </div>
              <h3>Konsultasi & Riset</h3>
              <p>Kami mendalami tujuan bisnis, target pengunjung, dan referensi yang Anda sukai lewat diskusi terarah.</p>
            </div>
            <div className="commit-card">
              <div className="commit-header">
                <span className="commit-hash">Tahap 02</span>
                <span className="commit-tag">UI/UX Design</span>
              </div>
              <h3>Wireframe & Desain</h3>
              <p>Susunan tata letak dan desain visual interaktif disiapkan untuk Anda review sebelum tahap produksi dimulai.</p>
            </div>
            <div className="commit-card">
              <div className="commit-header">
                <span className="commit-hash">Tahap 03</span>
                <span className="commit-tag">Development</span>
              </div>
              <h3>Pengerjaan & Integrasi</h3>
              <p>Desain diwujudkan menjadi website utuh yang berkecepatan tinggi, aman, dan responsif di seluruh gadget.</p>
            </div>
            <div className="commit-card">
              <div className="commit-header">
                <span className="commit-hash">Tahap 04</span>
                <span className="commit-tag">Quality Check</span>
              </div>
              <h3>Testing & Penyempurnaan</h3>
              <p>Pengujian ketat lintas perangkat dan browser, disempurnakan sesuai masukan Anda hingga benar-benar puas.</p>
            </div>
            <div className="commit-card">
              <div className="commit-header">
                <span className="commit-hash">Tahap 05</span>
                <span className="commit-tag">Go-Live</span>
              </div>
              <h3>Peluncuran & Support</h3>
              <p>Website resmi aktif di domain Anda, dilengkapi panduan pengelolaan serta pendampingan pasca-peluncuran.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="portofolio" style={{ background: "var(--bg-alt)" }}>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Portofolio</div>
            <h2>Beberapa proyek yang sudah kami bangun</h2>
            <p>Contoh pekerjaan—tampilan mockup untuk gambaran gaya visual yang bisa kami kerjakan.</p>
          </div>
          <div className="port-grid" style={{ marginBottom: "28px" }}>
            <div className="port-card">
              <div className="port-thumb" style={{ background: "linear-gradient(135deg,#5FC1F0,#1E7FB8)" }}>
                <Image src="/images/portofolio/Center Coconut.jpg" alt="Center Coconut" fill style={{ objectFit: 'cover' }} />
                <div className="browser-dots"><span></span><span></span><span></span></div>
              </div>
              <div className="port-info">
                <div className="tag">Company Profile</div>
                <h3>Center Coconut</h3>
                <p>Profil bisnis kopra putih Toraja</p>
                <div className="tech-stack">
                  <span className="tech-badge">Wordpress</span>
                  <span className="tech-badge">MySQL</span>
                </div>
                <div>
                  <Link href="#" className="btn-visit-modern">
                    Kunjungi Web
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 16.8V7H7.2" /></svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="port-card">
              <div className="port-thumb" style={{ background: "linear-gradient(135deg,#0D1117,#3D444D)" }}>
                <Image src="/images/portofolio/MAN Bindu.jpg" alt="Madrasah Aliyah Bindu" fill style={{ objectFit: 'cover' }} />
                <div className="browser-dots"><span></span><span></span><span></span></div>
              </div>
              <div className="port-info">
                <div className="tag">School Profile</div>
                <h3>Madrasah Aliyah Bindu</h3>
                <p>Profil sekolah lengkap dengan informasi akademik, kegiatan, dan fasilitas.</p>
                <div className="tech-stack">
                  <span className="tech-badge">Wordpress</span>
                  <span className="tech-badge">MySQL</span>
                </div>
                <div>
                  <Link href="#" className="btn-visit-modern">
                    Kunjungi Web
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 16.8V7H7.2" /></svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="port-card">
              <div className="port-thumb" style={{ background: "linear-gradient(135deg,#9ECE6A,#1E7FB8)" }}>
                <Image src="/images/portofolio/SMPN 1 Tinggimoncong.jpg" alt="SMP Negeri 1 Tinggimocong" fill style={{ objectFit: 'cover' }} />
                <div className="browser-dots"><span></span><span></span><span></span></div>
              </div>
              <div className="port-info">
                <div className="tag">School Profile</div>
                <h3>SMP Negeri 1 Tinggimocong</h3>
                <p>Profil sekolah lengkap dengan informasi akademik, kegiatan, dan fasilitas.</p>
                <div className="tech-stack">
                  <span className="tech-badge">Wordpress</span>
                  <span className="tech-badge">MySQL</span>
                </div>
                <div>
                  <Link href="#" className="btn-visit-modern">
                    Kunjungi Web
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 16.8V7H7.2" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <Link href="/portofolio" className="btn btn-ghost">Lihat Semua Portofolio →</Link>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">TESTIMONI</div>
            <h2>Kata mereka yang sudah pakai MyDEV</h2>
          </div>
          <div className="testi-grid">
            <div className="testi">
              <p className="quote">"Prosesnya jelas dari awal, tiap tahap dikabari. Website toko saya jadi lebih cepat dari yang lama."</p>
              <div className="testi-who">
                <div className="avatar"></div>
                <div><div className="name">Nurul Aisyah</div><div className="role">Pemilik, Rumah Tenun Sengkang</div></div>
              </div>
            </div>
            <div className="testi">
              <p className="quote">"Awalnya cuma butuh landing page, sekarang lanjut ke sistem booking. Enak, satu tim yang paham semua."</p>
              <div className="testi-who">
                <div className="avatar"></div>
                <div><div className="name">dr. Fajar Ramadhan</div><div className="role">Klinik Sehati</div></div>
              </div>
            </div>
            <div className="testi">
              <p className="quote">"Revisi cepat direspon, hasil akhirnya rapi banget dan gampang diubah sendiri lewat CMS-nya."</p>
              <div className="testi-who">
                <div className="avatar"></div>
                <div><div className="name">Siti Marlina</div><div className="role">Kopi Anoa Roastery</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
