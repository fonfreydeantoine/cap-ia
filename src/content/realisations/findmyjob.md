---
titre: "Trier les offres d'emploi chaque matin, sans jamais postuler à sa place"
outil: "FindMyJob et son assistant Jobby'z"
etiquette: "Pour deux amies"
ordre: 2
phare: false
resume: "Chaque jour ouvré, l'outil collecte les offres, écarte le bruit, note chaque offre selon le profil réel et prépare les candidatures. Un assistant conversationnel accompagne la recherche. La personne décide et envoie elle-même."
besoin: "Deux amies en recherche d'emploi, noyées sous des offres hors sujet et des doublons, qui passaient un temps considérable à adapter chaque lettre."
outils:
  - "API France Travail et Adzuna (sources d'offres autorisées)"
  - "API Claude d'Anthropic (analyse des offres, rédaction, assistant conversationnel)"
  - "Next.js (interface), Supabase hébergé à Paris (base de données)"
  - "GitHub Actions (tâche quotidienne), Brevo (mails), Vercel (hébergement)"
flux:
  - titre: "Collecte du matin"
    detail: "Les nouvelles offres des sources autorisées, autour de la ville visée et en télétravail."
    type: entree
  - titre: "Tri et notation"
    detail: "Doublons, stages et alternances écartés, puis analyse et note sur quatre critères fixes."
    type: outil
  - titre: "Candidatures préparées"
    detail: "Une lettre pour chaque offre retenue, un CV d'une page adapté à la demande."
    type: outil
  - titre: "Relecture et décision"
    detail: "Elle lit, retouche si besoin, marque son intérêt et envoie elle-même."
    type: humain
  - titre: "Mail du matin et assistant"
    detail: "Les nouveautés, une action conseillée pour la journée, et Jobby'z pour en parler."
    type: sortie
miseAJour: 2026-10-15
seoTitre: "Agent IA de recherche d'emploi avec assistant intégré : étude de cas"
seoDescription: "Un outil qui collecte, trie et note les offres d'emploi, prépare les candidatures et intègre un assistant conversationnel, sans jamais postuler à la place de l'utilisatrice."
---

## Le contexte

Deux amies cherchaient un emploi, chacune dans son domaine et sa région. Leur quotidien : faire défiler des dizaines d'offres hors sujet, retrouver la même annonce publiée par plusieurs intermédiaires, puis réécrire une lettre pour chaque candidature. J'ai construit pour chacune une version de FindMyJob, avec leur accord pour la présenter ici, sans aucune information personnelle.

## La démarche

1. **Une fiche de profil unique par personne, seule source de vérité.** L'outil ne peut mobiliser que ce qui y figure : il n'invente jamais une expérience, une compétence ou une date.
2. **Des sources autorisées uniquement.** Les grands sites d'emploi interdisent la lecture automatique de leurs pages : l'outil passe par des sources qui l'autorisent.
3. **Un tri gratuit avant l'IA.** Un premier filtre, sans IA, écarte les offres hors du domaine : l'IA ne lit que ce qui mérite de l'être, ce qui tient le budget autour de 20 € par mois et par personne.
4. **Une notation stable** sur quatre critères fixes, identiques pour les deux, avec un seuil de qualification.
5. **Une règle intangible : l'outil prépare, il ne postule jamais.**

## Ce que fait l'outil

- Chaque jour ouvré, il collecte les nouvelles offres, écarte les doublons, les stages et les alternances, analyse l'adéquation avec le profil et note chaque offre.
- Pour les offres retenues, il prépare une lettre et, à la demande, un CV d'une page adapté à l'offre, en Word modifiable.
- Une lettre peut être retouchée par une simple consigne. La retouche change le style, jamais les faits : une demande d'ajouter un fait absent du profil est signalée et ignorée.
- Un mail du matin résume les nouveautés et propose une seule action pour la journée.

## Jobby'z, l'assistant intégré

Jobby'z est un assistant conversationnel présent dans l'interface. Il connaît le profil de l'utilisatrice et l'état réel de sa recherche : les offres notées, les candidatures envoyées, le rythme des dernières semaines. Il peut relire un CV ou une lettre qu'on lui confie, chercher des événements professionnels près de chez elle et proposer des pistes. Il garde en mémoire ce qui s'est dit d'une conversation à l'autre, et il ne parle que de ce qu'il sait : il n'affirme rien sur une offre ou une démarche qui ne figure pas dans ses données.

## Le résultat

- Deux versions en production, qui tournent chaque jour ouvré.
- L'assistant Jobby'z est en service depuis le 23 septembre 2026.
- À sa mise en place, le regroupement des offres en double a retiré 74 annonces redondantes pour l'une et 320 pour l'autre.

## Ce qui reste à prouver

L'effet sur le nombre d'entretiens obtenus, qui n'est pas mesuré.

## Et chez vous ?

Veiller sur des appels d'offres, trier des candidatures reçues, qualifier des demandes entrantes, ou mettre à disposition de votre équipe un assistant qui connaît vos dossiers : le principe est le même. Une source de vérité, un tri sobre, une préparation soignée, et la décision reste humaine.
