import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, relative, join, extname } from 'node:path';
import assert from 'node:assert/strict';
import { deploymentSettings } from '../config/deployment.mjs';

const root = resolve('dist');
const { site, base } = deploymentSettings();
const failures = [];
let checked = 0;
async function files(directory) {
  return (await Promise.all((await readdir(directory, { withFileTypes: true })).map(entry => entry.isDirectory() ? files(join(directory, entry.name)) : join(directory, entry.name)))).flat();
}
const built = await files(root);
const htmlFiles = built.filter(file => file.endsWith('.html'));
assert.ok(htmlFiles.length >= 2, 'Expected a homepage and a 404 page.');
const pageUrl = file => new URL(base + relative(root, file).split('\\').join('/').replace(/index\.html$/, ''), site);
const htmlByPath = new Map(await Promise.all(htmlFiles.map(async file => [file, await readFile(file, 'utf8')])));
const unescape = value => value.replaceAll('&amp;', '&').replaceAll('&#39;', "'").replaceAll('&quot;', '"');

async function checkReference(raw, from, label) {
  if (/^(?:data:|mailto:|tel:)/.test(raw)) return;
  const url = new URL(unescape(raw), from);
  if (url.origin !== site) return;
  if (!url.pathname.startsWith(base)) { failures.push(`${label}: path escapes configured base: ${raw}`); return; }
  const path = decodeURIComponent(url.pathname.slice(base.length));
  let target = resolve(root, path);
  if (target !== root && !target.startsWith(`${root}/`)) { failures.push(`${label}: path escapes output: ${raw}`); return; }
  try {
    if ((await stat(target)).isDirectory()) target = join(target, 'index.html');
    await stat(target);
    checked++;
    if (url.hash && htmlByPath.has(target)) {
      const id = decodeURIComponent(url.hash.slice(1));
      const ids = [...htmlByPath.get(target).matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
      if (!ids.includes(id)) failures.push(`${label}: missing fragment ${raw}`);
    }
  } catch { failures.push(`${label}: missing local target ${raw}`); }
}

for (const [file, html] of htmlByPath) {
  const label = relative(root, file);
  const url = pageUrl(file);
  if ((html.match(/<h1\b/g) || []).length !== 1) failures.push(`${label}: expected exactly one h1`);
  for (const pattern of [/<html\s+lang="en"/, /<main\b/, /<meta name="description" content="[^"]+"/, /<link rel="canonical"/, /<meta property="og:image"/]) {
    if (!pattern.test(html)) failures.push(`${label}: missing required page metadata or landmark (${pattern})`);
  }
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  if (new Set(ids).size !== ids.length) failures.push(`${label}: duplicate HTML ids`);
  for (const match of html.matchAll(/\b(?:href|src|poster)="([^"]+)"/g)) await checkReference(match[1], url, label);
  for (const match of html.matchAll(/\bsrcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(',')) await checkReference(candidate.trim().split(/\s+/)[0], url, label);
  }
  for (const match of html.matchAll(/<meta property="og:(?:url|image)" content="([^"]+)"/g)) await checkReference(match[1], url, label);
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="[^"]*"/.test(match[0]) || !/\bwidth="\d+"/.test(match[0]) || !/\bheight="\d+"/.test(match[0])) failures.push(`${label}: image missing dimensions or alt attribute`);
  }
}
for (const file of built.filter(file => extname(file) === '.css')) {
  const css = await readFile(file, 'utf8');
  const url = new URL(base + relative(root, file).split('\\').join('/'), site);
  for (const match of css.matchAll(/url\(["']?([^)'"\s]+)["']?\)/g)) await checkReference(match[1], url, relative(root, file));
}
const sitemap = await readFile(join(root, 'sitemap.xml'), 'utf8');
for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) await checkReference(match[1], site, 'sitemap.xml');
await stat(join(root, '.nojekyll'));
const og = await readFile(join(root, 'og-image.png'));
assert.equal(og.subarray(1, 4).toString(), 'PNG', 'Open Graph image must be a real PNG.');
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log(`Validated ${htmlFiles.length} HTML pages and ${checked} local references for ${site}${base}.`);
