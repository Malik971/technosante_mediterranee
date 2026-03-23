import { useState } from 'react'
import { MonitorDot, Wrench, PhoneCall, ChevronRight, Clock, AlertCircle } from 'lucide-react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { MODES_ASSISTANCE } from '../../../constants/siteData'
import Tag from '../../../components/ui/Tag'

const ICONS = { 'monitor-dot': MonitorDot, wrench: Wrench, 'phone-call': PhoneCall }

const COLOR_STYLES = {
  terra: {
    tag:          'terra',
    tabActive:    { background: 'linear-gradient(135deg,#C95C35,#A54428)', color: '#fff', boxShadow: '0 4px 16px rgba(201,92,53,0.30)' },
    tabIdle:      { background: '#fff', color: '#5A4428', border: '1px solid rgba(201,92,53,0.18)' },
    iconBg:       'linear-gradient(135deg,#FDE0D0,#FAC0A0)',
    iconColor:    '#C95C35',
    delayBg:      'rgba(201,92,53,0.08)',
    delayColor:   '#A54428',
    delayBorder:  'rgba(201,92,53,0.18)',
    stepNumBg:    'linear-gradient(135deg,#C95C35,#A54428)',
    noteBg:       'rgba(212,160,16,0.07)',
    noteBorder:   'rgba(212,160,16,0.18)',
    connectorColor: '#C95C35',
  },
  mer: {
    tag:          'mer',
    tabActive:    { background: 'linear-gradient(135deg,#2088BF,#0A5580)', color: '#fff', boxShadow: '0 4px 16px rgba(14,110,158,0.28)' },
    tabIdle:      { background: '#fff', color: '#063D5E', border: '1px solid rgba(14,110,158,0.18)' },
    iconBg:       'linear-gradient(135deg,#D0E8F4,#A0CDE6)',
    iconColor:    '#0E6E9E',
    delayBg:      'rgba(14,110,158,0.08)',
    delayColor:   '#0A5580',
    delayBorder:  'rgba(14,110,158,0.18)',
    stepNumBg:    'linear-gradient(135deg,#2088BF,#0A5580)',
    noteBg:       'rgba(14,110,158,0.05)',
    noteBorder:   'rgba(14,110,158,0.15)',
    connectorColor: '#0E6E9E',
  },
  garrigue: {
    tag:          'garrigue',
    tabActive:    { background: 'linear-gradient(135deg,#8B74CA,#6B54AA)', color: '#fff', boxShadow: '0 4px 16px rgba(139,116,202,0.28)' },
    tabIdle:      { background: '#fff', color: '#3C2E70', border: '1px solid rgba(139,116,202,0.18)' },
    iconBg:       'linear-gradient(135deg,#EDE8F5,#D8CEEE)',
    iconColor:    '#6B54AA',
    delayBg:      'rgba(139,116,202,0.08)',
    delayColor:   '#6B54AA',
    delayBorder:  'rgba(139,116,202,0.18)',
    stepNumBg:    'linear-gradient(135deg,#8B74CA,#6B54AA)',
    noteBg:       'rgba(139,116,202,0.05)',
    noteBorder:   'rgba(139,116,202,0.15)',
    connectorColor: '#8B74CA',
  },
}

