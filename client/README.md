# TechnoSanté Méditerranée — Refonte du site web
## 🧭 Contexte du projet

Ce projet est une refonte complète du site web de TechnoSanté Méditerranée, une entreprise spécialisée dans l’accompagnement informatique des professionnels de santé.

Le site existant étant vieillissant (UI/UX datée, structure peu claire, manque de modernité), l’objectif a été de :

moderniser l’image de l’entreprise
améliorer l’expérience utilisateur
clarifier l’offre de services
poser une base technique solide et évolutive
## 🎯 Objectifs
Proposer une interface moderne, claire et professionnelle
Améliorer la lisibilité des services
Structurer le contenu pour un usage réel (clients, prospects)
Mettre en place une base prête pour :
un backend (formulaire, newsletter)
un futur système de paiement
un déploiement en production
## ⚙️ Stack technique
Frontend
React (Vite)
Tailwind CSS
React Router
Framer Motion (animations)
Lucide Icons
## Backend (en cours d’intégration)
Express.js
Nodemailer (formulaire de contact)
API REST
## 🚀 Installation & lancement
npm install
npm run dev       # http://localhost:5173
npm run build     # dist/
## 📄 Pages du site
Route	Statut	Description
/	✅	Page d’accueil (Hero, services, stats, agences, contact)
/qui-sommes-nous	✅	Présentation de l’entreprise, valeurs, offres
/actualites	✅	Blog avec filtres, recherche, pagination
/assistance	✅	Support technique, outils, FAQ, horaires live
## ✨ Fonctionnalités principales
Interface responsive et moderne
Animations fluides (scroll reveal)
Système de statut en temps réel (disponibilité techniciens)
Filtrage + recherche sur les actualités
Architecture modulaire et scalable
Centralisation des données (siteData.js)
Accessibilité partielle (ARIA, rôles)
## 📡 Backend (en cours)

Routes prévues :

POST /api/contact
→ envoi d’email via formulaire de contact (Nodemailer)
POST /api/newsletter
→ inscription newsletter (fallback email, futur Brevo/Mailchimp)
GET /api/status
→ disponibilité des techniciens en temps réel
## 🔐 Configuration (.env)

Exemple côté serveur :

PORT=5000

SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_USER=info@technosante.fr
SMTP_PASS=********
SMTP configuré pour OVH (SSL)
La newsletter fonctionne en fallback email tant que l’API dédiée n’est pas connectée
## 🏗️ Architecture
technosante/
├── client/ (React)
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── constants/
└── server/ (Express)
    ├── routes/
    ├── index.js
    └── .env
## 📈 Axes d’amélioration (en cours)
Mise en place complète du backend
Connexion à un service de newsletter (Brevo / Mailchimp)
Ajout d’un système de paiement
Déploiement en production
SEO avancé
CMS ou Markdown pour la gestion des articles
Page dynamique /actualites/:slug
## 💡 Valeur ajoutée du projet
Refonte UX/UI complète d’un site réel
Passage d’un site statique vieillissant à une base moderne
Architecture prête pour évolution (scalable)
Simulation de conditions réelles (client, besoins métier)
Travail sur la lisibilité, la conversion et la crédibilité
## 🧠 Démarche

Ce projet s’inscrit dans une logique de montée en compétence :

structuration d’un projet frontend professionnel
intégration progressive d’un backend
réflexion produit (UX, contenu, structure)
anticipation des besoins réels d’une entreprise
## 📌 Statut du projet

### 🟡 En cours d’amélioration

Le socle frontend est fonctionnel et stable.
Le backend et certaines fonctionnalités avancées sont en cours d’intégration.

## 🤝 Remarque

Ce projet a été réalisé dans une logique de refonte et d’amélioration continue.
Il ne s’agit pas seulement d’un exercice technique, mais d’une approche orientée produit et usage réel.