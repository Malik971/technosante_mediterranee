import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { PHOTOS } from '../../../constants/siteData'

// Chaque cellule photo avec sa taille dans la grille
const PHOTO_CELLS = [
  {
    src:     PHOTOS.techWork1,
    alt:     'Technicien TechnoSanté Méditerranée en intervention dans un cabinet médical',
    caption: 'Intervention sur site',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-2',
    height:  'h-72 md:h-full',
  },
  {
    src:     PHOTOS.cabinet1,
    alt:     'Cabinet médical moderne équipé par TechnoSanté',
    caption: 'Cabinet équipé',
    colSpan: '',
    rowSpan: '',
    height:  'h-48',
  },
  {
    src:     PHOTOS.hardware1,
    alt:     'Lecteur de carte Vitale et matériel médical informatique',
    caption: 'Matériel certifié',
    colSpan: '',
    rowSpan: '',
    height:  'h-48',
  },
  {
    src:     PHOTOS.med1,
    alt:     'Vue méditerranéenne sur Montpellier et la côte',
    caption: 'Montpellier & Côte d\'Azur',
    colSpan: 'md:col-span-2',
    rowSpan: '',
    height:  'h-56',
  },
]

function PhotoCell({ cell }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl2 group cursor-pointer ${cell.colSpan} ${cell.rowSpan} ${cell.height}`}
    >
      {/* Image */}
      <img
        src={cell.src}
        alt={cell.alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      {/* Overlay gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to top, rgba(44,30,16,0.65) 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      {/* Caption */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
      >
        <span
          className="text-white text-sm font-semibold"
          style={{ fontFamily: 'var(--font-body)', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
        >
          {cell.caption}
        </span>
      </div>

      // TODO: supprimer ce badge une fois les vraies photos intégrées
      {/* Badge "Photo à remplacer" — à supprimer une fois les vraies photos intégrées */}
      {/* <div
        className="absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-lg opacity-70"
        style={{ background: 'rgba(0,0,0,0.45)', color: 'white', backdropFilter: 'blur(4px)' }}
        aria-hidden="true"
      >
        📷 Placeholder
      </div> */}
    </div>
  )
}

export default function PhotoBandSection() {
  const ref = useScrollReveal()

  return (
    <section
      className="section-padding"
      style={{ background: '#FDFAF6' }}
      ref={ref}
      aria-label="Nos équipes en action"
    >
      <div className="section-inner">

        {/* En-tête */}
        <div className="grid md:grid-cols-2 gap-10 items-end mb-12">
          <div className="reveal">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(201,92,53,0.09)', color: '#C95C35', border: '1px solid rgba(201,92,53,0.18)' }}
            >
              En action
            </span>
            <h2 className="text-ardoise-800">
              Une équipe de terrain,<br />
              <span
                style={{
                  background: 'linear-gradient(135deg,#C95C35,#0E6E9E)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                pas derrière un écran.
              </span>
            </h2>
          </div>
          <div className="reveal">
            <p className="text-ardoise-500 text-lg leading-relaxed">
              Nos techniciens interviennent dans vos cabinets, connaissent vos logiciels, votre matériel, et parfois même l'historique de vos pannes depuis des années. C'est ça, la vraie proximité.
            </p>
          </div>
        </div>

        {/* Mosaïque photos */}
        <div
          className="reveal grid md:grid-cols-4 gap-4"
          style={{ gridAutoRows: '12rem' }}
        >
          {PHOTO_CELLS.map((cell, i) => (
            <PhotoCell key={i} cell={cell} />
          ))}
        </div>

        {/* Note placeholder */}
        {/* <p className="reveal text-center text-xs text-ardoise-300 mt-5">
          Photos illustratives — seront remplacées par les vraies photos de l'équipe TechnoSanté Méditerranée.
        </p> */}
      </div>
    </section>
  )
}
