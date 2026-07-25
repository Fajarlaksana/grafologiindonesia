# Grafologi Indonesia — Landing Page

Landing page statis untuk LKP Grafologi Indonesia. Dibangun dengan HTML, CSS, dan
sedikit JavaScript — tanpa framework, tanpa build step.

## Struktur

| File | Isi |
| --- | --- |
| `index.html` | Markup: header/nav, hero, visual orbit, ticker logo |
| `styles.css` | Seluruh tampilan: keyframes, tombol gradient, ring orbit, responsive |
| `script.js` | Efek ketik headline, counter angka, menu mobile |

## Menjalankan secara lokal

Tidak ada dependency. Cukup buka `index.html` di browser, atau jalankan server statis:

```bash
npx serve .
```

## Catatan teknis

- **Efek ketik** — headline dipecah jadi dua span: 26 karakter pertama hitam,
  sisanya ungu. Animasi digerakkan `requestAnimationFrame` berbasis waktu, jadi
  posisinya tetap benar walau tab sempat tidak aktif.
- **Visual orbit** — 4 ring berputar berlawanan arah. Tiap badge diposisikan lewat
  CSS custom property: `--a` (sudut), `--r` (radius), `--glow`, `--d` (delay).
- **Ticker logo** — memakai `margin-right`, bukan `gap`. Dengan `gap`, loop
  `translateX(-50%)` meleset setengah gap sehingga terlihat melompat tiap putaran.
- **Reduced motion** — `prefers-reduced-motion` menonaktifkan animasi dan langsung
  menampilkan teks serta counter pada nilai akhirnya.

## Aset

Gambar (background, logo klien, foto orbit) masih di-hotlink dari
`grafologiindonesia.com` dan `images.higgs.ai`. Halaman butuh koneksi internet dan
akan rusak bila URL tersebut berubah. Untuk membuatnya mandiri, unduh aset ke
folder `assets/` lalu perbarui `src` di `index.html` dan `--bg-image` di `styles.css`.

## Deploy

Di-deploy sebagai situs statis di Vercel. Setiap push ke `main` otomatis
men-deploy ulang ke produksi.
