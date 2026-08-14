/** ───────────────────────────────────────────
 *  General Utility Functions
 *  ─────────────────────────────────────────── */
import { CONSTANTS } from '@/lib/config/constants';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface DecodedTwilioToken {
  identity: string;
  roomName: string | null;
  chatServiceSid: string | null;
}

/** Merge Tailwind classes with clsx */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format currency string */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/** Format date to readable string */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Format time */
export function formatTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Truncate text with ellipsis */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/** Generate unique ID */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/** Debounce function */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/** Get initials from name */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/** Sleep utility for delays */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Check if token is expiring soon (within threshold minutes) */
export function isTokenExpiringSoon(token: string, thresholdMinutes = 15): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.warn('payload', payload);
    const exp = payload.exp * 1000; // Convert to ms
    const now = Date.now();
    const thresholdMs = thresholdMinutes * 60 * 1000;
    return exp - now < thresholdMs;
  } catch {
    return true;
  }
}

/** Get time slots for a date */
export function generateTimeSlots(startHour = 9, endHour = 17, intervalMinutes = 30): string[] {
  const slots: string[] = [];
  for (let h = startHour; h < endHour; h++) {
    for (let m = 0; m < 60; m += intervalMinutes) {
      const hour = h.toString().padStart(2, '0');
      const minute = m.toString().padStart(2, '0');
      slots.push(`${hour}:${minute}`);
    }
  }
  return slots;
}

export function clearAuthStorage(): void {
  const authKeys = [
    CONSTANTS.TOKEN_STORAGE_KEY,
    CONSTANTS.REFRESH_TOKEN_KEY,
    CONSTANTS.USER_STORAGE_KEY,
    'token',
    'authToken',
    'user',
  ];

  authKeys.forEach((key) => storage.remove(key));
}

/** Storage helpers with error handling */
export const storage = {
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set(key: string, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Failed to save to localStorage: ${key}`, error);
    }
  },
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Failed to remove from localStorage: ${key}`, error);
    }
  },
};

export const normalizeUrl = (url?: string) => {
  if (!url) return '#';

  const trimmed = url.trim();

    try {
      return new URL(trimmed).toString();
    } catch {
      return `https://${trimmed}`;
    }
  };  

export async function fetchTwilioToken(identity: string, roomName: string): Promise<string> {
  const res = await fetch('/api/twilio/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity, roomName }),
  });
  if (!res.ok) throw new Error('Failed to fetch Twilio token');
  const data = await res.json();
  return data.token;
}

export function decodeTwilioToken(token: string): DecodedTwilioToken {
  const payloadPart = token.split('.')[1];
  if (!payloadPart) throw new Error('Malformed Twilio token');

  const base64 = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
  const json = JSON.parse(atob(padded));

  const grants = json.grants ?? {};
  return {
    identity: grants.identity ?? '',
    roomName: grants.video?.room ?? null,
    chatServiceSid: grants.chat?.service_sid ?? null,
  };
}

export function formatStatus(status: string) {
  return status?.split('_')?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))?.join(' ');
}

const AVATAR_COLORS = ['#F97316', '#8B5CF6', '#0EA5E9', '#10B981', '#F43F5E', '#EAB308', '#6366F1', '#14B8A6'];

export function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export interface CompanyBrand {
  id: number;
  domain: string;
  name: string;
  signupUrl: string;
  logo: string;
  footerLogo: string;
  favicon: string;
  supportEmail: string;
  footerDescription: string;
  primaryColor: string;
}

export const COMPANIES: CompanyBrand[] = [
  {
    id: 2,
    domain: 'vetllama.com',
    name: 'VetLlama',
    signupUrl: 'https://client.vetllama.com/authentication/register',
    logo: '/assets/images/logo-3.png',
    footerLogo: '/assets/images/logo-33.png',
    favicon: '/assets/images/favicon.ico',
    supportEmail: 'info@24vetsupport.com',
    footerDescription: 'We’re a trusted veterinary clinic dedicated to keeping your pets healthy and happy.',
    primaryColor: '#316DFF',
  },
  {
    id: 3,
    domain: 'petvetconnect.com',
    name: 'PetVetConnect',
    signupUrl: 'https://client.petvetconnect.com/authentication/register',
    logo: '/assets/images/PetVetConnect_NoBG.png',
    footerLogo: '/assets/images/PetVetConnect_NoBG.png',
    favicon: '/assets/images/petvet-favicon.ico',
    supportEmail: 'info@petvethotline.com',
    footerDescription: 'We’re a trusted veterinary clinic dedicated to keeping your pets healthy and happy.',
    primaryColor: '#316DFF',
  },
];

export const COMPANY_DOMAINS = COMPANIES.map(
  (company) => company.domain
);

export function getCurrentDomain(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.location.hostname
    .trim()
    .toLowerCase()
    .replace(/^www\./, '');
}

export function getCurrentCompany() {
  const domain = getCurrentDomain();
  const isLocalDevelopment = domain === 'localhost' || domain === '127.0.0.1';
  const developmentCompanyDomain = import.meta.env.VITE_COMPANY_DOMAIN
    ?.trim()
    .toLowerCase()
    .replace(/^www\./, '');

  if (isLocalDevelopment && developmentCompanyDomain) {
    return COMPANIES.find(
      (company) => company.domain.toLowerCase() === developmentCompanyDomain
    );
  }

  return COMPANIES.find(
    (company) => {
      const companyDomain = company.domain.toLowerCase();
      return domain === companyDomain || domain.endsWith(`.${companyDomain}`);
    }
  );
}

export function getCompanyId(): number | undefined {
  return getCurrentCompany()?.id;
}

export function isCompanyDomain(): boolean {
  return Boolean(getCurrentCompany());
}

export function getCompanyName(): string | undefined {
  return getCurrentCompany()?.name;
}

export function getCompanyLogo(): string | undefined {
  return getCurrentCompany()?.logo;
}

export function getCompanyFavicon(): string | undefined {
  return getCurrentCompany()?.favicon;
}

export function getCompanySignupUrl(): string | undefined {
  return getCurrentCompany()?.signupUrl;
}
