export const revalidate = 0
export const dynamic = 'force-dynamic'
import { sanityClient } from '@/lib/sanity.client'
import { contactInfoQuery } from '@/lib/sanity.queries'

export async function GET() {
  try {
    const contactInfo = await sanityClient.fetch(contactInfoQuery)
    const result = contactInfo ? {
      ...contactInfo,
      companyProfileUrl: contactInfo.companyProfileUrl || '/final-compro-cathodic-adk.pdf'
    } : {
      companyProfileUrl: '/final-compro-cathodic-adk.pdf'
    }
    return Response.json(result)
  } catch (error) {
    return Response.json({
      companyProfileUrl: '/final-compro-cathodic-adk.pdf'
    })
  }
}
