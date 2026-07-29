import { NoticiasClient } from './client'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Noticias - Deportes Andes',
  description: 'Últimas noticias y novedades del Club Deportes Andes Biobío.',
}

export default function NoticiasPage() {
  return <NoticiasClient />
}
