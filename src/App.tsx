import { useAuthStore } from '@/stores/authStore';
import { Suspense, lazy, useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Loader } from './components/common/Loader';
import { TenantMeta } from './components/meta/TenantMeta';
import { CONSTANTS } from './lib/config/constants';
import { startTokenRefreshScheduler } from './lib/api/client';
import { useTenant } from './lib/hooks/useTenant';
import { clearAuthStorage, isTokenExpiringSoon, storage } from './lib/utils/helpers';

const CompanyHome = lazy(() =>
  import('@/pages/CompanyHome').then((m) => ({ default: m.default }))
);

const CompanyDoctorGrid = lazy(() => 
  import('@/pages/MapGrid').then((m) => ({ default: m.default }))
)

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const clearAuthSession = useAuthStore((s) => s.clearAuthSession);
  const token = storage.get<string>(CONSTANTS.TOKEN_STORAGE_KEY);
  const hasValidToken = Boolean(isAuthenticated && token && !isTokenExpiringSoon(token, 0));

  if (!hasValidToken) {
    clearAuthSession();
    clearAuthStorage();
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function PageLoader() {
  return <Loader message="Loading..." fullScreen />;
}

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const initialize = useAuthStore((s) => s.initialize);
  const { isLoading: tenantLoading } = useTenant();

  useEffect(() => {
    let cancelled = false;

    async function init() {
      storage.remove(CONSTANTS.BOOKING_STORAGE_KEY);
      initialize();

      if (!cancelled) {
        setIsReady(true);
      }
    }

    init();

    return () => {
      cancelled = true;
    };
  }, [initialize]);

  useEffect(() => {
    const stopScheduler = startTokenRefreshScheduler();
    return () => stopScheduler();
  }, []);

  if (!isReady || tenantLoading) {
    return <PageLoader />;
  }

  return (
    <HelmetProvider>
      <TenantMeta />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<CompanyHome />} />
            <Route path="/doctor-grid" element={<CompanyDoctorGrid />} />
            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </HelmetProvider>
  );
}
