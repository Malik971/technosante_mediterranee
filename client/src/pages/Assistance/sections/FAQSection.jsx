import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { FAQ_ASSISTANCE } from '../../../constants/siteData'
import Tag from '../../../components/ui/Tag'

// ── Item accordéon individuel ──────────────────────────────
function FAQItem({ item, index, isOpen, onToggle }) {
  return (
    <div
      className={`rounded-xl2 overflow-hidden transition-all duration-200 ${
        isOpen
          ? 'shadow-warm'
          : ''
      }`}
      style={{
        background: isOpen ? 'white' : 'white',
        border: isOpen
          ? '1px solid rgba(201,92,53,0.22)'
          : '1px solid rgba(232,213,200,0.7)',
        boxShadow: isOpen ? '0 4px 24px rgba(201,92,53,0.10)' : 'none',
      }}
    >
      {/* Question — bouton trigger */}
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        {/* Numéro + texte */}
        <div className="flex items-start gap-4">
          <span
            className="text-xs font-bold flex-shrink-0 mt-0.5"
            style={{
              color: isOpen ? '#C95C35' : '#B8905E',
              fontFamily: 'var(--font-body)',
              minWidth: '1.5rem',
            }}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className="font-semibold text-sm md:text-base leading-snug transition-colors duration-200"
            style={{
              color: isOpen ? '#2C1E10' : '#5A4428',
              fontFamily: 'var(--font-body)',
            }}
          >
            {item.q}
          </span>
        </div>

        {/* Icône +/− */}
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
          style={{
            background: isOpen
              ? 'linear-gradient(135deg,#C95C35,#A54428)'
              : 'rgba(201,92,53,0.08)',
          }}
          aria-hidden="true"
        >
          {isOpen
            ? <Minus size={13} style={{ color: 'white' }} />
            : <Plus  size={13} style={{ color: '#C95C35' }} />
          }
        </div>
      </button>

      {/* Réponse — collapsible avec transition CSS */}
      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        style={{
          maxHeight:  isOpen ? '600px' : '0',
          overflow:   'hidden',
          transition: 'max-height 0.35s ease, opacity 0.3s ease',
          opacity:    isOpen ? 1 : 0,
        }}
      >
        <div
          className="px-6 pb-5 pt-0"
          style={{ paddingLeft: 'calc(1.5rem + 1.5rem + 1rem)' }}
        >
          <div
            className="h-px w-full mb-4"
            style={{ background: 'rgba(201,92,53,0.10)' }}
            aria-hidden="true"
          />
          <p className="text-ardoise-500 text-sm leading-relaxed">{item.a}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQSection() {
  const ref             = useScrollReveal()
  const [openIdx, setOpenIdx] = useState(0) // premier ouvert par défaut

  const handleToggle = (i) => {
    setOpenIdx((prev) => (prev === i ? null : i))
  }

  // Séparer en 2 colonnes sur desktop
  const half   = Math.ceil(FAQ_ASSISTANCE.length / 2)
  const colLeft  = FAQ_ASSISTANCE.slice(0, half)
  const colRight = FAQ_ASSISTANCE.slice(half)

  return (
    <section
      className="section-padding bg-texture-sable"
      ref={ref}
      aria-label="Questions fréquentes"
    >
      <div className="section-inner">

        {/* En-tête */}
        <div className="grid md:grid-cols-2 gap-10 items-end mb-14">
          <div>
            <div className="reveal">
              <Tag variant="mer" className="mb-5">FAQ</Tag>
            </div>
            <h2 className="reveal text-ardoise-800">
              Les questions<br />
              <span
                style={{
                  background: 'linear-gradient(135deg,#0E6E9E,#C95C35)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                qu'on nous pose souvent.
              </span>
            </h2>
          </div>
          <p className="reveal text-ardoise-500 text-lg leading-relaxed">
            Prise en main, sécurité, contrats, compatibilité… Retrouvez les réponses aux questions les plus courantes sur notre service d'assistance.
          </p>
        </div>

        {/* Deux colonnes d'accordéons */}
        <div className="reveal grid md:grid-cols-2 gap-4 items-start">

          {/* Colonne gauche */}
          <div className="space-y-3">
            {colLeft.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                index={i}
                isOpen={openIdx === i}
                onToggle={handleToggle}
              />
            ))}
          </div>

          {/* Colonne droite */}
          <div className="space-y-3">
            {colRight.map((item, i) => {
              const globalIdx = i + half
              return (
                <FAQItem
                  key={globalIdx}
                  item={item}
                  index={globalIdx}
                  isOpen={openIdx === globalIdx}
                  onToggle={handleToggle}
                />
              )
            })}
          </div>
        </div>

        {/* Encart contact si pas trouvé */}
        <div
          className="reveal mt-12 rounded-xl2 p-7 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left"
          style={{
            background: 'linear-gradient(135deg,rgba(201,92,53,0.06),rgba(14,110,158,0.04))',
            border: '1px solid rgba(201,92,53,0.14)',
          }}
        >
          <div
            className="w-12 h-12 rounded-xl2 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0"
            style={{ background: 'linear-gradient(135deg,#FDE0D0,#FAC0A0)' }}
            aria-hidden="true"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 2C6.03 2 2 6.03 2 11C2 15.97 6.03 20 11 20C15.97 20 20 15.97 20 11C20 6.03 15.97 2 11 2Z" stroke="#C95C35" strokeWidth="1.5"/>
              <path d="M11 7V11.5M11 14.5V15" stroke="#C95C35" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-ardoise-800 text-sm mb-1">Vous ne trouvez pas la réponse ?</p>
            <p className="text-ardoise-500 text-sm">Notre équipe répond à toutes vos questions par téléphone ou email, sans délai.</p>
          </div>
          <a
            href="tel:0499530532"
            className="btn-terra flex-shrink-0 text-sm"
          >
            Nous appeler
          </a>
        </div>
      </div>
    </section>
  )
}
