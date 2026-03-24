import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { useNavbar } from '../../hooks/useNavbar'
import { NAV_LINKS, AGENCES } from '../../constants/siteData'

export default function Navbar() {
  const scrolled = useNavbar(60)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const mainAgence = AGENCES[0]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        background: scrolled
          ? 'rgba(253,250,246,0.95)'
          : 'rgba(253,250,246,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled
          ? '1px solid rgba(201,92,53,0.12)'
          : '1px solid rgba(201,92,53,0.06)',
        boxShadow: scrolled ? '0 2px 20px rgba(44,30,16,0.08)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between" style={{ height: '72px' }}>

          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex items-center gap-3"
            aria-label="Accueil TechnoSanté Méditerranée"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #C95C35, #A54428)' }}
              aria-hidden="true"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2V16M2 9H16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="9" cy="9" r="2.5" fill="white" fillOpacity="0.4"/>
              </svg>
            </div>
            <span
              className="font-bold text-base tracking-tight"
              style={{ fontFamily: 'var(--font-display)', color: '#2C1E10' }}
            >
              TechnoSanté{' '}
              <span style={{ color: '#C95C35' }}>Méditerranée</span>
            </span>
          </Link>

          {/* ── Navigation desktop ── */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Navigation principale"
          >
            {NAV_LINKS.filter(l => l?.href && l?.label).map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className="relative px-4 py-2 text-sm font-medium rounded-lg"
                  style={{
                    transition: 'color 0.2s, background 0.2s',
                    color:      isActive ? '#C95C35' : '#5A4428',
                    background: isActive ? 'rgba(201,92,53,0.07)' : 'transparent',
                    fontFamily: 'var(--font-body)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color      = '#C95C35'
                      e.currentTarget.style.background = 'rgba(201,92,53,0.07)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color      = '#5A4428'
                      e.currentTarget.style.background = 'transparent'
                    }
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute rounded-full"
                      style={{
                        bottom: '2px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '4px',
                        height: '4px',
                        background: '#C95C35',
                      }}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* ── CTA desktop ── */}
          <a
            href={`tel:${mainAgence.phoneRaw}`}
            className="btn-terra text-sm px-5 hidden md:inline-flex"
            style={{ padding: '10px 20px' }}
            aria-label={`Appeler Montpellier au ${mainAgence.phone}`}
          >
            <Phone size={15} />
            {mainAgence.phone}
          </a>

          {/* ── Burger mobile ── */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{
              color: '#5A4428',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Menu mobile ── */}
      <div
        className="md:hidden overflow-hidden"
        style={{
          maxHeight: open ? '400px' : '0',
          opacity:   open ? 1 : 0,
          transition: 'max-height 0.3s ease, opacity 0.25s ease',
          background: 'rgba(253,250,246,0.98)',
          borderTop: open ? '1px solid rgba(201,92,53,0.10)' : 'none',
        }}
        aria-hidden={!open}
      >
        <nav className="px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.filter(l => l?.href && l?.label).map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-medium"
              style={{
                color:      pathname === link.href ? '#C95C35' : '#5A4428',
                background: pathname === link.href ? 'rgba(201,92,53,0.07)' : 'transparent',
                fontFamily: 'var(--font-body)',
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`tel:${mainAgence.phoneRaw}`}
            className="btn-terra text-sm justify-center mt-2"
            onClick={() => setOpen(false)}
          >
            <Phone size={15} />
            {mainAgence.phone}
          </a>
        </nav>
      </div>
    </header>
  )
}