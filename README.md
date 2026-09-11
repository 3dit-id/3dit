# 3DIT Design & Technology — GitHub Ready Website

Paket website statis **HTML + CSS + JavaScript** untuk 3DIT Design & Technology. Tidak membutuhkan framework atau build process, sehingga mudah diunggah ke GitHub Pages.

## Struktur

```text
3DIT-GitHub-Website/
├── index.html
├── profile.html
├── paket-harga.html
├── kalkulator.html
├── converter.html
├── chat-ai.html
├── kontak.html
├── kategori-desain-grafis.html
├── kategori-desain-bangunan.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── .nojekyll
├── netlify.toml
├── api/
│   └── chat.js
├── netlify/
│   └── functions/chat.js
└── assets/
    ├── css/style.css
    ├── js/
    │   ├── site-config.js
    │   ├── main.js
    │   ├── calculator.js
    │   └── chat.js
    └── images/
        ├── logo-3dit.png
        ├── favicon-3dit.png
        ├── sliders/
        └── projects/
```

## 1. Upload ke GitHub Pages

1. Buat repository baru di GitHub.
2. Upload **seluruh isi folder ini** ke repository (bukan folder ZIP-nya saja).
3. Buka **Settings → Pages**.
4. Pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/ (root)`.
6. Simpan. Setelah GitHub selesai deploy, website dapat dibuka dari URL GitHub Pages Anda.

## 2. Mengganti gambar slider

Slider berada di `index.html`.

Ukuran yang direkomendasikan: **1920 × 840 px (rasio 16:7)**.

Nama file yang disarankan:
- `sliders/slide-1.jpg`
- `sliders/slide-2.jpg`
- `sliders/slide-3.jpg`

Untuk memasang gambar:
1. Buka `index.html`.
2. Cari `SLIDE 01 — GAMBAR KOSONG`.
3. Ganti isi `.slide-placeholder` dengan:

```html
<img src="sliders/slide-1.jpg"
     alt="Deskripsi gambar slider 1"
     loading="lazy">
```

Lakukan hal yang sama untuk slide 2 dan 3.

### Tips gambar
- JPG/WebP lebih disarankan untuk foto.
- Kompres gambar sebelum upload agar website tetap cepat.
- Gunakan foto dengan area aman di tengah karena tampilan mobile melakukan crop.
- Isi `alt` dengan deskripsi yang relevan untuk SEO/accessibility.

## 3. Mengganti logo

Logo yang Anda kirim sudah ditempatkan di:

`logo-3dit.png`

Jika ingin mengganti logo, pertahankan nama file tersebut atau ubah semua referensinya di HTML.

## 4. Mengubah kontak dan alamat

Semua informasi utama dipusatkan di:

`site-config.js`

Edit bagian berikut:

```js
window.SITE_CONFIG = {
  whatsapp: "6281334748004",
  whatsappDisplay: "08133-474-8004",
  instagram: "https://www.instagram.com/3dit.id/",
  facebook: "https://www.facebook.com/3dit.id",
  tiktok: "https://www.tiktok.com/@3dit.id",
  youtube: "https://www.youtube.com/@3dit-id",
  address: "ISI ALAMAT 3DIT DI SINI",
  email: "info@3dit.id"
};
```

Alamat belum diberikan dalam brief, jadi template menggunakan placeholder. Ganti hanya baris `address` untuk memperbarui alamat di footer dan halaman kontak.

## 5. Mengubah paket harga

Buka:

`paket-harga.html`

Nominal awal sengaja dibuat `Rp xxx` agar Anda tidak mempublikasikan harga yang belum dikonfirmasi. Ubah judul paket, fitur, nominal, dan CTA sesuai harga resmi 3DIT.

## 6. Kalkulator Bangunan

`kalkulator.html` berisi:
- Volume beton + estimasi semen/pasir/batu
- Dinding/bata
- Kebutuhan lantai
- Luas bidang atap
- Kebutuhan cat
- RAB sederhana dengan overhead dan profit

Koefisien dan harga satuan dapat langsung diubah pada form kalkulator. Hasil adalah **estimasi awal**, bukan pengganti perhitungan teknis/struktur resmi.

## 7. Chat AI / GPT

Halaman `chat-ai.html` sudah memiliki UI chat dan fallback mode demo.

### Keamanan penting
**Jangan pernah memasukkan `OPENAI_API_KEY` ke file JavaScript frontend.** Repository GitHub dapat bersifat publik dan API key dapat terlihat.

Paket ini menyediakan contoh backend:
- Netlify: `netlify/functions/chat.js`
- Vercel: `api/chat.js`

Simpan API key sebagai environment variable server:
- `OPENAI_API_KEY`
- opsional: `OPENAI_MODEL`

Setelah backend aktif, edit:

`site-config.js`

Contoh Netlify:

```js
aiEndpoint: "/.netlify/functions/chat"
```

Contoh Vercel:

```js
aiEndpoint: "/api/chat"
```

Backend contoh menggunakan OpenAI Responses API. Model default di contoh adalah `gpt-5.6-luna`; Anda dapat menggantinya melalui environment variable `OPENAI_MODEL`.

## 8. Sitemap

Buka `sitemap.xml` lalu ganti:

`https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`

dengan alamat GitHub Pages Anda.

## 9. Font & ikon

Website menggunakan:
- Roboto untuk heading
- Open Sans untuk body
- Flaticon UIcons untuk ikon sosial media

Font dan ikon dimuat dari CDN, sehingga koneksi internet diperlukan untuk memperoleh asset tersebut.

## 10. Checklist sebelum publish

- [ ] Isi alamat resmi 3DIT.
- [ ] Ganti `Rp xxx` di Paket Harga.
- [ ] Masukkan 3 gambar slider.
- [ ] Tambahkan portfolio jika diperlukan.
- [ ] Ganti URL sitemap dengan URL GitHub Pages.
- [ ] Uji semua link menu.
- [ ] Uji WhatsApp di desktop dan mobile.
- [ ] Jika menggunakan AI, deploy backend serverless dan simpan API key sebagai environment variable.
- [ ] Uji website di Chrome mobile/device emulator.
