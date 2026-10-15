// Génère les supports de la nouvelle identité hors du site : logos, avatar, bannière LinkedIn,
// images de portfolio (Malt, ComeUp, Codeur.com) et logo de signature email.
//   node scripts/generer-supports.mjs
// Sortie : dossier supports/ (versionné).
import sharp from 'sharp';
import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const racine = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const sortie = join(racine, 'supports');
const policeTitre = join(racine, 'scripts', 'polices', 'Newsreader.ttf');
const policeTexte = join(racine, 'scripts', 'polices', 'PublicSans.ttf');
const C = { papier: '#F7F4EE', papierFonce: '#EFEAE1', encre: '#1B1F24', terre: '#B4532A', douce: '#4A5059', ardoise: '#2F4A5C', sable: '#DDD6CB', blanc: '#FFFFFF' };

for (const d of ['logo', 'linkedin', 'portfolio', 'signature']) mkdirSync(join(sortie, d), { recursive: true });

const marque = (anneau) => `
  <circle cx="16" cy="18.5" r="10.5" fill="none" stroke="${anneau}" stroke-width="2.4"/>
  <path d="M16 2 L21.6 13.2 L16 10.6 L10.4 13.2 Z" fill="${C.terre}"/>
  <circle cx="16" cy="18.5" r="1.9" fill="${anneau}"/>`;

const echapper = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const texte = (contenu, { police = policeTexte, famille = 'Public Sans', poids = '', taille, largeur, couleur, align = 'left' }) =>
  sharp({
    text: {
      text: `<span foreground="${couleur}">${echapper(contenu)}</span>`,
      font: `${famille} ${poids} ${taille}`.replace(/\s+/g, ' '),
      fontfile: police,
      width: largeur,
      align,
      rgba: true,
      spacing: Math.round(taille * 0.28),
      wrap: 'word',
    },
  }).png().toBuffer();
const titre = (contenu, o) => texte(contenu, { police: policeTitre, famille: 'Newsreader', poids: 'Medium', ...o });
const fond = (l, h, couleur, extra = '') => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${l}" height="${h}"><rect width="${l}" height="${h}" fill="${couleur}"/>${extra}</svg>`);
const taille = async (buf) => sharp(buf).metadata();

