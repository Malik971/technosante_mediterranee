# TechnoSanté Méditerranée — Site Web

Site vitrine complet React + Tailwind CSS. 4 pages, architecture modulaire.

## Installation & lancement

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # dist/
```

## Pages

| Route              | Statut | Sections principales |
|--------------------|--------|----------------------|
| `/`                | ✅      | Hero, Services, Stats, WhyUs, Agences, Contact |
| `/qui-sommes-nous` | ✅      | Valeurs, Timeline, Offres (onglets), Équipe |
| `/actualites`      | ✅      | À la une, Grille filtrée + recherche + pagination, Newsletter |
| `/assistance`      | ✅      | RALF + TeamViewer, 3 modes, Contrats, Horaires live, FAQ |

## Contenu

Tout centralisé dans `src/constants/siteData.js`.

## Backend à brancher

- `POST /api/contact` → formulaire de contact (Nodemailer)
- `POST /api/newsletter` → inscription email (Brevo, Mailchimp…)
- `GET  /api/status` → disponibilité techniciens temps réel

## Déploiement

```bash
npm run build
# dist/ → Vercel / Netlify / OVH
```
