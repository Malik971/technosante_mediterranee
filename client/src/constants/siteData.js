// ═══════════════════════════════════════════════
//  DONNÉES DU SITE — TechnoSanté Méditerranée
//  Centraliser ici pour faciliter les mises à jour
// ═══════════════════════════════════════════════

export const SITE = {
  name:     'TechnoSanté Méditerranée',
  tagline:  'L\'informatique médicale made in Sud',
  company:  'Malik Ibo',
  founded:  2003,
  email:    'info@technosante.fr',
}

export const AGENCES = [
  {
    id:       'montpellier',
    city:     'Montpellier',
    type:     'Siège social',
    badge:    'Agence principale',
    address:  '185 chemin de la 3ème écluse, 34970 Lattes',
    phone:    '04 99 53 05 32',
    phoneRaw: '0499530532',
    email:    'info@technosante.fr',
    hours:    'Lun – Ven · 9h–12h30 / 14h–18h',
  },
  {
    id:       'nice',
    city:     'Nice',
    type:     'Agence partenaire',
    badge:    'ex AxiService — Côte d\'Azur',
    address:  'Alpes-Maritimes — Zone Côte d\'Azur',
    phone:    '04 93 72 87 83',
    phoneRaw: '0493728783',
    email:    'support@technosante.fr',
    hours:    'Lun – Ven · 9h–12h30 / 14h–18h',
  },
]

export const STATS = [
  { value: '+3 000', label: 'Médecins nous font confiance' },
  { value: '250+',   label: 'Centres médicaux accompagnés' },
  { value: '20 ans', label: 'D\'expérience sur le terrain' },
  { value: '13',     label: 'Experts sur 2 agences' },
]

export const SERVICES = [
  {
    id:       'cabinets',
    icon:     'stethoscope',
    title:    'Cabinets Médicaux',
    subtitle: 'Généralistes & Spécialistes',
    description:
      'Monoposte ou réseau, vos secrétaires, remplaçants et internes inclus. Un seul interlocuteur, zéro interruption d\'activité.',
    features: [
      'Logiciels de gestion de cabinet',
      'Télétransmission & SESAM-Vitale',
      'Réseau, postes, sauvegarde sécurisée',
      'Accueil téléphonique professionnel',
    ],
    color: 'terra',
    href: '/services/cabinets',
  },
  {
    id:       'dentaires',
    icon:     'tooth',
    title:    'Centres Dentaires',
    subtitle: 'Dentistes, Orthodontistes, Stomatologues',
    description:
      'Votre projet de A à Z : informatique, capteurs radios et panoramique inclus, sans jonglage entre prestataires.',
    features: [
      'Logiciels dentaires spécialisés',
      'Capteurs RX numériques',
      'Panoramique & CBCT',
      'Interlocuteur unique, clés-en-main',
    ],
    color: 'mer',
    href: '/services/dentaires',
  },
  {
    id:       'etablissements',
    icon:     'building',
    title:    'Établissements de Santé',
    subtitle: 'EHPAD, MSP, CPTS…',
    description:
      'Dans les structures collectives, nous simplifions la prise de décision IT et maîtrisons vos dépenses. Des économies assurées.',
    features: [
      'Infrastructure réseau multi-sites',
      'Cybersécurité & conformité RGPD',
      'Déploiement Ségur du Numérique',
      'Gestion coordonnée CPTS / MSP',
    ],
    color: 'garrigue',
    href: '/services/etablissements',
  },
]

