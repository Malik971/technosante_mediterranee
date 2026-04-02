import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FileText, Settings, LogOut, LayoutDashboard, ChevronRight, Menu, X } from 'lucide-react'
import { useAdmin } from '../../hooks/useAdmin'

const NAV = [
  { to: '/admin',          label: 'Tableau de bord', icon: LayoutDashboard, end: true },
  { to: '/admin/articles', label: 'Articles',         icon: FileText },
  { to: '/admin/services', label: 'Services',         icon: Settings },
]

export default function AdminLayout({ children, title }) {
  const { user, logout } = useAdmin()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => { logout(); navigate('/admin/login') }
  const closeMobile  = () => setMobileOpen(false)

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(201,92,53,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'linear-gradient(135deg,#C95C35,#A54428)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M9 2V16M2 9H16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
          </div>
          <div>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#2C1E10', lineHeight: 1.2 }}>TechnoSanté</p>
            <p style={{ fontSize: '10px', color: '#B8905E' }}>Administration</p>
          </div>
        </div>
        {/* Bouton fermer sur mobile */}
        <button onClick={closeMobile} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B8905E', display: 'flex', padding: '4px' }} className="lg-hide">
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '12px 10px' }}>
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={closeMobile}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '11px 10px', borderRadius: '10px', marginBottom: '2px',
              textDecoration: 'none', fontSize: '14px', fontWeight: 500,
              transition: 'all 0.15s',
              background: isActive ? 'rgba(201,92,53,0.09)' : 'transparent',
              color:      isActive ? '#C95C35' : '#5A4428',
            })}
          >
            {({ isActive }) => (
              <>
                <Icon size={17} style={{ flexShrink: 0 }} />
                <span style={{ flex: 1 }}>{label}</span>
                {isActive && <ChevronRight size={13} style={{ opacity: 0.5 }} />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Utilisateur + logout */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(201,92,53,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '10px', marginBottom: '4px', background: 'rgba(253,250,246,0.8)' }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg,#FDE0D0,#FAC0A0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#A54428', flexShrink: 0 }}>
            {user?.name?.[0] ?? 'A'}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#2C1E10', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name ?? 'Admin'}</p>
            <p style={{ fontSize: '10px', color: '#B8905E' }}>{user?.role ?? 'editor'}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '8px 10px', borderRadius: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#B8905E', fontWeight: 500 }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,92,53,0.07)'; e.currentTarget.style.color = '#C95C35' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#B8905E' }}
        >
          <LogOut size={14} /> Se déconnecter
        </button>
      </div>
    </>
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#FDFAF6', paddingTop: '0' }}>

      {/* ── Sidebar desktop (fixe, cachée sur mobile) ── */}
      <aside
        id="admin-sidebar-desktop"
        style={{ width: '220px', flexShrink: 0, background: 'white', borderRight: '1px solid rgba(201,92,53,0.10)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 40 }}
        className="admin-sidebar-desktop"
      >
        <SidebarContent />
      </aside>

      {/* ── Overlay + Drawer mobile ── */}
      {mobileOpen && (
        <div
          onClick={closeMobile}
          style={{ position: 'fixed', inset: 0, background: 'rgba(44,30,16,0.45)', zIndex: 45, backdropFilter: 'blur(2px)' }}
        />
      )}
      <aside
        style={{
          position: 'fixed', top: 0, left: 0, bottom: 0, width: '260px',
          background: 'white', zIndex: 50, display: 'flex', flexDirection: 'column',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.28s ease',
          boxShadow: mobileOpen ? '4px 0 24px rgba(44,30,16,0.15)' : 'none',
        }}
        className="admin-sidebar-mobile"
      >
        <SidebarContent />
      </aside>

      {/* ── Zone principale ── */}
      <main style={{ flex: 1, minHeight: '100vh' }} className="admin-main">

        {/* Top bar */}
        <div style={{ position: 'sticky', top: 0, zIndex: 30, background: 'white', borderBottom: '1px solid rgba(201,92,53,0.08)', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px' }}>
          {/* Burger mobile */}
          <button
            onClick={() => setMobileOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5A4428', display: 'flex', alignItems: 'center', padding: '4px' }}
            className="admin-burger"
            aria-label="Ouvrir le menu"
          >
            <Menu size={22} />
          </button>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: '#2C1E10', margin: 0 }}>
            {title ?? 'Admin'}
          </h1>
          {/* Placeholder droite pour centrer le titre */}
          <div style={{ width: '30px' }} />
        </div>

        <div style={{ padding: '20px 16px' }} className="admin-content-pad">
          {children}
        </div>
      </main>

      {/* ── CSS responsive ── */}
      <style>{`
        /* Desktop ≥ 768px */
        @media (min-width: 768px) {
          .admin-sidebar-desktop { display: flex !important; }
          .admin-sidebar-mobile  { display: none !important; }
          .admin-main            { margin-left: 220px; }
          .admin-burger          { display: none !important; }
          .admin-content-pad     { padding: 28px 32px !important; }
          .lg-hide               { display: none !important; }
        }
        /* Mobile < 768px */
        @media (max-width: 767px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-main            { margin-left: 0 !important; }
        }
      `}</style>
    </div>
  )
}