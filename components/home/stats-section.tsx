'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Users, Trophy, Calendar, Heart } from 'lucide-react'
import { CounterAnimation } from '@/components/counter-animation'

const stats = [
  { icon: Users, value: 150, suffix: '+', label: 'Familias en la Comunidad' },
  { icon: Trophy, value: 3, suffix: '', label: 'Disciplinas Deportivas' },
  { icon: Calendar, value: 1, suffix: '+', label: 'Año de Trayectoria' },
  { icon: Heart, value: 100, suffix: '%', label: 'Compromiso y Pasión' },
]

export function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section className="py-20 bg-[#1a3a5c] text-white" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Nuestro <span className="text-sky-300">Impacto</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Números que reflejan nuestro compromiso con la formación deportiva en Biobío.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {(stats ?? []).map((stat: any, i: number) => {
            const Icon = stat?.icon ?? Users
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm"
              >
                <Icon className="w-8 h-8 mx-auto mb-3 text-sky-300" />
                <div className="font-display text-3xl sm:text-4xl font-bold mb-1">
                  <CounterAnimation end={stat?.value ?? 0} suffix={stat?.suffix ?? ''} />
                </div>
                <p className="text-sm text-white/60">{stat?.label ?? ''}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