// 1. Repère seul (SVG vectoriel, sans police) et avatar carré.
writeFileSync(join(sortie, 'logo', 'cap-ia-repere.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${marque(C.encre)}</svg>\n`);
writeFileSync(join(sortie, 'logo', 'cap-ia-repere-clair.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${marque(C.papier)}</svg>\n`);
await sharp(fond(800, 800, C.papier, `<g transform="translate(150 140) scale(15.6)">${marque(C.encre)}</g>`)).png().toFile(join(sortie, 'logo', 'avatar-cap-ia-800.png'));

// 2. Logotypes (repère + « Cap IA ») sur fond transparent, pour fond clair et pour fond foncé.
async function logotype(fichier, couleur, hauteur) {
  const echelle = hauteur / 32;
  const nom = await titre('Cap IA', { taille: Math.round(hauteur * 0.62), largeur: hauteur * 6, couleur, poids: 'SemiBold' });
  const m = await taille(nom);
  const largeur = Math.round(hauteur * 1.25 + m.width + hauteur * 0.1);
  const base = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${largeur}" height="${hauteur}"><g transform="scale(${echelle})">${marque(couleur)}</g></svg>`);
  await sharp(base).composite([{ input: nom, left: Math.round(hauteur * 1.2), top: Math.round((hauteur - m.height) / 2 + hauteur * 0.04) }]).png().toFile(join(sortie, fichier));
}
await logotype('logo/cap-ia-logo-fond-clair.png', C.encre, 240);
await logotype('logo/cap-ia-logo-fond-fonce.png', C.papier, 240);
await logotype('signature/cap-ia-signature.png', C.encre, 48);

// 3. Bannière LinkedIn 1584 x 396 (la photo de profil masque le coin bas gauche : texte placé à droite).
{
  const l = 1584, h = 396;
  const deco = `<line x1="560" y1="300" x2="1500" y2="300" stroke="${C.sable}" stroke-width="2"/>
    <g transform="translate(560 66) scale(2.2)">${marque(C.encre)}</g>`;
  await sharp(fond(l, h, C.papier, deco)).composite([
    { input: await titre('Cap IA', { taille: 46, largeur: 400, couleur: C.encre, poids: 'SemiBold' }), left: 650, top: 78 },
    { input: await titre("L'IA au service de votre quotidien, pas l'inverse.", { taille: 46, largeur: 940, couleur: C.encre }), left: 560, top: 160 },
    { input: await texte('Conseil, formation et mise en place d’outils IA pour TPE, PME et indépendants · cap-ia.pro', { taille: 22, largeur: 940, couleur: C.douce }), left: 560, top: 318 },
  ]).png({ compressionLevel: 9 }).toFile(join(sortie, 'linkedin', 'banniere-linkedin-1584x396.png'));
}

// 4. Images de portfolio 1200 x 800, une par réalisation, avec le schéma de flux.
function lireCas(fichier) {
  const md = readFileSync(join(racine, 'src', 'content', 'realisations', fichier), 'utf8');
  const champ = (n) => md.match(new RegExp(`^${n}:\\s*"(.*)"\\s*$`, 'm'))[1];
  const flux = [...md.matchAll(/^  - titre: "(.*)"\n    detail: ".*"\n    type: (\w+)/gm)].map((m) => ({ titre: m[1], type: m[2] }));
  return { titre: champ('titre'), outil: champ('outil'), etiquette: champ('etiquette'), flux };
}

async function portfolio(fichier, cas) {
  const l = 1200, h = 800, x0 = 90, x1 = 1110, yTrait = 520;
  const n = cas.flux.length;
  const pas = (x1 - x0) / (n - 1);
  let svg = `<line x1="${x0}" y1="${yTrait}" x2="${x1}" y2="${yTrait}" stroke="${C.ardoise}" stroke-width="3"/>`;
  cas.flux.forEach((e, i) => {
    const x = x0 + i * pas;
    if (e.type === 'humain') svg += `<path d="M${x} ${yTrait - 15} L${x + 15} ${yTrait + 12} L${x - 15} ${yTrait + 12} Z" fill="${C.terre}"/>`;
    else svg += `<circle cx="${x}" cy="${yTrait}" r="13" fill="${e.type === 'sortie' ? C.ardoise : C.papier}" stroke="${C.ardoise}" stroke-width="3"/>`;
  });
  svg += `<g transform="translate(90 70) scale(1.6)">${marque(C.encre)}</g><rect x="0" y="770" width="${l}" height="30" fill="${C.encre}"/>`;
  const calques = [
    { input: await titre('Cap IA', { taille: 30, largeur: 300, couleur: C.encre, poids: 'SemiBold' }), left: 150, top: 80 },
    { input: await texte(`${cas.etiquette} · ${cas.outil}`, { taille: 24, largeur: 1020, couleur: C.douce }), left: 90, top: 175 },
    { input: await titre(cas.titre, { taille: 50, largeur: 1020, couleur: C.encre }), left: 90, top: 220 },
  ];
  const largeurEtiquette = Math.min(220, pas - 10);
  for (const [i, e] of cas.flux.entries()) {
    const x = x0 + i * pas;
    const lib = await texte(e.titre, { taille: 21, largeur: Math.round(largeurEtiquette), couleur: e.type === 'humain' ? C.terre : C.encre, poids: 'SemiBold', align: i === 0 ? 'left' : i === n - 1 ? 'right' : 'centre' });
    const m = await taille(lib);
    const left = i === 0 ? x - 13 : i === n - 1 ? x + 13 - m.width : x - m.width / 2;
    calques.push({ input: lib, left: Math.round(left), top: yTrait + 34 });
  }
  calques.push({ input: await texte('cap-ia.pro/realisations', { taille: 22, largeur: 600, couleur: C.douce }), left: 90, top: 700 });
  await sharp(fond(l, h, C.papier, svg)).composite(calques).png({ compressionLevel: 9 }).toFile(join(sortie, 'portfolio', fichier));
}

for (const f of readdirSync(join(racine, 'src', 'content', 'realisations'))) {
  await portfolio(`portfolio-${f.replace(/\.md$/, '')}-1200x800.png`, lireCas(f));
}

// 5. Image de portfolio « offres » 1200 x 800.
{
  const offres = readdirSync(join(racine, 'src', 'content', 'offres')).map((f) => {
    const md = readFileSync(join(racine, 'src', 'content', 'offres', f), 'utf8');
    const champ = (n) => md.match(new RegExp(`^${n}:\\s*"(.*)"\\s*$`, 'm'))[1];
    return { ordre: Number(md.match(/^ordre:\s*(\d+)/m)[1]), nom: champ('titreCourt'), prix: champ('prixCarte'), detail: champ('prixDetail') };
  }).sort((a, b) => a.ordre - b.ordre);
  let svg = `<g transform="translate(90 70) scale(1.6)">${marque(C.encre)}</g><rect x="0" y="770" width="1200" height="30" fill="${C.encre}"/>`;
  offres.forEach((o, i) => { svg += `<rect x="${90 + i * 350}" y="330" width="320" height="300" rx="6" fill="${C.blanc}" stroke="${C.sable}" stroke-width="2"/>`; });
  const calques = [
    { input: await titre('Cap IA', { taille: 30, largeur: 300, couleur: C.encre, poids: 'SemiBold' }), left: 150, top: 80 },
    { input: await titre('Trois façons de travailler ensemble', { taille: 50, largeur: 1020, couleur: C.encre }), left: 90, top: 190 },
    { input: await texte('Appel découverte de 30 minutes, gratuit et sans engagement · cap-ia.pro', { taille: 22, largeur: 1020, couleur: C.douce }), left: 90, top: 690 },
  ];
  for (const [i, o] of offres.entries()) {
    const x = 90 + i * 350 + 30;
    calques.push({ input: await titre(o.nom, { taille: 30, largeur: 260, couleur: C.encre, poids: 'SemiBold' }), left: x, top: 365 });
    calques.push({ input: await titre(o.prix, { taille: 30, largeur: 260, couleur: C.terre }), left: x, top: 470 });
    calques.push({ input: await texte(o.detail, { taille: 20, largeur: 260, couleur: C.douce }), left: x, top: 525 });
  }
  await sharp(fond(1200, 800, C.papier, svg)).composite(calques).png({ compressionLevel: 9 }).toFile(join(sortie, 'portfolio', 'portfolio-offres-1200x800.png'));
}

console.log('Supports générés dans supports/.');
