'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    vendorName: '',
    ownerName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Kata sandi tidak cocok');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Kata sandi minimal 6 karakter');
      setLoading(false);
      return;
    }

    try {
      // Step 1: Register user dengan Supabase Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            vendor_name: formData.vendorName,
            owner_name: formData.ownerName,
            role: 'owner',
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      if (!authData.user) {
        setError('Registrasi gagal. Silakan coba lagi.');
        setLoading(false);
        return;
      }

      // Step 2: Insert data vendor ke tabel vendors (fallback jika trigger tidak bekerja)
      // Trigger seharusnya sudah handle ini, tapi kita buat fallback untuk memastikan
      const { error: vendorError } = await supabase
        .from('vendors')
        .insert({
          user_id: authData.user.id,
          vendor_name: formData.vendorName,
          owner_name: formData.ownerName,
          email: formData.email,
        })
        .select()
        .single();

      // Jika error karena sudah ada (trigger sudah insert), itu OK
      // Tapi jika error lain, kita tampilkan
      if (vendorError && !vendorError.message.includes('duplicate') && !vendorError.message.includes('already exists')) {
        console.error('Error saving vendor data:', vendorError);
        // Tidak menghentikan proses, karena trigger mungkin sudah insert
        // Tapi kita log untuk debugging
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/auth/login?registered=true');
      }, 2000);
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err?.message || 'Terjadi kesalahan. Silakan coba lagi.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-800 px-4">
        <div className="w-full max-w-md">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <CardTitle className="mb-2">Pendaftaran Berhasil!</CardTitle>
                <CardDescription className="mb-4">
                  Silakan cek email Anda untuk verifikasi akun sebelum masuk.
                </CardDescription>
                <p className="text-sm text-muted-foreground">
                  Mengalihkan ke halaman masuk...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-800 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl">
              ELO
            </div>
            <span className="text-2xl font-bold text-foreground">
              Easy Logistic Organizer
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Daftar Akun Baru
          </h1>
          <p className="text-muted-foreground">
            Buat akun sebagai pemilik vendor untuk mulai mengelola bisnis Anda
          </p>
        </div>

        {/* Register Form */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar</CardTitle>
            <CardDescription>
              Lengkapi informasi di bawah ini untuk membuat akun baru
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-6">
              {/* Error Message */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Owner Name Input */}
              <div className="space-y-2">
                <Label htmlFor="ownerName">
                  Nama Pemilik <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="ownerName"
                  name="ownerName"
                  type="text"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Nama lengkap pemilik"
                  required
                  disabled={loading}
                />
              </div>

              {/* Vendor Name Input */}
              <div className="space-y-2">
                <Label htmlFor="vendorName">
                  Nama Vendor/Warung <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="vendorName"
                  name="vendorName"
                  type="text"
                  value={formData.vendorName}
                  onChange={handleChange}
                  placeholder="Nama warung/vendor Anda"
                  required
                  disabled={loading}
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nama@email.com"
                  required
                  disabled={loading}
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password">
                  Kata Sandi <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimal 6 karakter"
                    required
                    minLength={6}
                    disabled={loading}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Konfirmasi Kata Sandi <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Ulangi kata sandi"
                    required
                    minLength={6}
                    disabled={loading}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={loading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Mendaftar...' : 'Daftar'}
              </Button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Sudah punya akun?{' '}
                <Link href="/auth/login" className="font-medium text-primary hover:text-primary/80">
                  Masuk di sini
                </Link>
              </p>
            </div>

            {/* Back to Home */}
            <div className="mt-4 text-center">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                ← Kembali ke beranda
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