// ═══════════════════════════════════════════════
//  PAGES DÉTAIL SERVICES
// ═══════════════════════════════════════════════
export const SERVICES_DETAIL = {
  cabinets: {
    id:       'cabinets',
    color:    'terra',
    icon:     'stethoscope',
    title:    'Cabinets Médicaux',
    subtitle: 'Généralistes & Spécialistes',
    tagline:  'L\'informatique médicale clés en main, du logiciel au réseau.',
    intro:    "Qu\'il s\'agisse d\'un cabinet monoposte ou d\'un réseau multi-praticiens, nous prenons en charge l\'intégralité de votre environnement informatique. Vos secrétaires, vos remplaçants et vos internes sont inclus dans notre accompagnement — un seul numéro, un seul interlocuteur.",
    heroGradient: 'linear-gradient(135deg, #FEF4EF 0%, #FDE0D0 100%)',
    accentColor: '#C95C35',
    sections: [
      {
        icon: 'monitor',
        title: 'Logiciels de gestion de cabinet',
        desc: "Nous sommes distributeurs officiels et mainteneurs agréés des principaux logiciels médicaux du marché : Hellodoc, Medistory, Crossway, Doctolib, Logosw… Mises à jour, paramétrages, formation de votre équipe — tout est inclus. Fini la hotline anonyme : votre technicien connaît votre logiciel et votre configuration.",
        points: [
          'Installation, paramétrage et migration de données',
          'Formation sur site pour médecins, secrétaires et remplaçants',
          'Mises à jour régulières et gestion des évolutions réglementaires',
          'Support dédié, joignable directement sur portable (contrat Premium)',
        ],
      },
      {
        icon: 'wifi',
        title: 'Télétransmission & SESAM-Vitale',
        desc: "La télétransmission est au cœur de votre activité. Nous gérons l\'intégralité de votre infrastructure SESAM-Vitale : lecteurs de cartes, paramétrage des flux FSE, gestion des rejets, Tiers Payant. Vous n\'avez pas à vous préoccuper des aspects techniques — nous le faisons pour vous.",
        points: [
          'Installation et remplacement des lecteurs de carte Vitale',
          'Paramétrage du Tiers Payant et des mutuelles',
          'Traitement des rejets FSE et relances automatiques',
          'Intégration DMP et messagerie MSSanté',
        ],
      },
      {
        icon: 'network',
        title: 'Réseau, postes & infrastructure',
        desc: "Un cabinet médical, c\'est un réseau. Ordinateurs de consultation, postes de secrétariat, imprimantes, lecteurs, box téléphonie — nous concevons, installons et maintenons l\'ensemble. En cas de panne, nous intervenons en moins de 90 minutes.",
        points: [
          'Audit de l\'infrastructure existante et recommandations',
          'Installation réseau filaire et Wi-Fi sécurisé',
          'Gestion du parc matériel (ordinateurs, imprimantes, périphériques)',
          'Sauvegarde automatique quotidienne sur support sécurisé',
        ],
      },
      {
        icon: 'phone',
        title: 'Accueil téléphonique professionnel',
        desc: "Maîtrisez vos coûts de communication et professionnalisez votre accueil. Nous proposons des solutions de téléphonie adaptées aux cabinets médicaux : renvoi d\'appel, messagerie professionnelle, numéro dédié. Vos patients sont bien accueillis, même quand vous êtes en consultation.",
        points: [
          'Téléphonie IP adaptée aux cabinets médicaux',
          'Configuration du renvoi d\'appel et de la messagerie',
          'Intégration avec votre logiciel de prise de rendez-vous',
          'Solution de rappel automatique de patients',
        ],
      },
    ],
    logiciels: ['Hellodoc', 'Medistory', 'Crossway', 'Doctolib', 'Logosw', 'Julie Solutions'],
    cta: 'Demander un audit gratuit',
  },

  dentaires: {
    id:       'dentaires',
    color:    'mer',
    icon:     'tooth',
    title:    'Centres Dentaires',
    subtitle: 'Dentistes, Orthodontistes, Stomatologues',
    tagline:  'Informatique, imagerie et connectivité - un seul interlocuteur.',
    intro:    "Le cabinet dentaire moderne, c\'est bien plus qu\'un ordinateur. Capteurs radios, panoramique, CBCT, logiciel de gestion, télétransmission - nous gérons votre projet de A à Z, sans que vous ayez à jongler entre plusieurs prestataires.",
    heroGradient: 'linear-gradient(135deg, #EFF7FB 0%, #D0E8F4 100%)',
    accentColor: '#0E6E9E',
    sections: [
      {
        icon: 'monitor',
        title: 'Logiciels dentaires spécialisés',
        desc: "Nous maîtrisons les principaux logiciels du marché dentaire : Julie Solutions, Logos, Dental on Web… Installation, formation, migration et maintenance. Votre équipe prend en main le logiciel rapidement, nous restons disponibles pour tout accompagnement.",
        points: [
          'Installation et paramétrage complet du logiciel',
          'Formation des praticiens, assistantes et secrétaires',
          'Migration des données depuis votre ancien logiciel',
          'Gestion des mises à jour et des évolutions réglementaires',
        ],
      },
      {
        icon: 'scan',
        title: 'Imagerie numérique - capteurs RX',
        desc: "Nous assurons l\'installation et l\'intégration de capteurs radio intra-oraux dans votre logiciel dentaire. Compatibilité garantie avec votre chaîne de travail existante. Formation incluse pour vous et votre équipe.",
        points: [
          'Capteurs RX intra-oraux : Carestream, Acteon, Dentsply…',
          'Intégration directe dans votre logiciel dentaire',
          'Formation à la prise de clichés et à l\'archivage',
          'Maintenance et remplacement rapide en cas de panne',
        ],
      },
      {
        icon: 'circle',
        title: 'Panoramique & CBCT',
        desc: "L\'installation d\'un panoramique ou d\'un CBCT est un projet structurant pour votre cabinet. Nous vous accompagnons de la préparation du local à la mise en service, en passant par l\'intégration dans votre réseau et votre logiciel.",
        points: [
          'Audit de faisabilité technique et conseil matériel',
          'Installation et raccordement réseau',
          'Intégration dans le logiciel de gestion du cabinet',
          'Formation et qualification du personnel',
        ],
      },
      {
        icon: 'shield',
        title: 'Conformité & cybersécurité',
        desc: "Les données de santé bucco-dentaire sont soumises aux mêmes obligations que les données médicales. Nous assurons la sécurisation de votre environnement informatique, la mise en conformité RGPD et la sauvegarde de vos données patients.",
        points: [
          'Sauvegarde automatique et chiffrée des données patients',
          'Mise en conformité RGPD et politique de mot de passe',
          'Antivirus médical et pare-feu configuré',
          'Plan de reprise d\'activité en cas d\'incident',
        ],
      },
    ],
    logiciels: ['Julie Solutions', 'Logos', 'Dental on Web', 'Carestream', 'Acteon', 'Dentsply'],
    cta: 'Discuter de votre projet',
  },

  etablissements: {
    id:       'etablissements',
    color:    'garrigue',
    icon:     'building',
    title:    'Établissements de Santé',
    subtitle: 'EHPAD, MSP, CPTS, Cliniques',
    tagline:  'Un interlocuteur unique pour des structures complexes.',
    intro:    "Dans les établissements de santé collectifs, la coordination informatique est un défi permanent. Plusieurs praticiens, plusieurs logiciels, plusieurs organismes à interfacer — nous simplifions tout ça. Un seul prestataire, des économies assurées, une continuité de service garantie.",
    heroGradient: 'linear-gradient(135deg, #F4F1FA 0%, #EDE8F5 100%)',
    accentColor: '#8B74CA',
    sections: [
      {
        icon: 'network',
        title: 'Infrastructure réseau multi-sites',
        desc: "Une MSP ou un EHPAD, c\'est un réseau partagé entre plusieurs praticiens, souvent sur plusieurs bâtiments. Nous concevons et déployons des infrastructures réseau robustes, avec segmentation des accès par praticien et sauvegarde centralisée.",
        points: [
          'Audit et conception de l\'architecture réseau',
          'Déploiement réseau filaire et Wi-Fi sécurisé multi-zones',
          'Gestion des droits d\'accès par praticien ou structure',
          'Supervision à distance et alertes en temps réel',
        ],
      },
      {
        icon: 'shield',
        title: 'Cybersécurité & conformité RGPD',
        desc: "Les établissements de santé sont des cibles prioritaires des cyberattaques. Nous déployons des solutions de protection adaptées : antivirus, pare-feu, chiffrement des données, plan de reprise d\'activité. Conformité CNIL et HDS assurée.",
        points: [
          'Analyse de risques et audit de sécurité',
          'Déploiement d\'une solution antivirus et EDR centralisée',
          'Chiffrement des données sensibles et des sauvegardes',
          'Formation du personnel aux bonnes pratiques cyber',
        ],
      },
      {
        icon: 'star',
        title: 'Ségur du Numérique',
        desc: "Le Ségur du Numérique impose des mises à niveau significatives pour les établissements de santé. Nous gérons l\'intégralité du processus : éligibilité, dossier de financement, déploiement des logiciels référencés, formation des équipes.",
        points: [
          'Évaluation de l\'éligibilité aux financements Ségur',
          'Constitution et suivi du dossier de financement',
          'Déploiement des logiciels référencés DMP, MSSanté, INS',
          'Formation des équipes aux nouveaux outils',
        ],
      },
      {
        icon: 'users',
        title: 'Coordination CPTS & MSP',
        desc: "Les Communautés Professionnelles Territoriales de Santé et les Maisons de Santé Pluridisciplinaires ont des besoins spécifiques en termes de partage d\'information et de coordination. Nous mettons en place les outils adaptés à ces nouvelles organisations.",
        points: [
          'Messagerie sécurisée inter-praticiens (MSSanté)',
          'Partage de dossiers patients entre praticiens de la CPTS',
          'Outils de coordination et de planification partagée',
          'Intégration avec le DMP et les systèmes régionaux',
        ],
      },
    ],
    logiciels: ['Mediboard', 'NetSoins', 'CPAM', 'ASIP Santé', 'MSSanté', 'DMP'],
    cta: 'Évaluer votre projet',
  },
}

