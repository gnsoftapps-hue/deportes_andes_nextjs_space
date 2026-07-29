'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FileText, Download, ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const documents = [
  {
    title: 'Estatutos del Club',
    description: 'Estatutos del Club Deportivo, Social y Cultural Andes Biobío, actualizados a marzo 2024.',
    file: '/documents/estatutos-andes.pdf',
    date: 'Marzo 2024',
  },
  {
    title: 'Reglamento de Organizaciones Deportivas',
    description: 'Reglamento que rige las organizaciones deportivas, versión octubre 2022.',
    file: '/documents/reglamento-organizaciones-deportivas.pdf',
    date: 'Octubre 2022',
  },
  {
    title: 'Oficio OFI640',
    description: 'Documento oficial relacionado con la operación del club.',
    file: '/documents/ofi640.pdf',
    date: '',
  },
  {
    title: 'Política Institucional Tipo',
    description: 'Marco de políticas institucionales para la gestión del club deportivo.',
    file: '/documents/politica-institucional.pdf',
    date: '',
  },
]

export function DocumentosClient() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="pt-24">
      <section className="py-16 bg-gradient-to-br from-primary/5 to-sky-100/50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <FileText className="w-10 h-10 text-primary mb-3" />
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Documentos <span className="text-primary">Institucionales</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Accede a los documentos oficiales, estatutos y reglamentos del club.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background" ref={ref}>
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 space-y-4">
          {(documents ?? []).map((doc: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="p-5 sm:p-6 border-0 bg-card shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-lg p-3 shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{doc?.title ?? ''}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{doc?.description ?? ''}</p>
                    {doc?.date && <p className="text-xs text-muted-foreground mb-2">Fecha: {doc.date}</p>}
                    <a href={doc?.file ?? '#'} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="mr-2 w-4 h-4" /> Ver Documento
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
