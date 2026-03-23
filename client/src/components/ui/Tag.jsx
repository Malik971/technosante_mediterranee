const STYLES = {
  terra:    'badge-terra',
  mer:      'badge-mer',
  soleil:   'badge-soleil',
  garrigue: 'badge bg-garrigue-50 text-garrigue-600 border border-garrigue-200',
  olive:    'badge bg-olive-100 text-olive-600 border border-olive-200',
  neutral:  'badge bg-sable-100 text-ardoise-500 border border-sable-300',
}

export default function Tag({ children, variant = 'terra', className = '' }) {
  return (
    <span className={`${STYLES[variant] ?? STYLES.neutral} ${className}`}>
      {children}
    </span>
  )
}
