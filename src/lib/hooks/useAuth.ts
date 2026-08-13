/** ───────────────────────────────────────────
 *  useAuth Hook
 *  Provides convenient access to auth state and actions
 *  ─────────────────────────────────────────── */

import { useAuthStore } from '@/stores/authStore';

export function useAuth() {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    requestMagicLink,
    verifyMagicLink,
    logout,
    clearError,
  } = useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    requestMagicLink,
    verifyMagicLink,
    logout,
    clearError,
    isAdmin: user?.email?.includes('admin') || false,
  };
}
