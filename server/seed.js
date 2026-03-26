/**
 * SEED — TechnoSanté Méditerranée
 *
 * Migre toutes les données statiques de siteData.js vers PostgreSQL.
 * À lancer UNE SEULE FOIS après `npm run db:push` :
 *   node seed.js
 */

require('dotenv').config()
const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Démarrage du seed...')

  // ── 1. Compte admin ───────────────────────────────────────
  const adminEmail    = process.env.ADMIN_EMAIL    || 'admin@technosante.fr'
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin1234!'
  const adminName     = process.env.ADMIN_NAME     || 'Bruno Solis'

  const hashed = await bcrypt.hash(adminPassword, 12)
  await prisma.adminUser.upsert({
    where:  { email: adminEmail },
    update: {},
    create: { email: adminEmail, password: hashed, name: adminName, role: 'admin' },
  })
  console.log(`  ✓ Admin créé : ${adminEmail}`)

  // ── 2. Articles ───────────────────────────────────────────
  const articles = [
    {
      slug:        'segur-vague-2-ce-qui-change',
      title:       'Ségur du Numérique vague 2 : ce qui change pour votre cabinet en 2025',
      excerpt:     "La deuxième vague du Ségur du Numérique impose de nouvelles obligations aux logiciels de gestion de cabinet. Découvrez les échéances, les aides financières disponibles et comment nous vous accompagnons.",
      content:     "<h2>Qu'est-ce que la vague 2 ?</h2><p>Lancé en 2021, le programme Ségur du Numérique en Santé vise à accélérer le partage des données de santé entre professionnels. La vague 2 étend les obligations à de nouvelles catégories de logiciels et de professionnels, avec des échéances resserrées en 2025.</p><h2>Ce qui change concrètement</h2><p>Les logiciels de gestion de cabinet devront impérativement être référencés Ségur pour continuer à bénéficier des aides de la CPAM.</p>",
      category:    'segur',
      tags:        ['segur', 'logiciel'],
      featured:    true,
      published:   true,
      publishedAt: new Date('2025-03-15'),
      readTime:    '5 min',
      gradient:    'linear-gradient(135deg, #FDE0D0 0%, #FAC0A0 100%)',
      accentColor: '#C95C35',
    },
    {
      slug:        'cyberattaques-cabinets-medicaux',
      title:       'Cyberattaques : pourquoi les cabinets médicaux sont désormais des cibles prioritaires',
      excerpt:     "En 2024, les établissements de santé ont subi 3 fois plus de cyberattaques qu'en 2023. Ransomware, phishing, vol de données patients — comment vous protéger concrètement.",
      content:     "<h2>Une menace qui s'est intensifiée en 2024</h2><p>Les établissements de santé sont devenus des cibles de choix pour les cybercriminels. Les données médicales se revendent jusqu'à 250€ l'unité sur le dark web.</p>",
      category:    'securite',
      tags:        ['securite'],
      published:   true,
      publishedAt: new Date('2025-02-28'),
      readTime:    '7 min',
      gradient:    'linear-gradient(135deg, #D0E8F4 0%, #A0CDE6 100%)',
      accentColor: '#0E6E9E',
    },
    {
      slug:        'doctolib-integration-logiciel-metier',
      title:       'Doctolib et votre logiciel métier : comment bien synchroniser vos agendas',
      excerpt:     "La synchronisation entre Doctolib et votre logiciel de gestion de cabinet peut devenir un casse-tête. Voici les bonnes pratiques que nous avons développées pour nos clients.",
      content:     "<h2>Le problème de la double saisie</h2><p>Sans synchronisation correcte, vos rendez-vous Doctolib ne remontent pas automatiquement dans votre logiciel médical. Voici comment y remédier.</p>",
      category:    'logiciel',
      tags:        ['logiciel'],
      published:   true,
      publishedAt: new Date('2025-02-10'),
      readTime:    '4 min',
      gradient:    'linear-gradient(135deg, #EDE8F5 0%, #D8CEEE 100%)',
      accentColor: '#8B74CA',
    },
    {
      slug:        'lecteurs-carte-vitale-nouvelle-generation',
      title:       "Lecteurs de carte Vitale nouvelle génération : ce que vous devez savoir avant d'acheter",
      excerpt:     "Les lecteurs Bioguard et Ingenico de dernière génération intègrent désormais la biométrie et la signature électronique. Tour d'horizon des modèles disponibles.",
      content:     "<h2>Pourquoi changer son lecteur ?</h2><p>Les lecteurs de carte Vitale ancienne génération ne sont plus compatibles avec les nouvelles exigences du Ségur du Numérique.</p>",
      category:    'materiel',
      tags:        ['materiel'],
      published:   true,
      publishedAt: new Date('2025-01-22'),
      readTime:    '6 min',
      gradient:    'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
      accentColor: '#D4A010',
    },
    {
      slug:        'messagerie-mssante-obligation-2025',
      title:       'Messagerie MSSanté : elle devient obligatoire pour tous les professionnels de santé',
      excerpt:     "À partir du 1er janvier 2025, la messagerie sécurisée de santé est obligatoire pour tous les échanges de données entre professionnels. Mode d'emploi.",
      content:     "<h2>Qu'est-ce que MSSanté ?</h2><p>MSSanté est la messagerie sécurisée de santé nationale. Elle permet l'échange de données médicales entre professionnels de santé en conformité avec le RGPD.</p>",
      category:    'sante-num',
      tags:        ['sante-num', 'logiciel'],
      published:   true,
      publishedAt: new Date('2025-01-08'),
      readTime:    '5 min',
      gradient:    'linear-gradient(135deg, #EFF2E5 0%, #D5DDC0 100%)',
      accentColor: '#617A36',
    },
  ]

  for (const article of articles) {
    await prisma.article.upsert({
      where:  { slug: article.slug },
      update: article,
      create: article,
    })
  }
  console.log(`  ✓ ${articles.length} articles insérés`)

  // ── 3. Services ───────────────────────────────────────────
  const services = [
    {
      slug:        'cabinets',
      icon:        'stethoscope',
      title:       'Cabinets Médicaux',
      subtitle:    'Généralistes & Spécialistes',
      description: "Monoposte ou réseau, vos secrétaires, remplaçants et internes inclus. Un seul interlocuteur, zéro interruption d'activité.",
      color:       'terra',
      features:    ['Logiciels de gestion de cabinet', 'Télétransmission & SESAM-Vitale', 'Réseau, postes, sauvegarde sécurisée', 'Accueil téléphonique professionnel'],
      href:        '/services/cabinets',
      order:       0,
    },
    {
      slug:        'dentaires',
      icon:        'tooth',
      title:       'Centres Dentaires',
      subtitle:    'Dentistes, Orthodontistes, Stomatologues',
      description: "Votre projet de A à Z : informatique, capteurs radios et panoramique inclus, sans jonglage entre prestataires.",
      color:       'mer',
      features:    ['Logiciels dentaires spécialisés', 'Capteurs RX numériques', 'Panoramique & CBCT', 'Interlocuteur unique, clés-en-main'],
      href:        '/services/dentaires',
      order:       1,
    },
    {
      slug:        'etablissements',
      icon:        'building',
      title:       'Établissements de Santé',
      subtitle:    'EHPAD, MSP, CPTS…',
      description: "Dans les structures collectives, nous simplifions la prise de décision IT et maîtrisons vos dépenses.",
      color:       'garrigue',
      features:    ['Infrastructure réseau multi-sites', 'Cybersécurité & conformité RGPD', 'Déploiement Ségur du Numérique', 'Gestion coordonnée CPTS / MSP'],
      href:        '/services/etablissements',
      order:       2,
    },
  ]

  for (const s of services) {
    await prisma.service.upsert({
      where:  { slug: s.slug },
      update: s,
      create: s,
    })
  }
  console.log(`  ✓ ${services.length} services insérés`)

  // ── 4. Paramètres globaux ─────────────────────────────────
  const settings = [
    { key: 'site_name',        value: 'TechnoSanté Méditerranée' },
    { key: 'phone_montpellier',value: '04 99 53 05 32' },
    { key: 'phone_nice',       value: '04 93 72 87 83' },
    { key: 'email_contact',    value: 'info@technosante.fr' },
    { key: 'address',          value: '185 chemin de la 3ème écluse, 34970 Lattes' },
  ]

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where:  { key: s.key },
      update: { value: s.value },
      create: s,
    })
  }
  console.log(`  ✓ ${settings.length} paramètres insérés`)

  console.log('\n🎉 Seed terminé avec succès !')
  console.log(`   Admin : ${adminEmail} / ${adminPassword}`)
  console.log('   ⚠️  Changez le mot de passe admin après le premier login.')
}

main()
  .catch((e) => { console.error('❌ Erreur seed :', e); process.exit(1) })
  .finally(() => prisma.$disconnect())