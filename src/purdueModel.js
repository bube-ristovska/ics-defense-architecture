// Geometry + content model for the Purdue Enterprise Reference Architecture diagram.
// Level 5 covers corporate IT: identity, endpoints, email, web and file/data
// infrastructure. Level 4 covers business and logistics systems: ERP,
// production planning, maintenance, logistics, plus the shared databases,
// identity/access and integration/API infrastructure that support them.
// All coordinates are in SVG user units (viewBox space).

export const SVG_W = 1240;

export const BAND_X = 40;
export const BAND_W = 1160;
export const GAP = 44;
export const TOP = 40;

export const CONDUIT_X = BAND_X + BAND_W / 2; // 620

const COMP_AREA_X = 290;
const COMP_AREA_W = BAND_X + BAND_W - COMP_AREA_X - 25;
const COMP_W = 200;
const COMP_H = 84;
const MAX_PER_ROW = 4;
const HEADER_PAD = 40;
const ROW_GAP = 14;
const BUS_GAP = 4;
const BUS_H = 15;
const BOTTOM_PAD_BUS = 7;
const BOTTOM_PAD_NOBUS = 20;

const RAW = [
  {
    id: 'l5',
    num: '5',
    name: 'Corporate IT',
    zone: 'IT · ENTERPRISE',
    accent: '#1e40af',
    tint: '#f4f7fd',
    components: [
      { id: 'internet', name: 'Internet', sub: 'WAN · PUBLIC NETWORK', icon: 'globe' },
      { id: 'web', name: 'Web Servers', sub: 'INTERNET-FACING SERVICES', icon: 'server' },
      { id: 'email', name: 'Email', sub: 'SPF · DKIM · DMARC', icon: 'mail' },
      { id: 'auth', name: 'Authentication', sub: 'IDENTITY, MFA & REMOTE ACCESS', icon: 'key' },
      { id: 'desktops', name: 'Desktops', sub: 'ENDPOINTS & WORKSTATIONS', icon: 'monitor' },
      { id: 'files', name: 'File Servers', sub: 'FILE STORAGE & BACKUP', icon: 'database' },
      { id: 'databases', name: 'Databases', sub: 'NETWORK & LOG INFRASTRUCTURE', icon: 'server' },
    ],
  },
  {
    id: 'l4',
    num: '4',
    name: 'Business Systems',
    zone: 'IT · BUSINESS OPERATIONS',
    accent: '#1e40af',
    tint: '#f4f7fd',
    bus: 'ETHERNET SWITCH',
    components: [
      { id: 'erp', name: 'ERP System', sub: 'ENTERPRISE RESOURCE PLANNING', icon: 'server' },
      { id: 'planning', name: 'Production Planning', sub: 'SCHEDULING & MES', icon: 'monitor' },
      { id: 'maintenance', name: 'Maintenance Mgmt', sub: 'CMMS / WORK ORDERS', icon: 'shield' },
      { id: 'logistics', name: 'Logistics', sub: 'WMS / TMS / EDI', icon: 'gateway' },
      { id: 'bizdb', name: 'Databases', sub: 'PRODUCTION & INVENTORY DATA', icon: 'database' },
      { id: 'access', name: 'Identity & Access', sub: 'ROLES, MFA & SEPARATION OF DUTIES', icon: 'key' },
      { id: 'integration', name: 'Integration & APIs', sub: 'MIDDLEWARE & THIRD-PARTY LINKS', icon: 'code' },
    ],
  },
  {
    id: 'l3',
    num: '3',
    name: 'Ops Admin',
    zone: 'OT · OPERATIONS',
    accent: '#0f766e',
    tint: '#f0f9f7',
    bus: 'ETHERNET SWITCH',
    components: [
      { id: 'historian', name: 'Historian', sub: 'TIME-SERIES DB', icon: 'database' },
      { id: 'dc', name: 'Domain Controller', sub: 'OT DIRECTORY', icon: 'key' },
      { id: 'monitoring', name: 'Monitoring', sub: 'HEALTH & IDS', icon: 'hmi' },
      { id: 'thirdparty', name: '3rd Party', sub: 'VENDOR ACCESS', icon: 'users' },
    ],
  },
  {
    id: 'l2',
    num: '2',
    name: 'Supervisory',
    zone: 'OT · DCS',
    accent: '#0f766e',
    tint: '#f0f9f7',
    bus: 'ETHERNET SWITCH',
    components: [
      { id: 'dcs', name: 'DCS System', sub: 'DISTRIBUTED CONTROL', icon: 'server' },
      { id: 'indpc', name: 'Industrial PC', sub: 'RUNTIME CONSOLE', icon: 'monitor' },
      { id: 'hmi', name: 'Local HMI', sub: 'OPERATOR VIEW', icon: 'hmi' },
    ],
  },
  {
    id: 'l1',
    num: '1',
    name: 'Control',
    zone: 'OT · CONTROLLERS',
    accent: '#475569',
    tint: '#f4f6f9',
    components: [
      { id: 'plc-a', name: 'PLC', sub: 'IEC 61131 LOGIC · A', icon: 'chip' },
      { id: 'plc-b', name: 'PLC', sub: 'IEC 61131 LOGIC · B', icon: 'chip' },
    ],
  },
  {
    id: 'l0',
    num: '0',
    name: 'Process',
    zone: 'FIELD DEVICES',
    accent: '#475569',
    tint: '#f4f6f9',
    components: [
      { id: 'actuator', name: 'Actuator', sub: 'VALVES · RELAYS', icon: 'valve' },
      { id: 'pump', name: 'Pump', sub: 'VFD · DRIVES', icon: 'motor' },
      { id: 'sensor', name: 'Sensor', sub: '4–20 mA · TEMP / PRESS', icon: 'gauge' },
    ],
  },
];

