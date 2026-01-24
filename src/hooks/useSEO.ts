import { useEffect } from 'react'

interface SEOConfig {
  title: string
  description: string
  canonical?: string
  jsonLd?: object
}

const BASE_URL = 'https://stino-link-library.lovable.app'

export function useSEO({ title, description, canonical, jsonLd }: SEOConfig) {
  useEffect(() => {
    // Update document title
    document.title = title

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', description)
    }

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', title)
    
    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) ogDescription.setAttribute('content', description)

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (!twitterTitle) {
      const newTag = document.createElement('meta')
      newTag.setAttribute('name', 'twitter:title')
      newTag.setAttribute('content', title)
      document.head.appendChild(newTag)
    } else {
      twitterTitle.setAttribute('content', title)
    }

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    const canonicalUrl = canonical || BASE_URL
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.rel = 'canonical'
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.href = canonicalUrl

    // JSON-LD structured data
    let jsonLdScript = document.querySelector('script[type="application/ld+json"]')
    if (jsonLd) {
      if (!jsonLdScript) {
        jsonLdScript = document.createElement('script')
        jsonLdScript.setAttribute('type', 'application/ld+json')
        document.head.appendChild(jsonLdScript)
      }
      jsonLdScript.textContent = JSON.stringify(jsonLd)
    }

    return () => {
      // Cleanup JSON-LD on unmount if needed
    }
  }, [title, description, canonical, jsonLd])
}

// Generate JSON-LD for the gallery
export function generateGalleryJsonLd(items: Array<{ title: string; subtitle: string; href: string; category: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Stino 180 Gallery',
    description: 'A curated gallery of music, projects, and creative works by Stino 180.',
    url: BASE_URL,
    author: {
      '@type': 'Person',
      name: 'Stino 180',
      url: BASE_URL,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          name: item.title,
          description: item.subtitle,
          url: item.href,
          genre: item.category,
        },
      })),
    },
  }
}

// Category-specific SEO content
export function getCategorySEO(category: string): { title: string; description: string } {
  const seoMap: Record<string, { title: string; description: string }> = {
    All: {
      title: 'Stino 180 — Gallery',
      description: 'Explore the creative works of Stino 180. A curated gallery of music, projects, and connections.',
    },
    Music: {
      title: 'Music — Stino 180',
      description: 'Stream and discover music by Stino 180. Latest tracks, releases, and artist profiles.',
    },
    Video: {
      title: 'Videos — Stino 180',
      description: 'Watch music videos, mini films, and visual content by Stino 180.',
    },
    Portfolio: {
      title: 'Portfolio — Stino 180',
      description: 'Freelance work and creative projects. Web design, development, and digital experiences.',
    },
    Social: {
      title: 'Social Media — Stino 180',
      description: 'Connect with Stino 180 on TikTok, Instagram, Twitter, and more.',
    },
    Projects: {
      title: 'Projects — Stino 180',
      description: 'Explore innovative projects: Vizi clothing, Zmove sports app, Mozze streaming, and more.',
    },
    Contact: {
      title: 'Contact — Stino 180',
      description: 'Get in touch with Stino 180 for collaborations, bookings, and inquiries.',
    },
  }

  return seoMap[category] || seoMap.All
}
