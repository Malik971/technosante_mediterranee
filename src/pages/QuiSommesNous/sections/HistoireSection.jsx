import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { TIMELINE } from '../../../constants/siteData'
import Tag from '../../../components/ui/Tag'

const DOT_COLORS = {
  terra:    { dot: '#C95C35', ring: 'rgba(201,92,53,0.2)',  bg: 'linear-gradient(135deg,#FDE0D0,#FAC0A0)', text: '#C95C35' },
  mer:      { dot: '#0E6E9E', ring: 'rgba(14,110,158,0.2)', bg: 'linear-gradient(135deg,#D0E8F4,#A0CDE6)', text: '#0E6E9E' },
  soleil:   { dot: '#D4A010', ring: 'rgba(212,160,16,0.2)', bg: 'linear-gradient(135deg,#FEF3C7,#FDE68A)', text: '#D4A010' },
  olive:    { dot: '#617A36', ring: 'rgba(97,122,54,0.2)',  bg: 'linear-gradient(135deg,#EFF2E5,#D5DDC0)', text: '#617A36' },
  garrigue: { dot: '#8B74CA', ring: 'rgba(139,116,202,0.2)',bg: 'linear-gradient(135deg,#EDE8F5,#D8CEEE)', text: '#8B74CA' },
}

export default function HistoireSection() {
  const ref = useScrollReveal()

  return (
    <section
      id="notre-histoire"
      className="section-padding"
      style={{
        background: 'linear-gradient(160deg, #FEF4EF 0%, #FDFAF6 60%, #EFF7FB 100%)',
        borderTop:    '1px solid rgba(201,92,53,0.08)',
        borderBottom: '1px solid rgba(14,110,158,0.08)',
      }}
      ref={ref}
      aria-label="Notre histoire"
    >
      <div className="section-inner">

        {/* En-tête centré */}
        <div className="text-center mb-16">
          <div className="reveal">
            <Tag variant="mer" className="mb-5">Notre histoire</Tag>
          </div>
          <h2 className="reveal text-ardoise-800 mb-5">
            Deux décennies à vos côtés,<br />
            <span
              style={{
                background: 'linear-gradient(135deg,#C95C35,#0E6E9E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              en région.
            </span>
          </h2>
          <p className="reveal text-ardoise-500 text-lg max-w-xl mx-auto">
            De la fondation à Montpellier à nos 13 experts aujourd'hui — une trajectoire construite sur la confiance de nos clients.
          </p>
        </div>

        {/* Timeline verticale */}
        <div className="relative max-w-3xl mx-auto">

          {/* Ligne verticale centrale */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(to bottom, rgba(201,92,53,0.25), rgba(14,110,158,0.20), rgba(201,92,53,0.10))',
              transform: 'translateX(-50%)',
            }}
            aria-hidden="true"
          />

          <div className="space-y-10">
            {TIMELINE.map((item, i) => {
              const style   = DOT_COLORS[item.color] ?? DOT_COLORS.terra
              const isRight = i % 2 === 0

              return (
                <div
                  key={item.year}
                  className={`reveal reveal-delay-${(i % 3) + 1} relative flex gap-8 ${
                    isRight ? 'md:flex-row' : 'md:flex-row-reverse'
                  } items-start`}
                >
                  {/* Dot central */}
                  <div
                    className="absolute left-6 md:left-1/2 z-10 flex-shrink-0"
                    style={{ transform: 'translateX(-50%)', marginTop: '1.25rem' }}
                    aria-hidden="true"
                  >
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white"
                      style={{
                        background:  style.dot,
                        boxShadow:   `0 0 0 5px ${style.ring}`,
                        outline:     item.current ? `3px dashed ${style.dot}` : 'none',
                        outlineOffset: '4px',
                      }}
                    />
                  </div>

                  {/* Spacer mobile */}
                  <div className="w-14 md:hidden flex-shrink-0" aria-hidden="true" />

                  {/* Carte contenu */}
                  <div
                    className={`flex-1 bg-white rounded-xl2 p-6 transition-all duration-300 ${
                      isRight ? 'md:mr-10' : 'md:ml-10'
                    } ${item.current ? 'ring-2' : ''}`}
                    style={{
                      border:    `1px solid ${style.ring}`,
                      boxShadow: 'var(--shadow-card)',
                      ...(item.current ? { ringColor: style.dot } : {}),
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card)' }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {/* Année badge */}
                      <span
                        className="text-sm font-bold px-3 py-1 rounded-full"
                        style={{ background: style.bg, color: style.text, fontFamily: 'var(--font-display)' }}
                      >
                        {item.year}
                      </span>
                      {item.current && (
                        <span
                          className="text-xs font-semibold px-2.5 py-1 rounded-full text-white"
                          style={{ background: style.dot }}
                        >
                          Aujourd'hui
                        </span>
                      )}
                    </div>
                    <h4
                      className="text-ardoise-800 font-bold mb-2"
                      style={{ fontFamily: 'var(--font-body)', fontSize: '1rem' }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-ardoise-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>

                  {/* Spacer desktop côté opposé */}
                  <div className="hidden md:block flex-1" aria-hidden="true" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
