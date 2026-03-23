import { ArrowRight, Phone, ChevronDown } from 'lucide-react'
import Button from '../../../components/ui/Button'
import Tag from '../../../components/ui/Tag'
import { AGENCES } from '../../../constants/siteData'

export default function HeroSection() {
  const mainAgence = AGENCES[0]

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #FEF4EF 0%, #FDFAF6 35%, #EFF7FB 70%, #F9F2E8 100%)',
        paddingTop: '80px',
      }}
      aria-label="Section principale"
    >

      {/* ── Taches organiques Méditerranée ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">

        {/* Blob terracotta — soleil levant */}
        <div
          className="hero-blob absolute"
          style={{
            width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(201,92,53,0.18) 0%, rgba(238,107,64,0.08) 50%, transparent 70%)',
            top: '-150px', right: '-100px',
            animationDelay: '0s',
          }}
        />

        {/* Blob bleu mer */}
        <div
          className="hero-blob absolute"
          style={{
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(14,110,158,0.12) 0%, rgba(32,136,191,0.06) 50%, transparent 70%)',
            bottom: '-100px', left: '-80px',
            animationDelay: '3s',
          }}
        />

        {/* Blob soleil doré */}
        <div
          className="hero-blob absolute"
          style={{
            width: '300px', height: '300px',
            background: 'radial-gradient(circle, rgba(240,188,42,0.14) 0%, transparent 70%)',
            top: '30%', left: '30%',
            animationDelay: '6s',
          }}
        />

        {/* Motif vagues décoratives */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full opacity-30"
          viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z"
            fill="rgba(201,92,53,0.06)"
          />
          <path
            d="M0,80 C360,50 720,110 1080,70 C1260,50 1380,80 1440,80 L1440,120 L0,120 Z"
            fill="rgba(14,110,158,0.05)"
          />
        </svg>

        {/* Cercles décoratifs flottants */}
        <div
          className="absolute w-3 h-3 rounded-full bg-terra-300 opacity-60 animate-float"
          style={{ top: '20%', left: '12%', animationDelay: '0s' }}
          aria-hidden="true"
        />
        <div
          className="absolute w-2 h-2 rounded-full bg-mer-400 opacity-40 animate-float"
          style={{ top: '65%', right: '18%', animationDelay: '2s' }}
          aria-hidden="true"
        />
        <div
          className="absolute w-4 h-4 rounded-full bg-soleil-400 opacity-30 animate-float"
          style={{ bottom: '30%', left: '42%', animationDelay: '4s' }}
          aria-hidden="true"
        />
      </div>

      {/* ── Contenu ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Colonne gauche — texte ── */}
          <div>
            <Tag variant="terra" className="mb-6 animate-fade-in">
              ✦ Groupe e-Santé France · Depuis {new Date().getFullYear() - 22} ans
            </Tag>

            <h1
              className="mb-6 animate-fade-up"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="text-ardoise-800 block">L'informatique</span>
              <span className="text-ardoise-800 block">médicale,</span>
              <em
                className="not-italic block"
                style={{
                  background: 'linear-gradient(135deg, #C95C35 20%, #F0BC2A 60%, #C95C35 90%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer-text 3s linear infinite',
                }}
              >
                au soleil du Sud.
              </em>
            </h1>

            <p
              className="text-ardoise-500 text-lg leading-relaxed mb-10 max-w-lg animate-fade-up"
              style={{ animationDelay: '0.2s' }}
            >
              Spécialistes de l'informatique de santé depuis 20 ans — nous accompagnons médecins, dentistes et établissements pour que la technologie travaille <strong className="text-ardoise-700 font-semibold">pour eux</strong>, pas contre eux.
            </p>

            <div
              className="flex flex-wrap gap-4 animate-fade-up"
              style={{ animationDelay: '0.3s' }}
            >
              <Button href="#contact" variant="terra" className="text-base">
                Demander un audit gratuit
                <ArrowRight size={17} />
              </Button>
              <Button
                href={`tel:${mainAgence.phoneRaw}`}
                variant="outlineTerra"
                className="text-base"
              >
                <Phone size={17} />
                {mainAgence.phone}
              </Button>
            </div>

            {/* Preuves sociales inline */}
            <div
              className="mt-10 flex items-center gap-4 animate-fade-up"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="flex -space-x-2">
                {['MG', 'BC', 'LP', 'SV'].map((initials) => (
                  <div
                    key={initials}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-mer-700 border-2 border-white"
                    style={{ background: 'linear-gradient(135deg, #D0E8F4, #A0CDE6)' }}
                    aria-hidden="true"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-sm text-ardoise-500">
                <strong className="text-ardoise-700 font-semibold">+3 000</strong> médecins nous font déjà confiance
              </p>
            </div>
          </div>

          {/* ── Colonne droite — carte flottante stats ── */}
          <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>

            {/* Carte principale */}
            <div
              className="relative rounded-xl3 p-8 overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.80)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(201,92,53,0.14)',
                boxShadow: '0 20px 60px rgba(44,30,16,0.10), 0 4px 12px rgba(44,30,16,0.06)',
              }}
            >
              {/* Accent top-right */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(201,92,53,0.08), transparent 70%)',
                }}
                aria-hidden="true"
              />

              <div className="grid grid-cols-2 gap-6 mb-6">
                {[
                  { val: '+3 000', label: 'Médecins', color: 'terra' },
                  { val: '250+',   label: 'Centres médicaux', color: 'mer' },
                  { val: '20 ans', label: 'D\'expérience', color: 'soleil' },
                  { val: '13',     label: 'Experts dédiés', color: 'garrigue' },
                ].map(({ val, label, color }) => (
                  <div key={label}>
                    <div
                      className="font-bold mb-0.5"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                        color:
                          color === 'terra'    ? '#C95C35' :
                          color === 'mer'      ? '#0E6E9E' :
                          color === 'soleil'   ? '#D4A010' : '#8B74CA',
                      }}
                    >
                      {val}
                    </div>
                    <div className="text-xs text-ardoise-400 font-medium">{label}</div>
                  </div>
                ))}
              </div>

              {/* Barre de séparation */}
              <div className="h-px bg-sable-200 mb-5" />

              {/* Disponibilité */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-olive-400 animate-pulse" aria-hidden="true" />
                  <span className="text-sm text-ardoise-500 font-medium">Techniciens disponibles</span>
                </div>
                <span className="text-xs font-semibold text-olive-600 bg-olive-100 px-2.5 py-1 rounded-full border border-olive-200">
                  &lt; 90 min
                </span>
              </div>
            </div>

            {/* Badge flottant */}
            <div
              className="absolute -bottom-4 -left-4 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, #C95C35, #A54428)',
                boxShadow: '0 8px 24px rgba(201,92,53,0.40)',
                fontFamily: 'var(--font-body)',
              }}
            >
              ✓ Ségur du Numérique
            </div>

            {/* Carte téléphone urgence */}
            <div
              className="absolute -top-4 -right-4 px-4 py-2.5 rounded-xl text-sm font-semibold text-mer-700"
              style={{
                background: 'rgba(255,255,255,0.95)',
                border: '1px solid rgba(14,110,158,0.15)',
                boxShadow: '0 8px 24px rgba(14,110,158,0.14)',
              }}
            >
              <Phone size={13} className="inline mr-1.5" />
              04 99 53 05 32
            </div>
          </div>
        </div>
      </div>

      {/* ── Indicateur de scroll ── */}
      <a
        href="#partenaires"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 hover:opacity-70 transition-opacity"
        aria-label="Défiler vers le bas"
      >
        <span className="text-xs text-ardoise-400 font-medium tracking-widest uppercase">Découvrir</span>
        <ChevronDown size={20} className="text-terra-400 animate-bounce" />
      </a>
    </section>
  )
}
