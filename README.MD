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
- React 18
- TypeScript
- React Router pour la navigation
- Axios pour les appels API

### Backend
- NestJS
- TypeScript
- JWT pour l'authentification
- Validation des données avec class-validator

### Base de données
- MongoDB
- Mongoose pour l'ODM

## Prérequis

- Node.js >= 18.x
- pnpm >= 8.x
- MongoDB >= 6.x

## Installation

#### Initialisation du projet

### Configuration Backend

```bash
cd backend
pnpm install
```

Créer un fichier `.env` :

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/collection-manager
JWT_SECRET=your_secret_key
```

Démarrer le serveur :

```bash
pnpm run start:dev
```

### Configuration Frontend

```bash
cd frontend
pnpm install
```

Créer un fichier `.env` :

```env
VITE_API_URL=http://localhost:3000
```

Démarrer l'application :

```bash
pnpm run dev
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
