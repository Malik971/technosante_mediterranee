import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { useNavbar } from '../../hooks/useNavbar'
import { useWindowWidth } from '../../hooks/useWindowWidth'
import { NAV_LINKS, AGENCES } from '../../constants/siteData'

const MD = 768 // breakpoint desktop

export default function Navbar() {
  const scrolled   = useNavbar(60)
  const [open, setOpen] = useState(false)
  const { pathname }    = useLocation()
  const width           = useWindowWidth()
  const isDesktop       = width >= MD
  const mainAgence      = AGENCES[0]

  return (
    <header
      style={{
        position:             'fixed',
        top:                  0,
        left:                 0,
        right:                0,
        zIndex:               50,
        transition:           'background 0.3s ease, box-shadow 0.3s ease',
        background:           'rgba(253,250,246,0.95)',
        backdropFilter:       'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom:         scrolled
          ? '1px solid rgba(201,92,53,0.14)'
          : '1px solid rgba(201,92,53,0.06)',
        boxShadow:            scrolled ? '0 2px 20px rgba(44,30,16,0.08)' : 'none',
      }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

          {/* ── Logo ── */}
          <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
            aria-label="Accueil TechnoSanté Méditerranée"
          >
            <div
              style={{
                width: '36px', height: '36px',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                background: 'linear-gradient(135deg, #C95C35, #A54428)',
              }}
              aria-hidden="true"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2V16M2 9H16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="9" cy="9" r="2.5" fill="white" fillOpacity="0.4"/>
              </svg>
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: '#2C1E10', letterSpacing: '-0.02em' }}>
              TechnoSanté{' '}
              <span style={{ color: '#C95C35' }}>Méditerranée</span>
            </span>
          </Link>

          {/* ── Navigation desktop ── */}
          {isDesktop && (
            <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }} aria-label="Navigation principale">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    style={{
                      position:       'relative',
                      padding:        '8px 16px',
                      borderRadius:   '8px',
                      fontSize:       '14px',
                      fontWeight:     500,
                      fontFamily:     'var(--font-body)',
                      textDecoration: 'none',
                      transition:     'color 0.2s, background 0.2s',
                      color:          isActive ? '#C95C35' : '#5A4428',
                      background:     isActive ? 'rgba(201,92,53,0.08)' : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color      = '#C95C35'
                        e.currentTarget.style.background = 'rgba(201,92,53,0.08)'
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
                        aria-hidden="true"
                        style={{
                          position:        'absolute',
                          bottom:          '2px',
                          left:            '50%',
                          transform:       'translateX(-50%)',
                          width:           '4px',
                          height:          '4px',
                          borderRadius:    '50%',
                          background:      '#C95C35',
                        }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>
          )}

          {/* ── CTA téléphone desktop ── */}
          {isDesktop && (
            <a
              href={`tel:${mainAgence.phoneRaw}`}
              className="btn-terra"
              style={{ fontSize: '14px', padding: '10px 20px' }}
              aria-label={`Appeler Montpellier au ${mainAgence.phone}`}
            >
              <Phone size={15} />
              {mainAgence.phone}
            </a>
          )}

          {/* ── Burger mobile ── */}
          {!isDesktop && (
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={open}
              style={{
                padding:    '8px',
                borderRadius: '8px',
                background: 'transparent',
                border:     'none',
                cursor:     'pointer',
                color:      '#5A4428',
                display:    'flex',
                alignItems: 'center',
              }}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </div>

      {/* ── Menu mobile ── */}
      {!isDesktop && (
        <div
          aria-hidden={!open}
          style={{
            overflow:   'hidden',
            maxHeight:  open ? '400px' : '0',
            opacity:    open ? 1 : 0,
            transition: 'max-height 0.3s ease, opacity 0.25s ease',
            background: 'rgba(253,250,246,0.98)',
            borderTop:  open ? '1px solid rgba(201,92,53,0.10)' : 'none',
          }}
        >
          <nav
            style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}
            aria-label="Navigation mobile"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                style={{
                  padding:        '12px 16px',
                  borderRadius:   '12px',
                  fontSize:       '14px',
                  fontWeight:     500,
                  fontFamily:     'var(--font-body)',
                  textDecoration: 'none',
                  color:          pathname === link.href ? '#C95C35' : '#5A4428',
                  background:     pathname === link.href ? 'rgba(201,92,53,0.08)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${mainAgence.phoneRaw}`}
              className="btn-terra"
              onClick={() => setOpen(false)}
              style={{ marginTop: '8px', justifyContent: 'center', fontSize: '14px', textDecoration: 'none' }}
            >
              <Phone size={15} />
              {mainAgence.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}