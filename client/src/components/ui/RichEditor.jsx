import { useEffect, useRef, useState } from 'react'
import { Code, Eye } from 'lucide-react'

/**
 * RichEditor — éditeur double mode :
 * - Mode WYSIWYG : Quill.js chargé dynamiquement via CDN
 * - Mode HTML brut : textarea pour ceux qui connaissent le HTML
 *
 * @param {string}   value      — contenu HTML courant
 * @param {function} onChange   — appelé avec le nouveau HTML à chaque modification
 * @param {string}   placeholder
 */
export default function RichEditor({ value = '', onChange, placeholder = 'Rédigez votre contenu…' }) {
  const [mode,    setMode]    = useState('wysiwyg') // 'wysiwyg' | 'html'
  const [quillReady, setQuillReady] = useState(false)
  const editorRef = useRef(null)
  const quillRef  = useRef(null)

  // ── Charger Quill depuis CDN ──────────────────────────────
  useEffect(() => {
    if (window.Quill) { setQuillReady(true); return }

    // Charger le CSS Quill
    const link = document.createElement('link')
    link.rel   = 'stylesheet'
    link.href  = 'https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.snow.min.css'
    document.head.appendChild(link)

    // Charger le JS Quill
    const script  = document.createElement('script')
    script.src    = 'https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.min.js'
    script.onload = () => setQuillReady(true)
    document.head.appendChild(script)
  }, [])

  // ── Initialiser Quill quand il est prêt et le mode est WYSIWYG ──
  useEffect(() => {
    if (!quillReady || mode !== 'wysiwyg' || !editorRef.current) return
    if (quillRef.current) return // déjà initialisé

    const quill = new window.Quill(editorRef.current, {
      theme: 'snow',
      placeholder,
      modules: {
        toolbar: [
          [{ header: [2, 3, false] }],
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link'],
          ['clean'],
        ],
      },
    })

    // Injecter le contenu initial
    if (value) quill.clipboard.dangerouslyPasteHTML(value)

    // Écouter les changements
    quill.on('text-change', () => {
      onChange?.(quill.root.innerHTML)
    })

    quillRef.current = quill
  }, [quillReady, mode])

  // ── Sync value → Quill si value change de l'extérieur ─────
  useEffect(() => {
    if (quillRef.current && mode === 'wysiwyg') {
      const current = quillRef.current.root.innerHTML
      if (current !== value && value !== undefined) {
        quillRef.current.clipboard.dangerouslyPasteHTML(value ?? '')
      }
    }
  }, [value, mode])

  // ── Passer de WYSIWYG → HTML : extraire le HTML de Quill ──
  const switchToHtml = () => {
    if (quillRef.current) {
      onChange?.(quillRef.current.root.innerHTML)
    }
    quillRef.current = null
    setMode('html')
  }

  // ── Passer de HTML → WYSIWYG ──────────────────────────────
  const switchToWysiwyg = () => {
    setMode('wysiwyg')
    // Quill sera réinitialisé par le useEffect ci-dessus
  }

  return (
    <div style={{ border: '1px solid rgba(201,92,53,0.20)', borderRadius: '12px', overflow: 'hidden' }}>

      {/* Barre de mode */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '8px 12px', background: 'rgba(253,250,246,0.8)', borderBottom: '1px solid rgba(201,92,53,0.12)' }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            type="button"
            onClick={switchToWysiwyg}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', border: 'none', transition: 'all 0.15s', background: mode === 'wysiwyg' ? '#C95C35' : 'transparent', color: mode === 'wysiwyg' ? 'white' : '#B8905E' }}
          >
            <Eye size={12} /> Éditeur
          </button>
          <button
            type="button"
            onClick={switchToHtml}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', border: 'none', transition: 'all 0.15s', background: mode === 'html' ? '#C95C35' : 'transparent', color: mode === 'html' ? 'white' : '#B8905E' }}
          >
            <Code size={12} /> HTML
          </button>
        </div>
      </div>

      {/* Mode WYSIWYG */}
      {mode === 'wysiwyg' && (
        <div>
          {!quillReady && (
            <div style={{ padding: '20px', textAlign: 'center', color: '#B8905E', fontSize: '13px' }}>
              Chargement de l'éditeur…
            </div>
          )}
          <div
            ref={editorRef}
            style={{ minHeight: '260px', fontFamily: 'var(--font-body)', fontSize: '14px' }}
          />
        </div>
      )}

      {/* Mode HTML */}
      {mode === 'html' && (
        <textarea
          value={value}
          onChange={e => onChange?.(e.target.value)}
          placeholder="<h2>Titre</h2><p>Votre contenu HTML…</p>"
          style={{ width: '100%', minHeight: '280px', padding: '16px', fontFamily: '"JetBrains Mono", monospace', fontSize: '13px', lineHeight: 1.7, border: 'none', outline: 'none', resize: 'vertical', background: '#1A1008', color: '#F2E5D0' }}
          spellCheck={false}
        />
      )}
    </div>
  )
}