export const WHY_US = [
  {
    icon:  'timer',
    title: 'Intervention en moins de 90 min',
    desc:  'Nos techniciens couvrent la région depuis Montpellier et Nice. Engagement de proximité non-négociable.',
    color: 'terra',
  },
  {
    icon:  'shield',
    title: 'Expert Ségur du Numérique',
    desc:  'Nous vous guidons dans l\'obtention des financements et la mise en conformité avec les exigences de l\'État.',
    color: 'mer',
  },
  {
    icon:  'lock',
    title: 'Données patients sécurisées',
    desc:  'Sauvegarde, chiffrement, conformité RGPD. La confidentialité médicale n\'est pas une option.',
    color: 'garrigue',
  },
  {
    icon:  'monitor',
    title: 'Télémaintenance instantanée',
    desc:  'Avec RALF et TeamViewer, votre technicien intervient en quelques minutes sans se déplacer.',
    color: 'soleil',
  },
  {
    icon:  'users',
    title: 'Interlocuteur unique dédié',
    desc:  'Plus de hotline injoignable. Votre technicien attitré répond sur son portable en contrat premium.',
    color: 'olive',
  },
  {
    icon:  'award',
    title: 'Groupe e-Santé France',
    desc:  'Membre fondateur du groupe, nous travaillons en collaboration directe avec CPAM, ASIP et GIE CPS.',
    color: 'mer',
  },
]

export const PARTNERS = [
  'Doctolib',
  'SESAM-Vitale',
  'Ségur du Numérique',
  'CompuGroup Medical',
  'Medimail',
  'MSSanté',
  'CPAM',
  'ASIP Santé',
]

