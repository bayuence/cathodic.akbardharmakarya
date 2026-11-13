import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import TrustBar from '@/components/trust-bar'
import About from '@/components/about'
import Services from '@/components/services'
import Portfolio from '@/components/portfolio'
import ClientsGrid from '@/components/clients-grid'
import Contact from '@/components/contact'
import Footer from '@/components/footer'
import FloatingElements from '@/components/floating-elements'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` :
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://cathodic-akbardharmakarya.vercel.app'))

export const metadata: Metadata = {
  title: 'Cathodic Akbar Dharma Karya — Cathodic Protection & Corrosion Control Indonesia',
  description:
    'Cathodic Akbar Dharma Karya adalah spesialis profesional di bidang Cathodic Protection, Corrosion Control, Survey, Inspection & Testing, Instalasi, dan Maintenance. Mitra terpercaya untuk perlindungan aset dan infrastruktur industri.',
  alternates: {
    canonical: siteUrl,
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
        url: '/og-banner.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Cathodic Akbar Dharma Karya — Cathodic Protection & Corrosion Control Indonesia',
      },
    ],
  },
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* TrustBar dinonaktifkan sementara sesuai arahan client sampai ada kerjasama resmi */}
        {/* <TrustBar /> */}
        <About />
        <Services />
        {/* Portofolio dan Klien (grid) dinonaktifkan sementara sesuai arahan client */}
        {/* <Portfolio /> */}
        {/* <ClientsGrid /> */}
        <Contact />
        <Footer />
      </main>
      <FloatingElements />
    </>
  )
}
