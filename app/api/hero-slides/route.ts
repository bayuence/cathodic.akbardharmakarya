export const revalidate = 0
export const dynamic = 'force-dynamic'
import { sanityClient } from '@/lib/sanity.client'
import { heroSlidesQuery } from '@/lib/sanity.queries'

export async function GET() {
  try {
    const slides = await sanityClient.fetch(heroSlidesQuery)
    return Response.json(slides || [])
  } catch (error) {
    console.error(error); return Response.json([]);
  }
}