export const NAV_LINKS = [
  { label: 'Accueil',         href: '/' },
  { label: 'Qui-sommes-nous', href: '/qui-sommes-nous' },
  { label: 'Actualités',      href: '/actualites' },
  { label: 'Assistance',      href: '/assistance' },
]

// ═══════════════════════════════════════════════
//  PAGE QUI SOMMES-NOUS
// ═══════════════════════════════════════════════

export const VALEURS = [
  {
    icon:   'sun',
    title:  'Proximité',
    desc:   "Nous sommes voisins de nos clients. Nos techniciens connaissent le tissu médical local, ses spécificités, ses acteurs. Ce n'est pas un discours — c'est notre réalité quotidienne depuis Montpellier et Nice.",
    color:  'terra',
    number: '01',
  },
  {
    icon:   'anchor',
    title:  'Fiabilité',
    desc:   "En médecine, une panne informatique n'est jamais anodine. Nous nous engageons sur des délais d'intervention précis, avec un interlocuteur joignable en permanence — pas une hotline anonyme.",
    color:  'mer',
    number: '02',
  },
  {
    icon:   'leaf',
    title:  'Clarté',
    desc:   "Pas de jargon inutile, pas de surprise sur la facture. Nous expliquons ce que nous faisons, pourquoi, et combien ça coûte — avant de le faire. Vous restez maître de vos décisions.",
    color:  'olive',
    number: '03',
  },
  {
    icon:   'zap',
    title:  'Expertise',
    desc:   "L'informatique médicale a ses propres règles : SESAM-Vitale, Ségur, MSS, DMP… Nous les connaissons par cœur. Vous n'avez pas à vous en préoccuper.",
    color:  'soleil',
    number: '04',
  },
]

export const OFFRES = [
  {
    id:      'logiciel',
    number:  '01',
    icon:    'monitor',
    title:   'Logiciel Métier',
    tagline: 'Votre logiciel de gestion, sans les maux de tête',
    color:   'terra',
    intro:   "Quel que soit votre logiciel de gestion de patients, nous sommes distributeur officiel, mainteneur et formateur. Fini la hotline injoignable.",
    details: [
      { title: 'Distributeur & mainteneur officiel', desc: "Relation directe avec les éditeurs. Mises à jour, correctifs et évolutions déployés sans perturbation de votre activité." },
      { title: 'Formation & prise en main',          desc: "Onboarding sur site pour vous et votre équipe — secrétaires, remplaçants, internes. À votre rythme, dans votre cabinet." },
      { title: 'Contrat premium — interlocuteur dédié', desc: "Un technicien attitré, joignable sur son portable. Plus d'attente interminable : nous vous rappelons dès que l'on se libère." },
      { title: 'Compatibilité totale',               desc: "SESAM-Vitale, Tiers Payant, prescriptions VIDAL sécurisées, DMP, messagerie MSSanté — tout est intégré et à jour." },
    ],
    logiciels: ['Medistory', 'Hellodoc', 'Doctolib', 'Crossway', 'Logosw', 'Julie Solutions'],
  },
  {
    id:      'materiel',
    number:  '02',
    icon:    'cpu',
    title:   'Matériel',
    tagline: 'Ordinateurs, lecteurs, réseaux — on gère tout',
    color:   'mer',
    intro:   "Ordinateurs, périphériques, lecteurs de carte Vitale, téléphonie… Nous proposons, livrons, installons et maintenons l'intégralité de votre parc informatique.",
    details: [
      { title: 'Audit & conseil matériel',        desc: "Nous évaluons votre parc existant et vous recommandons uniquement ce dont vous avez besoin — sans sur-vente." },
      { title: 'Lecteurs de cartes Vitale certifiés', desc: "Gamme complète de lecteurs SESAM-Vitale homologués, avec installation et paramétrage inclus. Boutique en ligne disponible." },
      { title: 'Financement flexible',            desc: "Paiement comptant, en plusieurs fois ou en financement — c'est vous qui choisissez." },
      { title: 'Maintenance préventive',          desc: "Contrats de maintenance incluant la surveillance à distance, les sauvegardes automatiques et les interventions préventives." },
    ],
    logiciels: ['Lecteurs Bioguard', 'Ingenico', 'HP Medical', 'Lenovo ThinkPad', 'Dell Latitude', 'Brother Medical'],
  },
  {
    id:      'institutions',
    number:  '03',
    icon:    'landmark',
    title:   'Institutions & Organismes',
    tagline: "CPAM, ASIP, GIE CPS — on parle leur langue",
    color:   'garrigue',
    intro:   "Nous connaissons l'ensemble des organismes qui gravitent autour de votre secteur. Nous travaillons en collaboration directe avec eux — pour que vous n'ayez pas à le faire.",
    details: [
      { title: 'CPAM & Tiers Payant',     desc: "Paramétrage des mutuelles, Tiers Payant intégral, rejets FSE traités — nous gérons les relations avec la Caisse d'Assurance Maladie." },
      { title: 'ASIP Santé & GIE CPS',    desc: "Cartes CPS, téléconsultation, messagerie MSSanté, DMP — mise en conformité complète avec les exigences nationales." },
      { title: 'Ségur du Numérique',      desc: "Accompagnement complet pour obtenir les financements Ségur et déployer les logiciels référencés. Dossier pris en charge de A à Z." },
      { title: 'Groupe e-Santé France',   desc: "En tant que membre fondateur, nous bénéficions d'un accès privilégié aux dernières évolutions réglementaires et techniques du secteur." },
    ],
    logiciels: ['CPAM', 'ASIP Santé', 'GIE CPS', 'Ségur du Numérique', 'MSSanté', 'DMP'],
  },
]

