import { useState, useEffect } from 'react'
import { Save, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import AdminLayout from '../AdminLayout'
import { useAdmin } from '../../../hooks/useAdmin'

const API = import.meta.env.VITE_API_URL || '/api'

const COLOR_DOTS = { terra: '#C95C35', mer: '#0E6E9E', garrigue: '#8B74CA' }

export default function ServicesList() {
  const { authFetch } = useAdmin()
  const [services, setServices] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [expanded, setExpanded] = useState(null)
  const [saving,   setSaving]   = useState(null)
  const [saved,    setSaved]    = useState(null)

  useEffect(() => {
    fetch(`${API}/services`)
      .then(r => r.json())
      .then(data => setServices(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // ── Mettre à jour un champ du service ─────────────────────
  const updateField = (id, field, value) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  // ── Mettre à jour une feature dans le tableau ──────────────
  const updateFeature = (serviceId, idx, value) => {
    setServices(prev => prev.map(s => {
      if (s.id !== serviceId) return s
      const features = [...(s.features ?? [])]
      features[idx] = value
      return { ...s, features }
    }))
  }

  const addFeature = (serviceId) => {
    setServices(prev => prev.map(s =>
      s.id === serviceId ? { ...s, features: [...(s.features ?? []), ''] } : s
    ))
  }

  const removeFeature = (serviceId, idx) => {
    setServices(prev => prev.map(s => {
      if (s.id !== serviceId) return s
      const features = (s.features ?? []).filter((_, i) => i !== idx)
      return { ...s, features }
    }))
  }

  // ── Sauvegarder un service ─────────────────────────────────
  const handleSave = async (service) => {
    setSaving(service.id)
    try {
      await authFetch(`services/${service.id}`, {
        method: 'PUT',
        body:   JSON.stringify({
          title:       service.title,
          subtitle:    service.subtitle,
          description: service.description,
          features:    service.features,
        }),
      })
      setSaved(service.id)
      setTimeout(() => setSaved(null), 2000)
    } catch (err) {
      alert(err.message)
    } finally {
      setSaving(null)
    }
  }

  const toggle = (id) => setExpanded(prev => prev === id ? null : id)

  if (loading) return <AdminLayout title="Services"><div style={{ color: '#B8905E' }}>Chargement…</div></AdminLayout>

  return (
    <AdminLayout title="Services">

      <p style={{ fontSize: '14px', color: '#B8905E', marginBottom: '24px' }}>
        Modifiez le titre, la description et les fonctionnalités affichées sur la page d'accueil.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {services.map(service => {
          const isOpen   = expanded === service.id
          const isSaving = saving  === service.id
          const isSaved  = saved   === service.id
          const dot      = COLOR_DOTS[service.color] ?? '#C95C35'

          return (
            <div
              key={service.id}
              style={{ background: 'white', borderRadius: '16px', border: `1px solid ${isOpen ? dot + '40' : 'rgba(232,213,200,0.7)'}`, overflow: 'hidden', boxShadow: '0 2px 16px rgba(44,30,16,0.05)', transition: 'border-color 0.2s' }}
            >
              {/* En-tête accordéon */}
              <button
                onClick={() => toggle(service.id)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              >
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: dot, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '15px', fontWeight: 700, color: '#2C1E10' }}>{service.title}</p>
                  <p style={{ fontSize: '12px', color: '#B8905E', marginTop: '2px' }}>{service.subtitle}</p>
                </div>
                {isOpen ? <ChevronUp size={16} style={{ color: '#B8905E', flexShrink: 0 }} /> : <ChevronDown size={16} style={{ color: '#B8905E', flexShrink: 0 }} />}
              </button>

              {/* Contenu éditable */}
              {isOpen && (
                <div style={{ padding: '0 20px 24px', borderTop: '1px solid rgba(232,213,200,0.5)' }}>
                  <div style={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    {/* Titre */}
                    <div>
                      <label style={labelStyle}>Titre affiché</label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={e => updateField(service.id, 'title', e.target.value)}
                        className="input-med"
                      />
                    </div>

                    {/* Sous-titre */}
                    <div>
                      <label style={labelStyle}>Sous-titre (badge)</label>
                      <input
                        type="text"
                        value={service.subtitle}
                        onChange={e => updateField(service.id, 'subtitle', e.target.value)}
                        className="input-med"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label style={labelStyle}>Description courte</label>
                      <textarea
                        value={service.description}
                        onChange={e => updateField(service.id, 'description', e.target.value)}
                        className="input-med"
                        style={{ resize: 'vertical', minHeight: '80px' }}
                      />
                    </div>

                    {/* Features */}
                    <div>
                      <label style={labelStyle}>Points clés (bullets)</label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px' }}>
                        {(service.features ?? []).map((feat, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span style={{ fontSize: '12px', color: dot, fontWeight: 700, minWidth: '20px' }}>{idx + 1}.</span>
                            <input
                              type="text"
                              value={feat}
                              onChange={e => updateFeature(service.id, idx, e.target.value)}
                              className="input-med"
                              style={{ flex: 1 }}
                            />
                            <button
                              type="button"
                              onClick={() => removeFeature(service.id, idx)}
                              style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid rgba(201,92,53,0.18)', background: 'none', cursor: 'pointer', color: '#C95C35', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => addFeature(service.id)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', border: `1px dashed ${dot}60`, background: dot + '08', color: dot, fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                      >
                        <Plus size={12} /> Ajouter un point
                      </button>
                    </div>

                    {/* Bouton sauvegarder */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => handleSave(service)}
                        disabled={isSaving}
                        className="btn-terra"
                        style={{ fontSize: '14px', padding: '9px 20px' }}
                      >
                        {isSaving ? (
                          <span style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                        ) : isSaved ? '✓ Sauvegardé' : <><Save size={15} /> Sauvegarder</>}
                        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </AdminLayout>
  )
}

const labelStyle = {
  display: 'block', fontSize: '11px', fontWeight: 700,
  textTransform: 'uppercase', letterSpacing: '0.08em',
  color: '#B8905E', marginBottom: '6px',
}