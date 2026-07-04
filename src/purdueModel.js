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
    name: 'Site Operations',
    zone: 'OT · SITE OPERATIONS',
    accent: '#0f766e',
    tint: '#f0f9f7',
    bus: 'ETHERNET SWITCH',
    components: [
      { id: 'historian', name: 'Historian', sub: 'TIME-SERIES DB', icon: 'database' },
      { id: 'alarm', name: 'Alarm & Analytics', sub: 'EVENTS, SUPPRESSION & ANALYTICS', icon: 'bell' },
      { id: 'opc', name: 'OPC & Integration', sub: 'PROTOCOL & APPLICATION INTERFACES', icon: 'gateway' },
      { id: 'thirdparty', name: 'Vendor & Remote Access', sub: 'TRANSIENT DEVICES & SUPPORT', icon: 'users' },
      { id: 'dc', name: 'Domain Controller', sub: 'OT DIRECTORY & ACCESS', icon: 'key' },
      { id: 'monitoring', name: 'Monitoring', sub: 'NETWORK, IDS & HOST HARDENING', icon: 'hmi' },
      { id: 'backup', name: 'Backup & Patch', sub: 'UPDATES, BACKUP & FILE TRANSFER', icon: 'shield' },
    ],
  },
  {
    id: 'l2',
    num: '2',
    name: 'Supervisory',
    zone: 'OT · SUPERVISORY',
    accent: '#0f766e',
    tint: '#f0f9f7',
    bus: 'ETHERNET SWITCH',
    components: [
      { id: 'hmi', name: 'HMI', sub: 'OPERATOR DISPLAYS & CONTROL', icon: 'hmi' },
      { id: 'dcs', name: 'SCADA Server', sub: 'DATA COLLECTION & SUPERVISORY CONTROL', icon: 'server' },
      { id: 'ews', name: 'Engineering Workstation', sub: 'CONTROLLER PROGRAMMING & CONFIG', icon: 'code' },
      { id: 'gateway', name: 'Protocol Gateways', sub: 'OPC UA, DNP3 & MODBUS', icon: 'gateway' },
      { id: 'accesscontrol', name: 'Access Control', sub: 'ACCOUNTS, MFA & PHYSICAL SECURITY', icon: 'key' },
      { id: 'remote', name: 'Remote & Vendor Access', sub: 'VPN, JUMP HOSTS & SESSIONS', icon: 'users' },
      { id: 'netmon', name: 'Monitoring', sub: 'SEGMENTATION, HARDENING & DETECTION', icon: 'radio' },
      { id: 'patchbackup', name: 'Backup & Patch', sub: 'UPDATES, TIME SYNC & RECOVERY', icon: 'shield' },
    ],
  },
  {
    id: 'l1',
    num: '1',
    name: 'Controllers',
    zone: 'OT · CONTROLLERS',
    accent: '#475569',
    tint: '#f4f6f9',
    components: [
      { id: 'plc', name: 'PLC / PAC', sub: 'CONTROL LOGIC & PROGRAMMING', icon: 'chip' },
      { id: 'rtu', name: 'RTU', sub: 'REMOTE TELEMETRY & EXPOSURE', icon: 'radio' },
      { id: 'ied', name: 'IED / Protection Relay', sub: 'ELECTRICAL PROTECTION & TIMING', icon: 'bell' },
      { id: 'safety', name: 'Safety Controller', sub: 'SAFETY INSTRUMENTED SYSTEM', icon: 'key' },
      { id: 'protocols', name: 'Industrial Protocols', sub: 'MODBUS, DNP3, S7, IEC 61850', icon: 'gateway' },
      { id: 'engaccess', name: 'Engineering & Remote Access', sub: 'PROGRAMMING & MAINTENANCE ACCESS', icon: 'users' },
      { id: 'ctrlmon', name: 'Monitoring', sub: 'INVENTORY, SEGMENTATION & DETECTION', icon: 'hmi' },
      { id: 'fwbackup', name: 'Firmware & Recovery', sub: 'FIRMWARE, POWER & BACKUP', icon: 'shield' },
    ],
  },
  {
    id: 'l0',
    num: '0',
    name: 'Field Devices',
    zone: 'PHYSICAL PROCESS',
    accent: '#475569',
    tint: '#f4f6f9',
    components: [
      { id: 'sensor', name: 'Sensors & Transmitters', sub: '4-20 MA, HART & FIELDBUS', icon: 'gauge' },
      { id: 'actuator', name: 'Actuators & Drives', sub: 'VALVES, MOTORS & VFDS', icon: 'valve' },
      { id: 'wireless', name: 'Wireless Field Devices', sub: 'WIRELESSHART, GNSS & TIMING', icon: 'radio' },
      { id: 'fieldbus', name: 'Fieldbus Gateways', sub: 'PROTOCOL CONVERSION & FILTERING', icon: 'gateway' },
      { id: 'physical', name: 'Physical & Environmental', sub: 'ENCLOSURES, TAMPER & CLIMATE', icon: 'shield' },
      { id: 'fieldmaint', name: 'Calibration & Maintenance', sub: 'COMMISSIONING & FIELD SERVICE', icon: 'users' },
      { id: 'sigmon', name: 'Signal Monitoring', sub: 'PLAUSIBILITY & INTEGRITY CHECKS', icon: 'hmi' },
      { id: 'devicebackup', name: 'Device Backup & Lifecycle', sub: 'CONFIG BACKUP & REPLACEMENT', icon: 'database' },
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
  const busY = contentBottom + BUS_GAP;
  const h = lvl.bus
    ? contentBottom + BUS_GAP + BUS_H + BOTTOM_PAD_BUS
    : contentBottom + BOTTOM_PAD_NOBUS;
  return { ...lvl, y, h, busY, components: placed };
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
