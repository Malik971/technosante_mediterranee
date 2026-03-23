import { SOCIAL_LINKS } from '../../constants/siteData'

// SVGs inline pour éviter une dépendance externe
const ICONS = {
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/>
    </svg>
  ),
  youtube: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.52V8.48L15.5 12l-5.75 3.52z"/>
    </svg>
  ),
  facebook: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.62 23.1 24 18.1 24 12.07z"/>
    </svg>
  ),
}

/**
 * Ligne d'icônes réseaux sociaux.
 *
 * @param {'light'|'dark'} theme — 'light' sur fond clair, 'dark' sur fond sombre
 * @param {'sm'|'md'}      size  — taille des boutons
 */
export default function SocialLinks({ theme = 'light', size = 'md', className = '' }) {
  const btnSize = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      aria-label="Nos réseaux sociaux"
    >
      {SOCIAL_LINKS.map((s) => (
        <a
          key={s.id}
          href={s.href}
          target={s.href !== '#' ? '_blank' : undefined}
          rel={s.href !== '#' ? 'noopener noreferrer' : undefined}
          aria-label={s.label}
          className={`${btnSize} rounded-xl flex items-center justify-center transition-all duration-200 group`}
          style={{
            background: theme === 'dark'
              ? 'rgba(255,255,255,0.10)'
              : 'rgba(44,30,16,0.06)',
            border: theme === 'dark'
              ? '1px solid rgba(255,255,255,0.15)'
              : '1px solid rgba(201,92,53,0.12)',
            color: theme === 'dark'
              ? 'rgba(255,255,255,0.65)'
              : '#745C3A',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = s.color + '18'
            e.currentTarget.style.color      = s.color
            e.currentTarget.style.borderColor = s.color + '55'
            e.currentTarget.style.transform  = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background  = theme === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(44,30,16,0.06)'
            e.currentTarget.style.color       = theme === 'dark' ? 'rgba(255,255,255,0.65)' : '#745C3A'
            e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(201,92,53,0.12)'
            e.currentTarget.style.transform   = 'translateY(0)'
          }}
        >
          {ICONS[s.icon]}
        </a>
      ))}
    </div>
  )
}
