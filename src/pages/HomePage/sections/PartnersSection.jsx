import { PARTNERS } from '../../../constants/siteData'

export default function PartnersSection() {
  return (
    <section
      id="partenaires"
      className="py-12 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FEF4EF 0%, #FDE0D0 50%, #FEF4EF 100%)',
        borderTop:    '1px solid rgba(201,92,53,0.10)',
        borderBottom: '1px solid rgba(201,92,53,0.10)',
      }}
      aria-label="Certifications et compatibilités"
    >
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-terra-400 mb-6">
          Certifiés &amp; compatibles avec
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
          {PARTNERS.map((partner) => (
            <span
              key={partner}
              className="text-sm font-semibold text-ardoise-400 hover:text-terra-600 transition-colors duration-200 cursor-default"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
