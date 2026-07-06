# ICS Defense Architecture

An interactive Purdue Model hardening guide for Industrial Control Systems, built with React and Vite. The app renders the full Purdue Enterprise Reference Architecture (Levels 5 through 0) as an animated SVG diagram. Every level and component opens into structured, cost-aware hardening guidance aligned with NIST SP 800-82, IEC 62443 and MITRE ATT&CK for ICS.

## Features

- **Interactive Purdue diagram** — click any level band or component to zoom in and read its hardening guidance; animated data flows, firewalls and Ethernet switch bars mirror a real reference architecture.
- **Full coverage, Levels 5–0** — corporate IT, business and logistics systems, site operations, supervisory (HMI/SCADA/EWS), controllers (PLC/RTU/SIS) and field devices, plus cross-cutting controls (inventory, backup, people) that span all levels.
- **Actionable hardening checklists** — every listed hardening measure is a checkable item. Progress persists in the browser (localStorage), each component shows its completion state on the diagram (amber = in progress, green = complete), and an overall progress bar tracks the whole site.
- **Threat-informed content** — techniques are mapped to MITRE ATT&CK for ICS and grounded in documented incidents (Stuxnet, Ukraine 2015, NotPetya, Colonial Pipeline, TRITON, PIPEDREAM).
- **Resource links** — each component ends with links to the standards, tools and platforms needed to implement the guidance (NIST publications, CISA advisories, Wazuh, Zeek, Suricata, OPC Foundation, and more).

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

To create a production build:

```bash
npm run build
```

## Project structure

| File | Purpose |
|------|---------|
| `src/purdueModel.js` | Diagram data and geometry: levels, components, layout |
| `src/level5Content.js` … `src/level0Content.js` | Hardening guidance per Purdue level, keyed by component id |
| `src/crossCuttingContent.js` | Controls that span all levels (inventory, backup, people) |
| `src/App.jsx` | Diagram rendering, zoom interaction, checklist state, modal |
| `src/Icon.jsx` | Line-icon library for diagram components |

To add or edit content, modify the relevant `level*Content.js` file. Content blocks support headings (`h`), paragraphs (`p`), checkable lists (`list`), plain lists (`list` + `plain: true`), code snippets (`code`) and resource links (`links`).
