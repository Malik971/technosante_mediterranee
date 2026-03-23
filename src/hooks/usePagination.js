import { useState, useMemo } from 'react'

/**
 * Hook de pagination générique.
 *
 * @param {Array}  items       — tableau complet à paginer
 * @param {number} perPage     — éléments par page
 * @returns {{
 *   page:       number,
 *   totalPages: number,
 *   paged:      Array,
 *   goTo:       (n: number) => void,
 *   next:       () => void,
 *   prev:       () => void,
 *   hasNext:    boolean,
 *   hasPrev:    boolean,
 * }}
 */
export function usePagination(items, perPage = 6) {
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(items.length / perPage))

  // Recalcul si le filtre change (items raccourcit → revenir page 1)
  const safePage = Math.min(page, totalPages)

  const paged = useMemo(
    () => items.slice((safePage - 1) * perPage, safePage * perPage),
    [items, safePage, perPage]
  )

  const goTo = (n) => {
    const clamped = Math.max(1, Math.min(n, totalPages))
    setPage(clamped)
    // Scroll smooth vers le haut de la grille
    document
      .getElementById('articles-grid')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return {
    page:       safePage,
    totalPages,
    paged,
    goTo,
    next:    () => goTo(safePage + 1),
    prev:    () => goTo(safePage - 1),
    hasNext: safePage < totalPages,
    hasPrev: safePage > 1,
    reset:   () => setPage(1),
  }
}
