import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, Tag as TagIcon, Share2, Phone } from 'lucide-react'
import { useEffect } from 'react'
import { ARTICLES, AGENCES } from '../../constants/siteData'
import Tag from '../../components/ui/Tag'

// Formatte "2025-03-15" → "15 mars 2025"
function formatDate(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

const CAT_LABELS = {
  segur:       'Ségur du Numérique',
  logiciel:    'Logiciel métier',
  securite:    'Cybersécurité',
  materiel:    'Matériel',
  'sante-num': 'Santé numérique',
}

const CAT_TAG_VARIANT = {
  segur:       'mer',
  logiciel:    'garrigue',
  securite:    'terra',
  materiel:    'soleil',
  'sante-num': 'olive',
}

// Contenu long fictif par article — à remplacer par un vrai CMS
// Structure : paragraphes + titres h2 + listes
const CONTENT = {
  'segur-vague-2-ce-qui-change': `
    <h2>Qu'est-ce que la vague 2 du Ségur du Numérique ?</h2>
    <p>Lancé en 2021, le programme Ségur du Numérique en Santé vise à accélérer le partage des données de santé entre professionnels. La vague 2 étend les obligations à de nouvelles catégories de logiciels et de professionnels, avec des échéances resserrées en 2025.</p>
    <p>Contrairement à la vague 1 qui ciblait principalement les hôpitaux et les médecins de ville via les logiciels de DMP, la vague 2 concerne désormais les dentistes, les kinésithérapeutes, les infirmiers libéraux et les centres de santé pluridisciplinaires.</p>
    <h2>Ce qui change concrètement pour votre cabinet</h2>
    <p>Les logiciels de gestion de cabinet devront impérativement être référencés « Ségur » pour continuer à bénéficier des aides de la CPAM. Un logiciel non référencé ne permettra plus la télétransmission dans les conditions normales à partir de la date limite.</p>
    <ul>
      <li>Intégration obligatoire de la messagerie sécurisée MSSanté</li>
      <li>Compatibilité DMP (Dossier Médical Partagé) pour toutes les spécialités</li>
      <li>Mise à jour des modules de prescription électronique</li>
      <li>Conformité aux nouvelles normes d'interopérabilité (HL7 FHIR)</li>
    </ul>
    <h2>Les aides financières disponibles</h2>
    <p>L'État a prévu des enveloppes d'aide substantielles pour accompagner cette transition. Selon votre situation, vous pouvez bénéficier d'une prise en charge allant jusqu'à 3 500 € pour la mise à niveau de votre logiciel et de votre matériel.</p>
    <p>Ces aides sont versées directement par la CPAM après validation du dossier. La constitution du dossier est simple mais nécessite quelques documents spécifiques que notre équipe peut préparer pour vous.</p>
    <h2>Comment TechnoSanté vous accompagne</h2>
    <p>Nous gérons l'intégralité du processus : audit de votre situation actuelle, identification des mises à jour nécessaires, constitution du dossier d'aide financière, déploiement du logiciel référencé et formation de votre équipe.</p>
    <p>Pour les cabinets déjà clients, la transition se fait sans interruption d'activité. Nous intervenons en dehors des heures de consultation et assurons une continuité totale de vos services informatiques.</p>
  `,
  'cyberattaques-cabinets-medicaux': `
    <h2>Une menace qui s'est intensifiée en 2024</h2>
    <p>Les établissements de santé sont devenus des cibles de choix pour les cybercriminels. La raison est simple : les données médicales se revendent jusqu'à 250 € l'unité sur le dark web — soit 10 à 20 fois plus qu'un numéro de carte bancaire.</p>
    <p>En 2024, l'ANSSI (Agence nationale de la sécurité des systèmes d'information) a recensé une augmentation de 312 % des attaques ciblant les cabinets libéraux. Les petites structures, moins protégées que les hôpitaux, sont désormais en première ligne.</p>
    <h2>Les 3 vecteurs d'attaque les plus fréquents</h2>
    <ul>
      <li><strong>Phishing ciblé :</strong> emails imitant la CPAM, l'URSSAF ou des éditeurs de logiciels médicaux, demandant de cliquer sur un lien ou de renseigner des identifiants.</li>
      <li><strong>Ransomware :</strong> logiciel malveillant qui chiffre tous vos fichiers et réclame une rançon pour les débloquer. En 2024, la rançon moyenne demandée à un cabinet libéral était de 8 000 €.</li>
      <li><strong>Accès non autorisé via des mots de passe faibles :</strong> plus de 60 % des intrusions exploitent des mots de passe réutilisés ou trop simples.</li>
    </ul>
    <h2>Les mesures de protection essentielles</h2>
    <p>La bonne nouvelle : se protéger efficacement ne nécessite pas un budget pharaonique. Voici les mesures prioritaires, classées par impact :</p>
    <ul>
      <li>Sauvegardes automatiques quotidiennes sur support déconnecté du réseau</li>
      <li>Authentification à deux facteurs sur tous les accès distants</li>
      <li>Mises à jour systèmes appliquées dans les 48h suivant leur publication</li>
      <li>Formation du personnel à la détection des emails suspects</li>
      <li>Antivirus médical certifié, mis à jour en temps réel</li>
    </ul>
    <h2>Ce que nous mettons en place pour nos clients</h2>
    <p>TechnoSanté Méditerranée propose un audit de cybersécurité gratuit pour tous ses clients. En 30 minutes, nous identifions les failles les plus critiques et vous proposons un plan de correction priorisé.</p>
  `,
}

// Contenu générique pour les articles sans contenu spécifique
function getContent(article) {
  if (CONTENT[article.slug]) return CONTENT[article.slug]
  return `
    <h2>Introduction</h2>
    <p>${article.excerpt}</p>
    <h2>Pourquoi c'est important pour votre cabinet</h2>
    <p>Dans un secteur en constante évolution réglementaire et technologique, rester informé n'est pas une option. Les cabinets médicaux qui anticipent les changements sont ceux qui maintiennent une activité fluide, sans interruption ni surcoût imprévu.</p>
    <p>Notre équipe suit ces évolutions en temps réel et vous informe des points d'action concrets, traduits en langage clair — sans jargon technique inutile.</p>
    <h2>Ce que nous recommandons</h2>
    <p>Chaque situation est différente. La meilleure approche dépend de votre logiciel actuel, de votre matériel, et de votre contrat de maintenance. Contactez-nous pour une analyse personnalisée, sans engagement.</p>
    <h2>Besoin d'aide ?</h2>
    <p>Notre équipe est disponible du lundi au vendredi de 9h à 18h30. Un technicien vous rappelle dans les 4 heures pour faire le point sur votre situation.</p>
  `
}

// Carte article connexe compacte
function RelatedCard({ article }) {
  return (
    <Link
      to={`/actualites/${article.slug}`}
      className="group flex items-start gap-4 p-4 rounded-xl bg-white transition-all duration-200"
      style={{ border: '1px solid rgba(232,213,200,0.7)', boxShadow: 'var(--shadow-card)' }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'; e.currentTarget.style.transform = 'translateX(3px)' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-card)';       e.currentTarget.style.transform = 'translateX(0)' }}
    >
      <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: article.gradient }} aria-hidden="true">
        <div className="w-4 h-4 rounded-full bg-white opacity-40" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold mb-1" style={{ color: article.accentColor }}>
          {CAT_LABELS[article.category] ?? article.category}
        </p>
        <p className="text-ardoise-800 text-sm font-semibold leading-snug line-clamp-2 group-hover:text-terra-600 transition-colors">
          {article.title}
        </p>
        <p className="text-ardoise-400 text-xs mt-1">{formatDate(article.date)}</p>
      </div>
    </Link>
  )
}

