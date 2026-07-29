'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dumbbell, Mountain, Users, ArrowRight, Sun, Zap } from 'lucide-react'

const activities = [
  {
    title: 'Padel',
    description: 'Una actividad recreativa que ha conquistado a nuestras familias. Sesiones de padel para todos los niveles, desde principiantes hasta avanzados. ¡Una forma divertida de mantenerse activo!',
    image: '/images/padel.jpg',
    icon: Zap,
    features: ['Clases para adultos y jóvenes', 'Equipamiento disponible', 'Torneos familiares', 'Todos los niveles'],
  },
  {
    title: 'Actividades al Aire Libre',
    description: 'Organizamos salidas y actividades outdoor que conectan a las familias con la naturaleza. Senderismo, juegos deportivos, caminatas y más en los hermosos paisajes de la Región del Biobío.',
    image: '/images/actividades_aire_libre.jpg',
    icon: Mountain,
    features: ['Senderismo familiar', 'Juegos al aire libre', 'Excursiones a la naturaleza', 'Integración comunitaria'],
  },
  {
    title: 'Eventos Comunitarios',
    description: 'Celebramos juntos con eventos deportivos, días de la familia, torneos inter-ramas y actividades que fortalecen nuestra comunidad.',
    image: '/images/comunidad_deportiva.jpg',
    icon: Users,
    features: ['Días de la familia', 'Torneos inter-ramas', 'Celebraciones especiales', 'Convivencias deportivas'],
  },
]

export function ActividadesClient() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="pt-24">
      <section className="py-16 bg-gradient-to-br from-primary/5 to-sky-100/50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Más que Deporte</p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Actividades <span className="text-primary">Recreativas</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Además de nuestras ramas deportivas, ofrecemos actividades que enriquecen la vida comunitaria.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background" ref={ref}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
          {(activities ?? []).map((a: any, i: number) => {
            const Icon = a?.icon ?? Sun
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Card className="overflow-hidden border-0 bg-card shadow-md hover:shadow-lg transition-shadow">
                  <div className={`grid md:grid-cols-2 ${i % 2 === 1 ? 'md:[direction:rtl]' : ''}`}>
                    <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[300px]">
                      <Image src={a?.image ?? ''} alt={a?.title ?? ''} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                    <div className={`p-8 flex flex-col justify-center ${i % 2 === 1 ? 'md:[direction:ltr]' : ''}`}>
                      <Icon className="w-8 h-8 text-primary mb-3" />
                      <h2 className="font-display text-2xl font-bold tracking-tight mb-3">{a?.title ?? ''}</h2>
                      <p className="text-muted-foreground leading-relaxed mb-6">{a?.description ?? ''}</p>
                      <ul className="grid grid-cols-2 gap-2 mb-6">
                        {(a?.features ?? []).map((f: string, j: number) => (
                          <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full" /> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            ¿Quieres Participar?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Contáctanos para conocer más sobre nuestras actividades y cómo sumarte.
          </p>
          <Link href="/contacto">
            <Button size="lg">
              Contáctanos <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
