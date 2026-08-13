/** ───────────────────────────────────────────
 *  Authentication Store (Zustand)
 *  Manages auth state, login, logout, token handling
 *  ─────────────────────────────────────────── */

import { apiClient } from '@/lib/api/client';
import { ENDPOINTS } from '@/lib/api/endpoints';
import { CONSTANTS } from '@/lib/config/constants';
import { clearAuthStorage, isTokenExpiringSoon, storage } from '@/lib/utils/helpers';
import type { AuthUser, MagicLinkVerifyRequest } from '@/types/content';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  // State
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  expires_in: number | null;
  twilio_identity?: string | null;
  twilio_token?: string | null;
  updateUser: (partialUser: Partial<AuthUser>) => void;

  // Actions
  requestMagicLink: (email: string) => Promise<void>;
  verifyMagicLink: (data: MagicLinkVerifyRequest) => Promise<void>;
  setToken: (token: string) => void;
  setUser: (user: AuthUser) => void;
  logout: () => Promise<void>;
  clearAuthSession: () => void;
  clearError: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      expires_in: null,

      /** Request magic link to email */
      requestMagicLink: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
          await apiClient.post(ENDPOINTS.auth.magicLinkRequest, { email });
          set({ isLoading: false });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to send magic link';
          set({ isLoading: false, error: message });
          throw error;
        }
      },

      updateUser: (partialUser: Partial<AuthUser>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...partialUser } : (partialUser as AuthUser),
        }));
      },

      /** Verify magic link token */
      verifyMagicLink: async (data: MagicLinkVerifyRequest) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiClient.post(ENDPOINTS.auth.magicLinkVerify, data);
          const { access_token, user, expires_in, twilio_identity, twilio_token } =
            response.data.data;

          storage.set(CONSTANTS.TOKEN_STORAGE_KEY, access_token);
          set({
            token: access_token,
            user,
            isAuthenticated: true,
            expires_in,
            twilio_token,
            twilio_identity,
            isLoading: false,
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to verify magic link';
          set({ isLoading: false, error: message });
          throw error;
        }
      },

      /** Set token manually */
      setToken: (token: string) => {
        storage.set(CONSTANTS.TOKEN_STORAGE_KEY, token);
        set({ token, isAuthenticated: true });
      },

      /** Set user manually */
      setUser: (user: AuthUser) => {
        set({ user });
      },

      /** Clear auth data without hitting the API */
      clearAuthSession: () => {
        clearAuthStorage();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
          expires_in: null,
          twilio_identity: null,
          twilio_token: null,
        });
      },

      /** Logout and clear all auth data */
      logout: async () => {
        try {
          await apiClient.post(ENDPOINTS.auth.logout);
        } catch {
          // Silently handle logout errors
        } finally {
          useAuthStore.getState().clearAuthSession();
        }
      },

      /** Clear error state */
      clearError: () => set({ error: null }),

      /** Initialize auth state from storage */
      initialize: () => {
        const token = storage.get<string>(CONSTANTS.TOKEN_STORAGE_KEY);
        if (!token || isTokenExpiringSoon(token, 0)) {
          useAuthStore.getState().clearAuthSession();
          return;
        }

        set({ token, isAuthenticated: true });
      },
    }),
    {
      name: 'vetllama-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        expires_in: state.expires_in,
        twilio_identity: state.twilio_identity,
        twilio_token: state.twilio_token,
      }),
    }
  )
);
