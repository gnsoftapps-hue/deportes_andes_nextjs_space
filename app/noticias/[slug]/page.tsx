export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { NoticiaDetailClient } from './client'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await prisma.news.findUnique({ where: { slug: params?.slug ?? '' } }).catch(() => null)
  if (!article) return { title: 'Noticia - Deportes Andes' }
  return {
    title: `${article?.title ?? 'Noticia'} - Deportes Andes`,
    description: article?.excerpt ?? '',
  }
}

export default async function NoticiaDetailPage({ params }: { params: { slug: string } }) {
  const article = await prisma.news.findUnique({ where: { slug: params?.slug ?? '' } }).catch(() => null)
  if (!article) notFound()

  return (
    <NoticiaDetailClient
      article={{
        id: article?.id ?? '',
        title: article?.title ?? '',
        content: article?.content ?? '',
        excerpt: article?.excerpt ?? '',
        imageUrl: article?.imageUrl ?? null,
        category: article?.category ?? '',
        createdAt: article?.createdAt?.toISOString?.() ?? '',
      }}
    />
  )
}
