import { Quote } from 'lucide-react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { TEMOIGNAGES } from '../../../constants/siteData'
import Tag from '../../../components/ui/Tag'

const AVATAR_STYLES = {
  terra:    { bg: 'linear-gradient(135deg,#FDE0D0,#FAC0A0)', color: '#A54428', ring: 'rgba(201,92,53,0.25)' },
  mer:      { bg: 'linear-gradient(135deg,#D0E8F4,#A0CDE6)', color: '#0A5580', ring: 'rgba(14,110,158,0.22)' },
  garrigue: { bg: 'linear-gradient(135deg,#EDE8F5,#D8CEEE)', color: '#6B54AA', ring: 'rgba(139,116,202,0.22)' },
}

const ACCENT_COLORS = {
  terra:    '#C95C35',
  mer:      '#0E6E9E',
  garrigue: '#8B74CA',
}

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} étoiles sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          aria-hidden="true"
        >
          <path
            d="M7 1L8.63 5.08L13 5.44L9.75 8.26L10.77 12.5L7 10.27L3.23 12.5L4.25 8.26L1 5.44L5.37 5.08L7 1Z"
            fill={i < count ? '#F0BC2A' : '#E8D5AA'}
          />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ item, index }) {
  const avatarStyle = AVATAR_STYLES[item.color] ?? AVATAR_STYLES.terra
  const accentColor = ACCENT_COLORS[item.color] ?? '#C95C35'

  return (
    <article
      className={`reveal reveal-delay-${index + 1} relative bg-white rounded-xl3 p-8 flex flex-col transition-all duration-300`}
      style={{ border: '1px solid rgba(232,213,200,0.7)', boxShadow: 'var(--shadow-card)' }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card)';       e.currentTarget.style.transform = 'translateY(0)' }}
    >
      {/* Guillemet décoratif */}
      <div
        className="absolute top-5 right-6 opacity-10"
        aria-hidden="true"
      >
        <Quote size={48} style={{ color: accentColor }} />
      </div>

      {/* Étoiles */}
      <div className="mb-5">
        <StarRating count={item.stars} />
      </div>

      {/* Citation */}
      <blockquote className="flex-1 mb-7">
        <p
          className="text-ardoise-600 text-sm leading-relaxed italic"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
        >
          « {item.quote} »
        </p>
      </blockquote>

      {/* Auteur */}
      <div className="flex items-center gap-4 pt-5" style={{ borderTop: '1px solid rgba(232,213,200,0.6)' }}>
        {/* Avatar (photo si dispo, sinon initiales) */}
        {item.photo ? (
          <img
            src={item.photo}
            alt={item.author}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            style={{ boxShadow: `0 0 0 3px ${avatarStyle.ring}` }}
          />
        ) : (
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0"
            style={{
              background:  avatarStyle.bg,
              color:       avatarStyle.color,
              boxShadow:   `0 0 0 3px ${avatarStyle.ring}`,
              fontFamily:  'var(--font-display)',
            }}
            aria-hidden="true"
          >
            {item.initials}
          </div>
        )}

        <div>
          <p className="font-bold text-ardoise-800 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
            {item.author}
          </p>
          <p className="text-ardoise-400 text-xs">
            {item.role} · {item.city}
          </p>
        </div>

        {/* Badge ville */}
        <div className="ml-auto flex-shrink-0">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: `${accentColor}12`, color: accentColor }}
          >
            {item.city}
          </span>
        </div>
      </div>
    </article>
  )
}

export default function TestimonialsSection() {
  const ref = useScrollReveal()

  return (
    <section
      className="section-padding"
      style={{
        background: 'linear-gradient(160deg, #FEF4EF 0%, #FDFAF6 50%, #EFF7FB 100%)',
        borderTop:    '1px solid rgba(201,92,53,0.08)',
        borderBottom: '1px solid rgba(14,110,158,0.06)',
      }}
      ref={ref}
      aria-label="Témoignages clients"
    >
      <div className="section-inner">

        {/* En-tête */}
        <div className="text-center mb-14">
          <div className="reveal">
            <Tag variant="soleil" className="mb-5">★ Ce que disent nos clients</Tag>
          </div>
          <h2 className="reveal text-ardoise-800 mb-5">
            Ils nous font confiance<br />
            <span
              style={{
                background: 'linear-gradient(135deg,#C95C35,#F0BC2A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              depuis des années.
            </span>
          </h2>
          <p className="reveal text-ardoise-500 text-lg max-w-xl mx-auto">
            Plus de 3 000 médecins en région Occitanie et PACA nous ont choisi. Voici pourquoi.
          </p>

          {/* Note globale */}
          <div
            className="reveal inline-flex items-center gap-3 mt-6 px-5 py-3 rounded-xl"
            style={{ background: 'rgba(240,188,42,0.10)', border: '1px solid rgba(240,188,42,0.22)' }}
          >
            <div className="flex gap-0.5" aria-hidden="true">
              {[1,2,3,4,5].map(i => (
                <svg key={i} width="16" height="16" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1L8.63 5.08L13 5.44L9.75 8.26L10.77 12.5L7 10.27L3.23 12.5L4.25 8.26L1 5.44L5.37 5.08L7 1Z" fill="#F0BC2A"/>
                </svg>
              ))}
            </div>
            <p className="text-sm font-semibold text-ardoise-700">
              <span style={{ color: '#C95C35' }}>4,6/5</span> · Basé sur 200+ retours clients
            </p>
          </div>
        </div>

        {/* Grille témoignages */}
        <div className="grid md:grid-cols-3 gap-7">
          {TEMOIGNAGES.map((item, i) => (
            <TestimonialCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* TODO: supprimer ce badge une fois les vraies photos intégrées */}
        {/* Note en bas */}
        {/* <p className="reveal text-center text-xs text-ardoise-400 mt-8">
          * Témoignages clients réels. Photos à venir.
        </p> */}
      </div>
    </section>
  )
}
