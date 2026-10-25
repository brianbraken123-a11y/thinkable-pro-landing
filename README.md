# Thinkable.Pro — Landing Page

Landing page jasa pembuatan landing page. Static site murni (HTML + CSS + JS), **tanpa build step**: nggak ada npm, Vite, React, atau proses compile apa pun. Tinggal upload, langsung jalan.

## File

```
index.html   struktur halaman
style.css    semua tampilan
script.js    render konten dari config + animasi scroll
config.js    ← SEMUA teks, harga, nomor WA, portofolio
assets/
  logo.png   400×400, logo header + favicon
  banner.png 1200×400, khusus preview share (og:image)
  bg.webp    1080px, background halaman
```

## Cara ubah isi

Cukup edit **`config.js`**:

| Mau ubah | Field |
|---|---|
| Nomor WhatsApp | `waNumber` (format `628...`, tanpa `+` dan spasi) |
| Pesan otomatis WA | `waMessage` |
| Kartu portofolio | `projects` (`name`, `business`, `label`, `url`, `thumb`) |
| Harga / fitur paket | `packages` |
| Testimoni | `testimonials` (kosong = tampil "Testimoni klien segera hadir") |

### Ganti nomor WhatsApp sebelum publish

`config.js` masih memakai placeholder `6281234567890`. Ganti dengan nomor asli, kalau tidak semua tombol WhatsApp akan membuka chat ke nomor yang salah.

### Thumbnail portofolio

Isi `thumb: "assets/portofolio-kopi-senja.webp"` setelah file gambarnya ada di `assets/`. Kalau dikosongkan, kartu memakai inisial nama sebagai placeholder (aman, nggak ada gambar rusak).

## Tes lokal

```bash
python -m http.server 8080
```

Buka `http://localhost:8080` — cek di HP dan laptop.

## Deploy (Cloudflare Pages)

1. Push ke GitHub (repo ini).
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → pilih repo.
3. Framework preset: **None**. Build command: **kosongkan**. Output directory: **`/`**.
4. **Save and Deploy** → tunggu ±1 menit → dapat URL `*.pages.dev`.

## Update setelah live

```bash
# 1. edit config.js
git add .
git commit -m "update harga"
git push
```

Cloudflare otomatis deploy ulang setiap ada push ke branch utama.
