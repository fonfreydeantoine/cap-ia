---
titre: "Trouver des partenaires sans y passer ses soirées"
outil: "Agent de prospection pour Orée"
etiquette: "Projet pour mon propre produit"
ordre: 1
phare: true
resume: "Chaque dimanche soir, un agent repère des wedding planners, étudie leur site, rédige un premier message ancré sur un fait vérifiable, le fait relire par un second modèle, puis me le présente sur mon téléphone. Je valide en quelques minutes."
besoin: "Contacter chaque semaine quelques wedding planners pertinents, avec un message juste et personnel, en n'y consacrant que quelques minutes de mon temps."
outils:
  - "Cloudflare Workers, D1 et Workflows (hébergement, base de données, enchaînement des étapes)"
  - "API Claude d'Anthropic (sept agents spécialisés, avec des modèles différents pour rédiger et pour contrôler)"
  - "API Gmail (envoi programmé depuis ma propre boîte, suivi des réponses)"
  - "Application mobile installable (validation depuis le téléphone, notifications)"
  - "168 tests automatisés"
flux:
  - titre: "Repérage du dimanche"
    detail: "Jusqu'à 12 wedding planners dans trois régions, jamais deux de la même ville la même semaine."
    type: entree
  - titre: "Étude et qualification"
    detail: "Lecture du site, seuls les faits cités mot pour mot sont retenus, note sur 100."
    type: outil
  - titre: "Rédaction puis contrôle"
    detail: "Un premier message rédigé, relu par un second modèle d'IA différent du premier."
    type: outil
  - titre: "Relecture sur mon téléphone"
    detail: "Je modifie, j'annule ou je laisse partir. Rien ne part sans cette possibilité."
    type: humain
  - titre: "Envoi et suivi"
    detail: "Envoi le lundi à 10 h depuis ma boîte, réponses classées, une seule relance à 10 jours."
    type: sortie
miseAJour: 2026-10-15
seoTitre: "Agent de prospection IA : étude de cas"
seoDescription: "Comment j'ai conçu un agent qui repère des prospects, étudie leur site, rédige un message vérifiable et me le soumet avant envoi. Démarche, garde-fous, outils, résultats datés."
---

## Le contexte

[Orée](https://www.monoree.fr) est mon propre produit : un compagnon émotionnel pour les personnes qui préparent leur mariage. Pour le faire connaître, je cherche des wedding planners partenaires. Les trouver, lire leur site, écrire un message qui ne sonne pas comme un démarchage de masse : c'est exactement le genre de travail qui finit par ne jamais être fait faute de temps.

Ce n'est pas une mission client. Je la présente parce qu'elle montre, de bout en bout, la façon dont je construis un outil : du besoin flou à un système qui tourne chaque semaine.

## La démarche

1. **Un cahier des charges écrit avant toute ligne de code** : ce que l'agent a le droit de dire sur Orée, ce qu'il n'a jamais le droit d'affirmer, à qui il ne doit pas écrire.
2. **Une construction en sept phases**, avec un point de validation avant chaque étape sensible : la lecture des sites, la rédaction, la connexion à ma boîte mail, l'envoi réel.
3. **Des essais complets sur une adresse de test et un faux formulaire** avant le moindre envoi réel.
4. **Des garde-fous écrits dans le code, pas seulement dans les consignes données à l'IA** : une citation qui ne figure pas mot pour mot sur le site est écartée, une adresse email doit apparaître sur le site pour être retenue, la note est bornée.

## Les garde-fous

- **Un plafond de dépense** de 20 € par mois, avec arrêt automatique.
- **Une liste d'opposition** : un refus inscrit l'adresse, vérifiée avant chaque envoi, et la personne n'est jamais recontactée.
- **Un seul message et une seule relance**, puis le dossier est clos.
- **Mon nom et ma boîte** : les messages partent de mon adresse, signés de mon nom, à raison de quelques-uns par semaine. L'outil prépare, je reste l'expéditeur.

## Le résultat

Au 11 octobre 2026 :

- l'agent est en service depuis le 11 octobre 2026 ;
- lors de la première exécution réelle, il a repéré 12 candidats, en a écarté 6 avec un motif, et 10 messages ont été programmés pour le lundi suivant ;
- ma relecture a fait apparaître deux défauts de lecture de certains sites, corrigés le soir même ;
- le coût mesuré est d'environ 0,15 $ par contact étudié.

## Ce qui reste à prouver

Les résultats commerciaux. Il est trop tôt pour les mesurer : un premier bilan est prévu après une quarantaine de contacts.

## Et chez vous ?

Le même principe s'applique à toute tâche qui consiste à repérer, qualifier et préparer une première prise de contact : la prospection de nouveaux clients, la réponse à des appels d'offres, la préparation de relances. Avec la même règle : l'outil prépare, un humain décide.
