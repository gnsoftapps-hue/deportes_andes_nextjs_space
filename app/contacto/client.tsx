'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { Mail, MapPin, Phone, Send, CheckCircle, MessageSquare } from 'lucide-react'

export function ContactoClient() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e?.target ?? {}
    setForm((prev) => ({ ...(prev ?? {}), [name ?? '']: value ?? '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res?.ok) {
        setSuccess(true)
        toast.success('¡Mensaje enviado exitosamente!')
      } else {
        toast.error('Error al enviar el mensaje. Intenta nuevamente.')
      }
    } catch {
      toast.error('Error de conexión.')
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-background">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md mx-auto px-4">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold mb-2">¡Mensaje Enviado!</h2>
          <p className="text-muted-foreground mb-6">Gracias por contactarnos. Te responderemos a la brevedad.</p>
          <Button onClick={() => { setSuccess(false); setForm({ name: '', email: '', subject: '', message: '' }) }}>
            Enviar Otro Mensaje
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-24">
      <section className="py-16 bg-gradient-to-br from-primary/5 to-sky-100/50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <MessageSquare className="w-10 h-10 text-primary mb-3" />
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="text-primary">Contacto</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            ¿Tienes alguna consulta? Escríbenos y te responderemos a la brevedad.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Info cards */}
            <div className="space-y-4">
              <Card className="p-5 border-0 bg-card shadow-md">
                <MapPin className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-semibold text-sm mb-1">Ubicación</h3>
                <p className="text-sm text-muted-foreground">Región del Biobío, Chile</p>
              </Card>
              <Card className="p-5 border-0 bg-card shadow-md">
                <Mail className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-semibold text-sm mb-1">Correo</h3>
                <p className="text-sm text-muted-foreground">contacto@deportesandes.cl</p>
              </Card>
              <Card className="p-5 border-0 bg-card shadow-md">
                <Phone className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-semibold text-sm mb-1">Redes Sociales</h3>
                <div className="flex gap-3 mt-2">
                  <a href="https://www.instagram.com/deportesandes" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">Instagram</a>
                  <a href="https://www.facebook.com/deportesandes" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">Facebook</a>
                </div>
              </Card>
            </div>

            {/* Contact form */}
            <div className="md:col-span-2">
              <Card className="p-6 sm:p-8 border-0 shadow-lg bg-card">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nombre *</Label>
                      <Input id="name" name="name" value={form?.name ?? ''} onChange={handleChange} required placeholder="Tu nombre" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email">Correo Electrónico *</Label>
                      <Input id="email" name="email" type="email" value={form?.email ?? ''} onChange={handleChange} required placeholder="correo@ejemplo.cl" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject">Asunto *</Label>
                    <Input id="subject" name="subject" value={form?.subject ?? ''} onChange={handleChange} required placeholder="¿En qué podemos ayudarte?" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="message">Mensaje *</Label>
                    <textarea
                      id="message"
                      name="message"
                      value={form?.message ?? ''}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Escribe tu mensaje aquí..."
                      className="mt-1 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[120px]"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Los datos proporcionados serán utilizados únicamente para responder tu consulta.</p>
                  <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar Mensaje'}
                    <Send className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
