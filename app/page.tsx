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

export const metadata: Metadata = {
  title: 'CV Akbar Dharma Karya — Cathodic Protection & Corrosion Control Indonesia',
  description:
    'CV Akbar Dharma Karya adalah perusahaan profesional di bidang Cathodic Protection, Corrosion Control, Survey, Inspection & Testing, Instalasi, dan Maintenance. Mitra terpercaya untuk perlindungan aset dan infrastruktur industri.',
  alternates: {
    canonical: 'https://cathodic.akbardharmakarya.com',
  },
  openGraph: {
    title: 'CV Akbar Dharma Karya — Cathodic Protection & Corrosion Control',
    description:
      'Solusi profesional Cathodic Protection dan Corrosion Control untuk industri migas, maritim, dan infrastruktur Indonesia.',
    url: 'https://cathodic.akbardharmakarya.com',
    siteName: 'CV Akbar Dharma Karya',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/api/og?title=CV+Akbar+Dharma+Karya&desc=Cathodic+Protection+%26+Corrosion+Control+Specialist+Indonesia',
        width: 1200,
        height: 630,
        alt: 'CV Akbar Dharma Karya — Cathodic Protection & Corrosion Control Indonesia',
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
        <TrustBar />
        <About />
        <Services />
        <Portfolio />
        <ClientsGrid />
        <Contact />
        <Footer />
      </main>
      <FloatingElements />
    </>
  )
}
