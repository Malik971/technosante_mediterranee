import { ArrowRight, Stethoscope, Building2, Sparkles } from 'lucide-react'
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
    tag:        'terra',
    iconBg:     'linear-gradient(135deg, #FDE0D0, #FAC0A0)',
    iconColor:  '#C95C35',
    checkColor: '#C95C35',
    accentBg:   'rgba(201,92,53,0.04)',
    accentBorder:'rgba(201,92,53,0.20)',
    linkColor:  '#C95C35',
    cardBorder: 'rgba(201,92,53,0.18)',
  },
  mer: {
    tag:        'mer',
    iconBg:     'linear-gradient(135deg, #D0E8F4, #A0CDE6)',
    iconColor:  '#0E6E9E',
    checkColor: '#0E6E9E',
    accentBg:   'rgba(14,110,158,0.04)',
    accentBorder:'rgba(14,110,158,0.20)',
    linkColor:  '#0E6E9E',
    cardBorder: 'rgba(14,110,158,0.22)',
  },
  garrigue: {
    tag:        'garrigue',
    iconBg:     'linear-gradient(135deg, #EDE8F5, #D8CEEE)',
    iconColor:  '#6B54AA',
    checkColor: '#6B54AA',
    accentBg:   'rgba(139,116,202,0.04)',
    accentBorder:'rgba(139,116,202,0.20)',
    linkColor:  '#6B54AA',
    cardBorder: 'rgba(139,116,202,0.18)',
  },
}

function ServiceCard({ service, index }) {
  const c   = COLOR_MAP[service.color]
  const Icon = ICONS[service.icon] ?? Sparkles

  return (
    <article
      className={`reveal reveal-delay-${index + 1} relative bg-white rounded-xl3 overflow-hidden flex flex-col transition-all duration-300 service-card-hover`}
      style={{
        border:     `1px solid ${c.cardBorder}`,
        boxShadow:  'var(--shadow-card)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'; e.currentTarget.style.transform = 'translateY(-5px)' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card)';       e.currentTarget.style.transform = 'translateY(0)' }}
    >
      {/* Badge "populaire" */}
      {service.popular && (
        <div
          className="absolute top-5 right-5 text-xs font-bold px-3 py-1 rounded-full text-white"
          style={{ background: 'linear-gradient(135deg, #C95C35, #A54428)' }}
        >
          ★ Populaire
        </div>
      )}

      {/* Accent de couleur en haut */}
      <div
        className="h-1.5 w-full"
        style={{ background: c.iconBg }}
        aria-hidden="true"
      />

      <div className="p-8 flex flex-col flex-1">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl2 flex items-center justify-center mb-5 flex-shrink-0"
          style={{ background: c.iconBg }}
          aria-hidden="true"
        >
          <Icon size={22} style={{ color: c.iconColor }} />
        </div>

        {/* Titre */}
        <Tag variant={service.color === 'garrigue' ? 'garrigue' : service.color} className="mb-3 self-start">
          {service.subtitle}
        </Tag>
        <h3 className="text-ardoise-800 mb-3">{service.title}</h3>
        <p className="text-ardoise-500 text-sm leading-relaxed mb-6">{service.description}</p>

        {/* Features */}
        <ul className="space-y-2.5 mb-8 flex-1" role="list">
          {service.features.map((feat) => (
            <li key={feat} className="flex items-start gap-2.5 text-sm text-ardoise-600">
              <span
                className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                style={{ background: c.checkColor }}
                aria-hidden="true"
              >
                ✓
              </span>
              {feat}
            </li>
          ))}
        </ul>

        {/* CTA lien */}
        <a
          href={service.href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group mt-auto"
          style={{ color: c.linkColor }}
          aria-label={`En savoir plus sur ${service.title}`}
        >
          En savoir plus
          <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
        </a>
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

        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="reveal">
            <Tag variant="terra" className="mb-5">Nos expertises</Tag>
          </div>
          <h2 className="reveal text-ardoise-800 mb-5">
            Un seul interlocuteur.<br />
            <span
              style={{
                background: 'linear-gradient(135deg, #C95C35, #0E6E9E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Toutes vos problématiques.
            </span>
          </h2>
          <p className="reveal text-ardoise-500 text-lg max-w-xl mx-auto">
            Du cabinet solo à l'établissement multi-sites — nous couvrons l'intégralité de votre écosystème informatique médical.
          </p>
        </div>

        {/* Grille de cartes */}
        <div className="grid md:grid-cols-3 gap-7">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
