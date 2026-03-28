import { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, Phone, CheckCircle2,
  Monitor, Wifi, Network, Shield, Scan, Circle,
  Star, Users, PhoneCall, Loader2,
} from 'lucide-react'
import { AGENCES, SERVICES_DETAIL as DETAIL_STATIC } from '../../constants/siteData'
import Tag from '../../components/ui/Tag'

/**
 * ServiceDetailPage — migrée vers l'API.
 *
 * COMMENT ÇA MARCHE :
 *
 * 1. On récupère le slug depuis l'URL (/services/cabinets → slug = "cabinets")
 * 2. On appelle GET /api/services/:slug
 *    → Express fait un findUnique({ where: { slug }, include: { detail: { include: { sections } } } })
 *    → On récupère le service + son détail + ses sections en un seul appel
 * 3. On reconstruit la page à partir de ces données
 *
 * FALLBACK :
 * Si l'API est indisponible, on utilise SERVICES_DETAIL de siteData
 * pour que la page reste fonctionnelle.
 *
 * STRUCTURE DE LA RÉPONSE API :
 * {
 *   id, slug, title, subtitle, description, color, features, href,
 *   detail: {
 *     tagline, intro, heroGradient, accentColor, logiciels, cta,
 *     sections: [{ icon, title, description, points, order }]
 *   }
 * }
 */

const API = import.meta.env.VITE_API_URL || '/api'

// Map icône string → composant Lucide
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

// Map couleur → styles CSS
const COLOR = {
  terra:    { tag:'terra',    accent:'#C95C35', border:'rgba(201,92,53,0.18)',   pill:'rgba(201,92,53,0.10)',   pillTxt:'#A54428' },
  mer:      { tag:'mer',      accent:'#0E6E9E', border:'rgba(14,110,158,0.18)', pill:'rgba(14,110,158,0.10)',  pillTxt:'#0A5580' },
  garrigue: { tag:'garrigue', accent:'#8B74CA', border:'rgba(139,116,202,0.18)',pill:'rgba(139,116,202,0.10)',pillTxt:'#6B54AA' },
}

