// Geometry + content model for the Purdue Enterprise Reference Architecture diagram.
// Structure mirrors the reference image: levels 5-0, no 3.5 layer,
// firewalls at the 5/4, 4/3 and 3/2 boundaries, Ethernet switch bars in 4/3/2.
// All coordinates are in SVG user units (viewBox space).

export const SVG_W = 1240;

export const BAND_X = 40;
export const BAND_W = 1160;
export const BAND_H = 150;
export const GAP = 44;
export const TOP = 40;

export const CONDUIT_X = BAND_X + BAND_W / 2; // 620

const COMP_AREA_X = 290;
const COMP_AREA_W = BAND_X + BAND_W - COMP_AREA_X - 25;
const COMP_W = 200;
const COMP_H = 84;

const RAW = [
  {
    id: 'l5',
    num: '5',
    name: 'Internet DMZ',
    zone: 'EXTERNAL',
    accent: '#1e40af',
    tint: '#f4f7fd',
    components: [
      { id: 'internet', name: 'Internet', sub: 'WAN · PUBLIC NETWORK', icon: 'globe' },
      { id: 'web', name: 'Web Servers', sub: 'PUBLIC SERVICES', icon: 'server' },
      { id: 'email', name: 'Email', sub: 'MAIL GATEWAY', icon: 'mail' },
    ],
  },
  {
    id: 'l4',
    num: '4',
    name: 'Enterprise Admin',
    zone: 'IT · ENTERPRISE',
    accent: '#1e40af',
    tint: '#f4f7fd',
    bus: 'ETHERNET SWITCH',
    components: [
      { id: 'auth', name: 'Authentication', sub: 'IDENTITY SERVICES', icon: 'key' },
      { id: 'desktops', name: 'Desktops', sub: 'OFFICE LAN', icon: 'monitor' },
      { id: 'databases', name: 'Databases', sub: 'BUSINESS DATA', icon: 'database' },
      { id: 'files', name: 'File Servers', sub: 'SHARED STORAGE', icon: 'server' },
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

export const SVG_H = TOP + RAW.length * (BAND_H + GAP) - GAP + 40;

export const LEVELS = RAW.map((lvl, i) => {
  const y = TOP + i * (BAND_H + GAP);
  const n = lvl.components.length;
  const spacing = (COMP_AREA_W - n * COMP_W) / (n + 1);
  return {
    ...lvl,
    y,
    h: BAND_H,
    components: lvl.components.map((c, j) => ({
      ...c,
      x: COMP_AREA_X + spacing + j * (COMP_W + spacing),
      y: y + 40,
      w: COMP_W,
      h: COMP_H,
    })),
  };
});

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
