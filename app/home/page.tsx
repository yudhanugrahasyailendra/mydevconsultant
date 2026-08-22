import HeroTerminal from "../components/HeroTerminal";
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
            <h1>Website yang dibangun<br />serapi <span className="accent">kodenya.</span></h1>
            <p className="lead">MyDEV membantu bisnis dan personal di Makassar—dan seluruh Indonesia—punya website cepat, rapi, dan enak dilihat. Dari landing page sampai aplikasi web custom.</p>
            <div className="hero-ctas">
              <Link href="/contact" className="btn btn-primary">Mulai Proyek Anda →</Link>
              <Link href="/portofolio" className="btn btn-ghost">Lihat Portofolio</Link>
            </div>
            <div className="hero-meta">
              <span><i className="dot"></i> Respon &lt; 1 jam</span>
              <span><i className="dot"></i> Basis Makassar, kerja seluruh Indonesia</span>
              <span><i className="dot"></i> Revisi sampai puas</span>
            </div>
          </div>
          <div className="stage">
            <div className="terminal">
              <div className="term-bar">
                <span className="term-dot"></span><span className="term-dot"></span><span className="term-dot"></span>
                <span className="term-file">index.html — proyek-klien</span>
              </div>
              <HeroTerminal />
            </div>
            <div className="preview-card">
              <div className="preview-top"><span></span><span></span><span></span></div>
              <div className="preview-body">
                <div className="bar w1"></div>
                <div className="bar w2"></div>
                <div className="bar w3"></div>
                <div className="box"></div>
              </div>
            </div>
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
            <div className="lbl">source code milik Anda</div>
          </div>
        </div>
      </div>

      <section id="layanan">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">LAYANAN</div>
            <h2>Satu tim, semua kebutuhan web Anda</h2>
            <p>Mulai dari halaman promosi sederhana sampai sistem custom—dikerjakan langsung, tanpa lempar-lempar ke banyak vendor.</p>
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
          <div className="section-head">
            <div className="eyebrow">// PROSES KERJA</div>
            <h2>Lima commit sampai website Anda live</h2>
            <p>Alur kerja yang sama untuk setiap proyek, supaya Anda selalu tahu ada di tahap mana.</p>
          </div>
          <div className="log">
            <div className="log-item">
              <div className="log-hash">$ commit a1c9f2 — discovery</div>
              <h3>Diskusi & Riset</h3>
              <p>Kami gali tujuan bisnis, target pengunjung, dan referensi yang Anda suka lewat chat atau call singkat.</p>
            </div>
            <div className="log-item">
              <div className="log-hash">$ commit 7e40b1 — design</div>
              <h3>Wireframe & Desain</h3>
              <p>Susunan halaman dan tampilan visual dibuat dulu, Anda review sebelum satu baris kode pun ditulis.</p>
            </div>
            <div className="log-item">
              <div className="log-hash">$ commit c33d08 — build</div>
              <h3>Development</h3>
              <p>Desain yang disetujui kami ubah jadi website yang berfungsi—cepat, rapi, dan mobile-friendly.</p>
            </div>
            <div className="log-item">
              <div className="log-hash">$ commit f912aa — qa</div>
              <h3>Testing & Revisi</h3>
              <p>Dicek di berbagai perangkat dan browser, lalu direvisi sesuai masukan Anda sampai benar-benar pas.</p>
            </div>
            <div className="log-item">
              <div className="log-hash">$ commit 0d8e17 — deploy</div>
              <h3>Launch & Support</h3>
              <p>Website naik ke domain Anda, plus pendampingan pasca-launch kalau ada yang perlu disesuaikan.</p>
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
