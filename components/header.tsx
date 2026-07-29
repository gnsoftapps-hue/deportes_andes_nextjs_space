'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

const navItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/sobre-nosotros' },
  {
    label: 'Disciplinas',
    href: '/disciplinas',
    children: [
      { label: 'Fútbol', href: '/disciplinas/futbol' },
      { label: 'Gimnasia Rítmica', href: '/disciplinas/gimnasia-ritmica' },
      { label: 'Voleibol', href: '/disciplinas/voleibol' },
    ],
  },
  { label: 'Actividades', href: '/actividades' },
  { label: 'Galería', href: '/galeria' },
  { label: 'Noticias', href: '/noticias' },
  { label: 'Documentos', href: '/documentos' },
  { label: 'Contacto', href: '/contacto' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div className="rainbow-bar w-full fixed top-0 z-[60]" />
      <header
        className={`fixed top-1 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
            : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logos/logo-transparente.png"
                  alt="Deportes Andes Logo"
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-primary hidden sm:block">
                Deportes Andes
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {(navItems ?? []).map((item: any) => (
                <div key={item?.href ?? ''} className="relative" onMouseEnter={() => item?.children && setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                  <Link
                    href={item?.href ?? '/'}
                    className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-accent/50 flex items-center gap-1"
                  >
                    {item?.label ?? ''}
                    {item?.children && <ChevronDown className="w-3 h-3" />}
                  </Link>
                  {item?.children && dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-0 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-border py-2 min-w-[180px]"
                    >
                      {(item?.children ?? []).map((child: any) => (
                        <Link
                          key={child?.href ?? ''}
                          href={child?.href ?? '/'}
                          className="block px-4 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-accent/50 transition-colors"
                        >
                          {child?.label ?? ''}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/inscripciones">
                <Button size="sm" className="hidden sm:inline-flex">
                  ¡Inscríbete!
                </Button>
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-accent/50 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white dark:bg-gray-900 border-t border-border overflow-hidden"
            >
              <nav className="max-w-[1200px] mx-auto px-4 py-4 space-y-1">
                {(navItems ?? []).map((item: any) => (
                  <div key={item?.href ?? ''}>
                    <Link
                      href={item?.href ?? '/'}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent/50 rounded-lg transition-colors"
                    >
                      {item?.label ?? ''}
                    </Link>
                    {(item?.children ?? []).map((child: any) => (
                      <Link
                        key={child?.href ?? ''}
                        href={child?.href ?? '/'}
                        onClick={() => setMobileOpen(false)}
                        className="block pl-8 pr-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-accent/50 rounded-lg transition-colors"
                      >
                        {child?.label ?? ''}
                      </Link>
                    ))}
                  </div>
                ))}
                <Link href="/inscripciones" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full mt-2">¡Inscríbete!</Button>
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
