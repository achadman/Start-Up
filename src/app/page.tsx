export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="w-full border-b border-orange-100 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 text-white font-bold text-xl">
                ELO
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Easy Logistic Organizer
              </span>
            </div>
            <nav className="hidden sm:flex items-center gap-6">
              <a
                href="#features"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
              >
                Fitur
              </a>
              <a
                href="#pricing"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
              >
                Harga
              </a>
              <a
                href="/auth/login"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
              >
                Masuk
              </a>
            </nav>
            <a
              href="/auth/register"
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 active:bg-orange-700"
            >
              Daftar
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              Kelola Warung Makanan
              <span className="block text-orange-600 dark:text-orange-400 mt-2">
                Lebih Mudah dengan ELO
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Sistem POS lengkap untuk street food court Anda. Kelola pesanan,
              pembayaran QRIS, transfer bank, dan inventori dalam satu aplikasi
              yang mudah digunakan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth/register"
                className="rounded-lg bg-orange-500 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-orange-600 active:bg-orange-700 shadow-lg"
              >
                Mulai Gratis
              </a>
              <a
                href="#features"
                className="rounded-lg border-2 border-orange-500 px-8 py-4 text-base font-semibold text-orange-600 dark:text-orange-400 transition-colors hover:bg-orange-50 dark:hover:bg-orange-900/20"
              >
                Pelajari Lebih Lanjut
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Fitur Lengkap untuk Bisnis Anda
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Feature 1 */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30 mb-4">
                  <svg
                    className="h-6 w-6 text-orange-600 dark:text-orange-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m6 9l-2 2m0 0l-2-2m2 2V9m0 0V7a2 2 0 00-2-2H5a2 2 0 00-2 2v2"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Point of Sale
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Sistem kasir yang mudah digunakan untuk menerima pesanan
                  dengan cepat dan efisien.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 mb-4">
                  <svg
                    className="h-6 w-6 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Pembayaran QRIS & Transfer
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Terima pembayaran melalui QRIS dan transfer bank dengan mudah.
                  Lacak semua transaksi secara real-time.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 mb-4">
                  <svg
                    className="h-6 w-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Manajemen Inventori
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Pantau stok bahan baku dan produk Anda. Dapatkan notifikasi
                  saat stok menipis.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 mb-4">
                  <svg
                    className="h-6 w-6 text-purple-600 dark:text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Manajemen Pesanan
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Kelola semua pesanan dari berbagai meja atau lokasi. Status
                  pesanan real-time.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-900/30 mb-4">
                  <svg
                    className="h-6 w-6 text-pink-600 dark:text-pink-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Laporan & Analitik
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Lihat laporan penjualan, pendapatan, dan analitik bisnis Anda
                  dengan mudah.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30 mb-4">
                  <svg
                    className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Responsif & Mobile-First
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Gunakan di smartphone, tablet, atau komputer. Dirancang khusus
                  untuk penggunaan mobile.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 p-8 sm:p-12 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Siap Memulai?
            </h2>
            <p className="text-lg sm:text-xl mb-8 opacity-90">
              Daftar sekarang dan mulailah mengelola bisnis street food Anda
              dengan lebih mudah.
            </p>
            <a
              href="/auth/register"
              className="inline-block rounded-lg bg-white px-8 py-4 text-base font-semibold text-orange-600 transition-colors hover:bg-gray-50 active:bg-gray-100 shadow-lg"
            >
              Daftar Gratis Sekarang
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white font-bold text-sm">
                ELO
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                © 2024 Easy Logistic Organizer. All rights reserved.
              </span>
            </div>
            <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
              <a
                href="#"
                className="hover:text-orange-600 dark:hover:text-orange-400"
              >
                Kebijakan Privasi
              </a>
              <a
                href="#"
                className="hover:text-orange-600 dark:hover:text-orange-400"
              >
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
