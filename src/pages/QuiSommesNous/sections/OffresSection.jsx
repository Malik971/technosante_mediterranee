import { useState } from 'react'
import { Monitor, Cpu, Landmark, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { OFFRES } from '../../../constants/siteData'
import Tag from '../../../components/ui/Tag'
import Button from '../../../components/ui/Button'

const ICONS = { monitor: Monitor, cpu: Cpu, landmark: Landmark }

const COLOR_STYLES = {
  terra: {
    tag:        'terra',
    tabActive:  { background: 'linear-gradient(135deg,#C95C35,#A54428)', color: '#fff', boxShadow: '0 4px 16px rgba(201,92,53,0.30)' },
    tabIdle:    { background: '#fff', color: '#5A4428', border: '1px solid rgba(201,92,53,0.18)' },
    iconBg:     'linear-gradient(135deg,#FDE0D0,#FAC0A0)',
    iconColor:  '#C95C35',
    numColor:   '#C95C35',
    checkColor: '#C95C35',
    checkBg:    'rgba(201,92,53,0.10)',
    barColor:   '#C95C35',
    accent:     'rgba(201,92,53,0.08)',
    accentBorder:'rgba(201,92,53,0.15)',
    pillBg:     'rgba(201,92,53,0.08)',
    pillColor:  '#A54428',
    pillBorder: 'rgba(201,92,53,0.20)',
    linkColor:  '#C95C35',
  },
  mer: {
    tag:        'mer',
    tabActive:  { background: 'linear-gradient(135deg,#2088BF,#0A5580)', color: '#fff', boxShadow: '0 4px 16px rgba(14,110,158,0.28)' },
    tabIdle:    { background: '#fff', color: '#063D5E', border: '1px solid rgba(14,110,158,0.18)' },
    iconBg:     'linear-gradient(135deg,#D0E8F4,#A0CDE6)',
    iconColor:  '#0E6E9E',
    numColor:   '#0E6E9E',
    checkColor: '#0E6E9E',
    checkBg:    'rgba(14,110,158,0.10)',
    barColor:   '#0E6E9E',
    accent:     'rgba(14,110,158,0.06)',
    accentBorder:'rgba(14,110,158,0.15)',
    pillBg:     'rgba(14,110,158,0.08)',
    pillColor:  '#0A5580',
    pillBorder: 'rgba(14,110,158,0.20)',
    linkColor:  '#0E6E9E',
  },
  garrigue: {
    tag:        'garrigue',
    tabActive:  { background: 'linear-gradient(135deg,#8B74CA,#6B54AA)', color: '#fff', boxShadow: '0 4px 16px rgba(139,116,202,0.28)' },
    tabIdle:    { background: '#fff', color: '#3C2E70', border: '1px solid rgba(139,116,202,0.18)' },
    iconBg:     'linear-gradient(135deg,#EDE8F5,#D8CEEE)',
    iconColor:  '#6B54AA',
    numColor:   '#8B74CA',
    checkColor: '#6B54AA',
    checkBg:    'rgba(139,116,202,0.10)',
    barColor:   '#8B74CA',
    accent:     'rgba(139,116,202,0.06)',
    accentBorder:'rgba(139,116,202,0.15)',
    pillBg:     'rgba(139,116,202,0.08)',
    pillColor:  '#6B54AA',
    pillBorder: 'rgba(139,116,202,0.20)',
    linkColor:  '#6B54AA',
  },
}

// ── Panneau d'offre (droite) ──────────────────────────────
function OffrePanel({ offre }) {
  const s    = COLOR_STYLES[offre.color]
  const Icon = ICONS[offre.icon] ?? Monitor

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-start gap-5 mb-8">
        <div
          className="w-14 h-14 rounded-xl3 flex items-center justify-center flex-shrink-0"
          style={{ background: s.iconBg }}
          aria-hidden="true"
        >
          <Icon size={26} style={{ color: s.iconColor }} />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span
              className="text-xs font-bold"
              style={{ color: s.numColor, fontFamily: 'var(--font-body)' }}
            >
              {offre.number}
            </span>
            <Tag variant={offre.color === 'garrigue' ? 'garrigue' : offre.color}>
              {offre.title}
            </Tag>
          </div>
          <h3
            className="text-ardoise-800 font-bold"
            style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', lineHeight: 1.3 }}
          >
            {offre.tagline}
          </h3>
        </div>
      </div>

      {/* Intro */}
      <p className="text-ardoise-500 leading-relaxed mb-8">{offre.intro}</p>

      {/* Barre décorative */}
      <div
        className="h-0.5 w-16 rounded-full mb-8"
        style={{ background: `linear-gradient(90deg, ${s.barColor}, transparent)` }}
        aria-hidden="true"
      />

      {/* Détails */}
      <div className="grid sm:grid-cols-2 gap-5 mb-8">
        {offre.details.map((detail) => (
          <div
            key={detail.title}
            className="rounded-xl2 p-5 transition-all duration-200"
            style={{ background: s.accent, border: `1px solid ${s.accentBorder}` }}
          >
            <div className="flex items-start gap-3 mb-2">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: s.checkBg }}
                aria-hidden="true"
              >
                <CheckCircle2 size={13} style={{ color: s.checkColor }} />
              </div>
              <h4
                className="text-ardoise-800 font-semibold text-sm leading-tight"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {detail.title}
              </h4>
            </div>
            <p className="text-ardoise-500 text-sm leading-relaxed pl-8">{detail.desc}</p>
          </div>
        ))}
      </div>

      {/* Pills logiciels / organismes */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-ardoise-400 mb-3">
          Compatible avec
        </p>
        <div className="flex flex-wrap gap-2">
          {offre.logiciels.map((l) => (
            <span
              key={l}
              className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{
                background: s.pillBg,
                color:      s.pillColor,
                border:     `1px solid ${s.pillBorder}`,
              }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <a
        href="#contact"
        className="inline-flex items-center gap-2 text-sm font-bold group"
        style={{ color: s.linkColor }}
        aria-label={`En savoir plus sur ${offre.title}`}
      >
        Demander un devis gratuit
        <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
      </a>
    </div>
  )
}

// ── Section principale ──────────────────────────────────
export default function OffresSection() {
  const ref            = useScrollReveal()
  const [active, setActive] = useState(0)

  return (
    <section
      id="nos-offres"
      className="section-padding bg-texture-sable"
      ref={ref}
      aria-label="Nos offres"
    >
      <div className="section-inner">

        {/* En-tête */}
        <div className="text-center mb-14">
          <div className="reveal">
            <Tag variant="terra" className="mb-5">Nos offres</Tag>
          </div>
          <h2 className="reveal text-ardoise-800 mb-5">
            Un interlocuteur unique<br />
            <span
              style={{
                background: 'linear-gradient(135deg,#C95C35,#8B74CA)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              dans votre quotidien.
            </span>
          </h2>
          <p className="reveal text-ardoise-500 text-lg max-w-xl mx-auto">
            Aujourd'hui un simple soutien informatique ne suffit plus. Nous couvrons les 3 piliers de l'informatique médicale moderne.
          </p>
        </div>

        <div className="reveal grid lg:grid-cols-5 gap-8 items-start">

          {/* ── Onglets gauche ── */}
          <div className="lg:col-span-2 flex flex-row lg:flex-col gap-3">
            {OFFRES.map((offre, i) => {
              const s      = COLOR_STYLES[offre.color]
              const Icon   = ICONS[offre.icon] ?? Monitor
              const isActive = active === i

              return (
                <button
                  key={offre.id}
                  onClick={() => setActive(i)}
                  className="flex items-center gap-4 p-4 rounded-xl2 text-left transition-all duration-250 w-full group"
                  style={isActive ? s.tabActive : s.tabIdle}
                  aria-pressed={isActive}
                  aria-label={`Voir l'offre ${offre.title}`}
                >
                  {/* Icône */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    style={{
                      background: isActive ? 'rgba(255,255,255,0.2)' : s.iconBg,
                    }}
                    aria-hidden="true"
                  >
                    <Icon
                      size={18}
                      style={{ color: isActive ? '#fff' : s.iconColor }}
                    />
                  </div>

                  {/* Texte */}
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-xs font-bold uppercase tracking-wider mb-0.5 opacity-60"
                    >
                      {offre.number}
                    </div>
                    <div className="font-semibold text-sm truncate">{offre.title}</div>
                  </div>

                  {/* Flèche active */}
                  <ChevronRight
                    size={16}
                    className={`flex-shrink-0 transition-all duration-200 ${isActive ? 'opacity-80' : 'opacity-20 group-hover:opacity-50'}`}
                  />
                </button>
              )
            })}

            {/* Encart contact rapide */}
            <div
              className="mt-2 rounded-xl2 p-5 hidden lg:block"
              style={{
                background: 'linear-gradient(135deg,rgba(201,92,53,0.06),rgba(240,188,42,0.05))',
                border: '1px solid rgba(201,92,53,0.14)',
              }}
            >
              <p className="text-xs font-semibold text-ardoise-700 mb-1">Besoin d'un conseil ?</p>
              <p className="text-xs text-ardoise-500 mb-3">Notre équipe répond à toutes vos questions sans engagement.</p>
              <a
                href="tel:0499530532"
                className="text-xs font-bold text-terra-600 hover:text-terra-700 transition-colors"
              >
                → 04 99 53 05 32
              </a>
            </div>
          </div>

          {/* ── Panneau droite ── */}
          <div
            className="lg:col-span-3 bg-white rounded-xl3 p-8 md:p-10"
            style={{ border: '1px solid rgba(232,213,200,0.7)', boxShadow: '0 8px 40px rgba(44,30,16,0.07)' }}
          >
            <OffrePanel key={active} offre={OFFRES[active]} />
          </div>
        </div>
      </div>
    </section>
  )
}
