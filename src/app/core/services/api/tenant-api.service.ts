// src/app/core/services/api/tenant-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  TenantResolutionResponse,
  ServiceResponse,
  ServiceDetailResponse,
  LocationsResponse,
  PoliciesResponse,
  SlotsResponse,
  SlotRequest,
  Service,
  FormConfigResponse,
} from '../../models/tenant.types';
import { environment } from 'src/environments/environment';
import { TenantResolutionService } from '../tenant-resolution.service';

@Injectable({
  providedIn: 'root',
})
export class TenantApiService {
  private baseUrl = `${environment.apiUrl}/public/tenant`;

  constructor(
    private http: HttpClient,
    private tenantResolution: TenantResolutionService,
  ) {}

  /**
   * Get headers with Host header
   */
  private getHeaders(): HttpHeaders {
    const tenantHeaders = this.tenantResolution.getTenantHeaders();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Host: tenantHeaders.Host,
    });
  }

  /**
   * Get query params with tenant context
   */
  private getTenantParams(): HttpParams {
    const params = this.tenantResolution.getTenantQueryParams();
    let httpParams = new HttpParams();

    // Always add all tenant params
    if (params.host) {
      httpParams = httpParams.set('host', params.host);
    }
    if (params.domain) {
      httpParams = httpParams.set('domain', params.domain);
    }
    if (params.subdomain) {
      httpParams = httpParams.set('subdomain', params.subdomain);
    }

    // Log for debugging
    console.log('📤 API Request Params:', {
      host: params.host,
      domain: params.domain,
      subdomain: params.subdomain,
    });

    return httpParams;
  }

  /**
   * Resolve tenant from host or query parameters
   */
  resolveTenant(overrideParams?: {
    host?: string;
    domain?: string;
    subdomain?: string;
  }): Observable<TenantResolutionResponse> {
    let params = this.getTenantParams();

    // Override params if provided
    if (overrideParams) {
      if (overrideParams.host) {
        params = params.set('host', overrideParams.host);
      }
      if (overrideParams.domain) {
        params = params.set('domain', overrideParams.domain);
      }
      if (overrideParams.subdomain) {
        params = params.set('subdomain', overrideParams.subdomain);
      }
    }

    console.log('🔍 Resolving tenant with:', {
      url: `${this.baseUrl}/resolve`,
      headers: this.getHeaders().keys(),
      params: params.keys(),
    });

    return this.http.get<TenantResolutionResponse>(`${this.baseUrl}/resolve`, {
      headers: this.getHeaders(),
      params: params,
    });
  }

  /**
   * Get public form configuration
   */
  getFormConfig(): Observable<FormConfigResponse> {
    return this.http.get<FormConfigResponse>(`${this.baseUrl}/form`, {
      headers: this.getHeaders(),
      params: this.getTenantParams(),
    });
  }

  /**
   * List all public services
   */
  getServices(overrideParams?: {
    host?: string;
    domain?: string;
    subdomain?: string;
  }): Observable<ServiceResponse> {
    let params = this.getTenantParams();

    if (overrideParams) {
      if (overrideParams.host) {
        params = params.set('host', overrideParams.host);
      }
      if (overrideParams.domain) {
        params = params.set('domain', overrideParams.domain);
      }
      if (overrideParams.subdomain) {
        params = params.set('subdomain', overrideParams.subdomain);
      }
    }

    return this.http.get<ServiceResponse>(`${this.baseUrl}/services`, {
      headers: this.getHeaders(),
      params: params,
    });
  }

  /**
   * Get specific service detail
   */
  getServiceDetail(serviceId: number): Observable<ServiceDetailResponse> {
    return this.http.get<ServiceDetailResponse>(`${this.baseUrl}/services/${serviceId}`, {
      headers: this.getHeaders(),
      params: this.getTenantParams(),
    });
  }

  /**
   * List all public locations
   */
  getLocations(): Observable<LocationsResponse> {
    return this.http.get<LocationsResponse>(`${this.baseUrl}/locations`, {
      headers: this.getHeaders(),
      params: this.getTenantParams(),
    });
  }

  /**
   * Get public policies
   */
  getPolicies(): Observable<PoliciesResponse> {
    return this.http.get<PoliciesResponse>(`${this.baseUrl}/policies`, {
      headers: this.getHeaders(),
      params: this.getTenantParams(),
    });
  }

  /**
   * Preview bookable slots
   */
  getAvailableSlots(params: SlotRequest): Observable<SlotsResponse> {
    let httpParams = this.getTenantParams()
      .set('service_id', params.service_id.toString())
      .set('duration_id', params.duration_id.toString())
      .set('date', params.date);

    if (params.location_id) {
      httpParams = httpParams.set('location_id', params.location_id.toString());
    }

    return this.http.get<SlotsResponse>(`${this.baseUrl}/slots`, {
      headers: this.getHeaders(),
      params: httpParams,
    });
  }
}
