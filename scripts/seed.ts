import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Seed news
  const newsData = [
    {
      title: 'Inauguración Oficial del Club Deportes Andes',
      slug: 'inauguracion-oficial-club-deportes-andes',
      excerpt: 'Con la presencia de más de 100 familias, se realizó la inauguración oficial del Club Deportivo, Social y Cultural Andes Biobío.',
      content: 'Con gran emoción y la presencia de más de 100 familias, se realizó la ceremonia de inauguración oficial del Club Deportivo, Social y Cultural Andes Biobío. El evento contó con demostraciones de las tres ramas deportivas: Fútbol, Gimnasia Rítmica y Voleibol.\n\nLos niños y jóvenes mostraron lo aprendido durante los primeros meses de entrenamiento, dejando en evidencia el compromiso y la pasión que caracteriza a nuestra comunidad.\n\nLa directiva del club agradeció a todos los apoderados por su apoyo incondicional y reafirmó el compromiso con la formación deportiva integral.',
      imageUrl: '/images/comunidad_deportiva.jpg',
      category: 'institucional',
      published: true,
    },
    {
      title: 'Torneo de Fútbol Interescolar 2025',
      slug: 'torneo-futbol-interescolar-2025',
      excerpt: 'Nuestros equipos de fútbol participaron exitosamente en el Torneo Interescolar, dejando en alto el nombre del club.',
      content: 'Con gran orgullo informamos que nuestros equipos de fútbol participaron en el Torneo Interescolar 2025, donde mostraron un excelente nivel deportivo y una actitud ejemplar dentro y fuera de la cancha.\n\nLos equipos Sub-10 y Sub-12 avanzaron hasta las semifinales, mientras que el equipo Sub-14 alcanzó la final del torneo. Más allá de los resultados, lo más importante fue ver cómo nuestros deportistas aplicaron los valores del club: respeto, trabajo en equipo y disciplina.\n\n¡Felicitaciones a todos los jugadores y entrenadores!',
      imageUrl: '/images/futbol_juvenil.jpg',
      category: 'futbol',
      published: true,
    },
    {
      title: 'Presentación de Gimnasia Rítmica en Gala Regional',
      slug: 'presentacion-gimnasia-ritmica-gala-regional',
      excerpt: 'Nuestras gimnastas brillaron en la Gala Regional de Gimnasia Rítmica con presentaciones llenas de gracia y talento.',
      content: 'Las gimnastas de Deportes Andes participaron en la Gala Regional de Gimnasia Rítmica, donde presentaron coreografías con cinta, aro y pelota que cautivaron al público asistente.\n\nLas categorías Iniciación y Formativa recibieron reconocimientos especiales por su creatividad y coordinación. La categoría Competitiva obtuvo el segundo lugar en la tabla general.\n\nAgradecemos a las entrenadoras y familias por el apoyo constante.',
      imageUrl: '/images/gimnasia_ritmica.jpg',
      category: 'gimnasia',
      published: true,
    },
    {
      title: 'Jornada Familiar de Padel',
      slug: 'jornada-familiar-padel',
      excerpt: 'Exitosa jornada de padel familiar donde apoderados y niños disfrutaron juntos de este emocionante deporte.',
      content: 'Se realizó la primera Jornada Familiar de Padel organizada por Deportes Andes. La actividad reunió a apoderados y niños en una tarde llena de diversión, aprendizaje y competencia sana.\n\nLos participantes pudieron disfrutar de clínicas de padel para principiantes, mini torneos familiares y un compartir comunitario que fortaleció los lazos entre las familias del club.\n\n¡La próxima jornada ya tiene fecha, no te la pierdas!',
      imageUrl: '/images/padel.jpg',
      category: 'actividades',
      published: true,
    },
    {
      title: 'Nuevas Inscripciones Abiertas para el Segundo Semestre',
      slug: 'inscripciones-abiertas-segundo-semestre',
      excerpt: 'Abiertas las inscripciones para nuevos deportistas en Fútbol, Gimnasia Rítmica y Voleibol.',
      content: 'Informamos a la comunidad que las inscripciones para el segundo semestre ya están abiertas. Es una excelente oportunidad para que niños y jóvenes se sumen a nuestra familia deportiva.\n\nOfrecemos:\n- Fútbol: Categorías Sub-8 a Sub-14\n- Gimnasia Rítmica: Iniciación, Formativa y Competitiva\n- Voleibol: Mini, Infantil y Juvenil\n\nNo esperes más, ¡inscríbete hoy a través de nuestro formulario en línea!',
      imageUrl: '/images/entrenamiento_deportivo.jpg',
      category: 'institucional',
      published: true,
    },
  ]

  for (const n of newsData) {
    await prisma.news.upsert({
      where: { slug: n.slug },
      update: {
        title: n.title,
        excerpt: n.excerpt,
        content: n.content,
        imageUrl: n.imageUrl,
        category: n.category,
        published: n.published,
      },
      create: n,
    })
  }

  // Seed events
  const now = new Date()
  const eventsData = [
    {
      title: 'Torneo de Fútbol Sub-12',
      description: 'Torneo amistoso entre equipos de la región. ¡Ven a apoyar a nuestros jugadores!',
      date: new Date(now.getFullYear(), now.getMonth() + 1, 15, 10, 0),
      location: 'Cancha Municipal',
      category: 'futbol',
    },
    {
      title: 'Gala de Gimnasia Rítmica',
      description: 'Presentación semestral de nuestras gimnastas. Todas las categorías participan.',
      date: new Date(now.getFullYear(), now.getMonth() + 1, 22, 16, 0),
      location: 'Gimnasio del Colegio',
      category: 'gimnasia',
    },
    {
      title: 'Campeonato de Voleibol Mixto',
      description: 'Campeonato interno de voleibol con equipos mixtos de todas las categorías.',
      date: new Date(now.getFullYear(), now.getMonth() + 2, 5, 9, 0),
      location: 'Polideportivo Regional',
      category: 'voleibol',
    },
    {
      title: 'Día de la Familia Deportiva',
      description: 'Jornada de integración con actividades deportivas y recreativas para toda la familia.',
      date: new Date(now.getFullYear(), now.getMonth() + 2, 19, 10, 0),
      location: 'Parque Regional',
      category: 'comunidad',
    },
    {
      title: 'Jornada de Padel Familiar',
      description: 'Tarde de padel abierta a todas las familias del club. Principiantes bienvenidos.',
      date: new Date(now.getFullYear(), now.getMonth() + 1, 8, 15, 0),
      location: 'Club de Padel',
      category: 'actividades',
    },
  ]

  for (const e of eventsData) {
    const existing = await prisma.event.findFirst({ where: { title: e.title } })
    if (!existing) {
      await prisma.event.create({ data: e })
    }
  }

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
