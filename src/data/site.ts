// Réglages centraux du site. Toute coordonnée ou tout service tiers se change ici, et nulle part ailleurs.

export const site = {
  nom: 'Cap IA',
  url: 'https://cap-ia.pro',
  accroche: 'Conseil et formation IA pour TPE, PME et indépendants',
  fondateur: 'Antoine Fonfreyde',
  email: 'antoine@cap-ia.pro',
  telephone: '06 29 31 21 21',
  zone: 'Val-de-Marne, interventions en Île-de-France et à distance',
  linkedin: 'https://www.linkedin.com/in/antoinefonfreyde',
  malt: 'https://www.malt.fr/profile/antoinefonfreyde',
  mentionTva: 'TVA non applicable, art. 293 B du CGI',
};

// Le seul bouton d'appel à l'action du site : même libellé, même destination, partout.
export const cta = {
  libelle: 'Réserver un appel découverte',
  precision: '30 minutes en visio, gratuit et sans engagement.',
  lien: '/rendez-vous',
};

export const navigation = [
  { libelle: 'Offres', lien: '/offres' },
  { libelle: 'Réalisations', lien: '/realisations' },
  { libelle: 'À propos', lien: '/a-propos' },
];

// Prise de rendez-vous. Choix du 15 octobre 2026 : pas d'outil payant (meetergo écarté, payant après
// l'essai). Tant que `url` est vide, la page /rendez-vous propose une demande de créneau par formulaire.
// Pour brancher plus tard un outil gratuit (par exemple une page de réservation Google Agenda), renseigner
// `url`, `outil` et `domaines`, puis autoriser le domaine dans `frame-src` (public/_headers).
export const reservation = {
  url: '',
  outil: '',
  domaines: [] as string[],
  creneaux: [
    'Lundi à 18 h',
    'Lundi à 18 h 45',
    'Mardi à 12 h 30',
    'Mardi à 13 h 15',
    'Mercredi à 18 h',
    'Mercredi à 18 h 45',
    'Jeudi à 12 h 30',
    'Jeudi à 13 h 15',
  ],
  delaiReponse: 'sous 2 jours ouvrés',
};

// Formulaire de contact et de demande de créneau (service Formspree, déjà utilisé par l'ancien site).
export const formulaire = {
  action: 'https://formspree.io/f/mzdygppn',
};

// Mesure d'audience : Cloudflare Web Analytics est actif pour cap-ia.pro depuis le tableau de bord
// (mode sans script injecté, sans cookie). `actif` fait apparaître la mention dans la politique de
// confidentialité. Renseigner `jeton` seulement pour passer au mode avec script (déjà autorisé par la CSP).
export const mesureAudience = {
  actif: true,
  jeton: '',
};
