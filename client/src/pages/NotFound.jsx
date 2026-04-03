import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section-padding bg-texture-sable min-h-[70vh] flex items-center">
      <div className="section-inner text-center">
        <p style={{ color: '#C95C35', fontWeight: 700, marginBottom: '12px' }}>404</p>
        <h1 className="text-ardoise-800 mb-4">Page introuvable</h1>
        <p className="text-ardoise-500 max-w-xl mx-auto mb-8">
          La page que vous cherchez n’existe pas ou a été déplacée.
        </p>
        <Link to="/" className="btn-terra" style={{ textDecoration: 'none' }}>
          Retour à l’accueil
        </Link>
      </div>
    </section>
  )
}