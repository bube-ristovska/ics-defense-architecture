import {
  LEVELS,
  IDS_PARADIGMS,
  HYBRID_ROW,
} from './purdueModel.js';
import { CONTENT, CHECKLIST_TOTALS } from './content.js';

const STOP = new Set([
  'a', 'an', 'the', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'with', 'at',
  'by', 'from', 'as', 'is', 'are', 'be', 'this', 'that', 'it', 'its', 'into',
  'should', 'must', 'can', 'how', 'what', 'where', 'when', 'why', 'which',
  'do', 'does', 'about', 'any', 'all',
]);

const LABELS = (() => {
  const out = {
    crosscutting: { title: 'Cross-Cutting Controls', tag: 'ALL LEVELS · 5 THROUGH 0' },
    'ids-overview': { title: 'Intrusion Detection in ICS', tag: 'IDS PARADIGMS · ALL LEVELS' },
  };
  for (const level of LEVELS) {
    out[level.id] = { title: level.name, tag: `LEVEL ${level.num} · ${level.zone}` };
    for (const c of level.components) {
      out[c.id] = { title: c.name, tag: `LEVEL ${level.num} · ${level.name.toUpperCase()}` };
    }
  }
  for (const p of [...IDS_PARADIGMS, HYBRID_ROW]) {
    out[p.id] = { title: p.title, tag: `IDS PARADIGM · ${p.levels}` };
  }
  return out;
})();

function tokens(text) {
  return String(text).toLowerCase().match(/[a-z]+|[0-9]+/g)?.filter((t) => !STOP.has(t) && (t.length > 1 || /[0-9]/.test(t))) || [];
}

const CHUNKS = [];
for (const [id, entry] of Object.entries(CONTENT)) {
  const meta = LABELS[id] || { title: id, tag: '' };
  let heading = meta.title;
  for (const b of entry.blocks) {
    if (b.h) {
      heading = b.h;
      CHUNKS.push({
        id, heading, title: meta.title, tag: meta.tag,
        kind: 'heading', text: `${meta.title} ${meta.tag} ${b.h}`,
      });
    } else if (b.p) {
      CHUNKS.push({
        id, heading, title: meta.title, tag: meta.tag,
        kind: 'p', text: b.p,
      });
    } else if (b.list) {
      CHUNKS.push({
        id, heading, title: meta.title, tag: meta.tag,
        kind: b.plain ? 'plain' : 'list',
        text: b.list.join(' '),
        items: b.list,
      });
    }
  }
}

const DF = new Map();
for (const chunk of CHUNKS) {
  const uniq = new Set(tokens(`${chunk.title} ${chunk.heading} ${chunk.text}`));
  for (const t of uniq) DF.set(t, (DF.get(t) || 0) + 1);
}
const N = CHUNKS.length;
const idf = (t) => Math.log((N + 1) / ((DF.get(t) || 0) + 1)) + 1;

function scoreChunk(chunk, terms, focusId) {
  const title = chunk.title.toLowerCase();
  const heading = chunk.heading.toLowerCase();
  const hay = `${title} ${chunk.tag} ${heading} ${chunk.text}`.toLowerCase();
  let score = 0;
  let hits = 0;
  for (const t of terms) {
    if (!hay.includes(t)) continue;
    hits += 1;
    const w = idf(t);
    score += w;
    if (title.includes(t)) score += 4 * w;
    if (heading.includes(t)) score += 3 * w;
    if (chunk.tag.toLowerCase().includes(t)) score += 1.5 * w;
  }
  if (terms.includes('ai') && /\bai\b|artificial intelligence/.test(hay)) score += 8;
  if (focusId && chunk.id === focusId) score += 8;
  if (chunk.items) {
    for (const item of chunk.items) {
      const it = item.toLowerCase();
      if (terms.length && terms.every((t) => it.includes(t))) score += 20;
    }
  }
  if (hits === 0) return 0;
  if (hits === 1 && terms.length > 2) score *= 0.45;
  return score;
}

function remainingFor(contentId, checks) {
  const entry = CONTENT[contentId];
  if (!entry) return [];
  const left = [];
  for (const b of entry.blocks) {
    if (!b.list || b.plain) continue;
    for (const item of b.list) {
      if (!checks[`${contentId}|${item}`]) left.push(item);
    }
  }
  return left;
}

