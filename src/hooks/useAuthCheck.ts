import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

interface UseAuthCheckOptions {
  redirectTo?: string;
  redirectDelay?: number;
  requireAuth?: boolean;
}

export function useAuthCheck(options: UseAuthCheckOptions = {}) {
  const {
    redirectTo = '/',
    redirectDelay = 3000,
    requireAuth = true
  } = options;

  const { user, token } = useAuthStore();
  const router = useRouter();

  const isAuthenticated = !!(user && token);

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      // Redirecionar após um delay
      const timeoutId = setTimeout(() => {
        router.push(redirectTo);
      }, redirectDelay);

      return () => clearTimeout(timeoutId);
    }
  }, [isAuthenticated, requireAuth, redirectTo, redirectDelay, router]);

  return {
    isAuthenticated,
    user,
    token,
  };
}