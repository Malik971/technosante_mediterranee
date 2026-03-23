import {
  Timer, ShieldCheck, Lock, Monitor, Users, Award,
} from 'lucide-react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { WHY_US } from '../../../constants/siteData'
import Tag from '../../../components/ui/Tag'
import Button from '../../../components/ui/Button'

const ICONS = {
  timer:   Timer,
  shield:  ShieldCheck,
  lock:    Lock,
  monitor: Monitor,
  users:   Users,
  award:   Award,
}

const CONTAINER_STYLES = {
  terra:    { bg: 'linear-gradient(135deg,#FDE0D0,#FAC0A0)',    color: '#C95C35' },
  mer:      { bg: 'linear-gradient(135deg,#D0E8F4,#A0CDE6)',    color: '#0E6E9E' },
  garrigue: { bg: 'linear-gradient(135deg,#EDE8F5,#D8CEEE)',    color: '#6B54AA' },
  soleil:   { bg: 'linear-gradient(135deg,#FEF3C7,#FDE68A)',    color: '#D4A010' },
  olive:    { bg: 'linear-gradient(135deg,#EFF2E5,#D5DDC0)',    color: '#617A36' },
}

function FeatureCard({ item, index }) {
  const Icon  = ICONS[item.icon] ?? ShieldCheck
  const style = CONTAINER_STYLES[item.color] ?? CONTAINER_STYLES.terra

  return (
    <div
      className={`reveal reveal-delay-${(index % 3) + 1} bg-white rounded-xl2 p-6 flex items-start gap-5 transition-all duration-300`}
      style={{ border: '1px solid rgba(232,213,200,0.6)', boxShadow: 'var(--shadow-card)' }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card)';       e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: style.bg }}
        aria-hidden="true"
      >
        <Icon size={20} style={{ color: style.color }} />
      </div>
      <div>
        <h4 className="text-ardoise-800 text-base font-semibold mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>
          {item.title}
        </h4>
        <p className="text-ardoise-500 text-sm leading-relaxed">{item.desc}</p>
      </div>
    </div>
  )
}

export default function WhyUsSection() {
  const ref = useScrollReveal()

  return (
    <section
      id="pourquoi-nous"
      className="section-padding"
      style={{ background: '#FDFAF6' }}
      ref={ref}
      aria-label="Pourquoi nous choisir"
    >
      <div className="section-inner">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── Colonne gauche — pitch ── */}
          <div className="lg:sticky lg:top-28">
            <div className="reveal">
              <Tag variant="terra" className="mb-5">Pourquoi nous choisir</Tag>
            </div>

            <h2 className="reveal text-ardoise-800 mb-6">
              Votre informatique médicale entre de{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #C95C35, #F0BC2A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                bonnes mains.
              </span>
            </h2>

            <p className="reveal text-ardoise-500 text-lg leading-relaxed mb-6">
              Contrairement aux généralistes IT, nous sommes <strong className="text-ardoise-700">nés dans les cabinets médicaux</strong>. Chaque solution que nous proposons a été validée sur le terrain, dans des conditions réelles de pratique médicale.
            </p>

            <p className="reveal text-ardoise-500 leading-relaxed mb-8">
              Aujourd'hui un simple soutien informatique ne suffit plus. Les nouveaux services CPAM, ASIP, le Tiers Payant, les prescriptions sécurisées — tout cela demande une expertise bien supérieure. Avec 20 ans d'expérience, nous l'avons.
            </p>

            {/* Bloc urgence */}
            <div
              className="reveal rounded-xl2 p-5 mb-8"
              style={{
                background: 'linear-gradient(135deg, rgba(201,92,53,0.06), rgba(240,188,42,0.05))',
                border: '1px solid rgba(201,92,53,0.18)',
              }}
            >
              <p className="font-semibold text-ardoise-800 text-sm mb-1">
                ⚡ Urgence technique ?
              </p>
              <p className="text-ardoise-500 text-sm mb-3">
                Un technicien répond et intervient à distance en quelques minutes. Disponible du lundi au vendredi.
              </p>
              <a
                href="tel:0499530532"
                className="text-sm font-bold text-terra-600 hover:text-terra-700 transition-colors"
              >
                → 04 99 53 05 32 (Montpellier)
              </a>
            </div>

            <div className="reveal">
              <Button href="#contact" variant="terra">
                Parler à un expert
              </Button>
            </div>
          </div>

          {/* ── Colonne droite — grille features ── */}
          <div className="grid gap-4">
            {WHY_US.map((item, i) => (
              <FeatureCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
