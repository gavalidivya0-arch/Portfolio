# Divya Gavali — Portfolio Design Document

Design system: **"Ink & Ember"** — warm, editorial, precise. Built for a full stack developer portfolio that reads premium without relying on generic dark-gradient templates.

---

## 1. Short Bio (Hero Section)

> **Divya Gavali**
> Full Stack Developer, based in Pune
> I build clean, fast web experiences — from React interfaces to Node/Express APIs backend by MongoDB. Currently sharpening my craft at NxtWave Institute of Advanced Technology.

**Alt shorter tagline (for nav/meta):**
> Full Stack Developer crafting clean, functional web experiences.

---

## 2. About Me Section

> I'm Divya, a full stack developer who enjoys turning ideas into working products — end to end. My comfort zone spans the whole stack: React and JavaScript on the frontend, Express and Node on the backend, MongoDB for data, and C++ for the problem-solving fundamentals that keep my logic sharp.
>
> I'm currently a student at NxtWave Institute of Advanced Technology, where I've been building real projects instead of just theory — which is exactly the kind of hands-on developer I want to be. I care about writing code that's readable, interfaces that feel intentional, and products that actually solve something.
>
> Right now, I'm looking for an internship where I can contribute to real-world systems, learn from experienced engineers, and keep growing as a full stack developer.

---

## 3. Visual Mood & Aesthetic Direction

**Concept name: "Ink & Ember"**

A premium, editorial-tech aesthetic — think a design studio's site crossed with a developer's precision. It avoids the generic "dark mode + purple-blue gradient + glassmorphism" template that's overused in fresher portfolios. Instead it leans into **high contrast, warm accent, generous whitespace, and confident typography** — the kind of restraint that reads as expensive rather than decorative.

**Mood keywords:** Confident · Warm · Precise · Editorial · Uncluttered

**What to avoid:** neon purple/blue gradients, default glassmorphism cards, emoji-heavy sections, stock "coding" hero images, cursor-particle-explosion effects, Bootstrap-default spacing.

---

## 4. Color Palette

| Role | Color | Hex | Usage |
|---|---|---|---|
| Base (dark mode primary) | Near-black charcoal | `#0F0E0C` | Background |
| Base secondary | Deep espresso | `#1A1815` | Section alternation, cards |
| Foreground | Warm off-white | `#F5F1E8` | Body text, headings |
| Muted foreground | Warm grey | `#A8A29B` | Secondary text, captions |
| **Accent (signature)** | Ember copper | `#D97A3F` | CTAs, links, highlights, cursor accents |
| Accent secondary | Muted gold | `#C9A661` | Hover states, subtle glows |
| Border/hairline | Soft bronze-grey | `#3A362F` | Card borders, dividers (1px, low opacity) |
| Success/tag | Sage green | `#8FA382` | Tech tags, status indicators |

**Light mode variant (optional toggle):**
| Role | Hex |
|---|---|
| Background | `#FBF9F4` |
| Foreground | `#1A1815` |
| Accent | `#B85C2E` (deepened copper for contrast) |
| Card | `#F2EDE3` |

**Why this works:** warm neutrals + a single confident accent (copper/ember) reads intentional and premium — it's the palette of design studios and boutique agencies, not dev bootcamp templates. Never use more than one accent color per section.

---

## 5. Typography

**Display / Headings:** `Fraunces` (serif, variable weight) — used for hero name, section titles, project names. Its warm, slightly quirky serif gives the "editorial" premium feel.

**Body / UI:** `Inter` or `General Sans` — clean, neutral sans-serif for paragraphs, nav, buttons, form fields.

**Accent / Code / Tags:** `JetBrains Mono` — used sparingly for tech-stack tags, project numbers ("01 / 04"), and small metadata labels. Reinforces the "developer" identity without looking like a terminal theme.

**Type scale (desktop):**
| Element | Font | Size | Weight |
|---|---|---|---|
| Hero name | Fraunces | 72–96px | 500, italic accents on 1 word |
| Section heading | Fraunces | 40–48px | 500 |
| Project title | Fraunces | 28px | 500 |
| Body text | Inter | 17–18px | 400, line-height 1.6 |
| Nav / buttons | Inter | 14px | 500, letter-spacing 0.02em |
| Tags / meta | JetBrains Mono | 12–13px | 400, uppercase, letter-spacing 0.08em |

**Rule of thumb:** serif for anything that should feel like a *statement*, sans for anything that should feel *usable*, mono for anything that's *metadata*.

---

## 6. Animation & Motion Principles

Motion should feel **deliberate and smooth**, never bouncy or gimmicky. Target 300–500ms durations with `ease-out` / custom cubic-bezier curves — nothing springy.

1. **Scroll reveals** — sections fade up 20px + opacity 0→1 as they enter viewport (stagger children by 60–80ms). Use Intersection Observer, not scroll-jacking.
2. **Magnetic buttons** — primary CTAs subtly follow cursor within a small radius (±8px) on hover, snapping back on leave. Signals craftsmanship without being flashy.
3. **Underline draw** — nav links and inline links get an animated underline that draws left-to-right on hover (transform: scaleX), not a color swap.
4. **Cursor accent (optional, desktop only)** — a small copper dot/ring cursor that scales up slightly over interactive elements. Skip on mobile.
5. **Project card hover** — image slightly scales (1.03x) + a soft copper glow border appears; text shifts up 4px. All in one 400ms ease-out transition.
6. **Page/section transitions** — subtle grain/noise texture overlay (2–3% opacity) on hero for tactile premium feel — avoid flat solid backgrounds.
7. **Number counters** — for stats (projects count, years learning) animate count-up once in view.

