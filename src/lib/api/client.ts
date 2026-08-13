import { CONSTANTS, getTenantFromUrl, getTenantHeaders } from '@/lib/config/constants';
import { isTokenExpiringSoon, storage } from '@/lib/utils/helpers';
import { useAuthStore } from '@/stores/authStore';
import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { refreshAuthToken } from './privateService';

let refreshTimer: number | null = null;

/** Create axios instance with default config */
export const apiClient = axios.create({
  baseURL: CONSTANTS.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 30000,
});

let refreshPromise: Promise<string> | null = null;

function getSharedRefreshPromise(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = refreshAuthToken().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

export function startTokenRefreshScheduler() {
  if (typeof window === 'undefined') return () => {};

  if (refreshTimer) {
    window.clearInterval(refreshTimer);
  }

  const intervalMs = (CONSTANTS.TOKEN_REFRESH_INTERVAL_MINUTES || 15) * 60 * 1000;

  refreshTimer = window.setInterval(async () => {
    const authState = useAuthStore.getState();
    const token = storage.get<string>(CONSTANTS.TOKEN_STORAGE_KEY);

    if (!authState.isAuthenticated || !token) {
      return;
    }

    try {
      if (isTokenExpiringSoon(token, 1)) {
        await getSharedRefreshPromise();
      }
    } catch {
      // Let the 401 interceptor handle a true logout path.
    }
  }, intervalMs);

  return () => {
    if (refreshTimer) {
      window.clearInterval(refreshTimer);
      refreshTimer = null;
    }
  };
}

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add tenant headers to every request
    const tenantHeaders = getTenantHeaders();

    Object.entries(tenantHeaders).forEach(([key, value]) => {
      config.headers.set(key, value);
    });

    if (
      ['post', 'put', 'patch'].includes(
        config.method?.toLowerCase() || ''
      ) &&
      config.data
    ) {
      if (config.data instanceof FormData) {
        // Let Axios set the multipart boundary automatically
        config.headers.delete('Content-Type');
      }
    }

    // Add auth token for normal requests
    const token = storage.get<string>(CONSTANTS.TOKEN_STORAGE_KEY);
    const isRefreshCall = config.url?.includes('/api/user/auth/refresh');

    if (token) {
      if (
        !isRefreshCall &&
        isTokenExpiringSoon(
          token,
          CONSTANTS.TOKEN_REFRESH_THRESHOLD
        )
      ) {
        getSharedRefreshPromise().catch(() => {});
      }

      config.headers.set('Authorization', `Bearer ${token}`);
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

function forceLogout() {
  useAuthStore.getState().logout();
  window.location.href = '/';
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isRefreshUrl = originalRequest.url?.includes('/api/user/auth/refresh');

    if (error.response?.status === 401) {
      if (originalRequest._retry || isRefreshUrl) {
        forceLogout();
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const newToken = await getSharedRefreshPromise();
        originalRequest.headers.set('Authorization', `Bearer ${newToken}`);
        return apiClient(originalRequest);
      } catch (refreshError) {
        forceLogout();
        return Promise.reject(refreshError);
      }
    }

    // Handle 403 Forbidden — genuinely not authorized, log out.
    if (error.response?.status === 403) {
      useAuthStore.getState().logout();
      window.location.href = '/';
      console.warn('Access forbidden:', error.response.data);
    }

    if (error.response?.status && error.response.status >= 500) {
      console.error('Server error:', error.response.data);
    }

    return Promise.reject(error);
  }
);


export function handleApiError(error: unknown): { message: string; status?: number } {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message =
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      'An unexpected error occurred';
    return { message, status };
  }
  if (error instanceof Error) {
    return { message: error.message };
  }
  return { message: 'An unexpected error occurred' };
}