export const TIMELINE = [
  { year: '2003', title: 'Fondation SINBIOSE',          desc: "Création à Montpellier par Bruno Solis, avec une vision claire : spécialiser l'informatique au service exclusif des professionnels de santé.", color: 'terra' },
  { year: '2008', title: 'Intégration Groupe e-Santé',  desc: "Membre fondateur du Groupe e-Santé France — un réseau national d'experts en informatique médicale.", color: 'mer' },
  { year: '2015', title: '1 000 médecins',              desc: "Franchissement du cap des 1 000 professionnels de santé accompagnés en région Occitanie et PACA.", color: 'soleil' },
  { year: '2018', title: '3 000 médecins',              desc: "La barre des 3 000 médecins franchie. Ouverture de l'agence de Nice (ex AxiService) pour couvrir la Côte d'Azur.", color: 'olive' },
  { year: '2021', title: 'Ségur du Numérique',          desc: "Déploiement massif des solutions référencées Ségur pour des centaines de cabinets — accompagnement et financement inclus.", color: 'garrigue' },
  { year: '2026', title: "Aujourd'hui",                 desc: "13 experts, 2 agences, 250+ centres médicaux. Et une ambition intacte : rendre la technologie médicale accessible à tous.", color: 'terra', current: true },
]

export const EQUIPE_ROLES = [
  { role: 'Fondateur & Directeur',             initials: 'BS', color: 'terra',    name: 'Bruno Solis' },
  { role: 'Responsable technique Montpellier', initials: 'TC', color: 'mer',      name: 'Technicien Senior' },
  { role: 'Support logiciel métier',           initials: 'AL', color: 'garrigue', name: 'Accompagnement Logiciel' },
  { role: 'Responsable agence Nice',           initials: 'RN', color: 'soleil',   name: 'Responsable Nice' },
  { role: 'Technicien terrain',                initials: 'TT', color: 'olive',    name: 'Intervention Site' },
  { role: 'Support client & formation',        initials: 'SF', color: 'mer',      name: 'Formation & Onboarding' },
]

// ═══════════════════════════════════════════════
//  PAGE ASSISTANCE
// ═══════════════════════════════════════════════

export const MODES_ASSISTANCE = [
  {
    id:      'telemaintenance',
    number:  '01',
    icon:    'monitor-dot',
    title:   'Télémaintenance',
    tagline: 'Votre technicien prend la main en temps réel',
    color:   'terra',
    delay:   '< 10 min',
    delayLabel: 'Temps de connexion',
    desc:    "En cas de question d'utilisation ou de panne, nos experts se connectent directement à votre poste et résolvent le problème en temps réel — sans déplacement.",
    steps: [
      { num: '1', text: 'Appelez votre technicien attitré' },
      { num: '2', text: 'Cliquez sur le bouton RALF ou TeamViewer ci-dessus' },
      { num: '3', text: 'Communiquez le code affiché à votre technicien' },
      { num: '4', text: 'Le technicien prend le contrôle et résout le problème' },
    ],
    note: "Le contrôle de votre poste ne peut pas être pris sans votre consentement. Un code vous est communiqué — vous devez obligatoirement le transmettre à votre technicien.",
  },
  {
    id:      'intervention',
    number:  '02',
    icon:    'wrench',
    title:   'Intervention sur Site',
    tagline: 'Un technicien chez vous en moins de 4h',
    color:   'mer',
    delay:   '< 4h',
    delayLabel: 'Délai d\'intervention',
    desc:    "Quand la télémaintenance ne suffit pas, un technicien se déplace dans votre cabinet. Délai selon votre contrat de maintenance — jusqu'à moins de 4 heures.",
    steps: [
      { num: '1', text: 'Appelez notre hotline ou envoyez une demande RALF' },
      { num: '2', text: 'Diagnostic rapide par téléphone ou à distance' },
      { num: '3', text: 'Planification de l\'intervention selon votre contrat' },
      { num: '4', text: 'Technicien sur site, problème résolu' },
    ],
    note: "Le délai d'intervention dépend de votre contrat de maintenance (Standard : 24h, Premium : 4h). Contactez-nous pour adapter votre contrat.",
  },
  {
    id:      'telephone',
    number:  '03',
    icon:    'phone-call',
    title:   'Support Téléphonique',
    tagline: 'Un seul interlocuteur, quelle que soit la panne',
    color:   'garrigue',
    delay:   'Immédiat',
    delayLabel: 'Prise en charge',
    desc:    "Quelle que soit votre panne ou votre question — logiciel, matériel, SESAM-Vitale, Ségur — un seul numéro, un seul interlocuteur qui connaît votre cabinet.",
    steps: [
      { num: '1', text: 'Composez le numéro de votre agence' },
      { num: '2', text: 'Décrivez votre problème à votre technicien attitré' },
      { num: '3', text: 'Résolution immédiate ou déclenchement d\'une intervention' },
      { num: '4', text: 'Suivi et confirmation de résolution' },
    ],
    note: "En contrat premium, vous disposez du portable direct de votre technicien attitré. Fini les hotlines anonymes.",
  },
]

