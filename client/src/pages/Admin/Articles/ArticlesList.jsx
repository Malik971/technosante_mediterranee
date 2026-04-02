import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react'
import AdminLayout from '../AdminLayout'
import { useAdmin } from '../../../hooks/useAdmin'

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })
}

const CAT_LABELS = {
  segur: 'Ségur', logiciel: 'Logiciel', securite: 'Cyber',
  materiel: 'Matériel', 'sante-num': 'Santé num.',
}
const CAT_COLORS = {
  segur: '#0E6E9E', logiciel: '#8B74CA', securite: '#C95C35',
  materiel: '#D4A010', 'sante-num': '#617A36',
}

// ── Carte mobile par article ──────────────────────────────
function ArticleCard({ article, onToggle, onDelete, deleting }) {
  return (
    <div style={{ background: 'white', borderRadius: '14px', padding: '16px', border: '1px solid rgba(232,213,200,0.7)', boxShadow: '0 2px 10px rgba(44,30,16,0.05)', marginBottom: '10px' }}>
      {/* En-tête */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '14px', fontWeight: 700, color: '#2C1E10', lineHeight: 1.3, marginBottom: '3px' }}>
            {article.title}
          </p>
          <p style={{ fontSize: '11px', color: '#B8905E' }}>/{article.slug}</p>
        </div>
        <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 9px', borderRadius: '100px', flexShrink: 0, background: (article.published ? 'rgba(97,122,54,0.12)' : 'rgba(201,92,53,0.09)'), color: article.published ? '#617A36' : '#C95C35' }}>
          {article.published ? 'Publié' : 'Brouillon'}
        </span>
      </div>

      {/* Méta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '100px', background: (CAT_COLORS[article.category] ?? '#C95C35') + '15', color: CAT_COLORS[article.category] ?? '#C95C35' }}>
          {CAT_LABELS[article.category] ?? article.category}
        </span>
        <span style={{ fontSize: '11px', color: '#B8905E' }}>{formatDate(article.publishedAt ?? article.updatedAt)}</span>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => onToggle(article)}
          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '9px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, background: article.published ? 'rgba(201,92,53,0.08)' : 'rgba(97,122,54,0.10)', color: article.published ? '#C95C35' : '#617A36' }}
        >
          {article.published ? <><EyeOff size={14} /> Dépublier</> : <><Eye size={14} /> Publier</>}
        </button>
        <Link
          to={`/admin/articles/${article.id}`}
          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '9px', borderRadius: '10px', border: '1px solid rgba(14,110,158,0.20)', background: 'rgba(14,110,158,0.07)', color: '#0E6E9E', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}
        >
          <Pencil size={14} /> Modifier
        </Link>
        <button
          onClick={() => onDelete(article)}
          disabled={deleting === article.id}
          style={{ width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', border: '1px solid rgba(201,92,53,0.20)', background: 'rgba(201,92,53,0.06)', color: '#C95C35', cursor: 'pointer', opacity: deleting === article.id ? 0.5 : 1 }}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}

export default function ArticlesList() {
  const { authFetch } = useAdmin()
  const [articles, setArticles] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [deleting, setDeleting] = useState(null)

  const load = async () => {
    setLoading(true)
    try { setArticles(await authFetch('articles/admin/all')) }
    catch {}
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const togglePublish = async (article) => {
    try {
      await authFetch(`articles/${article.id}`, { method: 'PUT', body: JSON.stringify({ published: !article.published }) })
      setArticles(prev => prev.map(a => a.id === article.id ? { ...a, published: !a.published } : a))
    } catch (err) { alert(err.message) }
  }

  const handleDelete = async (article) => {
    if (!confirm(`Supprimer "${article.title}" ?`)) return
    setDeleting(article.id)
    try {
      await authFetch(`articles/${article.id}`, { method: 'DELETE' })
      setArticles(prev => prev.filter(a => a.id !== article.id))
    } catch (err) { alert(err.message) }
    finally { setDeleting(null) }
  }

  return (
    <AdminLayout title="Articles">
      {/* Barre d'actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <p style={{ fontSize: '13px', color: '#B8905E' }}>{articles.length} article{articles.length > 1 ? 's' : ''}</p>
        <Link to="/admin/articles/new" className="btn-terra" style={{ textDecoration: 'none', fontSize: '14px' }}>
          <Plus size={15} /> Nouvel article
        </Link>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#B8905E' }}>Chargement…</div>
      ) : articles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 20px', background: 'white', borderRadius: '16px', border: '1px dashed rgba(201,92,53,0.20)' }}>
          <p style={{ color: '#B8905E', marginBottom: '14px' }}>Aucun article.</p>
          <Link to="/admin/articles/new" className="btn-terra" style={{ textDecoration: 'none', fontSize: '14px' }}>
            <Plus size={15} /> Créer le premier
          </Link>
        </div>
      ) : (
        <>
          {/* ── Vue cartes mobile ── */}
          <div className="articles-cards">
            {articles.map(a => (
              <ArticleCard key={a.id} article={a} onToggle={togglePublish} onDelete={handleDelete} deleting={deleting} />
            ))}
          </div>

          {/* ── Vue tableau desktop ── */}
          <div className="articles-table" style={{ background: 'white', borderRadius: '16px', border: '1px solid rgba(232,213,200,0.7)', overflow: 'hidden', boxShadow: '0 2px 16px rgba(44,30,16,0.06)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(232,213,200,0.7)', background: 'rgba(253,250,246,0.8)' }}>
                  {['Titre', 'Catégorie', 'Statut', 'Date', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '11px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#B8905E' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {articles.map((article, i) => (
                  <tr key={article.id} style={{ borderBottom: i < articles.length - 1 ? '1px solid rgba(232,213,200,0.5)' : 'none' }}>
                    <td style={{ padding: '13px 14px', maxWidth: '260px' }}>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#2C1E10', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{article.title}</p>
                      <p style={{ fontSize: '11px', color: '#B8905E', marginTop: '1px' }}>/{article.slug}</p>
                    </td>
                    <td style={{ padding: '13px 14px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 9px', borderRadius: '100px', background: (CAT_COLORS[article.category] ?? '#C95C35') + '15', color: CAT_COLORS[article.category] ?? '#C95C35' }}>
                        {CAT_LABELS[article.category] ?? article.category}
                      </span>
                    </td>
                    <td style={{ padding: '13px 14px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 600, padding: '3px 9px', borderRadius: '100px', background: article.published ? 'rgba(97,122,54,0.12)' : 'rgba(201,92,53,0.09)', color: article.published ? '#617A36' : '#C95C35' }}>
                        {article.published ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                        {article.published ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td style={{ padding: '13px 14px', fontSize: '12px', color: '#B8905E', whiteSpace: 'nowrap' }}>
                      {formatDate(article.publishedAt ?? article.updatedAt)}
                    </td>
                    <td style={{ padding: '13px 14px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => togglePublish(article)} title={article.published ? 'Dépublier' : 'Publier'} style={actionBtnStyle(article.published ? '#C95C35' : '#617A36')}>
                          {article.published ? <EyeOff size={13} /> : <Eye size={13} />}
                        </button>
                        <Link to={`/admin/articles/${article.id}`} title="Modifier" style={{ ...actionBtnStyle('#0E6E9E'), textDecoration: 'none' }}>
                          <Pencil size={13} />
                        </Link>
                        <button onClick={() => handleDelete(article)} disabled={deleting === article.id} title="Supprimer" style={{ ...actionBtnStyle('#C95C35'), opacity: deleting === article.id ? 0.5 : 1 }}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <style>{`
        @media (max-width: 767px) { .articles-table { display: none; } .articles-cards { display: block; } }
        @media (min-width: 768px) { .articles-table { display: block; } .articles-cards { display: none; } }
      `}</style>
    </AdminLayout>
  )
}

const actionBtnStyle = (color) => ({
  width: '30px', height: '30px', borderRadius: '7px', border: `1px solid ${color}30`,
  background: color + '10', color, cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
})