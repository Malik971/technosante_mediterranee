import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import {
  ArrowLeft, ArrowRight, Phone, CheckCircle2,
  Monitor, Wifi, Network, Shield, Scan, Circle,
  Star, Users, PhoneCall,
} from 'lucide-react'
import { SERVICES_DETAIL, SERVICES, AGENCES } from '../../constants/siteData'
import Tag from '../../components/ui/Tag'

// Map icône string → composant
const ICON_MAP = {
  monitor:  Monitor,
  wifi:     Wifi,
  network:  Network,
  shield:   Shield,
  scan:     Scan,
  circle:   Circle,
  star:     Star,
  users:    Users,
  phone:    PhoneCall,
}

const COLOR = {
  terra:    { tag:'terra',    accent:'#C95C35', light:'rgba(201,92,53,0.08)',   border:'rgba(201,92,53,0.18)',  pill:'rgba(201,92,53,0.10)',  pillTxt:'#A54428' },
  mer:      { tag:'mer',      accent:'#0E6E9E', light:'rgba(14,110,158,0.07)',  border:'rgba(14,110,158,0.18)', pill:'rgba(14,110,158,0.10)', pillTxt:'#0A5580' },
  garrigue: { tag:'garrigue', accent:'#8B74CA', light:'rgba(139,116,202,0.07)',border:'rgba(139,116,202,0.18)',pill:'rgba(139,116,202,0.10)',pillTxt:'#6B54AA' },
}

function SectionBlock({ section, accentColor }) {
  const Icon = ICON_MAP[section.icon] ?? Monitor
  return (
    <div
      style={{ marginBottom: '40px', padding: '32px', borderRadius: '20px', background: 'white', border: '1px solid rgba(232,213,200,0.7)', boxShadow: '0 2px 20px rgba(44,30,16,0.06)' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: accentColor + '15' }}>
          <Icon size={20} style={{ color: accentColor }} />
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: '#2C1E10', lineHeight: 1.3, paddingTop: '6px' }}>
          {section.title}
        </h3>
      </div>
      <p style={{ color: '#5A4428', lineHeight: 1.8, marginBottom: '20px', fontSize: '15px' }}>
        {section.desc}
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {section.points.map((pt) => (
          <li key={pt} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#3E2E18' }}>
            <CheckCircle2 size={15} style={{ color: accentColor, flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
            {pt}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ServiceDetailPage() {
  const { id } = useParams()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [id])

  const detail = SERVICES_DETAIL?.[id]
  if (!detail) return <Navigate to="/" replace />

  const c = COLOR[detail.color] ?? COLOR.terra
  const otherServices = SERVICES.filter(s => s.id !== detail.id)

  return (
    <div style={{ background: '#FDFAF6', minHeight: '100vh', paddingTop: '80px' }}>

      {/* ── Bannière hero ── */}
      <div style={{ background: detail.heroGradient, paddingTop: '40px', paddingBottom: '0' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 24px' }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '13px', color: detail.accentColor, opacity: 0.75 }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</Link>
            <span>/</span>
            <span>Nos services</span>
            <span>/</span>
            <span style={{ opacity: 0.6 }}>{detail.title}</span>
          </div>

          <div style={{ maxWidth: '680px', paddingBottom: '48px' }}>
            <Tag variant={c.tag} className="mb-5">{detail.subtitle}</Tag>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#2C1E10', lineHeight: 1.1, marginBottom: '20px' }}>
              {detail.tagline}
            </h1>
            <p style={{ fontSize: '17px', color: '#5A4428', lineHeight: 1.8, marginBottom: '32px', maxWidth: '560px' }}>
              {detail.intro}
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                to="/#contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px', background: `linear-gradient(135deg, ${detail.accentColor}, ${detail.accentColor}cc)`, color: 'white', fontWeight: 700, fontSize: '14px', textDecoration: 'none', boxShadow: `0 6px 20px ${detail.accentColor}40` }}
              >
                {detail.cta}
                <ArrowRight size={16} />
              </Link>
              <a
                href={`tel:${AGENCES[0].phoneRaw}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px', background: 'white', color: detail.accentColor, fontWeight: 600, fontSize: '14px', textDecoration: 'none', border: `1.5px solid ${c.border}` }}
              >
                <Phone size={15} />
                {AGENCES[0].phone}
              </a>
            </div>
          </div>
        </div>

        {/* Vague */}
        <div style={{ overflow: 'hidden', lineHeight: 0 }} aria-hidden="true">
          <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', display: 'block' }}>
            <path d="M0,20 C360,40 720,0 1080,20 C1260,30 1380,22 1440,20 L1440,40 L0,40 Z" fill="#FDFAF6"/>
          </svg>
        </div>
      </div>

      {/* ── Corps ── */}
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '48px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: '32px' }}>

          {/* Contenu principal */}
          <div>
            {detail.sections.map((section) => (
              <SectionBlock key={section.title} section={section} accentColor={detail.accentColor} />
            ))}
          </div>

          {/* Compatibilités */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '28px', border: `1px solid ${c.border}`, boxShadow: '0 2px 20px rgba(44,30,16,0.06)' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#B8905E', marginBottom: '14px' }}>
              Compatible avec
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
              {detail.logiciels.map((l) => (
                <span
                  key={l}
                  style={{ fontSize: '12px', fontWeight: 600, padding: '6px 12px', borderRadius: '100px', background: c.pill, color: c.pillTxt, border: `1px solid ${c.border}` }}
                >
                  {l}
                </span>
              ))}
            </div>

            {/* CTA contact */}
            <div style={{ padding: '20px', borderRadius: '14px', background: `linear-gradient(135deg, ${detail.accentColor}08, ${detail.accentColor}04)`, border: `1px solid ${c.border}` }}>
              <p style={{ fontWeight: 700, fontSize: '14px', color: '#2C1E10', marginBottom: '6px' }}>
                Une question sur ce service ?
              </p>
              <p style={{ fontSize: '13px', color: '#5A4428', lineHeight: 1.6, marginBottom: '12px' }}>
                Notre équipe répond sans engagement.
              </p>
              {AGENCES.map(a => (
                <a
                  key={a.id}
                  href={`tel:${a.phoneRaw}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: detail.accentColor, textDecoration: 'none', padding: '4px 0' }}
                >
                  <Phone size={13} />
                  {a.city} · {a.phone}
                </a>
              ))}
            </div>
          </div>

          {/* Autres services */}
          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#B8905E', marginBottom: '14px' }}>
              Voir aussi
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {otherServices.map((s) => (
                <Link
                  key={s.id}
                  to={s.href}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '14px 18px', borderRadius: '14px', background: 'white', border: '1px solid rgba(232,213,200,0.7)', textDecoration: 'none', boxShadow: '0 2px 12px rgba(44,30,16,0.05)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(44,30,16,0.10)'; e.currentTarget.style.transform = 'translateX(3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(44,30,16,0.05)'; e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  <span style={{ fontWeight: 600, fontSize: '14px', color: '#2C1E10' }}>{s.title}</span>
                  <ArrowRight size={15} style={{ color: '#C95C35', flexShrink: 0 }} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Retour */}
        <div style={{ marginTop: '40px' }}>
          <Link
            to="/#services"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: '#B8905E', textDecoration: 'none' }}
          >
            <ArrowLeft size={15} />
            Retour à tous nos services
          </Link>
        </div>
      </div>
    </div>
  )
}