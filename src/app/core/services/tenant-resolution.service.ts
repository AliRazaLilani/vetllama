// src/app/core/services/tenant-resolution.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface TenantContext {
  host: string;
  domain: string;
  subdomain: string;
}

@Injectable({
  providedIn: 'root',
})
export class TenantResolutionService {
  private tenantContext = new BehaviorSubject<TenantContext | null>(null);
  public tenantContext$ = this.tenantContext.asObservable();

  constructor() {
    // Initialize from window location or environment
    this.resolveTenantContext();
  }

  /**
   * Resolve tenant context from current URL or environment
   */
  private resolveTenantContext(): void {
    const host = window.location.hostname;
    const baseDomain = environment.tenantBaseDomain || 'vetllama.test';

    // Extract subdomain from host
    let subdomain = '';
    let domain = host;

    // Check if host contains the base domain
    if (host.includes(baseDomain)) {
      // Extract subdomain (e.g., paws-care from paws-care.vetllama.test)
      const parts = host.split('.');
      if (parts.length >= 2) {
        subdomain = parts[0];
        domain = host;
      }
    } else {
      // Custom domain - use full host as domain
      domain = host;
      // Try to extract subdomain from custom domain
      const parts = host.split('.');
      if (parts.length >= 2) {
        subdomain = parts[0];
      }
    }

    this.tenantContext.next({
      host: host,
      domain: domain,
      subdomain: subdomain,
    });
  }

  /**
   * Get current tenant context
   */
  getTenantContext(): TenantContext | null {
    return this.tenantContext.getValue();
  }

  /**
   * Set tenant context manually (useful for testing)
   */
  setTenantContext(context: TenantContext): void {
    this.tenantContext.next(context);
  }

  /**
   * Get query params for API calls
   */
  getTenantQueryParams(): { host?: string; domain?: string; subdomain?: string } {
    const context = this.getTenantContext();
    if (!context) {
      return {};
    }

    return {
      host: context.host,
      domain: context.domain,
      subdomain: context.subdomain,
    };
  }

  /**
   * Get headers for API calls
   */
  getTenantHeaders(): { Host: string } {
    const context = this.getTenantContext();
    return {
      Host: context?.host || window.location.hostname,
    };
  }
}
