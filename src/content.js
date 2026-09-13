import { LEVEL5_CONTENT } from './level5Content.js';
import { LEVEL4_CONTENT } from './level4Content.js';
import { LEVEL3_CONTENT } from './level3Content.js';
import { LEVEL2_CONTENT } from './level2Content.js';
import { LEVEL1_CONTENT } from './level1Content.js';
import { LEVEL0_CONTENT } from './level0Content.js';
import { CROSSCUTTING_CONTENT } from './crossCuttingContent.js';
import { IDS_CONTENT } from './idsContent.js';

export const CONTENT = {
  ...LEVEL5_CONTENT,
  ...LEVEL4_CONTENT,
  ...LEVEL3_CONTENT,
  ...LEVEL2_CONTENT,
  ...LEVEL1_CONTENT,
  ...LEVEL0_CONTENT,
  ...CROSSCUTTING_CONTENT,
  ...IDS_CONTENT,
};

// Every { list } block (except those marked plain) is an actionable hardening
// checklist. Item state is keyed by "<contentId>|<item text>" so it survives
// list reordering, and persisted in localStorage.
export const VALID_CHECK_KEYS = new Set();
export const CHECKLIST_TOTALS = {};
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
export const TOTAL_CHECK_ITEMS = Object.values(CHECKLIST_TOTALS).reduce((a, b) => a + b, 0);
