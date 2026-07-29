import { HeroSection } from '@/components/home/hero-section'
import { DisciplinesSection } from '@/components/home/disciplines-section'
import { StatsSection } from '@/components/home/stats-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { CtaSection } from '@/components/home/cta-section'
import { UpcomingEventsSection } from '@/components/home/upcoming-events-section'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DisciplinesSection />
      <StatsSection />
      <UpcomingEventsSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}
