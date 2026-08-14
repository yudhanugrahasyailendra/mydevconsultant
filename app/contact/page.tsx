import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Kontak | MyDEV - Building Your Future",
  description: "Hubungi MyDEV untuk konsultasi gratis kebutuhan website Anda—via WhatsApp, email, atau form kontak.",
};

export default function Contact() {
  return (
    <>
      <Navbar />

      <div className="page-header">
        <div className="wrap">
          <div className="eyebrow">KONTAK</div>
          <h1>Ceritakan kebutuhan website Anda</h1>
          <p>Konsultasi awal gratis, tanpa komitmen. Isi form di bawah atau hubungi kami langsung—kami balas dalam hitungan menit.</p>
        </div>
      </div>

      <section>
        <div className="wrap">
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-card">
                <div className="svc-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                <div>
                  <h3>WhatsApp</h3>
                  <a href="#">Chat langsung dengan tim kami →</a>
                </div>
              </div>
              <div className="contact-card">
                <div className="svc-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" /><path d="m2 7 10 6 10-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                <div>
                  <h3>Email</h3>
                  <a href="mailto:mydev9883@gmail.com">mydev9883@gmail.com</a>
                </div>
              </div>
              <div className="contact-card">
                <div className="svc-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" /></svg></div>
                <div>
                  <h3>Lokasi</h3>
                  <p>Makassar, Sulawesi Selatan — melayani klien di seluruh Indonesia secara remote.</p>
                </div>
              </div>
              <div className="contact-card">
                <div className="svc-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                <div>
                  <h3>Jam Respon</h3>
                  <p>Senin–Sabtu, respon rata-rata kurang dari 1 jam.</p>
                </div>
              </div>
            </div>

            <form className="contact-form" action="mailto:mydev9883@gmail.com" method="post" encType="text/plain">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nama</label>
                  <input id="name" name="name" type="text" placeholder="Nama lengkap Anda" required />
                </div>
                <div className="form-group">
                  <label htmlFor="whatsapp">No. WhatsApp</label>
                  <input id="whatsapp" name="whatsapp" type="tel" placeholder="08xx-xxxx-xxxx" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="nama@email.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="project">Jenis Proyek</label>
                <input id="project" name="project" type="text" placeholder="Landing page, company profile, toko online, dll." />
              </div>
              <div className="form-group">
                <label htmlFor="message">Pesan</label>
                <textarea id="message" name="message" rows={5} placeholder="Ceritakan kebutuhan website Anda secara singkat..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ justifyContent: "center" }}>Kirim Pesan →</button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
