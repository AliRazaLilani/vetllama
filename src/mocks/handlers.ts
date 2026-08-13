/** ───────────────────────────────────────────
 *  MSW Mock API Handlers
 *  Production-ready mock handlers for all endpoints
 *  ─────────────────────────────────────────── */

import { ENDPOINTS } from '@/lib/api/endpoints';
import type {
  AuthResponse,
  BookingData,
  MagicLinkRequest,
  MagicLinkVerifyRequest,
  TenantResolveRequest,
} from '@/types/content';
import { delay, http, HttpResponse } from 'msw';
import { generateMockSlots, mockDashboardData, mockUsers, tenants } from './data';

/** Simulate network latency */
const LATENCY = 300;

/** In-memory token store for demo */
const activeTokens = new Set<string>();

/** Helper to generate a mock JWT token */
function generateToken(userId: number, email: string): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const exp = Math.floor(Date.now() / 1000) + 3600; // 1 hour
  const payload = btoa(
    JSON.stringify({ sub: userId, email, exp, iat: Math.floor(Date.now() / 1000) })
  );
  const signature = btoa('mock-signature');
  const token = `${header}.${payload}.${signature}`;
  activeTokens.add(token);
  return token;
}

/** Helper to check if token is valid */
function isValidToken(token: string): boolean {
  return activeTokens.has(token);
}

/** ───────────────────────────────────────────
 *  Tenant Handlers
 *  ─────────────────────────────────────────── */

export const tenantHandlers = [
  http.post(ENDPOINTS.tenant.resolve, async ({ request: req }) => {
    await delay(LATENCY);
    const body = (await req.json()) as TenantResolveRequest;
    const subdomain = body.subdomain || 'asad123';
    const tenant = tenants[subdomain] || tenants['asad123'];

    return HttpResponse.json({
      success: true,
      data: tenant,
    });
  }),
];

/** ───────────────────────────────────────────
 *  Auth Handlers
 *  ─────────────────────────────────────────── */

export const authHandlers = [
  // Request magic link
  http.post(ENDPOINTS.auth.magicLinkRequest, async ({ request: req }) => {
    await delay(LATENCY);
    const body = (await req.json()) as MagicLinkRequest;

    if (!body.email || !body.email.includes('@')) {
      return HttpResponse.json(
        { success: false, message: 'Valid email is required' },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      success: true,
      message: 'Magic link sent to your email. Please check your inbox.',
    });
  }),

  // Verify magic link
  http.post(ENDPOINTS.auth.magicLinkVerify, async ({ request: req }) => {
    await delay(LATENCY);
    const body = (await req.json()) as MagicLinkVerifyRequest;

    if (!body.email || !body.token) {
      return HttpResponse.json(
        { success: false, message: 'Email and token are required' },
        { status: 400 }
      );
    }

    const user = mockUsers[body.email] || {
      id: Date.now(),
      name: body.email.split('@')[0],
      email: body.email,
    };

    const token = generateToken(user.id, user.email);

    const response: AuthResponse = {
      access_token: token,
      token_type: 'bearer',
      expires_in: 3600,
      user,
    };

    return HttpResponse.json({
      success: true,
      data: response,
    });
  }),

  // Refresh token
  http.post(ENDPOINTS.auth.refresh, async ({ request: req }) => {
    await delay(LATENCY);
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token || !isValidToken(token)) {
      return HttpResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Extract email from token payload
    const payload = JSON.parse(atob(token.split('.')[1]));
    const newToken = generateToken(payload.sub, payload.email);

    return HttpResponse.json({
      success: true,
      data: {
        access_token: newToken,
        token_type: 'bearer',
        expires_in: 3600,
        user: { id: payload.sub, email: payload.email },
      },
    });
  }),

  // Logout
  http.post(ENDPOINTS.auth.logout, async ({ request: req }) => {
    await delay(LATENCY);
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (token) {
      activeTokens.delete(token);
    }

    return HttpResponse.json({
      success: true,
      data: { success: true },
    });
  }),
];

/** ───────────────────────────────────────────
 *  Content Handlers
 *  ─────────────────────────────────────────── */

export const contentHandlers = [
  http.get('/api/public/content/:templateId', async ({ params }) => {
    await delay(LATENCY);
    const { templateId } = params;

    const contentMap: Record<string, unknown> = {
      'template-1': tenants['asad123'].content,
      'template-2': tenants['petcare'].content,
      'template-3': tenants['vetmed'].content,
    };

    const content = contentMap[templateId as string] || tenants['asad123'].content;

    return HttpResponse.json({
      success: true,
      data: content,
    });
  }),
];

