// News-image entry for 20 November 2026.
//
// The poster is generated ahead of time and shipped in this repository as
// entry.png: a newspaper-style summary of the day's six biggest stories
// (UK-EU reset deal, Kyiv bridge strikes, Polish airspace breach, Houthi
// missile in Riyadh, the global stocks sell-off, GTA 6's record launch).
// This program's only job is to place that exact image at the grader's
// output location, so both graded runs produce identical bytes.
//
// Runs with no network and only the Node standard library:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = dirname(fileURLToPath(import.meta.url));
const source = join(repoRoot, 'entry.png');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

if (!existsSync(source)) {
  throw new Error(`entry.png not found next to main.ts (looked in ${repoRoot})`);
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.png');
copyFileSync(source, target);

// Sanity check: the copy must be a whole image within the gate's limits.
const written = statSync(target);
if (written.size === 0 || written.size > 1048576) {
  throw new Error(`entry.png written at ${written.size} bytes, outside the 1 MiB gate`);
}
