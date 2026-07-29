'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ArticleData {
  id: string
  title: string
  content: string
  excerpt: string
  imageUrl: string | null
  category: string
  createdAt: string
}

export function NoticiaDetailClient({ article }: { article: ArticleData }) {
  const a = article ?? {} as ArticleData

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr)?.toLocaleDateString?.('es-CL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) ?? ''
    } catch { return '' }
  }

  return (
    <div className="pt-24">
      <section className="py-12 bg-background">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <Link href="/noticias">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="mr-2 w-4 h-4" /> Volver a Noticias
            </Button>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{a?.category ?? 'general'}</Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {formatDate(a?.createdAt ?? '')}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-6">{a?.title ?? ''}</h1>

            {a?.imageUrl && (
              <div className="relative aspect-video rounded-xl overflow-hidden mb-8 shadow-md">
                <Image src={a.imageUrl} alt={a?.title ?? ''} fill className="object-cover" sizes="800px" />
              </div>
            )}

            <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed whitespace-pre-line">
              {a?.content ?? ''}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
