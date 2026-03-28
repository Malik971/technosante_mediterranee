import { useState, useEffect } from 'react'
import { ArrowRight, Stethoscope, Building2, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { SERVICES as SERVICES_STATIC } from '../../../constants/siteData'
import Tag from '../../../components/ui/Tag'

/**
 * ServicesSection — migrée vers l'API.
 *
 * COMMENT ÇA MARCHE :
 * 1. On démarre avec les données statiques de siteData comme fallback immédiat
 *    → l'utilisateur voit quelque chose tout de suite, même si l'API est lente
 * 2. En parallèle, on fetch /api/services
 * 3. Quand l'API répond, on remplace les données statiques par les données BDD
 *
 * C'est le pattern "optimistic UI" : on affiche d'abord ce qu'on a,
 * puis on met à jour silencieusement.
 */

const API = import.meta.env.VITE_API_URL || '/api'

// Map slug couleur → styles (inchangé)
const COLOR_MAP = {
  terra: {
    tag:        'terra',
    iconBg:     'linear-gradient(135deg, #FDE0D0, #FAC0A0)',
    iconColor:  '#C95C35',
    checkColor: '#C95C35',
    linkColor:  '#C95C35',
    cardBorder: 'rgba(201,92,53,0.18)',
    accentTop:  'linear-gradient(135deg, #FDE0D0, #FAC0A0)',
  },
  mer: {
    tag:        'mer',
    iconBg:     'linear-gradient(135deg, #D0E8F4, #A0CDE6)',
    iconColor:  '#0E6E9E',
    checkColor: '#0E6E9E',
    linkColor:  '#0E6E9E',
    cardBorder: 'rgba(14,110,158,0.22)',
    accentTop:  'linear-gradient(135deg, #D0E8F4, #A0CDE6)',
  },
  garrigue: {
    tag:        'garrigue',
    iconBg:     'linear-gradient(135deg, #EDE8F5, #D8CEEE)',
    iconColor:  '#6B54AA',
    checkColor: '#6B54AA',
    linkColor:  '#6B54AA',
    cardBorder: 'rgba(139,116,202,0.18)',
    accentTop:  'linear-gradient(135deg, #EDE8F5, #D8CEEE)',
  },
}

// Map slug icône → composant (les icônes restent statiques, pas besoin d'API)
const ICONS = {
  stethoscope: Stethoscope,
  tooth:       Sparkles,
  building:    Building2,
}

function ServiceCard({ service, index }) {
  const c    = COLOR_MAP[service.color] ?? COLOR_MAP.terra
  const Icon = ICONS[service.icon]      ?? Sparkles

  return (
    <article
      className={`reveal reveal-delay-${index + 1} relative bg-white overflow-hidden flex flex-col`}
      style={{
        border:     `1px solid ${c.cardBorder}`,
        borderRadius: '20px',
        boxShadow:  'var(--shadow-card)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'
        e.currentTarget.style.transform = 'translateY(-5px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Barre de couleur */}
      <div style={{ height: '6px', width: '100%', background: c.accentTop }} aria-hidden="true" />

      <div className="p-8 flex flex-col flex-1">
        {/* Icône */}
        <div
          style={{ width:'48px', height:'48px', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'20px', flexShrink:0, background: c.iconBg }}
          aria-hidden="true"
        >
          <Icon size={22} style={{ color: c.iconColor }} />
        </div>

        {/* Tag + titre */}
        <Tag
          variant={service.color === 'garrigue' ? 'garrigue' : service.color}
          className="mb-3 self-start"
        >
          {service.subtitle}
        </Tag>
        <h3 className="text-ardoise-800 mb-3">{service.title}</h3>
        <p className="text-ardoise-500 text-sm leading-relaxed mb-6">{service.description}</p>

        {/* Features — viennent de l'API, c'est un tableau de strings */}
        <ul
          className="mb-8 flex-1"
          role="list"
          style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'10px' }}
        >
          {(service.features ?? []).map(feat => (
            <li key={feat} style={{ display:'flex', alignItems:'flex-start', gap:'10px', fontSize:'14px', color:'#5A4428' }}>
              <span
                style={{ width:'16px', height:'16px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:'1px', background: c.checkColor, color:'white', fontSize:'10px', fontWeight:700 }}
                aria-hidden="true"
              >
                ✓
              </span>
              {feat}
            </li>
          ))}
        </ul>

        {/* CTA → page détail service */}
        <Link
          to={service.href ?? `/services/${service.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold mt-auto group"
          style={{ color: c.linkColor, textDecoration:'none' }}
          aria-label={`En savoir plus sur ${service.title}`}
        >
          En savoir plus
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

export default function ServicesSection() {
  const ref = useScrollReveal()

  /**
   * PATTERN FALLBACK → API :
   *
   * On initialise l'état avec les données statiques de siteData.
   * Comme ça, si l'API met du temps (Render free tier = cold start ~30s),
   * la page n'est pas vide — elle affiche les données hardcodées en attendant.
   *
   * Dès que l'API répond, les données sont remplacées par celles de la BDD.
   * L'admin peut alors modifier un service dans la BDD et ça se reflète
   * immédiatement sur le site après un refresh.
   */
  const [services, setServices] = useState(SERVICES_STATIC)

  useEffect(() => {
    fetch(`${API}/services`)
      .then(r => { if (!r.ok) throw new Error('API indisponible') ; return r.json() })
      .then(data => {
        // L'API renvoie un tableau de services triés par 'order'
        if (Array.isArray(data) && data.length > 0) {
          setServices(data)
        }
        // Si l'API renvoie vide ou échoue → on garde les données statiques
      })
      .catch(() => {
        // Silencieux — le fallback statique reste affiché
        console.warn('[ServicesSection] API indisponible, affichage des données statiques')
      })
  }, [])

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
            <span style={{ background:'linear-gradient(135deg, #C95C35, #0E6E9E)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              Toutes vos problématiques.
            </span>
          </h2>
          <p className="reveal text-ardoise-500 text-lg max-w-xl mx-auto">
            Du cabinet solo à l'établissement multi-sites — nous couvrons l'intégralité de votre écosystème informatique médical.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {services.map((service, i) => (
            <ServiceCard key={service.id ?? service.slug} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}