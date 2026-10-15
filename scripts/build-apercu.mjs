// Compile une version d'aperçu non indexable (noindex, robots.txt fermé), quel que soit le système.
import { execSync } from 'node:child_process';
execSync('npx astro build', { stdio: 'inherit', env: { ...process.env, CAPIA_APERCU: '1' } });