export const FAQ_ASSISTANCE = [
  {
    q: "Comment fonctionne la prise en main à distance ?",
    a: "Vous lancez le programme RALF ou TeamViewer depuis notre page d'assistance. Un code à 9 chiffres s'affiche sur votre écran. Vous le communiquez à votre technicien au téléphone. Il se connecte alors à votre poste — vous voyez tout ce qu'il fait en temps réel, et vous pouvez interrompre la session à tout moment.",
  },
  {
    q: "Mon cabinet est-il sécurisé pendant la prise en main ?",
    a: "Oui, totalement. La connexion est chiffrée de bout en bout. Le technicien ne peut pas se connecter sans le code que vous lui fournissez en direct. Il ne peut pas accéder à votre poste une fois la session terminée. Nous ne stockons aucune donnée de connexion.",
  },
  {
    q: "Quelle est la différence entre RALF et TeamViewer ?",
    a: "RALF est notre outil maison conçu spécialement pour nos clients. Il vous permet de demander une assistance à l'heure qui vous convient, sans décrocher le téléphone — idéal pour ne pas interrompre vos consultations. TeamViewer est utilisé pour les connexions immédiates à la demande d'un technicien en ligne.",
  },
  {
    q: "Quels sont les délais d'intervention selon mon contrat ?",
    a: "En contrat Standard, l'intervention sur site est garantie sous 24h ouvrées. En contrat Premium, le délai est ramené à 4h. La télémaintenance est disponible dans les 10 minutes pour tous les contrats. Contactez-nous pour connaître ou faire évoluer votre contrat.",
  },
  {
    q: "Puis-je contacter mon technicien directement sur son portable ?",
    a: "Oui, en contrat Premium. Vous disposez du numéro direct de votre technicien attitré, joignable sur son portable. Fini la hotline anonyme — votre technicien connaît votre cabinet, vos logiciels, votre configuration.",
  },
  {
    q: "Que faire en cas de panne un lundi matin avant l'ouverture ?",
    a: "Appelez immédiatement notre ligne principale (Montpellier : 04 99 53 05 32 / Nice : 04 93 72 87 83). Nos techniciens sont disponibles dès 9h. En contrat Premium, votre technicien attitré est joignable directement. La télémaintenance peut résoudre la majorité des pannes en moins de 10 minutes.",
  },
  {
    q: "Mon logiciel métier est proposé par un autre éditeur — pouvez-vous intervenir ?",
    a: "Oui. Nous sommes distributeurs officiels de plusieurs éditeurs de logiciels médicaux, et nous maîtrisons la majorité des solutions du marché (Hellodoc, Medistory, Crossway, Julie Solutions…). Pour les logiciels que nous ne distribuons pas, nous servons d'interface avec l'éditeur — vous n'avez plus qu'un seul interlocuteur.",
  },
  {
    q: "La prise en main à distance est-elle compatible Mac ?",
    a: "RALF est disponible sur Windows uniquement. TeamViewer est compatible Windows et macOS. Si vous êtes sur Mac, utilisez le bouton TeamViewer et précisez-le à votre technicien lors de l'appel.",
  },
]

export const CONTRATS = [
  {
    id:        'essentiel',
    name:      'Essentiel',
    color:     'sable',
    delay:     '48h',
    delayType: 'Intervention site',
    support:   'Téléphonique',
    remote:    'TeamViewer',
    interlocuteur: 'Hotline agence',
    highlighted: false,
    features: [
      'Support téléphonique agence',
      'Télémaintenance TeamViewer',
      'Intervention site sous 48h',
      'Mises à jour logiciel incluses',
    ],
  },
  {
    id:        'standard',
    name:      'Standard',
    color:     'mer',
    delay:     '24h',
    delayType: 'Intervention site',
    support:   'Téléphonique prioritaire',
    remote:    'RALF + TeamViewer',
    interlocuteur: 'Technicien dédié',
    highlighted: false,
    features: [
      'Support téléphonique prioritaire',
      'RALF + TeamViewer',
      'Intervention site sous 24h',
      'Technicien dédié',
      'Mises à jour & formation incluses',
    ],
  },
  {
    id:        'premium',
    name:      'Premium',
    color:     'terra',
    delay:     '4h',
    delayType: 'Intervention site',
    support:   'Portable direct',
    remote:    'RALF + TeamViewer',
    interlocuteur: 'Portable technicien',
    highlighted: true,
    features: [
      'Portable direct de votre technicien',
      'RALF + TeamViewer',
      'Intervention site sous 4h',
      'Technicien attitré dédié',
      'Mises à jour & formation incluses',
      'Rapport d\'intervention mensuel',
    ],
  },
]

// ═══════════════════════════════════════════════
//  PAGE ACTUALITÉS
// ═══════════════════════════════════════════════