**Avoid:** particle.js backgrounds, typewriter-effect hero text, confetti, excessive parallax, auto-playing carousels.

---

## 7. Component Styles

### Buttons
- **Primary:** Solid copper (`#D97A3F`) fill, warm off-white text, fully rounded pill shape (border-radius: 999px), padding `14px 32px`. On hover: background deepens slightly + magnetic cursor-follow + subtle scale (1.02).
- **Secondary/outline:** 1px border in bronze-grey, transparent background, foreground text. On hover: border transitions to copper, text stays same.
- **No drop shadows on buttons** — use border/glow instead, keeps it flat and premium rather than "material design" bouncy.

### Cards (Projects/Skills)
- Background: deep espresso (`#1A1815`), 1px hairline border (`#3A362F`), border-radius `16px`, padding `28–32px`.
- No heavy box-shadows. Instead, on hover: border color shifts to copper at 40% opacity + a very soft radial glow behind the card (blur 60px, copper at 8% opacity).
- Internal layout: mono tag row (tech stack) → serif project title → sans description → text links ("View Live ↗" / "Source ↗") at bottom, underline-draw on hover.

### Navigation
- Fixed/sticky, transparent initially, transitions to semi-opaque charcoal with backdrop-blur(12px) after scrolling 80px.
- Logo/name in Fraunces italic, nav links in Inter uppercase small caps with mono-style letter spacing.

### Section Dividers
- No harsh horizontal lines. Use generous vertical whitespace (120–160px between sections) and subtle background color alternation (charcoal ↔ espresso) instead of borders.

### Tags (tech stack pills)
- Mono font, uppercase, small, inside a thin-bordered pill (not filled), sage green or muted gold text depending on category (frontend vs backend vs language).

---

## 8. Layout Principles

- **Generous whitespace** — premium sites breathe; don't cram sections.
- **Asymmetric grid** for projects (not uniform 3-column grid) — e.g., alternate large/small card sizes to avoid a "template" feel.
- **Left-aligned hero**, not centered — centered hero text is the most common "generic portfolio" tell.
- **Numbered sections** (01 Work, 02 About, 03 Contact) in mono font — reinforces the editorial/studio feel.
- Max content width ~1140px, with hero text allowed to breathe wider.

---

## 9. Suggested Section Order

1. Hero (name, tagline, primary CTA: "View Work" / "Get in Touch")
2. About Me
3. Skills (grouped: Languages / Frontend / Soft Skills / Tools)
4. Projects (2–4 cards, asymmetric grid)
5. Education
6. Contact (email, GitHub, LinkedIn — styled as large clickable text links, not generic icon row)

---

## 10. Motion & Effects — v2 (added per client request)

Additions on top of Section 6. All effects are `transform`/`opacity` only, light on the GPU, and fully disabled under `prefers-reduced-motion`:

- **Hero:** copper→gold shimmer sweep on the italic surname (`background-clip: text`, 7s loop); mouse-following ambient spotlight (radial `--spot`, ≤10% opacity); rotating sub-line (3 phrases, 3.4s cycle, 300ms fade); animated scroll-hint line; mono corner labels (location / availability, hidden ≤700px).
- **Nav:** "Let's Talk" pill CTA alongside the theme toggle.
- **Titles:** word-mask reveal — each word rises with a 70ms stagger — for the hero name and all section titles; plain text stays visible if JS fails.
- **Project cards:** subtle 3D tilt (±4°, perspective 900px) + the existing mouse-tracked copper glow. (The custom cursor was removed per client request — native cursor is used.)
- **Global:** 2px copper→gold scroll-progress bar at the top; tags lift on hover; project links nudge right on hover.

These extend the original restraint list in Section 6 deliberately: the additions are ambient and cursor-reactive rather than decorative loops, so the page still reads calm and premium — never gimmicky.

**v3 (2026 polish, per client request):** drifting copper/gold aurora blobs + a fading dot-grid in the hero; giant parallax watermark numbers (01–05) behind section headers; word-mask titles that settle from a soft blur; skill tags cascading in with a stagger; project titles that text-scramble on hover; project media that parallaxes against the cursor; scroll-spy nav highlighting; a back-to-top button with a circular progress ring; button shine sweeps; a hidden scrollbar (scrolling still works, desktop and mobile); and body-wide film grain. All effects remain `transform`/`opacity` only and fully disabled under `prefers-reduced-motion`.

**v4 — "Developer Terminal" (chosen direction, per client request):** the hero centerpiece becomes a CSS-built terminal window that types its output on load — `$ whoami → Divya Gavali — Full Stack Developer`, `$ stack --list → react · node · express · mongodb · python · c++`, `$ status → open to frontend developer internships`. The terminal stays a fixed dark panel in both themes (like a code block) so it always reads. The profile portrait moves into the About section; Skills opens with a `~/skills $ npm list --depth=0` probe line; the footer closes with `$ exit`. Typing is skipped entirely under `prefers-reduced-motion` (full text shows instantly) and when JS fails (static HTML fallback).

---

*Design system: "Ink & Ember" — warm, editorial, precise. Built for a full stack developer portfolio that reads premium without relying on generic dark-gradient templates.*
