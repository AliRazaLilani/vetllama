// Tenant Types
export interface Tenant {
  id: number;
  name: string;
  slug: string;
  status: string;
  is_active: boolean;
}

export interface Template {
  id: number;
  name: string;
  slug: string;
  description: string;
  preview_url: string;
  is_active: boolean;
  schema: {
    sections: string[];
    required_fields: string[];
  };
}

export interface Branding {
  primary_color: string;
  secondary_color: string;
  logo_url: string;
  favicon_url: string;
  social_links: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface PublicConfig {
  contact_details: {
    email: string;
    phone: string;
    address: string;
  };
  homepage_content: {
    hero_title: string;
    hero_subtitle: string;
  };
  banners: any[];
  faq: any[];
  services: any[];
  settings: {
    booking_enabled: boolean;
    telehealth_enabled: boolean;
  };
  is_published: boolean;
}

export interface TenantResolutionResponse {
  success: boolean;
  message: string;
  data: {
    tenant: Tenant;
    template: Template;
    branding: Branding;
    public_config: PublicConfig;
  };
}

// Service Types
export interface DurationOption {
  id: number;
  service_offering_id: number;
  duration_minutes: number;
  price: string;
  currency: string;
  is_default: boolean;
  is_active: boolean;
}

export interface Service {
  id: number;
  type: 'telehealth' | 'clinic' | 'home_visit';
  name: string;
  description: string;
  delivery_mode: 'video' | 'in_person' | 'phone';
  duration_options: DurationOption[];
}

export interface ServiceResponse {
  success: boolean;
  message: string;
  data: Service[];
}

export interface ServiceDetailResponse {
  success: boolean;
  message: string;
  data: Service;
}

// Location Types
export interface Location {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  is_active: boolean;
}

export interface LocationsResponse {
  success: boolean;
  message: string;
  data: Location[];
}

// Policy Types
export interface Policy {
  booking_policy: string;
  faq: Array<{ question: string; answer: string }>;
  terms: string;
  privacy: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

export interface PoliciesResponse {
  success: boolean;
  message: string;
  data: Policy;
}

// Slot Types
export interface Slot {
  starts_at?: string;
  ends_at?: string;
  timezone?: string;
  start_time?: string;
  end_time?: string;
  is_available?: boolean;
}

export interface SlotsResponse {
  success: boolean;
  message: string;
  data: Slot[];
}

export interface SlotRequest {
  service_id: number;
  duration_id: number;
  date: string; // YYYY-MM-DD
  location_id?: number;
}

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'date' | 'radio' | 'checkbox' | 'textarea';
  label: string;
  required: boolean;
  can_delete?: boolean;
  placeholder?: string;
  options?: string[];
  max_characters?: number;
}

export interface FormSection {
  id: string;
  title: string;
  fields: FormField[];
  can_delete: boolean;
}

export interface FormConfig {
  id: number;
  tenant_id: number;
  form_template_id: number;
  schema: {
    sections: FormSection[];
  };
}

export interface FormConfigResponse {
  success: boolean;
  message: string;
  data: FormConfig;
}