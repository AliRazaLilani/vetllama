export const CONSTANTS = {
  // API
  API_BASE_URL: import.meta.env.VITE_API_URL || '',
  STRIPE_PUBLIC_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY || '',
  APP_URL: import.meta.env.VITE_APP_URL || 'https://vetllama.com',

  COMPANY_SIGNUP_URL: "https://client.petvetconnect.com/authentication/register",

  // Auth
  TOKEN_REFRESH_THRESHOLD: 15, // minutes
  TOKEN_REFRESH_INTERVAL_MINUTES: 30,
  TOKEN_STORAGE_KEY: 'access_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  USER_STORAGE_KEY: 'vetllama_user',

  // Booking
  BOOKING_STEPS: 4,
  BOOKING_STORAGE_KEY: 'vetllama_booking_data',

  // Animation
  ANIMATION_DURATION: 0.5,

  // Colors
  // DEFAULT_PRIMARY_COLOR: '#A86D45',
  // DEFAULT_SECONDARY_COLOR: '#FFFFFF',

  DEFAULT_PRIMARY_COLOR: '#316DFF',
  DEFAULT_SECONDARY_COLOR: '#ffffffff',

  IS_DEV_MODE: import.meta.env.VITE_DEV === 'true',
  // Tenant
  DEFAULT_TENANT: {
    host: import.meta.env.VITE_DEV_HOST || 'asad123.vetllama.com',
    domain: import.meta.env.VITE_DEV_DOMAIN || 'asad123.vetllama.com',
    subdomain: import.meta.env.VITE_DEV_SUBDOMAIN || 'asad123',
  },

  // Validation
  MAX_STRING_LENGTH: 500,
  MAX_ARRAY_LENGTH: 50,

  // Pagination
  DEFAULT_PAGE_SIZE: 10,

  // Date
  DATE_FORMAT: 'yyyy-MM-dd',
  TIME_FORMAT: 'HH:mm',
} as const;

/** ───────────────────────────────────────────
 *  Tenant domain helpers
 *  ─────────────────────────────────────────── */

export function getTenantFromUrl(): {
  host: string;
  domain: string;
  subdomain: string;
} {
  // In dev mode with localhost, use hardcoded values from env
  if (
    CONSTANTS.IS_DEV_MODE &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ) {
    return {
      host: CONSTANTS.DEFAULT_TENANT.host,
      domain: CONSTANTS.DEFAULT_TENANT.domain,
      subdomain: CONSTANTS.DEFAULT_TENANT.subdomain,
    };
  }

  // In production, extract from the actual domain
  const host = window.location.host;
  const domain = window.location.hostname;
  const subdomainParts = domain.split('.');

  // For subdomains like asad123.vetllama.com
  const subdomain = subdomainParts.length > 2 ? subdomainParts[0] : 'default';

  return { host, domain, subdomain };
}

/** ───────────────────────────────────────────
 *  Common headers for every API request
 *  ─────────────────────────────────────────── */

export function getTenantHeaders(): Record<string, string> {
  const tenant = getTenantFromUrl();
  return {
    'X-Tenant-Host': tenant.host,
    'X-Tenant-Domain': tenant.domain,
    'X-Tenant-Subdomain': tenant.subdomain,
  };
}
