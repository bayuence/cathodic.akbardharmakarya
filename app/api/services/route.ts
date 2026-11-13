export const revalidate = 0
export const dynamic = 'force-dynamic'
import { sanityClient } from '@/lib/sanity.client'
import { servicesQuery } from '@/lib/sanity.queries'

export async function GET() {
  try {
    const rawServices: any[] = await sanityClient.fetch(servicesQuery)
    const cleaned = (rawServices || []).map((s) => {
      let desc = s.description || ''
      // Revisi: 'Perancangan' -> 'Perencanaan'
      desc = desc.replace(/^Perancangan dan instalasi/i, 'Perencanaan dan instalasi')
      // Revisi: Hapus 'pengisian cacat,'
      desc = desc.replace(/,\s*pengisian cacat/gi, '').replace(/pengisian cacat,\s*/gi, '')
      return {
        ...s,
        description: desc
      }
    })
    return Response.json(cleaned)
  } catch (error) {
    console.error(error); return Response.json([]);
  }
}
