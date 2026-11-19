#!/usr/bin/env node

import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export function markdownDestination(raw) {
  const value = raw.trim();
  if (value.startsWith('<')) {
    const end = value.indexOf('>');
    return end === -1 ? value : value.slice(1, end);
  }
  const match = /^(?:\\.|\S)+/.exec(value);
  return (match?.[0] ?? '').replace(/\\([\\ ()])/g, '$1');
}

// GitHub's heading anchor: lowercase, punctuation removed, spaces as hyphens.
export function headingSlug(text) {
  return text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}\p{Pc} -]/gu, '')
    .replace(/ /g, '-');
}

// Anchors of every heading outside fenced code; repeats get -1, -2, ...
export function headingAnchors(content) {
  const anchors = new Set();
  const seen = new Map();
  let fenced = false;
  for (const line of content.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      fenced = !fenced;
      continue;
    }
    const heading = fenced ? null : /^#{1,6}\s+(.*?)\s*#*\s*$/.exec(line);
    if (!heading) continue;
    const base = headingSlug(heading[1]);
    const count = seen.get(base) ?? 0;
    anchors.add(count ? `${base}-${count}` : base);
    seen.set(base, count + 1);
  }
  return anchors;
}

if (process.argv.includes('--self-test')) {
  assert.equal(markdownDestination('README.md "Home"'), 'README.md');
  assert.equal(markdownDestination('<docs/My Guide.md> "Guide"'), 'docs/My Guide.md');
  assert.equal(markdownDestination('docs/My\\ Guide.md'), 'docs/My Guide.md');
  assert.equal(headingSlug('Gate 1: local commit'), 'gate-1-local-commit');
  assert.equal(headingSlug('1. Frame and research'), '1-frame-and-research');
  assert.equal(headingSlug('Use `foo_bar` & [links](x.md)'), 'use-foo_bar--links');
  assert.deepEqual(
    [...headingAnchors('# A\n```\n# Not a heading\n```\n## A\n## B ##')],
    ['a', 'a-1', 'b'],
  );
  console.log('Validator regression checks passed.');
  process.exit(0);
}

const root = resolve(process.argv[2] ?? dirname(dirname(fileURLToPath(import.meta.url))));
const problems = [];
const fail = (file, message) => problems.push(`${relative(root, file)}: ${message}`);

function markdownFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git') continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...markdownFiles(path));
    else if (entry.name.endsWith('.md')) files.push(path);
  }
  return files;
}

const markdown = markdownFiles(root);
const anchorCache = new Map();
const anchorsOf = (file) => {
  if (!anchorCache.has(file)) anchorCache.set(file, headingAnchors(readFileSync(file, 'utf8')));
  return anchorCache.get(file);
};
for (const file of markdown) {
  const content = readFileSync(file, 'utf8');
  for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const destination = markdownDestination(match[1]);
    if (/^[a-z][a-z0-9+.-]*:/i.test(destination)) continue;
    const hash = destination.indexOf('#');
    const target = hash === -1 ? destination : destination.slice(0, hash);
    const fragment = hash === -1 ? '' : decodeURIComponent(destination.slice(hash + 1));
    const path = target ? resolve(dirname(file), target) : file;
    if (!existsSync(path)) {
      fail(file, `broken link: ${match[1]}`);
      continue;
    }
    if (fragment && path.endsWith('.md') && !anchorsOf(path).has(fragment.toLowerCase())) {
      fail(file, `missing heading anchor: ${match[1]}`);
    }
  }
}

const playbooksDir = join(root, 'playbooks');
const playbookIndex = readFileSync(join(playbooksDir, 'INDEX.md'), 'utf8');
for (const name of readdirSync(playbooksDir).filter((name) => name.endsWith('.md') && name !== 'INDEX.md')) {
  if (!playbookIndex.includes(`(${name})`)) fail(join(playbooksDir, name), 'not listed in playbooks/INDEX.md');
}

if (problems.length) {
  console.error(`${problems.length} problem(s):`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

console.log(`Validated ${markdown.length} Markdown files and the playbook index.`);
