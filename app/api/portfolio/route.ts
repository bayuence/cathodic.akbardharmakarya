export const revalidate = 0
export const dynamic = 'force-dynamic'
import { sanityClient } from '@/lib/sanity.client'
import { portfolioQuery } from '@/lib/sanity.queries'

export async function GET() {
  try {
    const portfolio = await sanityClient.fetch(portfolioQuery)
    return Response.json(portfolio || [])
  } catch (error) {
    console.error(error); return Response.json([]);
  }
}