// ── Panneau détail d'un mode ──────────────────────────────
function ModePanel({ mode }) {
  const s    = COLOR_STYLES[mode.color]
  const Icon = ICONS[mode.icon] ?? MonitorDot

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-start gap-5 mb-7">
        <div
          className="w-14 h-14 rounded-xl3 flex items-center justify-center flex-shrink-0"
          style={{ background: s.iconBg }}
          aria-hidden="true"
        >
          <Icon size={26} style={{ color: s.iconColor }} />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1.5 flex-wrap">
            <Tag variant={mode.color === 'garrigue' ? 'garrigue' : mode.color}>
              {mode.title}
            </Tag>
            {/* Badge délai */}
            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
              style={{ background: s.delayBg, color: s.delayColor, border: `1px solid ${s.delayBorder}` }}
            >
              <Clock size={11} aria-hidden="true" />
              {mode.delay} — {mode.delayLabel}
            </span>
          </div>
          <h3
            className="text-ardoise-800 font-bold"
            style={{ fontFamily: 'var(--font-body)', fontSize: '1.15rem', lineHeight: 1.3 }}
          >
            {mode.tagline}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-ardoise-500 leading-relaxed mb-8">{mode.desc}</p>

      {/* Ligne déco */}
      <div
        className="h-0.5 w-16 rounded-full mb-8"
        style={{ background: `linear-gradient(90deg, ${s.connectorColor}, transparent)` }}
        aria-hidden="true"
      />

      {/* Étapes */}
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-ardoise-400 mb-4">
          Comment ça marche
        </p>
        <ol className="space-y-4" role="list">
          {mode.steps.map((step, i) => (
            <li key={step.num} className="flex items-start gap-4">
              {/* Numéro + connecteur vertical */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: s.stepNumBg, fontFamily: 'var(--font-display)' }}
                  aria-hidden="true"
                >
                  {step.num}
                </div>
                {i < mode.steps.length - 1 && (
                  <div
                    className="w-px flex-1 mt-1"
                    style={{ minHeight: '16px', background: `linear-gradient(to bottom, ${s.connectorColor}40, transparent)` }}
                    aria-hidden="true"
                  />
                )}
              </div>
              <p className="text-ardoise-700 text-sm leading-relaxed pt-1">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Note sécurité */}
      <div
        className="flex items-start gap-3 p-4 rounded-xl"
        style={{ background: s.noteBg, border: `1px solid ${s.noteBorder}` }}
        role="note"
      >
        <AlertCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: s.delayColor }} aria-hidden="true" />
        <p className="text-xs text-ardoise-500 leading-relaxed">{mode.note}</p>
      </div>
    </div>
  )
}

export default function ModesAssistanceSection() {
  const ref            = useScrollReveal()
  const [active, setActive] = useState(0)

  return (
    <section
      className="section-padding"
      style={{ background: '#fff' }}
      id="modes-assistance"
      ref={ref}
      aria-label="Modes d'assistance"
    >
      <div className="section-inner">

        {/* En-tête */}
        <div className="text-center mb-14">
          <div className="reveal">
            <Tag variant="terra" className="mb-5">3 modes d'intervention</Tag>
          </div>
          <h2 className="reveal text-ardoise-800 mb-5">
            Choisissez votre mode<br />
            <span
              style={{
                background: 'linear-gradient(135deg,#C95C35,#8B74CA)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              d'intervention.
            </span>
          </h2>
          <p className="reveal text-ardoise-500 text-lg max-w-xl mx-auto">
            Télémaintenance, site, ou téléphone — nous adaptons notre réponse à l'urgence et à votre contrat.
          </p>
        </div>

        {/* Layout tabs + panneau */}
        <div className="reveal grid lg:grid-cols-5 gap-8 items-start">

          {/* ── Onglets verticaux gauche ── */}
          <div className="lg:col-span-2 flex flex-row lg:flex-col gap-3">
            {MODES_ASSISTANCE.map((mode, i) => {
              const s      = COLOR_STYLES[mode.color]
              const Icon   = ICONS[mode.icon] ?? MonitorDot
              const isActive = active === i

              return (
                <button
                  key={mode.id}
                  onClick={() => setActive(i)}
                  className="flex items-center gap-4 p-4 rounded-xl2 text-left transition-all duration-200 w-full group flex-1 lg:flex-none"
                  style={isActive ? s.tabActive : s.tabIdle}
                  aria-pressed={isActive}
                  aria-label={`Voir le mode ${mode.title}`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: isActive ? 'rgba(255,255,255,0.2)' : s.iconBg }}
                    aria-hidden="true"
                  >
                    <Icon size={18} style={{ color: isActive ? '#fff' : s.iconColor }} />
                  </div>
                  <div className="flex-1 min-w-0 hidden sm:block">
                    <div className="text-xs font-bold uppercase tracking-wider mb-0.5 opacity-60">{mode.number}</div>
                    <div className="font-semibold text-sm truncate">{mode.title}</div>
                    <div className="text-xs opacity-70 mt-0.5 hidden lg:block">{mode.delay}</div>
                  </div>
                  <ChevronRight
                    size={16}
                    className={`flex-shrink-0 transition-all duration-200 hidden sm:block ${isActive ? 'opacity-80' : 'opacity-20 group-hover:opacity-50'}`}
                    aria-hidden="true"
                  />
                </button>
              )
            })}
          </div>

          {/* ── Panneau droit ── */}
          <div
            className="lg:col-span-3 bg-white rounded-xl3 p-8 md:p-10"
            style={{
              border: '1px solid rgba(232,213,200,0.7)',
              boxShadow: '0 8px 40px rgba(44,30,16,0.07)',
            }}
          >
            <ModePanel key={active} mode={MODES_ASSISTANCE[active]} />
          </div>
        </div>
      </div>
    </section>
  )
}
