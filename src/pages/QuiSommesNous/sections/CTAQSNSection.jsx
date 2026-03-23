import { Phone, ArrowRight } from 'lucide-react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { AGENCES } from '../../../constants/siteData'
import Button from '../../../components/ui/Button'

export default function CTAQSNSection() {
  const ref = useScrollReveal()

  return (
    <section
      className="section-padding"
      style={{ background: '#FDFAF6', borderTop: '1px solid rgba(201,92,53,0.08)' }}
      ref={ref}
      aria-label="Passer à l'action"
    >
      <div className="section-inner">
        <div
          className="reveal rounded-xl4 overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, #C95C35 0%, #A54428 45%, #7D301B 100%)',
          }}
        >
          {/* Formes décoratives */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div
              className="absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, rgba(240,188,42,0.6) 0%, transparent 70%)' }}
            />
            <div
              className="absolute bottom-0 left-0 w-full h-24 opacity-10"
              style={{ background: 'linear-gradient(to top, rgba(253,250,246,0.3), transparent)' }}
            />
            {/* Motif points */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
          </div>

          <div className="relative z-10 px-8 md:px-14 py-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <p className="text-terra-200 text-sm font-semibold uppercase tracking-widest mb-3">
                ✦ Prêt à démarrer ?
              </p>
              <h2
                className="text-white mb-3"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
              >
                Un audit gratuit,<br />sans engagement.
              </h2>
              <p className="text-terra-100 opacity-85 max-w-md">
                Nous évaluons votre situation en 30 minutes et vous proposons les solutions adaptées à votre pratique.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Button
                href="/#contact"
                className="text-sm px-7 py-3.5"
                style={{
                  background: 'white',
                  color: '#A54428',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  borderRadius: '0.75rem',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                Prendre rendez-vous
                <ArrowRight size={16} />
              </Button>
              <a
                href={`tel:${AGENCES[0].phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border-2 border-terra-200 text-white font-semibold text-sm hover:bg-terra-700 transition-colors"
              >
                <Phone size={16} />
                {AGENCES[0].phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
