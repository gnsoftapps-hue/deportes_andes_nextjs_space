'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_deportivo.jpg"
          alt="Niños practicando deportes en Deportes Andes"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a5c]/80 via-[#1a3a5c]/60 to-[#1a3a5c]/90" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 text-center text-white pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36">
              <Image
                src="/images/logos/logo-transparente.png"
                alt="Deportes Andes Logo"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="144px"
                priority
              />
            </div>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            Deportes <span className="text-sky-300">Andes</span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl italic text-white/80 font-light mb-8">
            Entrenamiento para la vida
          </p>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/70 mb-10 leading-relaxed">
            Club Deportivo, Social y Cultural formando niños y jóvenes a través del deporte en la Región del Biobío.
            Fútbol, Gimnasia Rítmica, Voleibol y mucho más.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inscripciones">
              <Button size="lg" className="text-base px-8 py-6 bg-sky-500 hover:bg-sky-400 text-white shadow-xl">
                ¡Inscríbete Ahora!
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/disciplinas">
              <Button size="lg" className="text-base px-8 py-6 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30">
                <Play className="mr-2 w-5 h-5" />
                Conoce Nuestras Disciplinas
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" className="fill-background" />
        </svg>
      </div>
    </section>
  )
}
