// Regenerates the findings kanban data from the replica.
// Loads NCM/registry-replica.html headless, reads FINDINGS and checks() from the
// seeded test data, and writes them into the BOARD_DATA block of findings-board.html.
// Usage: node NCM/export-board.mjs   (needs the playwright package)
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const dir = fileURLToPath(new URL('.', import.meta.url));
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage();
await page.goto(pathToFileURL(dir + 'registry-replica.html').href);
const data = await page.evaluate(() => {
  const txt = h => { const d = document.createElement('div'); d.innerHTML = String(h ?? '').replace(/<br>/g, '\n'); return d.textContent.trim(); };
  const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return {
    generated: new Date().toISOString().slice(0, 10),
    findings: FINDINGS.map((f, i) => ({ id: 'F' + String(i + 1).padStart(2, '0'), title: f.t, sev: f.sev, verified: f.ver, area: f.area, obs: f.obs, imp: f.imp, route: f.link.replace(/^#/, '') })),
    checks: checks().map(c => ({ id: 'C-' + slug(c.n), title: c.n, count: c.c, info: !!c.info, detail: txt(c.d) })),
  };
});
await browser.close();

const board = dir + 'findings-board.html';
const html = readFileSync(board, 'utf8');
const out = html.replace(/(<script id="board-data" type="application\/json">)[\s\S]*?(<\/script>)/, `$1\n${JSON.stringify(data, null, 1)}\n$2`);
writeFileSync(board, out);
console.log(`Wrote ${data.findings.length} findings and ${data.checks.length} checks to findings-board.html`);
