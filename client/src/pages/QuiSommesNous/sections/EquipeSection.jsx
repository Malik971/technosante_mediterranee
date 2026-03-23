import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { EQUIPE_ROLES, PHOTOS } from '../../../constants/siteData'
import Tag from '../../../components/ui/Tag'
import SocialLinks from '../../../components/ui/SocialLinks'

const AVATAR_STYLES = {
  terra:    { bg: 'linear-gradient(135deg,#FDE0D0,#FAC0A0)', color: '#A54428', ring: 'rgba(201,92,53,0.20)' },
  mer:      { bg: 'linear-gradient(135deg,#D0E8F4,#A0CDE6)', color: '#0A5580', ring: 'rgba(14,110,158,0.18)' },
  garrigue: { bg: 'linear-gradient(135deg,#EDE8F5,#D8CEEE)', color: '#6B54AA', ring: 'rgba(139,116,202,0.18)' },
  soleil:   { bg: 'linear-gradient(135deg,#FEF3C7,#FDE68A)', color: '#A67808', ring: 'rgba(212,160,16,0.18)' },
  olive:    { bg: 'linear-gradient(135deg,#EFF2E5,#D5DDC0)', color: '#455A24', ring: 'rgba(97,122,54,0.18)' },
}

export default function EquipeSection() {
  const ref = useScrollReveal()

  return (
    <section
      className="section-padding"
      style={{
        background: 'linear-gradient(160deg, #FEF4EF 0%, #FDFAF6 50%, #EFF7FB 100%)',
      }}
      ref={ref}
      aria-label="Notre équipe"
    >
      <div className="section-inner">

        {/* ── Photo équipe large en haut ── */}
        <div className="reveal mb-14 relative rounded-xl3 overflow-hidden" style={{ height: '340px' }}>
          <img
            src={PHOTOS.team1}
            alt="L'équipe TechnoSanté Méditerranée au travail — collaboration et expertise médicale"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Overlay dégradé */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(44,30,16,0.70) 0%, rgba(44,30,16,0.20) 60%, transparent 100%)' }}
            aria-hidden="true"
          />
          {/* Texte overlay */}
          <div className="absolute inset-0 flex items-end p-10">
            <div className="max-w-lg">
              <div
                className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
                style={{ background: 'rgba(201,92,53,0.80)', color: 'white' }}
              >
                13 collaborateurs
              </div>
              <h3
                className="text-white font-bold text-2xl mb-2 leading-tight"
                style={{ fontFamily: 'var(--font-display)', textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}
              >
                Des visages, pas des tickets.
              </h3>
              <p className="text-white text-sm leading-relaxed opacity-85" style={{ maxWidth: '380px' }}>
                Montpellier &amp; Nice — deux agences, une seule philosophie : vous connaître par nom, connaître votre cabinet par cœur.
              </p>
            </div>
          </div>

          {/* Badge placeholder */}
          <div
            className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1.5 rounded-lg opacity-70"
            style={{ background: 'rgba(0,0,0,0.45)', color: 'white', backdropFilter: 'blur(4px)' }}
            aria-hidden="true"
          >
            📷 Photo à remplacer
          </div>
        </div>

        {/* En-tête */}
        <div className="grid md:grid-cols-2 gap-10 items-end mb-14">
          <div>
            <div className="reveal">
              <Tag variant="mer" className="mb-5">L'équipe</Tag>
            </div>
            <h2 className="reveal text-ardoise-800">
              Des experts,<br />
              <span style={{ background: 'linear-gradient(135deg,#0E6E9E,#C95C35)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                pas des intermédiaires.
              </span>
            </h2>
          </div>
          <div className="reveal">
            <p className="text-ardoise-500 text-lg leading-relaxed">
              13 collaborateurs répartis sur Montpellier et Nice. Chacun avec une spécialité, tous avec le même engagement : votre cabinet fonctionne, sans interruption.
            </p>
          </div>
        </div>

        {/* Grille équipe */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-14">
          {EQUIPE_ROLES.map((member, i) => {
            const style = AVATAR_STYLES[member.color] ?? AVATAR_STYLES.terra
            return (
              <div
                key={member.initials + i}
                className={`reveal reveal-delay-${(i % 3) + 1} bg-white rounded-xl2 p-6 flex items-center gap-5 transition-all duration-300`}
                style={{ border: '1px solid rgba(232,213,200,0.7)', boxShadow: 'var(--shadow-card)' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card)';       e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div
                  className="w-14 h-14 rounded-xl3 flex items-center justify-center flex-shrink-0 font-bold text-lg"
                  style={{ background: style.bg, color: style.color, boxShadow: `0 0 0 4px ${style.ring}`, fontFamily: 'var(--font-display)' }}
                  aria-label={`Avatar ${member.name}`}
                >
                  {member.initials}
                </div>
                <div>
                  <p className="font-semibold text-ardoise-800 text-sm mb-0.5" style={{ fontFamily: 'var(--font-body)' }}>
                    {member.name}
                  </p>
                  <p className="text-ardoise-400 text-xs leading-snug">{member.role}</p>
                </div>
              </div>
            )
          })}

          {/* Carte "+7 experts" */}
          <div
            className="reveal reveal-delay-3 bg-white rounded-xl2 p-6 flex items-center gap-5 transition-all duration-300"
            style={{ border: '1px dashed rgba(201,92,53,0.25)', boxShadow: 'var(--shadow-card)', background: 'linear-gradient(135deg,rgba(201,92,53,0.03),rgba(14,110,158,0.02))' }}
          >
            <div
              className="w-14 h-14 rounded-xl3 flex items-center justify-center flex-shrink-0 font-bold text-lg"
              style={{ background: 'linear-gradient(135deg,#FDFAF6,#F9F2E8)', color: '#B8905E', border: '1px dashed rgba(201,92,53,0.25)', fontFamily: 'var(--font-display)' }}
              aria-hidden="true"
            >
              +7
            </div>
            <div>
              <p className="font-semibold text-ardoise-600 text-sm mb-0.5">Et 7 autres experts</p>
              <p className="text-ardoise-400 text-xs leading-snug">Techniciens terrain, support client, comptabilité</p>
            </div>
          </div>
        </div>

        {/* Encart réseaux + recrutement */}
        <div
          className="reveal rounded-xl3 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8"
          style={{ background: 'linear-gradient(135deg, rgba(201,92,53,0.06) 0%, rgba(14,110,158,0.05) 100%)', border: '1px solid rgba(201,92,53,0.12)' }}
        >
          {/* Avatars déco */}
          <div className="flex -space-x-3 flex-shrink-0">
            {[
              { i: 'BS', c: AVATAR_STYLES.terra },
              { i: 'TC', c: AVATAR_STYLES.mer },
              { i: 'AL', c: AVATAR_STYLES.garrigue },
              { i: 'RN', c: AVATAR_STYLES.soleil },
            ].map(({ i, c }) => (
              <div key={i} className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-2 border-white" style={{ background: c.bg, color: c.color, fontFamily: 'var(--font-display)' }} aria-hidden="true">{i}</div>
            ))}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-ardoise-800 font-bold mb-1" style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem' }}>
              Suivez notre actualité &amp; rejoignez l'équipe
            </h3>
            <p className="text-ardoise-500 text-sm mb-4">
              Retrouvez nos offres d'emploi et nos actualités sur LinkedIn. Nous recrutons régulièrement des techniciens en Occitanie et PACA.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <SocialLinks theme="light" size="md" />
            </div>
          </div>
          <a href="mailto:info@technosante.fr?subject=Candidature spontanée" className="btn-terra flex-shrink-0 text-sm">
            Candidature spontanée
          </a>
        </div>
      </div>
    </section>
  )
}
