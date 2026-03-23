import HeroAssistance        from './sections/HeroAssistance'
import ModesAssistanceSection from './sections/ModesAssistanceSection'
import ContratsSection        from './sections/ContratsSection'
import FAQSection             from './sections/FAQSection'
import LiveStatusSection      from './sections/LiveStatusSection'
import CTAAssistanceSection   from './sections/CTAAssistanceSection'

export default function Assistance() {
  return (
    <>
      <HeroAssistance />
      <ModesAssistanceSection />
      <ContratsSection />
      <LiveStatusSection />
      <FAQSection />
      <CTAAssistanceSection />
    </>
  )
}
