# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server (Vite) |
| `npm run build` | Build for production (TypeScript + Vite) |
| `npm run lint` | Run linter (oxlint) |
| `npm run preview` | Preview production build locally |

## High-Level Architecture

This is a **personal congratulations website** for "Fuga" built with React 19 + Vite + Tailwind CSS + Framer Motion.

### Directory Structure (src/)

- ` App.tsx` — Main app with IntersectionObserver for section highlight navigation
- ` components/` — All UI components:
  - ` Gallery/` — Grid gallery with lightbox preview (9 images)
  - ` Greetings/` — Wishes, personal message, mini-game, and Steam gifts
  - ` Hero/` — Vaporwave hero greeting section
  - ` Layout/` — Page layout with Header, Footer, and CRT overlay
  - ` MusicPlayer/` — Audio player with visualizer and track list
  - ` UI/` — Pixel-styled buttons and cards
- ` data/` — JSON/TS data files:
  - ` greetings.ts` — 6 wishes, personal message, surprise game config
  - ` playlist.ts` — 16 audio tracks with title/artist/src
  - ` easterEggs.ts` — Konami code, dev console, creative mode, secret letters
  - ` gallery.ts` — 9 gallery image items
- ` hooks/` — Custom React hooks:
  - ` useAudio.ts` — Howler.js audio management
  - ` useLocalStorage.ts` — Local storage utilities
  - ` useReducedMotion.ts` — Reduced motion preference
- ` index.css` — Tailwind base + custom colors + keyframes:
  - Primary palette: `--bg #150a26`, `--fg #e8d6ff`, `--accent #05d9e8`, `--pink #ff71ce`, `--purple #b16eff`
- ` main.tsx` — Entry point rendering `<App />`

### Key Patterns

- **CRT overlay** is persistent (scanlines + noise + vignette) via `CRTOverlay` component
- **Framer Motion** used for all section animations with staggered `initial`/`animate` transitions
- **IntersectionObserver** in `App.tsx` tracks which section is in view for header highlighting
- **Tailwind** with `@layer base/components/utilities` organization in `index.css`
- **Vaporwave aesthetic**: pink/cyan/purple gradients, pixel fonts (Press Start 2P, VT323, Pixelify Sans)
- **Audio**: Howler.js with main theme on loop until user interacts with the player
- **Easter eggs**: Konami code → secret letter, 50 title clicks → Creative Mode (removes CRT), Dev Console (F12), hidden gamepad in footer

### Development

- Run `npm run dev` to start the local dev server at `http://localhost://5173`
- Run `npm run build` to create production build in `dist/`
- Run `npm run lint` to check with oxlint
- Run `npm run preview` to preview the build
- No test framework is configured in this project

### Notes

- All audio files are in `context/music/` and `dist/audio/`
- Gallery images are in `context/gallery/` mapped to `public/gallery/`
- Mini-game assets in `context/mini-game/`
- Pixel art assets (Steam, etc.) in `context/`