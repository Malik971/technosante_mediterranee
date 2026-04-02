import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Save, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import AdminLayout from '../AdminLayout'
import RichEditor from '../../../components/ui/RichEditor'
import { useAdmin } from '../../../hooks/useAdmin'

const CATEGORIES = [
  { value: 'segur',     label: 'Ségur du Numérique' },
  { value: 'logiciel',  label: 'Logiciel métier' },
  { value: 'securite',  label: 'Cybersécurité' },
  { value: 'materiel',  label: 'Matériel' },
  { value: 'sante-num', label: 'Santé numérique' },
]

const CAT_GRADIENTS = {
  segur:      { gradient: 'linear-gradient(135deg, #D0E8F4 0%, #A0CDE6 100%)', accentColor: '#0E6E9E' },
  logiciel:   { gradient: 'linear-gradient(135deg, #EDE8F5 0%, #D8CEEE 100%)', accentColor: '#8B74CA' },
  securite:   { gradient: 'linear-gradient(135deg, #FDE0D0 0%, #FAC0A0 100%)', accentColor: '#C95C35' },
  materiel:   { gradient: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', accentColor: '#D4A010' },
  'sante-num':{ gradient: 'linear-gradient(135deg, #EFF2E5 0%, #D5DDC0 100%)', accentColor: '#617A36' },
}

const EMPTY = {
  title:      '',
  excerpt:    '',
  content:    '',
  category:   'segur',
  tags:       '',
  author:     'Équipe TechnoSanté',
  readTime:   '5 min',
  featured:   false,
  published:  false,
}

export default function ArticleEditor() {
  const { id }    = useParams()   // undefined = nouveau, sinon = édition
  const isNew     = !id
  const navigate  = useNavigate()
  const { authFetch } = useAdmin()

  const [form,    setForm]    = useState(EMPTY)
  const [loading, setLoading] = useState(!isNew)
  const [saving,  setSaving]  = useState(false)
  const [saved,   setSaved]   = useState(false)
  const [error,   setError]   = useState(null)

  // ── Charger l'article existant ────────────────────────────
  useEffect(() => {
    if (isNew) return
    setLoading(true)
    authFetch(`articles/admin/all`)
      .then(items => {
        const article = items.find(a => String(a.id) === String(id))
        if (!article) { navigate('/admin/articles'); return }
        // Charger le contenu complet (admin/all ne renvoie pas content)
        return authFetch(`articles/${article.slug}`)
      })
      .then(full => {
        if (!full) return
        setForm({
          title:     full.title     ?? '',
          excerpt:   full.excerpt   ?? '',
          content:   full.content   ?? '',
          category:  full.category  ?? 'segur',
          tags:      (full.tags ?? []).join(', '),
          author:    full.author    ?? 'Équipe TechnoSanté',
          readTime:  full.readTime  ?? '5 min',
          featured:  full.featured  ?? false,
          published: full.published ?? false,
        })
      })
      .catch(() => navigate('/admin/articles'))
      .finally(() => setLoading(false))
  }, [id, isNew])

  // ── Mise à jour d'un champ ─────────────────────────────────
  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  // ── Sauvegarder ───────────────────────────────────────────
  const handleSave = async (publishOverride) => {
    setError(null)
    setSaving(true)

    const payload = {
      ...form,
      tags:      form.tags.split(',').map(t => t.trim()).filter(Boolean),
      published: publishOverride !== undefined ? publishOverride : form.published,
      gradient:  CAT_GRADIENTS[form.category]?.gradient   ?? CAT_GRADIENTS.segur.gradient,
      accentColor: CAT_GRADIENTS[form.category]?.accentColor ?? CAT_GRADIENTS.segur.accentColor,
    }

    try {
      if (isNew) {
        const created = await authFetch('articles', { method: 'POST', body: JSON.stringify(payload) })
        setSaved(true)
        setTimeout(() => navigate(`/admin/articles/${created.id}`), 800)
      } else {
        await authFetch(`articles/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
        if (publishOverride !== undefined) set('published', publishOverride)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <AdminLayout title="Chargement…"><div style={{ color: '#B8905E' }}>Chargement…</div></AdminLayout>

  const label = isNew ? 'Nouvel article' : 'Modifier l\'article'

  return (
    <AdminLayout title={label}>

      {/* Barre actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <Link to="/admin/articles" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#B8905E', textDecoration: 'none' }}>
          <ArrowLeft size={14} /> Retour aux articles
        </Link>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {/* Publier / dépublier */}
          <button
            onClick={() => handleSave(!form.published)}
            disabled={saving}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px', borderRadius: '10px', border: '1px solid rgba(97,122,54,0.25)', background: form.published ? 'rgba(201,92,53,0.08)' : 'rgba(97,122,54,0.10)', color: form.published ? '#C95C35' : '#617A36', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
          >
            {form.published ? <><EyeOff size={14} /> Passer en brouillon</> : <><Eye size={14} /> Publier</>}
          </button>
          {/* Sauvegarder */}
          <button
            onClick={() => handleSave()}
            disabled={saving}
            className="btn-terra"
            style={{ fontSize: '14px', padding: '9px 20px' }}
          >
            {saving ? (
              <span style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
            ) : saved ? '✓ Sauvegardé' : <><Save size={15} /> Sauvegarder</>}
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </button>
        </div>
      </div>

      {error && (
        <div style={{ marginBottom: '20px', padding: '12px 16px', borderRadius: '10px', background: 'rgba(201,92,53,0.08)', border: '1px solid rgba(201,92,53,0.22)', color: '#A54428', fontSize: '13px' }}>
          {error}
        </div>
      )}

      {/* Formulaire — 2 colonnes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', gap: '24px', alignItems: 'start' }}>

        {/* Colonne principale */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Titre */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid rgba(232,213,200,0.7)' }}>
            <label style={labelStyle}>Titre *</label>
            <input
              type="text"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="Titre de l'article"
              className="input-med"
              style={{ fontSize: '18px', fontFamily: 'var(--font-display)', fontWeight: 600 }}
            />
          </div>

          {/* Extrait */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid rgba(232,213,200,0.7)' }}>
            <label style={labelStyle}>Extrait *</label>
            <p style={hintStyle}>Résumé affiché dans les cartes et résultats de recherche (2-3 phrases max).</p>
            <textarea
              value={form.excerpt}
              onChange={e => set('excerpt', e.target.value)}
              placeholder="Résumé de l'article…"
              className="input-med"
              style={{ resize: 'vertical', minHeight: '80px', fontSize: '14px' }}
            />
          </div>

          {/* Contenu */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid rgba(232,213,200,0.7)' }}>
            <label style={labelStyle}>Contenu *</label>
            <p style={hintStyle}>Utilisez l'éditeur visuel ou basculez en HTML brut.</p>
            <RichEditor
              value={form.content}
              onChange={v => set('content', v)}
              placeholder="Rédigez votre article…"
            />
          </div>
        </div>

        {/* Sidebar options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '24px' }}>

          {/* Statut */}
          <div style={cardStyle}>
            <label style={labelStyle}>Statut</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => set('published', false)}
                style={{ ...toggleBtnStyle, background: !form.published ? '#C95C35' : 'white', color: !form.published ? 'white' : '#B8905E', border: `1px solid ${!form.published ? '#C95C35' : 'rgba(201,92,53,0.20)'}` }}
              >
                Brouillon
              </button>
              <button
                type="button"
                onClick={() => set('published', true)}
                style={{ ...toggleBtnStyle, background: form.published ? '#617A36' : 'white', color: form.published ? 'white' : '#B8905E', border: `1px solid ${form.published ? '#617A36' : 'rgba(97,122,54,0.20)'}` }}
              >
                Publié
              </button>
            </div>
          </div>

          {/* Catégorie */}
          <div style={cardStyle}>
            <label style={labelStyle}>Catégorie *</label>
            <select value={form.category} onChange={e => set('category', e.target.value)} className="input-med">
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>

          {/* À la une */}
          <div style={cardStyle}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={form.featured}
                onChange={e => set('featured', e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#C95C35' }}
              />
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#2C1E10' }}>Mettre à la une</span>
            </label>
            <p style={hintStyle}>Cet article apparaîtra en première position sur la page Actualités.</p>
          </div>

          {/* Auteur + temps de lecture */}
          <div style={cardStyle}>
            <label style={labelStyle}>Auteur</label>
            <input type="text" value={form.author} onChange={e => set('author', e.target.value)} className="input-med" style={{ marginBottom: '12px' }} />
            <label style={labelStyle}>Temps de lecture</label>
            <input type="text" value={form.readTime} onChange={e => set('readTime', e.target.value)} placeholder="5 min" className="input-med" />
          </div>

          {/* Tags */}
          <div style={cardStyle}>
            <label style={labelStyle}>Tags</label>
            <p style={hintStyle}>Séparés par des virgules. Ex : segur, logiciel</p>
            <input
              type="text"
              value={form.tags}
              onChange={e => set('tags', e.target.value)}
              placeholder="segur, logiciel"
              className="input-med"
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

const labelStyle = {
  display: 'block', fontSize: '11px', fontWeight: 700,
  textTransform: 'uppercase', letterSpacing: '0.08em',
  color: '#B8905E', marginBottom: '6px',
}
const hintStyle = {
  fontSize: '12px', color: '#D5C5AA', marginBottom: '10px', marginTop: '-2px',
}
const cardStyle = {
  background: 'white', borderRadius: '14px', padding: '18px',
  border: '1px solid rgba(232,213,200,0.7)',
}
const toggleBtnStyle = {
  flex: 1, padding: '7px', borderRadius: '8px',
  fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
}