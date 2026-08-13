/** ───────────────────────────────────────────
 *  Landing Page Content Types
 *  ─────────────────────────────────────────── */

export interface Section {
  isShow: boolean;
  order: number;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface FeaturesContent {
  title: string;
  items: FeatureItem[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  image: string;
}

export interface ServicesContent {
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

export interface TestimonialItem {
  name: string;
  petName: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface TestimonialsContent {
  title: string;
  items: TestimonialItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQContent {
  title: string;
  items: FAQItem[];
}

export interface CTAContent {
  title: string;
  subtitle: string;
  buttonText: string;
}

export interface LandingPageMetadata {
  title: string;
  description: string;
  favicon: string;
  ogImage: string;
}

export interface LandingPageContent {
  metadata: LandingPageMetadata;
  primaryColor: string;
  secondaryColor: string;
  hero: Section & HeroContent;
  features: Section & FeaturesContent;
  services: Section & ServicesContent;
  testimonials: Section & TestimonialsContent;
  faq: Section & FAQContent;
  cta: Section & CTAContent;
}

/** ───────────────────────────────────────────
 *  Booking Flow Types
 *  ─────────────────────────────────────────── */

export interface BookingData {
  serviceId: string;
  date: string;
  time: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  petName: string;
  petType: string;
  petBreed: string;
  petAge: string;
  paymentMethodId: string;
}

export interface BookingStepProps {
  bookingData: Partial<BookingData>;
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

/** ───────────────────────────────────────────
 *  API Types
 *  ─────────────────────────────────────────── */

export interface TenantInfo {
  landingPageId: string;
  content: LandingPageContent;
  primaryColor: string;
  secondaryColor: string;
}

export interface TenantResolveRequest {
  host: string;
  domain: string;
  subdomain: string;
}

export interface AuthUser {
  id: number;
  name: string;
  image?: string;
  email: string;
  phone?: any;
  is_active: boolean;
}

export interface MagicLinkRequest {
  email: string;
}

export interface MagicLinkVerifyRequest {
  email: string;
  token: string;
  device_token: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: AuthUser;
}

export interface RefreshResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: Pick<AuthUser, 'id' | 'email'>;
}

export interface ValidationError {
  field: string;
  message: string;
  providedValue: unknown;
  minLength?: number;
  maxLength?: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  sanitized: LandingPageContent;
}

/** ───────────────────────────────────────────
 *  API Response Types
 *  ─────────────────────────────────────────── */

export interface DashboardDataResponse {
  stats: {
    totalAppointments: number;
    upcomingAppointments: number;
    totalPets: number;
    favoriteDoctors: number;
  };
  appointments: Appointment[];
  favorites: FavoriteDoctor[];
  notifications: Notification[];
  healthRecords: HealthRecord[];
  dependents: Dependent[];
}

/** ───────────────────────────────────────────
 *  Dashboard Types
 *  ─────────────────────────────────────────── */

export interface Appointment {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatar: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  type: string;
  petName: string;
}

export interface FavoriteDoctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
}

export interface HealthRecord {
  id: string;
  label: string;
  value: string;
  unit: string;
  icon: string;
  date: string;
}

export interface DashboardStats {
  totalAppointments: number;
  upcomingAppointments: number;
  totalPets: number;
  favoriteDoctors: number;
}

export interface Notification {
  id: string;
  type: 'booking' | 'review' | 'reminder' | 'system';
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface Dependent {
  id: string;
  name: string;
  relationship: string;
  age: string;
  avatar: string;
}
