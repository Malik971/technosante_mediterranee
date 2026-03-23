import HeroSection         from './sections/HeroSection'
import PartnersSection     from './sections/PartnersSection'
import ServicesSection     from './sections/ServicesSection'
import StatsSection        from './sections/StatsSection'
import PhotoBandSection    from './sections/PhotoBandSection'
import WhyUsSection        from './sections/WhyUsSection'
import TestimonialsSection from './sections/TestimonialsSection'
import AgencesSection      from './sections/AgencesSection'
import CTABannerSection    from './sections/CTABannerSection'
import ContactSection      from './sections/ContactSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PartnersSection />
      <ServicesSection />
      <StatsSection />
      <PhotoBandSection />
      <WhyUsSection />
      <TestimonialsSection />
      <AgencesSection />
      <CTABannerSection />
      <ContactSection />
    </>
  )
}
