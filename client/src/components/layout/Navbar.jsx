import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { useNavbar } from '../../hooks/useNavbar'
import { NAV_LINKS, AGENCES } from '../../constants/siteData'

export default function Navbar() {
  const scrolled   = useNavbar(60)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const mainAgence = AGENCES[0]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? 'navbar-glass shadow-warm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-18 py-4">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="Accueil TechnoSanté Méditerranée">
            {/* Icône croix médicale stylisée */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #C95C35, #A54428)' }}
              aria-hidden="true"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M9 2V16M2 9H16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="9" cy="9" r="2.5" fill="white" fillOpacity="0.4"/>
              </svg>
            </div>
            <div className="leading-tight">
              <span
                className="font-display font-bold text-ardoise-800 text-base tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                TechnoSanté
                <span className="text-terra-500"> Méditerranée</span>
              </span>
            </div>
          </Link>

          {/* ── Navigation desktop ── */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navigation principale">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-terra-600 bg-terra-50'
                      : 'text-ardoise-600 hover:text-terra-600 hover:bg-terra-50'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-terra-500"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* ── CTA téléphone desktop ── */}
          <a
            href={`tel:${mainAgence.phoneRaw}`}
            className="hidden md:inline-flex items-center gap-2 btn-terra text-sm px-5 py-2.5"
            aria-label={`Appeler Montpellier au ${mainAgence.phone}`}
          >
            <Phone size={15} />
            {mainAgence.phone}
          </a>

          {/* ── Burger mobile ── */}
          <button
            className="md:hidden p-2 rounded-lg text-ardoise-700 hover:bg-terra-50 hover:text-terra-600 transition-colors"
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
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } navbar-glass border-t border-terra-100`}
        inert={!open ? "" : undefined}
      >
        <nav className="px-6 py-4 flex flex-col gap-1" aria-label="Navigation mobile">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'bg-terra-50 text-terra-600'
                  : 'text-ardoise-600 hover:bg-terra-50 hover:text-terra-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`tel:${mainAgence.phoneRaw}`}
            className="mt-2 btn-terra text-sm justify-center"
          >
            <Phone size={15} />
            {mainAgence.phone}
          </a>
        </nav>
      </div>
    </header>
  )
}
