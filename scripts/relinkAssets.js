const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')

function loadEnv() {
  const envPath = path.join(process.cwd(), '.env.local')
  if (!fs.existsSync(envPath)) return
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
    if (key && !(key in process.env)) process.env[key] = val
  }
}
loadEnv()

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
})

async function relink() {
  console.log('🔄 Relinking client logos and portfolio images...')

  const assets = await client.fetch(`*[_type == "sanity.imageAsset"]{ _id, originalFilename }`)
  const clients = await client.fetch(`*[_type == "client"]{ _id, name }`)
  const portfolios = await client.fetch(`*[_type == "portfolio"]{ _id, name }`)

  // Mapping rules for client logos
  const logoMap = [
    { match: /PERTAMINA/i, clientId: 'client-1' },
    { match: /PGN/i, clientId: 'client-2' },
    { match: /PLN/i, clientId: 'client-3' },
    { match: /PUPUK/i, clientId: 'client-4' },
    { match: /WIJAYA/i, clientId: 'client-5' },
    { match: /ADHI/i, clientId: 'client-6' },
    { match: /WASKITA/i, clientId: 'client-7' },
    { match: /HUTAM/i, clientId: 'client-8' },
    { match: /REKAYASA/i, clientId: 'client-9' },
    { match: /ELNUSA/i, clientId: 'client-10' },
  ]

  for (const rule of logoMap) {
    const asset = assets.find(a => a.originalFilename && rule.match.test(a.originalFilename))
    if (asset) {
      await client.patch(rule.clientId)
        .set({
          logo: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id
            }
          }
        })
        .commit()
      console.log(`✅ Relinked logo for ${rule.clientId}: ${asset.originalFilename}`)
    }
  }

  // Portfolio image mapping
  const cipsAsset = assets.find(a => a.originalFilename && /cips/i.test(a.originalFilename))
  if (cipsAsset) {
    await client.patch('portfolio-1')
      .set({
        images: [{
          _key: 'img-1',
          _type: 'image',
          asset: { _type: 'reference', _ref: cipsAsset._id }
        }]
      })
      .commit()
    console.log(`✅ Relinked portfolio-1 image: ${cipsAsset.originalFilename}`)
  }

  const jettyAsset = assets.find(a => a.originalFilename && /Jetty/i.test(a.originalFilename))
  if (jettyAsset) {
    await client.patch('portfolio-2')
      .set({
        images: [{
          _key: 'img-2',
          _type: 'image',
          asset: { _type: 'reference', _ref: jettyAsset._id }
        }]
      })
      .commit()
    console.log(`✅ Relinked portfolio-2 image: ${jettyAsset.originalFilename}`)
  }

  console.log('\n🎉 Relinking finished!')
}

relink().catch(console.error)
