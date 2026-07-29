'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'

const disciplines = [
  {
    name: 'Fútbol',
    slug: 'futbol',
    description: 'Formación integral a través del deporte más popular del mundo. Trabajo en equipo, disciplina y diversión.',
    image: '/images/futbol_equipo.jpg',
    color: 'from-green-500/20 to-green-600/5',
  },
  {
    name: 'Gimnasia Rítmica',
    slug: 'gimnasia-ritmica',
    description: 'Gracia, flexibilidad y expresión artística. Desarrollo de coordinación y confianza en cada movimiento.',
    image: '/images/gimnasia_equipo.jpg',
    color: 'from-pink-500/20 to-pink-600/5',
  },
  {
    name: 'Voleibol',
    slug: 'voleibol',
    description: 'Deporte dinámico que fomenta el compañerismo, la agilidad y la comunicación. Entrenamientos en el Complejo Deportivo Serviu, San Pedro de la Paz.',
    image: '/images/voleibol_equipo.jpg',
    color: 'from-orange-500/20 to-orange-600/5',
  },
]

export function DisciplinesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-20 bg-background" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Nuestras Ramas Deportivas</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">Tres <span className="text-primary">Disciplinas</span>, Un Solo Espíritu</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cada rama deportiva ofrece una experiencia única de crecimiento personal y deportivo para niños y jóvenes.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(disciplines ?? []).map((d: any, i: number) => (
            <motion.div
              key={d?.slug ?? i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Link href={`/disciplinas/${d?.slug ?? ''}`}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-card">
                  <div className={`relative aspect-[4/3] bg-gradient-to-br ${d?.color ?? ''}`}>
                    <Image
                      src={d?.image ?? ''}
                      alt={d?.name ?? 'Disciplina deportiva'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="font-display text-xl font-bold text-white">{d?.name ?? ''}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{d?.description ?? ''}</p>
                    <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Ver más <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
