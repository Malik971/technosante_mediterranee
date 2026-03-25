import { ArrowRight, Stethoscope, Building2, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { SERVICES } from '../../../constants/siteData'
import Tag from '../../../components/ui/Tag'

const ICONS = {
  stethoscope: Stethoscope,
  tooth:       Sparkles,
  building:    Building2,
}

const COLOR_MAP = {
  terra: {
    tag:         'terra',
    iconBg:      'linear-gradient(135deg, #FDE0D0, #FAC0A0)',
    iconColor:   '#C95C35',
    checkColor:  '#C95C35',
    linkColor:   '#C95C35',
    cardBorder:  'rgba(201,92,53,0.18)',
    accentTop:   'linear-gradient(135deg, #FDE0D0, #FAC0A0)',
  },
  mer: {
    tag:         'mer',
    iconBg:      'linear-gradient(135deg, #D0E8F4, #A0CDE6)',
    iconColor:   '#0E6E9E',
    checkColor:  '#0E6E9E',
    linkColor:   '#0E6E9E',
    cardBorder:  'rgba(14,110,158,0.22)',
    accentTop:   'linear-gradient(135deg, #D0E8F4, #A0CDE6)',
  },
  garrigue: {
    tag:         'garrigue',
    iconBg:      'linear-gradient(135deg, #EDE8F5, #D8CEEE)',
    iconColor:   '#6B54AA',
    checkColor:  '#6B54AA',
    linkColor:   '#6B54AA',
    cardBorder:  'rgba(139,116,202,0.18)',
    accentTop:   'linear-gradient(135deg, #EDE8F5, #D8CEEE)',
  },
}

function ServiceCard({ service, index }) {
  const c    = COLOR_MAP[service.color]
  const Icon = ICONS[service.icon] ?? Sparkles

  return (
    <article
      className={`reveal reveal-delay-${index + 1} relative bg-white overflow-hidden flex flex-col`}
      style={{ border: `1px solid ${c.cardBorder}`, borderRadius: '20px', boxShadow: 'var(--shadow-card)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'; e.currentTarget.style.transform = 'translateY(-5px)' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card)';       e.currentTarget.style.transform = 'translateY(0)' }}
    >
      {/* Barre de couleur en haut */}
      <div style={{ height: '6px', width: '100%', background: c.accentTop }} aria-hidden="true" />

      <div className="p-8 flex flex-col flex-1">
        {/* Icône */}
        <div
          style={{ width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', flexShrink: 0, background: c.iconBg }}
          aria-hidden="true"
        >
          <Icon size={22} style={{ color: c.iconColor }} />
        </div>

        {/* Tag + titre */}
        <Tag variant={service.color === 'garrigue' ? 'garrigue' : service.color} className="mb-3 self-start">
          {service.subtitle}
        </Tag>
        <h3 className="text-ardoise-800 mb-3">{service.title}</h3>
        <p className="text-ardoise-500 text-sm leading-relaxed mb-6">{service.description}</p>

        {/* Liste features */}
        <ul className="mb-8 flex-1" role="list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {service.features.map((feat) => (
            <li key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#5A4428' }}>
              <span
                style={{ width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px', background: c.checkColor, color: 'white', fontSize: '10px', fontWeight: 700 }}
                aria-hidden="true"
              >
                ✓
              </span>
              {feat}
            </li>
          ))}
        </ul>

        {/* CTA — Link vers la page détail */}
        <Link
          to={service.href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold mt-auto group"
          style={{ color: c.linkColor, textDecoration: 'none' }}
          aria-label={`En savoir plus sur ${service.title}`}
        >
          En savoir plus
          <ArrowRight
            size={15}
            style={{ transition: 'transform 0.2s' }}
            className="group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  )
}

export default function ServicesSection() {
  const ref = useScrollReveal()

  return (
    <section
      id="services"
      className="section-padding bg-texture-sable"
      ref={ref}
      aria-label="Nos services"
    >
      <div className="section-inner">

        <div className="text-center mb-16">
          <div className="reveal">
            <Tag variant="terra" className="mb-5">Nos expertises</Tag>
          </div>
          <h2 className="reveal text-ardoise-800 mb-5">
            Un seul interlocuteur.<br />
            <span style={{ background: 'linear-gradient(135deg, #C95C35, #0E6E9E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Toutes vos problématiques.
            </span>
          </h2>
          <p className="reveal text-ardoise-500 text-lg max-w-xl mx-auto">
            Du cabinet solo à l'établissement multi-sites — nous couvrons l'intégralité de votre écosystème informatique médical.
          </p>
        </div>

        {/* Grille — 3 colonnes desktop, 1 mobile */}
        <div className="grid md:grid-cols-3 gap-7">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}