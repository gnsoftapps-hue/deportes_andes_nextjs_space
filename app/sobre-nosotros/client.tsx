'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart, Target, Eye, Users, Shield, Lightbulb, Handshake } from 'lucide-react'
import { Card } from '@/components/ui/card'

const values = [
  { icon: Heart, title: 'Pasión', desc: 'Vivimos el deporte con entrega y amor por lo que hacemos.' },
  { icon: Shield, title: 'Disciplina', desc: 'Formamos hábitos positivos dentro y fuera de la cancha.' },
  { icon: Users, title: 'Comunidad', desc: 'Construimos lazos fuertes entre familias y deportistas.' },
  { icon: Lightbulb, title: 'Innovación', desc: 'Buscamos nuevas formas de enseñar y motivar.' },
  { icon: Handshake, title: 'Respeto', desc: 'Valoramos la diversidad y el trato digno.' },
  { icon: Target, title: 'Excelencia', desc: 'Nos esforzamos por dar lo mejor cada día.' },
]

const team = [
  { name: 'Directiva General', role: 'Coordinación general del club y gestión administrativa.' },
  { name: 'Coordinación Fútbol', role: 'Organización de entrenamientos, partidos y torneos.' },
  { name: 'Coordinación Gimnasia Rítmica', role: 'Programación de clases, competencias y presentaciones.' },
  { name: 'Coordinación Voleibol', role: 'Gestión de equipos, entrenamientos y campeonatos.' },
]

export function SobreNosotrosClient() {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { ref: valRef, inView: valInView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { ref: teamRef, inView: teamInView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-sky-100/50" ref={heroRef}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Sobre Nosotros</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Nuestra <span className="text-primary">Historia</span>
            </h1>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={heroInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
              <p className="text-muted-foreground leading-relaxed mb-4">
                El Club Deportivo, Social y Cultural Andes Biobío nació de la iniciativa de un grupo de apoderados que, al ver que el colegio de sus hijos no contaba con actividades extraprogramáticas deportivas, decidieron tomar acción.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Con poco más de un año de formalización, hemos logrado reunir a más de 150 familias en torno a tres ramas deportivas: Fútbol, Gimnasia Rítmica y Voleibol, además de actividades recreativas como Padel y salidas al aire libre.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Nuestro lema, <strong className="text-foreground">“Entrenamiento para la vida”</strong>, refleja nuestra convicción de que el deporte forma valores, carácter y habilidades que trascienden la cancha.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={heroInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                <Image src="/images/comunidad_deportiva.jpg" alt="Comunidad Deportes Andes" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-16 bg-background">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8">
          <Card className="p-8 border-0 bg-card shadow-md hover:shadow-lg transition-shadow">
            <Target className="w-10 h-10 text-primary mb-4" />
            <h2 className="font-display text-2xl font-bold tracking-tight mb-3">Misión</h2>
            <p className="text-muted-foreground leading-relaxed">
              Fomentar el desarrollo integral de niños y jóvenes a través de la práctica deportiva, creando un espacio seguro e inclusivo donde cada participante pueda descubrir su potencial, cultivar valores y construir amistades duraderas.
            </p>
          </Card>
          <Card className="p-8 border-0 bg-card shadow-md hover:shadow-lg transition-shadow">
            <Eye className="w-10 h-10 text-primary mb-4" />
            <h2 className="font-display text-2xl font-bold tracking-tight mb-3">Visión</h2>
            <p className="text-muted-foreground leading-relaxed">
              Ser el club deportivo comunitario de referencia en la Región del Biobío, reconocido por su excelencia en formación deportiva, su impacto social positivo y su capacidad de unir a familias en torno al deporte y la vida saludable.
            </p>
          </Card>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 bg-muted/30" ref={valRef}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={valInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Nuestros <span className="text-primary">Valores</span></h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {(values ?? []).map((v: any, i: number) => {
              const Icon = v?.icon ?? Heart
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={valInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <Card className="p-6 text-center border-0 bg-card hover:shadow-lg transition-shadow h-full">
                    <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-1">{v?.title ?? ''}</h3>
                    <p className="text-sm text-muted-foreground">{v?.desc ?? ''}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-16 bg-background" ref={teamRef}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={teamInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Equipo <span className="text-primary">Directivo</span></h2>
            <p className="text-muted-foreground mt-2">Coordinadores comprometidos con la formación deportiva.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(team ?? []).map((t: any, i: number) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={teamInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Card className="p-6 text-center border-0 bg-card hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{t?.name ?? ''}</h3>
                  <p className="text-xs text-muted-foreground">{t?.role ?? ''}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
