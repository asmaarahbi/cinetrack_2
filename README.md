# CinéTrack

CinéTrack est une petite application web pour parcourir des films et des séries.
On peut rechercher un titre, filtrer par type, naviguer par pages et ajouter des favoris.

Projet réalisé du 9 au 13 novembre 2026 en HTML, Tailwind CSS et JavaScript (modules ES6).

## Fonctionnalités

- Affichage des films et séries sous forme de cards (image, titre, année, type)
- Message d'erreur si les données ne se chargent pas
- Modal de détails : ouverture en cliquant sur l'image ou sur « Voir plus », fermeture avec X
- Recherche par titre
- Filtre par type : All, Movies, Series
- Pagination : 8 titres par page (ordre : recherche, puis filtre, puis pagination)
- Favoris : ajout et retrait avec le cœur, sans doublon
- Sidebar « Mes favoris » avec retrait par X
- Compteur de films et de séries dans les favoris
- Sauvegarde des favoris dans le `localStorage` (ils restent après l'actualisation)
- Design responsive (mobile, tablette, ordinateur)

## Technologies

- HTML5
- Tailwind CSS (via CDN)
- JavaScript ES6 (modules, async/await)
- API JSON hébergée sur GitHub

## Structure du projet

```
cinetrack/
├── index.html
├── assets/
│   └── images/
└── js/
    ├── api.js        # récupération des données (fetch + localStorage)
    ├── main.js       # logique principale (recherche, filtre, pagination, événements)
    ├── movies.js     # création et affichage des cards
    ├── modal.js      # ouverture et fermeture de la modal
    └── favorites.js  # gestion des favoris (ajout, retrait, sidebar, compteur)
```

## Lancer le projet

Les modules JavaScript ne fonctionnent pas en ouvrant le fichier directement. Il faut un serveur local.

1. Cloner le dépôt
2. Ouvrir le dossier dans VS Code
3. Lancer **Live Server** sur `index.html`

## API utilisée

```
https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json
```

Les données sont récupérées avec `fetch`, puis gardées dans le `localStorage` pour éviter de les recharger à chaque visite.

## Notions JavaScript utilisées

| Notion                              | Où                                     |
| ----------------------------------- | -------------------------------------- |
| `fetch`, `async/await`, `try/catch` | `api.js`                               |
| `map`                               | affichage des cards et des favoris     |
| `find`                              | retrouver le film cliqué pour la modal |
| `filter`                            | recherche et filtre par type           |
| `slice`                             | pagination                             |
| `reduce`                            | compteur de films et de séries         |
| `localStorage`                      | sauvegarde des favoris                 |
| Délégation d'événements             | clics sur la grille et sur la sidebar  |

## Auteur

- Nom : `ASMAA RAHBI`
