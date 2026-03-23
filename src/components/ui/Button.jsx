import { Link } from 'react-router-dom'

const VARIANTS = {
  terra:         'btn-terra',
  mer:           'btn-mer',
  outlineTerra:  'btn-outline-terra',
}

/**
 * Bouton réutilisable.
 * Si `href` commence par `/`, utilise react-router Link.
 * Si `href` commence par `http` ou `tel:`, balise <a>.
 * Sinon, <button>.
 */
export default function Button({
  children,
  variant = 'terra',
  href,
  className = '',
  ...props
}) {
  const cls = `${VARIANTS[variant] ?? VARIANTS.terra} ${className}`

  if (href?.startsWith('/')) {
    return <Link to={href} className={cls} {...props}>{children}</Link>
  }
  if (href) {
    return <a href={href} className={cls} {...props}>{children}</a>
  }
  return <button className={cls} {...props}>{children}</button>
}