export const CATEGORIES_ACTU = [
  { id: 'all',       label: 'Toutes',           color: 'terra'    },
  { id: 'segur',     label: 'Ségur du Numérique', color: 'mer'    },
  { id: 'logiciel',  label: 'Logiciel métier',   color: 'garrigue' },
  { id: 'securite',  label: 'Cybersécurité',     color: 'terra'    },
  { id: 'materiel',  label: 'Matériel',          color: 'soleil'   },
  { id: 'sante-num', label: 'Santé numérique',   color: 'olive'    },
]

export const ARTICLES = [
  {
    id:       1,
    slug:     'segur-vague-2-ce-qui-change',
    featured: true,
    category: 'segur',
    title:    'Ségur du Numérique vague 2 : ce qui change pour votre cabinet en 2025',
    excerpt:  'La deuxième vague du Ségur du Numérique impose de nouvelles obligations aux logiciels de gestion de cabinet. Découvrez les échéances, les aides financières disponibles et comment nous vous accompagnons.',
    author:   'Équipe TechnoSanté',
    date:     '2025-03-15',
    readTime: '5 min',
    tags:     ['segur', 'logiciel'],
    gradient: 'linear-gradient(135deg, #FDE0D0 0%, #FAC0A0 100%)',
    accentColor: '#C95C35',
  },
  {
    id:       2,
    slug:     'cyberattaques-cabinets-medicaux',
    featured: false,
    category: 'securite',
    title:    'Cyberattaques : pourquoi les cabinets médicaux sont désormais des cibles prioritaires',
    excerpt:  'En 2024, les établissements de santé ont subi 3 fois plus de cyberattaques qu\'en 2023. Ransomware, phishing, vol de données patients — comment vous protéger concrètement.',
    author:   'Équipe TechnoSanté',
    date:     '2025-02-28',
    readTime: '7 min',
    tags:     ['securite'],
    gradient: 'linear-gradient(135deg, #D0E8F4 0%, #A0CDE6 100%)',
    accentColor: '#0E6E9E',
  },
  {
    id:       3,
    slug:     'doctolib-integration-logiciel-metier',
    featured: false,
    category: 'logiciel',
    title:    'Doctolib et votre logiciel métier : comment bien synchroniser vos agendas',
    excerpt:  'La synchronisation entre Doctolib et votre logiciel de gestion de cabinet peut devenir un casse-tête. Voici les bonnes pratiques que nous avons développées pour nos clients.',
    author:   'Équipe TechnoSanté',
    date:     '2025-02-10',
    readTime: '4 min',
    tags:     ['logiciel'],
    gradient: 'linear-gradient(135deg, #EDE8F5 0%, #D8CEEE 100%)',
    accentColor: '#8B74CA',
  },
  {
    id:       4,
    slug:     'lecteurs-carte-vitale-nouvelle-generation',
    featured: false,
    category: 'materiel',
    title:    'Lecteurs de carte Vitale nouvelle génération : ce que vous devez savoir avant d\'acheter',
    excerpt:  'Les lecteurs Bioguard et Ingenico de dernière génération intègrent désormais la biométrie et la signature électronique. Tour d\'horizon des modèles disponibles et de leur compatibilité.',
    author:   'Équipe TechnoSanté',
    date:     '2025-01-22',
    readTime: '6 min',
    tags:     ['materiel'],
    gradient: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
    accentColor: '#D4A010',
  },
  {
    id:       5,
    slug:     'messagerie-mssante-obligation-2025',
    featured: false,
    category: 'sante-num',
    title:    'Messagerie MSSanté : elle devient obligatoire pour tous les professionnels de santé',
    excerpt:  'À partir du 1er janvier 2025, la messagerie sécurisée de santé (MSSanté) est obligatoire pour tous les échanges de données de santé entre professionnels. Mode d\'emploi.',
    author:   'Équipe TechnoSanté',
    date:     '2025-01-08',
    readTime: '5 min',
    tags:     ['sante-num', 'logiciel'],
    gradient: 'linear-gradient(135deg, #EFF2E5 0%, #D5DDC0 100%)',
    accentColor: '#617A36',
  },
  {
    id:       6,
    slug:     'sauvegarde-donnees-patients-rgpd',
    featured: false,
    category: 'securite',
    title:    'Sauvegarde et RGPD : êtes-vous vraiment en conformité ?',
    excerpt:  'La CNIL a sanctionné plusieurs cabinets médicaux en 2024 pour des manquements à la protection des données patients. Checklist de conformité et solutions pratiques.',
    author:   'Équipe TechnoSanté',
    date:     '2024-12-18',
    readTime: '8 min',
    tags:     ['securite', 'logiciel'],
    gradient: 'linear-gradient(135deg, #FDE0D0 0%, #FAC0A0 100%)',
    accentColor: '#C95C35',
  },
  {
    id:       7,
    slug:     'tiers-payant-generalise-comment-ca-marche',
    featured: false,
    category: 'logiciel',
    title:    'Tiers Payant généralisé : comment éviter les rejets et les impayés',
    excerpt:  'Le Tiers Payant généralisé est désormais la norme. Pourtant, les rejets FSE restent fréquents. Voici les erreurs les plus courantes et comment les éviter avec votre logiciel.',
    author:   'Équipe TechnoSanté',
    date:     '2024-11-30',
    readTime: '6 min',
    tags:     ['logiciel'],
    gradient: 'linear-gradient(135deg, #EDE8F5 0%, #D8CEEE 100%)',
    accentColor: '#8B74CA',
  },
  {
    id:       8,
    slug:     'aide-segur-financement-comment-obtenir',
    featured: false,
    category: 'segur',
    title:    "Aides Ségur : comment obtenir jusqu'à 3 500 € de financement pour votre cabinet",
    excerpt:  "Le programme Ségur du Numérique prévoit des aides substantielles pour les professionnels de santé. Montants, conditions d'éligibilité et démarches — on vous explique tout.",
    author:   'Équipe TechnoSanté',
    date:     '2024-11-12',
    readTime: '5 min',
    tags:     ['segur'],
    gradient: 'linear-gradient(135deg, #D0E8F4 0%, #A0CDE6 100%)',
    accentColor: '#0E6E9E',
  },
  {
    id:       9,
    slug:     'dmp-dossier-medical-partage-guide',
    featured: false,
    category: 'sante-num',
    title:    'DMP : le guide pratique pour activer et utiliser le Dossier Médical Partagé',
    excerpt:  'Le DMP est maintenant actif pour 70 millions de Français. Comment l\'intégrer efficacement dans votre pratique quotidienne et dans votre logiciel de cabinet.',
    author:   'Équipe TechnoSanté',
    date:     '2024-10-25',
    readTime: '4 min',
    tags:     ['sante-num', 'logiciel'],
    gradient: 'linear-gradient(135deg, #EFF2E5 0%, #D5DDC0 100%)',
    accentColor: '#617A36',
  },
]

