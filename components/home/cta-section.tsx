'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/button'
import { ArrowRight, UserPlus } from 'lucide-react'

export function CtaSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-sky-600 text-white" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <UserPlus className="w-12 h-12 mx-auto mb-6 text-white/80" />
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            ¿Listo para Unirte a Nuestra Comunidad?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8 text-lg">
            Inscribe a tu hijo o hija hoy y sé parte de la familia Deportes Andes.
            ¡El primer paso hacia una vida más activa y saludable!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inscripciones">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-base font-semibold shadow-xl">
                Inscribirse Ahora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contacto">
              <Button size="lg" className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 px-8 py-6 text-base">
                Contactar
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
