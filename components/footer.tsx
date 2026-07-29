import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#1a3a5c] text-white">
      <div className="rainbow-bar w-full" />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/logos/logo-transparente.png"
                  alt="Deportes Andes Logo"
                  fill
                  className="object-contain brightness-0 invert"
                  sizes="48px"
                />
              </div>
              <div>
                <p className="font-display font-bold text-lg">Deportes Andes</p>
                <p className="text-sm text-white/60 italic">Entrenamiento para la vida</p>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Club Deportivo, Social y Cultural Andes Biobío. Formación deportiva integral para niños y jóvenes.
            </p>
          </div>
          <div>
            <h3 className="font-display font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/sobre-nosotros" className="hover:text-white transition-colors">Sobre Nosotros</Link></li>
              <li><Link href="/disciplinas" className="hover:text-white transition-colors">Disciplinas</Link></li>
              <li><Link href="/inscripciones" className="hover:text-white transition-colors">Inscripciones</Link></li>
              <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-display font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Región del Biobío, Chile</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>contacto@deportesandes.cl</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-white/50">
          <p>© {new Date().getFullYear()} Club Deportivo, Social y Cultural Andes Biobío. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
