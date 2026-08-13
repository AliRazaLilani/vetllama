import { apiClient } from '@/lib/api/client';
import { ENDPOINTS } from '@/lib/api/endpoints';
import { useAuthStore } from '@/stores/authStore';
import { CONSTANTS } from '../config/constants';
import { getCompanyId, storage } from '../utils/helpers';
import type { AxiosResponse } from 'axios';

export interface TelehealthJoinResponse {
  token: string;
  roomName: string;
  identity: string;
  conversationSid?: string;
}

export async function getMyAppointments(params?: {
  page?: number;
  per_page?: number;
  status?: string;
  from?: string | Date;
  to?: string | Date;
  search?: string
}): Promise<any> {
  try {
    const response = await apiClient.get<any>(ENDPOINTS.dashboard.myAppointments, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch my appointments:', error);
    throw error;
  }
}

export async function refreshAuthToken(): Promise<string> {
  const refreshToken = storage.get<string>(CONSTANTS.REFRESH_TOKEN_KEY);

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await apiClient.post<any>(
      `${CONSTANTS.API_BASE_URL}/api/user/auth/refresh`,
      { refresh_token: refreshToken }
    );

    const { access_token, user, expires_in, twilio_identity, twilio_token, refresh_token: newRefreshToken } =
      response.data.data;

    await storage.set(CONSTANTS.TOKEN_STORAGE_KEY, access_token);
    if (newRefreshToken) {
      await storage.set(CONSTANTS.REFRESH_TOKEN_KEY, newRefreshToken);
    }

    useAuthStore.setState({
      token: access_token,
      user: user,
      isAuthenticated: true,
      expires_in: expires_in,
      twilio_identity: twilio_identity,
      twilio_token: twilio_token,
    });

    return access_token;
  } catch (error) {
    storage.remove(CONSTANTS.TOKEN_STORAGE_KEY);
    storage.remove(CONSTANTS.REFRESH_TOKEN_KEY);
    storage.remove(CONSTANTS.USER_STORAGE_KEY);
    throw error instanceof Error ? error : new Error('Failed to refresh token');
  }
}

export async function cancelBooking(appointmentId: number):Promise<any> {
  try {
    const response = await apiClient.post(ENDPOINTS.booking.cancel(appointmentId));
    return response
  } catch (error) {
    console.error(error)
  }
}

export async function rescheduleAppointment(appointmentId: number, data:any){
  try {
    const response = await apiClient.put(ENDPOINTS.booking.reschedule(appointmentId), data);
    return response;
  } catch (error) {
    console.error(error)
  }
}

export async function markAppointmentIncomplete(appointmentId: number, remarks: string) {
  const response = await apiClient.post(ENDPOINTS.booking.markIncomplete(appointmentId), {
    remarks,
  });
  return response.data;
}

export async function updateProfile(data:any){
  try {
    const response = await apiClient.post(ENDPOINTS.user.profile,data)
    return response;
  } catch (error) {
    console.error(error)
  }
}

export async function getUserProfile(): Promise<AxiosResponse<any>> {
  try {
    const response = await apiClient.get(ENDPOINTS.user.profile);

    return response.data;
  } catch (error) {
    console.error('Failed to fetch my appointments:', error);
    throw error;
  }
}

export async function getTelehealthSession(sessionId: string): Promise<any> {
  try {
    const response = await apiClient.get<any>(ENDPOINTS.telehealth.session(sessionId));
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch telehealth session:', error);
    throw error;
  }
}

export async function joinTelehealthSession(sessionId: string): Promise<TelehealthJoinResponse> {
  try {
    const response = await apiClient.post<any>(ENDPOINTS.telehealth.joinSession(sessionId));
    return response.data.data;
  } catch (error) {
    console.error('Failed to join telehealth session:', error);
    throw error;
  }
}

export async function getDashboardStats(): Promise<any[]> {
  try {
    const response = await apiClient.get<any>(ENDPOINTS.dashboard.getDashboardStats);

    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    throw error;
  }
}

export async function getCompanyTenants(params?: {
  page?: number;
  per_page?: number;
}): Promise<any> {
  try {
    const companyId = getCompanyId();

    if (!companyId) {
      throw new Error('Company could not be resolved from the current domain');
    }
    const response = await apiClient.get<any>(ENDPOINTS.company.tenants, {
      params: {
        ...params,
      },
      headers: {
        'X-Company-ID': companyId,
      }
    });
    return response.data.data; // { list, pagination }
  } catch (error) {
    console.error('Failed to fetch company tenants:', error);
    throw error;
  }
}

export async function getNotification(): Promise<any[]> {
  try {
    const response = await apiClient.get<any>(ENDPOINTS.dashboard.notfication);

    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    throw error;
  }
}