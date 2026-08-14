# VetLlama - Veterinary Practice Platform

A production-ready, enterprise-grade veterinary practice landing page application with dynamic templates, booking flow, authentication, and patient dashboard.

**Live URL:** https://ewd6bswor5mgi.kimi.page

---

## Features

### 3 Dynamic Landing Page Templates
- **Template 1 (Modern Clean)** - Professional blue-themed layout with hero, features, services, testimonials, FAQ, and CTA sections
- **Template 2 (Warm & Friendly)** - Warm orange/cream-themed layout with home-like atmosphere, photo gallery, and cozy design elements
- **Template 3 (Professional Clinical)** - Clinical dark green-themed layout for specialty veterinary centers with academic focus

### Content Validation System
- JSON schema validation with min/max length rules
- Default values for missing fields
- Type-safe content sanitization
- Per-template validation and content files

### Authentication System
- Magic link authentication (passwordless)
- JWT token management with automatic refresh
- Protected dashboard routes
- Auth state persistence with Zustand

### 4-Step Booking Flow
1. **Service Selection** - Radio-style service cards with pricing
2. **Date & Time** - Calendar picker with available slots from API
3. **Pet & Owner Info** - Form validation with Zod schema
4. **Payment** - Stripe Elements integration with payment intent

### Patient Dashboard (DOCCURE-style)
- Sidebar navigation with collapsible menu
- Top navigation with breadcrumbs
- Stats cards (appointments, pets, favorites)
- Health records widget
- Overall health report with circular progress
- Appointments list with video call button
- Favorite doctors list
- Analytics chart (heart rate & blood pressure)
- Notifications widget
- Dependents/pets management
- Reports table

### API Integration
- Axios client with request/response interceptors
- Tenant resolution from subdomain
- Automatic tenant headers (host, domain, subdomain) on every request
- Mock Service Worker (MSW) for production-ready API simulation

---

## Tech Stack

- **React 18** + **TypeScript** (strict mode)
- **Vite** (build tool)
- **Tailwind CSS** + **shadcn/ui** (40+ components)
- **Framer Motion** (animations)
- **React Router v7** (routing)
- **Zustand** (state management)
- **React Hook Form** + **Zod** (form validation)
- **MSW** (Mock Service Worker)
- **Stripe React** (payments)
- **date-fns** (date formatting)
- **Lucide React** (icons)

---

## Project Structure

```
src/
├── components/
│   ├── common/          # Header, Footer
│   ├── landing/         # Landing page sections & 3 templates
│   ├── booking/         # 4-step booking components
│   └── dashboard/       # Sidebar, TopNav, widgets
├── pages/               # LandingPage, BookingPage, DashboardPage
├── lib/
│   ├── api/             # API client, endpoints, types
│   ├── config/          # Constants, site config
│   ├── hooks/           # useAuth, useTenant, useScrollAnimation
│   └── utils/           # validators, helpers, cn
├── stores/              # Zustand auth store
├── mocks/               # MSW handlers & mock data
├── types/               # TypeScript type definitions
└── content/             # JSON content files
```

---

## Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=https://api.vetllama.com
VITE_STRIPE_PUBLIC_KEY=pk_test_your_key_here
VITE_APP_URL=https://vetllama.com

# Dev mode tenant (used on localhost)
VITE_DEV_HOST=asad123.vetllama.com
VITE_DEV_DOMAIN=asad123.vetllama.com
VITE_DEV_SUBDOMAIN=asad123

# Branding to preview when running the public site on localhost
VITE_COMPANY_DOMAIN=petvetconnect.com
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## API Endpoints

### Tenant
- `POST /api/public/tenant/resolve` - Resolve tenant from subdomain

### Auth
- `POST /api/user/auth/magic-link/request` - Request magic link
- `POST /api/user/auth/magic-link/verify` - Verify magic link
- `POST /api/user/auth/refresh` - Refresh token
- `POST /api/user/auth/logout` - Logout

### Content
- `GET /api/public/content/:templateId` - Get landing page content

### Booking
- `GET /api/public/booking/slots?date=` - Get available slots
- `POST /api/public/booking` - Create booking

### Payments
- `POST /api/public/payments/intent` - Create payment intent
- `POST /api/public/payments/confirm` - Confirm payment

### Dashboard
- `GET /api/user/dashboard` - Get dashboard overview
- `GET /api/user/appointments` - Get appointments
- `GET /api/user/favorites` - Get favorite doctors
- `GET /api/user/notifications` - Get notifications

---

## Tenant Resolution

Every API request automatically includes tenant headers:
- `X-Tenant-Host`
- `X-Tenant-Domain`
- `X-Tenant-Subdomain`

In production, these are extracted from the URL. In development (localhost), they use the hardcoded values from `.env`.

---

## License

MIT
