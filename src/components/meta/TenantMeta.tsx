import { useTenant } from '@/lib/hooks/useTenant';
import { Helmet } from 'react-helmet-async';

import { COMPANIES, getCurrentCompany } from '@/lib/utils/helpers';

interface TenantMetaProps {
  pageTitle?: string;
  pageDescription?: string;
  pageImage?: string;
}

export function TenantMeta({ pageTitle, pageDescription, pageImage }: TenantMetaProps) {
  const { tenant, isLoading } = useTenant();


  const company = getCurrentCompany() ?? COMPANIES[0];


  if (isLoading || !tenant) {
    return (
      <Helmet>
        <title>{company.name}</title>
        <link rel="icon" type="image/x-icon" href={company.favicon} />
        <link rel="shortcut icon" href={company.favicon} />
        <link rel="apple-touch-icon" href={company.favicon} />
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

  // The company favicon takes priority over tenant-specific branding.
  const favicon = company.favicon || tenantFavicon;

  // Get logo from branding
  const logoUrl = tenant?.branding?.logo_url || company.logo;

  // Build meta tags - use SEO data from the correct path
  const title = pageTitle
    ? `${pageTitle} | ${seo?.meta_title || branding?.name || company.name}`
    : seo?.meta_title || branding?.name || company.name;

  const description =
    pageDescription ||
    seo?.meta_description ||
    seo?.og_description ||
    branding?.description ||
      company.footerDescription;
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
      <meta property="og:site_name" content={branding?.name || tenant?.name || company.name} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo?.og_title || title} />
      <meta name="twitter:description" content={seo?.og_description || description} />
      <meta name="twitter:image" content={image} />

      {/* Robots */}
      <meta name="robots" content="index, follow" />

      {/* Theme Color */}
      <meta name="theme-color" content={tenant?.branding?.primary_color || company.primaryColor} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: tenant?.name || branding?.name || company.name,
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