export default function ArticlePage() {
  const { slug } = useParams()

  // Scroll en haut à chaque changement de slug
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [slug])

  const article = ARTICLES.find((a) => a.slug === slug)

  // 404 si slug inconnu
  if (!article) return <Navigate to="/actualites" replace />

  const related = ARTICLES.filter((a) => a.slug !== slug && (a.category === article.category || a.tags?.some(t => article.tags?.includes(t)))).slice(0, 3)

  const catVariant = CAT_TAG_VARIANT[article.category] ?? 'terra'

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: article.title, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Lien copié !')
    }
  }

  return (
    <div className="bg-texture-sable min-h-screen" style={{ paddingTop: '80px' }}>

      {/* ── Bannière article ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: article.gradient }}
      >
        {/* Motif décoratif */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none" aria-hidden="true">
          <svg width="400" height="200" viewBox="0 0 400 200" fill="none">
            <circle cx="200" cy="100" r="90" stroke="white" strokeWidth="1.5" strokeDasharray="8 6"/>
            <circle cx="200" cy="100" r="55" stroke="white" strokeWidth="1" strokeDasharray="5 8"/>
            <rect x="160" y="60" width="80" height="80" rx="8" stroke="white" strokeWidth="1.5"/>
          </svg>
        </div>

        <div className="relative z-10 section-inner px-6 py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm" style={{ color: article.accentColor, opacity: 0.8 }}>
            <Link to="/" className="hover:opacity-100 transition-opacity">Accueil</Link>
            <span>/</span>
            <Link to="/actualites" className="hover:opacity-100 transition-opacity">Actualités</Link>
            <span>/</span>
            <span className="opacity-60 truncate max-w-xs">{article.title}</span>
          </div>

          <div className="max-w-3xl">
            <Tag variant={catVariant} className="mb-5">
              {CAT_LABELS[article.category] ?? article.category}
            </Tag>

            <h1
              className="text-ardoise-800 mb-6 leading-tight"
              style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)' }}
            >
              {article.title}
            </h1>

            {/* Méta */}
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-2 text-sm text-ardoise-500">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: article.accentColor + '22', color: article.accentColor }}
                  aria-hidden="true"
                >
                  TS
                </div>
                {article.author}
              </div>
              <span className="flex items-center gap-1.5 text-sm text-ardoise-400">
                <Calendar size={13} aria-hidden="true" />
                {formatDate(article.date)}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-ardoise-400">
                <Clock size={13} aria-hidden="true" />
                {article.readTime} de lecture
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Corps de l'article ── */}
      <div className="section-inner px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-12 items-start">

          {/* ── Colonne principale ── */}
          <article className="lg:col-span-2">

            {/* Chapô */}
            <p
              className="text-ardoise-600 text-lg leading-relaxed mb-10 pb-10"
              style={{ borderBottom: '1px solid rgba(201,92,53,0.12)', fontStyle: 'italic' }}
            >
              {article.excerpt}
            </p>

            {/* Contenu HTML */}
            <div
              className="prose-technosante"
              style={{
                // Styles du contenu éditorial inline
                '--prose-h2':    '#2C1E10',
                '--prose-p':     '#5A4428',
                '--prose-li':    '#5A4428',
                '--prose-accent':'#C95C35',
              }}
              dangerouslySetInnerHTML={{ __html: getContent(article) }}
            />

            {/* Tags */}
            {article.tags?.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-12 pt-8" style={{ borderTop: '1px solid rgba(232,213,200,0.7)' }}>
                <TagIcon size={14} className="text-ardoise-400" aria-hidden="true" />
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/actualites?cat=${tag}`}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                    style={{ background: 'rgba(201,92,53,0.08)', color: '#A54428', border: '1px solid rgba(201,92,53,0.18)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(201,92,53,0.15)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(201,92,53,0.08)' }}
                  >
                    {CAT_LABELS[tag] ?? tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-8">
              <Link
                to="/actualites"
                className="inline-flex items-center gap-2 text-sm font-semibold text-ardoise-500 hover:text-terra-600 transition-colors"
              >
                <ArrowLeft size={15} aria-hidden="true" />
                Retour aux actualités
              </Link>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                style={{ background: 'rgba(201,92,53,0.08)', color: '#C95C35', border: '1px solid rgba(201,92,53,0.18)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(201,92,53,0.15)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(201,92,53,0.08)' }}
              >
                <Share2 size={14} aria-hidden="true" />
                Partager
              </button>
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="lg:sticky lg:top-28 space-y-6">

            {/* CTA contact */}
            <div
              className="rounded-xl2 p-6"
              style={{
                background: 'linear-gradient(135deg,rgba(201,92,53,0.07),rgba(240,188,42,0.05))',
                border: '1px solid rgba(201,92,53,0.16)',
              }}
            >
              <p className="font-bold text-ardoise-800 text-sm mb-2">
                Une question sur cet article ?
              </p>
              <p className="text-ardoise-500 text-xs leading-relaxed mb-4">
                Notre équipe répond à toutes vos questions techniques par téléphone, sans engagement.
              </p>
              {AGENCES.map((a) => (
                <a
                  key={a.id}
                  href={`tel:${a.phoneRaw}`}
                  className="flex items-center gap-2.5 py-2 text-sm font-semibold text-terra-600 hover:text-terra-700 transition-colors"
                >
                  <Phone size={13} aria-hidden="true" />
                  {a.city} · {a.phone}
                </a>
              ))}
            </div>

            {/* Articles connexes */}
            {related.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ardoise-400 mb-4">
                  Articles connexes
                </p>
                <div className="space-y-3">
                  {related.map((a) => <RelatedCard key={a.id} article={a} />)}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* ── Styles prose inline ── */}
      <style>{`
        .prose-technosante h2 {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 700;
          color: #2C1E10;
          margin: 2rem 0 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid rgba(201,92,53,0.15);
        }
        .prose-technosante p {
          color: #5A4428;
          font-size: 15px;
          line-height: 1.85;
          margin: 0 0 1rem;
        }
        .prose-technosante ul {
          margin: 0.5rem 0 1.25rem 0;
          padding-left: 0;
          list-style: none;
        }
        .prose-technosante ul li {
          color: #5A4428;
          font-size: 15px;
          line-height: 1.75;
          padding: 0.3rem 0 0.3rem 1.5rem;
          position: relative;
        }
        .prose-technosante ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.75rem;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #C95C35;
        }
        .prose-technosante strong {
          color: #2C1E10;
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}