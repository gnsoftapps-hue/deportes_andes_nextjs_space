export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      where: { date: { gte: new Date() } },
      orderBy: { date: 'asc' },
      take: 6,
    })

    const serialized = (events ?? []).map((e: any) => ({
      ...(e ?? {}),
      date: e?.date?.toISOString?.() ?? '',
      createdAt: e?.createdAt?.toISOString?.() ?? '',
      updatedAt: e?.updatedAt?.toISOString?.() ?? '',
    }))

    return NextResponse.json({ events: serialized })
  } catch (error: any) {
    console.error('Events fetch error:', error)
    return NextResponse.json({ events: [] })
  }
}
