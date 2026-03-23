import { ArrowRight, Calendar, Clock, Rss } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ARTICLES } from '../../../constants/siteData'
import Tag from '../../../components/ui/Tag'

// Formatte "2025-03-15" → "15 mars 2025"
function formatDate(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day:   'numeric',
    month: 'long',
    year:  'numeric',
  })
}

export default function HeroActualites() {
  const featured = ARTICLES.find((a) => a.featured) ?? ARTICLES[0]
  const recents  = ARTICLES.filter((a) => !a.featured).slice(0, 3)

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(150deg, #FEF4EF 0%, #FDFAF6 45%, #EFF7FB 100%)',
        paddingTop: '100px',
        paddingBottom: '0',
      }}
      aria-label="Actualités — à la une"
    >
      {/* Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="hero-blob absolute"
          style={{ width:'460px', height:'460px', background:'radial-gradient(circle,rgba(201,92,53,0.13) 0%,transparent 70%)', top:'-130px', right:'-80px', animationDelay:'0s' }}
        />
        <div
          className="hero-blob absolute"
          style={{ width:'320px', height:'320px', background:'radial-gradient(circle,rgba(14,110,158,0.09) 0%,transparent 70%)', bottom:'-40px', left:'-40px', animationDelay:'4s' }}
        />
        <div className="absolute w-2.5 h-2.5 rounded-full bg-terra-300 opacity-50 animate-float" style={{ top:'26%', left:'7%', animationDelay:'0s' }} />
        <div className="absolute w-2 h-2 rounded-full bg-soleil-400 opacity-35 animate-float" style={{ bottom:'28%', right:'16%', animationDelay:'3s' }} />
      </div>

      <div className="relative z-10 section-inner px-6 w-full py-16">

        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <div className="animate-fade-in">
              <Tag variant="terra" className="mb-5">
                <Rss size={11} className="inline mr-1" aria-hidden="true" />
                Actualités &amp; conseils
              </Tag>
            </div>
            <h1 className="animate-fade-up text-ardoise-800" style={{ animationDelay:'0.1s' }}>
              Restez au courant<br />
              <span
                style={{
                  background: 'linear-gradient(135deg,#C95C35 20%,#F0BC2A 60%,#C95C35 90%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer-text 3.5s linear infinite',
                }}
              >
                de la santé numérique.
              </span>
            </h1>
          </div>
          <p className="animate-fade-up text-ardoise-500 text-base max-w-sm" style={{ animationDelay:'0.2s' }}>
            Ségur, cybersécurité, logiciels, matériel — notre équipe décrypte l'actualité de l'informatique médicale pour vous.
          </p>
        </div>

        {/* Featured + recents */}
        <div className="grid lg:grid-cols-3 gap-6 pb-0">

          {/* ── Article à la une — grande carte ── */}
          <Link
            to={`/actualites/${featured.slug}`}
            className="animate-fade-up lg:col-span-2 group relative rounded-xl3 overflow-hidden transition-all duration-300"
            style={{
              border: '1px solid rgba(201,92,53,0.18)',
              boxShadow: 'var(--shadow-card)',
              animationDelay: '0.15s',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card)';       e.currentTarget.style.transform = 'translateY(0)' }}
          >
            {/* Illustration */}
            <div
              className="h-52 relative overflow-hidden"
              style={{ background: featured.gradient }}
              aria-hidden="true"
            >
              {/* Formes décoratives dans l'illustration */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <svg width="180" height="120" viewBox="0 0 180 120" fill="none">
                  <circle cx="90" cy="60" r="50" stroke="white" strokeWidth="1.5" strokeDasharray="6 4"/>
                  <circle cx="90" cy="60" r="30" stroke="white" strokeWidth="1" strokeDasharray="4 6"/>
                  <path d="M90 30V90M60 60H120" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div
                className="absolute top-5 left-5 text-xs font-bold px-3 py-1.5 rounded-full text-white"
                style={{ background: 'rgba(0,0,0,0.25)', backdropFilter:'blur(8px)' }}
              >
                À la une
              </div>
            </div>

            {/* Contenu */}
            <div className="bg-white p-7">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Tag variant={featured.category === 'segur' ? 'mer' : featured.category === 'securite' ? 'terra' : 'garrigue'}>
                  {featured.category}
                </Tag>
                <span className="flex items-center gap-1.5 text-xs text-ardoise-400">
                  <Calendar size={11} aria-hidden="true" />
                  {formatDate(featured.date)}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-ardoise-400">
                  <Clock size={11} aria-hidden="true" />
                  {featured.readTime} de lecture
                </span>
              </div>
              <h2
                className="text-ardoise-800 mb-3 leading-snug transition-colors duration-200 group-hover:text-terra-600"
                style={{ fontFamily:'var(--font-display)', fontSize:'1.3rem', fontWeight:700 }}
              >
                {featured.title}
              </h2>
              <p className="text-ardoise-500 text-sm leading-relaxed mb-5 line-clamp-2">
                {featured.excerpt}
              </p>
              <span
                className="inline-flex items-center gap-1.5 text-sm font-bold transition-colors duration-200"
                style={{ color: featured.accentColor, fontFamily:'var(--font-body)' }}
              >
                Lire l'article
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
          </Link>

          {/* ── Colonne 3 articles récents ── */}
          <div className="flex flex-col gap-4">
            {recents.map((article, i) => (
              <Link
                key={article.id}
                to={`/actualites/${article.slug}`}
                className={`animate-fade-up group bg-white rounded-xl2 overflow-hidden flex gap-4 p-5 transition-all duration-200`}
                style={{
                  border: '1px solid rgba(232,213,200,0.7)',
                  boxShadow: 'var(--shadow-card)',
                  animationDelay: `${0.2 + i * 0.08}s`,
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'; e.currentTarget.style.transform = 'translateX(3px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card)';       e.currentTarget.style.transform = 'translateX(0)' }}
              >
                {/* Miniature */}
                <div
                  className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center"
                  style={{ background: article.gradient }}
                  aria-hidden="true"
                >
                  <div className="w-5 h-5 rounded-full bg-white opacity-40" />
                </div>
                {/* Texte */}
                <div className="flex-1 min-w-0">
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: article.accentColor }}
                  >
                    {article.category}
                  </span>
                  <h3
                    className="text-ardoise-800 text-sm font-semibold leading-snug mt-0.5 mb-1 line-clamp-2 group-hover:text-terra-600 transition-colors"
                    style={{ fontFamily:'var(--font-body)' }}
                  >
                    {article.title}
                  </h3>
                  <p className="text-ardoise-400 text-xs">{formatDate(article.date)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Vague transition */}
      <div className="overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 50" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0,25 C360,50 720,0 1080,25 C1260,38 1380,28 1440,25 L1440,50 L0,50 Z" fill="#FDFAF6"/>
        </svg>
      </div>
    </section>
  )
}