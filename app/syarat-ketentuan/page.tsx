import type { Metadata } from "next";
import LegalDocument from "../components/LegalDocument";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan | MyDEV - Building Your Future",
  description: "Syarat dan ketentuan penggunaan situs serta layanan pembuatan website MyDEV.",
};

const sections = [
  {
    title: "Ruang Lingkup",
    paragraphs: [
      "Syarat & Ketentuan ini berlaku untuk penggunaan situs MyDEV dan seluruh layanan yang kami berikan, termasuk pembuatan landing page, company profile, toko online, web app custom, redesign, serta maintenance dan SEO.",
      "Dengan mengakses situs ini atau menggunakan layanan kami, Anda dianggap telah membaca dan menyetujui ketentuan di bawah ini.",
    ],
  },
  {
    title: "Layanan & Penawaran",
    paragraphs: [
      "Cakupan pekerjaan, estimasi waktu, dan biaya disepakati bersama sebelum proyek dimulai, dan dituangkan dalam penawaran atau pesan tertulis (termasuk lewat WhatsApp atau email).",
      "Permintaan di luar cakupan yang telah disepakati dapat dikenakan biaya dan jadwal tambahan, dan akan dikonfirmasi lebih dulu kepada Anda.",
    ],
  },
  {
    title: "Pembayaran",
    items: [
      "Pembayaran dilakukan sesuai termin yang disepakati pada penawaran.",
      "Pengerjaan dimulai setelah pembayaran awal (uang muka) diterima.",
      "Peluncuran website dan penyerahan akses penuh dilakukan setelah pelunasan.",
    ],
  },
  {
    title: "Tanggung Jawab Klien",
    items: [
      "Menyediakan materi proyek (teks, gambar, logo, dan data lain) yang dibutuhkan secara tepat waktu.",
      "Memberikan masukan dan persetujuan pada setiap tahap agar jadwal pengerjaan tetap terjaga.",
      "Memastikan materi yang diberikan tidak melanggar hak cipta atau hak pihak lain.",
    ],
  },
  {
    title: "Revisi",
    paragraphs: [
      "Revisi dilakukan pada tahap desain dan pengujian sesuai jumlah yang disepakati. Perubahan besar setelah desain disetujui dapat diperlakukan sebagai pekerjaan tambahan.",
    ],
  },
  {
    title: "Hak Kepemilikan",
    paragraphs: [
      "Setelah pembayaran lunas, domain, hosting, dan aset website sepenuhnya menjadi milik klien. MyDEV berhak menampilkan hasil pekerjaan sebagai bagian dari portofolio, kecuali klien menyatakan keberatan secara tertulis.",
    ],
  },
  {
    title: "Garansi & Dukungan",
    paragraphs: [
      "Kami memberikan pendampingan pasca-peluncuran untuk memperbaiki kesalahan (bug) pada pekerjaan yang kami buat selama masa yang disepakati. Garansi tidak mencakup kerusakan akibat perubahan oleh pihak lain atau gangguan layanan pihak ketiga seperti penyedia hosting dan domain.",
    ],
  },
  {
    title: "Batasan Tanggung Jawab",
    paragraphs: [
      "MyDEV berupaya memberikan hasil terbaik, namun tidak bertanggung jawab atas kerugian tidak langsung, kehilangan keuntungan, atau gangguan yang disebabkan oleh faktor di luar kendali kami.",
    ],
  },
  {
    title: "Perubahan Ketentuan",
    paragraphs: [
      "Kami dapat memperbarui Syarat & Ketentuan ini sewaktu-waktu. Versi terbaru selalu tersedia di halaman ini beserta tanggal pembaruannya.",
    ],
  },
  {
    title: "Kontak",
    paragraphs: [
      "Pertanyaan terkait ketentuan ini dapat dikirim ke mydev9883@gmail.com atau melalui WhatsApp di halaman Kontak.",
    ],
  },
];

export default function SyaratKetentuan() {
  return (
    <LegalDocument
      eyebrow="LEGAL"
      title="Syarat & Ketentuan"
      description="Ketentuan penggunaan situs dan layanan MyDEV, agar kerja sama berjalan jelas dan transparan sejak awal."
      updatedAt="16 Oktober 2026"
      sections={sections}
    />
  );
}
