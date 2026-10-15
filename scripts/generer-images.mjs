// Génère les icônes (favicon, application) et les images de partage (Open Graph) à partir du logo
// et des titres du site. À relancer après un changement de logo ou l'ajout d'une offre ou d'un cas :
//   npm run images
import sharp from 'sharp';
import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const racine = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const pub = join(racine, 'public');
const policeTitre = join(racine, 'scripts', 'polices', 'Newsreader.ttf');
const policeTexte = join(racine, 'scripts', 'polices', 'PublicSans.ttf');

const C = { papier: '#F7F4EE', encre: '#1B1F24', terre: '#B4532A', douce: '#4A5059', sable: '#DDD6CB' };

// Le repère de cap, dessiné dans un carré 32 x 32.
const marque = (anneau) => `
  <circle cx="16" cy="18.5" r="10.5" fill="none" stroke="${anneau}" stroke-width="2.4"/>
  <path d="M16 2 L21.6 13.2 L16 10.6 L10.4 13.2 Z" fill="${C.terre}"/>
  <circle cx="16" cy="18.5" r="1.9" fill="${anneau}"/>`;

// Favicon : le repère clair sur un carré encre, lisible dans les onglets clairs comme sombres.
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="${C.encre}"/>
  <g transform="translate(3.2 2.6) scale(0.8)">${marque(C.papier)}</g>
</svg>
`;

mkdirSync(join(pub, 'icones'), { recursive: true });
mkdirSync(join(pub, 'og'), { recursive: true });
writeFileSync(join(pub, 'favicon.svg'), faviconSvg);

const png = (svg, taille) => sharp(Buffer.from(svg)).resize(taille, taille).png().toBuffer();

// Icône d'application : fond papier plein (exigé par iOS), repère au centre avec une marge.
const iconeApp = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="${C.papier}"/>
  <g transform="translate(5.6 5.1) scale(0.65)">${marque(C.encre)}</g>
</svg>`;

await sharp(await png(iconeApp, 180)).toFile(join(pub, 'icones', 'apple-touch-icon.png'));
await sharp(await png(iconeApp, 192)).toFile(join(pub, 'icones', 'icone-192.png'));
await sharp(await png(iconeApp, 512)).toFile(join(pub, 'icones', 'icone-512.png'));

// favicon.ico : un conteneur ICO qui embarque une image PNG de 32 px (format accepté partout).
const ico32 = await png(faviconSvg, 32);
const entete = Buffer.alloc(22);
entete.writeUInt16LE(0, 0); entete.writeUInt16LE(1, 2); entete.writeUInt16LE(1, 4);
entete.writeUInt8(32, 6); entete.writeUInt8(32, 7); entete.writeUInt8(0, 8); entete.writeUInt8(0, 9);
entete.writeUInt16LE(1, 10); entete.writeUInt16LE(32, 12);
entete.writeUInt32LE(ico32.length, 14); entete.writeUInt32LE(22, 18);
writeFileSync(join(pub, 'favicon.ico'), Buffer.concat([entete, ico32]));

// Images de partage, 1200 x 630.
const echapper = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const texte = (contenu, police, famille, taille, largeur, couleur, poids = '') =>
  sharp({
    text: {
      text: `<span foreground="${couleur}">${echapper(contenu)}</span>`,
      font: `${famille} ${poids} ${taille}`,
      fontfile: police,
      width: largeur,
      rgba: true,
      spacing: Math.round(taille * 0.25),
      wrap: 'word',
    },
  }).png().toBuffer();

async function imagePartage(fichier, rubrique, titre) {
  const fond = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="${C.papier}"/>
    <rect x="0" y="600" width="1200" height="30" fill="${C.encre}"/>
    <g transform="translate(80 70) scale(2)">${marque(C.encre)}</g>
    <line x1="80" y1="520" x2="1120" y2="520" stroke="${C.sable}" stroke-width="2"/>
  </svg>`;
  const calques = [
    { input: await texte('Cap IA', policeTitre, 'Newsreader', 40, 400, C.encre, 'SemiBold'), left: 160, top: 86 },
    { input: await texte(rubrique, policeTexte, 'Public Sans', 26, 1040, C.douce), left: 80, top: 190 },
    { input: await texte(titre, policeTitre, 'Newsreader', 58, 1040, C.encre, 'Medium'), left: 80, top: 240 },
    { input: await texte('cap-ia.pro · Conseil et formation IA pour TPE, PME et indépendants', policeTexte, 'Public Sans', 24, 1040, C.douce), left: 80, top: 545 },
  ];
  await sharp(Buffer.from(fond)).composite(calques).png({ compressionLevel: 9 }).toFile(join(pub, 'og', `${fichier}.png`));
}

function titreDe(dossier, fichier) {
  const md = readFileSync(join(racine, 'src', 'content', dossier, fichier), 'utf8');
  return md.match(/^titre:\s*"(.*)"\s*$/m)[1];
}

await imagePartage('cap-ia', 'Conseil et formation IA', "L'IA au service de votre quotidien, pas l'inverse.");
await imagePartage('offres', 'Offres', 'Audit, formation, accompagnement : trois façons de travailler ensemble');
await imagePartage('realisations', 'Réalisations', 'Des outils qui tournent, montrés de bout en bout');
await imagePartage('a-propos', 'À propos', 'Antoine Fonfreyde, fondateur de Cap IA');
await imagePartage('rendez-vous', 'Appel découverte', '30 minutes pour savoir ce que l\'IA peut faire pour vous');

for (const f of readdirSync(join(racine, 'src', 'content', 'offres'))) {
  await imagePartage(`offre-${f.replace(/\.md$/, '')}`, 'Offre', titreDe('offres', f));
}
for (const f of readdirSync(join(racine, 'src', 'content', 'realisations'))) {
  await imagePartage(`cas-${f.replace(/\.md$/, '')}`, 'Réalisation', titreDe('realisations', f));
}

console.log('Icônes et images de partage générées.');
