import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  RegisterTenantRequest,
  RegisterTenantResponse,
} from '../models/tenant-auth.model';

@Injectable({
  providedIn: 'root',
})
export class TenantAuthService {
  private http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}/public/tenant/auth`;

  registerTenant(
    payload: RegisterTenantRequest
  ): Observable<RegisterTenantResponse> {
    return this.http.post<RegisterTenantResponse>(
      `${this.apiUrl}/register`,
      payload
    );
  }
}