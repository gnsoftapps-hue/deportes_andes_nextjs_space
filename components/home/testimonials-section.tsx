'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Quote, Star } from 'lucide-react'
import { Card } from '@/components/ui/card'

const testimonials = [
  {
    name: 'María José R.',
    role: 'Apoderada - Fútbol',
    text: 'Desde que mi hijo entró al club, su confianza y disciplina han crecido muchísimo. Los entrenadores son increíbles y el ambiente es muy familiar.',
  },
  {
    name: 'Carlos P.',
    role: 'Apoderado - Gimnasia Rítmica',
    text: 'Mi hija encontró su pasión en la gimnasia rítmica. El club le ha dado herramientas no solo deportivas, sino para la vida.',
  },
  {
    name: 'Andrea L.',
    role: 'Apoderada - Voleibol',
    text: 'Excelente organización y compromiso con los niños. El club va mucho más allá del deporte, crea comunidad.',
  },
]

export function TestimonialsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-20 bg-muted/30" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Testimonios</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Lo Que Dicen Nuestras <span className="text-primary">Familias</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(testimonials ?? []).map((t: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300 border-0 bg-card">
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">
                  “{t?.text ?? ''}”
                </p>
                <div>
                  <p className="font-semibold text-sm">{t?.name ?? ''}</p>
                  <p className="text-xs text-muted-foreground">{t?.role ?? ''}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
