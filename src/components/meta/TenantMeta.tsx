import { useTenant } from '@/lib/hooks/useTenant';
import { Helmet } from 'react-helmet-async';

import { getCurrentDomain } from "@/lib/utils/helpers"

interface TenantMetaProps {
  pageTitle?: string;
  pageDescription?: string;
  pageImage?: string;
}

export function TenantMeta({ pageTitle, pageDescription, pageImage }: TenantMetaProps) {
  const { tenant, isLoading } = useTenant();


  const domain = getCurrentDomain();

  const domainFaviconMap: Record<string, string> = {
    'vetllama.com': '/assets/images/favicon.ico',
    'petvetconnect.com': '/assets/images/petvet-favicon.ico',
  };

  const domainTitleMap: Record<string, string> = {
    'vetllama.com': 'VetLlama',
    'petvetconnect.com': 'PetVetConnect',
  };

  const domainFavicon = domainFaviconMap[domain];
  const domainTitle = domainTitleMap[domain];


  if (isLoading || !tenant) {
    return (
      <Helmet>
        <title>{domainTitle || "Pet Doctor"}</title>
      </Helmet>
    );
  }

  // Get branding from the correct path
  const homepageContent = tenant?.public_config?.homepage_content || {};
  const branding = homepageContent?.branding || {};
  const seo = branding?.seo || {};

  // Get favicon from branding (top level)
  const tenantFavicon =
    tenant?.branding?.favicon_url ||
    seo?.favicon ||
    '/images/favicon.ico';

  // Domain favicon takes priority
  const favicon = domainFavicon || tenantFavicon;

  // Get logo from branding
  const logoUrl = tenant?.branding?.logo_url || '';

  // Build meta tags - use SEO data from the correct path
  const title = pageTitle
    ? `${pageTitle} | ${seo?.meta_title || branding?.name || 'Pet Doctor'}`
    : seo?.meta_title || branding?.name || 'Pet Doctor';

  const description =
    pageDescription ||
    seo?.meta_description ||
    seo?.og_description ||
    branding?.description ||
    'Veterinary care for your pets';
  const image = pageImage || seo?.og_image || logoUrl || '/og-image.jpg';
  const url = seo?.canonical_url || window.location.href;
  const keywords = seo?.meta_keywords || '';

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Keywords */}
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href={favicon} />
      <link rel="shortcut icon" href={favicon} />
      <link rel="apple-touch-icon" href={favicon} />

      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:title" content={seo?.og_title || title} />
      <meta property="og:description" content={seo?.og_description || description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={branding?.name || tenant?.name || 'Pet Doctor'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo?.og_title || title} />
      <meta name="twitter:description" content={seo?.og_description || description} />
      <meta name="twitter:image" content={image} />

      {/* Robots */}
      <meta name="robots" content="index, follow" />

      {/* Theme Color */}
      <meta name="theme-color" content={tenant?.branding?.primary_color || '#0066FF'} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: tenant?.name || branding?.name || 'Pet Doctor',
          url: url,
          logo: logoUrl,
          description: description,
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: tenant?.public_config?.contact_details?.phone || '',
            contactType: 'customer service',
          },
          sameAs: tenant?.branding?.social_links
            ? Object.values(tenant.branding.social_links).filter(Boolean)
            : [],
        })}
      </script>
    </Helmet>
  );
}
