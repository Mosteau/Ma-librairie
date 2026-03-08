# Collection Manager

Application SaaS de gestion de bibliothèque personnelle de bandes dessinées et films (Blu-ray/DVD).

## Description

Collection Manager permet aux utilisateurs de s'inscrire et de gérer leur collection personnelle de médias physiques via un tableau de bord intuitif. Référencez, organisez et suivez vos bandes dessinées, Blu-rays et DVDs en toute simplicité.

## Fonctionnalités

- Inscription et authentification des utilisateurs
- Tableau de bord personnalisé
- Gestion de bibliothèque de bandes dessinées
- Gestion de collection de films (Blu-ray et DVD)
- Recherche et filtrage des collections
- Statistiques de collection

## Stack Technique

### Frontend
- React 19
- TypeScript
- Vite (build tool)
- React Router pour la navigation

### Backend
- NestJS 11
- TypeScript
- Mongoose pour MongoDB
- JWT pour l'authentification
- class-validator pour la validation

### Base de données
- MongoDB
- Mongoose ODM

### Outils de développement
- pnpm (gestionnaire de paquets)
- Biome (linter et formatter)
- Concurrently (exécution parallèle)

## Prérequis

- Node.js >= 18.x
- pnpm >= 8.x
- MongoDB >= 6.x

## Installation

```bash
# Installer les dépendances
pnpm install

# Installer les dépendances du backend
cd backend && pnpm install

# Installer les dépendances du frontend
cd frontend && pnpm install
```

## Configuration

### Backend

Créer un fichier `backend/.env` :

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/collection-manager
JWT_SECRET=your_secret_key
```

### Frontend

Créer un fichier `frontend/.env` :

```env
VITE_API_URL=http://localhost:3000
```

## Commandes

### Développement

```bash
# Lancer frontend et backend simultanément
pnpm run dev

# Lancer uniquement le backend
cd backend && pnpm run start:dev

# Lancer uniquement le frontend
cd frontend && pnpm run dev
```

### Linting et Formatage

```bash
# Vérifier le code (lint + format)
pnpm run lint

# Corriger automatiquement les problèmes
pnpm run lint:fix

# Formater le code
pnpm run format

# Vérifier et corriger tout
pnpm run check
```

### Build

```bash
# Build backend
cd backend && pnpm run build

# Build frontend
cd frontend && pnpm run build
```

## Structure du Projet

```
collection-manager/
├── backend/          # API NestJS
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── comics/
│   │   ├── movies/
│   │   └── main.ts
│   └── package.json
├── frontend/         # Application React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.tsx
│   └── package.json
└── README.MD
```

## Modèles de Données

### User
- email
- password (hashé)
- nom
- date d'inscription

### Bd
- titre
- auteur
- éditeur
- année
- ISBN
- format
- userId

### Movie
- titre
- réalisateur
- année
- genre
- format (Blu-ray/DVD)
- userId

## API Endpoints

### Authentification
- `POST /auth/register` - Inscription
- `POST /auth/login` - Connexion

### Comics
- `GET /comics` - Liste des BD
- `POST /comics` - Ajouter une BD
- `PUT /comics/:id` - Modifier une BD
- `DELETE /comics/:id` - Supprimer une BD

### Movies
- `GET /movies` - Liste des films
- `POST /movies` - Ajouter un film
- `PUT /movies/:id` - Modifier un film
- `DELETE /movies/:id` - Supprimer un film

## Licence

MIT