/** ───────────────────────────────────────────
 *  Booking Handlers
 *  ─────────────────────────────────────────── */

export const bookingHandlers = [
  // Get available slots
  http.get(ENDPOINTS.booking.availableSlots, async ({ request: req }) => {
    await delay(LATENCY);
    const url = new URL(req.url);
    const date = url.searchParams.get('date');

    if (!date) {
      return HttpResponse.json(
        { success: false, message: 'Date parameter is required' },
        { status: 400 }
      );
    }

    const slots = generateMockSlots(date);

    return HttpResponse.json({
      success: true,
      data: { date, slots },
    });
  }),

  // Create booking
  http.post(ENDPOINTS.booking.create, async ({ request: req }) => {
    await delay(LATENCY + 200);
    const body = (await req.json()) as BookingData;

    if (!body.serviceId || !body.date || !body.time) {
      return HttpResponse.json(
        { success: false, message: 'Service, date, and time are required' },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      success: true,
      data: {
        id: `booking-${Date.now()}`,
        status: 'confirmed',
        message: 'Appointment booked successfully!',
        appointmentDate: body.date,
        appointmentTime: body.time,
        serviceName: 'Veterinary Service',
        totalAmount: 75.0,
      },
    });
  }),
];

/** ───────────────────────────────────────────
 *  Payment Handlers
 *  ─────────────────────────────────────────── */

export const paymentHandlers = [
  // Create payment intent
  http.post(ENDPOINTS.payments.intent, async ({ request: req }) => {
    await delay(LATENCY);
    const body = (await req.json()) as { amount: number; currency?: string };

    return HttpResponse.json({
      success: true,
      data: {
        clientSecret: `pi_${Date.now()}_secret_${Math.random().toString(36).substring(2)}`,
        amount: body.amount || 7500,
        currency: body.currency || 'usd',
      },
    });
  }),

  // Confirm payment
  http.post(ENDPOINTS.payments.confirm, async () => {
    await delay(LATENCY);
    return HttpResponse.json({
      success: true,
      data: {
        status: 'succeeded',
        paymentIntentId: `pi_${Date.now()}`,
      },
    });
  }),
];

/** ───────────────────────────────────────────
 *  Dashboard Handlers
 *  ─────────────────────────────────────────── */

export const dashboardHandlers = [
  // Get dashboard overview
  http.get(ENDPOINTS.dashboard.overview, async ({ request: req }) => {
    await delay(LATENCY);
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token || !isValidToken(token)) {
      return HttpResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    return HttpResponse.json({
      success: true,
      data: mockDashboardData,
    });
  }),

  // Get appointments
  // http.get(ENDPOINTS.dashboard.appointments, async ({ request: req }) => {
  //   await delay(LATENCY);
  //   const authHeader = req.headers.get('Authorization');
  //   const token = authHeader?.replace('Bearer ', '');

  //   if (!token || !isValidToken(token)) {
  //     return HttpResponse.json(
  //       { success: false, message: 'Unauthorized' },
  //       { status: 401 }
  //     );
  //   }

  //   return HttpResponse.json({
  //     success: true,
  //     data: mockDashboardData.appointments,
  //   });
  // }),

  // Get favorites
  http.get(ENDPOINTS.dashboard.favorites, async ({ request: req }) => {
    await delay(LATENCY);
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token || !isValidToken(token)) {
      return HttpResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    return HttpResponse.json({
      success: true,
      data: mockDashboardData.favorites,
    });
  }),

  // Get notifications
  // http.get(ENDPOINTS.dashboard.notifications, async ({ request: req }) => {
  //   await delay(LATENCY);
  //   const authHeader = req.headers.get('Authorization');
  //   const token = authHeader?.replace('Bearer ', '');

  //   if (!token || !isValidToken(token)) {
  //     return HttpResponse.json(
  //       { success: false, message: 'Unauthorized' },
  //       { status: 401 }
  //     );
  //   }

  //   return HttpResponse.json({
  //     success: true,
  //     data: mockDashboardData.notifications,
  //   });
  // }),
];

/** ───────────────────────────────────────────
 *  Combine all handlers
 *  ─────────────────────────────────────────── */

export const handlers = [
  ...tenantHandlers,
  ...authHandlers,
  ...contentHandlers,
  ...bookingHandlers,
  ...paymentHandlers,
  ...dashboardHandlers,
];
