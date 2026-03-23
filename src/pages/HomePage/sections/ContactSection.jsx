import { useState } from 'react'
import { Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { AGENCES, SITE } from '../../../constants/siteData'
import Tag from '../../../components/ui/Tag'

const INITIAL_FORM = {
  prenom:        '',
  nom:           '',
  email:         '',
  telephone:     '',
  etablissement: '',
  message:       '',
}

export default function ContactSection() {
  const ref            = useScrollReveal()
  const [form, setForm] = useState(INITIAL_FORM)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulation envoi — remplacer par fetch vers /api/contact (Node/Express)
    await new Promise((r) => setTimeout(r, 1200))
    setSent(true)
    setLoading(false)
  }

  return (
    <section
      id="contact"
      className="section-padding bg-texture-sable"
      ref={ref}
      aria-label="Contactez-nous"
    >
      <div className="section-inner">

        {/* En-tête */}
        <div className="text-center mb-14">
          <div className="reveal">
            <Tag variant="terra" className="mb-5">Contact</Tag>
          </div>
          <h2 className="reveal text-ardoise-800 mb-5">
            Un projet ? Une panne ?<br />
            <span
              style={{
                background: 'linear-gradient(135deg, #C95C35, #F0BC2A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              On est là.
            </span>
          </h2>
          <p className="reveal text-ardoise-500 text-lg max-w-xl mx-auto">
            Rien n'est impossible. Votre besoin a probablement sa solution — il suffit d'en parler.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* ── Colonne gauche — infos ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Réponse rapide */}
            <div
              className="reveal rounded-xl2 p-5"
              style={{
                background: 'linear-gradient(135deg, rgba(201,92,53,0.07), rgba(240,188,42,0.05))',
                border: '1px solid rgba(201,92,53,0.16)',
              }}
            >
              <p className="font-semibold text-ardoise-800 text-sm mb-2">⚡ Urgence technique ?</p>
              <p className="text-ardoise-500 text-sm mb-3">
                Appelez directement notre hotline. Un technicien prend en charge et peut intervenir à distance en quelques minutes.
              </p>
              <a
                href={`tel:${AGENCES[0].phoneRaw}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-terra-600 hover:text-terra-700 transition-colors"
              >
                <Phone size={15} />
                {AGENCES[0].phone}
              </a>
            </div>

            {/* Coordonnées */}
            {AGENCES.map((agence) => (
              <div
                key={agence.id}
                className="reveal bg-white rounded-xl2 p-5"
                style={{ border: '1px solid rgba(232,213,200,0.7)', boxShadow: 'var(--shadow-card)' }}
              >
                <p className="font-semibold text-ardoise-800 text-sm mb-3">{agence.city}</p>
                <div className="space-y-2">
                  <a href={`tel:${agence.phoneRaw}`} className="flex items-center gap-2 text-sm text-ardoise-500 hover:text-terra-600 transition-colors">
                    <Phone size={13} style={{ color: '#C95C35' }} /> {agence.phone}
                  </a>
                  <a href={`mailto:${agence.email}`} className="flex items-center gap-2 text-sm text-ardoise-500 hover:text-mer-600 transition-colors">
                    <Mail size={13} style={{ color: '#0E6E9E' }} /> {agence.email}
                  </a>
                  <p className="flex items-start gap-2 text-sm text-ardoise-400">
                    <MapPin size={13} className="mt-0.5 flex-shrink-0" style={{ color: '#C95C35' }} />
                    {agence.address}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Colonne droite — formulaire ── */}
          <div className="lg:col-span-3 reveal">
            <div
              className="bg-white rounded-xl3 p-8 md:p-10"
              style={{ border: '1px solid rgba(201,92,53,0.12)', boxShadow: '0 8px 40px rgba(44,30,16,0.08)' }}
            >
              {sent ? (
                /* ── Confirmation envoi ── */
                <div className="text-center py-10">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: 'linear-gradient(135deg,#EFF2E5,#D5DDC0)' }}
                    aria-hidden="true"
                  >
                    <CheckCircle size={32} style={{ color: '#617A36' }} />
                  </div>
                  <h3 className="text-ardoise-800 mb-3">Message envoyé !</h3>
                  <p className="text-ardoise-500 text-sm">
                    Merci pour votre message. Notre équipe vous répondra dans les 24h ouvrées.
                  </p>
                </div>
              ) : (
                /* ── Formulaire ── */
                <form onSubmit={handleSubmit} noValidate aria-label="Formulaire de contact">

                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label htmlFor="prenom" className="block text-xs font-semibold uppercase tracking-wider text-ardoise-400 mb-1.5">
                        Prénom *
                      </label>
                      <input
                        id="prenom"
                        name="prenom"
                        type="text"
                        required
                        placeholder="Jean"
                        value={form.prenom}
                        onChange={handleChange}
                        className="input-med"
                      />
                    </div>
                    <div>
                      <label htmlFor="nom" className="block text-xs font-semibold uppercase tracking-wider text-ardoise-400 mb-1.5">
                        Nom *
                      </label>
                      <input
                        id="nom"
                        name="nom"
                        type="text"
                        required
                        placeholder="Martin"
                        value={form.nom}
                        onChange={handleChange}
                        className="input-med"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-ardoise-400 mb-1.5">
                      Email professionnel *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="dr.martin@cabinet.fr"
                      value={form.email}
                      onChange={handleChange}
                      className="input-med"
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="telephone" className="block text-xs font-semibold uppercase tracking-wider text-ardoise-400 mb-1.5">
                      Téléphone
                    </label>
                    <input
                      id="telephone"
                      name="telephone"
                      type="tel"
                      placeholder="06 00 00 00 00"
                      value={form.telephone}
                      onChange={handleChange}
                      className="input-med"
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="etablissement" className="block text-xs font-semibold uppercase tracking-wider text-ardoise-400 mb-1.5">
                      Type d'établissement *
                    </label>
                    <select
                      id="etablissement"
                      name="etablissement"
                      required
                      value={form.etablissement}
                      onChange={handleChange}
                      className="input-med"
                    >
                      <option value="">Choisissez...</option>
                      <option value="cabinet">Cabinet médical</option>
                      <option value="dentaire">Centre dentaire</option>
                      <option value="ehpad">EHPAD</option>
                      <option value="msp">Maison de Santé Pluridisciplinaire</option>
                      <option value="clinique">Clinique / Hôpital</option>
                      <option value="autre">Autre établissement de santé</option>
                    </select>
                  </div>

                  <div className="mb-7">
                    <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-ardoise-400 mb-1.5">
                      Votre message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Décrivez votre besoin ou votre problème..."
                      value={form.message}
                      onChange={handleChange}
                      className="input-med resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-terra w-full text-base justify-center"
                    aria-label="Envoyer ma demande"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                        Envoi en cours…
                      </>
                    ) : (
                      <>
                        <Send size={17} />
                        Envoyer ma demande
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center text-ardoise-400 mt-4">
                    Réponse garantie sous 24h · Données confidentielles · Aucun démarchage
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
