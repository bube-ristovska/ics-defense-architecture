import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import Icon from './Icon.jsx';
import {
  LEVELS,
  CONDUITS,
  SVG_W,
  SVG_H,
  BAND_X,
  BAND_W,
  CONDUIT_X,
  TOP,
} from './purdueModel.js';
import { LEVEL5_CONTENT } from './level5Content.js';
import { LEVEL4_CONTENT } from './level4Content.js';
import { LEVEL3_CONTENT } from './level3Content.js';
import { LEVEL2_CONTENT } from './level2Content.js';
import { LEVEL1_CONTENT } from './level1Content.js';
import { LEVEL0_CONTENT } from './level0Content.js';
import { CROSSCUTTING_CONTENT } from './crossCuttingContent.js';

const CONTENT = {
  ...LEVEL5_CONTENT,
  ...LEVEL4_CONTENT,
  ...LEVEL3_CONTENT,
  ...LEVEL2_CONTENT,
  ...LEVEL1_CONTENT,
  ...LEVEL0_CONTENT,
  ...CROSSCUTTING_CONTENT,
};

// Every { list } block (except those marked plain) is an actionable hardening
// checklist. Item state is keyed by "<contentId>|<item text>" so it survives
// list reordering, and persisted in localStorage.
const CHECKS_STORAGE_KEY = 'ics-hardening-checklist-v1';
const VALID_CHECK_KEYS = new Set();
const CHECKLIST_TOTALS = {};
for (const [id, entry] of Object.entries(CONTENT)) {
  let n = 0;
  for (const b of entry.blocks) {
    if (b.list && !b.plain) {
      for (const item of b.list) VALID_CHECK_KEYS.add(`${id}|${item}`);
      n += b.list.length;
    }
  }
  if (n > 0) CHECKLIST_TOTALS[id] = n;
}
const TOTAL_CHECK_ITEMS = Object.values(CHECKLIST_TOTALS).reduce((a, b) => a + b, 0);

