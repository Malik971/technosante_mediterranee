import { Check, Sparkles } from 'lucide-react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { CONTRATS } from '../../../constants/siteData'
import Tag from '../../../components/ui/Tag'
import Button from '../../../components/ui/Button'

const CONTRAT_STYLES = {
  sable: {
    headerBg: 'linear-gradient(135deg,#F9F2E8,#FDFAF6)',
    headerColor: '#745C3A',
    checkBg: 'rgba(97,122,54,0.10)',
    checkColor: '#617A36',
    border: 'rgba(232,213,200,0.8)',
    tag: 'neutral',
  },
  mer: {
    headerBg: 'linear-gradient(135deg,#D0E8F4,#A0CDE6)',
    headerColor: '#0A5580',
    checkBg: 'rgba(14,110,158,0.10)',
    checkColor: '#0E6E9E',
    border: 'rgba(14,110,158,0.20)',
    tag: 'mer',
  },
  terra: {
    headerBg: 'linear-gradient(135deg,#C95C35,#A54428)',
    headerColor: '#fff',
    checkBg: 'rgba(201,92,53,0.10)',
    checkColor: '#C95C35',
    border: 'rgba(201,92,53,0.30)',
    tag: 'terra',
  },
}

function ContratCard({ contrat, index }) {
  const s = CONTRAT_STYLES[contrat.color] ?? CONTRAT_STYLES.sable

  return (
    <div
      className={`reveal reveal-delay-${index + 1} relative bg-white rounded-xl3 overflow-hidden flex flex-col transition-all duration-300`}
      style={{
        border: contrat.highlighted
          ? `2px solid rgba(201,92,53,0.40)`
          : `1px solid ${s.border}`,
        boxShadow: contrat.highlighted
          ? '0 12px 48px rgba(201,92,53,0.18), var(--shadow-card)'
          : 'var(--shadow-card)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = contrat.highlighted ? '0 16px 56px rgba(201,92,53,0.24)' : 'var(--shadow-card-hover)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = contrat.highlighted ? '0 12px 48px rgba(201,92,53,0.18)' : 'var(--shadow-card)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      {/* Badge populaire */}
      {contrat.highlighted && (
        <div
          className="absolute top-4 right-4 flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full text-white"
          style={{ background: 'linear-gradient(135deg,#C95C35,#A54428)' }}
        >
          <Sparkles size={11} aria-hidden="true" />
          Recommandé
        </div>
      )}

      {/* Header coloré */}
      <div className="p-7 pb-6" style={{ background: s.headerBg }}>
        <p
          className="text-2xl font-bold mb-1"
          style={{ fontFamily: 'var(--font-display)', color: s.headerColor }}
        >
          {contrat.name}
        </p>
        <div className="flex items-baseline gap-1.5 mt-3">
          <span
            className="text-3xl font-bold"
            style={{ fontFamily: 'var(--font-display)', color: s.headerColor }}
          >
            {contrat.delay}
          </span>
          <span
            className="text-sm opacity-80"
            style={{ color: contrat.color === 'terra' ? 'rgba(255,255,255,0.85)' : s.headerColor }}
          >
            {contrat.delayType}
          </span>
        </div>
      </div>

      {/* Récap rapide */}
      <div
        className="px-7 py-4 grid grid-cols-2 gap-3"
        style={{ borderBottom: `1px solid ${s.border}`, background: 'rgba(253,250,246,0.5)' }}
      >
        {[
          { label: 'Support',        val: contrat.support },
          { label: 'Remote',         val: contrat.remote },
          { label: 'Interlocuteur',  val: contrat.interlocuteur },
        ].map(({ label, val }) => (
          <div key={label}>
            <p className="text-xs text-ardoise-400 font-medium mb-0.5">{label}</p>
            <p className="text-xs font-semibold text-ardoise-700">{val}</p>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="p-7 flex-1 flex flex-col">
        <ul className="space-y-3 mb-8 flex-1" role="list">
          {contrat.features.map((feat) => (
            <li key={feat} className="flex items-start gap-3 text-sm text-ardoise-600">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: s.checkBg }}
                aria-hidden="true"
              >
                <Check size={11} style={{ color: s.checkColor }} />
              </span>
              {feat}
            </li>
          ))}
        </ul>

        <Button
          href="/#contact"
          variant={contrat.highlighted ? 'terra' : 'outlineTerra'}
          className="w-full justify-center text-sm"
        >
          Demander un devis
        </Button>
      </div>
    </div>
  )
}

export default function ContratsSection() {
  const ref = useScrollReveal()

  return (
    <section
      className="section-padding"
      style={{
        background: 'linear-gradient(160deg, #FEF4EF 0%, #FDFAF6 60%, #EFF7FB 100%)',
        borderTop: '1px solid rgba(201,92,53,0.08)',
      }}
      ref={ref}
      aria-label="Contrats de maintenance"
    >
      <div className="section-inner">
        <div className="text-center mb-14">
          <div className="reveal">
            <Tag variant="terra" className="mb-5">Contrats de maintenance</Tag>
          </div>
          <h2 className="reveal text-ardoise-800 mb-5">
            L'assistance qui<br />
            <span
              style={{
                background: 'linear-gradient(135deg,#C95C35,#F0BC2A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              correspond à votre pratique.
            </span>
          </h2>
          <p className="reveal text-ardoise-500 text-lg max-w-xl mx-auto">
            Choisissez le niveau de couverture adapté à votre cabinet. Sans surprise sur la facture.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-7 max-w-4xl mx-auto">
          {CONTRATS.map((contrat, i) => (
            <ContratCard key={contrat.id} contrat={contrat} index={i} />
          ))}
        </div>

        {/* Note en bas */}
        <p className="reveal text-center text-sm text-ardoise-400 mt-8 max-w-lg mx-auto">
          Tous les contrats incluent l'accès à RALF et TeamViewer. Tarifs sur devis selon la taille du cabinet et le nombre de postes.
        </p>
      </div>
    </section>
  )
}
