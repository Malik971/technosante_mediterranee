import { ArrowRight, Phone } from 'lucide-react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import Button from '../../../components/ui/Button'
import { AGENCES } from '../../../constants/siteData'

export default function CTABannerSection() {
  const ref = useScrollReveal()

  return (
    <section
      className="relative py-20 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #C95C35 0%, #A54428 50%, #7D301B 100%)',
      }}
      ref={ref}
      aria-label="Appel à l'action"
    >
      {/* Formes décoratives */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(240,188,42,0.5) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(253,250,246,0.4) 0%, transparent 70%)' }}
        />
        {/* Motif losanges */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diamond" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect x="20" y="0" width="14" height="14" fill="white" transform="rotate(45 20 7)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diamond)" />
        </svg>
      </div>

      <div className="section-inner relative z-10 text-center">
        <div className="reveal">
          <p className="text-terra-200 text-sm font-semibold uppercase tracking-widest mb-4">
            ✦ Groupe e-Santé France
          </p>
        </div>
        <h2
          className="reveal text-white mb-6"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.15)' }}
        >
          Prêt à passer à<br />l'informatique médicale<br />
          <em className="not-italic" style={{ color: '#FDE68A' }}>du XXIe siècle ?</em>
        </h2>
        <p className="reveal text-terra-100 text-lg max-w-xl mx-auto mb-10 opacity-90">
          Un audit gratuit, sans engagement, pour évaluer votre situation et vous proposer les solutions les mieux adaptées.
        </p>
        <div className="reveal flex flex-wrap gap-4 justify-center">
          <Button
            href="#contact"
            className="bg-white text-terra-700 hover:bg-sable-50 shadow-terra-lg text-base px-8 py-4"
            style={{
              background: 'white',
              color: '#A54428',
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
            }}
          >
            Demander un audit gratuit
            <ArrowRight size={18} />
          </Button>
          <a
            href={`tel:${AGENCES[0].phoneRaw}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-terra-200 text-white font-semibold text-base hover:bg-terra-700 transition-colors"
          >
            <Phone size={18} />
            {AGENCES[0].phone}
          </a>
        </div>
      </div>
    </section>
  )
}
