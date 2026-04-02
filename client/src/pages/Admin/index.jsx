import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Settings, Plus, ArrowRight, Eye, EyeOff } from 'lucide-react'
import AdminLayout from './AdminLayout'
import { useAdmin } from '../../hooks/useAdmin'

const API = import.meta.env.VITE_API_URL || '/api'

function StatCard({ label, value, color, icon: Icon }) {
  return (
    <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid rgba(232,213,200,0.7)', boxShadow: '0 2px 16px rgba(44,30,16,0.06)', display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{ width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: color + '18' }}>
        <Icon size={22} style={{ color }} />
      </div>
      <div>
        <p style={{ fontSize: '28px', fontWeight: 700, color, fontFamily: 'var(--font-display)', lineHeight: 1 }}>{value ?? '—'}</p>
        <p style={{ fontSize: '13px', color: '#B8905E', marginTop: '3px' }}>{label}</p>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const { authFetch } = useAdmin()
  const [stats, setStats] = useState({ articles: 0, published: 0, draft: 0, services: 0 })

  useEffect(() => {
    authFetch('articles/admin/all')
      .then(items => {
        setStats(s => ({
          ...s,
          articles:  items.length,
          published: items.filter(a => a.published).length,
          draft:     items.filter(a => !a.published).length,
        }))
      })
      .catch(() => {})

    fetch(`${API}/services`)
      .then(r => r.json())
      .then(data => setStats(s => ({ ...s, services: Array.isArray(data) ? data.length : 0 })))
      .catch(() => {})
  }, [authFetch])

  return (
    <AdminLayout title="Tableau de bord">

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '36px' }}>
        <StatCard label="Articles total"  value={stats.articles}  color="#C95C35" icon={FileText} />
        <StatCard label="Publiés"         value={stats.published} color="#617A36" icon={Eye} />
        <StatCard label="Brouillons"      value={stats.draft}     color="#D4A010" icon={EyeOff} />
        <StatCard label="Services actifs" value={stats.services}  color="#0E6E9E" icon={Settings} />
      </div>

      {/* Actions rapides */}
      <div style={{ marginBottom: '32px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#B8905E', marginBottom: '14px' }}>
          Actions rapides
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <Link to="/admin/articles/new" className="btn-terra" style={{ textDecoration: 'none', fontSize: '14px' }}>
            <Plus size={16} /> Nouvel article
          </Link>
          <Link to="/admin/articles" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '12px', background: 'white', border: '1px solid rgba(201,92,53,0.18)', color: '#C95C35', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>
            <FileText size={16} /> Gérer les articles
          </Link>
          <Link to="/admin/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '12px', background: 'white', border: '1px solid rgba(14,110,158,0.18)', color: '#0E6E9E', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>
            <Settings size={16} /> Gérer les services
          </Link>
        </div>
      </div>

      {/* Lien vers le site */}
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#B8905E', textDecoration: 'none' }}
      >
        Voir le site public <ArrowRight size={13} />
      </a>
    </AdminLayout>
  )
}