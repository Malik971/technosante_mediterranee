import { Phone, ArrowRight, MonitorDot } from 'lucide-react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { AGENCES } from '../../../constants/siteData'

const RALF_URL = 'https://jrcorp.pcscloud.net/INSTALL/Ralf'

export default function CTAAssistanceSection() {
  const ref = useScrollReveal()

  return (
    <section
      className="section-padding"
      style={{ background: '#FDFAF6', borderTop: '1px solid rgba(201,92,53,0.08)' }}
      ref={ref}
      aria-label="Besoin d'aide maintenant"
    >
      <div className="section-inner">
        <div
          className="reveal rounded-xl4 overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #C95C35 0%, #A54428 50%, #7D301B 100%)' }}
        >
          {/* Déco */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle,rgba(240,188,42,0.6) 0%,transparent 70%)' }}
            />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '22px 22px',
              }}
            />
          </div>

          <div className="relative z-10 px-8 md:px-14 py-14 md:py-16">
            <div className="grid md:grid-cols-2 gap-10 items-center">

              {/* Gauche */}
              <div>
                <p className="text-terra-200 text-sm font-semibold uppercase tracking-widest mb-4">
                  ⚡ Urgence technique
                </p>
                <h2
                  className="text-white mb-4"
                  style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)' }}
                >
                  Votre cabinet est en panne ?<br />
                  <em className="not-italic" style={{ color: '#FDE68A' }}>
                    Appelez maintenant.
                  </em>
                </h2>
                <p className="text-terra-100 opacity-85 max-w-md">
                  Nos techniciens prennent en charge votre problème en moins de 10 minutes en télémaintenance — ou planifient une intervention sur site selon votre contrat.
                </p>
              </div>

              {/* Droite — actions */}
              <div className="flex flex-col gap-4">
                {AGENCES.map((agence) => (
                  <a
                    key={agence.id}
                    href={`tel:${agence.phoneRaw}`}
                    className="flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-200 group"
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      border: '1px solid rgba(255,255,255,0.25)',
                      backdropFilter: 'blur(8px)',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.20)' }}
                      aria-hidden="true"
                    >
                      <Phone size={18} style={{ color: 'white' }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-terra-200 text-xs font-medium">{agence.city}</p>
                      <p className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>
                        {agence.phone}
                      </p>
                    </div>
                    <ArrowRight
                      size={16}
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                ))}

                {/* Bouton RALF inline */}
                <a
                  href={RALF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
                  style={{
                    background: 'white',
                    color: '#A54428',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <MonitorDot size={16} aria-hidden="true" />
                  Lancer RALF — assistance immédiate
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
