import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-sans',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` :
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://cathodic-akbardharmakarya.vercel.app'))

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Cathodic Akbar Dharma Karya — Cathodic Protection & Corrosion Control',
    template: '%s | Cathodic Akbar Dharma Karya',
  },
  description:
    'Cathodic Akbar Dharma Karya adalah spesialis profesional di bidang Cathodic Protection, Corrosion Control, Survey, Inspection & Testing, Instalasi, dan Maintenance. Mitra terpercaya untuk perlindungan aset dan infrastruktur berbagai sektor industri.',
  keywords: [
    'Cathodic Akbar Dharma Karya',
    'ADK Cathodic',
    'CV Akbar Dharma Karya',
    'Akbar Dharma Karya',
    'akbardharmakarya',
    'cathodic protection Indonesia',
    'corrosion control Indonesia',
    'perlindungan korosi',
    'cathodic protection specialist',
    'survey inspeksi pipeline',
    'impressed current cathodic protection',
    'sacrificial anode',
    'CIPS DCVG PCM survey',
    'offshore pipeline survey',
    'cathodic protection engineering',
    'corrosion inspection testing',
    'instalasi cathodic protection',
    'maintenance cathodic protection',
    'akbardharmakarya.com',
    'cathodic protection Yogyakarta',
    'corrosion control migas',
    'perlindungan infrastruktur logam',
  ],
  authors: [{ name: 'Cathodic Akbar Dharma Karya' }],
  creator: 'Cathodic Akbar Dharma Karya',
  publisher: 'Cathodic Akbar Dharma Karya',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'WtKorw8HaGA5-sokzd6o2nD0VUjWxeNU2yhDtecIZhg',
  },
  openGraph: {
    title: 'Cathodic Akbar Dharma Karya — Cathodic Protection & Corrosion Control',
    description:
      'Solusi profesional Cathodic Protection dan Corrosion Control untuk industri migas, maritim, dan infrastruktur Indonesia.',
    url: siteUrl,
    siteName: 'Cathodic Akbar Dharma Karya',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Cathodic Akbar Dharma Karya — Cathodic Protection & Corrosion Control Indonesia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cathodic Akbar Dharma Karya — Cathodic Protection & Corrosion Control',
    description:
      'Solusi profesional Cathodic Protection dan Corrosion Control untuk berbagai sektor industri Indonesia.',
    images: ['/og-image.png'],
  },
}

// ═══════════════════════════════════════════════════
// JSON-LD Structured Data — Membantu Google mengenali
// perusahaan ini dan menampilkan rich results
// ═══════════════════════════════════════════════════

// 1. Organization Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Cathodic Akbar Dharma Karya',
  alternateName: ['Cathodic Akbar Dharma Karya', 'ADK Cathodic', 'Akbar Dharma Karya'],
  url: 'https://cathodic.akbardharmakarya.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://cathodic.akbardharmakarya.com/logo.png',
    width: 512,
    height: 512,
  },
  description:
    'Cathodic Akbar Dharma Karya adalah spesialis profesional di bidang Cathodic Protection, Corrosion Control, Survey, Inspection & Testing, Instalasi, dan Maintenance untuk berbagai sektor industri.',
  foundingCountry: 'ID',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Laguna Spring Hills B 03, Condrowangsan, Baturetno',
    addressLocality: 'Banguntapan, Bantul',
    addressRegion: 'DI Yogyakarta',
    addressCountry: 'ID',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+62813-9078-8045',
    email: 'office@akbardharmakarya.com',
    contactType: 'customer service',
    availableLanguage: ['Indonesian', 'English'],
  },
  areaServed: {
    '@type': 'Country',
    name: 'Indonesia',
  },
  knowsAbout: [
    'Cathodic Protection',
    'Corrosion Control',
    'Pipeline Survey',
    'Inspection & Testing',
    'Offshore Structures',
    'Marine Cathodic Protection',
  ],
  sameAs: [
    'https://cathodic.akbardharmakarya.com',
    'https://akbardharmakarya.com',
  ],
  parentOrganization: {
    '@type': 'Organization',
    name: 'CV Akbar Dharma Karya',
    url: 'https://akbardharmakarya.com',
    description: 'CV Akbar Dharma Karya — Kontraktor General Indonesia. Induk perusahaan dari divisi Cathodic Protection & Corrosion Control.',
  },
}

