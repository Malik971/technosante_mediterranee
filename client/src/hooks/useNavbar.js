import { useState, useEffect } from 'react'

/**
 * Détecte si la page a été scrollée au-delà d'un seuil.
 * Utilisé pour appliquer l'effet glass sur la navbar.
 *
 * @param {number} threshold — pixels avant activation (défaut: 60)
 * @returns {boolean} scrolled
 */
export function useNavbar(threshold = 60) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
