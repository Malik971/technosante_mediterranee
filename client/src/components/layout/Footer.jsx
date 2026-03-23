import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { AGENCES, NAV_LINKS, SITE } from '../../constants/siteData'
import SocialLinks from '../ui/SocialLinks'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer-bg text-sable-100" aria-label="Pied de page">

      {/* ── Vague décorative ── */}
      <div className="overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path fill="#3E2E18" d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,35 1440,30 L1440,60 L0,60 Z"/>
        </svg>
      </div>

      <div className="px-6 pb-12 pt-2">
        <div className="max-w-6xl mx-auto">

          {/* ── Grid principal ── */}
          <div className="grid md:grid-cols-4 gap-10 mb-12">

            {/* Colonne 1 — identité + réseaux */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
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
                <span className="font-bold text-sable-50 text-base" style={{ fontFamily: 'var(--font-display)' }}>
                  TechnoSanté Méditerranée
                </span>
              </div>

              <p className="text-sm leading-relaxed text-ardoise-200 mb-5 max-w-xs">
                Spécialistes de l'informatique médicale depuis {SITE.founded}. Partenaire fondateur du Groupe e-Santé France. Montpellier &amp; Nice.
              </p>

              {/* Réseaux sociaux */}
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-ardoise-400 mb-3">
                  Suivez-nous
                </p>
                <SocialLinks theme="dark" size="md" />
              </div>

              <div className="flex items-center gap-2 text-xs text-ardoise-400">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-terra-400" aria-hidden="true" />
                {SITE.company} © {SITE.founded}–{year}
              </div>
            </div>

            {/* Colonne 2 — navigation */}
            <div>
              <h3 className="text-sm font-semibold text-sable-200 mb-4 uppercase tracking-wider">Navigation</h3>
              <ul className="space-y-2.5" role="list">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm text-ardoise-300 hover:text-terra-300 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="https://www.horizonsegur.fr/les-lecteurs-du-cabinet#3"
                    target="_blank" rel="noopener noreferrer"
                    className="text-sm text-ardoise-300 hover:text-terra-300 transition-colors"
                  >
                    Boutique lecteurs ↗
                  </a>
                </li>
              </ul>
            </div>

            {/* Colonne 3 — contact */}
            <div>
              <h3 className="text-sm font-semibold text-sable-200 mb-4 uppercase tracking-wider">Contact</h3>
              <ul className="space-y-3" role="list">
                {AGENCES.map((agence) => (
                  <li key={agence.id}>
                    <p className="text-xs font-semibold text-terra-300 mb-1">{agence.city}</p>
                    <a
                      href={`tel:${agence.phoneRaw}`}
                      className="flex items-center gap-2 text-sm text-ardoise-300 hover:text-terra-300 transition-colors"
                    >
                      <Phone size={13} aria-hidden="true" />
                      {agence.phone}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-center gap-2 text-sm text-ardoise-300 hover:text-terra-300 transition-colors"
                  >
                    <Mail size={13} aria-hidden="true" />
                    {SITE.email}
                  </a>
                </li>
                <li className="flex items-start gap-2 text-sm text-ardoise-300">
                  <MapPin size={13} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span>185 chemin de la 3ème écluse<br />34970 Lattes</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-ardoise-300">
                  <Clock size={13} aria-hidden="true" />
                  Lun–Ven · 9h–18h30
                </li>
              </ul>
            </div>
          </div>

          {/* ── Barre basse ── */}
          <div
            className="flex flex-wrap justify-between items-center gap-4 pt-6 text-xs text-ardoise-500"
            style={{ borderTop: '1px solid rgba(201,92,53,0.15)' }}
          >
            <span>© {year} TechnoSanté Méditerranée · {SITE.company}</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-terra-300 transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-terra-300 transition-colors">Politique de confidentialité</a>
              <a href="#" className="hover:text-terra-300 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
