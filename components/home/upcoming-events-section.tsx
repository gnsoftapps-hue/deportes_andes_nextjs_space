'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, MapPin, Clock } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface EventItem {
  id: string
  title: string
  description: string
  date: string
  location: string
  category: string
}

export function UpcomingEventsSection() {
  const [events, setEvents] = useState<EventItem[]>([])
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    fetch('/api/events')
      .then((r) => r?.json?.())
      .then((data: any) => setEvents(data?.events ?? []))
      .catch(() => setEvents([]))
  }, [])

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr)
      return d?.toLocaleDateString?.('es-CL', { weekday: 'long', day: 'numeric', month: 'long' }) ?? ''
    } catch {
      return ''
    }
  }

  const formatTime = (dateStr: string) => {
    try {
      const d = new Date(dateStr)
      return d?.toLocaleTimeString?.('es-CL', { hour: '2-digit', minute: '2-digit' }) ?? ''
    } catch {
      return ''
    }
  }

  if ((events?.length ?? 0) === 0) return null

  return (
    <section className="py-20 bg-background" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Calendario</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Próximos <span className="text-primary">Eventos</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(events ?? []).slice(0, 6).map((event: EventItem, i: number) => (
            <motion.div
              key={event?.id ?? i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="p-5 hover:shadow-lg transition-shadow duration-300 border-0 bg-card h-full">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-lg p-3 text-center min-w-[60px]">
                    <Calendar className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-xs text-primary font-semibold">
                      {(() => { try { return new Date(event?.date ?? '').getDate() } catch { return '' } })()}
                    </p>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">{event?.title ?? ''}</h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{event?.description ?? ''}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatTime(event?.date ?? '')}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event?.location ?? ''}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
