'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, ArrowRight, Newspaper } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface NewsItem {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  imageUrl: string | null
  category: string
  createdAt: string
}

export function NoticiasClient() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    fetch('/api/news')
      .then((r) => r?.json?.())
      .then((data: any) => {
        setNews(data?.news ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr)?.toLocaleDateString?.('es-CL', { day: 'numeric', month: 'long', year: 'numeric' }) ?? ''
    } catch { return '' }
  }

  return (
    <div className="pt-24">
      <section className="py-16 bg-gradient-to-br from-primary/5 to-sky-100/50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <Newspaper className="w-10 h-10 text-primary mb-3" />
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Noticias y <span className="text-primary">Novedades</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Manténte informado sobre las últimas actividades y logros de nuestro club.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background" ref={ref}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-muted rounded-xl h-80" />
              ))}
            </div>
          ) : (news?.length ?? 0) === 0 ? (
            <div className="text-center py-20">
              <Newspaper className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">Próximamente publicaremos noticias.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(news ?? []).map((item: NewsItem, i: number) => (
                <motion.div
                  key={item?.id ?? i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link href={`/noticias/${item?.slug ?? ''}`}>
                    <Card className="group overflow-hidden border-0 bg-card hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <div className="relative aspect-video bg-muted">
                        {item?.imageUrl ? (
                          <Image src={item.imageUrl} alt={item?.title ?? ''} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-primary/10">
                            <Newspaper className="w-10 h-10 text-primary/30" />
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">{item?.category ?? 'general'}</Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {formatDate(item?.createdAt ?? '')}
                          </span>
                        </div>
                        <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">{item?.title ?? ''}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">{item?.excerpt ?? ''}</p>
                        <span className="text-primary text-sm font-semibold flex items-center gap-1 mt-3 group-hover:gap-2 transition-all">
                          Leer más <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
