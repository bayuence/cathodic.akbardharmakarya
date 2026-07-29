'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchClients, Client } from '@/lib/fetchClients'

const defaultClients: Client[] = [
  { _id: 'c1',  name: 'PT Pertamina (Persero)',      order: 1,  logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Pertamina_Logo.svg/240px-Pertamina_Logo.svg.png' },
  { _id: 'c2',  name: 'PT Perusahaan Gas Negara',    order: 2,  logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Perusahaan_Gas_Negara_logo.svg/240px-Perusahaan_Gas_Negara_logo.svg.png' },
  { _id: 'c3',  name: 'PT PLN (Persero)',             order: 3,  logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/PT_PLN_%28Persero%29_logo.svg/240px-PT_PLN_%28Persero%29_logo.svg.png' },
  { _id: 'c4',  name: 'PT Pupuk Indonesia',           order: 4,  logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Logo_Pupuk_Indonesia.svg/240px-Logo_Pupuk_Indonesia.svg.png' },
  { _id: 'c5',  name: 'PT Wijaya Karya',              order: 5,  logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Wika-logo.svg/240px-Wika-logo.svg.png' },
  { _id: 'c6',  name: 'PT Adhi Karya',                order: 6,  logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Adhi_Karya_logo.svg/240px-Adhi_Karya_logo.svg.png' },
  { _id: 'c7',  name: 'PT Waskita Karya',             order: 7,  logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Waskita_karya_logo.svg/240px-Waskita_karya_logo.svg.png' },
  { _id: 'c8',  name: 'PT Hutama Karya',              order: 8,  logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Hutama_Karya_logo.svg/240px-Hutama_Karya_logo.svg.png' },
  { _id: 'c9',  name: 'PT Rekayasa Industri',         order: 9,  logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Rekind-logo.png' },
  { _id: 'c10', name: 'PT Elnusa Tbk',                order: 10, logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Elnusa.svg/240px-Elnusa.svg.png' },
]

const BADGE_COLORS = [
  '#1a4d8f','#b71c1c','#1b5e20','#4a148c','#e65100',
  '#006064','#880e4f','#0d47a1','#33691e','#bf360c',
]

function getInitials(name: string): string {
  const words = name.replace(/^(PT|CV|UD|tbk|Persero)/gi, '').trim().split(/\s+/)
  return words.slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join('')
}

export default function ClientsGrid() {
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await fetchClients()
        setClients(data && data.length > 0 ? data : defaultClients)
      } catch {
        setClients(defaultClients)
      } finally {
        setIsLoading(false)
      }
    }
    loadClients()
  }, [])

  return (
    <section id="clients" className="section-base relative w-full theme-bg-primary py-24 md:py-36 px-4 snap-start">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--divider)] to-transparent" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase theme-text-accent mb-4">KLIEN KAMI</p>
          <h2 className="text-4xl md:text-5xl font-bold theme-text-heading mb-5">Dipercaya Oleh Perusahaan Terkemuka</h2>
          <p className="theme-text-body max-w-2xl mx-auto">Perusahaan dan institusi tier-1 Indonesia telah mempercayakan proyek-proyek strategis mereka kepada kami</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {clients.map((client, i) => {
            const logoSrc = client.logo?.asset?.url ?? client.logoUrl
            const badgeColor = BADGE_COLORS[i % BADGE_COLORS.length]
            return (
              <motion.div
                key={client._id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                viewport={{ once: true, margin: '-30px' }}
                className="theme-bg-card border theme-border rounded-2xl p-5 flex flex-col items-center justify-center min-h-[130px] cursor-default group hover:border-[var(--accent)] hover:shadow-lg transition-all duration-300 gap-3"
              >
                {logoSrc ? (
                  <img
                    src={logoSrc}
                    alt={client.name}
                    className="max-w-full max-h-[64px] w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement
                      img.style.display = 'none'
                      const badge = img.parentElement?.querySelector('.initials-badge') as HTMLElement
                      if (badge) badge.style.display = 'flex'
                    }}
                  />
                ) : null}
                <div
                  className="initials-badge w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-base"
                  style={{ background: badgeColor, display: logoSrc ? 'none' : 'flex' }}
                >
                  {getInitials(client.name)}
                </div>
                <p className="theme-text-muted font-semibold text-center text-[10px] tracking-wider leading-tight">
                  {client.name}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }} className="mt-12">
          <p className="theme-text-muted text-sm text-center">Dan banyak klien korporat lainnya di seluruh Indonesia — dari BUMN hingga swasta</p>
        </motion.div>
      </div>
    </section>
  )
}
