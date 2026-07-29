import { DisciplinaDetailClient } from './client'
import { notFound } from 'next/navigation'

const disciplineData: Record<string, any> = {
  futbol: {
    name: 'Fútbol',
    description: 'Nuestro programa de fútbol busca formar deportistas integrales. A través de sesiones de entrenamiento estructuradas, los deportistas desarrollan habilidades técnicas, tácticas y físicas, mientras aprenden valores fundamentales como el trabajo en equipo, la disciplina y el respeto.',
    image: '/images/futbol_equipo.jpg',
    categories: ['Sub-8 (5-7 años)', 'Sub-10 (8-9 años)', 'Sub-12 (10-11 años)', 'Sub-14 (12-13 años)'],
    schedule: 'Lunes: 15:30 - 17:00 hrs\nViernes: 15:00 - 16:30 hrs',
    coaches: ['Martín Gutiérrez'],
    location: 'Cancha Complejo Deportivo Serviu, San Pedro de la Paz',
    highlights: ['Entrenamientos dos veces por semana', 'Entrenamientos diferenciados por edad', 'Enfoque formativo y competitivo', 'Participación en torneos locales'],
  },
  'gimnasia-ritmica': {
    name: 'Gimnasia Rítmica',
    description: 'La gimnasia rítmica es una disciplina que combina el movimiento corporal con la música y el manejo de aparatos. En Deportes Andes, nuestras gimnastas desarrollan flexibilidad, coordinación, gracia y expresión artística, en un ambiente de apoyo y crecimiento personal.',
    image: '/images/gimnasia_equipo.jpg',
    categories: ['Categoría Iniciación', 'Categoría Formativa'],
    schedule: 'Lunes y Miércoles\n15:00 - 16:00 hrs\n(Ambas categorías en paralelo con grupos separados)',
    coaches: ['Camila Urbina', 'Constanza Bachler', 'Constanza Gutiérrez'],
    location: 'Gimnasio Municipal, San Pedro de la Paz',
    highlights: ['Categorías Iniciación y Formativa con profesoras dedicadas', 'Grupos separados con atención personalizada', 'Trabajo con aparatos (cinta, aro, pelota)', 'Desarrollo de la expresión artística y coordinación'],
  },
  voleibol: {
    name: 'Voleibol',
    description: 'El voleibol es un deporte dinámico que fomenta la agilidad, la comunicación y el compañerismo. En nuestra rama infantil, los deportistas trabajan en técnicas de pase, defensa y ataque, con un enfoque formativo que prioriza el desarrollo integral de cada niño y niña.',
    image: '/images/voleibol_equipo.jpg',
    categories: ['Categoría Mini (nivel principiante)', 'Categoría Infantil'],
    schedule: 'Categoría Mini: Martes y Miércoles 15:30 - 16:45 hrs\nCategoría Infantil: Martes y Miércoles 16:15 - 17:30 hrs',
    coaches: ['Carlos Aravena'],
    location: 'Complejo Deportivo Serviu, San Pedro de la Paz',
    highlights: ['Nivel principiante para iniciación deportiva', 'Entrenamientos diferenciados por categoría', 'Desarrollo del juego en equipo', 'Ubicación en Complejo Deportivo Serviu, San Pedro de la Paz'],
  },
}

export function generateStaticParams() {
  return [
    { slug: 'futbol' },
    { slug: 'gimnasia-ritmica' },
    { slug: 'voleibol' },
  ]
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const data = disciplineData?.[params?.slug ?? '']
  if (!data) return { title: 'Disciplina - Deportes Andes' }
  return {
    title: `${data?.name ?? 'Disciplina'} - Deportes Andes`,
    description: data?.description ?? '',
  }
}

export default function DisciplinaDetailPage({ params }: { params: { slug: string } }) {
  const data = disciplineData?.[params?.slug ?? '']
  if (!data) notFound()
  return <DisciplinaDetailClient data={data} />
}
