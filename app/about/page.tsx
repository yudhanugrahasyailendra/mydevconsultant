import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Tentang Kami — MyDEV",
  description: "Kenali MyDEV—tim jasa pembuatan website berbasis di Makassar yang melayani klien di seluruh Indonesia.",
};

export default function About() {
  return (
    <>
      <Navbar />

      <div className="page-header">
        <div className="wrap">
          <div className="eyebrow">TENTANG KAMI</div>
          <h1>Tim kecil, kerja rapi, hasil nyata</h1>
          <p>MyDEV lahir dari kebiasaan menulis kode yang bersih dan proses kerja yang jelas—dua hal yang menurut kami sering hilang di jasa pembuatan website kebanyakan.</p>
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
          <div className="story-grid">
            <div>
              <div className="eyebrow">CERITA KAMI</div>
              <h2>Dimulai dari satu masalah sederhana</h2>
              <p>Banyak bisnis kecil dan personal di Makassar butuh website, tapi sering terjebak antara harga mahal dari agensi besar atau hasil asal jadi dari freelancer lepas.</p>
              <p>MyDEV dibangun untuk mengisi celah itu—tim yang cukup kecil untuk cepat dan personal, tapi cukup disiplin untuk menghasilkan kode dan desain yang rapi seperti dikerjakan tim besar.</p>
              <p>Setiap proyek kami perlakukan seperti commit di git: jelas tujuannya, terdokumentasi prosesnya, dan bisa diaudit hasilnya.</p>
            </div>
            <div className="story-visual">
              <div className="log-hash">$ cat mission.md</div>
              <p>&quot;Membantu bisnis dan personal di Indonesia punya website cepat, rapi, dan enak dilihat—tanpa proses yang membingungkan atau harga yang tidak masuk akal.&quot;</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg-alt)" }}>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">NILAI KAMI</div>
            <h2>Prinsip yang kami pegang di setiap proyek</h2>
            <p>Bukan sekadar kata-kata manis—ini yang benar-benar membentuk cara kami bekerja sehari-hari.</p>
          </div>
          <div className="grid-3">
            <div className="svc-card">
              <div className="svc-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg></div>
              <h3>Transparan</h3>
              <p>Anda tahu persis progres, biaya, dan alasan tiap keputusan desain—tidak ada yang ditutup-tutupi.</p>
            </div>
            <div className="svc-card">
              <div className="svc-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg></div>
              <h3>Cepat & Rapi</h3>
              <p>Kecepatan pengerjaan tidak mengorbankan kualitas kode maupun tampilan akhir.</p>
            </div>
            <div className="svc-card">
              <div className="svc-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></div>
              <h3>Kolaboratif</h3>
              <p>Anda dilibatkan sejak riset awal sampai testing akhir, bukan hanya menerima hasil jadi.</p>
            </div>
            <div className="svc-card">
              <div className="svc-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></div>
              <h3>Dukungan Jangka Panjang</h3>
              <p>Website Anda tetap kami pantau setelah launch—bukan sekadar lepas tangan begitu invoice lunas.</p>
            </div>
            <div className="svc-card">
              <div className="svc-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M8 12h8M8 8h8M8 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></div>
              <h3>Kode yang Bisa Diaudit</h3>
              <p>Source code terstruktur dan didokumentasikan, jadi tidak terkunci pada satu developer saja.</p>
            </div>
            <div className="svc-card">
              <div className="svc-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M8 9l-5 5 5 5M16 9l5 5-5 5M13 3L9 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
              <h3>100% Milik Anda</h3>
              <p>Domain, hosting, dan source code sepenuhnya milik klien—tidak ada penguncian vendor.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="process-alt">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">// PERJALANAN KAMI</div>
            <h2>Perkembangan MyDEV dari waktu ke waktu</h2>
          </div>
          <div className="log">
            <div className="log-item">
              <div className="log-hash">$ commit 2023 — genesis</div>
              <h3>MyDEV Didirikan</h3>
              <p>Berawal dari proyek freelance di Makassar, MyDEV resmi berdiri sebagai jasa pembuatan website.</p>
            </div>
            <div className="log-item">
              <div className="log-hash">$ commit 2024 — growth</div>
              <h3>50 Proyek Pertama</h3>
              <p>Melewati 50 website yang diluncurkan untuk klien di berbagai kota, dari company profile sampai toko online.</p>
            </div>
            <div className="log-item">
              <div className="log-hash">$ commit 2025 — expansion</div>
              <h3>Melayani Seluruh Indonesia</h3>
              <p>Perluasan layanan secara remote, memungkinkan klien di luar Makassar bekerja sama tanpa hambatan jarak.</p>
            </div>
            <div className="log-item">
              <div className="log-hash">$ commit 2026 — today</div>
              <h3>Terus Berkembang</h3>
              <p>Kini fokus pada web app custom dan dukungan jangka panjang untuk klien yang terus bertumbuh.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="cta-band">
          <div className="eyebrow" style={{ justifyContent: "center" }}>&lt;/&gt; MARI BEKERJA SAMA</div>
          <h2>Punya proyek website di kepala Anda?</h2>
          <p>Ceritakan kebutuhan Anda, kami bantu wujudkan dari perencanaan sampai launch.</p>
          <div className="hero-ctas">
            <Link href="/contact" className="btn btn-primary">Hubungi Kami →</Link>
            <Link href="/services" className="btn btn-ghost">Lihat Layanan</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
