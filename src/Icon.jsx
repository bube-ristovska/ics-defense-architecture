// Minimal 24x24 line icons, drawn to match a thin engineering-schematic style.
const GLYPHS = {
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </>
  ),
  cloud: (
    <path d="M6.5 17h10.5a3.5 3.5 0 0 0 .5-6.96A5 5 0 0 0 7.8 8.9 4.1 4.1 0 0 0 6.5 17Z" />
  ),
  users: (
    <>
      <circle cx="9" cy="8.6" r="3.2" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <circle cx="16.8" cy="10" r="2.4" />
      <path d="M15.2 15.2a4.8 4.8 0 0 1 5.6 3.8" />
    </>
  ),
  server: (
    <>
      <rect x="4" y="4" width="16" height="7" rx="1.5" />
      <rect x="4" y="13" width="16" height="7" rx="1.5" />
      <circle cx="7.6" cy="7.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="7.6" cy="16.5" r="0.9" fill="currentColor" stroke="none" />
      <line x1="11.5" y1="7.5" x2="17" y2="7.5" />
      <line x1="11.5" y1="16.5" x2="17" y2="16.5" />
    </>
  ),
  monitor: (
    <>
      <rect x="3.5" y="4.5" width="17" height="11.5" rx="1.5" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="16" x2="12" y2="20" />
    </>
  ),
  hmi: (
    <>
      <rect x="3.5" y="4.5" width="17" height="11.5" rx="1.5" />
      <polyline points="6.5,12.5 9.5,9 12,11.5 15,7.5 17.5,9.5" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="16" x2="12" y2="20" />
    </>
  ),
  code: (
    <>
      <rect x="3.5" y="4.5" width="17" height="11.5" rx="1.5" />
      <polyline points="9.5,8 7,10.2 9.5,12.5" />
      <polyline points="14.5,8 17,10.2 14.5,12.5" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="16" x2="12" y2="20" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <polyline points="4.5,7.5 12,13 19.5,7.5" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6" />
      <path d="M4.5 12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7.5 3v6c0 4.5-3.2 7.7-7.5 9-4.3-1.3-7.5-4.5-7.5-9V6Z" />
      <polyline points="9,11.5 11.2,13.7 15.2,9.5" />
    </>
  ),
  gateway: (
    <>
      <rect x="3.5" y="8" width="17" height="8" rx="2" />
      <line x1="7" y1="12" x2="15.5" y2="12" />
      <polyline points="13.5,9.5 16,12 13.5,14.5" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="14.5" r="4" />
      <line x1="11" y1="11.5" x2="19.5" y2="3.5" />
      <line x1="16" y1="7" x2="18.5" y2="9.5" />
    </>
  ),
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
      <rect x="9.5" y="9.5" width="5" height="5" />
      <line x1="9" y1="6" x2="9" y2="3" />
      <line x1="12" y1="6" x2="12" y2="3" />
      <line x1="15" y1="6" x2="15" y2="3" />
      <line x1="9" y1="21" x2="9" y2="18" />
      <line x1="12" y1="21" x2="12" y2="18" />
      <line x1="15" y1="21" x2="15" y2="18" />
    </>
  ),
  radio: (
    <>
      <rect x="6.5" y="11" width="11" height="8" rx="1" />
      <line x1="12" y1="11" x2="12" y2="5" />
      <path d="M8.2 6.8a5.4 5.4 0 0 1 7.6 0" />
      <circle cx="9.5" cy="15" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  bell: (
    <>
      <path d="M6 17h12l-1.5-2.2v-4.3A4.5 4.5 0 0 0 12 6a4.5 4.5 0 0 0-4.5 4.5v4.3Z" />
      <path d="M10.5 19.5a1.8 1.8 0 0 0 3 0" />
      <line x1="12" y1="3.5" x2="12" y2="6" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 16a8 8 0 1 1 16 0" />
      <line x1="12" y1="16" x2="16.2" y2="10.2" />
      <circle cx="12" cy="16" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  valve: (
    <>
      <path d="M5 8.5l7 3.5-7 3.5Z" />
      <path d="M19 8.5l-7 3.5 7 3.5Z" />
      <line x1="12" y1="12" x2="12" y2="6" />
      <line x1="9" y1="6" x2="15" y2="6" />
    </>
  ),
  motor: (
    <>
      <circle cx="10" cy="12" r="5.5" />
      <circle cx="10" cy="12" r="2" />
      <line x1="15.5" y1="12" x2="20.5" y2="12" />
      <line x1="10" y1="17.5" x2="10" y2="20" />
      <line x1="6.5" y1="20" x2="13.5" y2="20" />
    </>
  ),
};

export default function Icon({ type, x, y, size = 26, color = '#334155' }) {
  return (
    <svg
      x={x}
      y={y}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color }}
    >
      {GLYPHS[type] || GLYPHS.server}
    </svg>
  );
}
