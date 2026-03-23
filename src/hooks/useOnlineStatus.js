import { useState, useEffect } from 'react'

/**
 * Simule la disponibilité en temps réel des techniciens.
 * En production, remplacer par un fetch vers /api/status
 * qui lit l'état depuis une BDD ou un webhook de calendrier.
 *
 * @returns {{ isOnline: boolean, count: number, nextSlot: string }}
 */
export function useOnlineStatus() {
  const [status, setStatus] = useState({
    isOnline:  true,
    count:     3,
    nextSlot: 'Disponible maintenant',
  })

  useEffect(() => {
    function computeStatus() {
      const now  = new Date()
      const day  = now.getDay()    // 0 = dimanche, 6 = samedi
      const hour = now.getHours()
      const min  = now.getMinutes()
      const timeVal = hour + min / 60

      const isWeekday   = day >= 1 && day <= 5
      const isMorning   = timeVal >= 9  && timeVal < 12.5
      const isAfternoon = timeVal >= 14 && timeVal < 18.5

      if (isWeekday && (isMorning || isAfternoon)) {
        // Heure ouvrée — 2 à 4 techniciens dispo (variation aléatoire légère)
        const count = 2 + Math.floor(Math.random() * 3)
        setStatus({
          isOnline:  true,
          count,
          nextSlot: 'Disponible maintenant',
        })
      } else if (isWeekday && timeVal >= 12.5 && timeVal < 14) {
        setStatus({
          isOnline:  false,
          count:     0,
          nextSlot:  'Reprend à 14h00',
        })
      } else if (isWeekday && timeVal < 9) {
        setStatus({
          isOnline:  false,
          count:     0,
          nextSlot:  'Ouvre à 9h00',
        })
      } else if (isWeekday && timeVal >= 18.5) {
        setStatus({
          isOnline:  false,
          count:     0,
          nextSlot:  'Reprend lundi à 9h00',
        })
      } else {
        // Week-end
        const nextMonday = new Date(now)
        nextMonday.setDate(now.getDate() + ((8 - day) % 7 || 7))
        setStatus({
          isOnline:  false,
          count:     0,
          nextSlot:  'Reprend lundi à 9h00',
        })
      }
    }

    computeStatus()
    // Rafraîchir toutes les minutes
    const interval = setInterval(computeStatus, 60_000)
    return () => clearInterval(interval)
  }, [])

  return status
}
