const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')

// Manual env loader
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

async function upsert(doc) {
  const id = doc._id
  try {
    const existing = await client.getDocument(id)
    if (existing) {
      const merged = { ...doc }
      if (existing.logo && !merged.logo) merged.logo = existing.logo
      if (existing.images && !merged.images) merged.images = existing.images
      await client.createOrReplace(merged)
    } else {
      await client.createOrReplace(doc)
    }
    console.log(`✅ Upserted: ${doc._type} → ${id}`)
  } catch (err) {
    console.error(`❌ Failed: ${doc._type} → ${id}: ${err.message}`)
  }
}

const heroSlides = [
  {
    _id: 'heroSlide-1',
    _type: 'heroSlide',
    title: 'Cathodic Protection Specialist',
    subtitle: 'Solusi perlindungan korosi profesional untuk infrastruktur minyak & gas, kelautan, dan industri strategis Indonesia.',
    tag: 'CATHODIC PROTECTION SPECIALIST',
    youtubeVideoId: 'qTexXG4VGNw',
    duration: 7000,
    order: 1,
  },
  {
    _id: 'heroSlide-2',
    _type: 'heroSlide',
    title: 'Survey, Inspection & Testing',
    subtitle: 'CIPS, DCVG, PCM, Soil Resistivity Survey, NDT, UT, dan LRUT — layanan inspeksi teknis komprehensif untuk keandalan aset Anda.',
    tag: 'SURVEY, INSPECTION & TESTING',
    youtubeVideoId: 'qTexXG4VGNw',
    duration: 7000,
    order: 2,
  },
  {
    _id: 'heroSlide-3',
    _type: 'heroSlide',
    title: 'Instalasi & Pemeliharaan Aset',
    subtitle: 'Instalasi sistem cathodic protection dan pemeliharaan aset berbahan logam secara profesional sesuai standar industri.',
    tag: 'INSTALASI & PEMELIHARAAN ASET',
    youtubeVideoId: 'qTexXG4VGNw',
    duration: 7000,
    order: 3,
  },
]

const about = {
  _id: 'about-singleton',
  _type: 'about',
  tagline: 'TENTANG PERUSAHAAN',
  title: 'Profesional Dalam Perlindungan, Andal Dalam Setiap Layanan',
  description:
    'Cathodic Akbar Dharma Karya merupakan perusahaan spesialis yang bergerak di bidang Cathodic Protection dan Corrosion Control, dengan layanan pendukung meliputi Survey, Inspection & Testing, Instalasi, serta Maintenance. Kami hadir untuk memberikan solusi profesional dalam menjaga integritas, keandalan, dan keberlangsungan operasional berbagai aset dan infrastruktur pada berbagai sektor industri.\n\nDengan dukungan sumber daya manusia yang kompeten dan kemampuan teknis yang mumpuni, Cathodic Akbar Dharma Karya berkomitmen untuk menjadi mitra kerja yang dapat diandalkan dalam mendukung kebutuhan pelanggan — mengedepankan kualitas pekerjaan, keselamatan kerja, ketepatan waktu, integritas, serta kepuasan pelanggan.',
  stats: [
    { _key: 's1', value: 50, suffix: '+', label: 'Proyek Selesai' },
    { _key: 's2', value: 15, suffix: '+', label: 'Klien Aktif' },
    { _key: 's3', value: 7,  suffix: '+', label: 'Tahun Pengalaman' },
  ],
  badges: [
    { _key: 'b1', name: 'NPWP',  description: 'Wajib Pajak Terdaftar' },
    { _key: 'b2', name: 'NIB',   description: 'Nomor Induk Berusaha' },
    { _key: 'b3', name: 'SPPKP', description: 'Pengusaha Kena Pajak' },
    { _key: 'b4', name: 'AHU',   description: 'Kemenkumham Terdaftar' },
  ],
  videos: [
    { _key: 'v1', title: 'Cathodic Protection Installation', location: 'Field Project, Indonesia', videoId: 'iGCH44aqfcE' },
    { _key: 'v2', title: 'Corrosion Control Survey',         location: 'Pipeline Site, Indonesia', videoId: 'MNg6fr2iKX0' },
  ],
}

