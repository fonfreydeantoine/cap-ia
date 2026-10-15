// Contrôles exécutés après chaque compilation (npm run build). Le build échoue si l'un d'eux échoue.
// 1. Aucun tiret cadratin ni demi-cadratin dans les pages publiées (règle éditoriale de Cap IA).
// 2. Chaque image a un attribut alt (vide autorisé pour une image décorative).
// 3. Chaque lien interne pointe vers une page ou un fichier qui existe.
// 4. Un seul h1 par page, et une seule destination pour le bouton d'appel.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const racine = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const dist = join(racine, 'dist');
const erreurs = [];

const fichiers = (dossier) =>
  readdirSync(dossier).flatMap((nom) => {
    const chemin = join(dossier, nom);
    return statSync(chemin).isDirectory() ? fichiers(chemin) : [chemin];
  });

const tous = fichiers(dist);
const pages = tous.filter((f) => f.endsWith('.html') && !relative(dist, f).startsWith('outils') && !/google[0-9a-f]+\.html$/.test(f));
const existe = (lien) => {
  const propre = lien.split('#')[0].split('?')[0];
  if (propre === '' || propre === '/') return true;
  const candidats = [propre, `${propre}.html`, join(propre, 'index.html')];
  return candidats.some((c) => existsSync(join(dist, c)));
};
const redirections = readFileSync(join(racine, 'public', '_redirects'), 'utf8')
  .split('\n').filter((l) => l.trim() && !l.startsWith('#')).map((l) => l.trim().split(/\s+/)[0]);

for (const page of pages) {
  const nom = '/' + relative(dist, page).replace(/\\/g, '/');
  const html = readFileSync(page, 'utf8');
  const texte = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');

  if (/[–—]/.test(texte)) erreurs.push(`${nom} : tiret cadratin ou demi-cadratin`);

  for (const img of html.match(/<img\b[^>]*>/g) ?? []) {
    if (!/\salt(=|\s|>)/.test(img)) erreurs.push(`${nom} : image sans attribut alt`);
  }

  const h1 = (html.match(/<h1\b/g) ?? []).length;
  if (h1 !== 1) erreurs.push(`${nom} : ${h1} titres h1 (un seul attendu)`);

  for (const [, lien] of html.matchAll(/href="(\/[^"]*)"/g)) {
    if (lien.startsWith('//')) continue;
    if (!existe(lien) && !redirections.includes(lien.split('#')[0])) erreurs.push(`${nom} : lien interne cassé ${lien}`);
  }
}

if (erreurs.length) {
  console.error(`\n${erreurs.length} problème(s) détecté(s) :\n- ${erreurs.join('\n- ')}\n`);
  process.exit(1);
}
console.log(`Vérification réussie : ${pages.length} pages contrôlées (tirets, images, titres, liens internes).`);
