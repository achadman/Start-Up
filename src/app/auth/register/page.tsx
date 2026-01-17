"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator"; // Pastikan sudah install: npx shadcn-ui@latest add separator
import { AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    vendorName: "",
    ownerName: "",
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

  // FUNGSI LOGIN GOOGLE
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) setError(error.message);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Kata sandi tidak cocok");
      setLoading(false);
      return;
    }

    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            vendor_name: formData.vendorName,
            owner_name: formData.ownerName,
            role: "owner",
          },
        },
      });

      if (signUpError) throw signUpError;
      if (!authData.user) throw new Error("Registrasi gagal.");

      const { data: newStore, error: storeError } = await supabase
        .from("stores")
        .insert({
          owner_id: authData.user.id,
          name: formData.vendorName,
        })
        .select()
        .single();

      if (storeError) throw storeError;

      if (newStore) {
        await supabase
          .from("profiles")
          .update({ store_id: newStore.id })
          .eq("id", authData.user.id);
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/auth/login?registered=true");
      }, 3000);
    } catch (err: any) {
      setError(err?.message || "Terjadi kesalahan.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md text-center py-8">
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Pendaftaran Berhasil!</CardTitle>
            <CardDescription className="text-base">
              Silakan cek email Anda untuk verifikasi. Mengalihkan ke halaman masuk...
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-gray-950 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo and Title - FIXED CONTRAST */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-xl shadow-lg">
              ELO
            </div> 
            <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              ELO System
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Buat Akun Vendor
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Kelola logistik dan stok warung Anda dengan mudah
          </p>
        </div>

        <Card className="shadow-xl border-slate-200 dark:border-slate-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Daftar</CardTitle>
            <CardDescription>Pilih metode pendaftaran di bawah</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* GOOGLE REGISTER OPTION */}
            <Button 
              variant="outline" 
              className="w-full py-6 text-base font-semibold border-slate-300 hover:bg-slate-50 dark:border-slate-700"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="mr-2 h-5 w-5" />
              Daftar dengan Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Atau daftar manual</span>
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Input Group - FIXED SPACING */}
              <div className="grid grid-cols-1 gap-5">
                <div className="space-y-2.5">
                  <Label htmlFor="ownerName" className="text-slate-700 dark:text-slate-300">Nama Pemilik</Label>
                  <Input id="ownerName" name="ownerName" placeholder="Contoh: Budi Santoso" value={formData.ownerName} onChange={handleChange} required disabled={loading} className="py-5" />
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="vendorName" className="text-slate-700 dark:text-slate-300">Nama Warung/Vendor</Label>
                  <Input id="vendorName" name="vendorName" placeholder="Contoh: Warung Barokah" value={formData.vendorName} onChange={handleChange} required disabled={loading} className="py-5" />
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Email Bisnis</Label>
                  <Input id="email" name="email" type="email" placeholder="nama@warung.com" value={formData.email} onChange={handleChange} required disabled={loading} className="py-5" />
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="password text-slate-700 dark:text-slate-300">Kata Sandi</Label>
                  <div className="relative">
                    <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Minimal 6 karakter" value={formData.password} onChange={handleChange} required minLength={6} disabled={loading} className="pr-10 py-5" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="confirmPassword" className="text-slate-700 dark:text-slate-300">Konfirmasi Kata Sandi</Label>
                  <div className="relative">
                    <Input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Ulangi kata sandi" value={formData.confirmPassword} onChange={handleChange} required minLength={6} disabled={loading} className="pr-10 py-5" />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full py-6 text-lg font-bold shadow-lg shadow-primary/20" disabled={loading}>
                {loading ? "Memproses..." : "Daftar Sekarang"}
              </Button>
            </form>

            <div className="space-y-4 pt-2">
              <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                Sudah punya akun?{" "}
                <Link href="/auth/login" className="font-bold text-primary hover:underline">
                  Masuk di sini
                </Link>
              </p>
              <div className="text-center">
                <Link href="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
                  ← Kembali ke beranda
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}