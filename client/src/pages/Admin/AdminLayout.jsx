import { NavLink, useNavigate } from 'react-router-dom'
import { FileText, Settings, LogOut, LayoutDashboard, ChevronRight } from 'lucide-react'
import { useAdmin } from '../../hooks/useAdmin'

const NAV = [
  { to: '/admin',          label: 'Tableau de bord', icon: LayoutDashboard, end: true },
  { to: '/admin/articles', label: 'Articles',         icon: FileText },
  { to: '/admin/services', label: 'Services',         icon: Settings },
]

export default function AdminLayout({ children, title }) {
  const { user, logout } = useAdmin()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#FDFAF6', paddingTop: '0' }}>

      {/* ── Sidebar ── */}
      <aside style={{ width: '240px', flexShrink: 0, background: 'white', borderRight: '1px solid rgba(201,92,53,0.10)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 40 }}>

        {/* Logo */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(201,92,53,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'linear-gradient(135deg, #C95C35, #A54428)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d="M9 2V16M2 9H16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#2C1E10', lineHeight: 1.2 }}>TechnoSanté</p>
              <p style={{ fontSize: '11px', color: '#B8905E', lineHeight: 1.2 }}>Administration</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#D5C5AA', padding: '0 8px', marginBottom: '8px' }}>
            Menu
          </p>
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '9px 10px', borderRadius: '10px', marginBottom: '3px',
                textDecoration: 'none', fontSize: '14px', fontWeight: 500,
                transition: 'all 0.15s',
                background: isActive ? 'rgba(201,92,53,0.09)' : 'transparent',
                color:      isActive ? '#C95C35' : '#5A4428',
              })}
            >
              {({ isActive }) => (
                <>
                  <Icon size={16} style={{ flexShrink: 0 }} />
                  <span style={{ flex: 1 }}>{label}</span>
                  {isActive && <ChevronRight size={13} style={{ opacity: 0.5 }} />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Utilisateur + logout */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(201,92,53,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '10px', marginBottom: '6px', background: 'rgba(253,250,246,0.8)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,#FDE0D0,#FAC0A0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#A54428', flexShrink: 0 }}>
              {user?.name?.[0] ?? 'A'}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#2C1E10', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name ?? 'Admin'}</p>
              <p style={{ fontSize: '11px', color: '#B8905E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.role ?? 'editor'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '8px 10px', borderRadius: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#B8905E', fontWeight: 500, transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,92,53,0.07)'; e.currentTarget.style.color = '#C95C35' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#B8905E' }}
          >
            <LogOut size={14} /> Se déconnecter
          </button>
        </div>
      </aside>

      {/* ── Contenu principal ── */}
      <main style={{ flex: 1, marginLeft: '240px', minHeight: '100vh' }}>

        {/* Header page */}
        {title && (
          <div style={{ padding: '28px 36px 0', borderBottom: '1px solid rgba(201,92,53,0.08)', marginBottom: '0', background: 'white' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: '#2C1E10', paddingBottom: '20px' }}>
              {title}
            </h1>
          </div>
        )}

        <div style={{ padding: '32px 36px' }}>
          {children}
        </div>
      </main>
    </div>
  )
}