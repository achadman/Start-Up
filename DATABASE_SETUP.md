# Database Setup Guide - ELO

Panduan untuk setup database Supabase untuk aplikasi ELO.

## Langkah-langkah Setup

### 1. Buka Supabase Dashboard
- Login ke [Supabase Dashboard](https://supabase.com/dashboard)
- Pilih project Anda

### 2. Jalankan SQL Script
1. Buka **SQL Editor** di sidebar kiri
2. Klik **New Query**
3. Copy seluruh isi file `supabase-setup.sql`
4. Paste ke SQL Editor
5. Klik **Run** atau tekan `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)

### 3. Verifikasi Setup
Setelah script berhasil dijalankan, cek:

#### a. Cek Tabel
- Buka **Table Editor** di sidebar
- Pastikan tabel berikut sudah ada:
  - ✅ `vendors`
  - ✅ `products`
  - ✅ `orders`
  - ✅ `order_items`

#### b. Cek RLS Policies
- Buka **Authentication** > **Policies**
- Pastikan Row Level Security (RLS) sudah aktif untuk semua tabel
- Pastikan policies sudah dibuat untuk setiap tabel

#### c. Cek Trigger
- Buka **Database** > **Functions**
- Pastikan function berikut ada:
  - ✅ `handle_new_user()` - Auto-insert vendor saat user register
  - ✅ `handle_updated_at()` - Auto-update updated_at

### 4. Test Registrasi
1. Buka aplikasi dan coba registrasi user baru
2. Setelah registrasi berhasil, cek di **Table Editor** > **vendors**
3. Data vendor seharusnya sudah otomatis terisi

## Struktur Database

### Tabel: `vendors`
Menyimpan data vendor/warung untuk setiap user.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key ke auth.users |
| vendor_name | TEXT | Nama vendor/warung |
| owner_name | TEXT | Nama pemilik |
| email | TEXT | Email vendor |
| phone | TEXT | Nomor telepon (optional) |
| address | TEXT | Alamat (optional) |
| is_active | BOOLEAN | Status aktif |
| created_at | TIMESTAMPTZ | Waktu dibuat |
| updated_at | TIMESTAMPTZ | Waktu diupdate |

### Tabel: `products`
Menyimpan data produk/inventory.

### Tabel: `orders`
Menyimpan data pesanan.

### Tabel: `order_items`
Menyimpan detail item dalam setiap pesanan.

## Troubleshooting

### Error: "relation does not exist"
- Pastikan script SQL sudah dijalankan dengan lengkap
- Cek apakah ada error saat menjalankan script

### Error: "permission denied"
- Pastikan RLS policies sudah dibuat dengan benar
- Cek apakah user sudah login saat mengakses data

### Data tidak tersimpan setelah registrasi
- Cek apakah trigger `on_auth_user_created` sudah dibuat
- Cek function `handle_new_user()` di Database > Functions
- Cek logs di Supabase Dashboard > Logs

### Error saat insert manual
- Pastikan `user_id` sesuai dengan `auth.uid()`
- Pastikan RLS policies mengizinkan insert untuk user tersebut

## Catatan Penting

1. **Trigger Otomatis**: Setelah setup, setiap user yang register akan otomatis memiliki record di tabel `vendors`
2. **RLS Security**: Semua tabel menggunakan Row Level Security untuk keamanan
3. **Metadata**: Data `vendor_name` dan `owner_name` diambil dari `raw_user_meta_data` saat registrasi

## Support

Jika ada masalah, cek:
- Supabase Dashboard > Logs
- Browser Console untuk error client-side
- Network tab untuk error API
