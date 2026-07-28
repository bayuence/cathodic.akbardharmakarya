import { MetadataRoute } from 'next'

// Base URL untuk semua URL di sitemap
const BASE_URL = 'https://cathodic.akbardharmakarya.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    // ─── Halaman Utama (Paling Penting) ────────────────────────
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },

    // ─── Seksi About ────────────────────────────────────────────
    {
      url: `${BASE_URL}/#about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // ─── Seksi Services (Layanan — Penting untuk Lead) ──────────
    {
      url: `${BASE_URL}/#services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },

    // ─── Seksi Portfolio (Update Sering) ────────────────────────
    {
      url: `${BASE_URL}/#portfolio`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // ─── Seksi Clients ──────────────────────────────────────────
    {
      url: `${BASE_URL}/#clients`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // ─── Seksi Contact ──────────────────────────────────────────
    {
      url: `${BASE_URL}/#contact`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.8,
    },

    // ─── File Statis (AI & SEO Discovery) ───────────────────────
    {
      url: `${BASE_URL}/llms.txt`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}
