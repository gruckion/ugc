# SEO Implementation Guide

This document details the SEO implementation for the UGC Marketplace Expo Router web application deployed at https://ugp.gruckion.com.

## Table of Contents

- [Overview](#overview)
- [Implementation Details](#implementation-details)
  - [robots.txt](#robotstxt)
  - [sitemap.xml](#sitemapxml)
  - [SEO Component](#seo-component)
  - [JSON-LD Structured Data](#json-ld-structured-data)
  - [Meta Tags](#meta-tags)
- [File Structure](#file-structure)
- [Usage Guide](#usage-guide)
- [Next Steps for Google Ranking](#next-steps-for-google-ranking)
- [Testing & Validation](#testing--validation)

---

## Overview

The SEO implementation follows industry best practices for Expo Router web applications with static rendering. Key features include:

- **robots.txt** - Controls search engine crawler access
- **sitemap.xml** - Lists all public routes for search engines
- **Reusable SEO Component** - Dynamic meta tags using `expo-router/head`
- **JSON-LD Structured Data** - Rich snippets for search results
- **Open Graph & Twitter Cards** - Social media sharing optimization

### Production URLs

| Resource    | URL                                  |
| ----------- | ------------------------------------ |
| Website     | https://ugp.gruckion.com             |
| robots.txt  | https://ugp.gruckion.com/robots.txt  |
| sitemap.xml | https://ugp.gruckion.com/sitemap.xml |
| OG Image    | https://ugp.gruckion.com/og.png      |

---

## Implementation Details

### robots.txt

**Location:** `app/apps/native/public/robots.txt`

The robots.txt file controls which pages search engine crawlers can access.

```txt
# robots.txt for UGC Marketplace
# https://ugp.gruckion.com

# Allow all search engine crawlers
User-agent: *
Allow: /

# Block authentication routes from indexing
Disallow: /(auth)/
Disallow: /signin
Disallow: /signup
Disallow: /password-reset

# Block internal/admin routes
Disallow: /_sitemap
Disallow: /_expo/

# Sitemap location
Sitemap: https://ugp.gruckion.com/sitemap.xml
```

**Key Decisions:**

- All public content is allowed for crawling
- Auth routes are blocked to prevent indexing of login/signup pages
- Internal Expo routes (`/_sitemap`, `/_expo/`) are blocked
- Sitemap location is declared for automatic discovery

---

### sitemap.xml

**Location:** `app/apps/native/public/sitemap.xml`

The XML sitemap lists all public routes with metadata for search engines.

**Included Routes (17 total):**

| Route               | Priority | Change Frequency |
| ------------------- | -------- | ---------------- |
| `/` (Homepage)      | 1.0      | daily            |
| `/pricing`          | 0.9      | weekly           |
| `/how-it-works`     | 0.9      | monthly          |
| `/browse`           | 0.9      | daily            |
| `/browse/creators`  | 0.9      | daily            |
| `/browse/briefs`    | 0.9      | daily            |
| `/about`            | 0.8      | monthly          |
| `/blog`             | 0.7      | weekly           |
| `/guides`           | 0.7      | weekly           |
| `/success-stories`  | 0.7      | weekly           |
| `/community-events` | 0.6      | weekly           |
| `/help-center`      | 0.6      | monthly          |
| `/brand-faq`        | 0.6      | monthly          |
| `/creator-faq`      | 0.6      | monthly          |
| `/contact`          | 0.5      | monthly          |
| `/termsofservice`   | 0.3      | yearly           |
| `/privacypolicy`    | 0.3      | yearly           |

**Priority Guidelines:**

- `1.0` - Homepage only
- `0.9` - Core conversion pages (pricing, browse, how-it-works)
- `0.7-0.8` - Content pages (blog, guides, about)
- `0.5-0.6` - Support pages (FAQ, help, contact)
- `0.3` - Legal pages (terms, privacy)

---

### SEO Component

**Location:** `app/apps/native/components/web/SEO.tsx`

A reusable React component that uses `expo-router/head` for dynamic meta tag management.

#### Props Interface

```typescript
interface SEOProps {
  /** Page title - will be appended with site name */
  title: string;
  /** Meta description for the page */
  description: string;
  /** Canonical URL path (e.g., "/about" or "/browse/creators") */
  path?: string;
  /** Custom OG image URL (defaults to site OG image) */
  ogImage?: string;
  /** OG type (defaults to "website") */
  ogType?: "website" | "article" | "product";
  /** Additional keywords for meta keywords tag */
  keywords?: string[];
  /** Whether to prevent indexing (for pages like auth) */
  noIndex?: boolean;
  /** JSON-LD structured data object */
  jsonLd?: object;
}
```

#### Usage Example

```tsx
import { SEO, createWebPageJsonLd } from "@/components/web/SEO";

export default function AboutPage() {
  const aboutPageJsonLd = createWebPageJsonLd(
    "About UGC Marketplace",
    "Learn about our mission and team.",
    "/about",
  );

  return (
    <>
      <SEO
        title="About Us"
        description="Learn about UGC Marketplace and our mission to connect brands with creators."
        path="/about"
        keywords={["about", "company", "team"]}
        jsonLd={aboutPageJsonLd}
      />
      <View>{/* Page content */}</View>
    </>
  );
}
```

#### Exported Helpers

| Function                                       | Description                                 |
| ---------------------------------------------- | ------------------------------------------- |
| `organizationJsonLd`                           | Pre-built Organization schema               |
| `websiteJsonLd`                                | Pre-built WebSite schema with search action |
| `serviceJsonLd`                                | Pre-built Service schema for marketplace    |
| `createWebPageJsonLd(name, description, path)` | Creates WebPage schema                      |
| `createFAQPageJsonLd(faqs)`                    | Creates FAQPage schema from Q&A array       |
| `createBreadcrumbJsonLd(items)`                | Creates BreadcrumbList schema               |

---

### JSON-LD Structured Data

JSON-LD (JavaScript Object Notation for Linked Data) provides structured data that search engines use for rich snippets.

#### Organization Schema

Present on all pages via `+html.tsx`:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "UGC Marketplace",
  "alternateName": "UGP",
  "url": "https://ugp.gruckion.com",
  "logo": "https://ugp.gruckion.com/og.png",
  "description": "Connect brands with talented creators for authentic user-generated content.",
  "sameAs": ["https://twitter.com/gruckion"],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "url": "https://ugp.gruckion.com/contact"
  }
}
```

#### WebSite Schema with SearchAction

Enables sitelinks search box in Google results:

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "UGC Marketplace",
  "url": "https://ugp.gruckion.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://ugp.gruckion.com/browse/creators?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

#### FAQPage Schema

Used on FAQ pages for rich snippets:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does payment protection work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Payment is held in escrow until content is approved..."
      }
    }
  ]
}
```

#### BreadcrumbList Schema

Used on browse pages for navigation breadcrumbs:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://ugp.gruckion.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Browse",
      "item": "https://ugp.gruckion.com/browse"
    }
  ]
}
```

---

### Meta Tags

#### Base Meta Tags (in +html.tsx)

All pages inherit these base meta tags:

```html
<!-- Primary Meta Tags -->
<title>UGC Marketplace - Connect Brands with Creators</title>
<meta name="description" content="Find authentic user-generated content..." />
<meta name="keywords" content="UGC, user generated content, creators..." />
<meta name="author" content="UGC Marketplace" />

<!-- Robots -->
<meta name="robots" content="index, follow" />
<meta
  name="googlebot"
  content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
/>

<!-- Canonical URL -->
<link rel="canonical" href="https://ugp.gruckion.com/" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://ugp.gruckion.com/" />
<meta
  property="og:title"
  content="UGC Marketplace - Connect Brands with Creators"
/>
<meta
  property="og:description"
  content="Find authentic user-generated content..."
/>
<meta property="og:image" content="https://ugp.gruckion.com/og.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="UGC Marketplace" />
<meta property="og:locale" content="en_US" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="https://ugp.gruckion.com/" />
<meta
  name="twitter:title"
  content="UGC Marketplace - Connect Brands with Creators"
/>
<meta
  name="twitter:description"
  content="Find authentic user-generated content..."
/>
<meta name="twitter:image" content="https://ugp.gruckion.com/og.png" />
<meta name="twitter:creator" content="@gruckion" />
<meta name="twitter:site" content="@gruckion" />

<!-- Theme & PWA -->
<meta name="theme-color" content="#1DBF73" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-title" content="UGC Marketplace" />
```

#### Per-Page Meta Tags

Each page uses the SEO component to set unique:

- Title (appended with " | UGC Marketplace")
- Description (unique 150-160 character description)
- Canonical URL (prevents duplicate content)
- Page-specific keywords
- Page-specific JSON-LD schemas

---

## File Structure

```
app/apps/native/
├── app/
│   ├── +html.tsx                    # Root HTML with base SEO
│   └── (tabs)/
│       ├── index.web.tsx            # Homepage with SEO
│       ├── about.web.tsx            # About page with SEO
│       ├── pricing.web.tsx          # Pricing with FAQ schema
│       ├── how-it-works.web.tsx     # How it works with breadcrumbs
│       ├── blog.web.tsx             # Blog with WebPage schema
│       ├── guides.web.tsx           # Guides with WebPage schema
│       ├── contact.web.tsx          # Contact page
│       ├── help-center.web.tsx      # Help center
│       ├── brand-faq.web.tsx        # Brand FAQ with FAQPage schema
│       ├── creator-faq.web.tsx      # Creator FAQ with FAQPage schema
│       ├── success-stories.web.tsx  # Success stories
│       ├── community-events.web.tsx # Events page
│       ├── termsofservice.web.tsx   # Terms of service
│       ├── privacypolicy.web.tsx    # Privacy policy
│       └── browse/
│           ├── index.web.tsx        # Browse landing with breadcrumbs
│           ├── creators.web.tsx     # Creators listing
│           └── briefs.web.tsx       # Briefs listing
├── components/
│   └── web/
│       └── SEO.tsx                  # Reusable SEO component
└── public/
    ├── robots.txt                   # Search engine crawler rules
    ├── sitemap.xml                  # XML sitemap
    └── og.png                       # Open Graph image (1200x630)
```

---

## Usage Guide

### Adding SEO to a New Page

1. Import the SEO component:

```tsx
import { SEO, createWebPageJsonLd } from "@/components/web/SEO";
```

2. Create JSON-LD schema (optional but recommended):

```tsx
const pageJsonLd = createWebPageJsonLd(
  "Page Title",
  "Page description",
  "/page-path",
);
```

3. Add SEO component at the top of your return:

```tsx
return (
  <>
    <SEO
      title="Page Title"
      description="Unique description for this page (150-160 chars)"
      path="/page-path"
      keywords={["relevant", "keywords"]}
      jsonLd={pageJsonLd}
    />
    <View>{/* Page content */}</View>
  </>
);
```

4. Add the page to `sitemap.xml` with appropriate priority and changefreq.

### Updating the Sitemap

When adding new public pages:

1. Edit `app/apps/native/public/sitemap.xml`
2. Add a new `<url>` entry:

```xml
<url>
  <loc>https://ugp.gruckion.com/new-page</loc>
  <lastmod>2026-01-28</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.7</priority>
</url>
```

### Blocking Pages from Indexing

For pages that shouldn't be indexed (e.g., internal tools):

1. Add to `robots.txt`:

```txt
Disallow: /internal-page
```

2. Use `noIndex` prop in SEO component:

```tsx
<SEO title="Internal Page" description="..." noIndex={true} />
```

---

## Next Steps for Google Ranking

### Immediate Actions (Required)

#### 1. Google Search Console Setup

1. Go to https://search.google.com/search-console
2. Click "Add Property"
3. Enter: `https://ugp.gruckion.com`
4. Verify ownership via one of:
   - DNS TXT record (recommended)
   - HTML file upload
   - Google Analytics
5. After verification:
   - Go to "Sitemaps" in sidebar
   - Submit: `https://ugp.gruckion.com/sitemap.xml`
   - Monitor "Coverage" report for indexing issues

#### 2. Bing Webmaster Tools

1. Go to https://www.bing.com/webmasters
2. Add site: `https://ugp.gruckion.com`
3. Verify ownership
4. Submit sitemap

#### 3. Google Analytics 4 (GA4)

1. Create GA4 property at https://analytics.google.com
2. Get the measurement ID (G-XXXXXXXXXX)
3. Add tracking script to `+html.tsx`:

```tsx
{/* Google Analytics */}
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    `,
  }}
/>
```

### Medium-term SEO Actions

#### 4. Content Marketing Strategy

- **Blog posts**: 2-4 articles per month targeting:
  - "How to create UGC content"
  - "UGC vs influencer marketing"
  - "Best UGC examples 2026"
  - "How much do UGC creators charge"

- **Guides**: Create comprehensive guides:
  - "Complete Guide to UGC Marketing"
  - "How to Hire UGC Creators"
  - "UGC Pricing Guide"

- **Case studies**: Document success stories with metrics

#### 5. Schema Markup Enhancement

Add these schemas as features are built:

```typescript
// Product schema (for marketplace listings)
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "UGC Video Package",
  offers: {
    "@type": "Offer",
    price: "250",
    priceCurrency: "USD",
  },
};

// Review schema (for testimonials)
const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  reviewRating: {
    "@type": "Rating",
    ratingValue: "5",
  },
  author: {
    "@type": "Person",
    name: "Customer Name",
  },
};

// Event schema (for community events)
const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Creator Summit 2026",
  startDate: "2026-03-15",
  location: {
    "@type": "Place",
    name: "Online",
  },
};
```

#### 6. Performance Optimization

- **Lighthouse audits**: Aim for 90+ on all metrics
- **Image optimization**:
  - Use WebP format
  - Implement lazy loading
  - Serve responsive images
- **Caching**: Configure Cloudflare caching rules
- **Core Web Vitals**: Monitor LCP, FID, CLS in Search Console

#### 7. Social Media Optimization

Test sharing previews:

- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

### Advanced SEO (for ranking #1)

#### 8. Keyword Research & Targeting

Use tools like Ahrefs, SEMrush, or Ubersuggest to research:

| Target Keyword         | Search Volume | Difficulty | Priority  |
| ---------------------- | ------------- | ---------- | --------- |
| ugc creator            | High          | Medium     | Primary   |
| user generated content | High          | High       | Primary   |
| ugc marketplace        | Medium        | Low        | Primary   |
| hire ugc creators      | Medium        | Medium     | Secondary |
| ugc platform           | Medium        | Medium     | Secondary |
| ugc video content      | Low           | Low        | Long-tail |

#### 9. Link Building Strategy

- **Guest posts**: Write for marketing blogs (HubSpot, Buffer, Later)
- **PR mentions**: Get featured in creator economy publications
- **Partnerships**: Co-marketing with complementary tools
- **HARO**: Respond to journalist queries at helpareporter.com
- **Broken link building**: Find broken links to competitors, offer your content

#### 10. Technical SEO Monitoring

Weekly checks:

- [ ] Search Console: Coverage errors
- [ ] Search Console: Core Web Vitals
- [ ] Search Console: Mobile usability
- [ ] Crawl budget usage
- [ ] New backlinks

Monthly checks:

- [ ] Keyword rankings
- [ ] Competitor analysis
- [ ] Content gap analysis
- [ ] Site speed benchmarks

---

## Testing & Validation

### SEO Testing Tools

| Tool                      | Purpose                  | URL                                          |
| ------------------------- | ------------------------ | -------------------------------------------- |
| Google Rich Results Test  | Validate JSON-LD         | https://search.google.com/test/rich-results  |
| Schema.org Validator      | Validate structured data | https://validator.schema.org/                |
| Facebook Sharing Debugger | Test OG tags             | https://developers.facebook.com/tools/debug/ |
| Twitter Card Validator    | Test Twitter cards       | https://cards-dev.twitter.com/validator      |
| Google PageSpeed Insights | Performance audit        | https://pagespeed.web.dev/                   |
| Lighthouse                | Full SEO audit           | Chrome DevTools                              |

### Validation Commands

```bash
# Check robots.txt
curl https://ugp.gruckion.com/robots.txt

# Check sitemap.xml
curl https://ugp.gruckion.com/sitemap.xml

# Check meta tags (requires jq)
curl -s https://ugp.gruckion.com | grep -o '<meta[^>]*>'

# Check JSON-LD
curl -s https://ugp.gruckion.com | grep -o '<script type="application/ld+json">[^<]*</script>'
```

### Browser DevTools Check

1. Open Chrome DevTools (F12)
2. Go to "Elements" tab
3. Search for:
   - `<title>` tag
   - `<meta name="description">`
   - `<link rel="canonical">`
   - `<meta property="og:`
   - `<script type="application/ld+json">`

---

## Changelog

| Date       | Change                                                                                                          |
| ---------- | --------------------------------------------------------------------------------------------------------------- |
| 2026-01-28 | Initial SEO implementation with robots.txt, sitemap.xml, SEO component, JSON-LD schemas, and per-page meta tags |

---

## References

- [Expo Router Static Rendering](https://docs.expo.dev/router/web/static-rendering/)
- [expo-router/head Documentation](https://docs.expo.dev/router/reference/static-rendering/#meta-tags)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
