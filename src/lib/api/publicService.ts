import { apiClient } from '@/lib/api/client';
import { ENDPOINTS } from '@/lib/api/endpoints';
import type { ServiceItem } from '@/types/content';

export interface PublicServicesResponse {
  data: ServiceItem[];
  success: boolean;
  message?: string;
}

// Public apis do not need authentication
export async function getPublicServices(): Promise<any[]> {
  try {
    const response = await apiClient.get<any>(ENDPOINTS.booking.availableServices);

    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch public services:', error);
    throw error;
  }
}

export async function getLocations(): Promise<any[]> {
  try {
    const response = await apiClient.get<any>(ENDPOINTS.booking.locations);

    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch public services:', error);
    throw error;
  }
}

export async function createBooking(data: any): Promise<any[]> {
  try {
    const response = await apiClient.post<any>(ENDPOINTS.booking.createBooking, data);

    return response.data.data;
  } catch (error) {
    console.error('Failed to create booking:', error);
    throw error;
  }
}

export async function getBookingForm(): Promise<any> {
  try {
    const response = await apiClient.get<any>(ENDPOINTS.booking.getBookingForm, {});

    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch booking form:', error);
    throw error;
  }
}
