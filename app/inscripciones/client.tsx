'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { UserPlus, CheckCircle, Send, ClipboardList } from 'lucide-react'

export function InscripcionesClient() {
  const [form, setForm] = useState({
    parentName: '',
    email: '',
    phone: '',
    discipline: '',
    childName: '',
    childAge: '',
    comments: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e?.target ?? {}
    setForm((prev) => ({ ...(prev ?? {}), [name ?? '']: value ?? '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.()
    setLoading(true)
    try {
      const res = await fetch('/api/inscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res?.ok) {
        setSuccess(true)
        toast.success('¡Inscripción enviada exitosamente!')
      } else {
        const data = await res?.json?.().catch(() => ({}))
        toast.error(data?.error ?? 'Error al enviar la inscripción')
      }
    } catch {
      toast.error('Error de conexión. Intenta nuevamente.')
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-background">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md mx-auto px-4">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold mb-2">¡Inscripción Recibida!</h2>
          <p className="text-muted-foreground mb-6">Hemos recibido tu solicitud de inscripción. Nos pondremos en contacto contigo pronto.</p>
          <Button onClick={() => { setSuccess(false); setForm({ parentName: '', email: '', phone: '', discipline: '', childName: '', childAge: '', comments: '' }) }}>
            Enviar Otra Inscripción
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-24">
      <section className="py-16 bg-gradient-to-br from-primary/5 to-sky-100/50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <UserPlus className="w-10 h-10 text-primary mb-3" />
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Formulario de <span className="text-primary">Inscripción</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Completa el formulario para inscribir a tu hijo o hija en alguna de nuestras disciplinas deportivas.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="max-w-[700px] mx-auto px-4 sm:px-6">
          <Card className="p-6 sm:p-8 border-0 shadow-lg bg-card">
            <div className="flex items-center gap-2 mb-6">
              <ClipboardList className="w-5 h-5 text-primary" />
              <h2 className="font-display font-bold text-lg">Datos de Inscripción</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="parentName">Nombre del Apoderado *</Label>
                  <Input id="parentName" name="parentName" value={form?.parentName ?? ''} onChange={handleChange} required placeholder="Nombre completo" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Correo Electrónico *</Label>
                  <Input id="email" name="email" type="email" value={form?.email ?? ''} onChange={handleChange} required placeholder="correo@ejemplo.cl" className="mt-1" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input id="phone" name="phone" type="tel" value={form?.phone ?? ''} onChange={handleChange} required placeholder="+56 9 1234 5678" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="discipline">Disciplina de Interés *</Label>
                  <select
                    id="discipline"
                    name="discipline"
                    value={form?.discipline ?? ''}
                    onChange={handleChange}
                    required
                    className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Seleccionar disciplina</option>
                    <option value="futbol">Fútbol</option>
                    <option value="gimnasia-ritmica">Gimnasia Rítmica</option>
                    <option value="voleibol">Voleibol</option>
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="childName">Nombre del Niño/a *</Label>
                  <Input id="childName" name="childName" value={form?.childName ?? ''} onChange={handleChange} required placeholder="Nombre del deportista" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="childAge">Edad del Niño/a *</Label>
                  <Input id="childAge" name="childAge" type="number" min="4" max="18" value={form?.childAge ?? ''} onChange={handleChange} required placeholder="Edad" className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="comments">Comentarios (opcional)</Label>
                <textarea
                  id="comments"
                  name="comments"
                  value={form?.comments ?? ''}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Experiencia previa, condiciones especiales, consultas..."
                  className="mt-1 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[80px]"
                />
              </div>
              <p className="text-xs text-muted-foreground">Los datos proporcionados serán utilizados únicamente para gestionar la inscripción.</p>
              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar Inscripción'}
                <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  )
}
