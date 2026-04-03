# TechnoSanté Méditerranée

Site web professionnel développé pour une structure spécialisée dans l’informatique médicale.

Ce projet a été conçu comme une solution web moderne, administrable et évolutive, avec une partie **site vitrine** destinée aux visiteurs et une **interface d’administration** permettant de gérer dynamiquement les contenus.

---

## Objectif du projet

L’objectif initial était de concevoir un site professionnel capable de :

- présenter clairement les services proposés,
- renforcer la crédibilité de l’entreprise en ligne,
- offrir une navigation fluide et moderne,
- permettre une gestion simple des contenus sans devoir modifier le code à chaque changement.

Au-delà de l’aspect visuel, ce projet a été pensé comme une base solide pour une utilisation réelle et des évolutions futures.

---

## Fonctionnalités principales

### Côté site vitrine

- Page d’accueil moderne et responsive
- Présentation des services de l’entreprise
- Pages de détail par service
- Section actualités / articles
- Navigation fluide
- Design cohérent et orienté professionnel
- Mise en avant des expertises et des points de contact

### Côté administration

- Interface d’administration sécurisée
- Gestion dynamique des services
- Gestion des actualités / articles
- Mise à jour des contenus sans modification directe du code
- Structure pensée pour faciliter les évolutions futures

---

## Stack technique

### Front-end

- React
- Vite
- React Router
- Tailwind CSS
- Lucide React

### Back-end

- Node.js
- Express.js
- Prisma ORM

### Base de données

- PostgreSQL

---

## Architecture du projet

Le projet est structuré en deux parties principales :

### Front-end

Interface utilisateur du site vitrine + affichage dynamique des contenus.

### Back-end

API REST permettant :

- de récupérer les services,
- d’afficher les pages détaillées,
- de gérer les actualités,
- d’alimenter l’interface d’administration.

---

## Fonctionnement général

Le site fonctionne sur une logique hybride :

- certains contenus peuvent exister en **fallback statique**,
- mais l’objectif principal est de faire remonter les contenus depuis l’API et la base de données.

Cela permet :

- une meilleure évolutivité,
- une gestion centralisée des données,
- une maintenance plus simple,
- une meilleure séparation entre le front et le back.

---

## Fonctionnalités dynamiques déjà mises en place

### Services

Les services affichés sur la page d’accueil et leurs pages détaillées sont récupérés dynamiquement via l’API.

Exemples :

- Cabinets médicaux
- Centres dentaires
- Établissements de santé

### Pages détaillées

Chaque service peut contenir :

- une accroche spécifique,
- une introduction,
- plusieurs blocs de contenu,
- des points clés,
- des logiciels compatibles,
- un appel à l’action adapté.

### Articles / actualités

Le projet permet également d’alimenter une section de contenu éditorial afin d’enrichir le site, améliorer sa crédibilité et renforcer son intérêt SEO.

---

## Objectifs techniques du projet

Ce projet m’a permis de travailler sur plusieurs enjeux concrets :

- structuration d’un projet full-stack
- création d’une architecture maintenable
- affichage de données dynamiques
- gestion d’état côté front
- communication API front / back
- modélisation de données avec Prisma
- gestion d’un espace administrateur
- résolution de bugs liés à l’intégration, au rendu et au style

---

## Lancement du projet en local

### 1. Cloner le dépôt

```bash
git clone <URL_DU_REPO>
cd technosante
```
