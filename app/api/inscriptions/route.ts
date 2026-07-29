export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

const disciplineNames: Record<string, string> = {
  futbol: 'Fútbol',
  'gimnasia-ritmica': 'Gimnasia Rítmica',
  voleibol: 'Voleibol',
}

async function sendEmailNotification(data: {
  parentName: string
  email: string
  phone: string
  discipline: string
  childName: string
  childAge: number
  comments: string
}) {
  try {
    const appUrl = process.env.NEXTAUTH_URL || ''
    const appName = 'Deportes Andes'
    const disciplineName = disciplineNames[data.discipline] || data.discipline

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1a6cb4, #0ea5e9); padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="color: white; margin: 0;">🏅 Nueva Inscripción - ${disciplineName}</h2>
        </div>
        <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <h3 style="color: #1a6cb4; margin-top: 0;">Datos del Apoderado</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #374151; width: 120px;">Nombre:</td><td style="padding: 8px 0; color: #1f2937;">${data.parentName}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #1a6cb4;">${data.email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Teléfono:</td><td style="padding: 8px 0; color: #1f2937;">${data.phone}</td></tr>
          </table>
          <h3 style="color: #1a6cb4; margin-top: 20px;">Datos del Deportista</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #374151; width: 120px;">Nombre:</td><td style="padding: 8px 0; color: #1f2937;">${data.childName}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Edad:</td><td style="padding: 8px 0; color: #1f2937;">${data.childAge} años</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Disciplina:</td><td style="padding: 8px 0;"><span style="background: #1a6cb4; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px;">${disciplineName}</span></td></tr>
          </table>
          ${data.comments ? `
          <div style="margin-top: 16px;">
            <p style="font-weight: bold; color: #374151; margin-bottom: 8px;">Comentarios:</p>
            <div style="background: white; padding: 16px; border-radius: 6px; border-left: 4px solid #1a6cb4; color: #1f2937; line-height: 1.6;">
              ${data.comments.replace(/\n/g, '<br>')}
            </div>
          </div>` : ''}
          <p style="color: #9ca3af; font-size: 12px; margin-top: 20px; text-align: center;">
            Inscripción recibida el ${new Date().toLocaleDateString('es-CL', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    `

    const senderEmail = appUrl ? `noreply@${new URL(appUrl).hostname}` : 'no-reply@mail.abacusai.app'

    await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deployment_token: process.env.ABACUSAI_API_KEY,
        app_id: process.env.WEB_APP_ID,
        notification_id: process.env.NOTIF_ID_NUEVA_INSCRIPCIN,
        subject: `[Deportes Andes] Nueva inscripción: ${data.childName} - ${disciplineName}`,
        body: htmlBody,
        is_html: true,
        recipient_email: 'deportesandes@gmail.com',
        reply_to: data.email,
        sender_email: senderEmail,
        sender_alias: appName,
      }),
    })
  } catch (error) {
    console.error('Error sending inscription notification email:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request?.json?.().catch(() => null)
    if (!body) return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })

    const { parentName, email, phone, discipline, childName, childAge, comments } = body ?? {}

    if (!parentName || !email || !phone || !discipline || !childName || !childAge) {
      return NextResponse.json({ error: 'Todos los campos obligatorios deben ser completados.' }, { status: 400 })
    }

    const inscription = await prisma.inscription.create({
      data: {
        parentName: String(parentName ?? ''),
        email: String(email ?? ''),
        phone: String(phone ?? ''),
        discipline: String(discipline ?? ''),
        childName: String(childName ?? ''),
        childAge: Number(childAge ?? 0),
        comments: String(comments ?? ''),
      },
    })

    // Send email notification (non-blocking)
    sendEmailNotification({
      parentName,
      email,
      phone,
      discipline,
      childName,
      childAge: Number(childAge),
      comments: comments || '',
    })

    return NextResponse.json({ success: true, id: inscription?.id ?? '' })
  } catch (error: any) {
    console.error('Inscription error:', error)
    return NextResponse.json({ error: 'Error al procesar la inscripción' }, { status: 500 })
  }
}
