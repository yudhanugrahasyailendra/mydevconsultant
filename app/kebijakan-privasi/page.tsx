import type { Metadata } from "next";
import LegalDocument from "../components/LegalDocument";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | MyDEV - Building Your Future",
  description: "Bagaimana MyDEV mengumpulkan, menggunakan, dan melindungi data pribadi Anda.",
};

const sections = [
  {
    title: "Pendahuluan",
    paragraphs: [
      "Privasi Anda penting bagi kami. Kebijakan ini menjelaskan data apa yang kami kumpulkan lewat situs MyDEV, bagaimana data itu digunakan, dan hak Anda atasnya.",
    ],
  },
  {
    title: "Data yang Kami Kumpulkan",
    paragraphs: ["Saat Anda mengisi form di halaman Kontak, kami menyimpan data yang Anda kirimkan:"],
    items: [
      "Nama",
      "Alamat email",
      "Nomor telepon",
      "Jenis layanan yang diminati",
      "Isi pesan atau kebutuhan proyek",
    ],
  },
  {
    title: "Tujuan Penggunaan Data",
    items: [
      "Menanggapi pertanyaan dan permintaan konsultasi Anda.",
      "Menyusun penawaran dan menghubungi Anda terkait proyek.",
      "Meningkatkan kualitas layanan dan situs kami.",
    ],
  },
  {
    title: "Penyimpanan & Keamanan",
    paragraphs: [
      "Data dari form kontak disimpan pada penyedia basis data pihak ketiga yang kami gunakan untuk mengelola permintaan masuk, dan hanya dapat diakses oleh tim MyDEV yang berwenang. Kami menerapkan langkah wajar untuk menjaga keamanannya, namun tidak ada sistem yang sepenuhnya bebas risiko.",
    ],
  },
  {
    title: "Berbagi Data",
    paragraphs: [
      "Kami tidak menjual atau menyewakan data pribadi Anda. Data hanya dibagikan jika diperlukan untuk menjalankan layanan (misalnya penyedia infrastruktur) atau jika diwajibkan oleh hukum yang berlaku.",
    ],
  },
  {
    title: "Tautan ke Pihak Ketiga",
    paragraphs: [
      "Situs ini memuat tautan ke layanan lain seperti WhatsApp dan Instagram. Kebijakan privasi layanan tersebut berada di luar kendali kami, sehingga kami menyarankan Anda membacanya sendiri.",
    ],
  },
  {
    title: "Hak Anda",
    paragraphs: [
      "Anda dapat meminta akses, perbaikan, atau penghapusan data pribadi yang pernah Anda kirimkan kepada kami kapan saja dengan menghubungi kontak di bawah.",
    ],
  },
  {
    title: "Perubahan Kebijakan",
    paragraphs: [
      "Kebijakan ini dapat diperbarui dari waktu ke waktu. Versi terbaru selalu tersedia di halaman ini beserta tanggal pembaruannya.",
    ],
  },
  {
    title: "Kontak",
    paragraphs: [
      "Untuk pertanyaan terkait privasi, hubungi kami di mydev9883@gmail.com.",
    ],
  },
];

export default function KebijakanPrivasi() {
  return (
    <LegalDocument
      eyebrow="LEGAL"
      title="Kebijakan Privasi"
      description="Cara MyDEV mengumpulkan, menggunakan, dan menjaga data pribadi Anda."
      updatedAt="16 Oktober 2026"
      sections={sections}
    />
  );
}
