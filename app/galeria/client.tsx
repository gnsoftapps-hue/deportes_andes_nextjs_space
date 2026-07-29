'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { X, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'

const categories = ['Todas', 'Fútbol', 'Gimnasia Rítmica', 'Voleibol', 'Actividades', 'Comunidad']

const gallery = [
  { src: '/images/futbol_juvenil.jpg', alt: 'Entrenamiento de fútbol juvenil', category: 'Fútbol' },
  { src: '/images/gimnasia_ritmica.jpg', alt: 'Gimnasia rítmica con cinta', category: 'Gimnasia Rítmica' },
  { src: '/images/voleibol_juvenil.jpg', alt: 'Partido de voleibol', category: 'Voleibol' },
  { src: '/images/padel.jpg', alt: 'Cancha de padel', category: 'Actividades' },
  { src: '/images/actividades_aire_libre.jpg', alt: 'Actividades al aire libre', category: 'Actividades' },
  { src: '/images/comunidad_deportiva.jpg', alt: 'Evento comunitario', category: 'Comunidad' },
  { src: '/images/entrenamiento_deportivo.jpg', alt: 'Entrenamiento deportivo', category: 'Comunidad' },
  { src: '/images/hero_deportivo.jpg', alt: 'Deporte juvenil', category: 'Comunidad' },
]

export function GaleriaClient() {
  const [activeFilter, setActiveFilter] = useState('Todas')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const filtered = activeFilter === 'Todas'
    ? gallery
    : (gallery ?? []).filter((g: any) => g?.category === activeFilter)

  return (
    <div className="pt-24">
      <section className="py-16 bg-gradient-to-br from-primary/5 to-sky-100/50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <Camera className="w-10 h-10 text-primary mb-3" />
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Galería de <span className="text-primary">Fotos</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Imágenes que capturan la esencia de nuestra comunidad deportiva.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background" ref={ref}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {(categories ?? []).map((cat: string) => (
              <Button
                key={cat}
                variant={activeFilter === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(cat)}
                className="rounded-full"
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {(filtered ?? []).map((img: any, i: number) => (
                <motion.div
                  key={img?.src ?? i}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(img?.src ?? null)}
                >
                  <Image
                    src={img?.src ?? ''}
                    alt={img?.alt ?? 'Foto galería'}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-3">
                    <p className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">{img?.category ?? ''}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white"
              aria-label="Cerrar"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-[80vh] w-full aspect-video"
              onClick={(e: any) => e?.stopPropagation?.()}
            >
              <Image
                src={selectedImage}
                alt="Foto ampliada"
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