// 2. WebSite Schema
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Cathodic Akbar Dharma Karya',
  url: 'https://cathodic.akbardharmakarya.com',
  description: 'Website resmi Cathodic Akbar Dharma Karya — Cathodic Protection & Corrosion Control Indonesia',
  inLanguage: 'id-ID',
  publisher: {
    '@type': 'Organization',
    name: 'Cathodic Akbar Dharma Karya',
    logo: {
      '@type': 'ImageObject',
      url: 'https://cathodic.akbardharmakarya.com/logo.png',
    },
  },
}

// 3. BreadcrumbList Schema — Membantu Google menampilkan breadcrumb di SERP
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Beranda',
      item: 'https://akbardharmakarya.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Cathodic Protection & Corrosion Control',
      item: 'https://cathodic.akbardharmakarya.com',
    },
  ],
}

// 4. LocalBusiness / Specialist Schema
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Cathodic Akbar Dharma Karya',
  image: 'https://cathodic.akbardharmakarya.com/logo.png',
  url: 'https://cathodic.akbardharmakarya.com',
  telephone: '+62813-9078-8045',
  email: 'office@akbardharmakarya.com',
  description:
    'Spesialis profesional di bidang Cathodic Protection, Corrosion Control, Survey, Inspection & Testing, Instalasi, dan Maintenance untuk berbagai sektor industri.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Laguna Spring Hills B 03, Condrowangsan, Baturetno',
    addressLocality: 'Banguntapan, Bantul',
    addressRegion: 'DI Yogyakarta',
    addressCountry: 'ID',
  },
  openingHours: 'Mo-Fr 08:00-17:00',
  areaServed: 'Indonesia',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Layanan Cathodic Akbar Dharma Karya',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Cathodic Protection System',
          description: 'Sacrificial Anode & Impressed Current Cathodic Protection',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Corrosion Control',
          description: 'Pengendalian korosi pada aset dan infrastruktur logam',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Survey & Inspection',
          description: 'CIPS, DCVG, PCM, Soil Resistivity Survey, NDT, UT, LRUT',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Offshore & Underwater Work',
          description: 'Offshore pipeline survey dan service under water work',
        },
      },
    ],
  },
}

// 5. SiteNavigationElement Schema — Mendorong Google menampilkan Rich Sitelinks (seperti tampilan Pertamina)
const siteNavigationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SiteNavigationElement',
      position: 1,
      name: 'Layanan Cathodic Protection',
      description: 'Layanan instalasi Sacrificial Anode & Impressed Current Cathodic Protection (ICCP)',
      url: 'https://cathodic.akbardharmakarya.com/#services',
    },
    {
      '@type': 'SiteNavigationElement',
      position: 2,
      name: 'Tentang Akbar Dharma Karya',
      description: 'Profil spesialis Cathodic Protection & Corrosion Control Indonesia',
      url: 'https://cathodic.akbardharmakarya.com/#about',
    },
    {
      '@type': 'SiteNavigationElement',
      position: 3,
      name: 'Kontak & Konsultasi',
      description: 'Hubungi tim ahli Akbar Dharma Karya',
      url: 'https://cathodic.akbardharmakarya.com/#contact',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" data-theme="light" className={`scroll-smooth snap-y snap-mandatory ${plusJakarta.variable}`} suppressHydrationWarning>
      <body className={`${plusJakarta.className} font-sans antialiased theme-bg-primary`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {/* ✅ JSON-LD Structured Data untuk Google Rich Results & AI Discovery */}
        {/* Strategy "beforeInteractive" agar Googlebot membaca schema lebih awal */}
        <Script
          id="schema-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="schema-breadcrumb"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <Script
          id="schema-localbusiness"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Script
          id="schema-sitenavigation"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
        />
      </body>
    </html>
  )
}