const services = [
  {
    _id: 'service-1', _type: 'service', order: 1,
    title: 'Cathodic Protection System',
    description: 'Perancangan dan instalasi sistem cathodic protection menggunakan metode Sacrificial Anode (Mg, Zn, Al) maupun Impressed Current (ICCP) untuk melindungi struktur logam terpendam maupun yang terendam air laut.',
    icon: 'Shield',
  },
  {
    _id: 'service-2', _type: 'service', order: 2,
    title: 'Survey & Inspection',
    description: 'Layanan inspeksi komprehensif meliputi CIPS (Close Interval Potential Survey), DCVG, PCM, Soil Resistivity Survey untuk evaluasi efektivitas sistem proteksi katodik pada jaringan pipa dan infrastruktur.',
    icon: 'ScanLine',
  },
  {
    _id: 'service-3', _type: 'service', order: 3,
    title: 'NDT & Testing',
    description: 'Pengujian tidak merusak (Non-Destructive Testing) meliputi UT (Ultrasonic Testing) dan LRUT (Long Range Ultrasonic Testing) untuk deteksi korosi, cacat, dan penilaian integritas struktur logam.',
    icon: 'Microscope',
  },
  {
    _id: 'service-4', _type: 'service', order: 4,
    title: 'Under Water Work',
    description: 'Layanan pekerjaan bawah air meliputi inspeksi bawah air, pemasangan anode, pembersihan, dan perbaikan struktur bawah laut untuk fasilitas offshore, dermaga, dan infrastruktur kelautan.',
    icon: 'Waves',
  },
  {
    _id: 'service-5', _type: 'service', order: 5,
    title: 'Offshore Pipeline Survey',
    description: 'Survey dan inspeksi jalur pipa offshore termasuk penilaian kondisi coating, deteksi kebocoran, pengukuran potensial katodik, dan mapping jalur pipa bawah laut secara profesional.',
    icon: 'GitBranch',
  },
  {
    _id: 'service-6', _type: 'service', order: 6,
    title: 'Pipe Repair & Maintenance',
    description: 'Perbaikan dan pemeliharaan pipa, termasuk penggantian coating, pengisian cacat, penanganan korosi aktif, dan perawatan berkala sistem proteksi katodik untuk menjaga keandalan aset jangka panjang.',
    icon: 'Wrench',
  },
]

const portfolios = [
  {
    _id: 'portfolio-1',
    _type: 'portfolio',
    name: 'Survey CIPS & DCVG Pipeline Transmisi Gas 12"',
    category: 'pipeline',
    client: 'PT Perusahaan Gas Negara',
    location: 'Sumatera Selatan - Jawa Barat',
    year: 2025,
    description: 'Pemeriksaan integritas dan proteksi katodik pipa baja transmisi gas bumi sepanjang 45 km menggunakan metode Close Interval Potential Survey (CIPS) dan Direct Current Voltage Gradient (DCVG).',
  },
  {
    _id: 'portfolio-2',
    _type: 'portfolio',
    name: 'Instalasi ICCP & Anoda Korban Jetty Pelabuhan',
    category: 'marine',
    client: 'PT Pertamina (Persero)',
    location: 'Cilacap, Jawa Tengah',
    year: 2025,
    description: 'Pekerjaan rancang bangun, suplai material, instalasi, dan commissioning Impressed Current Cathodic Protection (ICCP) serta anoda korban aluminium pada tiang pancang baja dermaga.',
  },
  {
    _id: 'portfolio-3',
    _type: 'portfolio',
    name: 'Sistem Proteksi Katodik Internal Tangki BBM 5000 KL',
    category: 'tank',
    client: 'PT Pertamina Patra Niaga',
    location: 'Surabaya, Jawa Timur',
    year: 2026,
    description: 'Pemasangan anoda korban aluminium bersertifikasi untuk perlindungan karat bagian dalam (internal tank bottom) tangki penyimpanan BBM.',
  },
  {
    _id: 'portfolio-4',
    _type: 'portfolio',
    name: 'Proteksi Katodik Struktur Beton Jembatan Maritim',
    category: 'marine',
    client: 'Kementerian PUPR',
    location: 'Sulawesi Utara',
    year: 2024,
    description: 'Penerapan sistem proteksi katodik tipe anoda korban seng (zinc mesh) pada besi tulangan beton jembatan laut guna mencegah kerusakan akibat korosi klorida.',
  },
  {
    _id: 'portfolio-5',
    _type: 'portfolio',
    name: 'Audit Sistem Proteksi Katodik Kilang LNG',
    category: 'plant',
    client: 'PT Badak NGL',
    location: 'Bontang, Kalimantan Timur',
    year: 2026,
    description: 'Inspeksi, pengujian Soil Resistivity, pengukuran potensial proteksi katodik, dan penyusunan rekomendasi perbaikan sistem korosi area kilang pengolahan gas alam cair.',
  },
]

