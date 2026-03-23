import { CATEGORIES_ACTU, ARTICLES } from '../../constants/siteData'

const TAG_STYLES = {
  terra:    { active:{ bg:'linear-gradient(135deg,#C95C35,#A54428)', color:'#fff', shadow:'0 4px 14px rgba(201,92,53,0.30)' }, idle:{ bg:'white', color:'#745C3A', border:'rgba(201,92,53,0.20)' } },
  mer:      { active:{ bg:'linear-gradient(135deg,#2088BF,#0A5580)', color:'#fff', shadow:'0 4px 14px rgba(14,110,158,0.28)' }, idle:{ bg:'white', color:'#063D5E', border:'rgba(14,110,158,0.20)' } },
  garrigue: { active:{ bg:'linear-gradient(135deg,#8B74CA,#6B54AA)', color:'#fff', shadow:'0 4px 14px rgba(139,116,202,0.28)' }, idle:{ bg:'white', color:'#3C2E70', border:'rgba(139,116,202,0.20)' } },
  soleil:   { active:{ bg:'linear-gradient(135deg,#F0BC2A,#D4A010)', color:'#fff', shadow:'0 4px 14px rgba(212,160,16,0.28)' }, idle:{ bg:'white', color:'#7A5A00', border:'rgba(212,160,16,0.22)' } },
  olive:    { active:{ bg:'linear-gradient(135deg,#849A55,#617A36)', color:'#fff', shadow:'0 4px 14px rgba(97,122,54,0.28)'  }, idle:{ bg:'white', color:'#455A24', border:'rgba(97,122,54,0.20)'  } },
}

export default function FilterBar({ activeFilter, onFilter }) {
  // Compte les articles par catégorie
  const counts = ARTICLES.reduce((acc, a) => {
    acc[a.category] = (acc[a.category] ?? 0) + 1
    return acc
  }, {})
  counts.all = ARTICLES.length

  return (
    <div
      className="flex flex-wrap gap-3 items-center"
      role="group"
      aria-label="Filtrer par catégorie"
    >
      {CATEGORIES_ACTU.map((cat) => {
        const isActive = activeFilter === cat.id
        const s        = TAG_STYLES[cat.color] ?? TAG_STYLES.terra
        const count    = counts[cat.id] ?? 0

        return (
          <button
            key={cat.id}
            onClick={() => onFilter(cat.id)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
            style={
              isActive
                ? { background: s.active.bg, color: s.active.color, boxShadow: s.active.shadow, border: 'none' }
                : { background: s.idle.bg, color: s.idle.color, border: `1px solid ${s.idle.border}`, boxShadow: 'none' }
            }
            aria-pressed={isActive}
            aria-label={`${cat.label} (${count} article${count > 1 ? 's' : ''})`}
          >
            {cat.label}
            {/* Badge compteur */}
            <span
              className="text-xs font-bold px-1.5 py-0.5 rounded-full"
              style={{
                background: isActive ? 'rgba(255,255,255,0.22)' : 'rgba(44,30,16,0.07)',
                color:      isActive ? 'rgba(255,255,255,0.9)'  : 'inherit',
                minWidth:   '1.4rem',
                textAlign:  'center',
              }}
              aria-hidden="true"
            >
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
