# 🔧 Quick Fix: Database Error saat Registrasi

## Masalah
Error "database error saving new user" - data tidak tersimpan ke database saat registrasi.

## Solusi

### Langkah 1: Setup Database di Supabase

1. **Buka Supabase Dashboard**
   - Login ke https://supabase.com/dashboard
   - Pilih project ELO Anda

2. **Jalankan SQL Script**
   - Klik **SQL Editor** di sidebar kiri
   - Klik **New Query**
   - Copy seluruh isi file `supabase-setup.sql` di project ini
   - Paste ke SQL Editor
   - Klik **Run** (atau tekan `Ctrl+Enter`)

3. **Verifikasi**
   - Buka **Table Editor**
   - Pastikan tabel `vendors` sudah ada
   - Coba registrasi user baru
   - Cek apakah data muncul di tabel `vendors`

### Langkah 2: Cek Environment Variables

Pastikan file `.env.local` sudah ada dan berisi:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Langkah 3: Test Registrasi

1. Buka aplikasi di browser
2. Buka halaman registrasi (`/auth/register`)
3. Isi form dan submit
4. Cek di Supabase Dashboard > Table Editor > vendors
5. Data seharusnya sudah tersimpan

## Troubleshooting

### Jika masih error setelah setup:

1. **Cek Logs di Supabase**
   - Dashboard > Logs
   - Lihat apakah ada error dari trigger atau function

2. **Cek RLS Policies**
   - Dashboard > Authentication > Policies
   - Pastikan policy "Users can insert own vendor" sudah ada

3. **Cek Trigger**
   - Dashboard > Database > Functions
   - Pastikan `handle_new_user()` function ada
   - Pastikan trigger `on_auth_user_created` ada

4. **Manual Insert (untuk testing)**
   - Buka Table Editor > vendors
   - Coba insert manual untuk test apakah RLS bekerja

### Error yang Mungkin Muncul:

- **"relation does not exist"** → SQL script belum dijalankan
- **"permission denied"** → RLS policies belum dibuat
- **"duplicate key"** → Trigger sudah bekerja, ini normal
- **"function does not exist"** → Function belum dibuat dari SQL script

## File yang Dibutuhkan

- ✅ `supabase-setup.sql` - SQL script untuk setup database
- ✅ `DATABASE_SETUP.md` - Dokumentasi lengkap setup
- ✅ `src/app/auth/register/page.tsx` - Sudah diupdate dengan fallback insert

## Setelah Setup Berhasil

Data akan otomatis tersimpan ke tabel `vendors` setiap kali user registrasi karena:
1. Trigger `on_auth_user_created` akan otomatis insert data
2. Kode registrasi juga punya fallback insert manual jika trigger tidak bekerja

---

**Penting**: Pastikan SQL script sudah dijalankan sebelum test registrasi!
