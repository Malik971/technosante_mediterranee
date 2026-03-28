import { useState, useEffect } from 'react'
import { ArrowRight, Calendar, Clock, Rss } from 'lucide-react'
import { Link } from 'react-router-dom'
import Tag from '../../../components/ui/Tag'

const API = import.meta.env.VITE_API_URL || '/api'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

const CAT_VARIANT = {
  segur: 'mer', logiciel: 'garrigue', securite: 'terra', materiel: 'soleil', 'sante-num': 'olive',
}

export default function HeroActualites() {
  const [featured, setFeatured] = useState(null)
  const [recents,  setRecents]  = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    fetch(`${API}/articles?limit=4`)
      .then(r => r.json())
      .then(data => {
        const items = data.items ?? []
        const feat  = items.find(a => a.featured) ?? items[0] ?? null
        setFeatured(feat)
        setRecents(items.filter(a => a.id !== feat?.id).slice(0, 3))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(150deg, #FEF4EF 0%, #FDFAF6 45%, #EFF7FB 100%)', paddingTop: '100px', paddingBottom: '0' }}
      aria-label="Actualités — à la une"
    >
      {/* Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="hero-blob absolute" style={{ width:'460px', height:'460px', background:'radial-gradient(circle,rgba(201,92,53,0.13) 0%,transparent 70%)', top:'-130px', right:'-80px' }} />
        <div className="hero-blob absolute" style={{ width:'320px', height:'320px', background:'radial-gradient(circle,rgba(14,110,158,0.09) 0%,transparent 70%)', bottom:'-40px', left:'-40px', animationDelay:'4s' }} />
      </div>

      <div className="relative z-10 section-inner px-6 w-full py-16">

        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <Tag variant="terra" className="mb-5">
              <Rss size={11} className="inline mr-1" aria-hidden="true" />
              Actualités &amp; conseils
            </Tag>
            <h1 className="animate-fade-up text-ardoise-800">
              Restez au courant<br />
              <span style={{ background:'linear-gradient(135deg,#C95C35 20%,#F0BC2A 60%,#C95C35 90%)', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', animation:'shimmer-text 3.5s linear infinite' }}>
                de la santé numérique.
              </span>
            </h1>
          </div>
          <p className="text-ardoise-500 text-base max-w-sm">
            Ségur, cybersécurité, logiciels, matériel — notre équipe décrypte l'actualité de l'informatique médicale pour vous.
          </p>
        </div>

        {/* Skeleton pendant chargement */}
        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', paddingBottom: '0' }}>
            <div style={{ height: '320px', borderRadius: '20px', background: 'linear-gradient(135deg,#FDE0D0,#FAC0A0)', opacity: 0.4, animation: 'pulse 1.5s ease-in-out infinite' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[1,2,3].map(i => <div key={i} style={{ height: '88px', borderRadius: '14px', background: '#F2E5D0', opacity: 0.4 }} />)}
            </div>
            <style>{`@keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:0.7} }`}</style>
          </div>
        )}

        {/* Contenu chargé */}
        {!loading && featured && (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '24px' }} className="flex flex-col lg:grid">

            {/* Article à la une */}
            <Link
              to={`/actualites/${featured.slug}`}
              className="group relative rounded-xl3 overflow-hidden transition-all duration-300"
              style={{ border:'1px solid rgba(201,92,53,0.18)', boxShadow:'var(--shadow-card)', textDecoration:'none' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow='var(--shadow-card-hover)'; e.currentTarget.style.transform='translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow='var(--shadow-card)';       e.currentTarget.style.transform='translateY(0)' }}
            >
              <div style={{ height: '200px', background: featured.gradient ?? 'linear-gradient(135deg,#FDE0D0,#FAC0A0)', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', opacity:0.15 }}>
                  <svg width="160" height="100" viewBox="0 0 160 100" fill="none">
                    <circle cx="80" cy="50" r="40" stroke="white" strokeWidth="1.5" strokeDasharray="6 4"/>
                    <circle cx="80" cy="50" r="22" stroke="white" strokeWidth="1" strokeDasharray="4 6"/>
                  </svg>
                </div>
                <div style={{ position:'absolute', top:'16px', left:'16px', fontSize:'11px', fontWeight:700, color:'white', padding:'5px 12px', borderRadius:'100px', background:'rgba(0,0,0,0.25)', backdropFilter:'blur(6px)' }}>
                  À la une
                </div>
              </div>
              <div style={{ background:'white', padding:'24px' }}>
                <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:'10px', marginBottom:'12px' }}>
                  <Tag variant={CAT_VARIANT[featured.category] ?? 'terra'}>{featured.category}</Tag>
                  {featured.publishedAt && (
                    <span style={{ display:'flex', alignItems:'center', gap:'5px', fontSize:'12px', color:'#B8905E' }}>
                      <Calendar size={11} /> {formatDate(featured.publishedAt)}
                    </span>
                  )}
                  <span style={{ display:'flex', alignItems:'center', gap:'5px', fontSize:'12px', color:'#B8905E' }}>
                    <Clock size={11} /> {featured.readTime}
                  </span>
                </div>
                <h2 style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', fontWeight:700, color:'#2C1E10', lineHeight:1.3, marginBottom:'10px' }}
                    className="group-hover:text-terra-600 transition-colors">
                  {featured.title}
                </h2>
                <p style={{ color:'#5A4428', fontSize:'14px', lineHeight:1.7, marginBottom:'16px', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                  {featured.excerpt}
                </p>
                <span style={{ display:'inline-flex', alignItems:'center', gap:'6px', fontSize:'13px', fontWeight:700, color: featured.accentColor ?? '#C95C35' }}>
                  Lire l'article
                  <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>

            {/* 3 récents */}
            <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
              {recents.map(article => (
                <Link
                  key={article.id}
                  to={`/actualites/${article.slug}`}
                  className="group flex items-start gap-3 p-4 rounded-xl2 bg-white transition-all duration-200"
                  style={{ border:'1px solid rgba(232,213,200,0.7)', boxShadow:'var(--shadow-card)', textDecoration:'none' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow='var(--shadow-card-hover)'; e.currentTarget.style.transform='translateX(3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow='var(--shadow-card)';       e.currentTarget.style.transform='translateX(0)' }}
                >
                  <div style={{ width:'48px', height:'48px', borderRadius:'12px', flexShrink:0, background: article.gradient ?? 'linear-gradient(135deg,#FDE0D0,#FAC0A0)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <div style={{ width:'16px', height:'16px', borderRadius:'50%', background:'rgba(255,255,255,0.4)' }} />
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <span style={{ fontSize:'11px', fontWeight:700, color: article.accentColor ?? '#C95C35', display:'block', marginBottom:'3px' }}>
                      {article.category}
                    </span>
                    <p style={{ fontSize:'13px', fontWeight:600, color:'#2C1E10', lineHeight:1.4, marginBottom:'3px', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}
                       className="group-hover:text-terra-600 transition-colors">
                      {article.title}
                    </p>
                    {article.publishedAt && (
                      <p style={{ fontSize:'11px', color:'#B8905E' }}>{formatDate(article.publishedAt)}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Vague */}
      <div className="overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 50" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0,25 C360,50 720,0 1080,25 C1260,38 1380,28 1440,25 L1440,50 L0,50 Z" fill="#FDFAF6"/>
        </svg>
      </div>
    </section>
  )
}