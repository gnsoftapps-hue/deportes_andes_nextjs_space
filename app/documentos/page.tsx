import { DocumentosClient } from './client'

export const metadata = {
  title: 'Documentos Institucionales - Deportes Andes',
  description: 'Accede a los estatutos, reglamentos y políticas institucionales del Club Deportes Andes.',
}

export default function DocumentosPage() {
  return <DocumentosClient />
}
