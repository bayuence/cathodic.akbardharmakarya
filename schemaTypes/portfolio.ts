import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'portfolio',
  title: 'Portofolio Proyek',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Proyek',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Pipa Transmisi', value: 'pipeline' },
          { title: 'Struktur Maritim', value: 'marine' },
          { title: 'Refinery & Plant', value: 'plant' },
          { title: 'Tangki Penyimpanan', value: 'tank' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Klien',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Lokasi',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Tahun',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi',
      type: 'text',
    }),
    defineField({
      name: 'images',
      title: 'Gambar',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
  ],
})
