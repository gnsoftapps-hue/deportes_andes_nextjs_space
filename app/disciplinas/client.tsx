'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const disciplines = [
  {
    name: 'Fútbol',
    slug: 'futbol',
    description: 'Nuestro programa de fútbol busca formar deportistas integrales, enseñando técnica, táctica y sobre todo valores como el trabajo en equipo, la perseverancia y el respeto por los compañeros y rivales.',
    image: '/images/futbol_equipo.jpg',
    categories: ['Sub-8', 'Sub-10', 'Sub-12', 'Sub-14'],
    schedule: 'Lunes y Viernes',
  },
  {
    name: 'Gimnasia Rítmica',
    slug: 'gimnasia-ritmica',
    description: 'La gimnasia rítmica combina movimiento, música y creatividad. Dos categorías (Iniciación y Formativa) entrenan en paralelo con profesoras dedicadas en el Gimnasio Municipal de San Pedro de la Paz.',
    image: '/images/gimnasia_equipo.jpg',
    categories: ['Iniciación', 'Formativa'],
    schedule: 'Lunes y Miércoles',
  },
  {
    name: 'Voleibol',
    slug: 'voleibol',
    description: 'El voleibol es un deporte dinámico que fomenta la agilidad, la comunicación y el compañerismo. Nuestra rama infantil cuenta con dos categorías, con entrenamientos en el Complejo Deportivo Serviu de San Pedro de la Paz.',
    image: '/images/voleibol_equipo.jpg',
    categories: ['Mini (principiante)', 'Infantil'],
    schedule: 'Martes y Miércoles',
  },
]

export function DisciplinasClient() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="pt-24">
      <section className="py-16 bg-gradient-to-br from-primary/5 to-sky-100/50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Nuestras Ramas</p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Disciplinas <span className="text-primary">Deportivas</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Tres disciplinas, un solo objetivo: formar deportistas con valores para toda la vida.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background" ref={ref}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-16">
          {(disciplines ?? []).map((d: any, i: number) => (
            <motion.div
              key={d?.slug ?? i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <div className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'md:[direction:rtl]' : ''}`}>
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-lg">
                  <Image src={d?.image ?? ''} alt={d?.name ?? ''} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className={i % 2 === 1 ? 'md:[direction:ltr]' : ''}>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-4">{d?.name ?? ''}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{d?.description ?? ''}</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm font-semibold mb-2">Categorías</p>
                      <ul className="space-y-1">
                        {(d?.categories ?? []).map((c: string, j: number) => (
                          <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Horarios</p>
                      <p className="text-sm text-muted-foreground">{d?.schedule ?? ''}</p>
                    </div>
                  </div>
                  <Link href={`/disciplinas/${d?.slug ?? ''}`}>
                    <Button>
                      Más Información <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
