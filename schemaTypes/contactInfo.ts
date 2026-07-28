import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactInfo',
  title: 'Informasi Kontak',
  type: 'document',
  initialValue: {
    title: 'Mulai Proyek Anda Bersama Kami',
    phones: ['0813-9078-8045'],
    emails: ['office@akbardharmakarya.com'],
    address: 'Laguna Spring Hills B 03, Condrowangsan, Baturetno, Banguntapan, Bantul, DI Yogyakarta',
    whatsappNumber: '6281390788045',
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
    }),
    defineField({
      name: 'phones',
      title: 'Nomor Telepon',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Format bebas (misal: 0813-9078-8045)',
    }),
    defineField({
      name: 'emails',
      title: 'Email',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'address',
      title: 'Alamat',
      type: 'text',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Nomor WhatsApp (Mulai dengan 62, Tanpa tanda +)',
      type: 'string',
      description: 'Contoh: 6281390788045',
    }),
    defineField({
      name: 'companyProfile',
      title: 'Download Company Profile (PDF)',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'socials',
      title: 'Media Sosial',
      type: 'object',
      fields: [
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
        { name: 'twitter', title: 'Twitter URL', type: 'url' },
      ],
    }),
  ],
})
