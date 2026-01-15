# ELO Project Structure

Dokumen ini menjelaskan struktur folder dan arsitektur proyek ELO untuk memudahkan pemahaman kode.

## Tech Stack

- **Core**: React & Next.js 16 (App Router)
- **Logic**: TypeScript
- **Style**: Tailwind CSS v4
- **UI Components**: Shadcn/UI (Wajib!)
- **Database/Auth**: Supabase
- **State Management**: Zustand

## Struktur Folder

```
src/
├── app/                          # Next.js App Router pages
│   ├── auth/                     # Authentication pages
│   │   ├── login/
│   │   │   └── page.tsx          # Halaman login (Shadcn/UI)
│   │   └── register/
│   │       └── page.tsx          # Halaman registrasi (Shadcn/UI)
│   ├── dashboard/                # Dashboard pages (protected)
│   │   └── page.tsx              # Halaman dashboard utama (Shadcn/UI)
│   ├── layout.tsx                # Root layout (wraps all pages)
│   ├── page.tsx                  # Landing page (homepage)
│   └── globals.css               # Global styles (Shadcn/UI variables)
│
├── components/                   # Reusable React components
│   └── ui/                       # Shadcn/UI components
│       ├── button.tsx            # Button component
│       ├── input.tsx             # Input component
│       ├── label.tsx             # Label component
│       ├── card.tsx              # Card component
│       └── alert.tsx             # Alert component
│
├── lib/                          # Utility libraries & configurations
│   ├── supabase/
│   │   ├── client.ts             # Supabase client (client-side)
│   │   └── server.ts              # Supabase client (server-side)
│   └── utils.ts                   # Utility functions (cn helper)
│
└── store/                        # Zustand state management stores
    └── auth-store.ts              # Authentication state store
```

## Penjelasan Folder

### `/src/app`
Folder utama untuk semua halaman aplikasi menggunakan Next.js App Router.

- **`auth/`** - Semua halaman terkait autentikasi
  - `login/page.tsx` - Halaman login menggunakan Shadcn/UI components
  - `register/page.tsx` - Halaman registrasi menggunakan Shadcn/UI components

- **`dashboard/`** - Halaman dashboard (memerlukan autentikasi)
  - `page.tsx` - Dashboard utama menggunakan Zustand untuk state management

- **`page.tsx`** - Landing page (homepage) yang dapat diakses publik

- **`layout.tsx`** - Layout root yang membungkus semua halaman

- **`globals.css`** - Global styles dengan Shadcn/UI CSS variables untuk theming

### `/src/components/ui`
Folder untuk komponen Shadcn/UI yang dapat digunakan kembali.

- **`button.tsx`** - Button component dengan berbagai variants
- **`input.tsx`** - Input component dengan styling konsisten
- **`label.tsx`** - Label component untuk form
- **`card.tsx`** - Card component untuk container
- **`alert.tsx`** - Alert component untuk notifikasi (error, success, dll)

Semua komponen menggunakan:
- `class-variance-authority` untuk variant management
- `tailwind-merge` & `clsx` untuk className merging
- TypeScript untuk type safety

### `/src/lib`
Folder untuk konfigurasi dan utility functions.

- **`supabase/`** - Konfigurasi Supabase
  - `client.ts` - Client untuk penggunaan di client-side (browser)
  - `server.ts` - Client untuk penggunaan di server-side (Next.js server)

- **`utils.ts`** - Utility functions
  - `cn()` - Helper function untuk merge className dengan tailwind-merge

### `/src/store`
Folder untuk Zustand state management stores.

- **`auth-store.ts`** - Authentication state store
  - `user` - Current user object
  - `loading` - Loading state
  - `initialized` - Initialization flag
  - `setUser()` - Set user function
  - `initialize()` - Initialize auth state
  - `signOut()` - Sign out function

## Arsitektur Clean Code

### 1. Feature-Based Organization
Setiap fitur memiliki folder sendiri di dalam `app/`:
- `auth/` - Semua yang terkait autentikasi
- `dashboard/` - Semua yang terkait dashboard
- `pos/` - Akan dibuat untuk Point of Sale
- `inventory/` - Akan dibuat untuk manajemen inventori
- `payments/` - Akan dibuat untuk manajemen pembayaran

### 2. Separation of Concerns
- **Pages** (`app/*/page.tsx`) - Hanya untuk UI dan routing, menggunakan Shadcn/UI components
- **Components** (`components/ui/*`) - Reusable UI components dari Shadcn/UI
- **Stores** (`store/*`) - State management dengan Zustand
- **Libraries** (`lib/*`) - Logic dan konfigurasi

### 3. Naming Convention
- **Files**: `kebab-case` (contoh: `page.tsx`, `client.ts`)
- **Folders**: `kebab-case` (contoh: `auth/`, `dashboard/`)
- **Components**: `PascalCase` (contoh: `LoginPage`, `DashboardPage`)
- **Stores**: `kebab-case` dengan suffix `-store` (contoh: `auth-store.ts`)

## Alur Autentikasi dengan Zustand

1. User mengakses `/auth/login` atau `/auth/register`
2. Form di-submit dengan data user menggunakan Shadcn/UI components
3. Supabase Auth memproses autentikasi
4. Zustand store (`auth-store`) di-update dengan user data
5. Jika berhasil, redirect ke `/dashboard`
6. Dashboard menggunakan Zustand store untuk check authentication
7. Jika tidak ada user di store, redirect ke `/auth/login`

## Menggunakan Shadcn/UI Components

Semua komponen Shadcn/UI tersedia di `@/components/ui/`:

```tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Contoh penggunaan
<Button variant="default" size="lg">Click me</Button>
<Input type="email" placeholder="Email" />
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

## Menggunakan Zustand Store

```tsx
import { useAuthStore } from '@/store/auth-store';

// Di dalam component
const { user, loading, initialize, signOut } = useAuthStore();

// Initialize pada mount
useEffect(() => {
  initialize();
}, []);

// Access user
console.log(user?.email);

// Sign out
await signOut();
```

## Next Steps

Fitur yang akan dibuat selanjutnya:
1. ✅ Authentication (Login & Register) dengan Shadcn/UI & Zustand
2. ⏳ Dashboard dengan sidebar navigation (Shadcn/UI)
3. ⏳ POS System (`app/pos/`) dengan Shadcn/UI components
4. ⏳ Inventory Management (`app/inventory/`) dengan Zustand store
5. ⏳ Payment Management (`app/payments/`)
6. ⏳ Orders Management (`app/orders/`)
7. ⏳ Reports (`app/reports/`)

## Tips

- **Selalu gunakan Shadcn/UI components** untuk UI yang konsisten
- **Gunakan Zustand** untuk state management yang kompleks
- Setiap fitur baru akan memiliki folder sendiri di `app/`
- Buat Zustand store baru di `store/` jika diperlukan
- Gunakan `lib/` untuk fungsi-fungsi yang digunakan di banyak tempat
- Selalu gunakan TypeScript untuk type safety
- Import components dari `@/components/ui/` (path alias)
