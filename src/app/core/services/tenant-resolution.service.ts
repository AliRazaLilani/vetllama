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
  //   this.initializeTenantContext();
  // }

  // /**
  //  * Initialize tenant context from environment or URL
  //  */
  // private initializeTenantContext(): void {
  //   // Check if we have a hardcoded tenant config in environment
  //   if (environment.tenantConfig) {
  //     console.log('🔧 Using hardcoded tenant config:', environment.tenantConfig);
  //     this.tenantContext.next({
  //       host: environment.tenantConfig.host,
  //       domain: environment.tenantConfig.domain,
  //       subdomain: environment.tenantConfig.subdomain,
  //     });
  //     return;
  //   }

    // Otherwise, resolve from current URL
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

    console.log('🌐 Resolved tenant context from URL:', { host, domain, subdomain });

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

  // /**
  //  * Check if using hardcoded configuration
  //  */
  // isUsingHardcodedConfig(): boolean {
  //   return !!environment.tenantConfig;
  // }

  // /**
  //  * Get tenant context for display/UI
  //  */
  // getTenantDisplayInfo(): { isHardcoded: boolean; context: TenantContext | null } {
  //   return {
  //     isHardcoded: this.isUsingHardcodedConfig(),
  //     context: this.getTenantContext(),
  //   };
  // }

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
