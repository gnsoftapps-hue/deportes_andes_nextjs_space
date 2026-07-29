'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar, Users, Award, Clock, ArrowRight, CheckCircle, MapPin } from 'lucide-react'

interface DisciplinaData {
  name: string
  description: string
  image: string
  categories: string[]
  schedule: string
  coaches: string[]
  highlights: string[]
  location?: string
}

export function DisciplinaDetailClient({ data }: { data: DisciplinaData }) {
  const d = data ?? {} as DisciplinaData

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-end">
        <div className="absolute inset-0">
          <Image src={d?.image ?? ''} alt={d?.name ?? ''} fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/90 via-[#1a3a5c]/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 pb-10 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">{d?.name ?? ''}</h1>
            <p className="text-white/70 max-w-xl">{d?.description ?? ''}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Categorías */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="p-6 border-0 bg-card shadow-md h-full">
                <Users className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-display font-bold text-lg mb-3">Categorías</h3>
                <ul className="space-y-2">
                  {(d?.categories ?? []).map((c: string, i: number) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full" /> {c}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            {/* Horarios */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="p-6 border-0 bg-card shadow-md h-full">
                <Clock className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-display font-bold text-lg mb-3">Horarios</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{d?.schedule ?? ''}</p>
              </Card>
            </motion.div>

            {/* Entrenadores */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="p-6 border-0 bg-card shadow-md h-full">
                <Award className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-display font-bold text-lg mb-3">Entrenadores</h3>
                <ul className="space-y-2">
                  {(d?.coaches ?? []).map((c: string, i: number) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full" /> {c}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>

          {/* Ubicación */}
          {d?.location && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-8">
              <Card className="p-6 border-0 bg-primary/5 shadow-md">
                <div className="flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-primary shrink-0" />
                  <div>
                    <h3 className="font-display font-bold text-lg">Ubicación</h3>
                    <p className="text-sm text-muted-foreground">{d.location}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Highlights */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-12">
            <h3 className="font-display text-2xl font-bold tracking-tight mb-6">¿Qué Ofrecemos?</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {(d?.highlights ?? []).map((h: string, i: number) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm">{h}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link href="/inscripciones">
              <Button size="lg" className="px-8">
                Inscribirse en {d?.name ?? ''} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