// ── Bloc de section (ex: "Logiciels de gestion") ──────────
function SectionBlock({ section, accentColor }) {
  const Icon = ICON_MAP[section.icon] ?? Monitor

  return (
    <div style={{ marginBottom:'32px', padding:'28px', borderRadius:'18px', background:'white', border:'1px solid rgba(232,213,200,0.7)', boxShadow:'0 2px 16px rgba(44,30,16,0.06)' }}>
      <div style={{ display:'flex', alignItems:'flex-start', gap:'14px', marginBottom:'14px' }}>
        <div style={{ width:'42px', height:'42px', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, background: accentColor + '15' }}>
          <Icon size={20} style={{ color: accentColor }} />
        </div>
        <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', fontWeight:700, color:'#2C1E10', lineHeight:1.3, paddingTop:'6px' }}>
          {section.title}
        </h3>
      </div>

      {/* Description — vient de la BDD */}
      <p style={{ color:'#5A4428', lineHeight:1.8, marginBottom:'18px', fontSize:'15px' }}>
        {section.description}
      </p>

      {/* Points — c'est un tableau String[] dans PostgreSQL */}
      <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'9px' }}>
        {(section.points ?? []).map(pt => (
          <li key={pt} style={{ display:'flex', alignItems:'flex-start', gap:'10px', fontSize:'14px', color:'#3E2E18' }}>
            <CheckCircle2 size={15} style={{ color: accentColor, flexShrink:0, marginTop:'2px' }} aria-hidden="true" />
            {pt}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── Skeleton de chargement ─────────────────────────────────
function LoadingSkeleton() {
  return (
    <div style={{ maxWidth:'72rem', margin:'0 auto', padding:'40px 24px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'40px', color:'#B8905E' }}>
        <Loader2 size={18} style={{ animation:'spin 1s linear infinite' }} />
        <span style={{ fontSize:'14px' }}>Chargement du service…</span>
      </div>
      {[1,2,3,4].map(i => (
        <div key={i} style={{ height:'160px', background:'linear-gradient(135deg,#FDE0D0,#FAC0A0)', opacity:0.25, borderRadius:'18px', marginBottom:'16px', animation:'pulse 1.5s ease-in-out infinite' }} />
      ))}
      <style>{`
        @keyframes spin  { to { transform: rotate(360deg) } }
        @keyframes pulse { 0%,100%{opacity:0.25} 50%{opacity:0.45} }
      `}</style>
    </div>
  )
}

// ── Composant principal ───────────────────────────────────
export default function ServiceDetailPage() {
  const { id: slug } = useParams()  // la route est /services/:id, on renomme en slug

  const [service,  setService]  = useState(null)
  const [loading,  setLoading]  = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setLoading(true)
    setNotFound(false)

    fetch(`${API}/services/${slug}`)
      .then(r => {
        if (r.status === 404) {
          // Service non trouvé en BDD → on essaie le fallback statique
          const staticDetail = DETAIL_STATIC?.[slug]
          if (staticDetail) {
            // Reconstituer la structure comme si elle venait de l'API
            setService({
              slug,
              color:   staticDetail.id,
              detail:  {
                tagline:      staticDetail.tagline,
                intro:        staticDetail.intro,
                heroGradient: staticDetail.heroGradient,
                accentColor:  staticDetail.accentColor,
                logiciels:    staticDetail.logiciels,
                cta:          staticDetail.cta,
                sections:     staticDetail.sections.map((s, i) => ({ ...s, order: i })),
              },
              ...staticDetail,
            })
          } else {
            setNotFound(true)
          }
          return null
        }
        return r.json()
      })
      .then(data => {
        if (data) setService(data)
      })
      .catch(() => {
        // Fallback statique en cas d'erreur réseau
        const staticDetail = DETAIL_STATIC?.[slug]
        if (staticDetail) {
          setService({ slug, ...staticDetail })
        } else {
          setNotFound(true)
        }
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (notFound) return <Navigate to="/" replace />
  if (loading)  return <LoadingSkeleton />

  // Normaliser : l'API renvoie service.detail.xxx, le statique a xxx directement
  const detail      = service.detail ?? service
  const color       = service.color ?? slug
  const c           = COLOR[color] ?? COLOR.terra
  const accentColor = detail.accentColor ?? c.accent
  const sections    = detail.sections ?? []
  const otherSlugs  = ['cabinets', 'dentaires', 'etablissements'].filter(s => s !== slug)

  return (
    <div style={{ background:'#FDFAF6', minHeight:'100vh', paddingTop:'80px' }}>

      {/* ── Bannière hero ── */}
      <div style={{ background: detail.heroGradient ?? 'linear-gradient(135deg,#FEF4EF,#FDE0D0)' }}>
        <div style={{ maxWidth:'72rem', margin:'0 auto', padding:'0 24px' }}>

          {/* Breadcrumb */}
          <div style={{ display:'flex', alignItems:'center', gap:'8px', paddingTop:'40px', marginBottom:'24px', fontSize:'13px', color: accentColor, opacity:0.8 }}>
            <Link to="/" style={{ color:'inherit', textDecoration:'none' }}>Accueil</Link>
            <span>/</span>
            <span>Nos services</span>
            <span>/</span>
            <span style={{ opacity:0.6 }}>{service.title}</span>
          </div>

          <div style={{ maxWidth:'680px', paddingBottom:'48px' }}>
            <Tag variant={c.tag} className="mb-5">{service.subtitle}</Tag>

            <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:700, color:'#2C1E10', lineHeight:1.1, marginBottom:'20px' }}>
              {/* tagline vient de la BDD — c'est l'accroche de la page détail */}
              {detail.tagline ?? service.title}
            </h1>

            <p style={{ fontSize:'17px', color:'#5A4428', lineHeight:1.8, marginBottom:'32px', maxWidth:'560px' }}>
              {/* intro vient de la BDD — paragraphe introductif */}
              {detail.intro ?? service.description}
            </p>

            <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
              <Link
                to="/#contact"
                style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'12px 24px', borderRadius:'12px', background:`linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`, color:'white', fontWeight:700, fontSize:'14px', textDecoration:'none', boxShadow:`0 6px 20px ${accentColor}40` }}
              >
                {/* cta vient de la BDD — texte du bouton personnalisé par service */}
                {detail.cta ?? 'Demander un audit gratuit'}
                <ArrowRight size={16} />
              </Link>
              <a
                href={`tel:${AGENCES[0].phoneRaw}`}
                style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'12px 24px', borderRadius:'12px', background:'white', color: accentColor, fontWeight:600, fontSize:'14px', textDecoration:'none', border:`1.5px solid ${c.border}` }}
              >
                <Phone size={15} /> {AGENCES[0].phone}
              </a>
            </div>
          </div>
        </div>

        {/* Vague de transition */}
        <div style={{ overflow:'hidden', lineHeight:0 }} aria-hidden="true">
          <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', display:'block' }}>
            <path d="M0,20 C360,40 720,0 1080,20 C1260,30 1380,22 1440,20 L1440,40 L0,40 Z" fill="#FDFAF6"/>
          </svg>
        </div>
      </div>

      {/* ── Corps de la page ── */}
      <div style={{ maxWidth:'72rem', margin:'0 auto', padding:'48px 24px 80px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'minmax(0,2fr) minmax(0,1fr)', gap:'32px', alignItems:'start' }}>

          {/* Colonne principale — sections */}
          <div>
            {/*
              sections vient de la BDD (table ServiceSection).
              Chaque section a : icon, title, description, points[]
              Triées par 'order' ASC côté API.
            */}
            {sections.length > 0
              ? sections
                  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                  .map(section => (
                    <SectionBlock
                      key={section.id ?? section.title}
                      section={section}
                      accentColor={accentColor}
                    />
                  ))
              : <p style={{ color:'#B8905E', fontStyle:'italic' }}>Aucun contenu disponible pour ce service.</p>
            }
          </div>

          {/* Sidebar */}
          <div style={{ position:'sticky', top:'100px', display:'flex', flexDirection:'column', gap:'20px' }}>

            {/* Logiciels compatibles — tableau String[] de la BDD */}
            {(detail.logiciels ?? []).length > 0 && (
              <div style={{ background:'white', borderRadius:'16px', padding:'24px', border:`1px solid ${c.border}`, boxShadow:'0 2px 16px rgba(44,30,16,0.06)' }}>
                <p style={{ fontSize:'11px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'#B8905E', marginBottom:'12px' }}>
                  Compatible avec
                </p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'20px' }}>
                  {detail.logiciels.map(l => (
                    <span
                      key={l}
                      style={{ fontSize:'12px', fontWeight:600, padding:'5px 11px', borderRadius:'100px', background: c.pill, color: c.pillTxt, border:`1px solid ${c.border}` }}
                    >
                      {l}
                    </span>
                  ))}
                </div>

                {/* CTA téléphone */}
                <div style={{ padding:'16px', borderRadius:'12px', background: accentColor + '08', border:`1px solid ${c.border}` }}>
                  <p style={{ fontWeight:700, fontSize:'13px', color:'#2C1E10', marginBottom:'5px' }}>Une question sur ce service ?</p>
                  <p style={{ fontSize:'12px', color:'#5A4428', lineHeight:1.6, marginBottom:'10px' }}>Notre équipe répond sans engagement.</p>
                  {AGENCES.map(a => (
                    <a
                      key={a.id}
                      href={`tel:${a.phoneRaw}`}
                      style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'13px', fontWeight:700, color: accentColor, textDecoration:'none', padding:'3px 0' }}
                    >
                      <Phone size={13} /> {a.city} · {a.phone}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Autres services */}
            <div>
              <p style={{ fontSize:'11px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'#B8905E', marginBottom:'12px' }}>
                Voir aussi
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                {otherSlugs.map(s => (
                  <Link
                    key={s}
                    to={`/services/${s}`}
                    style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'12px', padding:'14px 16px', borderRadius:'12px', background:'white', border:'1px solid rgba(232,213,200,0.7)', textDecoration:'none', boxShadow:'0 2px 10px rgba(44,30,16,0.05)', transition:'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow='0 6px 24px rgba(44,30,16,0.10)'; e.currentTarget.style.transform='translateX(3px)' }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow='0 2px 10px rgba(44,30,16,0.05)'; e.currentTarget.style.transform='translateX(0)' }}
                  >
                    <span style={{ fontWeight:600, fontSize:'14px', color:'#2C1E10', textTransform:'capitalize' }}>
                      {s === 'cabinets' ? 'Cabinets Médicaux' : s === 'dentaires' ? 'Centres Dentaires' : 'Établissements de Santé'}
                    </span>
                    <ArrowRight size={15} style={{ color:'#C95C35', flexShrink:0 }} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Retour */}
        <div style={{ marginTop:'40px' }}>
          <Link
            to="/#services"
            style={{ display:'inline-flex', alignItems:'center', gap:'8px', fontSize:'14px', fontWeight:600, color:'#B8905E', textDecoration:'none' }}
          >
            <ArrowLeft size={15} /> Retour à nos services
          </Link>
        </div>
      </div>
    </div>
  )
}