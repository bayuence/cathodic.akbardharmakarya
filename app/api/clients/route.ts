export const revalidate = 0
export const dynamic = 'force-dynamic'

import { sanityClient } from '@/lib/sanity.client'
import { clientsQuery } from '@/lib/sanity.queries'

export async function GET() {
  try {
    const clients = await sanityClient.fetch(clientsQuery)
    return Response.json(clients || [])
  } catch (error) {
    console.error(error); return Response.json([]);
  }
}
