import { SITE_NAME, SITE_TAGLINE, SITE_URL, CONTACT_INFO, SOCIAL_LINKS } from './constants';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/logo.png`,
      width: 600,
      height: 120,
    },
    tagline: SITE_TAGLINE,
    sameAs: [
      SOCIAL_LINKS.facebook,
      SOCIAL_LINKS.twitter,
      SOCIAL_LINKS.youtube,
      SOCIAL_LINKS.linkedin,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT_INFO.phone,
      contactType: 'editorial newsroom',
      email: CONTACT_INFO.email,
    },
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export interface NewsArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  authorUrl?: string;
  categoryName: string;
}

export function getNewsArticleSchema(props: NewsArticleSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': props.url,
    },
    headline: props.title,
    description: props.description,
    image: [props.imageUrl],
    datePublished: props.datePublished,
    dateModified: props.dateModified,
    articleSection: props.categoryName,
    inLanguage: 'bn-BD',
    author: {
      '@type': 'Person',
      name: props.authorName,
      url: props.authorUrl || `${SITE_URL}`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
