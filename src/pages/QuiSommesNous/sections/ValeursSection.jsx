import { Sun, Anchor, Leaf, Zap } from 'lucide-react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { VALEURS } from '../../../constants/siteData'
import Tag from '../../../components/ui/Tag'

const ICONS = { sun: Sun, anchor: Anchor, leaf: Leaf, zap: Zap }

const COLOR_STYLES = {
  terra:   { num: '#C95C35', bg: 'linear-gradient(135deg,#FDE0D0,#FAC0A0)', icon: '#C95C35', border: 'rgba(201,92,53,0.15)' },
  mer:     { num: '#0E6E9E', bg: 'linear-gradient(135deg,#D0E8F4,#A0CDE6)', icon: '#0E6E9E', border: 'rgba(14,110,158,0.15)'  },
  olive:   { num: '#617A36', bg: 'linear-gradient(135deg,#EFF2E5,#D5DDC0)', icon: '#617A36', border: 'rgba(97,122,54,0.15)'   },
  soleil:  { num: '#D4A010', bg: 'linear-gradient(135deg,#FEF3C7,#FDE68A)', icon: '#D4A010', border: 'rgba(212,160,16,0.15)'  },
}

export default function ValeursSection() {
  const ref = useScrollReveal()

  return (
    <section
      className="section-padding"
      style={{ background: '#FDFAF6' }}
      ref={ref}
      aria-label="Nos valeurs"
    >
      <div className="section-inner">

        {/* En-tête */}
        <div className="grid md:grid-cols-2 gap-10 items-end mb-16">
          <div>
            <div className="reveal">
              <Tag variant="terra" className="mb-5">Nos valeurs</Tag>
            </div>
            <h2 className="reveal text-ardoise-800">
              Ce qui nous guide
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg,#C95C35,#F0BC2A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                depuis 20 ans.
              </span>
            </h2>
          </div>
          <p className="reveal text-ardoise-500 text-lg leading-relaxed">
            L'informatique médicale exige plus que de la compétence technique. Elle exige de comprendre le quotidien du médecin, la pression de la salle d'attente, l'enjeu d'une panne à 10h un lundi matin.
          </p>
        </div>

        {/* Grille valeurs — 2 + 2 avec numéros éditoriaux */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALEURS.map((valeur, i) => {
            const Icon  = ICONS[valeur.icon] ?? Sun
            const style = COLOR_STYLES[valeur.color] ?? COLOR_STYLES.terra

            return (
              <div
                key={valeur.title}
                className={`reveal reveal-delay-${i + 1} relative bg-white rounded-xl3 p-7 overflow-hidden group transition-all duration-300`}
                style={{ border: `1px solid ${style.border}`, boxShadow: 'var(--shadow-card)' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card)';       e.currentTarget.style.transform = 'translateY(0)' }}
              >
                {/* Numéro décoratif en arrière-plan */}
                <span
                  className="absolute -top-3 -right-1 font-bold opacity-5 select-none pointer-events-none leading-none"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '7rem',
                    color: style.num,
                  }}
                  aria-hidden="true"
                >
                  {valeur.number}
                </span>

                {/* Icône */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: style.bg }}
                  aria-hidden="true"
                >
                  <Icon size={20} style={{ color: style.icon }} />
                </div>

                {/* Numéro lisible + titre */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span
                    className="text-xs font-bold"
                    style={{ color: style.num, fontFamily: 'var(--font-body)' }}
                  >
                    {valeur.number}
                  </span>
                  <h3
                    className="text-ardoise-800 font-bold"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem' }}
                  >
                    {valeur.title}
                  </h3>
                </div>

                <p className="text-ardoise-500 text-sm leading-relaxed">{valeur.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
