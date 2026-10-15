import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Une offre = un fichier Markdown dans src/content/offres.
// Ajouter un fichier suffit : la page, la carte d'accueil, la page Offres et le sitemap suivent.
const offres = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/offres' }),
  schema: z.object({
    titre: z.string(),
    titreCourt: z.string(),
    ordre: z.number(),
    resume: z.string(),
    pourQui: z.string(),
    resultat: z.string(),
    prixCarte: z.string(),
    prixDetail: z.string().optional(),
    prixDepuis: z.number(),
    seoTitre: z.string(),
    seoDescription: z.string(),
  }),
});

// Une réalisation = un fichier Markdown dans src/content/realisations.
const etape = z.object({
  titre: z.string(),
  detail: z.string(),
  type: z.enum(['entree', 'outil', 'humain', 'sortie']),
});

const realisations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/realisations' }),
  schema: z.object({
    titre: z.string(),
    outil: z.string(),
    etiquette: z.string(),
    ordre: z.number(),
    phare: z.boolean().default(false),
    resume: z.string(),
    besoin: z.string(),
    outils: z.array(z.string()),
    flux: z.array(etape),
    miseAJour: z.coerce.date(),
    seoTitre: z.string(),
    seoDescription: z.string(),
  }),
});

export const collections = { offres, realisations };
