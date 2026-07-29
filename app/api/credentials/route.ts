export const revalidate = 0
export const dynamic = 'force-dynamic'
import { sanityClient } from '@/lib/sanity.client'
import { credentialsQuery } from '@/lib/sanity.queries'

export async function GET() {
  try {
    const credentials = await sanityClient.fetch(credentialsQuery)
    return Response.json(credentials || [])
  } catch (error) {
    console.error(error); return Response.json([]);
  }
}
