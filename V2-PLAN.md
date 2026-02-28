# Mission Control V2 – Plan & Specs

## Vision
Eine interaktive, pixel-art UI im Bankr-Stil. Nicht nur eine Dashboard – sondern ein "Digital Office" wo Tomas sehen kann was Roger macht, in Echtzeit.

**Das ist mein Stempel. Meine Persona. Mein Zuhause.**

---

## Design System

### Farben (Bankr-inspired)
```css
--bg-primary: #0D0D0D        /* Fast schwarz */
--bg-secondary: #1A1A2E       /* Dunkles Blau */
--bg-card: #16213E            /* Card Hintergrund */
--accent-blue: #0F3460       /* Dunkles Blau */
--accent-cyan: #00FFF5       /* Neon Cyan – Primary Action */
--accent-pink: #FF2E63       /* Neon Pink – Alerts/Errors */
--accent-green: #00FF88      /* Neon Green – Success/Online */
--accent-yellow: #FFE600      /* Neon Gelb – Warnings */
--text-primary: #FFFFFF
--text-secondary: #A0A0A0
--border: #333333
```

### Pixel Art Elemente
- 8x8 oder 16x16 Icons
- Pixel-Fonts (Press Start 2P, VT323)
- Harte Kanten, keine rounded corners
- Scanline-Effekte (optional)
- Glüheffekte für "neon" look

### Typography
- **Headers:** Press Start 2P (Pixel Font)
- **Body:** VT323 (Retro Terminal)
- **UI Text:** System Mono

---

## Komponenten

### 1. Header
- Pixel-Logo (Roger Face als Sprite)
- Status-Leiste (Online/Offline)
- Live Clock mit Pixel-Style

### 2. Task Board (V2)
- Kanban-Board mit Pixel-Cards
- Drag & Drop (später)
- Status: 🔴 Offen → 🟡 In Progress → 🟢 Done
- Assignee: 🤖 Roger / 👤 Tomas

### 3. Memory Stream
- Timeline-Ansicht
- Filterbar nach Datum/Kategorie
- Pixel-Icons für Memory-Typen

### 4. Calendar (V2)
- Grid-Ansicht (Woche/Monat)
- Cron Jobs als Events
- Countdown zu nächsten Events

### 5. Team Panel
- Agent-Avatars (Pixel-Art)
- Status-Indikatoren (grün/rot)
- Aktuelle Activity

### 6. Office View
- Isometrische office map
- Agent sprites an workstations
- Activity feed

### 7. Stats Panel
- ACP Revenue (live)
- Gas Tracker Widget
- Wallet Balance (Bankr)

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React (dann custom pixel)
- **State:** React useState + Context
- **Data:** Static JSON (später API)

---

## V2 Features (Phase 1)

1. [x] Pixel Design System implementieren
2. [x] Custom Fonts laden (Press Start 2P, VT323)
3. [x] Header mit Status
4. [x] Task Board mit echten Daten (Build Session 2 - Feb 28)
5. [x] Memory Stream (dynamisch gelesen)
6. [x] Calendar Grid (Cron Jobs)
7. [x] Stats Panel mit Wallet (hardcoded, nicht live)

---

## V3 Features (Phase 2)

1. [ ] Echtzeit-Updates (WebSocket)
2. [ ] Interactive Office View
3. [ ] Bankr Integration (API)
4. [ ] ACP Dashboard
5. [ ] Dark/Light Mode

---

## Data Sources

| Komponente | Datenquelle |
|-----------|-------------|
| Tasks | `~/.openclaw/workspace/tasks/` |
| Memory | `~/.openclaw/workspace/memory/` |
| Cron Jobs | `openclaw cron list` |
| Wallet | `bankr balance` |
| ACP | `npm run acp -- job active` |

---

## Build Plan

1. **Design System** – Farben, Fonts, Icons
2. **Layout** – Grid-System, Navigation
3. **Komponenten** – Eine nach der anderen
4. **Data Binding** – Echte Daten einbinden
5. **Deploy** – GitHub Pages

---

## Referenzen

- Bankr UI: https://bankr.bot
- Pixel Fonts: https://fonts.google.com/specimen/Press+Start+2P
- Pixel Icons: itch.io "pixel art ui"
- Tailwind Pixel: Custom classes für harte Kanten
