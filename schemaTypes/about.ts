import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'Tentang Perusahaan',
  type: 'document',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline (Kecil di Atas)',
      type: 'string',
      initialValue: 'TENTANG PERUSAHAAN'
    }),
    defineField({
      name: 'title',
      title: 'Judul Utama',
      type: 'string',
      initialValue: 'Profesional Dalam Perlindungan, Andal Dalam Setiap Layanan'
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi',
      type: 'text',
      initialValue: 'CV Akbar Dharma Karya merupakan perusahaan yang bergerak di bidang Cathodic Protection dan Corrosion Control, dengan layanan pendukung meliputi Survey, Inspection & Testing, Instalasi, serta Maintenance. Kami hadir untuk memberikan solusi profesional dalam menjaga integritas, keandalan, dan keberlangsungan operasional berbagai aset dan infrastruktur pada berbagai sektor industri.'
    }),
    defineField({
      name: 'stats',
      title: 'Statistik (Angka)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'number', title: 'Nilai Angka' },
            { name: 'suffix', type: 'string', title: 'Akhiran (Misal: +)' },
            { name: 'label', type: 'string', title: 'Keterangan' }
          ]
        }
      ],
      initialValue: [
        { value: 50, suffix: '+', label: 'Proyek Selesai' },
        { value: 10, suffix: '+', label: 'Klien Aktif' },
        { value: 5, suffix: '+', label: 'Tahun Pengalaman' }
      ]
    }),
    defineField({
      name: 'badges',
      title: 'Sertifikasi / Legalitas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Nama Singkat' },
            { name: 'description', type: 'string', title: 'Keterangan' }
          ]
        }
      ],
      initialValue: [
        { name: 'NPWP', description: 'Wajib Pajak' },
        { name: 'NIB', description: 'Induk Berusaha' },
        { name: 'SPPKP', description: 'Pengusaha Kena Pajak' }
      ]
    }),
    defineField({
      name: 'videos',
      title: 'Video YouTube Shorts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Judul Video' },
            { name: 'location', type: 'string', title: 'Lokasi Proyek' },
            { name: 'videoId', type: 'string', title: 'YouTube Video ID' }
          ]
        }
      ],
      initialValue: [
        { title: 'Cathodic Protection Installation', location: 'Field Project', videoId: 'iGCH44aqfcE' },
        { title: 'Corrosion Control Survey', location: 'Pipeline Site', videoId: 'MNg6fr2iKX0' }
      ]
    })
  ]
})
