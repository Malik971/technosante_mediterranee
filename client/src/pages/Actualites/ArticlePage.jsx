import { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Phone, Calendar, Clock, Tag as TagIcon, Share2 } from 'lucide-react'
import { AGENCES } from '../../constants/siteData'
import Tag from '../../components/ui/Tag'

const API = import.meta.env.VITE_API_URL || '/api'

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

const CAT_LABELS  = { segur:'Ségur du Numérique', logiciel:'Logiciel métier', securite:'Cybersécurité', materiel:'Matériel', 'sante-num':'Santé numérique' }
const CAT_VARIANT = { segur:'mer', logiciel:'garrigue', securite:'terra', materiel:'soleil', 'sante-num':'olive' }

function RelatedCard({ article }) {
  return (
    <Link
      to={`/actualites/${article.slug}`}
      className="group flex items-start gap-3 p-4 rounded-xl bg-white transition-all duration-200"
      style={{ border:'1px solid rgba(232,213,200,0.7)', boxShadow:'var(--shadow-card)', textDecoration:'none' }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow='var(--shadow-card-hover)'; e.currentTarget.style.transform='translateX(3px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow='var(--shadow-card)';       e.currentTarget.style.transform='translateX(0)' }}
    >
      <div style={{ width:'44px', height:'44px', borderRadius:'10px', flexShrink:0, background: article.gradient ?? 'linear-gradient(135deg,#FDE0D0,#FAC0A0)', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ width:'14px', height:'14px', borderRadius:'50%', background:'rgba(255,255,255,0.4)' }} />
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <p style={{ fontSize:'11px', fontWeight:700, color: article.accentColor ?? '#C95C35', marginBottom:'3px' }}>
          {CAT_LABELS[article.category] ?? article.category}
        </p>
        <p style={{ fontSize:'13px', fontWeight:600, color:'#2C1E10', lineHeight:1.35, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}
           className="group-hover:text-terra-600 transition-colors">
          {article.title}
        </p>
        {article.publishedAt && <p style={{ fontSize:'11px', color:'#B8905E', marginTop:'3px' }}>{formatDate(article.publishedAt)}</p>}
      </div>
    </Link>
  )
}

export default function ArticlePage() {
  const { slug } = useParams()

  const [article, setArticle] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setLoading(true)
    setNotFound(false)

    fetch(`${API}/articles/${slug}`)
      .then(r => { if (r.status === 404) { setNotFound(true); return null } return r.json() })
      .then(data => {
        if (!data) return
        setArticle(data)
        // Charger des articles connexes (même catégorie)
        return fetch(`${API}/articles?category=${data.category}&limit=3`)
          .then(r => r.json())
          .then(d => setRelated((d.items ?? []).filter(a => a.slug !== slug).slice(0, 3)))
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  const handleShare = () => {
    if (navigator.share) navigator.share({ title: article?.title, url: window.location.href })
    else navigator.clipboard.writeText(window.location.href).then(() => alert('Lien copié !'))
  }

  if (notFound) return <Navigate to="/actualites" replace />

  return (
    <div style={{ background: '#FDFAF6', minHeight: '100vh', paddingTop: '80px' }}>

      {/* Skeleton chargement */}
      {loading && (
        <div style={{ maxWidth:'72rem', margin:'0 auto', padding:'40px 24px' }}>
          <div style={{ height:'200px', borderRadius:'20px', background:'linear-gradient(135deg,#FDE0D0,#FAC0A0)', opacity:0.4, marginBottom:'32px', animation:'pulse 1.5s ease-in-out infinite' }} />
          {[1,2,3].map(i => <div key={i} style={{ height:'20px', background:'#F2E5D0', borderRadius:'8px', marginBottom:'12px', opacity:0.5, width: i===1?'80%':i===2?'60%':'95%' }} />)}
          <style>{`@keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:0.7} }`}</style>
        </div>
      )}

      {!loading && article && (
        <>
          {/* Bannière */}
          <div style={{ background: article.gradient ?? 'linear-gradient(135deg,#FDE0D0,#FAC0A0)' }}>
            <div style={{ maxWidth:'72rem', margin:'0 auto', padding:'0 24px' }}>

              {/* Breadcrumb */}
              <div style={{ display:'flex', alignItems:'center', gap:'8px', paddingTop:'40px', marginBottom:'24px', fontSize:'13px', color: article.accentColor, opacity:0.8 }}>
                <Link to="/" style={{ color:'inherit', textDecoration:'none' }}>Accueil</Link>
                <span>/</span>
                <Link to="/actualites" style={{ color:'inherit', textDecoration:'none' }}>Actualités</Link>
                <span>/</span>
                <span style={{ opacity:0.6, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:'300px' }}>{article.title}</span>
              </div>

              <div style={{ maxWidth:'680px', paddingBottom:'48px' }}>
                <Tag variant={CAT_VARIANT[article.category] ?? 'terra'} className="mb-5">
                  {CAT_LABELS[article.category] ?? article.category}
                </Tag>
                <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.7rem,3.5vw,2.6rem)', fontWeight:700, color:'#2C1E10', lineHeight:1.1, marginBottom:'20px' }}>
                  {article.title}
                </h1>
                <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:'16px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'14px', color:'#5A4428' }}>
                    <div style={{ width:'32px', height:'32px', borderRadius:'50%', background: article.accentColor+'22', color: article.accentColor, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:700 }}>
                      TS
                    </div>
                    {article.author}
                  </div>
                  {article.publishedAt && (
                    <span style={{ display:'flex', alignItems:'center', gap:'5px', fontSize:'13px', color:'#B8905E' }}>
                      <Calendar size={13} /> {formatDate(article.publishedAt)}
                    </span>
                  )}
                  <span style={{ display:'flex', alignItems:'center', gap:'5px', fontSize:'13px', color:'#B8905E' }}>
                    <Clock size={13} /> {article.readTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Vague */}
            <div style={{ overflow:'hidden', lineHeight:0 }} aria-hidden="true">
              <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', display:'block' }}>
                <path d="M0,20 C360,40 720,0 1080,20 C1260,30 1380,22 1440,20 L1440,40 L0,40 Z" fill="#FDFAF6"/>
              </svg>
            </div>
          </div>

          {/* Corps */}
          <div style={{ maxWidth:'72rem', margin:'0 auto', padding:'48px 24px 80px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'minmax(0,2fr) minmax(0,1fr)', gap:'48px', alignItems:'start' }}>

              {/* Article principal */}
              <article>
                {/* Chapô */}
                <p style={{ color:'#5A4428', fontSize:'17px', lineHeight:1.8, fontStyle:'italic', marginBottom:'40px', paddingBottom:'40px', borderBottom:'1px solid rgba(201,92,53,0.12)' }}>
                  {article.excerpt}
                </p>

                {/* Contenu HTML */}
                <div
                  className="prose-technosante"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Tags */}
                {article.tags?.length > 0 && (
                  <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:'8px', marginTop:'48px', paddingTop:'32px', borderTop:'1px solid rgba(232,213,200,0.7)' }}>
                    <TagIcon size={14} style={{ color:'#B8905E' }} />
                    {article.tags.map(t => (
                      <Link key={t} to={`/actualites?cat=${t}`}
                        style={{ fontSize:'12px', fontWeight:700, padding:'6px 12px', borderRadius:'100px', background:'rgba(201,92,53,0.08)', color:'#A54428', border:'1px solid rgba(201,92,53,0.18)', textDecoration:'none' }}>
                        {CAT_LABELS[t] ?? t}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:'16px', marginTop:'32px' }}>
                  <Link to="/actualites" style={{ display:'inline-flex', alignItems:'center', gap:'8px', fontSize:'14px', fontWeight:600, color:'#B8905E', textDecoration:'none' }}>
                    <ArrowLeft size={15} /> Retour aux actualités
                  </Link>
                  <button onClick={handleShare}
                    style={{ display:'inline-flex', alignItems:'center', gap:'8px', fontSize:'13px', fontWeight:600, padding:'8px 16px', borderRadius:'12px', background:'rgba(201,92,53,0.08)', color:'#C95C35', border:'1px solid rgba(201,92,53,0.18)', cursor:'pointer' }}>
                    <Share2 size={14} /> Partager
                  </button>
                </div>
              </article>

              {/* Sidebar */}
              <aside style={{ position:'sticky', top:'100px', display:'flex', flexDirection:'column', gap:'20px' }}>
                {/* CTA contact */}
                <div style={{ borderRadius:'16px', padding:'20px', background:'linear-gradient(135deg,rgba(201,92,53,0.07),rgba(240,188,42,0.05))', border:'1px solid rgba(201,92,53,0.16)' }}>
                  <p style={{ fontWeight:700, color:'#2C1E10', fontSize:'14px', marginBottom:'6px' }}>Une question ?</p>
                  <p style={{ color:'#5A4428', fontSize:'12px', lineHeight:1.6, marginBottom:'12px' }}>Notre équipe répond par téléphone, sans engagement.</p>
                  {AGENCES.map(a => (
                    <a key={a.id} href={`tel:${a.phoneRaw}`}
                      style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'13px', fontWeight:700, color:'#C95C35', textDecoration:'none', padding:'3px 0' }}>
                      <Phone size={13} /> {a.city} · {a.phone}
                    </a>
                  ))}
                </div>

                {/* Articles connexes */}
                {related.length > 0 && (
                  <div>
                    <p style={{ fontSize:'11px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'#B8905E', marginBottom:'12px' }}>
                      Articles connexes
                    </p>
                    <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                      {related.map(a => <RelatedCard key={a.id} article={a} />)}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </>
      )}

      {/* Styles prose */}
      <style>{`
        .prose-technosante h2 { font-family:var(--font-display); font-size:1.3rem; font-weight:700; color:#2C1E10; margin:2rem 0 0.75rem; padding-bottom:0.5rem; border-bottom:2px solid rgba(201,92,53,0.12); }
        .prose-technosante p  { color:#5A4428; font-size:15px; line-height:1.85; margin:0 0 1rem; }
        .prose-technosante ul { list-style:none; padding:0; margin:0.5rem 0 1.25rem; }
        .prose-technosante li { color:#5A4428; font-size:15px; line-height:1.75; padding:0.3rem 0 0.3rem 1.5rem; position:relative; }
        .prose-technosante li::before { content:''; position:absolute; left:0; top:0.72rem; width:6px; height:6px; border-radius:50%; background:#C95C35; }
        .prose-technosante strong { color:#2C1E10; font-weight:600; }
      `}</style>
    </div>
  )
}