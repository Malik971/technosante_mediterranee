import { Phone, Wifi, WifiOff, Clock } from 'lucide-react'
import { useOnlineStatus } from '../../../hooks/useOnlineStatus'
import { AGENCES, PHOTOS } from '../../../constants/siteData'
import Tag from '../../../components/ui/Tag'

const TEAMVIEWER_URL = 'https://get.teamviewer.com/6gkiy5b'
const RALF_URL       = 'https://jrcorp.pcscloud.net/INSTALL/Ralf'

export default function HeroAssistance() {
  const { isOnline, count, nextSlot } = useOnlineStatus()

  return (
    <section
      className="relative overflow-hidden"
      style={{ paddingTop: '80px' }}
      aria-label="Assistance — accès rapide"
    >
      {/* ── Photo de fond avec overlay ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={PHOTOS.techWork2}
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(253,250,246,0.97) 0%, rgba(253,250,246,0.93) 40%, rgba(239,247,251,0.88) 100%)',
          }}
          aria-hidden="true"
        />
        {/* Badge placeholder */}
        {/* <div
          className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1.5 rounded-lg z-10 opacity-60"
          style={{ background: 'rgba(44,30,16,0.4)', color: 'white', backdropFilter: 'blur(4px)' }}
          aria-hidden="true"
        >
          📷 Photo à remplacer
        </div> */}
      </div>

      {/* ── Blobs additionnels ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10" aria-hidden="true">
        <div className="absolute w-2.5 h-2.5 rounded-full bg-terra-300 opacity-60 animate-float" style={{ top:'28%', left:'7%', animationDelay:'0s' }} />
        <div className="absolute w-2 h-2 rounded-full bg-mer-400 opacity-40 animate-float" style={{ top:'55%', right:'14%', animationDelay:'2.5s' }} />
      </div>

      <div className="relative z-20 section-inner px-6 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── Gauche ── */}
          <div>
            <div className="animate-fade-in">
              <Tag variant="terra" className="mb-6">✦ Assistance technique</Tag>
            </div>
            <h1 className="animate-fade-up mb-5" style={{ animationDelay:'0.1s' }}>
              <span className="block text-ardoise-800">Une panne ?</span>
              <span className="block text-ardoise-800">Une question ?</span>
              <em
                className="not-italic block"
                style={{
                  background: 'linear-gradient(135deg,#C95C35 20%,#F0BC2A 60%,#C95C35 90%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer-text 3.5s linear infinite',
                }}
              >
                On intervient.
              </em>
            </h1>

            <p className="text-ardoise-500 text-lg leading-relaxed mb-8 max-w-md animate-fade-up" style={{ animationDelay:'0.2s' }}>
              Télémaintenance, intervention sur site, support téléphonique — choisissez le mode qui correspond à votre situation.
            </p>

            {/* Statut live */}
            <div
              className="animate-fade-up inline-flex items-center gap-4 rounded-xl2 px-5 py-3.5 mb-8"
              style={{
                background: isOnline ? 'linear-gradient(135deg,rgba(97,122,54,0.10),rgba(97,122,54,0.06))' : 'linear-gradient(135deg,rgba(201,92,53,0.09),rgba(201,92,53,0.05))',
                border: `1px solid ${isOnline ? 'rgba(97,122,54,0.22)' : 'rgba(201,92,53,0.22)'}`,
                animationDelay: '0.3s',
              }}
              role="status" aria-live="polite"
            >
              <div className="relative flex-shrink-0">
                <div className="w-3 h-3 rounded-full" style={{ background: isOnline ? '#617A36' : '#C95C35' }} />
                {isOnline && <div className="absolute inset-0 rounded-full animate-ping" style={{ background: 'rgba(97,122,54,0.4)' }} aria-hidden="true" />}
              </div>
              {isOnline ? <Wifi size={16} style={{ color:'#617A36' }} aria-hidden="true" /> : <WifiOff size={16} style={{ color:'#C95C35' }} aria-hidden="true" />}
              <div>
                <p className="text-sm font-bold" style={{ color: isOnline ? '#455A24' : '#A54428' }}>
                  {isOnline ? `${count} technicien${count > 1 ? 's' : ''} disponible${count > 1 ? 's' : ''}` : 'Équipe hors ligne'}
                </p>
                <p className="text-xs" style={{ color: isOnline ? '#617A36' : '#C95C35' }}>{nextSlot}</p>
              </div>
            </div>

            {/* Téléphones */}
            <div className="animate-fade-up flex flex-col sm:flex-row gap-3" style={{ animationDelay:'0.35s' }}>
              {AGENCES.map((agence) => (
                <a
                  key={agence.id}
                  href={`tel:${agence.phoneRaw}`}
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl transition-all duration-200 group"
                  style={{ background: 'white', border: '1px solid rgba(201,92,53,0.18)', boxShadow: 'var(--shadow-card)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'; e.currentTarget.style.borderColor = 'rgba(201,92,53,0.35)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card)';       e.currentTarget.style.borderColor = 'rgba(201,92,53,0.18)' }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg,#FDE0D0,#FAC0A0)' }} aria-hidden="true">
                    <Phone size={15} style={{ color:'#C95C35' }} />
                  </div>
                  <div>
                    <p className="text-xs text-ardoise-400 font-medium leading-none mb-0.5">{agence.city}</p>
                    <p className="text-sm font-bold text-ardoise-800">{agence.phone}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ── Droite — boutons RALF + TeamViewer ── */}
          <div className="animate-fade-up" style={{ animationDelay:'0.2s' }}>
            <div className="space-y-5">

              {/* RALF */}
              <a
                href={RALF_URL} target="_blank" rel="noopener noreferrer"
                className="group relative flex items-center gap-6 p-7 rounded-xl3 overflow-hidden transition-all duration-300"
                style={{ background: 'linear-gradient(135deg,#C95C35 0%,#A54428 100%)', boxShadow: '0 8px 32px rgba(201,92,53,0.35)', textDecoration:'none' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(201,92,53,0.45)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.boxShadow = '0 8px 32px rgba(201,92,53,0.35)' }}
                aria-label="Lancer RALF — assistance en ligne"
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-15 pointer-events-none" style={{ background:'radial-gradient(circle,rgba(240,188,42,0.8) 0%,transparent 70%)' }} aria-hidden="true" />
                <div className="w-16 h-16 rounded-xl2 flex items-center justify-center flex-shrink-0" style={{ background:'rgba(255,255,255,0.20)', border:'1px solid rgba(255,255,255,0.25)' }} aria-hidden="true">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <rect x="3" y="5" width="24" height="16" rx="3" stroke="white" strokeWidth="1.8"/>
                    <path d="M9 28H21M15 21V28" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                    <circle cx="15" cy="13" r="4" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="1.5"/>
                    <path d="M13 13L15 11L17 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 11V16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="flex-1 relative z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-bold text-xl" style={{ fontFamily:'var(--font-display)' }}>RALF</p>
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background:'rgba(255,255,255,0.20)', color:'rgba(255,255,255,0.9)' }}>Notre outil</span>
                  </div>
                  <p className="text-terra-100 text-sm leading-snug">
                    <strong className="text-white">R</strong>endre l'<strong className="text-white">A</strong>ssistance en <strong className="text-white">L</strong>igne (trop) <strong className="text-white">F</strong>acile
                  </p>
                  <p className="text-terra-200 text-xs mt-1.5">Demandez de l'aide sans décrocher le téléphone</p>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1" style={{ background:'rgba(255,255,255,0.20)' }} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M9 4L13 8L9 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </a>

              {/* TeamViewer */}
              <a
                href={TEAMVIEWER_URL} target="_blank" rel="noopener noreferrer"
                className="group relative flex items-center gap-6 p-7 rounded-xl3 overflow-hidden bg-white transition-all duration-300"
                style={{ border:'1.5px solid rgba(14,110,158,0.22)', boxShadow:'0 8px 32px rgba(14,110,158,0.12)', textDecoration:'none' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(14,110,158,0.20)'; e.currentTarget.style.borderColor = 'rgba(14,110,158,0.40)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.boxShadow = '0 8px 32px rgba(14,110,158,0.12)'; e.currentTarget.style.borderColor = 'rgba(14,110,158,0.22)' }}
                aria-label="Lancer TeamViewer"
              >
                <div className="w-16 h-16 rounded-xl2 flex items-center justify-center flex-shrink-0" style={{ background:'linear-gradient(135deg,#D0E8F4,#A0CDE6)' }} aria-hidden="true">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <rect x="3" y="5" width="24" height="16" rx="3" stroke="#0E6E9E" strokeWidth="1.8"/>
                    <path d="M9 28H21M15 21V28" stroke="#0E6E9E" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M10 13L13 10L16 13" stroke="#0E6E9E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 10V18" stroke="#0E6E9E" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M18 10L21 13M21 10L18 13" stroke="#0E6E9E" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-ardoise-800 font-bold text-xl" style={{ fontFamily:'var(--font-display)' }}>TeamViewer</p>
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background:'rgba(14,110,158,0.08)', color:'#0A5580', border:'1px solid rgba(14,110,158,0.15)' }}>Windows & Mac</span>
                  </div>
                  <p className="text-ardoise-500 text-sm">Programme de prise en main à distance sécurisée</p>
                  <p className="text-ardoise-400 text-xs mt-1.5">À utiliser à la demande de votre technicien</p>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1" style={{ background:'rgba(14,110,158,0.10)' }} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M9 4L13 8L9 12" stroke="#0E6E9E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </a>

              {/* Note sécurité */}
              <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background:'rgba(212,160,16,0.07)', border:'1px solid rgba(212,160,16,0.18)' }} role="note">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background:'rgba(212,160,16,0.15)' }} aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2L6 7M6 9.5V10" stroke="#D4A010" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                <p className="text-xs text-ardoise-500 leading-relaxed">
                  <strong className="text-ardoise-700">Sécurité :</strong> ne lancez ces programmes <strong className="text-ardoise-700">qu'à la demande explicite de votre technicien</strong>. Un code vous sera demandé — ne le communiquez jamais par email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vague */}
      <div className="relative z-20 overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 50" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0,25 C360,50 720,0 1080,25 C1260,38 1380,28 1440,25 L1440,50 L0,50 Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