function isProgressQuery(q) {
  return /\b(left|remain|remaining|progress|unchecked|todo|incomplete|still open|open items|checklist items)\b/i.test(q);
}

export const SUGGESTIONS = [
  'What should I harden first at Level 5?',
  'How does hybrid IDS map to Purdue levels?',
  'What is the AI policy for OT data?',
  'Which checklist items are still open?',
];

export function answerQuestion(query, { checks = {}, focusId = null } = {}) {
  const q = query.trim();
  if (!q) return null;
  const terms = tokens(q);
  if (!terms.length && !isProgressQuery(q)) {
    return {
      title: 'Need a more specific question',
      body: 'Ask about a Purdue level, component, IDS paradigm, or a control from this guide. Answers stay inside the text already in the app.',
      hits: [],
      remaining: [],
    };
  }

  if (isProgressQuery(q)) {
    const target = focusId && CHECKLIST_TOTALS[focusId] ? focusId : null;
    if (target) {
      const left = remainingFor(target, checks);
      const meta = LABELS[target];
      const total = CHECKLIST_TOTALS[target] || 0;
      const done = total - left.length;
      return {
        title: `${meta.title}: ${done}/${total} complete`,
        body: left.length
          ? `Open hardening items on ${meta.title}.`
          : `Every checklist item on ${meta.title} is marked complete.`,
        hits: [],
        remaining: left.slice(0, 12),
        remainingId: target,
        remainingTitle: meta.title,
      };
    }

    const rows = Object.entries(CHECKLIST_TOTALS)
      .map(([id, total]) => {
        const left = remainingFor(id, checks);
        return { id, total, left: left.length, title: LABELS[id]?.title || id, tag: LABELS[id]?.tag || '' };
      })
      .filter((r) => r.left > 0)
      .sort((a, b) => b.left - a.left)
      .slice(0, 8);

    if (!rows.length) {
      return {
        title: 'All checklist items are complete',
        body: 'Every hardening item in this guide is checked. Use Reset in the header if you want to start again.',
        hits: [],
        remaining: [],
      };
    }

    return {
      title: 'Open hardening work',
      body: 'These nodes still have unchecked items. Open one to continue, or click a component on the diagram.',
      hits: rows.map((r) => ({
        id: r.id,
        title: r.title,
        tag: r.tag,
        heading: `${r.total - r.left}/${r.total} complete · ${r.left} remaining`,
        excerpt: '',
      })),
      remaining: [],
    };
  }

  const ranked = CHUNKS
    .map((chunk) => ({ chunk, score: scoreChunk(chunk, terms, focusId) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  let pool = ranked;
  if (terms.includes('ai')) {
    const aiOnly = ranked.filter(({ chunk }) =>
      /\bai\b|artificial intelligence/.test(`${chunk.heading} ${chunk.text}`.toLowerCase())
    );
    if (aiOnly.length) pool = aiOnly;
  }

  if (!pool.length) {
    return {
      title: 'Nothing in this guide matched',
      body: 'Try a component name (HMI, PLC, historian), a Purdue level, or a control such as MFA, backup, or segmentation. The advisor only searches the text already in this app.',
      hits: [],
      remaining: [],
    };
  }

  const seen = new Set();
  const hits = [];
  for (const { chunk } of pool) {
    const key = `${chunk.id}|${chunk.heading}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const excerpt = chunk.kind === 'p'
      ? chunk.text
      : chunk.items
        ? chunk.items.slice(0, 3).join(' · ')
        : chunk.heading;
    hits.push({
      id: chunk.id,
      title: chunk.title,
      tag: chunk.tag,
      heading: chunk.heading,
      excerpt: excerpt.length > 280 ? `${excerpt.slice(0, 277)}…` : excerpt,
    });
    if (hits.length >= 4) break;
  }

  const top = pool[0].chunk;
  let body;
  if (top.kind === 'p') {
    body = top.text;
  } else if (top.items) {
    const quoted = top.items.filter((item) => {
      const it = item.toLowerCase();
      return terms.filter((t) => it.includes(t)).length >= Math.min(2, terms.length);
    }).slice(0, 4);
    body = (quoted.length ? quoted : top.items.slice(0, 3)).join(' · ');
  } else {
    body = `Closest match: ${top.title} — ${top.heading}. Open the node to read the full guidance and tick the checklist.`;
  }

  return {
    title: `${top.title} · ${top.heading}`,
    body,
    hits,
    remaining: [],
  };
}
