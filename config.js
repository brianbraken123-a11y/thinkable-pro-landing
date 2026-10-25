/* ============================================================
   Thinkable.Pro — SEMUA YANG SERING BERUBAH ADA DI FILE INI.
   Cukup edit nilai di bawah, jangan sentuh file lain.
   ============================================================ */

const CONFIG = {
  brandName: "Thinkable.Pro",
  tagline: "Landing Page untuk Produk & Jasa",

  // GANTI NOMOR INI SEBELUM PUBLISH! Format internasional, tanpa "+" dan tanpa spasi.
  // Contoh benar: "62882001348230"
  waNumber: "6281234567890",

  waMessage: "Halo Thinkable.Pro, saya tertarik bikin landing page untuk usaha saya.",

  // Kartu portofolio. url: isi link landing page-nya; kalau belum ada, tombol otomatis jadi nonaktif.
  projects: [
    {
      name: "Kopi Senja",
      business: "Coffee Shop",
      label: "Demo",
      url: "",
      thumb: "",
    },
    {
      name: "Terra Cafe & Eatery",
      business: "Cafe & Eatery",
      label: "Klien",
      url: "https://teracaffe-m5.brianbraken123.workers.dev/",
      thumb: "",
    },
  ],

  // Paket & harga. originalPrice boleh dikosongkan ("") kalau tidak ada harga coret.
  packages: [
    {
      name: "Landing Page",
      originalPrice: "Rp500.000",
      price: "Rp199.000",
      note: "Harga promo launching",
      features: [
        "1 halaman, fokus jualan & tombol WhatsApp",
        "Revisi minor 2x",
        "Mobile-first, cepat dibuka di HP",
        "Harga belum termasuk domain custom",
      ],
      highlighted: true,
    },
  ],

  // Testimoni asli saja. Kalau array ini kosong, halaman menampilkan
  // "Testimoni klien segera hadir" — JANGAN dikarang.
  testimonials: [
    // { quote: "...", name: "...", role: "..." },
  ],
};
