# Site Cap IA (cap-ia.pro)

Site vitrine statique, construit avec [Astro](https://astro.build) et servi par un Worker Cloudflare (ressources statiques, sans code serveur).
Le plan de refonte complet est dans [PLAN_REFONTE.md](PLAN_REFONTE.md).

## Ce qu'il faut savoir en une minute

- **Les textes des offres et des réalisations** sont des fichiers Markdown : `src/content/offres/*.md` et `src/content/realisations/*.md`. Ajouter un fichier ajoute une page, une carte sur l'accueil et une entrée dans le sitemap.
- **Les coordonnées, le bouton d'appel, les créneaux, le formulaire, la prise de rendez-vous et la mesure d'audience** se règlent dans un seul fichier : `src/data/site.ts`.
- **Le dossier `dist/` est versionné volontairement.** Workers Builds (relié à ce dépôt GitHub) exécute `npx wrangler deploy` à chaque push sur `main` et publie `./dist` tel quel (voir `wrangler.jsonc`). Il faut donc **toujours lancer `npm run build` avant de commiter** une modification.
- Règle éditoriale vérifiée automatiquement : aucun tiret cadratin ni demi-cadratin. Le build échoue s'il en trouve un, ainsi que pour une image sans texte alternatif, un lien interne cassé ou une page sans titre principal unique.

## Commandes

```bash
npm install          # une fois
npm run dev          # site en local avec rechargement, http://localhost:4321
npm run build        # compile dans dist/ puis lance les vérifications
npm run images       # régénère favicon, icônes et images de partage (après un nouveau cas ou une nouvelle offre)
npx wrangler dev     # sert dist/ comme en production (en-têtes de sécurité, redirections), http://localhost:8787
```

## Organisation

| Dossier | Contenu |
|---|---|
| `src/content/` | Offres et réalisations (Markdown, champs validés par `src/content.config.ts`) |
| `src/pages/` | Pages du site (accueil, offres, réalisations, à propos, rendez-vous, légal) |
| `src/components/` | En-tête, pied de page, logo, bouton d'appel, schéma de flux, engagements |
| `src/styles/global.css` | Couleurs, typographie, composants communs |
| `src/data/site.ts` | Réglages centraux |
| `public/` | Fichiers servis tels quels : polices, icônes, images de partage, `_headers`, `_redirects`, outils internes |
| `public/outils/` | Formulaire de cadrage et guide d'entretien (non indexés, hors navigation) |
| `scripts/` | Génération des images, vérifications après build, polices TTF utilisées pour les images |

## Prise de rendez-vous

Choix du 15 octobre 2026 : pas d'outil de réservation payant. La page `/rendez-vous` propose une **demande de créneau par formulaire** (créneaux validés, réponse sous 2 jours ouvrés), envoyée par Formspree.

Pour brancher plus tard un outil gratuit (par exemple une page de réservation Google Agenda) :

1. renseigner `reservation.url`, `reservation.outil` et `reservation.domaines` dans `src/data/site.ts` ;
2. dans `public/_headers`, remplacer `frame-src 'none'` par `frame-src https://<domaine de l'outil>` ;
3. `npm run build`, vérifier `/rendez-vous`, commiter, pousser.

La politique de confidentialité mentionne l'outil automatiquement.

## Activer la mesure d'audience

Dans le tableau de bord Cloudflare, activer **Web Analytics** pour cap-ia.pro et copier le jeton, puis dans `src/data/site.ts` : `mesureAudience.actif = true` et `mesureAudience.jeton = '...'`. La politique de confidentialité se met à jour toute seule.

## Aperçu sans indexation

`npm run build:apercu` produit une version marquée `noindex` (et un `robots.txt` qui interdit tout), utile pour une adresse de prévisualisation. Relancer ensuite un `npm run build` normal avant de commiter.
