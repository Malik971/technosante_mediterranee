import { Calendar, Clock, ArrowRight } from 'lucide-react'

// Map catégorie → couleur tag
const TAG_VARIANT = {
  segur:      'mer',
  logiciel:   'garrigue',
  securite:   'terra',
  materiel:   'soleil',
  'sante-num':'olive',
}

// Formatte "2025-03-15" → "15 mars 2025"
export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day:   'numeric',
    month: 'long',
    year:  'numeric',
  })
}

// Libellés des catégories
const CAT_LABELS = {
  segur:      'Ségur du Numérique',
  logiciel:   'Logiciel métier',
  securite:   'Cybersécurité',
  materiel:   'Matériel',
  'sante-num':'Santé numérique',
}

const TAG_STYLES = {
  mer:      { bg:'rgba(14,110,158,0.09)',    color:'#0A5580',  border:'rgba(14,110,158,0.18)' },
  garrigue: { bg:'rgba(139,116,202,0.09)',   color:'#6B54AA',  border:'rgba(139,116,202,0.18)' },
  terra:    { bg:'rgba(201,92,53,0.09)',      color:'#A54428',  border:'rgba(201,92,53,0.18)' },
  soleil:   { bg:'rgba(212,160,16,0.09)',    color:'#A67808',  border:'rgba(212,160,16,0.18)' },
  olive:    { bg:'rgba(97,122,54,0.09)',     color:'#455A24',  border:'rgba(97,122,54,0.18)' },
}

export default function ArticleCard({ article, delay = 0 }) {
  const tagVariant = TAG_VARIANT[article.category] ?? 'terra'
  const tagStyle   = TAG_STYLES[tagVariant]

  return (
    <article
      className="reveal group bg-white rounded-xl3 overflow-hidden flex flex-col cursor-pointer transition-all duration-300"
      style={{
        border: '1px solid rgba(232,213,200,0.7)',
        boxShadow: 'var(--shadow-card)',
        transitionDelay: `${delay}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'
        e.currentTarget.style.transform = 'translateY(-5px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
      aria-label={`Lire l'article : ${article.title}`}
    >
      {/* Illustration */}
      <div
        className="h-44 relative overflow-hidden flex-shrink-0"
        style={{ background: article.gradient }}
        aria-hidden="true"
      >
        {/* Motif géométrique décoratif */}
        <div className="absolute inset-0 flex items-center justify-center opacity-15">
          <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
            <circle cx="60" cy="40" r="32" stroke="white" strokeWidth="1.5" strokeDasharray="5 4"/>
            <circle cx="60" cy="40" r="18" stroke="white" strokeWidth="1" strokeDasharray="3 5"/>
            <rect x="48" y="28" width="24" height="24" rx="4" stroke="white" strokeWidth="1.5" strokeDasharray="0"/>
          </svg>
        </div>
        {/* Barre colorée en bas */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: article.accentColor, opacity: 0.6 }}
        />
      </div>

      {/* Contenu */}
      <div className="p-6 flex flex-col flex-1">
        {/* Méta */}
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          {/* Tag catégorie custom */}
          <span
            className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{
              background: tagStyle.bg,
              color:      tagStyle.color,
              border:     `1px solid ${tagStyle.border}`,
            }}
          >
            {CAT_LABELS[article.category] ?? article.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-ardoise-400">
            <Calendar size={10} aria-hidden="true" />
            {formatDate(article.date)}
          </span>
          <span className="flex items-center gap-1 text-xs text-ardoise-400">
            <Clock size={10} aria-hidden="true" />
            {article.readTime}
          </span>
        </div>

        {/* Titre */}
        <h3
          className="text-ardoise-800 font-bold mb-3 leading-snug flex-1 group-hover:text-terra-600 transition-colors duration-200"
          style={{ fontFamily:'var(--font-display)', fontSize:'1.05rem' }}
        >
          {article.title}
        </h3>

        {/* Extrait */}
        <p
          className="text-ardoise-500 text-sm leading-relaxed mb-5"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {article.excerpt}
        </p>

        {/* Lien */}
        <span
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold transition-colors duration-200"
          style={{ color: article.accentColor, fontFamily:'var(--font-body)' }}
        >
          Lire l'article
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </article>
  )
}
