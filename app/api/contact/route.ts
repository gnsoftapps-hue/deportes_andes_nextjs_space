export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

async function sendEmailNotification(data: { name: string; email: string; subject: string; message: string }) {
  try {
    const appUrl = process.env.NEXTAUTH_URL || ''
    const appName = 'Deportes Andes'

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1a6cb4, #0ea5e9); padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="color: white; margin: 0;">📩 Nuevo Mensaje de Contacto</h2>
        </div>
        <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #374151; width: 100px;">Nombre:</td><td style="padding: 8px 0; color: #1f2937;">${data.name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #1a6cb4;">${data.email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Asunto:</td><td style="padding: 8px 0; color: #1f2937;">${data.subject}</td></tr>
          </table>
          <div style="margin-top: 16px;">
            <p style="font-weight: bold; color: #374151; margin-bottom: 8px;">Mensaje:</p>
            <div style="background: white; padding: 16px; border-radius: 6px; border-left: 4px solid #1a6cb4; color: #1f2937; line-height: 1.6;">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 20px; text-align: center;">
            Recibido el ${new Date().toLocaleDateString('es-CL', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
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
        notification_id: process.env.NOTIF_ID_NUEVO_MENSAJE_DE_CONTACTO,
        subject: `[Deportes Andes] Nuevo mensaje de contacto: ${data.subject}`,
        body: htmlBody,
        is_html: true,
        recipient_email: 'deportesandes@gmail.com',
        reply_to: data.email,
        sender_email: senderEmail,
        sender_alias: appName,
      }),
    })
  } catch (error) {
    console.error('Error sending contact notification email:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request?.json?.().catch(() => null)
    if (!body) return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })

    const { name, email, subject, message } = body ?? {}

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios.' }, { status: 400 })
    }

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: String(name ?? ''),
        email: String(email ?? ''),
        subject: String(subject ?? ''),
        message: String(message ?? ''),
      },
    })

    // Send email notification (non-blocking)
    sendEmailNotification({ name, email, subject, message })

    return NextResponse.json({ success: true, id: contactMessage?.id ?? '' })
  } catch (error: any) {
    console.error('Contact error:', error)
    return NextResponse.json({ error: 'Error al enviar el mensaje' }, { status: 500 })
  }
}
