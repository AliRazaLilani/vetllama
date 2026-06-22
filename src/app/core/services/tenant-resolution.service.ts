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
    // HARDCODED VALUES FOR (TESTING)
    // Comment these 3 lines below and uncomment the dynamic code when done testing
    const hardcodedContext: TenantContext = {
      host: environment.tenantConfig.host,
      domain: environment.tenantConfig.domain,
      subdomain: environment.tenantConfig.subdomain,
    };
    this.tenantContext.next(hardcodedContext);
    console.log('🔴 USING HARDCODED TENANT CONTEXT:', hardcodedContext);
    // HARDCODED VALUES FOR (TESTING)

    // DYNAMIC VALUES FOR (PRODUCTION)
    /*
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

    console.log('🌐 Resolved tenant context from URL:', { host, domain, subdomain });

    const context: TenantContext = {
      host: host,
      domain: domain,
      subdomain: subdomain,
    };

    this.tenantContext.next(context);
    console.log('✅ USING DYNAMIC TENANT CONTEXT:', context);
    */
    // DYNAMIC VALUES FOR (PRODUCTION)
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
