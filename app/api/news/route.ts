export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 20,
    })

    const serialized = (news ?? []).map((n: any) => ({
      ...(n ?? {}),
      createdAt: n?.createdAt?.toISOString?.() ?? '',
      updatedAt: n?.updatedAt?.toISOString?.() ?? '',
    }))

    return NextResponse.json({ news: serialized })
  } catch (error: any) {
    console.error('News fetch error:', error)
    return NextResponse.json({ news: [] })
  }
}
