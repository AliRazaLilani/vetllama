/** ───────────────────────────────────────────
 *  API Type Definitions
 *  ─────────────────────────────────────────── */

import type {
  TenantInfo,
  AuthResponse,
  RefreshResponse,
  LandingPageContent,
} from '@/types/content';

/** Base API response wrapper */
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

/** API Error response */
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

/** Tenant API */
export type TenantResolveResponse = TenantInfo;

/** Auth API */
export type MagicLinkRequestResponse = { success: boolean; message: string };
export type MagicLinkVerifyResponse = AuthResponse;
export type RefreshTokenResponse = RefreshResponse;
export type LogoutResponse = { success: boolean };

/** Booking API */
export interface AvailableSlotsResponse {
  date: string;
  slots: string[];
}

export interface BookingResponse {
  id: string;
  status: 'confirmed' | 'pending';
  message: string;
  appointmentDate: string;
  appointmentTime: string;
  serviceName: string;
  totalAmount: number;
}

/** Content API */
export type GetContentResponse = LandingPageContent;

/** Dashboard API */
export interface DashboardDataResponse {
  stats: {
    totalAppointments: number;
    upcomingAppointments: number;
    totalPets: number;
    favoriteDoctors: number;
  };
  appointments: Array<{
    id: string;
    doctorName: string;
    doctorSpecialty: string;
    doctorAvatar: string;
    date: string;
    time: string;
    status: string;
    type: string;
    petName: string;
  }>;
  favorites: Array<{
    id: string;
    name: string;
    specialty: string;
    avatar: string;
  }>;
  notifications: Array<{
    id: string;
    type: string;
    message: string;
    timestamp: string;
    isRead: boolean;
  }>;
  healthRecords: Array<{
    id: string;
    label: string;
    value: string;
    unit: string;
    icon: string;
    date: string;
  }>;
  dependents: Array<{
    id: string;
    name: string;
    relationship: string;
    age: string;
    avatar: string;
  }>;
}
