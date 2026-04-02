import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react'
import AdminLayout from '../AdminLayout'
import { useAdmin } from '../../../hooks/useAdmin'

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const CAT_LABELS = {
  segur: 'Ségur', logiciel: 'Logiciel', securite: 'Cybersécurité',
  materiel: 'Matériel', 'sante-num': 'Santé num.',
}

const CAT_COLORS = {
  segur: '#0E6E9E', logiciel: '#8B74CA', securite: '#C95C35',
  materiel: '#D4A010', 'sante-num': '#617A36',
}

export default function ArticlesList() {
  const { authFetch } = useAdmin()
  const [articles, setArticles] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [deleting, setDeleting] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await authFetch('articles/admin/all')
      setArticles(data)
    } catch {}
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  // ── Toggler publier/dépublier ─────────────────────────────
  const togglePublish = async (article) => {
    try {
      await authFetch(`articles/${article.id}`, {
        method: 'PUT',
        body:   JSON.stringify({ published: !article.published }),
      })
      setArticles(prev => prev.map(a => a.id === article.id ? { ...a, published: !a.published } : a))
    } catch (err) {
      alert(err.message)
    }
  }

  // ── Supprimer ─────────────────────────────────────────────
  const handleDelete = async (article) => {
    if (!confirm(`Supprimer définitivement "${article.title}" ?`)) return
    setDeleting(article.id)
    try {
      await authFetch(`articles/${article.id}`, { method: 'DELETE' })
      setArticles(prev => prev.filter(a => a.id !== article.id))
    } catch (err) {
      alert(err.message)
    } finally {
      setDeleting(null)
    }
  }

  return (
    <AdminLayout title="Articles">

      {/* Barre d'actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <p style={{ fontSize: '14px', color: '#B8905E' }}>
          {articles.length} article{articles.length > 1 ? 's' : ''} au total
        </p>
        <Link to="/admin/articles/new" className="btn-terra" style={{ textDecoration: 'none', fontSize: '14px' }}>
          <Plus size={16} /> Nouvel article
        </Link>
      </div>

      {/* Tableau */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#B8905E' }}>Chargement…</div>
      ) : articles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '16px', border: '1px dashed rgba(201,92,53,0.20)' }}>
          <p style={{ color: '#B8905E', marginBottom: '16px' }}>Aucun article pour l'instant.</p>
          <Link to="/admin/articles/new" className="btn-terra" style={{ textDecoration: 'none', fontSize: '14px' }}>
            <Plus size={16} /> Créer le premier article
          </Link>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid rgba(232,213,200,0.7)', overflow: 'hidden', boxShadow: '0 2px 16px rgba(44,30,16,0.06)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(232,213,200,0.7)', background: 'rgba(253,250,246,0.8)' }}>
                {['Titre', 'Catégorie', 'Statut', 'Date', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#B8905E' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {articles.map((article, i) => (
                <tr
                  key={article.id}
                  style={{ borderBottom: i < articles.length - 1 ? '1px solid rgba(232,213,200,0.5)' : 'none', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(253,250,246,0.7)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {/* Titre */}
                  <td style={{ padding: '14px 16px', maxWidth: '300px' }}>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#2C1E10', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {article.title}
                    </p>
                    <p style={{ fontSize: '11px', color: '#B8905E', marginTop: '2px' }}>/{article.slug}</p>
                  </td>

                  {/* Catégorie */}
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, padding: '3px 10px', borderRadius: '100px', background: (CAT_COLORS[article.category] ?? '#C95C35') + '15', color: CAT_COLORS[article.category] ?? '#C95C35' }}>
                      {CAT_LABELS[article.category] ?? article.category}
                    </span>
                  </td>

                  {/* Statut */}
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: 600, padding: '3px 10px', borderRadius: '100px', background: article.published ? 'rgba(97,122,54,0.12)' : 'rgba(201,92,53,0.09)', color: article.published ? '#617A36' : '#C95C35' }}>
                      {article.published ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
                      {article.published ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>

                  {/* Date */}
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#B8905E', whiteSpace: 'nowrap' }}>
                    {formatDate(article.publishedAt ?? article.updatedAt)}
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      {/* Publier / dépublier */}
                      <button
                        onClick={() => togglePublish(article)}
                        title={article.published ? 'Passer en brouillon' : 'Publier'}
                        style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: article.published ? 'rgba(97,122,54,0.10)' : 'rgba(201,92,53,0.08)', color: article.published ? '#617A36' : '#C95C35', transition: 'all 0.15s' }}
                      >
                        {article.published ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>

                      {/* Modifier */}
                      <Link
                        to={`/admin/articles/${article.id}`}
                        title="Modifier"
                        style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid rgba(14,110,158,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0E6E9E', background: 'rgba(14,110,158,0.06)', textDecoration: 'none', transition: 'all 0.15s' }}
                      >
                        <Pencil size={14} />
                      </Link>

                      {/* Supprimer */}
                      <button
                        onClick={() => handleDelete(article)}
                        disabled={deleting === article.id}
                        title="Supprimer"
                        style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid rgba(201,92,53,0.20)', background: 'rgba(201,92,53,0.06)', color: '#C95C35', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s', opacity: deleting === article.id ? 0.5 : 1 }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  )
}