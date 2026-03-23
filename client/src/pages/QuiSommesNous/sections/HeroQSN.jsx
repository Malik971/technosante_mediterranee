import { ArrowRight } from 'lucide-react'
import Tag from '../../../components/ui/Tag'
import Button from '../../../components/ui/Button'

export default function HeroQSN() {
  return (
    <section
      className="relative min-h-[60vh] flex items-end overflow-hidden pb-0"
      style={{
        background: 'linear-gradient(150deg, #FEF4EF 0%, #FDFAF6 45%, #EFF7FB 100%)',
        paddingTop: '100px',
      }}
      aria-label="Qui sommes-nous — introduction"
    >
      {/* ── Formes organiques ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="hero-blob absolute"
          style={{
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(201,92,53,0.14) 0%, transparent 70%)',
            top: '-180px', right: '-100px',
            animationDelay: '0s',
          }}
        />
        <div
          className="hero-blob absolute"
          style={{
            width: '380px', height: '380px',
            background: 'radial-gradient(circle, rgba(14,110,158,0.10) 0%, transparent 70%)',
            bottom: '0px', left: '-60px',
            animationDelay: '4s',
          }}
        />
        {/* Cercles décoratifs */}
        <div className="absolute w-2.5 h-2.5 rounded-full bg-terra-300 opacity-50 animate-float" style={{ top: '22%', left: '8%',  animationDelay: '0s' }} />
        <div className="absolute w-2   h-2   rounded-full bg-mer-400   opacity-40 animate-float" style={{ top: '60%', right: '12%', animationDelay: '2s' }} />
        <div className="absolute w-3   h-3   rounded-full bg-soleil-400 opacity-25 animate-float" style={{ bottom: '25%', left: '38%', animationDelay: '5s' }} />
      </div>

      <div className="relative z-10 section-inner px-6 w-full">
        <div className="max-w-3xl pb-16">
          <div className="animate-fade-in">
            <Tag variant="terra" className="mb-6">
              ✦ Notre histoire
            </Tag>
          </div>

          <h1
            className="animate-fade-up mb-6"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="block text-ardoise-800">20 ans au cœur</span>
            <span className="block text-ardoise-800">de la médecine</span>
            <em
              className="not-italic block"
              style={{
                background: 'linear-gradient(135deg, #C95C35 20%, #F0BC2A 60%, #0E6E9E 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmer-text 4s linear infinite',
              }}
            >
              du Sud de la France.
            </em>
          </h1>

          <p
            className="text-ardoise-500 text-xl leading-relaxed mb-10 max-w-2xl animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            Spécialistes de l'informatique médicale depuis 2003, nous avons bâti notre réputation sur une conviction simple : la technologie doit servir le médecin, pas l'inverse.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Button href="#nos-offres" variant="terra">
              Découvrir nos offres
              <ArrowRight size={17} />
            </Button>
            <Button href="#notre-histoire" variant="outlineTerra">
              Notre histoire
            </Button>
          </div>
        </div>

        {/* ── Barre de chiffres au bas du hero ── */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t animate-fade-up"
          style={{
            borderColor: 'rgba(201,92,53,0.12)',
            animationDelay: '0.4s',
          }}
        >
          {[
            { val: '+3 000', label: 'Médecins',       color: '#C95C35' },
            { val: '250+',   label: 'Centres médicaux', color: '#0E6E9E' },
            { val: '20 ans', label: "D'expérience",   color: '#D4A010' },
            { val: '13',     label: 'Experts',         color: '#8B74CA' },
          ].map(({ val, label, color }, i) => (
            <div
              key={label}
              className="py-6 px-6 flex flex-col gap-1"
              style={{
                borderRight: i < 3 ? '1px solid rgba(201,92,53,0.10)' : 'none',
              }}
            >
              <span
                className="font-bold leading-none"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize:   'clamp(1.6rem, 2.5vw, 2.2rem)',
                  color,
                }}
              >
                {val}
              </span>
              <span className="text-xs text-ardoise-400 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
