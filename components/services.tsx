'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchServices, Service } from '@/lib/fetchServices'
import { getLucideIcon } from '@/lib/getLucideIcon'

const defaultServices: Service[] = [
  {
    _id: 'service-1',
    title: 'Cathodic Protection System',
    description: 'Penyediaan turn-key project untuk sistem proteksi katodik baik metode Sacrificial Anode (Anoda Korban) maupun Impressed Current Cathodic Protection (ICCP) pada pipeline, jetty, offshore platform, tangki, dan struktur beton.',
    icon: 'Shield',
    order: 1
  },
  {
    _id: 'service-2',
    title: 'Indirect & Direct Assessment Survey',
    description: 'Survey dan inspeksi korosi pada pipa bawah tanah dengan metode Pearson Survey, Close Interval Potential Survey (CIPS), Direct Current Voltage Gradient (DCVG), Pipeline Current Mapping (PCM), serta Soil Resistivity Survey.',
    icon: 'Activity',
    order: 2
  },
  {
    _id: 'service-3',
    title: 'Underwater & Marine Work Services',
    description: 'Inspeksi, pengujian, instalasi anoda korban, dan pemeliharaan struktur bawah air dan maritim yang melibatkan tim penyelam profesional dan survey pipeline lepas pantai.',
    icon: 'Anchor',
    order: 3
  },
  {
    _id: 'service-4',
    title: 'Pipeline Rehabilitation & Repair',
    description: 'Layanan rehabilitasi coating pipa, perbaikan mekanis pipa yang terkorosi, wrapping, dan solusi restorasi integritas pipa transmisi migas maupun air.',
    icon: 'Wrench',
    order: 4
  },
  {
    _id: 'service-5',
    title: 'Splash Zone Protection System',
    description: 'Sistem perlindungan area pasang surut (splash zone) menggunakan HDPE outer cover dikombinasikan dengan STAC wrap/tape untuk mencegah korosi ekstrem akibat oksigen dan air laut.',
    icon: 'Waves',
    order: 5
  },
  {
    _id: 'service-6',
    title: 'Material Supply & Manufacturing',
    description: 'Penyediaan dan pabrikasi material cathodic protection berkualitas tinggi termasuk anoda magnesium, anoda zinc, anoda aluminium, silicon iron anodes, kabel CP, transformer rectifier, dan insulating joints.',
    icon: 'Layers',
    order: 6
  }
]

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices()
        if (data && data.length > 0) {
          setServices(data)
        } else {
          setServices(defaultServices)
        }
      } catch (error) {
        setServices(defaultServices)
      } finally {
        setIsLoading(false)
      }
    }
    loadServices()
  }, [])
  return (
    <section id="services" className="section-base relative w-full theme-bg-primary py-24 md:py-36 px-4 snap-start">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--divider)] to-transparent" />
      <div className="absolute top-[20%] right-0 w-[400px] h-[400px] bg-[var(--accent)]/[0.03] rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-16 text-center">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase theme-text-accent mb-4">LAYANAN KAMI</p>
          <h2 className="text-4xl md:text-5xl font-bold theme-text-heading mb-5">
            Solusi Konstruksi <span className="gradient-text">Lengkap</span>
          </h2>
          <p className="theme-text-body max-w-2xl mx-auto text-base md:text-lg">
            Dari perencanaan hingga eksekusi, kami menyediakan rangkaian layanan komprehensif untuk setiap kebutuhan proyek
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = getLucideIcon(service.icon)
            return (
              <motion.div key={service._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true, margin: '-50px' }}
                className="theme-bg-card border theme-border rounded-2xl p-7 group cursor-pointer hover:border-[var(--accent)] transition-all duration-300 card-hover relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/0 to-[var(--accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 mb-5">
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center group-hover:bg-[var(--accent)]/20 transition-colors duration-300">
                    <Icon className="w-5 h-5 theme-accent" strokeWidth={1.5} />
                  </motion.div>
                </div>
                <h3 className="text-lg font-bold theme-text-heading mb-3 group-hover:theme-accent transition-colors duration-300 relative z-10">{service.title}</h3>
                <p className="theme-text-body text-sm leading-relaxed relative z-10">{service.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
