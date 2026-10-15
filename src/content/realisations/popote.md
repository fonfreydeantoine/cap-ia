---
titre: "Ne plus se demander ce qu'on mange cette semaine"
outil: "Popote"
etiquette: "Pour mon foyer"
ordre: 3
phare: false
resume: "Une application simple pour planifier des repas sans viande à deux : recherche par ingrédient, cuisine avec ce qu'il reste dans le frigo, sélection envoyée par email, liste de courses rangée par rayon."
besoin: "Planifier des repas sans viande pour deux personnes, et en finir avec la liste de courses improvisée devant le rayon."
outils:
  - "Next.js (application installable sur téléphone, lisible hors connexion)"
  - "Supabase (base de données et connexion)"
  - "API Claude d'Anthropic (génération de la base de recettes)"
  - "Brevo (email de la semaine), Vercel (hébergement)"
flux:
  - titre: "Les envies et le frigo"
    detail: "Une recherche par nom ou par ingrédient, ou ce qu'il reste dans le frigo."
    type: entree
  - titre: "La sélection de la semaine"
    detail: "Des recettes choisies dans une base générée en grande partie par IA."
    type: outil
  - titre: "Le choix de chacun"
    detail: "Chacun garde ses favoris et choisit son jour de réception."
    type: humain
  - titre: "Email et liste de courses"
    detail: "La sélection par email, et une liste de courses regroupée par rayon."
    type: sortie
miseAJour: 2026-10-15
seoTitre: "Application de planification de repas : étude de cas"
seoDescription: "Une application de planification de repas utilisée au quotidien par deux colocataires : recherche par ingrédient, module Frigo, email de la semaine et liste de courses par rayon."
---

## Le contexte

Chez moi, la question « qu'est-ce qu'on mange cette semaine ? » revenait tous les jours, et la liste de courses se faisait de mémoire. J'ai construit Popote pour mon colocataire et moi, avec son accord pour la présenter ici.

Ce n'est pas un projet d'entreprise. Je le montre parce qu'il illustre un point qui compte : un outil n'a de valeur que s'il est utilisé tous les jours, et il ne l'est que s'il est simple.

## La démarche

1. **Partir des moments réels** : décider le soir, faire les courses le week-end, cuisiner avec ce qu'il reste.
2. **Construire une base de recettes adaptée** à notre règle (sans viande), générée en grande partie par IA, avec un espace d'administration pour valider chaque recette.
3. **Garder une interface minimale**, installable sur le téléphone et lisible hors connexion, pour qu'elle serve au rayon du supermarché.
4. **Laisser chacun régler son rythme** : le jour de réception de l'email, ses favoris.

## Ce que fait l'application

- Une recherche par nom ou par ingrédient, tolérante aux fautes de frappe.
- Un module « Frigo » qui propose des recettes avec ce qu'on a sous la main.
- Une sélection de recettes envoyée par email, au jour choisi par chacun.
- Une liste de courses consolidée et regroupée par rayon.

## Le résultat

- Utilisée au quotidien par deux colocataires.
- 240 recettes dans la base au 20 août 2026, en grande partie générées par IA.

## Ce qui reste à prouver

Rien de plus que ce qui est écrit : c'est un outil personnel, sans ambition commerciale.

## Et chez vous ?

Toute tâche qui consiste à choisir, planifier puis envoyer un récapitulatif au bon moment : un planning d'équipe, des commandes récurrentes à des fournisseurs, une sélection hebdomadaire pour vos clients.
