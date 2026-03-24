import { useState, useEffect } from 'react'

/**
 * Retourne la largeur courante de la fenêtre.
 * Se met à jour au resize (debounced 100ms).
 * Permet d'éviter les dépendances aux classes Tailwind responsive
 * pour des éléments critiques comme la navbar.
 */
export function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )

  useEffect(() => {
    let timer
    const handleResize = () => {
      clearTimeout(timer)
      timer = setTimeout(() => setWidth(window.innerWidth), 100)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
    }
  }, [])

  return width
}