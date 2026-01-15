'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useAuthStore } from '@/store/auth-store';

export default function AuthCallbackPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          router.push('/auth/login?error=oauth_error');
          return;
        }

        if (session?.user) {
          setUser(session.user);
          router.push('/dashboard');
          router.refresh();
        } else {
          router.push('/auth/login');
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        router.push('/auth/login?error=oauth_error');
      }
    };

    handleAuthCallback();
  }, [router, setUser]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
        <p className="text-muted-foreground">Memproses autentikasi...</p>
      </div>
    </div>
  );
}
