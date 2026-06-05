export interface RegisterTenantRequest {
  owner_name: string;
  display_name: string;
  business_name?: string;
  email: string;
  password: string;
  password_confirmation: string;
  accepted_terms: boolean;
  phone?: string;
  desired_subdomain?: string;
}

export interface RegisterTenantResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    token_type: string;
    guard: string;
    expires_in: number;
    user: {
      id: number;
      tenant_id: number;
      name: string;
      email: string;
    };
  };
}