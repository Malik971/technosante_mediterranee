import { useState, useEffect, useMemo } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { usePagination }   from '../../../hooks/usePagination'
import { ARTICLES, ARTICLES_PER_PAGE } from '../../../constants/siteData'
import ArticleCard from '../ArticleCard'
import FilterBar   from '../FilterBar'
import Pagination  from '../Pagination'
import Tag from '../../../components/ui/Tag'

export default function GrilleArticlesSection() {
  const ref = useScrollReveal()

  // ── Filtres ──
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery,  setSearchQuery]  = useState('')

  // Filtrer les articles
  const filtered = useMemo(() => {
    let list = ARTICLES

    // Filtre catégorie
    if (activeFilter !== 'all') {
      list = list.filter((a) => a.category === activeFilter || a.tags?.includes(activeFilter))
    }

    // Filtre recherche
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q)
      )
    }

    return list
  }, [activeFilter, searchQuery])

  // ── Pagination ──
  const { page, totalPages, paged, goTo, next, prev, hasNext, hasPrev, reset } = usePagination(
    filtered,
    ARTICLES_PER_PAGE
  )

  // Reset page quand le filtre change
  useEffect(() => { reset() }, [activeFilter, searchQuery])

  const handleFilter = (id) => {
    setActiveFilter(id)
    setSearchQuery('')
  }

  return (
    <section
      className="section-padding bg-texture-sable"
      id="articles-grid"
      ref={ref}
      aria-label="Tous les articles"
    >
      <div className="section-inner">

        {/* En-tête section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="reveal">
            <Tag variant="terra" className="mb-3">Tous les articles</Tag>
            <h2
              className="text-ardoise-800"
              style={{ fontSize:'clamp(1.5rem,2.5vw,2rem)', fontWeight:700 }}
            >
              {filtered.length} article{filtered.length > 1 ? 's' : ''}
              {activeFilter !== 'all' && (
                <span className="text-terra-500"> · filtrés</span>
              )}
            </h2>
          </div>

          {/* Recherche */}
          <div className="reveal relative max-w-xs w-full">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ardoise-400 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Rechercher un article…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-med pl-10 text-sm"
              aria-label="Rechercher dans les articles"
            />
          </div>
        </div>

        {/* Filtres catégories */}
        <div className="reveal mb-10">
          <div className="flex items-center gap-3 mb-4">
            <SlidersHorizontal size={15} style={{ color:'#C95C35' }} aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-wider text-ardoise-400">
              Filtrer par thème
            </span>
          </div>
          <FilterBar activeFilter={activeFilter} onFilter={handleFilter} />
        </div>

        {/* ── Grille ── */}
        {paged.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {paged.map((article, i) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  delay={i * 60}
                />
              ))}
            </div>

            {/* Info pagination */}
            {totalPages > 1 && (
              <p className="text-center text-sm text-ardoise-400 mt-8">
                Page {page} sur {totalPages} · {filtered.length} article{filtered.length > 1 ? 's' : ''}
              </p>
            )}

            {/* Pagination */}
            <Pagination
              page={page}
              totalPages={totalPages}
              goTo={goTo}
              hasNext={hasNext}
              hasPrev={hasPrev}
            />
          </>
        ) : (
          /* ── Empty state ── */
          <div
            className="reveal text-center py-20 rounded-xl3"
            style={{
              background: 'linear-gradient(135deg,rgba(201,92,53,0.04),rgba(14,110,158,0.03))',
              border: '1px dashed rgba(201,92,53,0.18)',
            }}
          >
            <div
              className="w-16 h-16 rounded-xl3 flex items-center justify-center mx-auto mb-5"
              style={{ background:'linear-gradient(135deg,#FDE0D0,#FAC0A0)' }}
              aria-hidden="true"
            >
              <Search size={26} style={{ color:'#C95C35' }} />
            </div>
            <h3
              className="text-ardoise-800 mb-2"
              style={{ fontFamily:'var(--font-body)', fontSize:'1.1rem', fontWeight:600 }}
            >
              Aucun article trouvé
            </h3>
            <p className="text-ardoise-500 text-sm mb-6">
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
