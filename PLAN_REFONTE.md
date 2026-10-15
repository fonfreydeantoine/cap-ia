# Plan de refonte du site Cap IA (cap-ia.pro)

Document de travail pour Antoine Fonfreyde. Rédigé le 15 octobre 2026.
Statut : **plan validé le 15 octobre 2026, Antoine a laissé la réalisation en autonomie**. Avancement ci-dessous.

## Avancement (15 octobre 2026)

| Étape | État |
|---|---|
| 0. Sécurisation | **Fait.** Dépôt cloné dans `C:\Users\AntoineFonfreydelLib\Projets\cap-ia`, contenu vérifié identique à l'origine, étiquette `site-v1` poussée sur GitHub, branche `refonte`. L'ancien dossier `Cap-IA` du OneDrive reste en place jusqu'à l'accord d'Antoine pour le supprimer |
| 1. Message et contenus | **Fait.** Tous les textes rédigés (accueil, 3 offres, 3 réalisations, à propos, rendez-vous, pages légales) |
| 2. Identité visuelle | **Fait.** Logo « repère de cap », palette, favicon, icônes, images de partage. **Écart avec la section 5** : la police de texte est Public Sans et non Atkinson Hyperlegible Next, dont le zéro barré (« 5θθ € », « 2θ26 ») gênait la lecture des prix et des dates |
| 3. Développement | **Fait.** Astro 7, sortie statique, 15 pages, aucun cookie, une seule feuille de script de 2 Ko |
| 4. Réalisations | **Fait**, avec les faits datés des dossiers projets (agent Orée au 11 octobre 2026, à mettre à jour) |
| 5. Rendez-vous, formulaire, légal | **Fait en mode transitoire** : demande de créneau par formulaire (Formspree) en attendant le compte de l'outil de réservation, qu'Antoine doit créer à son nom. Mesure d'audience prête, à activer dans Cloudflare |
| 6. Recette | **Fait.** Lighthouse mobile : 99 à 100 en performance, 100 en accessibilité, bonnes pratiques et SEO ; pages de 100 à 126 Ko ; contrôles automatiques au build ; vérifié sur ordinateur et téléphone |
| 7. Mise en ligne | **En attente du feu vert d'Antoine** (fusion de `refonte` dans `main`). Aperçu officiel, construit par Workers Builds sur le vrai Worker : https://refonte-cap-ia.fonfreyde-antoine.workers.dev |
| 8. Migration d'identité | À faire après la mise en ligne |

**Ce qui reste à faire par Antoine** (aucune de ces actions ne bloque la mise en ligne, sauf la première) :

