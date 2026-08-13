
import { apiClient } from '@/lib/api/client';
import { ENDPOINTS } from '@/lib/api/endpoints';
import type { TenantInfo } from '@/types/content';
import { useEffect, useState } from 'react';

// Cache the tenant data globally to prevent multiple API calls
let cachedTenant: TenantInfo | null = null;
let isFetching = false;
let fetchPromise: Promise<TenantInfo> | null = null;

export function useTenant(): any {
  const [tenant, setTenant] = useState<TenantInfo | null>(cachedTenant);
  const [isLoading, setIsLoading] = useState(!cachedTenant);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    // If we already have cached data, skip API call
    if (cachedTenant) {
      setIsLoading(false);
      return;
    }

    // If a fetch is already in progress, wait for it
    if (fetchPromise) {
      fetchPromise
        .then((data) => {
          if (!cancelled) {
            cachedTenant = data;
            setTenant(data);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          if (!cancelled) {
            const message = err instanceof Error ? err.message : 'Failed to resolve tenant';
            setError(message);
            setIsLoading(false);
          }
        });
      return;
    }

    async function resolveTenant() {
      try {
        isFetching = true;
        setIsLoading(true);
        setError(null);

        // Create the promise and store it
        fetchPromise = apiClient.get(ENDPOINTS.tenant.resolve).then((response) => response.data.data);

        const data = await fetchPromise;

        if (!cancelled) {
          cachedTenant = data;
          setTenant(data);
        }
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Failed to resolve tenant';
          setError(message);
        }
      } finally {
        if (!cancelled) {
          isFetching = false;
          fetchPromise = null;
          setIsLoading(false);
        }
      }
    }

    resolveTenant();

    return () => {
      cancelled = true;
    };
  }, []);

  return { tenant, isLoading, error };
}