export const ARTICLES_PER_PAGE = 6

// ═══════════════════════════════════════════════
//  RÉSEAUX SOCIAUX
//  → Remplacer "#" par les vraies URLs
// ═══════════════════════════════════════════════

export const SOCIAL_LINKS = [
  {
    id:    'linkedin',
    label: 'LinkedIn',
    href:  'https://www.linkedin.com/company/technosante-med/',
    icon:  'linkedin',
    color: '#0A66C2',
  },
  {
    id:    'youtube',
    label: 'YouTube',
    href:  '#',  // TODO: https://www.youtube.com/@technosante
    icon:  'youtube',
    color: '#FF0000',
  },
  {
    id:    'facebook',
    label: 'Facebook',
    href:  'https://www.facebook.com/p/TechnoSant%C3%A9-M%C3%A9diterran%C3%A9e-100068766662254',
    icon:  'facebook',
    color: '#1877F2',
  },
]

// ═══════════════════════════════════════════════
//  TÉMOIGNAGES — placeholder, à remplacer par les vrais
// ═══════════════════════════════════════════════

export const TEMOIGNAGES = [
  {
    id:      1,
    quote:   "Depuis qu'on travaille avec TechnoSanté, on n'a plus à se soucier de l'informatique. Les pannes sont résolues en moins d'une heure et mon équipe peut se concentrer sur les patients.",
    author:  'Dr. Sophie Marchand',
    role:    'Médecin généraliste',
    city:    'Montpellier',
    initials:'SM',
    color:   'terra',
    stars:   5,
    // photo: '/photos/dr-marchand.jpg', // TODO: à décommenter quand la photo est disponible
  },
  {
    id:      2,
    quote:   "La migration vers le Ségur du Numérique s'est faite sans interruption de notre activité. L'équipe a tout géré de A à Z — on n'avait qu'à signer. Je recommande les yeux fermés.",
    author:  'Dr. Pierre Vidal',
    role:    'Chirurgien-dentiste',
    city:    'Nîmes',
    initials:'PV',
    color:   'mer',
    stars:   5,
    // photo: '/photos/dr-vidal.jpg',
  },
  {
    id:      3,
    quote:   "20 ans de fidélité et je comprends pourquoi. Un seul numéro, un technicien qui connaît notre cabinet par cœur, et une réactivité qui n'a jamais faibli. C'est rare.",
    author:  'Dr. Marie-Hélène Fabre',
    role:    'Directrice médicale',
    city:    'Nice',
    initials:'MF',
    color:   'garrigue',
    stars:   5,
    // photo: '/photos/dr-fabre.jpg',
  },
]

// ═══════════════════════════════════════════════
//  PHOTOS — URLs Unsplash (libres de droit)
//  → À remplacer par les vraies photos client
// ═══════════════════════════════════════════════

export const PHOTOS = {
  // Hero homepage — cabinet médical lumineux
  heroMain:   'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1200&auto=format&fit=crop&q=80',
  // Technicien au travail
  techWork1:  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop&q=80',
  techWork2:  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=80',
  // Cabinet médical moderne
  cabinet1:   'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80',
  cabinet2:   'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&auto=format&fit=crop&q=80',
  // Équipe / collaboration
  team1:      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&auto=format&fit=crop&q=80',
  team2:      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&auto=format&fit=crop&q=80',
  // Méditerranée / Sud de France
  med1:       'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop&q=80',
  // Matériel informatique médical
  hardware1:  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=80',
  // Montpellier
  montpellier:'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&auto=format&fit=crop&q=80',
}
