import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'

const STATS_DATA = [
  {
    value:   3000,
    display: '+3 000',
    label:   'Médecins nous font confiance',
    sub:     'En France métropolitaine',
    color:   '#C95C35',
    bg:      'linear-gradient(135deg, #FDE0D0, #FAC0A0)',
  },
  {
    value:   250,
    display: '250+',
    label:   'Centres médicaux accompagnés',
    sub:     'Cabinets, EHPAD, cliniques',
    color:   '#0E6E9E',
    bg:      'linear-gradient(135deg, #D0E8F4, #A0CDE6)',
  },
  {
    value:   20,
    display: '20 ans',
    label:   'D\'expérience sur le terrain',
    sub:     'Depuis 2003 en région',
    color:   '#D4A010',
    bg:      'linear-gradient(135deg, #FEF3C7, #FDE68A)',
  },
  {
    value:   13,
    display: '13',
    label:   'Experts sur 2 agences',
    sub:     'Montpellier & Nice',
    color:   '#8B74CA',
    bg:      'linear-gradient(135deg, #EDE8F5, #D8CEEE)',
  },
]

function StatCard({ stat, index, isVisible }) {
  return (
    <div
      className={`reveal reveal-delay-${index + 1} text-center`}
    >
      {/* Orbe coloré */}
      <div
        className="w-16 h-16 rounded-xl3 flex items-center justify-center mx-auto mb-4"
        style={{ background: stat.bg }}
        aria-hidden="true"
      >
        <div
          className="w-6 h-6 rounded-full"
          style={{ background: stat.color, opacity: 0.5 }}
        />
      </div>

      {/* Valeur */}
      <div
        className="font-bold mb-1.5 leading-none"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize:   'clamp(2.2rem, 4vw, 3rem)',
          color:       stat.color,
        }}
        aria-label={stat.display}
      >
        {stat.display}
      </div>

      {/* Label */}
      <p className="text-ardoise-700 font-semibold text-base mb-1">{stat.label}</p>
      <p className="text-ardoise-400 text-xs">{stat.sub}</p>
    </div>
  )
}

export default function StatsSection() {
  const ref       = useScrollReveal()
  const [visible, setVisible] = useState(false)
  const trigRef   = useRef(null)

  useEffect(() => {
    const el = trigRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      className="relative py-20 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #FEF4EF 0%, #F9F2E8 40%, #EFF7FB 100%)',
        borderTop:    '1px solid rgba(201,92,53,0.10)',
        borderBottom: '1px solid rgba(14,110,158,0.08)',
      }}
      aria-label="Nos chiffres clés"
      ref={ref}
    >
      {/* Vague décorative top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 30" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,15 C480,30 960,0 1440,15 L1440,0 L0,0 Z" fill="rgba(253,250,246,0.8)" />
        </svg>
      </div>

      {/* Blob décoratif */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(201,92,53,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }}
        aria-hidden="true"
      />

      <div className="section-inner relative z-10" ref={trigRef}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS_DATA.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} isVisible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}