const clients = [
  { _id: 'client-1', _type: 'client', name: 'PT Pertamina (Persero)',    order: 1 },
  { _id: 'client-2', _type: 'client', name: 'PT Perusahaan Gas Negara',  order: 2 },
  { _id: 'client-3', _type: 'client', name: 'PT PLN (Persero)',           order: 3 },
  { _id: 'client-4', _type: 'client', name: 'PT Pupuk Indonesia',         order: 4 },
  { _id: 'client-5', _type: 'client', name: 'PT Wijaya Karya',            order: 5 },
  { _id: 'client-6', _type: 'client', name: 'PT Adhi Karya',              order: 6 },
  { _id: 'client-7', _type: 'client', name: 'PT Waskita Karya',           order: 7 },
  { _id: 'client-8', _type: 'client', name: 'PT Hutama Karya',            order: 8 },
  { _id: 'client-9', _type: 'client', name: 'PT Rekayasa Industri',       order: 9 },
  { _id: 'client-10', _type: 'client', name: 'PT Elnusa Tbk',             order: 10 },
]

const credentials = [
  {
    _id: 'cred-1', _type: 'credential', order: 1,
    label: 'NPWP',
    value: '1000 0000 0422 2085',
    description: 'Nomor Pokok Wajib Pajak — terdaftar dan aktif di Direktorat Jenderal Pajak RI.',
  },
  {
    _id: 'cred-2', _type: 'credential', order: 2,
    label: 'NIB',
    value: '1807250041376',
    description: 'Nomor Induk Berusaha — terdaftar di OSS (Online Single Submission) Kementerian Investasi.',
  },
  {
    _id: 'cred-3', _type: 'credential', order: 3,
    label: 'SPPKP',
    value: 'S-00355/SPPKP-CT/KPP.2305/2025',
    description: 'Surat Pengukuhan Pengusaha Kena Pajak — diterbitkan oleh KPP Pratama.',
  },
  {
    _id: 'cred-4', _type: 'credential', order: 4,
    label: 'Akta Pendirian',
    value: 'AHU-00597.AH.02.01/2018',
    description: 'Akta Pendirian Perusahaan yang telah disahkan oleh Kementerian Hukum dan HAM Republik Indonesia.',
  },
  {
    _id: 'cred-5', _type: 'credential', order: 5,
    label: 'SK Kemenkumham',
    value: 'AHU-0057791-AH.01.14/2025',
    description: 'Keputusan Menteri Hukum dan HAM tentang perubahan data perusahaan — 2025.',
  },
]

const contactInfo = {
  _id: 'contactInfo-singleton',
  _type: 'contactInfo',
  title: 'Mulai Proyek Anda Bersama Kami',
  phones: ['0813-9078-8045'],
  emails: ['office@akbardharmakarya.com'],
  address: 'Laguna Spring Hills B 03, Condrowangsan, Baturetno, Banguntapan, Bantul, DI Yogyakarta 55197',
  whatsappNumber: '6281390788045',
  socials: {
    instagram: 'https://www.instagram.com/akbardharmakarya',
  },
}

const footer = {
  _id: 'footer-singleton',
  _type: 'footer',
  copyright: '© 2026 Cathodic Akbar Dharma Karya. All rights reserved.',
  footerInfo: 'Cathodic Protection & Corrosion Control · Bantul, DI Yogyakarta',
  socials: {
    instagram: 'https://www.instagram.com/akbardharmakarya',
  },
}

async function main() {
  console.log('\n🚀 Starting Sanity CMS seeding...\n')
  console.log(`📡 Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
  console.log(`📦 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}\n`)

  console.log('📌 Hero Slides...')
  for (const slide of heroSlides) await upsert(slide)

  console.log('\n📌 About...')
  await upsert(about)

  console.log('\n📌 Services...')
  for (const svc of services) await upsert(svc)

  console.log('\n📌 Portfolios...')
  for (const p of portfolios) await upsert(p)

  console.log('\n📌 Clients...')
  for (const c of clients) await upsert(c)

  console.log('\n📌 Credentials...')
  for (const cred of credentials) await upsert(cred)

  console.log('\n📌 Contact Info...')
  await upsert(contactInfo)

  console.log('\n📌 Footer...')
  await upsert(footer)

  console.log('\n✅ Seeding complete! Semua konten berhasil dimasukkan ke Sanity CMS.')
  console.log('🌐 Cek hasilnya di: https://cathodic.akbardharmakarya.com/studio\n')
}

main().catch(console.error)
