/** ───────────────────────────────────────────
 *  API Endpoints Registry
 *  All API routes in one place for maintainability
 *  ─────────────────────────────────────────── */

export const ENDPOINTS = {
  company: {
    tenants: '/api/public/company/tenants',
  },
  /** Tenant resolution */
  tenant: {
    resolve: '/api/public/tenant/resolve',
  },
  
  mediaUpload: {
    homeMedia: "api/user/public-config/home_media",
  },

  telehealth: {
    session: (id: string) => `/api/user/telehealth/sessions/${id}`,
    joinSession: (id: string) => `/api/user/telehealth/sessions/${id}/join`,
  },
  user: {
    profile: "api/user/profile",
  },

  /** Authentication */
  auth: {
    magicLinkRequest: '/api/user/auth/magic-link/request',
    magicLinkVerify: '/api/user/auth/magic-link/verify',
    refresh: '/api/user/auth/refresh',
    logout: '/api/user/auth/logout',
  },

  /** Content */
  content: {
    get: (templateId: string) => `/api/public/content/${templateId}`,
  },

  /** Booking */
  booking: {
    availableServices: '/api/public/tenant/services',
    locations: '/api/public/tenant/locations',
    availableSlots: '/api/public/tenant/slots',

    create: '/api/public/booking',
    createBooking: 'api/public/tenant/bookings',
    getBookingForm: '/api/public/tenant/form',
    markIncomplete: (id: string | number) => `api/user/bookings/${id}/incomplete`,

    cancel: (id: string | number) => `api/user/bookings/${id}/cancel`,
    reschedule: (id: string | number) => `api/user/bookings/${id}/reschedule`,
  },

  /** Dashboard */
  dashboard: {
    overview: '/api/user/dashboard',
    myAppointments: '/api/user/bookings',
    favorites: '/api/user/favorites',
    getDashboardStats: '/api/user/dashboard',
    healthRecords: '/api/user/health-records',
    dependents: '/api/user/dependents',
    notfication: '/api/user/notifications',
  },

  /** Payments */
  payments: {
    intent: '/api/public/payments/intent',
    confirm: '/api/public/payments/confirm',
  },
} as const;

/** Type-safe endpoint helper */
export type EndpointPath =
  | typeof ENDPOINTS.tenant.resolve
  | typeof ENDPOINTS.auth.magicLinkRequest
  | typeof ENDPOINTS.auth.magicLinkVerify
  | typeof ENDPOINTS.auth.refresh
  | typeof ENDPOINTS.auth.logout
  | ReturnType<typeof ENDPOINTS.content.get>
  | typeof ENDPOINTS.booking.availableServices
  | typeof ENDPOINTS.booking.create
  | typeof ENDPOINTS.booking.createBooking
  | typeof ENDPOINTS.dashboard.overview
  | typeof ENDPOINTS.dashboard.myAppointments
  | typeof ENDPOINTS.dashboard.favorites
  | typeof ENDPOINTS.dashboard.getDashboardStats
  | typeof ENDPOINTS.dashboard.healthRecords
  | typeof ENDPOINTS.dashboard.dependents
  | typeof ENDPOINTS.dashboard.notfication
  | typeof ENDPOINTS.payments.intent
  | typeof ENDPOINTS.payments.confirm;
