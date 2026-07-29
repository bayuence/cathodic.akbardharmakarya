'use client'

import { useEffect, useState } from 'react'
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

/** Inisial 1–2 karakter dari nama perusahaan */
function getInitials(name: string): string {
  const words = name.replace(/^(PT|CV|UD|tbk|Persero)/gi, '').trim().split(/\s+/)
  return words.slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join('')
}

/** Warna bg unik per klien */
const BADGE_COLORS = [
  '#1a4d8f','#b71c1c','#1b5e20','#4a148c','#e65100',
  '#006064','#880e4f','#0d47a1','#33691e','#bf360c',
]

export default function TrustBar() {
  const [clients, setClients] = useState<Client[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await fetchClients()
        setClients(data && data.length > 0 ? data : defaultClients)
      } catch {
        setClients(defaultClients)
      } finally {
        setIsLoaded(true)
      }
    }
    loadClients()
  }, [])

  if (!isLoaded || clients.length === 0) return null

  const minSlots = 12
  const repeatCount = Math.max(2, Math.ceil(minSlots / clients.length))
  const trackItems: Client[] = Array.from({ length: repeatCount }, () => clients).flat()
  const loopItems = [...trackItems, ...trackItems]
  const animDuration = Math.max(40, clients.length * 6)

  return (
    <section
      className="section-base relative w-full py-20 border-y theme-border-subtle overflow-hidden snap-center snap-always"
      style={{ background: 'var(--bg-secondary, #0f172a)' }}
    >
      <style>{`
        @keyframes trust-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .trust-track {
          display: flex;
          align-items: center;
          gap: clamp(1.5rem, 3vw, 3rem);
          width: max-content;
          animation: trust-scroll ${animDuration}s linear infinite;
          will-change: transform;
        }
        .trust-track:hover { animation-play-state: paused; }
        .trust-logo-card {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(0.6rem, 1.5vw, 1rem) clamp(1.2rem, 2.5vw, 2.2rem);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 14px;
          min-width: 120px;
          min-height: 70px;
          transition: background .35s ease, border-color .35s ease, transform .35s ease, box-shadow .35s ease;
          cursor: default;
        }
        .trust-logo-card:hover {
          background: rgba(255,255,255,0.14);
          border-color: rgba(255,255,255,0.30);
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 8px 30px rgba(0,0,0,0.35);
        }
        .trust-logo-img {
          height: clamp(38px, 5vw, 56px);
          width: auto;
          max-width: 140px;
          object-fit: contain;
          filter: brightness(0) invert(1);
          opacity: 0.82;
          transition: opacity .35s ease;
          display: block;
        }
        .trust-logo-card:hover .trust-logo-img { opacity: 1; }
        .trust-initials-badge {
          width: 54px;
          height: 54px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: 0.04em;
        }
        .trust-fade-left {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: clamp(60px, 8vw, 120px); z-index: 10;
          pointer-events: none;
          background: linear-gradient(to right, var(--bg-secondary, #0f172a) 0%, transparent 100%);
        }
        .trust-fade-right {
          position: absolute; right: 0; top: 0; bottom: 0;
          width: clamp(60px, 8vw, 120px); z-index: 10;
          pointer-events: none;
          background: linear-gradient(to left, var(--bg-secondary, #0f172a) 0%, transparent 100%);
        }
      `}</style>

      {/* Label */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-4 rounded-full" style={{ background: 'var(--gold, #c9a84c)' }} />
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase" style={{ color: 'var(--gold, #c9a84c)' }}>
            DIPERCAYA OLEH
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="trust-fade-left" />
        <div className="trust-fade-right" />
        <div className="overflow-hidden py-2">
          <div className="trust-track">
            {loopItems.map((client, i) => {
              const logoSrc = client.logo?.asset?.url ?? client.logoUrl
              const badgeColor = BADGE_COLORS[(i / 2 | 0) % BADGE_COLORS.length]
              return (
                <div key={i} className="trust-logo-card">
                  {logoSrc ? (
                    <img
                      src={logoSrc}
                      alt={client.name}
                      className="trust-logo-img"
                      draggable={false}
                      onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement
                        img.style.display = 'none'
                        const badge = document.createElement('div')
                        badge.className = 'trust-initials-badge'
                        badge.style.background = badgeColor
                        badge.textContent = getInitials(client.name)
                        img.parentNode?.appendChild(badge)
                      }}
                    />
                  ) : (
                    <div className="trust-initials-badge" style={{ background: badgeColor }}>
                      {getInitials(client.name)}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