function layoutRow(items, rowIndex, levelY) {
  const k = items.length;
  const spacing = (COMP_AREA_W - k * COMP_W) / (k + 1);
  const y = levelY + HEADER_PAD + rowIndex * (COMP_H + ROW_GAP);
  return items.map((c, col) => ({
    ...c,
    x: COMP_AREA_X + spacing + col * (COMP_W + spacing),
    y,
    w: COMP_W,
    h: COMP_H,
  }));
}

function layoutLevel(lvl, y) {
  const n = lvl.components.length;
  const rows = Math.ceil(n / MAX_PER_ROW);
  const perRow = Math.ceil(n / rows);
  const placed = [];
  for (let r = 0; r < rows; r++) {
    const chunk = lvl.components.slice(r * perRow, (r + 1) * perRow);
    placed.push(...layoutRow(chunk, r, y));
  }
  const contentBottom = HEADER_PAD + rows * COMP_H + (rows - 1) * ROW_GAP;
  const h = lvl.bus
    ? contentBottom + BUS_GAP + BUS_H + BOTTOM_PAD_BUS
    : contentBottom + BOTTOM_PAD_NOBUS;
  return { ...lvl, y, h, components: placed };
}

export const LEVELS = (() => {
  let cursor = TOP;
  const out = [];
  for (const lvl of RAW) {
    const placedLevel = layoutLevel(lvl, cursor);
    out.push(placedLevel);
    cursor += placedLevel.h + GAP;
  }
  return out;
})();

export const SVG_H = LEVELS[LEVELS.length - 1].y + LEVELS[LEVELS.length - 1].h + 40;

// Conduits between adjacent bands; firewalls guard the 5/4, 4/3 and 3/2 boundaries.
export const CONDUITS = LEVELS.slice(0, -1).map((lvl, i) => {
  const next = LEVELS[i + 1];
  return {
    id: `gap-${i}`,
    y1: lvl.y + lvl.h,
    y2: next.y,
    color: i === 0 ? '#1e40af' : i <= 2 ? '#0f766e' : '#475569',
    firewall: i <= 2 ? `FW-${i + 1}` : null,
  };
});
