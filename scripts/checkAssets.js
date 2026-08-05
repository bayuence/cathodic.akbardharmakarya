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

async function check() {
  const assets = await client.fetch(`*[_type == "sanity.imageAsset"]{ _id, originalFilename, url }`)
  console.log(`Found ${assets.length} image assets in Sanity:`)
  assets.forEach(a => console.log(`- ${a._id}: ${a.originalFilename || 'no filename'} (${a.url})`))

  const clients = await client.fetch(`*[_type == "client"]{ _id, name, logo }`)
  console.log('\nClients in Sanity:')
  clients.forEach(c => console.log(`- ${c._id} (${c.name}): logo=${JSON.stringify(c.logo)}`))
}

check().catch(console.error)
