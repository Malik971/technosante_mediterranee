import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Search, SlidersHorizontal, RefreshCw } from 'lucide-react'
import { ARTICLES as ARTICLES_STATIC, ARTICLES_PER_PAGE, CATEGORIES_ACTU } from '../../../constants/siteData'
import ArticleCard from '../ArticleCard'
import FilterBar   from '../FilterBar'
import Pagination  from '../Pagination'
import Tag from '../../../components/ui/Tag'

const PER_PAGE = ARTICLES_PER_PAGE || 6

/**
 * Construit l'URL de l'API. Si VITE_API_URL n'est pas défini,
 * on utilise le proxy Vite /api (qui pointe sur localhost:3001 en dev).
 */
function getApiUrl() {
  const base = import.meta.env.VITE_API_URL
  // base vide, undefined, ou placeholder → proxy Vite
  if (!base || base === 'undefined' || base.includes('ton-serveur')) return '/api'
  return base
}

// Calcule les compteurs de catégories depuis un tableau d'articles
function buildCounts(articles) {
  const counts = { all: articles.length }
  articles.forEach(a => {
    counts[a.category] = (counts[a.category] ?? 0) + 1
  })
  return counts
}

export default function GrilleArticlesSection() {
  // On utilise un ref simple (pas useScrollReveal) car les cartes
  // sont rendues APRÈS le fetch — l'IntersectionObserver classique
  // ne les verrait jamais (il tourne une seule fois au montage).
  const ref = useRef(null)


  // ── Filtres ──────────────────────────────────────────────
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery,  setSearchQuery]  = useState('')
  const [page,         setPage]         = useState(1)

  // ── Données ──────────────────────────────────────────────
  // Fallback immédiat : on part avec les données statiques
  const [articles,    setArticles]    = useState(ARTICLES_STATIC)
  const [total,       setTotal]       = useState(ARTICLES_STATIC.length)
  const [pages,       setPages]       = useState(Math.ceil(ARTICLES_STATIC.length / PER_PAGE))
  const [counts,      setCounts]      = useState(buildCounts(ARTICLES_STATIC))
  const [loading,     setLoading]     = useState(false)
  const [apiError,    setApiError]    = useState(false)
  const [usingStatic, setUsingStatic] = useState(true)

  // ── Fetch API ─────────────────────────────────────────────
  const fetchArticles = useCallback(async () => {
    setLoading(true)
    setApiError(false)

    const API = getApiUrl()
    const params = new URLSearchParams({ page, limit: PER_PAGE })
    if (activeFilter !== 'all') params.append('category', activeFilter)

    try {
      const res = await fetch(`${API}/articles?${params}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()

      setArticles(data.items ?? [])
      setTotal(data.total ?? 0)
      setPages(data.pages ?? 1)
      setUsingStatic(false)

      // Pour les compteurs : on fetche TOUS les articles sans filtre
      // pour avoir les totaux par catégorie
      if (activeFilter === 'all') {
        setCounts(buildCounts(data.items ?? []))
      }
    } catch (err) {
      console.warn('[GrilleArticles] API indisponible, affichage des données statiques :', err.message)
      setApiError(true)
      setUsingStatic(true)
      // Fallback : filtrer les données statiques
      const filtered = activeFilter === 'all'
        ? ARTICLES_STATIC
        : ARTICLES_STATIC.filter(a => a.category === activeFilter || a.tags?.includes(activeFilter))
      const start = (page - 1) * PER_PAGE
      setArticles(filtered.slice(start, start + PER_PAGE))
      setTotal(filtered.length)
      setPages(Math.ceil(filtered.length / PER_PAGE))
      setCounts(buildCounts(ARTICLES_STATIC))
    } finally {
      setLoading(false)
    }
  }, [activeFilter, page])

  useEffect(() => { fetchArticles() }, [fetchArticles])

  // ── Filtre texte côté client ──────────────────────────────
  const displayed = useMemo(() => {
    if (!searchQuery.trim()) return articles
    const q = searchQuery.toLowerCase()
    return articles.filter(a =>
      a.title?.toLowerCase().includes(q) ||
      a.excerpt?.toLowerCase().includes(q)
    )
  }, [articles, searchQuery])

  // Révèle les cartes après le fetch — doit être APRÈS displayed
  // car l'IntersectionObserver classique tourne avant que les cartes
  // soient dans le DOM ; on force manuellement la classe "visible".
  useEffect(() => {
    if (loading) return
    const el = ref.current
    if (!el) return
    const timer = setTimeout(() => {
      el.querySelectorAll('.reveal').forEach(node => node.classList.add('visible'))
    }, 50)
    return () => clearTimeout(timer)
  }, [loading, displayed])

  const handleFilter = (id) => {
    setActiveFilter(id)
    setPage(1)
    setSearchQuery('')
  }

  const handlePageChange = (n) => {
    setPage(n)
    document.getElementById('articles-grid')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      className="section-padding bg-texture-sable"
      id="articles-grid"
      ref={ref}
      aria-label="Tous les articles"
    >
      <div className="section-inner">

        {/* ── En-tête ── */}
        <div
          style={{ display:'flex', flexWrap:'wrap', alignItems:'flex-start', justifyContent:'space-between', gap:'20px', marginBottom:'32px' }}
          className="reveal"
        >
          <div>
            <Tag variant="terra" className="mb-3">Tous les articles</Tag>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.4rem,2.5vw,1.9rem)', fontWeight:700, color:'#2C1E10' }}>
              {loading ? 'Chargement…' : (
                <>
                  {searchQuery ? displayed.length : total}{' '}
                  article{(searchQuery ? displayed.length : total) > 1 ? 's' : ''}
                  {activeFilter !== 'all' && <span style={{ color:'#C95C35' }}> · filtrés</span>}
                  {usingStatic && !apiError && (
                    <span style={{ fontSize:'12px', color:'#B8905E', fontWeight:400, marginLeft:'8px' }}>
                      (données locales)
                    </span>
                  )}
                </>
              )}
            </h2>
          </div>

          {/* Recherche + bouton retry si erreur */}
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            {apiError && (
              <button
                onClick={fetchArticles}
                style={{ display:'inline-flex', alignItems:'center', gap:'6px', fontSize:'12px', fontWeight:600, padding:'8px 14px', borderRadius:'10px', background:'rgba(201,92,53,0.08)', color:'#C95C35', border:'1px solid rgba(201,92,53,0.20)', cursor:'pointer' }}
                title="Réessayer de contacter l'API"
              >
                <RefreshCw size={13} /> Réessayer
              </button>
            )}
            <div style={{ position:'relative', maxWidth:'280px', width:'100%' }}>
              <Search size={15} style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', color:'#B8905E', pointerEvents:'none' }} aria-hidden="true" />
              <input
                type="search"
                placeholder="Rechercher…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="input-med"
                style={{ paddingLeft:'36px', fontSize:'14px' }}
                aria-label="Rechercher dans les articles"
              />
            </div>
          </div>
        </div>

        {/* ── Filtres avec compteurs venant de l'API ── */}
        <div className="reveal mb-10">
          <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'12px' }}>
            <SlidersHorizontal size={14} style={{ color:'#C95C35' }} aria-hidden="true" />
            <span style={{ fontSize:'11px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'#B8905E' }}>
              Filtrer par thème
            </span>
          </div>
          {/* On passe les compteurs calculés depuis les vraies données (API ou statiques) */}
          <FilterBar
            activeFilter={activeFilter}
            onFilter={handleFilter}
            counts={counts}
          />
        </div>

        {/* ── Spinner chargement ── */}
        {loading && (
          <div style={{ textAlign:'center', padding:'60px 0' }}>
            <div style={{ width:'28px', height:'28px', border:'3px solid rgba(201,92,53,0.2)', borderTopColor:'#C95C35', borderRadius:'50%', margin:'0 auto 14px', animation:'tspin 0.8s linear infinite' }} aria-hidden="true" />
            <p style={{ color:'#B8905E', fontSize:'14px' }}>Chargement…</p>
            <style>{`@keyframes tspin { to { transform: rotate(360deg) } }`}</style>
          </div>
        )}

        {/* ── Grille articles ── */}
        {!loading && displayed.length > 0 && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {displayed.map((article, i) => (
                <ArticleCard key={article.id ?? article.slug} article={article} delay={i * 60} />
              ))}
            </div>

            {/* Pagination — uniquement si on est sur l'API (pas de search) */}
            {pages > 1 && !searchQuery && (
              <>
                <p style={{ textAlign:'center', fontSize:'13px', color:'#B8905E', marginTop:'28px' }}>
                  Page {page} sur {pages} · {total} articles
                </p>
                <Pagination
                  page={page}
                  totalPages={pages}
                  goTo={handlePageChange}
                  hasNext={page < pages}
                  hasPrev={page > 1}
                />
              </>
            )}
          </>
        )}

        {/* ── Empty state ── */}
        {!loading && displayed.length === 0 && (
          <div style={{ textAlign:'center', padding:'80px 20px', borderRadius:'20px', border:'1px dashed rgba(201,92,53,0.20)', background:'linear-gradient(135deg,rgba(201,92,53,0.03),rgba(14,110,158,0.02))' }}>
            <div style={{ width:'52px', height:'52px', borderRadius:'16px', background:'linear-gradient(135deg,#FDE0D0,#FAC0A0)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 18px' }} aria-hidden="true">
              <Search size={22} style={{ color:'#C95C35' }} />
            </div>
            <h3 style={{ fontFamily:'var(--font-body)', fontSize:'1.05rem', fontWeight:600, color:'#2C1E10', marginBottom:'8px' }}>
              Aucun article trouvé
            </h3>
            <p style={{ color:'#B8905E', fontSize:'14px', marginBottom:'20px' }}>
              Essayez un autre filtre ou modifiez votre recherche.
            </p>
            <button
              onClick={() => { setActiveFilter('all'); setSearchQuery('') }}
              className="btn-outline-terra text-sm"
            >
              Voir tous les articles
            </button>
          </div>
        )}
      </div>
    </section>
  )
}