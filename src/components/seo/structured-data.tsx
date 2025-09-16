import React from 'react';

interface ProductStructuredDataProps {
  name: string;
  description: string;
  price: string;
  currency: string;
  availability: 'InStock' | 'OutOfStock' | 'PreOrder';
  brand?: string;
  category?: string;
  image?: string;
  sku?: string;
  gtin?: string;
  mpn?: string;
  condition?: 'NewCondition' | 'UsedCondition' | 'RefurbishedCondition';
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
  offers?: {
    price: string;
    currency: string;
    availability: string;
    validFrom?: string;
    validThrough?: string;
  }[];
}

export const ProductStructuredData: React.FC<ProductStructuredDataProps> = ({
  name,
  description,
  price,
  currency,
  availability,
  brand = 'AssetsAhead',
  category = 'Electronics',
  image,
  sku,
  gtin,
  mpn,
  condition = 'NewCondition',
  aggregateRating,
  offers,
}) => {
  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name,
    description,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    category,
    image: image ? [image] : undefined,
    sku,
    gtin,
    mpn,
    condition: `https://schema.org/${condition}`,
    offers: offers || [
      {
        '@type': 'Offer',
        price,
        priceCurrency: currency,
        availability: `https://schema.org/${availability}`,
        seller: {
          '@type': 'Organization',
          name: brand,
        },
      },
    ],
    aggregateRating: aggregateRating
      ? {
          '@type': 'AggregateRating',
          ratingValue: aggregateRating.ratingValue,
          reviewCount: aggregateRating.reviewCount,
        }
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
};

interface OrganizationStructuredDataProps {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  contactInfo?: {
    telephone?: string;
    email?: string;
    address?: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
  };
  socialMediaUrls?: string[];
  sameAs?: string[];
}

export const OrganizationStructuredData: React.FC<OrganizationStructuredDataProps> = ({
  name,
  url,
  logo,
  description,
  contactInfo,
  socialMediaUrls,
  sameAs,
}) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    contactPoint: contactInfo
      ? {
          '@type': 'ContactPoint',
          telephone: contactInfo.telephone,
          email: contactInfo.email,
          contactType: 'Customer Service',
          availableLanguage: 'English',
        }
      : undefined,
    address: contactInfo?.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: contactInfo.address.streetAddress,
          addressLocality: contactInfo.address.addressLocality,
          addressRegion: contactInfo.address.addressRegion,
          postalCode: contactInfo.address.postalCode,
          addressCountry: contactInfo.address.addressCountry,
        }
      : undefined,
    sameAs: sameAs || socialMediaUrls,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
};

interface WebPageStructuredDataProps {
  name: string;
  description: string;
  url: string;
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
  mainEntity?: any;
}

export const WebPageStructuredData: React.FC<WebPageStructuredDataProps> = ({
  name,
  description,
  url,
  breadcrumbs,
  mainEntity,
}) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    breadcrumb: breadcrumbs
      ? {
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        }
      : undefined,
    mainEntity,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
};

interface FAQStructuredDataProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const FAQStructuredData: React.FC<FAQStructuredDataProps> = ({ faqs }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
};

// Comprehensive SEO Head component
interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  type?: 'website' | 'article' | 'product';
  structuredData?: any;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonical,
  image,
  keywords,
  author = 'AssetsAhead',
  publishedTime,
  modifiedTime,
  type = 'website',
  structuredData,
}) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const canonicalUrl = canonical || currentUrl;

  return (
    <>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:site_name" content="AssetsAhead" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@assetsahead" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Mobile & Responsive */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#8B5CF6" />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2),
          }}
        />
      )}
    </>
  );
};