1. Donner le feu vert à la mise en ligne.
2. Tester une fois le formulaire de `/rendez-vous` (sur l'aperçu ou après mise en ligne) : l'envoi réel n'a pas été testé, pour ne pas t'envoyer de faux message.
3. Dans le tableau de bord Cloudflare du compte qui héberge cap-ia.pro : créer `www.cap-ia.pro` avec une redirection vers `cap-ia.pro`, activer « Always Use HTTPS », activer Web Analytics et transmettre le jeton.
4. Ajouter un enregistrement DMARC pour `cap-ia.pro` (par exemple `v=DMARC1; p=none; rua=mailto:antoine@cap-ia.pro`, à durcir ensuite).
5. Créer le compte de prise de rendez-vous à ton nom (meetergo recommandé) et transmettre l'adresse de ta page de réservation.
6. Mettre à jour les chiffres de l'agent Orée (résultats au-delà du 11 octobre 2026).
7. Retirer `portfolio-liberty.png` de Malt et ne plus diffuser l'ancienne plaquette.
8. Déplacer les documents de Cap IA hors du OneDrive de l'employeur, puis autoriser la suppression de l'ancien dossier `Cap-IA`.

Hébergement réel constaté pendant l'étape 0 : le site n'est pas sur Cloudflare Pages mais sur **Cloudflare Workers** (Worker `cap-ia`, compte Cloudflare distinct de celui de l'agent Orée), relié au dépôt GitHub par Workers Builds. Le dossier `dist/` est donc versionné et `wrangler.jsonc` indique de servir `./dist` (voir README.md).

Conventions du document :
- `[À FOURNIR : ...]` : donnée qu'Antoine doit fournir (tarif, accord, photo). Jamais remplacée par une invention.
- `[À CONFIRMER : ...]` : fait trouvé dans les fichiers, à reconfirmer avant publication.
- Gravité des constats : **Bloquant** (à corriger avant toute autre chose), **Important** (dégrade nettement la crédibilité ou la conversion), **Mineur** (finition).

---

## Sommaire

0. Ce que j'ai lu et vérifié
1. Synthèse de l'audit : 5 problèmes majeurs et ce qu'il faut conserver
2. Enseignements de la veille marché, appliqués à Cap IA
3. Stratégie de message
4. Architecture du site et parcours
5. Direction créative
6. Réalisations à publier, format mini cas
7. Choix techniques
8. Checklist de migration d'identité
9. Découpage en étapes livrables
10. Risques et points de vigilance
11. Questions à trancher (dans l'ordre)
12. Grille tarifaire (validée)
Annexe A : audit détaillé, constat par constat
Annexe B : sources de la veille
Annexe C : feuille de route type d'un audit IA

---

## 0. Ce que j'ai lu et vérifié

- **Code du site** : dépôt `Cap-IA/` (GitHub `fonfreydeantoine/cap-ia`, branche `main`, propre, à jour avec l'origine). 7 pages HTML, `i18n.js`, `translations.json`, `sitemap.xml`. Le site en ligne est identique au dépôt (même poids d'octets sur la page d'accueil).
- **Site en ligne** : cap-ia.pro consulté en desktop et en mobile (375 px), en-têtes HTTP, statut de chaque URL, mesures dans le navigateur (structure des titres, poids, ressources, contrastes).
- **Hébergement identifié** : Cloudflare Pages (en-têtes `Server: cloudflare`, mentions légales). Une branche distante `cloudflare/workers-autoconfig` existe : Cloudflare propose une migration vers Workers, sans incidence pour un site statique.
- **Messagerie du domaine** : Zoho Mail (serveurs `mx.zoho.eu`), SPF présent, **aucun enregistrement DMARC**.
- **Fichiers fournis** : charte (`Annexes/charte-cap-ia.md`), bannière LinkedIn, plaquette PDF, facture DataBird, dossier de formation BeAPI et GemAPI, dossier Primo, `new projects/` (agent_oree.md, OREE.md, FindMyJob.md, tizy.md), et les résumés du dossier local `Projets/` (Popote, Foulée, HELIO, Cap orientation, Luma, Aura Académie, Carte mystère, Ylem).
- **Veille** : sites d'agences et de consultants IA français et étrangers, offres de formation IA pour TPE et PME, outils de prise de rendez-vous, cadre CNIL (mesure d'audience, prospection), jurisprudence Google Fonts. Sources en annexe B.

---

## 1. Synthèse de l'audit

L'audit détaillé (30 constats, avec gravité) est en annexe A. Voici ce qui compte.

### Les 5 problèmes majeurs

**1. La preuve centrale du site est un outil interne de l'employeur d'Antoine (Bloquant).**
ROB, présenté avec le nom « Liberty Incentives & Congresses », le pôle concerné et des chiffres (« 30 à 45 minutes ramenées à moins d'une minute »), occupe le hero, la page Réalisations, l'offre principale, la page Diagnostic et la plaquette PDF. C'est exactement ce que le brief exclut (une seule phrase, sans chiffres, sans détails internes) et c'est un risque contractuel (confidentialité, loyauté envers l'employeur). À l'inverse, les vraies missions Cap IA (formation BeAPI pour DataBird) n'apparaissent **nulle part** sur le site.

**2. Le message parle de technique et de « je », pas du problème du dirigeant (Important).**
Titre : « Je conçois des systèmes IA concrets, déployés et utilisés ». Sous-titre et cartes : agents, systèmes, SaaS, PWA, Cloudflare Workers, API. Le positionnement a dérivé vers « concepteur d'agents IA » (la plaquette dit « L'IA n'assiste plus. Elle produit. ») alors que l'activité déclarée est le conseil et la formation pour des non-techniciens. Un gérant de TPE ne se reconnaît dans aucune phrase des dix premières secondes.

**3. Le parcours de conversion est éclaté et ne mène à aucun rendez-vous (Important).**
On compte au moins sept actions concurrentes : « Découvrir mon approche », « Voir mes réalisations », « Diagnostic gratuit », « Faire mon diagnostic gratuit », « Parlons-en », formulaire de contact, lien mailto. Aucune ne permet de réserver un créneau. Le questionnaire « Diagnostic » promet une analyse personnalisée sous 48 h, une charge manuelle difficile à tenir avec un emploi à temps plein.

**4. Les réalisations sont un catalogue, pas une démonstration (Important).**
Six projets juxtaposés (agent métier, compagnons de mariage et de préconception, orientation, SaaS RSE, coach de course, recettes), chacun en trois lignes, sans le besoin de départ, la démarche ni ce que cela change pour une entreprise. Certains thèmes sont intimes (préconception) ou sans lien visible avec une TPE. L'effet perçu est « passionné qui bricole », alors que la vraie force d'Antoine (partir d'un besoin flou pour livrer un outil qui tourne, avec des garde-fous) n'est jamais racontée.

**5. L'exécution technique et graphique fait amateur (Important).**
Thème sombre aux contrastes insuffisants (plusieurs textes entre 2:1 et 3,5:1, le minimum légal d'accessibilité est 4,5:1), styles écrits en ligne, CSS mort (« ancien, conservé pour fallback »), photo intégrée en base64 qui fait peser la page d'accueil 255 Ko, quatre versions différentes du logo (site, bannière, plaquette, facture), carte « Formation » volontairement grisée qui paraît désactivée, outil interne `audit.html` accessible publiquement avec son mot de passe lisible dans le code source, `www.cap-ia.pro` qui ne répond pas, HTTP non redirigé vers HTTPS, sitemap limité à une URL, pas de `robots.txt`.

### Ce qu'il faut conserver

- **L'honnêteté du ton** : pas de faux témoignages, pas de logos empruntés, un commentaire dans le code dit « ne rien inventer ». C'est un actif rare dans ce marché (voir veille) : on le garde et on en fait un argument.
- **L'intuition chromatique** : une couleur chaude, terre et ocre, plutôt que le bleu technologique. On garde l'esprit, pas le fond noir.
- **Le nom et la métaphore du cap** (direction, route, relèvement) : elle n'est pas exploitée aujourd'hui, elle peut structurer toute l'identité.
- **Les pages légales** : mentions complètes (SIREN, adresse, médiateur CM2C, hébergeur), politique de confidentialité claire. À ajuster, pas à réécrire.
- **L'idée des familles de tâches automatisables** (traitement entrant, production, coordination) : utile pour que le visiteur se reconnaisse, à reformuler en langage de dirigeant et sans interaction au survol.
- **La mention « 30 minutes offertes »** : on la transforme en appel découverte réservable.
- **Cloudflare Pages, Formspree, la vérification Google Search Console** : infrastructure gratuite, rapide, déjà en place.

---

## 2. Enseignements de la veille marché, appliqués à Cap IA

### Ce que fait le marché aujourd'hui

- **L'appel découverte de 30 minutes gratuit est devenu la norme** (NocodeFactory, Nooralto, Oakflow AI, ia-par-metier, AI Elevation). Ce n'est plus un argument en soi : la différence se joue sur ce qui le précède (la preuve) et ce qu'on promet d'en sortir.
- **L'automatisation est banalisée.** Des dizaines d'agences affichent Make, n8n, « agents IA », « +350 projets ». Les fourchettes publiques vont de 150 à 890 € par flux (Oakflow AI) à « quelques milliers d'euros » par projet (NocodeFactory). Se vendre sur l'outil (n8n, Make, API) place Cap IA dans une comparaison où une micro-entreprise de six mois perd.
- **Les meilleures pages montrent une méthode en étapes avec un livrable par étape** (NocodeFactory en 4 étapes, Nooralto en 5, Promptful qui sépare l'audit payant de la construction).
- **Les engagements explicites rassurent plus que les chiffres** : Nooralto écrit qu'il ne promet pas de gain chiffré, prévoit une validation humaine pour les décisions qui engagent le client et laisse les accès au nom du client. C'est la page la plus crédible du panel, alors qu'elle n'a presque aucune preuve.
- **Les études de cas efficaces suivent la même trame** : problème, démarche, outils, architecture, résultat, avec anonymisation acceptée.
- **Les prix « à partir de » réduisent la friction** pour les petites structures (AI Elevation : forfait dès 300 £ après un premier échange gratuit ; consultants Malt avec TJM affiché, par exemple 800 € par jour). Les grilles de formation intra publiées tournent autour de 1 000 € HT la demi-journée pour un groupe (une grille relevée, à prendre comme ordre de grandeur, pas comme référence).
- **Côté formation, les concurrents mettent en avant Qualiopi et le financement OPCO.** Cap IA n'est pas certifié : il faudra le dire clairement plutôt que de laisser croire le contraire.

### Le bruit à éviter (relevé chez les concurrents)

- Statistiques sans source : « 98 % de satisfaction », « ROI ×3 », « 0 erreur », « 100 % à temps ».
- Faux formulaires d'« analyse IA » qui concluent toujours « excellent candidat » (Oakflow AI).
- Une douzaine de libellés de boutons différents sur une même page (NocodeFactory, Oakflow AI).
- Murs de logos sans résultat associé, comparatifs biaisés contre « les agences classiques ».
- Jargon dans le hero (n8n, LLM, stack), slogans du type « la prochaine révolution ».
- Pages de contenu SEO hors sujet pour gonfler le maillage.

### Ce que j'en retiens pour Cap IA

1. **Ne pas se battre sur l'outil, se battre sur la démarche.** Le seul terrain où Cap IA est plus fort que les agences : une personne qui comprend votre métier, explique sans jargon, construit elle-même et montre honnêtement comment elle s'y prend, limites comprises.
2. **Faire de l'honnêteté une preuve.** Pas de chiffre non établi, des résultats datés, une ligne « ce qui reste à prouver » dans chaque cas. Dans un marché saturé de promesses, c'est ce qui se remarque.
3. **Un seul bouton, un seul libellé, partout.** Les visiteurs pas encore prêts ont un chemin secondaire (lire un cas), sous forme de lien, pas de bouton concurrent.
4. **Des prix « à partir de » sur l'audit et la formation**, parce que la cible TPE a besoin de savoir dans quel ordre de grandeur elle se situe avant d'appeler.
5. **Des engagements écrits** (validation humaine, accès à votre nom, documentation remise, pas de promesse chiffrée) : ils coûtent peu et rassurent beaucoup.
6. **Mieux que les concurrents** : chaque cas montre un schéma du flux réel (qui fait quoi, où l'humain valide), ce que presque personne ne fait.

---

## 3. Stratégie de message

### Cible

- **Cœur de cible** : dirigeants et indépendants de TPE et petites PME (1 à 50 personnes), tous secteurs, non techniciens, qui ont entendu parler de l'IA, ont parfois essayé ChatGPT, et sentent qu'ils perdent du temps sur des tâches répétitives sans savoir par où commencer.
- **Cible secondaire** : responsables d'équipe ou RH de PME qui cherchent une formation concrète, et organismes de formation qui cherchent un formateur IA.
- **Ce que la cible craint** : se faire vendre un gadget, ne rien comprendre, voir ses données partir n'importe où, dépendre d'un prestataire, payer un projet qui ne sert jamais.

### Promesse

Formulation de travail (à valider en étape 1) :

> **Titre :** « L'IA au service de votre quotidien, pas l'inverse. »
> **Sous-titre :** « Je vous aide à repérer ce que l'IA peut vraiment faire pour votre entreprise, à mettre en place les bons outils et à former vos équipes. Sans jargon, à partir de votre façon de travailler. »
> **Bouton :** « Réserver un appel découverte »
> **Sous le bouton :** « 30 minutes, gratuit et sans engagement. »

Alternative plus directe sur la différence (ma préférée si le visiteur arrive par une réalisation ou un profil Malt) :

> « Vous savez ce qui vous fait perdre du temps. Je vous aide à en faire un outil qui tourne. »

Je recommande la première pour l'accueil (plus large, rassurante) et la seconde comme titre de la page Réalisations.

### Preuves, par ordre de force

Décision d'Antoine (15 octobre 2026) : **aucune mission de formation n'est citée nommément** (ni BeAPI ni DataBird). Selon lui, afficher une formation précise produit l'effet inverse (« regardez, j'en ai fait une ») et personne n'a à connaître le nombre de formations déjà données. La preuve repose donc sur ce qui est construit et sur la méthode.

1. **Réalisation phare** : l'agent de prospection d'Orée, en service depuis le 11 octobre 2026. Preuve de la capacité à mener un projet complet, avec garde-fous.
2. **Mini cas** : FindMyJob (deux amies en recherche d'emploi, avec un assistant conversationnel intégré) et Popote (un foyer). Preuve que la méthode s'applique à des besoins très différents et que les outils sont réellement utilisés.
3. **Le dispositif de formation**, décrit comme une méthode et non comme une référence : chaque participant repart avec un assistant configuré pour son propre poste. Il figure sur la page Formation, sans nom de client ni volume.
4. **Une phrase sur l'expérience salariée** (page À propos uniquement) : « AI Manager dans le tourisme d'affaires, j'automatise des tâches opérationnelles au quotidien. » Proposition complémentaire, sans chiffre ni client : « J'anime aussi des formations à l'IA pour des équipes en entreprise. » `[À VALIDER par Antoine]`
5. **Engagements écrits** (voir section 4) et **transparence des prix**.

### Ordre d'argumentation (la page d'accueil suit cet ordre)

1. **Vous** : ce que vous vivez (mails qui s'accumulent, devis recopiés, ChatGPT essayé sans suite, équipe qui ne sait pas quoi en faire).
2. **Ce que je fais** : trois offres claires, avec un prix d'entrée.
3. **Comment je travaille** : quatre étapes, un livrable à chaque étape, des engagements.
4. **La preuve** : la réalisation phare et deux mini cas.
5. **Qui je suis** : visage, parcours court, la phrase sur l'expérience salariée.
6. **Les questions qu'on se pose** : données, coût, financement, et si ça ne marche pas.
7. **Le rendez-vous.**

### Ton

- **Vouvoiement** confirmé : la cible est un dirigeant qu'on ne connaît pas, et les concurrents crédibles vouvoient. Le tutoiement reste possible en formation (il l'était dans GemAPI).
- **« Je » plutôt que « nous »** : Cap IA est Antoine, le dire est plus honnête et c'est l'argument « accompagnement humain ». Le formulaire de cadrage actuel dit « nous » : à harmoniser.
- Phrases courtes, verbes concrets, un terme technique seulement s'il est expliqué dans la même phrase. Aucun tiret cadratin ni demi-cadratin (vérification automatique au build, voir section 7).

---

## 4. Architecture du site et parcours

### Plan du site

| URL | Rôle | Contenu clé |
|---|---|---|
| `/` | Convaincre en 60 secondes et amener au rendez-vous | Hero, situations vécues, 3 offres, méthode, preuves, portrait, FAQ courte, appel final |
| `/offres` | Comparer les 3 offres | Tableau simple : pour qui, ce que vous obtenez, durée, prix d'entrée |
| `/offres/audit-ia` | Page d'offre | Déroulé, livrable (cartographie et feuille de route), prix, FAQ propre à l'offre |
| `/offres/formation-ia` | Page d'offre | Formats (demi-journée, journée, sur mesure), contenu type, le dispositif « un assistant configuré par poste » expliqué pas à pas, prix, position sur Qualiopi |
| `/offres/accompagnement` | Page d'offre | Sélection et mise en place des outils, automatisations sur mesure, suivi mensuel, prix |
| `/realisations` | Prouver la démarche | Réalisation phare, deux mini cas, transposition à votre entreprise |
| `/realisations/[cas]` | Un mini cas par page | Format décrit en section 6 |
| `/a-propos` | Incarner | Portrait, parcours, pourquoi Cap IA, la phrase sur l'expérience salariée, engagements |
| `/rendez-vous` | Convertir | Calendrier intégré, ce qui se passe pendant l'appel, formulaire de secours |
| `/merci` | Confirmer | Accusé de réception du formulaire, prochaine étape |
| `/mentions-legales`, `/confidentialite` | Conformité | Mises à jour (voir section 7) |
| `404` | Récupérer | Message simple, lien vers l'accueil et le rendez-vous |

Navigation principale : **Offres · Réalisations · À propos** + bouton **Réserver un appel découverte**. Pied de page : coordonnées, LinkedIn, Malt, pages légales.

**Évolutivité exigée par le brief** : chaque offre et chaque cas est un fichier de contenu (Markdown avec en-tête structuré). Ajouter une offre ou un cas revient à ajouter un fichier : la page, la carte sur l'accueil, le menu, le sitemap et les données structurées se génèrent seuls. Aucune refonte nécessaire.

### Le parcours vers l'appel découverte

- **Un seul bouton**, même libellé, même style, sur toutes les pages : en-tête (toujours visible), fin de hero, fin de chaque offre, fin de chaque cas, bas de page. Il mène à `/rendez-vous`.
- **Chemin secondaire** pour qui n'est pas prêt : liens texte « Voir comment je travaille » et « Lire le cas complet ». Pas de second bouton.
- **Page `/rendez-vous`** : en haut, le calendrier (créneaux réels) ; à côté, « Ce qui se passe pendant ces 30 minutes » (vous décrivez votre activité, je pose des questions, je vous dis franchement ce qui me paraît faisable ou pas, vous repartez avec une ou deux pistes, même si on ne travaille pas ensemble). En dessous : « Vous préférez écrire ? » et le formulaire de secours (nom, email, entreprise, message, case de consentement).
- **Questions posées à la réservation** (minimum utile, pas plus) : nom, email, entreprise, taille (seul, 2 à 10, 11 à 50, plus de 50), et une question facultative « Qu'est-ce qui vous prend le plus de temps aujourd'hui ? ». Elle remplace le questionnaire Diagnostic.
- **Engagements affichés** sur la page rendez-vous et dans les offres (à valider par Antoine, chacun doit être vrai) :
  - Pas de promesse de gain chiffré avant d'avoir regardé votre situation.
  - Un humain valide toujours ce qui engage votre entreprise (envoi, devis, décision).
  - Les comptes et accès sont créés à votre nom, vous restez propriétaire.
  - Chaque outil livré est documenté pour que vous ne dépendiez pas de moi.
  - Si l'IA n'est pas la bonne réponse à votre problème, je vous le dis.

### Ce qui est supprimé, et pourquoi

| Élément | Décision | Raison |
|---|---|---|
| ROB, Liberty, chiffres associés (hero, réalisations, offre, diagnostic) | Supprimé partout | Brief (une seule phrase), risque contractuel |
| Page `/diagnostic` (questionnaire 5 questions) | Supprimée, redirection 301 vers `/rendez-vous` | Concurrence le rendez-vous, charge de réponse manuelle sous 48 h, liste de secteurs biaisée vers le tourisme |
| Page `/audit` (guide d'entretien, ambassadeurs) | Retirée du site public | Outil interne, mot de passe lisible dans le code, indexable. À héberger à part derrière Cloudflare Access si encore utile |
| `/capIA_formulaire_cadrage` | Retiré du site public | Document client envoyé après l'appel, pas une page vitrine. À héberger à part, non indexé |
| Version anglaise | Supprimée au lancement (validé par Antoine le 15 octobre 2026) | Cible française, traduction faite en JavaScript donc invisible pour Google, double maintenance. L'architecture reste prête pour une version anglaise plus tard |
| Section Primo | Supprimée | Doublon avec l'agent Orée (deux agents de prospection). Un cas fort vaut mieux que deux cas proches |
| Cartes Orée et Luma, Cap orientation, HELIO, Foulée | Retirées de la vitrine | Voir section 6 : sélection, pas catalogue |
| Badges « Opérationnel » qui clignotent, animations d'apparition, cartes au survol | Supprimés | Gadgets qui retardent l'affichage et gênent l'accessibilité |
| Liens mailto multiples | Un seul email, en pied de page et sur `/rendez-vous` | Un seul canal principal |

---

## 5. Direction créative

### Direction recommandée : « Relevé de cap »

**Idée.** Cap IA aide une entreprise à choisir une direction et à s'y tenir. L'identité emprunte au vocabulaire de la navigation et de la cartographie (relevé, tracé, repère, route) plutôt qu'à celui de la technologie. Le résultat doit évoquer un carnet de bord soigné ou un cabinet de conseil indépendant, pas une start-up ni une agence de communication. Cela répond directement aux trois objectifs : **moderne** (épuré, typographie actuelle), **clair** (fond clair, lecture facile), **crédible** (sobre, aucun effet).

**Palette** (contrastes calculés sur le fond papier, tous conformes WCAG AA pour l'usage indiqué)

| Rôle | Nom | Valeur | Usage |
|---|---|---|---|
| Fond | Papier | `#F7F4EE` | Fond général, chaud sans être crème jaunie |
| Surface | Blanc | `#FFFFFF` | Cartes, encadrés de cas |
| Texte principal | Encre | `#1B1F24` | Titres et corps (contraste environ 15:1) |
| Texte secondaire | Encre douce | `#4A5059` | Légendes, métadonnées (environ 7:1) |
| Accent | Terre cuite | `#B4532A` | Bouton (texte blanc, environ 5:1), repères graphiques |
| Accent texte | Terre cuite foncée | `#9A4220` | Liens dans le texte (environ 6:1) |
| Tracé | Ardoise | `#2F4A5C` | Lignes des schémas de flux, une seule teinte froide en contrepoint |
| Filet | Sable | `#DDD6CB` | Bordures, séparateurs |

Justification : on garde la chaleur de l'ocre actuel, mais assombri en terre cuite pour atteindre les contrastes légaux sur fond clair. Le fond clair est plus lisible pour des textes longs (les cas) et plus rassurant pour un dirigeant non technicien ; le noir intégral est aujourd'hui le code visuel des outils de développeurs et des projets crypto. L'ardoise donne une seconde couleur aux schémas sans tomber dans le « fond bleu technologique ».

**Typographie** (deux familles, auto-hébergées, licences libres)

- **Titres : Newsreader** (serif éditoriale à tailles optiques, dessinée pour l'écran). Elle garde le caractère « humain et posé » que cherchait EB Garamond, avec une bien meilleure tenue en gras et en petite taille. EB Garamond évoque le faire-part et la littérature classique ; Newsreader évoque la presse de qualité, ce qui correspond mieux à « conseil indépendant ».
- **Texte et interface : Public Sans** (sans serif conçue pour les services numériques publics américains, très lisible et neutre). Choix initial : Atkinson Hyperlegible Next, abandonné à l'intégration car son zéro barré rendait les prix et les dates peu élégants (« 5θθ € »). Public Sans garde la lisibilité et le ton sobre, avec des chiffres classiques.
- Corps de texte à 18 px sur ordinateur, 17 px sur mobile, interligne 1,6, lignes de 65 à 75 caractères. Les étiquettes en capitales espacées de 10 px du site actuel disparaissent.

**Logo**

- Constat : quatre versions coexistent (texte seul sur le site, cercle et flèche sur la bannière, losange orange sur la plaquette, cercle et flèche soulignés sur la facture). Le cercle avec flèche ressemble à l'icône d'une application de navigation ou au bouton « envoyer ».
- Proposition : un **logotype** « Cap IA » en Newsreader, avec un **repère de cap** comme seul signe graphique : un petit triangle de relèvement (la marque d'un azimut sur une carte), placé au-dessus ou à côté du A. Le repère seul sert de favicon et d'avatar. Trois esquisses seront présentées en étape 2, une seule sera retenue et déclinée (clair, foncé, monochrome, favicon, avatar carré).

**Style visuel**

- **Pas de photo de stock, pas d'illustration générée.** Deux types d'images seulement :
  1. **Un portrait d'Antoine.** C'est la seule image qui porte la promesse d'accompagnement humain. Décision du 15 octobre 2026 : on réutilise la photo actuelle (`Photo_pro.JPG`, droits confirmés par Antoine). Le fichier fait 928 × 1120 px : le portrait sera affiché à 460 px de large au plus, pour rester net sur les écrans haute définition. Des photos en situation (formation, atelier) pourront s'ajouter plus tard.
  2. **Des schémas de flux dessinés pour chaque cas** (traits fins ardoise, repères terre cuite) : d'où vient l'information, ce que fait l'outil, où l'humain valide, ce qui sort. Ils montrent la démarche, c'est-à-dire ce qui est vendu.
- **Captures d'écran réelles** des outils, nettoyées (noms de prospects et données personnelles floutés ou remplacés par des données fictives clairement signalées).
- Iconographie minimale, au trait, uniquement si elle aide à lire (étapes de méthode).

**Principes de mise en page**

- Grille simple à 12 colonnes, contenu centré, largeur de lecture limitée, beaucoup d'air.
- Une idée par section, un titre qui dit l'idée (pas « Nos services » mais « Trois façons de travailler ensemble »).
- Hiérarchie par la taille et la graisse, pas par la couleur. La terre cuite est réservée au bouton et à de rares repères.
- Aucune ombre portée, aucun dégradé, aucune animation d'apparition. Seules transitions : survol et focus des liens et du bouton.
- Le bouton d'appel est la seule surface pleine de couleur de la page.
- Mobile conçu en premier : le bouton est visible sans défiler sur la page d'accueil.

### Alternative B : « Atelier » (brève)

Fond blanc pur, une seule famille sans serif géométrique, accent vert sauge, illustrations au trait. Plus neutre et « produit numérique ». Inconvénient : ressemble aux sites d'agences no-code du panel, perd le caractère humain et éditorial qui différencie Cap IA.

### Alternative C : « Sombre affiné » (brève)

On garde le charbon et l'ocre actuels en corrigeant contrastes, typographie et logo. Avantage : continuité avec la bannière et les supports existants, migration plus rapide. Inconvénients : le fond noir reste associé à la technique, il fatigue sur des cas longs, et il entretient le souvenir du site « amateur sympa ». La marque n'a que six mois : c'est le bon moment pour changer.

**Recommandation tranchée : direction A.** Elle est la seule qui sert les trois objectifs à la fois, et la métaphore du cap donne une cohérence durable à tous les supports.

---

## 6. Réalisations à publier, format mini cas

### Sélection

| Projet | Retenu | Pourquoi |
|---|---|---|
| **Agent de prospection d'Orée** | **Oui, réalisation phare** | Le projet le plus complet et le plus transposable (repérer, qualifier, rédiger, suivre), en service réel, avec des garde-fous démontrables. Présenté honnêtement comme conçu pour le propre produit d'Antoine |
| Formation BeAPI pour DataBird | **Non (décision d'Antoine)** | Pas de mission de formation citée. Le dispositif GemAPI (un assistant configuré par poste) est repris sur la page Formation, comme méthode, sans client |
| **FindMyJob** | **Oui, mini cas** | Besoin universel (trier beaucoup d'informations, préparer des documents), règle forte « l'humain décide toujours », assistant conversationnel intégré, deux instances en production. Accord des deux utilisatrices obtenu |
| **Popote** | **Oui, mini cas** | Outil simple utilisé chaque jour par deux personnes : prouve l'adoption réelle et la sobriété, transposable à toute planification récurrente |
| Primo | Non | Doublon avec l'agent Orée |
| Foulée | Non | Projet terminé (course du 13 septembre 2026), transposition plus faible |
| HELIO | Non | Produit non commercialisé, risque de laisser croire à une expertise RSE |
| Cap (orientation) | Non | Confusion de nom avec Cap IA |
| Orée et Luma (produits) | Non | Le brief interdit la promotion d'Orée ; Luma touche à la santé intime |
| Tizy, Aura Académie, Carte mystère, Ylem | Non | Personnels ou ludiques, sans IA pour Tizy, aucun lien avec une TPE |
| ROB | Non | Outil de l'employeur, exclu par le brief |

Trois cas au lancement, pas un de plus. Un nouveau cas client s'ajoutera, ou remplacera un cas personnel, dès qu'il existe (et qu'Antoine souhaite le citer).

### Format d'un mini cas (gabarit unique)

1. **Titre orienté résultat** (pas le nom de l'outil) et **étiquette honnête** : « Mission client », « Projet pour mon propre produit », « Pour des proches », « Pour mon foyer ».
2. **Le besoin de départ**, en une phrase, tel qu'il a été exprimé.
3. **La démarche** : 3 à 5 étapes, avec les décisions et les garde-fous.
4. **Comment ça tourne aujourd'hui** : un schéma de flux et deux phrases.
5. **Les outils** : en mots simples, puis les noms techniques en petit.
6. **Le résultat** : faits datés uniquement.
7. **Ce qui reste à prouver** : une ligne honnête.
8. **Et chez vous ?** : la transposition à une entreprise (deux ou trois exemples).
9. Date de dernière mise à jour.

### Brouillons des trois cas (faits issus des fichiers, à reconfirmer)

**Cas 1 (phare). « Trouver des partenaires sans y passer ses soirées »** · Projet pour mon propre produit
- Contexte : Orée est mon produit, un compagnon émotionnel pour les personnes qui préparent leur mariage (lien discret vers monoree.fr). Pour le faire connaître, je cherche des wedding planners partenaires.
- Besoin : « Contacter chaque semaine quelques wedding planners pertinents, avec un message juste, en quelques minutes de mon temps. »
- Démarche : cahier des charges écrit, construction en sept phases avec un point de validation avant chaque étape sensible, tests sur un faux formulaire et une adresse de test avant tout envoi réel.
- Fonctionnement : chaque dimanche soir, l'agent repère jusqu'à 12 wedding planners dans trois régions, lit leur site en respectant les consignes d'exclusion des robots, ne retient que les faits qu'il peut citer mot pour mot, note le profil sur 100 et rédige un premier message, relu par un second modèle d'IA différent du premier. Je relis depuis mon téléphone. Les messages partent le lundi à 10 h sauf si je les modifie ou les annule. Une seule relance à 10 jours, clôture à 25 jours.
- Garde-fous : plafond de dépense de 20 € par mois, liste d'opposition (un refus ou un « stop » inscrit l'adresse, vérifiée avant chaque envoi, jamais de recontact), jamais deux planners de la même ville la même semaine, aucun envoi sans possibilité de relecture humaine. Les messages partent de ma propre boîte, signés de mon nom, à raison de quelques-uns par semaine : l'outil prépare, je reste l'expéditeur.
- Outils : Cloudflare Workers, D1 et Workflows ; API Claude (Anthropic) pour sept agents spécialisés ; API Gmail ; application mobile installable ; 168 tests automatisés.
- Résultat au 11 octobre 2026 `[À CONFIRMER et à mettre à jour avant publication]` : en service depuis le 11 octobre 2026 ; première exécution réelle : 12 candidats repérés, 6 écartés avec un motif, 10 messages programmés ; deux défauts de lecture de sites repérés grâce à ma relecture et corrigés le soir même ; coût mesuré d'environ 0,15 $ par contact étudié.
- Ce qui reste à prouver : les résultats commerciaux. Bilan prévu après 40 contacts.
- Et chez vous : repérer et qualifier des prospects, préparer des réponses à des appels d'offres, trier et préparer des relances clients.
- **Décision d'Antoine (15 octobre 2026)** : le cas ne parle pas des mentions de provenance et d'opposition dans les messages. Le site peut dire que l'agent dispose d'une liste d'opposition et d'un réglage pour ajouter ces mentions, mais **jamais que les messages les contiennent** tant que le réglage reste éteint.

**Cas 2. « Trier les offres d'emploi chaque matin sans jamais postuler à sa place »** · Pour deux amies
- Besoin : deux amies en recherche d'emploi, noyées sous des offres hors sujet et des doublons, qui passaient un temps fou à adapter chaque lettre.
- Démarche :
  - une fiche de profil unique par personne, seule source de vérité : l'outil n'invente jamais une expérience ou une compétence ;
  - des sources de données autorisées uniquement (les grands sites d'emploi interdisent la lecture automatique) ;
  - un pré-tri par domaine qui ne coûte rien, pour que l'IA ne lise que les offres pertinentes ;
  - une notation sur quatre critères fixes, identiques pour les deux ;
  - une règle intangible : l'outil prépare, il ne postule jamais.
- Fonctionnement :
  - chaque jour ouvré, l'outil collecte les offres, écarte les doublons, les stages et les alternances, analyse l'adéquation avec le profil et note chaque offre ;
  - pour les offres retenues, il prépare une lettre et, à la demande, un CV d'une page adapté à l'offre (Word modifiable) ; une lettre peut être retouchée par une simple consigne, qui change le style mais jamais les faits ;
  - un mail du matin résume les nouveautés et propose une seule action pour la journée ;
  - **Jobby'z, un assistant conversationnel intégré** à l'interface, connaît le profil et l'état réel de la recherche (offres notées, candidatures envoyées, rythme) ; il relit un CV ou une lettre, cherche des événements professionnels près de chez elle et garde en mémoire ce qui a été dit d'une conversation à l'autre ;
  - chacune relit, décide et envoie elle-même ses candidatures.
- Outils : API France Travail et Adzuna ; API Claude (Anthropic) pour l'analyse, la rédaction et l'assistant ; Next.js ; Supabase (hébergé à Paris) ; GitHub Actions pour la tâche quotidienne ; Brevo pour les mails ; Vercel. Budget d'IA visé : environ 20 € par mois et par personne.
- Résultat : deux instances en production depuis septembre 2026, utilisées chaque jour ouvré ; l'assistant est en service depuis le 23 septembre 2026 ; le dédoublonnage a retiré 74 et 320 offres en double lors de sa mise en place `[À CONFIRMER]`.
- Ce qui reste à prouver : l'effet sur le nombre d'entretiens obtenus, qui n'est pas mesuré.
- Et chez vous : veille d'appels d'offres, tri de candidatures reçues, qualification de demandes entrantes, assistant interne qui connaît vos dossiers.
- Accord des deux utilisatrices **obtenu le 15 octobre 2026**. Règles de publication : aucun prénom, aucun domaine professionnel visé, aucun lien vers leurs instances (leurs sites sont publics en lecture et contiennent leurs données), captures uniquement avec des données fictives.

**Cas 3. « Ne plus se demander ce qu'on mange cette semaine »** · Pour mon foyer
- Besoin : planifier des repas sans viande pour deux personnes et sortir de la liste de courses improvisée.
- Fonctionnement : base de recettes en grande partie générées par IA puis validées, recherche par ingrédient, module « Frigo » pour cuisiner avec ce qu'on a, sélection envoyée par email au jour choisi par chacun, liste de courses regroupée par rayon.
- Outils : Next.js, Supabase, API Claude, Brevo, application installable.
- Résultat : utilisée au quotidien par deux colocataires `[À CONFIRMER : toujours vrai à la publication]` ; 240 recettes en base au 20 août 2026 `[À CONFIRMER]`.
- Et chez vous : toute tâche « choisir, planifier, envoyer un récapitulatif » (planning d'équipe, commandes fournisseurs récurrentes).
- Accord du colocataire **obtenu le 15 octobre 2026**. Aucun nom publié, captures avec des données fictives.

---

## 7. Choix techniques

### Stack : Astro en sortie statique (recommandé)

- **Pourquoi pas du HTML écrit à la main** : le site passera d'environ 7 à 15 pages partageant en-tête, pied de page, bouton et gabarits. En HTML pur, chaque élément commun est dupliqué. Le site actuel montre déjà le symptôme : la page Diagnostic renvoie vers une ancre `/#rob` qui n'existe plus.
- **Pourquoi Astro** : il produit du HTML statique sans JavaScript par défaut (aucune perte de performance), il gère des composants réutilisables et des collections de contenu validées (offres, cas), ce qui répond directement à l'exigence « ajouter une offre sans refonte ». Il se déploie nativement sur Cloudflare Pages, et Cloudflare a intégré l'équipe d'Astro en janvier 2026, ce qui sécurise sa pérennité sur cet hébergeur.
- **Ce qu'on n'ajoute pas** : pas de framework d'interface (React, Vue), pas de Tailwind, pas de CMS. CSS simple organisé autour de variables (couleurs, espacements, typographie). Une dépendance de plus = une raison de plus de casser.
- Contrôle automatique au build : échec si un tiret cadratin ou demi-cadratin apparaît dans le contenu, si une image n'a pas de texte alternatif, si un lien interne est cassé.

### Prise de rendez-vous

Critères : intégration sur site statique, hébergement des données, coût, synchronisation avec l'agenda d'Antoine.

| Outil | Données | Coût | Intégration | Avis |
|---|---|---|---|---|
| **meetergo** | Serveurs en Allemagne (société allemande), contrat de sous-traitance | Plan gratuit annoncé avec intégration au site | Intégré dans la page, fenêtre ou lien | **Recommandé**, sous réserve de vérification |
| Zoho Bookings | Centre de données européen possible (le compte Zoho Mail d'Antoine est déjà en `.eu`) | Plan gratuit incertain selon les sources, payant dès environ 6 $ par mois | Lien et page de réservation, intégration à confirmer | Alternative si Antoine veut tout centraliser chez Zoho |
| Calendly gratuit | États-Unis, pas d'hébergement européen | Gratuit, un seul type de rendez-vous | Très simple | Repli acceptable, transfert hors UE à documenter |
| Cal.com | Plan gratuit hébergé aux États-Unis ; Cal.eu réservé aux grandes entreprises (50 utilisateurs minimum, liste d'attente) | Gratuit | Très bonne | Écarté pour l'hébergement |
| zcal | États-Unis | Gratuit | Bonne | Écarté pour l'hébergement |

**Recommandation : meetergo**, avec une vérification en étape 5 avant tout engagement (conditions réelles du plan gratuit, intégration incluse, mention de marque, synchronisation Google Agenda, contrat de sous-traitance). Les plans gratuits changent souvent : Cal.eu en est l'exemple.
**Intégration** : le calendrier est chargé **uniquement sur `/rendez-vous`**, jamais en fenêtre surgissante sur tout le site (performance et données). Si le script est bloqué, un lien direct vers la page de réservation prend le relais.
**Créneaux** (validés par Antoine le 15 octobre 2026) :
- Mardi et jeudi à 12 h 30 et 13 h 15 ; lundi et mercredi à 18 h et 18 h 45.
- Appels de 30 minutes, 15 minutes de battement après chaque appel, 4 appels par semaine au maximum.
- Réservation au plus tard 24 heures avant, au plus tôt 3 semaines avant ; lien de visio généré automatiquement.
- Formulaire de secours : « Réponse sous 2 jours ouvrés » (remplace « sous 48 h »).

### Formulaire de secours

Formspree, déjà en place et déclaré dans la politique de confidentialité. Ajouts : champ piège anti-robots, case de consentement non pré-cochée avec lien vers la politique, redirection vers `/merci`, objet du message explicite. Alternative européenne possible plus tard (Zoho Forms), non nécessaire au lancement.

### Hébergement

Cloudflare conservé (en réalité Cloudflare Workers, voir « Avancement » en tête de document). À régler :
- Créer `www.cap-ia.pro` et le rediriger vers `cap-ia.pro`.
- Forcer HTTPS (aujourd'hui `http://cap-ia.pro` répond sans redirection) et activer HSTS.
- Fichier `_headers` : en-têtes de sécurité (CSP stricte, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) et cache long sur les fichiers statiques.
- Fichier `_redirects` : `/diagnostic` vers `/rendez-vous` (301), anciennes URL `.html` vers les URL propres.
- Déploiements de prévisualisation par branche pour valider chaque étape sur une URL de test.
- **Dépôt local hors de OneDrive**, dans `Projets\cap-ia` (décidé, étape 0, voir risque 9).

### Mesure d'audience respectueuse de la vie privée

- **Cloudflare Web Analytics** : gratuit, déjà chez le même hébergeur, sans cookie ni stockage local. Il n'y a donc pas de traceur au sens de l'article 82 de la loi Informatique et Libertés, et pas de bannière de consentement. Je n'ai pas trouvé de confirmation CNIL nominative pour cet outil : il sera décrit tel quel dans la politique de confidentialité.
- Alternative si Antoine veut plus de détail : Plausible (hébergement européen, payant).
- **Ce qu'on mesure, et rien de plus** : visites par page, sources d'arrivée (LinkedIn, Malt, Google), clics sur le bouton d'appel, réservations confirmées (dans l'outil de rendez-vous). Un indicateur principal : réservations par mois.

### Performance (objectifs mesurables à la recette)

- Lighthouse mobile ≥ 95 dans les quatre catégories.
- LCP < 2 s en 4G simulée, CLS < 0,05, JavaScript < 20 Ko hors page rendez-vous.
- Polices auto-hébergées en WOFF2, sous-ensemble latin, deux familles maximum, préchargement de la police des titres.
- Images en AVIF ou WebP, dimensions déclarées, chargement différé sous la ligne de flottaison. La photo n'est plus intégrée en base64.

### SEO

- Titre et description uniques par page, avec le nom Cap IA et l'intention de recherche (exemples : « Audit IA pour TPE et PME | Cap IA », « Formation IA pour vos équipes | Cap IA »).
- Données structurées : `ProfessionalService` (Cap IA, zone desservie : Île-de-France et à distance), `Person` (Antoine), `Service` pour chaque offre, fil d'Ariane.
- `sitemap.xml` généré automatiquement, `robots.txt`, URL canoniques, image de partage par page.
- Conserver le fichier de vérification Google Search Console et soumettre le nouveau sitemap à la mise en ligne.
- Pas de blog au lancement : il ne serait pas tenu, et un blog abandonné nuit à la crédibilité.

### Accessibilité (objectif WCAG 2.2 niveau AA)

Contrastes conformes (palette ci-dessus), focus visible sur tout élément interactif, lien d'évitement vers le contenu, navigation complète au clavier, menu mobile accessible, respect de `prefers-reduced-motion`, champs de formulaire étiquetés avec messages d'erreur explicites, textes alternatifs utiles, cibles tactiles d'au moins 44 px, aucune information portée par la couleur seule, langue déclarée.

### Conformité

- **Mentions légales** : harmoniser la localisation (mentions : Gentilly ; page À propos actuelle : Maisons-Alfort), ajouter le numéro de déclaration d'activité de formation s'il existe (voir risque 5).
- **Confidentialité** : ajouter l'outil de rendez-vous, Cloudflare Web Analytics, retirer Google Fonts (auto-hébergées désormais). Un tribunal de Munich a jugé en 2022 que charger Google Fonts depuis les serveurs de Google transmettait l'adresse IP sans base légale : l'auto-hébergement règle la question.
- **Cookies** : aucun cookie déposé par le site lui-même ; l'outil de rendez-vous n'est chargé que sur sa page, à déclarer.
- **Email** : ajouter un enregistrement DMARC sur `cap-ia.pro` (aujourd'hui absent), pour la délivrabilité et contre l'usurpation du domaine.

---

## 8. Checklist de migration d'identité

À faire après la mise en ligne, dans cet ordre (du plus vu au moins vu).

**LinkedIn**
- [ ] Photo de profil : le même portrait que sur le site (`Photo_pro.JPG`), pour être reconnu d'un support à l'autre.
- [ ] Bannière (1584 × 396 px) : nouvelle identité, promesse courte, URL. Ne pas y mettre de liste de services en capitales espacées.
- [ ] Titre : aligné sur la promesse (exemple : « J'aide les TPE et PME à mettre l'IA au service de leur quotidien · Conseil, formation, mise en place · Cap IA »).
- [ ] Section Infos : reprendre le texte de la page À propos, version courte, avec le lien vers `/rendez-vous`.
- [ ] Sélection (contenus en vedette) : la réalisation phare et FindMyJob.
- [ ] Page entreprise Cap IA si elle existe : logo, bannière, description identiques.
- [ ] Vérifier qu'aucun ancien post épinglé ne met en avant ROB avec des chiffres.

**Signature email (Zoho Mail)**
- [ ] Nom, « Cap IA · Conseil et formation IA pour TPE et PME », téléphone si souhaité, lien vers le site et vers `/rendez-vous`.
- [ ] Logo en PNG léger hébergé sur cap-ia.pro (pas en pièce jointe), texte lisible sans image.

**Malt**
- [ ] Photo, titre et description alignés sur le site.
- [ ] **Retirer `portfolio-liberty.png`** et tout élément du portfolio qui présente ROB ou Liberty.
- [ ] Portfolio : une image par cas retenu (format 1200 × 800 px), même gabarit graphique.
- [ ] Taux journalier à 650 € et prix alignés sur la grille validée (section 12).

**ComeUp**
- [ ] Photo, description, visuels des services (`portfolio-comeup.png` à refaire dans la nouvelle identité et à vérifier pour ROB).
- [ ] Titres et prix des services cohérents avec les offres du site.

**Codeur.com**
- [ ] Photo, présentation, compétences, lien vers le site et les cas.

**Supports commerciaux et de formation**
- [ ] **Plaquette PDF** : à refaire entièrement (elle présente ROB, Liberty et ses chiffres, un logo en losange différent, et des textes sans accents).
- [ ] `Portfolio.pdf` : à refaire sur le modèle des mini cas.
- [ ] Gabarit de présentation (PowerPoint ou Google Slides) : couverture, titre, contenu, schéma, fin ; appliqué aux prochains supports de formation.
- [ ] Gabarit de facture et de devis (logo, couleurs).
- [ ] Formulaire de cadrage (à déplacer hors du site public, passer au « je »).
- [ ] Fiche et guide ambassadeur : à mettre à jour ou à retirer si le programme est arrêté.
- [ ] Image de partage (`og-image.png`), favicon, icônes d'application.
- [ ] Fond d'écran `cap-ia-wallpaper-v2.png` utilisé en visio, si c'est son usage.
- [ ] Charte graphique (`charte-cap-ia.md`) : remplacée par la nouvelle charte.

---

## 9. Découpage en étapes livrables

Chaque étape se termine par une validation explicite d'Antoine avant de passer à la suivante. Rien n'est mis en ligne avant l'étape 7.

| Étape | Livrable | Ce qu'Antoine valide | Ce qu'Antoine fournit |
|---|---|---|---|
| **0. Sécurisation** | Dépôt cloné proprement depuis GitHub dans `C:\Users\AntoineFonfreydelLib\Projets\cap-ia` (hors OneDrive), vérifié identique à l'origine ; étiquette `site-v1` sur l'état actuel ; branche `refonte` ; ce plan versionné à la racine du dépôt, hors du dossier publié. L'ancien dossier `Cap-IA` n'est supprimé qu'après accord d'Antoine | Le plan (ce document) | Déplacement des documents de Cap IA sur un espace personnel (à faire par Antoine) |
| ~~0 bis. Correctif urgent du site actuel~~ | **Écarté par Antoine le 15 octobre 2026** : le site actuel reste en l'état jusqu'à la mise en ligne de la refonte | | |
| **1. Message et contenus** | Arborescence définitive ; textes complets de toutes les pages en Markdown (sans mise en forme) | Chaque texte, page par page | Parcours pour la page À propos ; liste des engagements qu'il accepte de tenir ; disponibilités réelles pour les appels |
| **2. Identité visuelle** | Trois esquisses de logo, puis le logo retenu et ses déclinaisons ; palette et typographie appliquées à une maquette de l'accueil et d'un cas (desktop et mobile) | Logo, maquettes | Avis sur les esquisses (portrait déjà fourni) |
| **3. Développement** | Site Astro complet sur une URL de prévisualisation Cloudflare, avec tous les textes validés | Navigation réelle sur ordinateur et téléphone | Retours groupés |
| **4. Réalisations** | Trois cas finalisés : schémas de flux, captures nettoyées (données fictives), faits mis à jour | Chaque cas | Chiffres à jour de l'agent Orée, de FindMyJob et de Popote ; captures d'écran (les accords sont obtenus) |
| **5. Rendez-vous, formulaire, mesure, légal** | Outil de rendez-vous configuré et intégré, formulaire de secours, mesure d'audience, pages légales mises à jour | Un test complet de réservation, la politique de confidentialité | Création du compte de rendez-vous (à son nom), connexion de son agenda |
| **6. Recette** | Rapport : Lighthouse, contrôle accessibilité, liens, redirections, rendu sur iPhone et Android, relecture orthographique | Le rapport | Une relecture finale |
| **7. Mise en ligne** | Fusion dans `main`, déploiement, redirections actives, `www` et HTTPS, DMARC, sitemap soumis à Search Console | La mise en ligne | Accès DNS si nécessaire |
| **8. Migration d'identité** | Visuels prêts à l'emploi (bannière, avatar, portfolio Malt et ComeUp, signature, gabarit de présentation, plaquette) et textes des profils | Chaque visuel | Mise à jour des profils (connexion à ses comptes) |

Les fichiers de code seront livrés complets à chaque étape, jamais en modifications partielles.

---

## 10. Risques et points de vigilance

1. **Employeur (risque principal).** Antoine est salarié dans le tourisme d'affaires. Tant que ROB et Liberty restent sur le site, la plaquette et Malt, il y a un risque au regard de la confidentialité et de l'obligation de loyauté. À vérifier aussi : les clauses d'exclusivité ou de non-concurrence du contrat de travail. Antoine a choisi d'attendre la refonte complète plutôt qu'un correctif immédiat : le risque court jusqu'à la mise en ligne (étape 7). Le portfolio Malt et la plaquette ne dépendent pas du site et peuvent être corrigés à tout moment.
2. **Conformité de l'agent Orée mis en vitrine.** Décision d'Antoine (15 octobre 2026) : mentions de provenance et d'opposition non activées, parce que les envois partent de sa propre boîte, en petit volume et en son nom ; il les activera en cas d'envoi depuis une autre boîte, via un outil d'emailing ou à plusieurs dizaines de prospects par semaine. Règle pour le site : ne pas aborder le sujet, et ne jamais affirmer que les messages contiennent ces mentions tant que ce n'est pas le cas. Pour mémoire, le cadre CNIL ne prévoit pas d'exception selon le volume ou la boîte d'envoi.
3. **Accords des personnes et des clients.** Aucun nom de client, de proche ou de prospect ne sera publié sans accord écrit. Les noms des wedding planners contactés ne doivent jamais apparaître, y compris dans les captures.
4. **Promesses et chiffres.** Aucun chiffre non établi par les fichiers. Les résultats sont datés et mis à jour, sinon retirés. Une page qui affirme « en production » un outil arrêté devient fausse : chaque cas porte une date de mise à jour, à revoir tous les trois mois.
5. **Formation professionnelle.** Cap IA n'est pas certifié Qualiopi : les formations ne sont pas finançables par un OPCO en direct, il faut l'écrire (avec l'option de passer par un organisme partenaire, comme pour DataBird). La facture DataBird indique « formation professionnelle » : vérifier si une déclaration d'activité de prestataire de formation est nécessaire pour vendre des formations en direct. Ne pas confondre le tarif de sous-traitance DataBird avec un tarif client direct.
6. **Règlement européen sur l'IA.** Depuis le 2 février 2025, l'article 4 demande aux entreprises qui utilisent des systèmes d'IA de veiller à un niveau suffisant de maîtrise de l'IA de leur personnel. C'est un argument factuel pour l'offre Formation, à employer sans alarmisme ni promesse de « mise en conformité ».
7. **Disponibilité réelle.** Avec un emploi à temps plein, les créneaux proposés et les délais annoncés (« réponse sous 48 h ») doivent être tenables. Un dirigeant de TPE attend des créneaux en journée : à arbitrer honnêtement (pauses déjeuner, un créneau de fin de journée, un jour fixe).
8. **Outil de rendez-vous.** Les plans gratuits changent sans préavis. Le bouton pointe vers `/rendez-vous`, pas directement vers l'outil : on peut changer d'outil sans toucher au reste du site.
9. **Stockage des données de Cap IA.** Le dossier Cap IA, factures et contrats compris, est stocké dans le OneDrive de l'employeur (LITG). En cas de départ, l'accès peut être coupé, et l'employeur en a techniquement la maîtrise. Par ailleurs, un dépôt git dans un dossier OneDrive risque la corruption (incident déjà vécu sur Popote). Décision du 15 octobre 2026 : dépôt du site dans `C:\Users\AntoineFonfreydelLib\Projets\cap-ia` avec GitHub comme référence (étape 0), documents de Cap IA déplacés par Antoine sur un espace personnel.
10. **Changement d'identité.** La marque a six mois : le coût de reconnaissance perdu est faible. Le risque est plutôt la cohabitation de deux identités pendant la migration : d'où l'étape 8 juste après la mise en ligne.
11. **Lien vers Orée.** Orée vise des particuliers ; le lien reste discret (dans le cas, pas dans le menu) pour ne pas brouiller le positionnement B2B.
12. **Sur-ingénierie.** Astro sans dépendance d'interface, pas de CMS, pas de blog, pas de version anglaise au lancement. Tout ajout futur doit répondre à la clarté, la modernité ou la crédibilité.

---

## 11. Questions à trancher (dans l'ordre)

Je les poserai une par une, chacune avec ma recommandation.

1. ~~Mentions d'opposition dans l'agent Orée.~~ **Tranché le 15 octobre 2026** : l'agent Orée reste la réalisation phare, le sujet n'est pas abordé sur le site (voir section 6, cas 1, et risque 2).
2. ~~Correctif urgent du site actuel (étape 0 bis).~~ **Tranché le 15 octobre 2026** : on attend la refonte complète. Conséquence : ROB, Liberty et `/audit` restent en ligne jusqu'à l'étape 7, ce qui donne une raison de ne pas étirer le calendrier.
3. ~~Tarifs « à partir de ».~~ **Tranché le 15 octobre 2026** : grille de la section 12 validée telle quelle, taux journalier de référence à 650 €.
4. ~~Suppression de la version anglaise au lancement.~~ **Tranché le 15 octobre 2026** : supprimée au lancement (`i18n.js`, `translations.json` et le bouton FR/EN disparaissent). Une vraie version anglaise indexable reste possible plus tard avec Astro.
5. ~~Disponibilités réelles pour les appels découverte.~~ **Tranché le 15 octobre 2026** : voir « Créneaux » en section 7.
6. ~~Accords.~~ **Tranché le 15 octobre 2026** : aucune mission de formation citée (ni BeAPI ni DataBird) ; accords obtenus pour FindMyJob (deux amies, anonymes) et Popote (colocataire, anonyme).
7. ~~Séance photo.~~ **Tranché le 15 octobre 2026** : réutilisation de la photo actuelle (`Photo_pro.JPG`).
8. ~~Déplacement du dépôt et des documents hors du OneDrive de l'employeur.~~ **Tranché le 15 octobre 2026** : Claude déplace le dépôt du site dans `C:\Users\AntoineFonfreydelLib\Projets\cap-ia` à l'étape 0 ; Antoine déplace lui-même les documents de Cap IA sur un espace personnel.

**Toutes les questions sont tranchées.** Reste la validation globale du plan, qui ouvre l'étape 0.

---

## 12. Grille tarifaire (validée)

Statut : **validée par Antoine le 15 octobre 2026**, telle quelle, avec un taux journalier de référence de 650 €.

### Principes

1. **Prix au forfait, jamais à l'heure affichée.** Un dirigeant de TPE achète un résultat (une feuille de route, une équipe formée, un outil qui tourne), pas du temps. Le taux journalier reste un outil interne de calcul et sert sur Malt, mais il n'apparaît pas sur le site.
2. **Un prix d'entrée clair par offre, des paliers ensuite.** Le site affiche « à partir de » ; le détail des paliers figure sur chaque page d'offre.
3. **Sous les agences, au niveau d'un consultant confirmé, jamais au niveau d'un débutant.** Le taux horaire implicite de toute la grille se situe entre 80 et 100 € (soit environ 600 à 700 € par jour), cohérent avec la médiane du marché pour un consultant IA (environ 700 € par jour) et nettement sous les agences.
4. **Le temps d'Antoine est rare** (emploi à temps plein) : la grille doit rapporter assez par mission pour limiter le nombre de missions nécessaires, pas l'inverse. C'est la meilleure protection contre le « bradage ».
5. **Aucune remise, aucun tarif de lancement.** Le seul mécanisme commercial est la déduction de l'audit (voir plus bas), qui récompense l'engagement plutôt que de baisser le prix.
6. **Affichage** : tant que Cap IA est en franchise de TVA, les prix sont nets (« TVA non applicable, art. 293 B du CGI »). Ils sont conçus comme des prix HT : si le chiffre d'affaires dépasse le seuil de franchise (37 500 € en 2026 pour les prestations de services, 41 250 € pour le seuil majoré), la TVA s'ajoute sans changer la grille, et un client professionnel la récupère.
7. **Les abonnements aux outils et les coûts d'IA sont payés directement par le client, à son nom.** Cohérent avec l'engagement « vous restez propriétaire » et évite à Cap IA de porter des coûts variables.

### Repères de marché (2026, relevés pendant la veille)

| Prestation | Repère | Source |
|---|---|---|
| Consultant IA, taux journalier | Médiane environ 700 € (570 à 910 €) ; Malt, experts data 8 à 15 ans : 666 € | TJMètre, Malt |
| Audit IA TPE en agence | 890 € HT la demi-journée, 1 900 € HT la journée, 3 900 € HT deux jours | Step |
| Audit IA TPE, fourchettes générales | 0 à 1 500 € (flash), 2 000 à 8 000 € (TPE et PME) | The Intelligence Academy, kirohq |
| Formation intra, demi-journée | 800 à 1 500 € pour 8 à 15 personnes | Synthèse de pages d'organismes |
| Formation intra, journée | 1 000 à 3 000 €, souvent 1 500 à 2 000 € HT | Tensoria, Flowt |
| Formateur IA expert, journée | 1 100 à 1 800 € | Grille Kaliio citée par Tensoria |
| Automatisation simple | 150 à 890 € par flux | Oakflow AI |
| Suivi et maintenance | 150 à 500 €, jusqu'à 900 € HT par mois | Agences n8n (Genee, Tensoria) |

Ce sont des prix publics de concurrents, souvent soumis à TVA : Cap IA, en franchise, est d'autant plus compétitif à prix affiché égal.

### Offre 1 : Audit IA

| Formule | Pour qui | Contenu | Prix proposé |
|---|---|---|---|
| Appel découverte | Tous | 30 min en visio, premières pistes, sans engagement | **Gratuit** |
| **Audit Express** | Indépendant ou TPE jusqu'à 5 personnes, une ou deux activités | Questionnaire préparatoire, entretien de 1 h 30, cartographie des tâches, 3 à 5 pistes priorisées, feuille de route courte (5 à 8 pages), restitution de 45 min en visio | **490 €** |
| **Audit Complet** | TPE et PME jusqu'à 30 personnes, plusieurs fonctions | Express + 2 à 4 entretiens (dirigeant et équipes), revue des outils et des données (dont les points RGPD de base), 6 à 10 pistes évaluées, feuille de route à 6 mois, sélection d'outils avec leur coût mensuel, restitution de 1 h, point de suivi à 1 mois | **1 290 €** |
| Audit sur mesure | Plus de 30 personnes, plusieurs sites | Sur devis, base de calcul : temps estimé | **Sur devis** |

- **Déduction** : si un accompagnement de mise en place est signé dans les 2 mois suivant la restitution, 50 % du prix de l'audit est déduit de la mise en place.
- **Pourquoi pas 250 €** (prix actuel) : pour une feuille de route écrite, le travail réel est d'environ 6 heures (entretien, analyse, rédaction, restitution). À 250 €, on est à environ 40 € de l'heure, sous le niveau d'un débutant, et un prix aussi bas fait douter du sérieux du livrable. 490 € reste près de deux fois moins cher que le diagnostic flash d'une agence.
- Le contenu type de la feuille de route est en annexe C.

### Offre 2 : Formation IA

Point de départ fixé par Antoine : 500 € la demi-journée pour moins de 10 personnes. La grille l'organise selon le format, le lieu, la taille du groupe et le niveau de personnalisation.

**Formations de groupe (intra-entreprise)**

| Format | À distance | En présentiel (Île-de-France) |
|---|---|---|
| Demi-journée (3 h 30), jusqu'à 9 personnes | **500 €** | **650 €** |
| Journée (7 h), jusqu'à 9 personnes | **900 €** | **1 100 €** |
| Parcours de 3 demi-journées espacées de 2 à 3 semaines, avec exercices entre les séances | **1 350 €** | **1 750 €** |

- **De 10 à 15 personnes** : + 200 € par demi-journée (plus de suivi individuel pendant les exercices).
- **Au-delà de 15 personnes** : deux groupes. Au-delà, chacun n'a plus le temps de pratiquer sur ses propres tâches, ce qui est le cœur de la méthode.
- **Hors Île-de-France** : prix présentiel, plus transport et hébergement refacturés au réel sur justificatifs (comme pour DataBird).

**Options**

| Option | Contenu | Prix proposé |
|---|---|---|
| **Préparation sur vos cas réels** | Entretien préalable avec le responsable, exercices construits sur les documents et tâches de l'entreprise (anonymisés) | **+ 250 €** par programme |
| **Assistants personnalisés par poste** | Le dispositif GemAPI : chaque participant repart avec un assistant configuré pour son poste (ChatGPT, Gemini ou Copilot selon l'outil de l'entreprise) | **+ 400 €** par programme |
| Support de formation remis | Guide de bonnes pratiques et règles d'usage des données, aux couleurs de Cap IA | **Inclus** |

L'option « assistants personnalisés » est la signature de Cap IA (dispositif déjà éprouvé en formation, présenté sans nom de client). Elle doit être mise en avant comme option recommandée, pas cachée.

**Formation individuelle** (indépendants, dirigeants qui veulent avancer seuls)

| Format | Prix proposé |
|---|---|
| Séance individuelle de 2 h à distance, sur vos propres tâches | **190 €** |
| Pack de 3 séances de 2 h, sur 1 à 2 mois | **520 €** |

**Conditions** : annulation ou report à moins de 7 jours de la session : 50 % du prix dû. Cap IA n'est pas certifié Qualiopi : pas de financement OPCO en direct, ce qui doit être écrit sur la page (voir risque 5).

**Lecture critique de ton point de départ** : 500 € la demi-journée à distance est au bas du marché (800 à 1 500 € relevés), mais tenable pour un contenu déjà prêt. Ce qui ne doit pas être offert dans ce prix : le présentiel (temps de trajet), la préparation sur les cas réels et les assistants personnalisés. C'est là que la grille protège la valeur.

### Offre 3 : Accompagnement (mise en place, puis suivi)

**Mise en place, au forfait** (après un audit ou un brief clair)

| Niveau | Exemples | Prix proposé |
|---|---|---|
| **Mise en place simple** | Configurer et paramétrer un outil existant, une automatisation entre deux outils (par exemple : trier les emails entrants et préparer des brouillons de réponse) | **À partir de 690 €** |
| **Automatisation sur mesure** | Un flux en plusieurs étapes avec IA et validation humaine (par exemple : un devis préparé à partir d'un brief, prêt à relire) | **À partir de 1 500 €** |
| **Outil ou agent sur mesure** | Interface dédiée, plusieurs étapes d'IA, suivi automatique (même famille que l'agent de prospection d'Orée) | **À partir de 3 500 €** |

Inclus dans chaque mise en place : comptes et accès au nom du client, documentation écrite, prise en main de 1 h pour les utilisateurs, 30 jours de corrections sans frais après la livraison.
Conditions : devis forfaitaire après cadrage, 30 % à la commande, solde à la livraison (paiement par étapes pour les projets au-delà de 3 000 €).

**Suivi mensuel** (facultatif, sans engagement au-delà de 3 mois)

| Formule | Contenu | Prix proposé |
|---|---|---|
| **Suivi essentiel** | Surveillance des automatisations, corrections, adaptation quand un outil change, compte rendu trimestriel | **150 € par mois** |
| **Suivi actif** | Essentiel + point mensuel d'une heure, petites évolutions (jusqu'à 2 h par mois), veille sur les outils utiles à l'entreprise | **350 € par mois** |

### Ce que le site affiche

| Offre | Affichage sur la carte | Détail |
|---|---|---|
| Audit IA | « À partir de 490 € » | Page d'offre : Express, Complet, sur mesure, déduction |
| Formation IA | « À partir de 500 € la demi-journée pour votre équipe » | Page d'offre : tableau des formats, options, formation individuelle dès 190 € |
| Accompagnement | « Mise en place à partir de 690 €, suivi à partir de 150 € par mois » | Page d'offre : trois niveaux, suivi, conditions |

### Cohérence interne (taux horaire implicite)

| Prestation | Temps estimé | Prix | Taux implicite |
|---|---|---|---|
| Audit Express | environ 6 h | 490 € | environ 80 € |
| Audit Complet | environ 15 h | 1 290 € | environ 85 € |
| Demi-journée à distance | 3 h 30 + 2 h de préparation | 500 € | environ 90 € |
| Demi-journée en présentiel | même chose + 1 h 30 de trajet | 650 € | environ 90 € |
| Journée à distance | 7 h + 3 h de préparation | 900 € | 90 € |
| Séance individuelle | 2 h + 15 min de préparation | 190 € | environ 85 € |
| Mise en place simple | environ 7 h | 690 € | environ 100 € |
| Suivi essentiel | environ 1 h 30 par mois | 150 € | 100 € |

Taux journalier de référence pour les devis sur mesure et pour Malt : **650 € par jour** (à aligner partout). Les temps sont des estimations de départ : à corriger après les cinq premières missions réelles, en notant le temps passé.

### Suites de la validation

- Les prix de cette section remplacent tous les `[À FOURNIR : tarif]` du plan.
- Malt, ComeUp et Codeur.com sont à aligner sur cette grille et sur le taux de 650 € par jour (checklist de la section 8).
- Les temps estimés sont à mesurer sur les cinq premières missions pour ajuster la grille si besoin.

---

## Annexe A : audit détaillé

Gravité : B = Bloquant, I = Important, M = Mineur.

### Positionnement et message

| Constat | Gravité |
|---|---|
| Titre centré sur Antoine et la technique (« Je conçois des systèmes IA concrets, déployés et utilisés »), aucune mention du problème du visiteur | I |
| Positionnement « concepteur d'agents IA » (site, plaquette) en décalage avec l'activité déclarée (conseil, formation, accompagnement) | I |
| Jargon dans les textes visibles : agents, systèmes, SaaS, PWA, Cloudflare Workers, API, workflows | I |
| Bandeau « Paris » alors que l'adresse légale est à Gentilly et le texte dit « Maisons-Alfort » | M |
| Titre de page « Antoine Fonfreyde \| Systèmes IA déployés » : la marque Cap IA est absente | I |

### Architecture et parcours

| Constat | Gravité |
|---|---|
| Au moins sept actions concurrentes, aucune réservation de créneau | I |
| Site en une longue page à ancres + une page Réalisations : pas de page par offre, rien à partager ni à référencer | I |
| Lien de la page Diagnostic vers `/#rob`, ancre inexistante | M |
| Pages internes (`/audit`, `/capIA_formulaire_cadrage`) publiques et indexables | B |
| Mot de passe de `/audit` lisible dans le code source de la page | B |

### Contenu et preuves

| Constat | Gravité |
|---|---|
| ROB et Liberty mis en avant avec chiffres dans 5 emplacements (et la plaquette) | B |
| Missions Cap IA réelles (BeAPI, DataBird) absentes du site. Décision d'Antoine : ne pas les citer, la preuve passe par les réalisations et la méthode | (tranché) |
| Six réalisations en catalogue, sans besoin, démarche ni transposition | I |
| Thèmes intimes (préconception) dans la vitrine d'un cabinet de conseil | I |
| Offres : « Sur devis » partout sauf l'audit, carte Formation à 75 % d'opacité qui paraît désactivée, pas d'offre d'accompagnement | I |
| Section Primo qui affirme « Cap IA automatise ses propres workflows avec les mêmes agents qu'elle déploie chez ses clients » sans client cité | I |
| Questionnaire Diagnostic qui commence par « Tourisme / DMC / Voyage d'affaires » et cite Liberty | I |

### Design

| Constat | Gravité |
|---|---|
| Thème sombre intégral, perçu comme technique et fatigant sur les textes longs | I |
| Quatre versions du logo selon les supports | I |
| Étiquettes en capitales de 10 px très espacées, nombreuses | M |
| Badges qui clignotent (« Opérationnel »), apparitions animées, sous-palette jaune héritée de ROB dans le CSS | M |
| Styles écrits directement dans le HTML, sections incohérentes entre elles | M |

### Mobile

| Constat | Gravité |
|---|---|
| Menu burger fonctionnel, grilles qui passent en une colonne : base correcte | (positif) |
| Hero vide pendant les animations d'apparition au chargement (contenu à opacité nulle jusqu'à 1,6 s) | M |
| Bloc de preuve et aucun bouton de rendez-vous dans le premier écran | I |
| Cartes « Ce que j'automatise » pensées pour le survol à la souris | M |

### Performance

| Constat | Gravité |
|---|---|
| Accueil de 255 Ko de HTML dont environ 190 Ko de photo en base64, non mise en cache séparément | I |
| Google Fonts chargées depuis Google, bloquantes pour l'affichage | M |
| Traduction chargée en JavaScript (`translations.json`) sur chaque page | M |
| CSS mort conservé (« ancien, conservé pour fallback ») | M |

### SEO technique et de base

| Constat | Gravité |
|---|---|
| `sitemap.xml` avec une seule URL, datée d'avril | I |
| Pas de `robots.txt` (404) | M |
| Pas d'URL canonique ni de données structurées | M |
| Version anglaise injectée en JavaScript : invisible pour les moteurs, pas de `hreflang` | M |
| `www.cap-ia.pro` ne répond pas ; `http://` ne redirige pas vers `https://` | I |
| Search Console vérifiée (fichier de vérification présent) | (positif) |

### Accessibilité

| Constat | Gravité |
|---|---|
| Contrastes insuffisants : liens du menu environ 3,4:1, étiquettes de section environ 2:1, mentions sous les prix environ 2,9:1, notes en gris foncé environ 1,5:1 (minimum requis 4,5:1) | I |
| `outline: none` sur les champs, focus signalé seulement par un changement de bordure peu visible | I |
| Aucun respect de `prefers-reduced-motion` | M |
| Pas de lien d'évitement | M |
| Lien LinkedIn en nouvel onglet sans `rel="noopener"` | M |

### Conformité

| Constat | Gravité |
|---|---|
| Mentions légales complètes (éditeur, SIREN, hébergeur, médiateur) | (positif) |
| Politique de confidentialité claire, déclare Formspree, Cloudflare et Google Fonts | (positif) |
| Google Fonts chargées depuis Google : transfert d'adresse IP évitable | M |
| Incohérence de localisation entre mentions légales et page | M |
| Aucun enregistrement DMARC sur le domaine | M |

### Crédibilité perçue par un dirigeant de TPE

| Constat | Gravité |
|---|---|
| Première impression : technicien passionné plutôt que conseiller qui comprend son métier | I |
| Preuve principale invérifiable pour le visiteur et liée à un employeur | B |
| Pas de visage dans le premier écran, photo ronde en bas de section | M |
| Aucun prix d'entrée hors audit, aucun engagement écrit | I |

---

## Annexe B : sources de la veille

Sites et pages analysés :
- NocodeFactory, page IA et automatisation : https://www.nocodefactory.fr/ia-automatisation
- Oakflow AI : https://www.oakflowai.com/
- Nooralto, agence IA : https://www.nooralto.com/agence-ia/
- KBCOM, automatisation : https://kb-com.fr/services/automatisation
- Inno-Mation, agence n8n : https://inno-mation.com/agence-n8n
- La Fabrique du Net, comparatif d'agences no-code : https://www.lafabriquedunet.fr/agences/pages/agences-nocode
- Profils Malt de consultants IA : https://www.malt.fr/profile/maellebertrand , https://www.malt.fr/profile/maxenceroger , https://www.malt.fr/profile/arnaudlaforge
- AI Elevation (Clutch) : https://clutch.co/profile/ai-elevation
- Promptful Consulting (Clutch) : https://clutch.co/profile/promptful-consulting
- The Intelligence Academy (formation, Qualiopi) : https://www.the-intelligence-academy.com/formations/formation-ia-consultant
- CCI Nice Côte d'Azur, programme formation IA TPE PME : https://www.cote-azur.cci.fr/app/uploads/2026/05/12-Programme-formation-IA-Usages-pro-TPE-PME-6-oct-2026.pdf
- Bonnes pratiques de conversion (sites de consultants) : https://leadhaste.com/blog/maximizing-lead-conversion-consulting-websites , https://consultevo.com/hubspot-consulting-website-guide/

Prise de rendez-vous :
- Calendly et RGPD : https://www.donneespersonnelles.fr/calendly-rgpd
- zcal, hébergement : https://meetergo.com/fr/blog/zcal-avis
- meetergo, plan gratuit : https://meetergo.com/en/kostenlos
- Cal.eu : https://www.cal.eu/
- Zeeg, plan gratuit : https://zeeg.me/en/help/articles/13763310-zeeg-free-trial-and-free-plan
- Zoho Bookings, tarifs : https://www.schedulingkit.com/pricing-guides/zoho-bookings-pricing

Cadre légal et technique :
- CNIL, mesurer la fréquentation : https://www.cnil.fr/fr/mesurer-la-frequentation-de-vos-sites-web-et-de-vos-applications
- CNIL, prospection B2B (synthèses) : https://www.leto.legal/guides/rgpd-et-prospection-commerciale-comment-faire , https://donneespersonnelles.fr/prospection-commerciale-rgpd
- Jugement de Munich sur Google Fonts (2022) : https://wptavern.com/german-court-fines-website-owner-for-violating-the-gdpr-by-using-google-hosted-fonts
- Règlement (UE) 2024/1689 sur l'IA : https://eur-lex.europa.eu/eli/reg/2024/1689/oj
- Astro et Cloudflare : https://ecorpit.com/astro-6-vs-nextjs-16-content-sites-2026/ , https://hapy.co/journal/cloudflare-and-astro-a-practical-stack-for-marketing-sites/

Tarifs (section 12) :
- Baromètre TJM IA et data : https://tjmetre.fr/statistiques-tjm-ia
- Malt, baromètre des experts data : https://www.malt.fr/t/barometre-tarifs/expert-data
- Step, tarifs publics d'audit IA : https://www.step-agency.fr/tarifs
- Coût d'un audit IA pour une PME : https://kirohq.com/cout-audit-ia-pme , https://www.the-intelligence-academy.com/blog/audit-ia-guide-complet
- Prix des formations IA en entreprise : https://tensoria.fr/blog/prix-formation-ia-entreprise , https://flowt.fr/blog/combien-coute-formation-ia-entreprise/
- Maintenance d'automatisations : https://www.genee.tech/blog/combien-coute-une-automatisation-n8n , https://tensoria.fr/blog/combien-coute-n8n-production
- Seuils de franchise de TVA 2026 : https://www.socic.fr/ressources-comptabilite/articles/micro-entreprise-et-tva-en-2026-franchise-depassement-de-seuils-regime-reel-et-option-volontaire/

Limites de la veille : les pages d'agences sont des documents commerciaux (chiffres déclaratifs) ; les comparatifs d'outils de rendez-vous sont souvent écrits par des concurrents. Les points structurants (plan gratuit de meetergo, conditions de Zoho Bookings) seront vérifiés directement en étape 5. Les seuils de TVA sont à confirmer sur impots.gouv.fr ou auprès d'un comptable.

---

## Annexe C : feuille de route type d'un audit IA

Gabarit unique, rempli pour chaque client. L'Audit Express en utilise les parties 1, 2, 3, 5 et 8 en version courte ; l'Audit Complet utilise tout.

### Avant l'entretien : questionnaire préparatoire (10 questions, 15 minutes)

1. Votre activité en deux phrases, votre effectif, qui fait quoi.
2. Les outils utilisés au quotidien (messagerie, agenda, tableur, logiciel métier, CRM, comptabilité).
3. Les trois tâches qui vous prennent le plus de temps sans demander de vraie réflexion.
4. Pour chacune : combien de fois par semaine, combien de temps à chaque fois, qui la fait.
5. D'où vient l'information (emails, PDF, formulaires, appels, tableurs) et où va le résultat.
6. Les données sensibles que vous manipulez (données de clients, de santé, financières, contrats).
7. Ce que vous avez déjà essayé avec l'IA, ce qui a marché et ce qui a déçu.
8. Les abonnements déjà payés qui contiennent de l'IA sans être utilisés (Microsoft 365, Google Workspace, logiciel métier).
9. Ce qui ne doit jamais être automatisé chez vous, et pourquoi.
10. Ce que vous voudriez avoir changé dans 6 mois.

### Le livrable : « Votre feuille de route IA »

**1. Synthèse en une page**
Les 3 priorités, le temps qu'elles devraient libérer (estimé à partir de vos propres chiffres, méthode indiquée), le budget indicatif (mise en place et abonnements mensuels), la première action à faire cette semaine.

**2. Cartographie de vos tâches**
Un tableau : tâche, qui la fait, fréquence, temps par occurrence (déclaré par vous), outil actuel, données concernées, part qui pourrait être prise en charge.

**3. Évaluation de chaque piste**
Trois critères, notés simplement (faible, moyen, fort) :
- **Gain** : fréquence multipliée par le temps, et irritation de l'équipe.
- **Facilité** : l'information est-elle déjà numérique, les outils peuvent-ils être reliés, faut-il développer quelque chose ?
- **Risque** : données sensibles, coût d'une erreur, besoin d'une validation humaine.
Classement final en trois colonnes : **à faire maintenant**, **à préparer**, **à écarter** (avec la raison, toujours).

**4. Une fiche par priorité** (Audit Complet)
Le problème en une phrase ; la solution proposée ; les outils possibles avec leur coût mensuel ; ce qui reste fait par un humain ; l'effort de mise en place (faire soi-même, avec un accompagnement, ou sur mesure) ; l'indicateur qui dira si ça marche.

**5. Le plan en trois horizons**
- **30 jours** : ce qui ne demande aucun développement (mieux utiliser les outils déjà payés, quelques assistants configurés, règles d'usage).
- **90 jours** : une ou deux automatisations sur les tâches les plus fréquentes.
- **6 mois** : un outil sur mesure, seulement si le gain le justifie.

**6. Données et sécurité** (Audit Complet)
Ce qu'il ne faut jamais coller dans un outil d'IA ; les réglages à activer (désactivation de l'entraînement sur vos données quand l'outil le permet) ; hébergement des données ; rappel de l'obligation de maîtrise de l'IA pour le personnel (article 4 du règlement européen sur l'IA), sans dramatiser.

**7. Formation recommandée** (Audit Complet)
Qui former, sur quoi, sous quel format.

**8. Ce que je vous déconseille**
Les outils, promesses ou projets qui ne vous apporteraient rien aujourd'hui, avec la raison. Cette partie est obligatoire : c'est elle qui rend le reste crédible.

**9. Prochaines étapes**
Les options, chacune chiffrée : faire seul avec la feuille de route, être formé, être accompagné pour la mise en place.

### Méthode d'estimation des gains (écrite dans chaque feuille de route)

Temps libéré par mois = nombre d'occurrences par mois × temps par occurrence × part réellement prise en charge.
Les deux premiers chiffres viennent du client ; la part prise en charge est une estimation prudente d'Antoine, justifiée en une phrase. Le document dit toujours qu'il s'agit d'une estimation et non d'une promesse, et propose de la mesurer après la mise en place.
