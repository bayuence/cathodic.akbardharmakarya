import { sanityClient } from './sanity.client'

export interface AboutData {
  tagline: string
  title: string
  description: string
  stats: {
    value: number
    suffix: string
    label: string
  }[]
  badges: {
    name: string
    description: string
  }[]
  videos: {
    title: string
    location: string
    videoId: string
  }[]
}

export async function fetchAbout(): Promise<AboutData | null> {
  const query = `*[_type == "about" && !(_id in path("drafts.**"))][0] {
    tagline,
    title,
    description,
    stats,
    badges,
    videos
  }`
  
  try {
    const data: AboutData | null = await sanityClient.fetch(query)
    if (!data) return null

    // Terapkan revisi klien secara konsisten:
    const cleanTitle = (data.title && data.title.includes('Profesional Dalam Perlindungan'))
      ? 'Profesional, Terpercaya, dan Bertanggung Jawab'
      : (data.title || 'Profesional, Terpercaya, dan Bertanggung Jawab')

    const cleanDescription = (data.description || '')
      .replace(/Cathodic\s+Akbar\s+Dharma\s+Karya/gi, 'Akbar Dharma Karya')

    // Video schematic teknis pemasangan & commissioning CP format potret (9:16 Shorts) tanpa nama PT lain
    const schematicVideos = [
      {
        title: 'Cathodic Protection Installation Schematic',
        location: 'Schematic Animation',
        videoId: 'wn9HQV25b84'
      },
      {
        title: 'Galvanic & Impressed Current CP System',
        location: 'Technical Principle',
        videoId: '4hBorIXTfWA'
      }
    ]

    return {
      ...data,
      title: cleanTitle,
      description: cleanDescription,
      stats: [], // Dihapus sesuai arahan coretan revisi client
      videos: schematicVideos
    }
  } catch (error) {
    console.error("Error fetching about data:", error)
    return null
  }
}