function loadChecks() {
  try {
    return JSON.parse(localStorage.getItem(CHECKS_STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

const ZOOM_MS = 750;

function zoomTransform(rect, pad, maxScale, vAnchor = 0.5) {
  const w = rect.w + pad * 2;
  const h = rect.h + pad * 2;
  const s = Math.min(SVG_W / w, SVG_H / h, maxScale);
  const cx = rect.x + rect.w / 2;
  const cy = rect.y + rect.h / 2;
  return `translate(${SVG_W / 2}px, ${SVG_H * vAnchor}px) scale(${s}) translate(${-cx}px, ${-cy}px)`;
}

function Checkbox({ done }) {
  return (
    <svg className="checkbox" viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
      <rect x="1" y="1" width="14" height="14" rx="3.5"
        fill={done ? '#0f766e' : '#fff'} stroke={done ? '#0f766e' : '#94a3b8'} strokeWidth="1.4" />
      {done && (
        <polyline points="4.2,8.4 7,11.2 11.8,5.4" fill="none" stroke="#fff"
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

function ContentBlocks({ blocks, contentId, checks, onToggle }) {
  return (
    <div className="content-blocks">
      {blocks.map((b, i) => {
        if (b.h) return <h3 key={i}>{b.h}</h3>;
        if (b.p) return <p key={i}>{b.p}</p>;
        if (b.list) {
          if (b.plain) return <ul key={i}>{b.list.map((li, j) => <li key={j}>{li}</li>)}</ul>;
          return (
            <ul key={i} className="checklist">
              {b.list.map((li, j) => {
                const key = `${contentId}|${li}`;
                const done = !!checks[key];
                return (
                  <li key={j} className={done ? 'done' : ''}>
                    <button type="button" onClick={() => onToggle(key)} aria-pressed={done}>
                      <Checkbox done={done} />
                      <span>{li}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          );
        }
        if (b.code) return <pre key={i} className="mono">{b.code}</pre>;
        if (b.links) return (
          <ul key={i} className="link-list">
            {b.links.map((link, j) => (
              <li key={j}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <span className="link-icon" aria-hidden="true">↗</span>{link.label}
                </a>
              </li>
            ))}
          </ul>
        );
        return null;
      })}
    </div>
  );
}

function Firewall({ cx, cy, color, label }) {
  return (
    <g className="firewall">
      <rect x={cx - 21} y={cy - 12} width="42" height="24" rx="3" fill="#fff" stroke={color} strokeWidth="1.5" />
      <line x1={cx - 21} y1={cy - 4} x2={cx + 21} y2={cy - 4} stroke={color} strokeWidth="0.8" />
      <line x1={cx - 21} y1={cy + 4} x2={cx + 21} y2={cy + 4} stroke={color} strokeWidth="0.8" />
      <line x1={cx - 10} y1={cy - 12} x2={cx - 10} y2={cy - 4} stroke={color} strokeWidth="0.8" />
      <line x1={cx + 10} y1={cy - 12} x2={cx + 10} y2={cy - 4} stroke={color} strokeWidth="0.8" />
      <line x1={cx} y1={cy - 4} x2={cx} y2={cy + 4} stroke={color} strokeWidth="0.8" />
      <line x1={cx - 10} y1={cy + 4} x2={cx - 10} y2={cy + 12} stroke={color} strokeWidth="0.8" />
      <line x1={cx + 10} y1={cy + 4} x2={cx + 10} y2={cy + 12} stroke={color} strokeWidth="0.8" />
      <text x={cx + 30} y={cy + 4} className="fw-label" fill={color}>{label}</text>
    </g>
  );
}

function Conduit({ conduit }) {
  const { y1, y2, color, firewall, id } = conduit;
  const mid = (y1 + y2) / 2;
  const down = `M ${CONDUIT_X} ${y1} L ${CONDUIT_X} ${y2}`;
  const up = `M ${CONDUIT_X} ${y2} L ${CONDUIT_X} ${y1}`;
  return (
    <g>
      <line x1={CONDUIT_X} y1={y1} x2={CONDUIT_X} y2={y2} stroke="#cbd5e1" strokeWidth="3" />
      <line x1={CONDUIT_X} y1={y1} x2={CONDUIT_X} y2={y2} stroke={color} strokeWidth="1" className="flowline" opacity="0.55" />
      {[0, 1].map((k) => (
        <circle key={`${id}-d${k}`} r="3" fill={color}>
          <animateMotion dur="2.2s" begin={`${k * 1.1}s`} repeatCount="indefinite" path={down} />
        </circle>
      ))}
      <circle r="2.4" fill="#fff" stroke={color} strokeWidth="1.2">
        <animateMotion dur="2.8s" begin="0.6s" repeatCount="indefinite" path={up} />
      </circle>
      {firewall && <Firewall cx={CONDUIT_X} cy={mid} color={color} label={firewall} />}
    </g>
  );
}

function Band({ level, focus, onFocusLevel, onFocusComponent, checkedCounts }) {
  const dimmed = focus && focus.levelId !== level.id;
  const busY = level.y + 82;
  const center = level.h / 2;
  return (
    <g className="band" style={{ opacity: dimmed ? 0.22 : 1, transition: 'opacity 0.7s ease' }}>
      <rect
        x={BAND_X} y={level.y} width={BAND_W} height={level.h}
        fill={level.tint} stroke="#d6dee8" strokeWidth="1" rx="4"
      />
      <rect x={BAND_X} y={level.y} width="5" height={level.h} fill={level.accent} rx="2" />

      {/* internal backplane bus */}
      <line
        x1={305} y1={busY} x2={BAND_X + BAND_W - 35} y2={busY}
        stroke={level.accent} strokeWidth="0.8" opacity="0.25"
        strokeDasharray="5 6" className="flowline"
      />

      {/* level label zone (clickable) */}
      <g className="label-zone" onClick={() => onFocusLevel(level)}>
        <rect x={BAND_X + 5} y={level.y} width={235} height={level.h} fill="transparent" />
        <text x={BAND_X + 52} y={level.y + center + 13} className="level-num" textAnchor="middle" fill={level.accent}>{level.num}</text>
        <text x={BAND_X + 96} y={level.y + center - 17} className="level-eyebrow">LEVEL {level.num}</text>
        <text x={BAND_X + 96} y={level.y + center + 5} className="level-name">{level.name}</text>
        <rect x={BAND_X + 96} y={level.y + center + 17} width={level.zone.length * 6.4 + 16} height="19" rx="2.5"
          fill="#fff" stroke={level.accent} strokeWidth="0.8" opacity="0.9" />
        <text x={BAND_X + 104} y={level.y + center + 30} className="zone-chip" fill={level.accent}>{level.zone}</text>
      </g>
      <line x1={BAND_X + 265} y1={level.y + 18} x2={BAND_X + 265} y2={level.y + level.h - 18}
        stroke="#d6dee8" strokeWidth="1" />

      {/* Ethernet switch bar, as in the reference diagram */}
      {level.bus && (
        <g>
          <rect x={305} y={level.y + level.busY} width={BAND_X + BAND_W - 35 - 305} height="15" rx="2"
            fill="#fff" stroke={level.accent} strokeWidth="0.8" opacity="0.9" />
          <text x={(305 + BAND_X + BAND_W - 35) / 2} y={level.y + level.busY + 11} textAnchor="middle"
            className="bus-label" fill={level.accent}>{level.bus}</text>
        </g>
      )}

      {/* components */}
      {level.components.map((c) => {
        const isFocused = focus && focus.compId === c.id;
        const compDim = focus && focus.levelId === level.id && focus.compId && !isFocused;
        const hasContent = !!CONTENT[c.id];
        const total = CHECKLIST_TOTALS[c.id] || 0;
        const done = Math.min(checkedCounts[c.id] || 0, total);
        const complete = hasContent && done >= total;
        return (
          <g
            key={c.id}
            className="comp"
            style={{ opacity: compDim ? 0.25 : 1, transition: 'opacity 0.7s ease' }}
            onClick={(e) => { e.stopPropagation(); onFocusComponent(level, c); }}
          >
            <title>
              {hasContent
                ? total > 0
                  ? `${c.name}: ${done}/${total} hardening items complete`
                  : c.name
                : `${c.name}: content pending`}
            </title>
            <rect className="comp-box" x={c.x} y={c.y} width={c.w} height={c.h} rx="5"
              fill="#ffffff" stroke="#b9c5d3" strokeWidth="1.2" />
            <rect x={c.x} y={c.y} width={c.w} height="4" rx="2" fill={level.accent} opacity="0.85" />
            <Icon type={c.icon} x={c.x + 15} y={c.y + (c.h - 26) / 2 + 2} color={level.accent} />
            <text x={c.x + 54} y={c.y + 40} className="comp-name">{c.name}</text>
            <text x={c.x + 54} y={c.y + 58} className="comp-sub">{c.sub}</text>
            <circle cx={c.x + c.w - 14} cy={c.y + 16} r="3"
              fill={!hasContent ? '#cbd5e1' : complete ? '#16a34a' : '#d97706'}
              className={complete ? 'status-dot' : ''} />
            {hasContent && total > 0 && !complete && (
              <text x={c.x + c.w - 22} y={c.y + 19} textAnchor="end" className="comp-progress">
                {done}/{total}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

export default function App() {
  const [focus, setFocus] = useState(null); // { levelId, compId?, title, tag, sub?, rect, accent }
  const [popupOpen, setPopupOpen] = useState(false);
  const [checks, setChecks] = useState(loadChecks);
  const stageRef = useRef(null);

  const toggleCheck = (key) =>
    setChecks((prev) => {
      const next = { ...prev };
      if (next[key]) delete next[key];
      else next[key] = true;
      localStorage.setItem(CHECKS_STORAGE_KEY, JSON.stringify(next));
      return next;
    });

  const resetChecks = () => {
    if (window.confirm('Clear all hardening checklist progress?')) {
      setChecks({});
      localStorage.removeItem(CHECKS_STORAGE_KEY);
    }
  };

  // Checked-item counts per content node, ignoring keys that no longer match
  // any current checklist item (e.g. after content edits).
  const checkedCounts = useMemo(() => {
    const counts = {};
    for (const key of Object.keys(checks)) {
      if (!VALID_CHECK_KEYS.has(key)) continue;
      const id = key.slice(0, key.indexOf('|'));
      counts[id] = (counts[id] || 0) + 1;
    }
    return counts;
  }, [checks]);

  const overallDone = useMemo(
    () => Object.values(checkedCounts).reduce((a, b) => a + b, 0),
    [checkedCounts],
  );
  const overallPct = TOTAL_CHECK_ITEMS ? Math.round((overallDone / TOTAL_CHECK_ITEMS) * 100) : 0;

  useEffect(() => {
    if (!focus) { setPopupOpen(false); return; }
    stageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const t = setTimeout(() => setPopupOpen(true), ZOOM_MS);
    return () => clearTimeout(t);
  }, [focus]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setFocus(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const focusLevel = (level) =>
    setFocus({
      levelId: level.id,
      compId: null,
      title: level.name,
      tag: `LEVEL ${level.num} · ${level.zone}`,
      rect: { x: BAND_X, y: level.y, w: BAND_W, h: level.h },
      accent: level.accent,
      contentId: level.id,
    });

  const focusComponent = (level, c) =>
    setFocus({
      levelId: level.id,
      compId: c.id,
      title: c.name,
      tag: `LEVEL ${level.num} · ${level.name.toUpperCase()}`,
      sub: c.sub,
      rect: { x: c.x, y: c.y, w: c.w, h: c.h },
      accent: level.accent,
      contentId: c.id,
    });

  const focusCrossCutting = () =>
    setFocus({
      levelId: null,
      compId: null,
      title: 'Cross-Cutting Controls',
      tag: 'ALL LEVELS · 5 THROUGH 0',
      rect: { x: BAND_X, y: TOP, w: BAND_W, h: SVG_H - TOP - 40 },
      accent: '#475569',
      contentId: 'crosscutting',
    });

  const worldTransform = focus
    ? zoomTransform(focus.rect, focus.compId ? 34 : 14, focus.compId ? 3.4 : 1.2, focus.compId ? 0.34 : 0.42)
    : 'translate(0px, 0px) scale(1)';

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l7.5 3v6c0 4.5-3.2 7.7-7.5 9-4.3-1.3-7.5-4.5-7.5-9V6Z" />
              <circle cx="12" cy="11.5" r="2.2" />
              <line x1="12" y1="13.7" x2="12" y2="17" />
            </svg>
          </div>
          <div>
            <h1>ICS DEFENSE ARCHITECTURE</h1>
            <p>Purdue Enterprise Reference Architecture · ISA-95 / IEC 62443</p>
          </div>
        </div>
        <div className="hardening-progress" title="Checked hardening items across all levels">
          <span className="hp-label mono">HARDENING PROGRESS</span>
          <div className="hp-bar">
            <div className="hp-fill" style={{ width: `${overallPct}%` }} />
          </div>
          <span className="hp-count mono">{overallDone}/{TOTAL_CHECK_ITEMS} · {overallPct}%</span>
          {overallDone > 0 && (
            <button type="button" className="hp-reset mono" onClick={resetChecks}>RESET</button>
          )}
        </div>
      </header>

      <div className="legend">
        <span><i className="swatch" style={{ background: '#1e40af' }} />IT traffic</span>
        <span><i className="swatch" style={{ background: '#0f766e' }} />OT telemetry</span>
        <span><i className="swatch" style={{ background: '#475569' }} />Fieldbus / process I-O</span>
        <span><i className="dot-swatch" style={{ background: '#d97706' }} />Checklist in progress</span>
        <span><i className="dot-swatch" style={{ background: '#16a34a' }} />Checklist complete</span>
        <button type="button" className="crosscutting-link" onClick={focusCrossCutting}>
          Cross-Cutting Controls (Inventory, Backup &amp; People)
        </button>
        <span className="legend-hint">Click any component or level to inspect</span>
      </div>

      <main className="stage" ref={stageRef}>
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="diagram"
          role="img"
          aria-label="Purdue model diagram, levels 5 through 0"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#eef2f7" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width={SVG_W} height={SVG_H} fill="url(#grid)" />

          <g className="world" style={{ transform: worldTransform }}>
            {CONDUITS.map((c) => <Conduit key={c.id} conduit={c} />)}
            {LEVELS.map((level) => (
              <Band
                key={level.id}
                level={level}
                focus={focus}
                onFocusLevel={focusLevel}
                onFocusComponent={focusComponent}
                checkedCounts={checkedCounts}
              />
            ))}
          </g>
        </svg>

        {focus && popupOpen && (() => {
          const entry = CONTENT[focus.contentId];
          const total = CHECKLIST_TOTALS[focus.contentId] || 0;
          const done = Math.min(checkedCounts[focus.contentId] || 0, total);
          return (
            <div className="modal-backdrop" onClick={() => setFocus(null)}>
              <div className={`modal ${entry ? 'modal-wide' : ''}`} onClick={(e) => e.stopPropagation()} style={{ borderTopColor: focus.accent }}>
                <div className="modal-tag mono" style={{ color: focus.accent }}>{focus.tag}</div>
                <h2>{focus.title}</h2>
                {focus.sub && <div className="modal-sub mono">{focus.sub}</div>}
                {total > 0 && (
                  <div className="modal-progress">
                    <div className="mp-bar">
                      <div className="mp-fill" style={{ width: `${Math.round((done / total) * 100)}%` }} />
                    </div>
                    <span className="mono">{done}/{total} HARDENING ITEMS</span>
                  </div>
                )}
                {entry
                  ? (
                    <div className="modal-body-scroll">
                      <ContentBlocks
                        blocks={entry.blocks}
                        contentId={focus.contentId}
                        checks={checks}
                        onToggle={toggleCheck}
                      />
                    </div>
                  )
                  : <div className="modal-body">Placeholder here</div>}
                <div className="modal-footer">
                  <span className="mono">ESC or click outside to return</span>
                  <button onClick={() => setFocus(null)}>Back to overview</button>
                </div>
              </div>
            </div>
          );
        })()}
      </main>
    </div>
  );
}
