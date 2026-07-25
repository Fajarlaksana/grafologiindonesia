# Grafologi Indonesia — Landing Page

Landing page untuk **LKP Grafologi Indonesia**, lembaga pelatihan grafologi
(analisa tulisan tangan) bersertifikasi.

Dibangun dengan HTML, CSS, dan sedikit JavaScript — **tanpa framework, tanpa
dependency, tanpa build step**.

🔗 **Live:** https://grafologiindonesia.vercel.app

---

## Daftar Isi

- [Fitur](#fitur)
- [Struktur](#struktur)
- [Menjalankan secara lokal](#menjalankan-secara-lokal)
- [Keputusan desain](#keputusan-desain)
- [Keputusan teknis](#keputusan-teknis)
- [Catatan implementasi](#catatan-implementasi)
- [Pembagian peran AI](#pembagian-peran-ai)
- [Aset](#aset)
- [Deploy](#deploy)

---

## Fitur

- **Headline efek ketik** dua warna, berhenti tepat di batas tiga nilai jual
- **Visual orbit** — 4 ring berputar berlawanan arah dengan badge foto melayang
- **Counter animasi** 0 → 48k+ dengan easing cubic
- **Ticker logo** klien yang bergulir mulus tanpa jeda
- **Responsive** penuh: 375 px hingga 1920 px, termasuk menu mobile
- **Aksesibel** — mendukung `prefers-reduced-motion`, navigasi keyboard, ARIA

---

## Struktur

| File | Isi |
| --- | --- |
| `index.html` | Markup: header/nav, hero, visual orbit, ticker logo |
| `styles.css` | Seluruh tampilan: keyframes, tombol gradient, ring orbit, responsive |
| `script.js` | Efek ketik headline, counter angka, menu mobile |
| `vercel.json` | Header keamanan dan aturan cache |

Total ± 780 baris. Tidak ada `package.json` — memang tidak dibutuhkan.

---

## Menjalankan secara lokal

Tidak ada dependency. Cukup buka `index.html` di browser, atau jalankan server statis:

```bash
npx serve .
```

---

## Keputusan desain

### Warna

Aksen **ungu `#A068FF`** dipertahankan karena selaras dengan logo LKP Grafologi
Indonesia yang memang berwarna ungu. Brand identity yang sudah ada tidak diubah,
justru dijadikan acuan seluruh palet.

| Warna | Peran |
| --- | --- |
| `#A068FF` | Aksen utama — kata kunci headline, angka statistik, CTA hover |
| `#D9A1FF` | Garis ring orbit — lebih muda agar tidak bersaing dengan konten |
| `#000000` / `#060218` | Heading dan tombol — kontras maksimal |
| `#4a4458` | Body text — abu keunguan, bukan hitam murni, agar tidak melelahkan mata |
| `#6b6478` | Label sekunder |

Background gradasi pastel (cyan–lavender–putih) dipilih agar teks hitam tetap
terbaca tinggi, sekaligus memberi kesan lembut dan modern — sesuai citra lembaga
edukasi, bukan korporat kaku.

### Tipografi

**Urbanist** untuk heading dan angka, **Inter** untuk body text. Urbanist bersifat
geometris dan berkarakter untuk headline besar, sementara Inter dirancang khusus
untuk keterbacaan teks kecil di layar.

### Penekanan headline

Headline sengaja dipecah dua warna:

> **Belajar Grafologi di Sini** (hitam) — *Terarah. Ilmiah. Bersertifikasi.* (ungu)

Bagian hitam adalah ajakan, bagian ungu adalah **tiga nilai jual utama**. Dengan
pemisahan warna ini, mata pengunjung langsung tertarik ke tiga kata tersebut meski
hanya melihat sekilas. Efek ketiknya pun berhenti tepat di batas itu (karakter ke-26).

### Konten dan social proof

Desain awal berasal dari template **"Marketeam Landing"** — landing page tim
marketing berbahasa Inggris. Konteksnya diubah total:

| Elemen | Template asli | Versi ini |
| --- | --- | --- |
| Bahasa | Inggris | Indonesia penuh |
| Navigasi | Generik | Kursus, Katalog, Gratis, Tes Grafologi, Kerjasama |
| Statistik | Metrik marketing | 3.600+ Siswa, 48k+ Audiens, 233 Perusahaan |
| Visual orbit | Avatar tim | Foto asli: wisuda GrafoDuation, IHT BPK RI, sesi analisa tulisan tangan |
| Logo ticker | Placeholder | Klien nyata: BPK RI, TNI AL, Kepolisian, Pertamina, BRI, Samsung, Sampoerna |

Dua baris terakhir adalah perubahan paling penting. Visual generik diganti dengan
**dokumentasi asli**. Untuk lembaga pelatihan, kredibilitas adalah segalanya — logo
institusi negara dan foto wisuda nyata jauh lebih meyakinkan calon siswa dibanding
ilustrasi stok. Ini bukan sekadar ganti gambar, tapi mengubah fungsi seluruh section
menjadi *social proof*.

---

## Keputusan teknis

### Melepas runtime React bawaan

Template desain aslinya bergantung pada `support.js` — runtime React berukuran
**70 KB** untuk merender template `<x-dc>` dengan binding `ref="{{ }}"`.

Runtime itu dilepas sepenuhnya dan halaman dibangun ulang dengan HTML/CSS murni.
Alasannya: halaman ini hanya butuh efek ketik dan counter — memuat framework React
untuk itu adalah pemborosan.

Hasilnya:

- Tanpa build step, tanpa `npm install`
- Deploy hanya 1–6 detik
- File bisa dibuka langsung tanpa server
- Total payload ± 30 KB

### Vercel sebagai target deploy

Hosting statis gratis, HTTPS otomatis, CDN global, dan auto-deploy setiap push ke
`main`.

### Cache sengaja tidak agresif

`vercel.json` menetapkan `max-age=0, must-revalidate` untuk CSS dan JS. Ini disengaja:
nama file tidak ber-hash, jadi kalau di-cache lama, pengunjung lama akan melihat CSS
basi setelah update. CDN Vercel tetap efisien lewat ETag.

---

## Catatan implementasi

- **Efek ketik** — headline dipecah jadi dua span: 26 karakter pertama hitam,
  sisanya ungu. Animasi digerakkan `requestAnimationFrame` berbasis waktu, jadi
  posisinya tetap benar walau tab sempat tidak aktif.

- **Visual orbit** — 4 ring berputar berlawanan arah. Tiap badge diposisikan lewat
  CSS custom property: `--a` (sudut), `--r` (radius), `--glow` (warna cahaya),
  `--d` (delay animasi). Pendekatan ini menggantikan 40+ elemen dengan inline style
  berulang.

- **Ticker logo** — memakai `margin-right`, bukan `gap`. Dengan `gap`, loop
  `translateX(-50%)` meleset setengah gap sehingga terlihat melompat tiap putaran.

- **Menu mobile dan stacking context** — `animation-fill-mode: both` pada header
  meninggalkan `transform` terisi, yang membuat header jadi stacking context baru
  sehingga `z-index` menu terkurung di dalamnya. Diperbaiki dengan menaikkan header
  itu sendiri ke `z-index: 10`.

- **Panel menu opaque** — `backdrop-filter` hanya dipakai sebagai enhancement lewat
  `@supports`. Tanpa itu, panel tembus pandang di browser yang tidak mendukungnya.

- **Reduced motion** — `prefers-reduced-motion` menonaktifkan animasi dan langsung
  menampilkan teks serta counter pada nilai akhirnya.

---

## Pembagian peran AI

Proyek ini dikerjakan dengan bantuan AI dalam dua tahap:

1. **Claude Design** — tahap desain. Template "Marketeam Landing" diredesain menjadi
   landing page Grafologi Indonesia.
2. **Claude Code** — tahap implementasi, debugging, dan deployment.

### Dibantu AI

| Area | Bantuan |
| --- | --- |
| Konversi kode | Menerjemahkan template `.dc.html` ke HTML/CSS/JS murni |
| Refactor | Mengubah elemen orbit inline-style menjadi CSS custom properties |
| Responsive | Menyusun breakpoint 1280 / 1024 / 768 / 480 px |
| Aksesibilitas | `prefers-reduced-motion`, label ARIA, alt text |
| Debugging | Menemukan 3 bug: ticker melompat, menu tertimpa hero, panel tembus pandang |
| Deployment | Setup Git, push GitHub, koneksi Vercel, header keamanan |

### Diputuskan sendiri

- **Palet warna dan alasannya** — mempertahankan ungu brand, menyusun turunan berjenjang
- **Hierarki tipografi** — Urbanist untuk display, Inter untuk body
- **Penekanan headline** — memecah warna tepat di batas tiga nilai jual
- **Konten dan social proof** — mengganti visual generik dengan dokumentasi asli
- **Melepas runtime React** — memilih HTML/CSS murni demi halaman ringan tanpa build
- **Target deployment** — Vercel dengan auto-deploy
- **Kebijakan atribusi repo** — history commit murni atas nama pemilik

> AI berperan sebagai eksekutor teknis. Arah desain, pertimbangan produk, dan
> keputusan arsitektur ditentukan sendiri.

---

## Aset

Gambar (background, logo klien, foto orbit) masih di-hotlink dari
`grafologiindonesia.com` dan `images.higgs.ai`. Halaman butuh koneksi internet dan
akan rusak bila URL tersebut berubah.

Untuk membuatnya mandiri: unduh aset ke folder `assets/`, lalu perbarui `src` di
`index.html` dan `--bg-image` di `styles.css`.

---

## Deploy

Di-deploy sebagai situs statis di Vercel. Setiap push ke `main` otomatis men-deploy
ulang ke produksi.

```bash
git push origin main   # auto-deploy berjalan sendiri
```
