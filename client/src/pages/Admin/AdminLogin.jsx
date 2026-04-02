import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, Eye, EyeOff } from 'lucide-react'
import { useAdmin } from '../../hooks/useAdmin'

export default function AdminLogin() {
  const { login, loading, error } = useAdmin()
  const navigate = useNavigate()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPwd,  setShowPwd]  = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok = await login(email, password)
    if (ok) navigate('/admin')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(150deg, #FEF4EF 0%, #FDFAF6 50%, #EFF7FB 100%)', padding: '24px' }}>

      {/* Blobs déco */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }} aria-hidden="true">
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', filter: 'blur(60px)', background: 'radial-gradient(circle, rgba(201,92,53,0.12) 0%, transparent 70%)', top: '-100px', right: '-80px' }} />
        <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%', filter: 'blur(60px)', background: 'radial-gradient(circle, rgba(14,110,158,0.09) 0%, transparent 70%)', bottom: '-60px', left: '-40px' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg, #C95C35, #A54428)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(201,92,53,0.30)' }}>
            <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
              <path d="M9 2V16M2 9H16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="9" cy="9" r="2.5" fill="white" fillOpacity="0.4"/>
            </svg>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: '#2C1E10', marginBottom: '6px' }}>
            Interface Admin
          </h1>
          <p style={{ fontSize: '14px', color: '#B8905E' }}>TechnoSanté Méditerranée</p>
        </div>

        {/* Carte formulaire */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '36px', border: '1px solid rgba(201,92,53,0.14)', boxShadow: '0 8px 40px rgba(44,30,16,0.10)' }}>

          {error && (
            <div style={{ marginBottom: '20px', padding: '12px 16px', borderRadius: '10px', background: 'rgba(201,92,53,0.08)', border: '1px solid rgba(201,92,53,0.22)', color: '#A54428', fontSize: '13px', fontWeight: 500 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: '18px' }}>
              <label htmlFor="email" style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#B8905E', marginBottom: '6px' }}>
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@technosante.fr"
                className="input-med"
                autoComplete="email"
              />
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label htmlFor="password" style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#B8905E', marginBottom: '6px' }}>
                Mot de passe
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  type={showPwd ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-med"
                  style={{ paddingRight: '44px' }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(v => !v)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#B8905E', display: 'flex', alignItems: 'center' }}
                  aria-label={showPwd ? 'Masquer' : 'Afficher'}
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-terra"
              style={{ width: '100%', justifyContent: 'center', fontSize: '15px', padding: '13px' }}
            >
              {loading ? (
                <span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
              ) : (
                <><LogIn size={17} /> Se connecter</>
              )}
              <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#B8905E' }}>
          Accès réservé à l'équipe TechnoSanté
        </p>
      </div>
    </div>
  )
}