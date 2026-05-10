# Pelan Frontpage dan Direktori IDXI

## Ringkasan
- Bina aplikasi Laravel baharu dalam `d:\xampp\htdocs\lr_directory` menggunakan React, Inertia, TypeScript, Tailwind, dan shadcn/ui.
- Hasil v1 merangkumi frontpage seperti gambar rujukan, public directory preview, listing detail, claim flow, favorite, analytics asas, custom admin dashboard, dan realtime chat antara user dan company.
- Semua paparan sistem mesti dalam Bahasa Inggeris.
- Rekaan admin mesti mengikuti token dan gaya dalam [design.md](/d:/xampp/htdocs/lr_directory/plan/design.md).
- Nama database dikunci kepada `lr_directory`.

## Perubahan Utama
- Setup projek: cipta app Laravel baharu terus dalam `lr_directory`, konfigurasi React/Inertia, sambung ke MariaDB XAMPP menggunakan database `lr_directory`, dan sediakan auth dengan tiga peranan `normal`, `company`, `admin`.
- Frontpage: guna logo PNG diberi, hasilkan hero image baharu bertema fishery/seafood, bina hero search `What` + `Where`, browse categories, claim section, new listing section, testimonial/media block, dan footer dengan susun atur hampir sama seperti screenshot.
- Direktori: route public untuk home, category browse, search result, dan listing preview; login diperlukan untuk favorite, full contact actions, claim, inbox, dan dashboard.
- Data model: tambah entiti `categories`, `companies`, `company_category`, `favorites`, `search_histories`, `claim_requests`, `products`, `campaigns`, `news_events`, `company_analytics_events`, `conversations`, dan `messages`.
- Seed data: masukkan kategori/subkategori daripada PDF dan beberapa sample listings dalam Bahasa Inggeris supaya search, detail, claim, favorite, dan admin flow boleh diuji terus.
- Company flow: company register melalui pilihan jenis akaun, listing bermula sebagai unclaimed atau pending, company boleh submit claim, dan admin approve sebelum profile management diaktifkan.
- Admin flow: custom Inertia admin untuk approve company dan claim, manage categories/listings, dan lihat analytics ringkas.
- Messaging: realtime chat menggunakan Laravel Reverb dan Echo pada private conversation antara normal user dan company owner.

## Rekaan Admin
- Gunakan token daripada [design.md](/d:/xampp/htdocs/lr_directory/plan/design.md): `primary #0B1E3A`, `secondary #5E6F88`, `tertiary #1976D2`, `neutral #F5F8FC`, `surface #FFFFFF`, radius kecil `2/4/8px`, dan spacing ketat.
- Elakkan gradient, kad dekoratif besar, dan pelbagai accent color; hanya satu accent biru digunakan pada CTA utama setiap skrin admin.
- Dashboard admin perlu rasa utilitarian dan padat: latar neutral terang, panel putih, border nipis, tajuk gelap, metadata muted, dan hierarchy maklumat yang mudah scan.
- Table, filter bar, stats strip, approval modal, dan form CRUD admin perlu konsisten dengan gaya “clean clinical dashboard” dalam `design.md`.
- Typography admin ikut spec `design.md`; heading sederhana, body padat, label kecil uppercase jika perlu.

## Antara Muka dan Kontrak
- Public routes: `/`, `/directory`, `/categories/{slug}`, `/directory/{company:slug}`.
- Auth routes: `/login`, `/register`, `/dashboard`, `/favorites`, `/messages`, `/claim/{company:slug}`, `/company/profile`, `/company/products`, `/company/campaigns`, `/company/news`.
- Admin routes: `/admin`, `/admin/companies`, `/admin/claims`, `/admin/categories`, `/admin/listings`.
- Type utama: `UserRole = 'normal' | 'company' | 'admin'`, `CompanyStatus = 'unclaimed' | 'pending' | 'approved' | 'rejected'`, `ClaimStatus = 'pending' | 'approved' | 'rejected'`.
- Semua label UI, placeholder, CTA, email template, notification, dan halaman fallback ditulis dalam Bahasa Inggeris.
- Konfigurasi `.env` dan dokumentasi setup mesti menggunakan `DB_DATABASE=lr_directory`.

## Ujian dan Verifikasi
- Pastikan database `lr_directory` boleh dicapai dari Laravel dan migration berjalan bersih.
- Jalankan seeder untuk sahkan kategori PDF dan sample listings wujud.
- Uji public search/filter, category browse, listing detail gate, role redirect, company registration, claim submit, admin approval, favorite add/remove, analytics event creation, dan authorization chat.
- Uji broadcast realtime untuk mesej baru antara dua akaun.
- Uji visual admin supaya pemetaan token `design.md` betul pada dashboard, table, forms, dan action states.
- Jalankan `php artisan test` dan `npm run build`.
- Selepas build lulus, buat `git init` jika perlu dan commit tempatan dalam Bahasa Melayu. Push ditangguh sehingga `origin` diberi.

## Andaian
- `lr_directory` masih kosong selain folder `plan`, jadi pelan ini menganggap aplikasi dibina dari kosong dalam folder itu.
- MariaDB XAMPP tersedia secara tempatan dan database `lr_directory` akan diwujudkan atau sudah tersedia.
- `contoh.jpeg` digunakan sebagai rujukan susun atur sahaja, bukan aset production.
- `design.md` diwajibkan untuk visual admin; frontpage awam masih berpandukan screenshot IDXI yang diberi.
- Bahasa sistem dikunci kepada Bahasa Inggeris sepenuhnya untuk v1.
