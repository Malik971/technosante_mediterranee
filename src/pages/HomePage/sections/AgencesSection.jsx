import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { AGENCES } from '../../../constants/siteData'
import Tag from '../../../components/ui/Tag'
import Button from '../../../components/ui/Button'

const AGENCE_STYLES = {
  montpellier: {
    tagVariant:  'terra',
    accentColor: '#C95C35',
    accentBg:    'linear-gradient(135deg,#FDE0D0,#FAC0A0)',
    cardBorder:  'rgba(201,92,53,0.18)',
    dotColor:    '#C95C35',
    btnVariant:  'terra',
    iconColor:   '#C95C35',
    mapHref:     'https://www.google.com/maps/place/TECHNOSANTE+MEDITERRANEE/@43.5667534,3.8934826,17z/data=!3m1!4b1!4m6!3m5!1s0x12b6a544064f62c9:0xf4d5662e5cce16e2!8m2!3d43.5667534!4d3.8960575!16s%2Fg%2F1v3872zf?entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D',
  },
  nice: {
    tagVariant:  'mer',
    accentColor: '#0E6E9E',
    accentBg:    'linear-gradient(135deg,#D0E8F4,#A0CDE6)',
    cardBorder:  'rgba(14,110,158,0.18)',
    dotColor:    '#0E6E9E',
    btnVariant:  'mer',
    iconColor:   '#0E6E9E',
    mapHref:     'https://www.google.com/maps/place/34+Av.+Henri+Matisse,+06200+Nice/@43.6748818,7.2117906,683m/data=!3m2!1e3!4b1!4m6!3m5!1s0x12cdd106238c8211:0x29c1529ad4170ae9!8m2!3d43.6748818!4d7.2117906!16s%2Fg%2F11nntqd0fz?hl=fr-FR&entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D',
  },
}

function AgenceCard({ agence, index }) {
  const style = AGENCE_STYLES[agence.id]

  return (
    <article
      className={`reveal reveal-delay-${index + 1} bg-white rounded-xl3 overflow-hidden transition-all duration-300`}
      style={{ border: `1px solid ${style.cardBorder}`, boxShadow: 'var(--shadow-card)' }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card)' }}
    >
      {/* Barre colorée */}
      <div className="h-2" style={{ background: style.accentBg }} aria-hidden="true" />

      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <Tag variant={style.tagVariant} className="mb-3">
              {agence.type}
            </Tag>
            <h3 className="text-ardoise-800 mb-1">{agence.city}</h3>
            <p className="text-ardoise-400 text-sm">{agence.badge}</p>
          </div>
          {/* Orbe ville */}
          <div
            className="w-12 h-12 rounded-xl2 flex items-center justify-center flex-shrink-0"
            style={{ background: style.accentBg }}
            aria-hidden="true"
          >
            <MapPin size={22} style={{ color: style.accentColor }} />
          </div>
        </div>

        {/* Infos contact */}
        <ul className="space-y-3 mb-7" role="list">
          <li>
            <a
              href={`tel:${agence.phoneRaw}`}
              className="flex items-center gap-3 text-sm text-ardoise-600 hover:text-terra-600 transition-colors group"
            >
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                style={{ background: 'rgba(201,92,53,0.08)' }}
                aria-hidden="true"
              >
                <Phone size={14} style={{ color: style.accentColor }} />
              </span>
              <span className="font-semibold group-hover:underline">{agence.phone}</span>
            </a>
          </li>
          <li>
            <a
              href={`mailto:${agence.email}`}
              className="flex items-center gap-3 text-sm text-ardoise-600 hover:text-mer-600 transition-colors group"
            >
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(14,110,158,0.08)' }}
                aria-hidden="true"
              >
                <Mail size={14} style={{ color: style.iconColor }} />
              </span>
              <span className="group-hover:underline">{agence.email}</span>
            </a>
          </li>
          <li className="flex items-start gap-3 text-sm text-ardoise-500">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(201,92,53,0.06)' }}
              aria-hidden="true"
            >
              <MapPin size={14} style={{ color: style.accentColor }} />
            </span>
            <span>{agence.address}</span>
          </li>
          <li className="flex items-center gap-3 text-sm text-ardoise-500">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(240,188,42,0.10)' }}
              aria-hidden="true"
            >
              <Clock size={14} style={{ color: '#D4A010' }} />
            </span>
            {agence.hours}
          </li>
        </ul>

        {/* Disponibilité */}
        <div
          className="flex items-center justify-between rounded-xl p-3.5 mb-6"
          style={{ background: 'rgba(97,122,54,0.06)', border: '1px solid rgba(97,122,54,0.14)' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-olive-500 animate-pulse" aria-hidden="true" />
            <span className="text-xs font-semibold text-olive-600">Techniciens disponibles</span>
          </div>
          <span className="text-xs text-olive-500">Intervention &lt; 90 min</span>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            href={`tel:${agence.phoneRaw}`}
            variant={style.btnVariant}
            className="flex-1 text-sm"
          >
            <Phone size={15} />
            Appeler
          </Button>
          <a
            href={style.mapHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-terra flex-1 text-sm text-center justify-center"
            aria-label={`Voir ${agence.city} sur la carte`}
          >
            Carte
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </article>
  )
}

export default function AgencesSection() {
  const ref = useScrollReveal()

  return (
    <section
      id="agences"
      className="section-padding"
      style={{
        background: 'linear-gradient(160deg, #EFF7FB 0%, #FDFAF6 50%, #FEF4EF 100%)',
      }}
      ref={ref}
      aria-label="Nos agences"
    >
      <div className="section-inner">

        {/* En-tête */}
        <div className="text-center mb-14">
          <div className="reveal">
            <Tag variant="mer" className="mb-5">Présence régionale</Tag>
          </div>
          <h2 className="reveal text-ardoise-800 mb-5">
            2 agences, toujours<br />
            <span
              style={{
                background: 'linear-gradient(135deg, #0E6E9E, #C95C35)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              à portée de vous.
            </span>
          </h2>
          <p className="reveal text-ardoise-500 text-lg max-w-xl mx-auto">
            Parce qu'être au plus proche de nos clients reste notre priorité, nos collaborateurs sont à moins de 90 minutes de votre cabinet.
          </p>
        </div>

        {/* Cartes */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {AGENCES.map((agence, i) => (
            <AgenceCard key={agence.id} agence={agence} index={i} />
          ))}
        </div>

        {/* Encart RALF */}
        <div
          className="reveal mt-10 max-w-3xl mx-auto rounded-xl2 p-6 flex flex-col sm:flex-row items-center gap-5"
          style={{
            background: 'linear-gradient(135deg, rgba(201,92,53,0.05), rgba(14,110,158,0.04))',
            border: '1px solid rgba(201,92,53,0.14)',
          }}
        >
          <div
            className="w-12 h-12 rounded-xl2 flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#FDE0D0,#FAC0A0)' }}
            aria-hidden="true"
          >
            <Phone size={22} style={{ color: '#C95C35' }} />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-semibold text-ardoise-800 text-sm mb-1">
              Assistance à distance disponible maintenant
            </p>
            <p className="text-ardoise-500 text-sm">
              Via <strong>RALF</strong> ou <strong>TeamViewer</strong>, notre technicien prend le contrôle de votre poste en quelques secondes — sans se déplacer.
            </p>
          </div>
          <Button href="/assistance" variant="outlineTerra" className="text-sm flex-shrink-0">
            Lancer l'assistance
          </Button>
        </div>
      </div>
    </section>
  )
}
