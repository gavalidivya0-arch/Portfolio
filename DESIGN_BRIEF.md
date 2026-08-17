# UI/UX Design Brief — Personal Portfolio

> ⚠️ **Superseded.** The active design direction is now **"Ink & Ember"** — see [`DESIGN.md`](./DESIGN.md). This earlier glassmorphism brief is kept for reference only.

**Prepared for:** [YOUR NAME] — Frontend / Web Developer
**Purpose:** This document is the single source of truth for building the portfolio website. An AI app builder or developer can follow it directly. Every value is concrete (hex codes, rem, px, ms) so no interpretation is needed.

**Design direction:** *Minimalist Light + Premium Glassmorphism + Creative Developer flair — warm editorial palette (raspberry · sage · cream).*

**Brand palette (provided by client):** `#CC3A63` raspberry · `#A2AB73` sage · `#F9F0E0` cream · `#FFF7EB` light cream. Every color token in this brief derives from these four — do not introduce new hues.

---

## 1. Project Overview

A personal portfolio that presents a **frontend developer's** skills, projects, and experience through a **light, airy glassmorphic** design. It must feel:

- **Premium** — glass surfaces, soft ambient light, refined detail. Think Apple-style polish.
- **Minimal** — content-first, generous whitespace, restrained palette. Glass adds depth without clutter.
- **Creative** — subtle gradient accents, ambient color, tasteful motion that signals a developer who cares about craft.
- **Fast & light** — pure HTML/CSS/JS is acceptable, or a lightweight static setup. No heavy frameworks.

### Goals
1. Get the visitor to take one action: **view a project** or **send an email**.
2. Communicate expertise within **5 seconds** of landing (name, role, one-line value prop).
3. Be fully responsive — mobile is the primary entry point for many recruiters.

### Success metrics
- Above-the-fold page load < 2s (target Lighthouse Performance ≥ 90)
- Contact form / email reachable in ≤ 2 clicks from any page position
- All interactive elements pass WCAG 2.1 AA contrast
- `backdrop-filter` used without killing scroll performance (limit blur layers to ~3)

---

## 2. Design Style

**Direction: "Premium Light Glassmorphism"**

Glass sits *on top of* a softly colored light background. Every surface reads as frosted glass catching light.

| Attribute | Specification |
|---|---|
| Background | Warm cream (`#F9F0E0`) with a lighter cream glow — never flat white |
| Ambient layer | 2–3 large, heavily blurred color orbs (raspberry / sage / warm cream light) fixed behind content at 12–18% opacity — this is what the glass refracts |
| Glass recipe | `background: rgba(255,247,235,0.6)` · `backdrop-filter: blur(20px) saturate(1.4)` · 1px border `rgba(255,255,255,0.7)` · inset top highlight `inset 0 1px 0 rgba(255,255,255,0.8)` |
| Card radius | 16–20px (generous, pill-shaped where appropriate) |
| Shadows | Soft, diffused, warm low-opacity (`0 16px 40px rgba(43,36,32,0.10)`); never hard |
| Accent | Raspberry (#CC3A63) → sage (#A2AB73) gradient used sparingly for display text and decorative fills; solid raspberry for CTAs. Everything else stays in the warm cream/ink family |
| Icons | Consistent thin line icons (1.5–2px stroke) — Lucide, Phosphor, or Font Awesome `regular` |
| Imagery | Real project screenshots (no stock photos); avatar optional (monogram preferred) |
| Creative touches | Gradient text on hero name/accent words, ambient orbs, subtle grain/noise overlay (optional, 3–5% opacity), bento-style About layout, micro-magnetic primary CTA |

> **Balance rule:** glass is a *surface treatment*, not the content. Max ~60% of visible panels should be glass; keep at least one solid cream (`--solid-surface`) or fully transparent area per viewport so the page never looks washed out. **Do not**: neon effects, heavy glows, animated backgrounds, 3D, or glass-on-glass stacking (glass only sits on the ambient layer, not on other glass).

---

## 3. Color Palette

Light theme is the **default**. A simple dark theme is optional (see Dark Mode).

### Light theme (default)

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#F9F0E0` | Page background (warm cream) |
| `--glass-bg` | `rgba(255,247,235,0.60)` | Cards, navbar, inputs (frosted light cream — glass "catches the light") |
| `--glass-bg-strong` | `rgba(255,247,235,0.82)` | Forms, modals, floating elements (more readable glass) |
| `--glass-border` | `rgba(255,255,255,0.70)` | Glass hairline border |
| `--solid-surface` | `#FFF7EB` | Solid cards, code blocks, contrast panels (light cream) |
| `--text-primary` | `#2B2420` | Headings, body emphasis (warm ink) |
| `--text-secondary` | `#6B6257` | Body copy (warm gray) |
| `--text-muted` | `#9C917F` | Meta, dates, captions, placeholders (warm taupe) |
| `--accent-1` | `#CC3A63` | Primary accent — CTAs, links, active states, focus rings (raspberry) |
| `--accent-1-deep` | `#B02E52` | Accent hover state; accent text on `--accent-soft` fills |
| `--accent-2` | `#A2AB73` | Secondary accent — decorative fills, chip borders, orbs only (sage) |
| `--accent-2-deep` | `#7C8A4A` | Sage end of text gradients (deepened for contrast) |
| `--accent-gradient` | `linear-gradient(135deg, #CC3A63, #A2AB73)` | Decorative fills, icon accents, hover tints — never under text |
| `--accent-gradient-text` | `linear-gradient(135deg, #CC3A63, #7C8A4A)` | Gradient display text (both halves pass large-text contrast) |
| `--accent-soft` | `rgba(204,58,99,0.10)` | Accent tint fills, tag hovers, focus rings |
| `--border` | `rgba(43,36,32,0.10)` | Hairline dividers on solid surfaces |
| `--success` | `#059669` | Status "Live", form success |
| `--warning` | `#D97706` | Status "In progress" |
| `--danger` | `#DC2626` | Error states only |

**Ambient orbs (background layer):**
- Raspberry orb: `radial-gradient(closest-side, rgba(204,58,99,0.12), transparent 70%)`, ~40vw, top-left, `blur(60px)` or pre-blurred
- Sage orb: `radial-gradient(closest-side, rgba(162,171,115,0.16), transparent 70%)`, ~35vw, right-center
- Cream glow (optional): `radial-gradient(closest-side, rgba(255,247,235,0.9), transparent 60%)`, ~50vw, center — softens page edges
- Orbs use `position: fixed; z-index: -1` (or a fixed background layer) so they don't scroll and never create layout overflow

**Contrast guarantees (WCAG 2.1 AA):**
- `--text-primary` (#2B2420) on `--bg` ≈ 11:1 ✅ · `--text-secondary` (#6B6257) on cream ≈ 6.5:1 ✅
- `--accent-1` (#CC3A63) on `--bg` ≈ 4.6:1 ✅ — links & accent text; use `--accent-1-deep` for text on `--accent-soft` fills
- White text on `--accent-1` (primary button) ≈ 4.9:1 ✅
- `--accent-2` (#A2AB73) on cream ≈ 2.6:1 ❌ — **decorative only, never text**. All text gradients must use `--accent-gradient-text` (deepened sage end)
- Primary CTAs are solid `--accent-1`; never place small text over the pure raspberry→sage gradient

### Dark mode (optional, secondary)
Mirror tokens: `--bg: #1B1712` · `--glass-bg: rgba(42,35,27,0.6)` · `--glass-bg-strong: rgba(42,35,27,0.85)` · `--glass-border: rgba(255,247,235,0.14)` · `--solid-surface: #262018` · `--text-primary: #F3EDE3` · `--text-secondary: #C4BCAE` · `--text-muted: #9A917F` · `--accent-1: #E2749C` · `--accent-1-deep: #D15A85` · `--accent-2: #B9C28A` · `--border: rgba(255,247,235,0.12)`. Ambient orbs drop to 8% opacity. Toggle persists in `localStorage`; default = light.

---

## 4. Typography

| Role | Font | Weight | Size | Line-height |
|---|---|---|---|---|
| Display / Hero name | **Sora** (or Space Grotesk) | 600–700 | clamp(2.5rem, 6vw, 4rem) | 1.1 |
| H2 section titles | Sora | 600 | clamp(1.75rem, 3.5vw, 2.25rem) | 1.2 |
| H3 card titles | Sora | 600 | 1.125rem | 1.35 |
| Body | **Inter** (system-ui fallback) | 400 | 1rem (16px) | 1.6 |
| Small / meta | Inter | 400–500 | 0.875rem | 1.5 |
| Eyebrow / label | Inter (uppercase) | 600 | 0.75rem | 1.4, letter-spacing 0.08em |

**Rules**
- Two font families max: Sora (headings) + Inter (body). Load only weights 400, 500, 600, 700.
- Base 16px; never render body below 15px.
- Max line length **65–75 characters** (`max-width: 65ch` on prose).
- ALL-CAPS only for short eyebrows/labels.
- **Gradient text** reserved for: hero name highlight (1 word or the last name), the "Featured" badge, and the H2 of the Contact section. Use `background: var(--accent-gradient-text); -webkit-background-clip: text; color: transparent;` and always pair with a solid-text fallback for `@supports not (background-clip: text)`. (The text gradient ends in deepened sage so both halves pass large-text contrast.)
- **Optional creative accent:** one italic serif (Fraunces or Instrument Serif, italic 400–600) for the hero gradient word and the section eyebrows only — this is what gives the warm palette its editorial "creative developer" feel. If used, it replaces the display font for those two elements alone; headings and body stay Sora + Inter.

---

## 5. Layout & Grid

| System | Value |
|---|---|
| Layout | Single column, centered container |
| Container max-width | **1120px** (72rem) |
| Horizontal page padding | `padding-inline: clamp(1.25rem, 4vw, 3rem)` |
| Vertical section spacing | `padding-block: clamp(4rem, 10vw, 7rem)` |
| Grid | 12-col desktop, 4-col tablet, 2-col mobile; use `repeat(auto-fit, minmax(...))` where simpler |
| Card grids | Projects: 3 cols desktop → 2 tablet → 1 mobile |
| Spacing scale | 4px × n: 4, 8, 12, 16, 24, 32, 48, 64, 96 |
| Section header | Centered eyebrow + title; optional subtitle ≤ 55ch |
| About layout | **Bento grid** (creative touch): 1 large glass panel (story) + 3 smaller panels (stats, highlights, availability) in a 2×2 arrangement with one panel spanning 2 cols |

**Section rhythm:** background stays the same throughout; sections are separated by generous padding and occasional full-width hairline dividers — no background striping. Glass panels alternate with occasional solid-white panels for contrast (e.g. About story panel = glass, Projects cards = glass, Testimonials = solid white on the same ambient layer).

---

## 6. Component Style Guide

### Glass surfaces (cards, panels, navbar)
- Recipe: `background: var(--glass-bg)` · `backdrop-filter: blur(20px) saturate(1.4)` (prefix `-webkit-`) · `border: 1px solid var(--glass-border)` · `box-shadow: inset 0 1px 0 rgba(255,255,255,0.8), 0 16px 40px rgba(43,36,32,0.10)` · radius 18px.
- Hover (desktop only): `transform: translateY(-3px)` + shadow deepens to `0 24px 48px rgba(43,36,32,0.14)` + border brightens. Transition 200ms ease.
- **Perf note:** limit total `backdrop-filter` elements on screen at once; cards in a large grid can use a *pre-blurred* frosted texture or slightly higher opacity glass (`0.7`) instead of live blur.

### Buttons
- **Primary:** solid `--accent-1` (#CC3A63) with white text (≈ 4.9:1, passes AA), radius 12px, padding `0.75rem 1.6rem`, weight 600. Hover: `--accent-1-deep` + `translateY(-2px)` + soft raspberry glow `0 12px 28px rgba(204,58,99,0.30)`. Active: translateY(0). Optional micro-magnetic pull (±4px) on this button only. The raspberry→sage gradient is reserved for decorative moments — never as a fill under small text.
- **Secondary (glass):** glass recipe, `--text-primary`, radius 12px. Hover: `--glass-bg-strong` + border brightens.
- **Ghost/Link:** text-only `--accent-1`, underline on hover.
- All: `min-height: 44px`, `cursor: pointer`, visible `focus-visible` ring (2px `--accent-1`, offset 2px).
- Icon buttons (social): 40px glass squares, radius 12px; hover → solid `--accent-1` fill with white icon (contrast-safe).

### Cards (projects, experience, education)
- Glass recipe, padding 1.5rem.
- Project cards: thumbnail (16:9, radius 12px, `object-fit: cover`, 1px inner border) → title → 1–2 line description → tech tags → links row.
- Featured project: full-width glass panel with 3 "impact" bullets (problem → solution → result).

### Tags / Chips
- Radius 999px, padding `0.25rem 0.8rem`, 0.8125rem text, background `rgba(255,247,235,0.5)` + 1px `var(--glass-border)`. Tech tags: neutral with warm-ink text. Category chips (filter): active = solid `--accent-1` fill, white text; inactive hover = `--accent-soft` fill.

### Navigation
- **Floating glass pill** (creative touch): sticky, centered, max-width ~760px, glass recipe, radius 999px, height 60px, margin-top 16px, `z-index: 1000`. Left: wordmark. Right: links + "Hire Me" `btn-primary` (solid raspberry) button. On scroll > 40px: tighten shadow slightly.
- Mobile: hamburger opens full-screen overlay; links at 1.25rem, staggered fade-in 30ms each; glass-blurred overlay (`blur(24px)` on a `rgba(255,255,255,0.6)` panel); body scroll locked. Close button top-right.
- Active link: `--accent-1` text + 2px gradient underline (inset 6px).
- Scroll spy highlights the active section.

### Forms (contact)
- Panel uses `--glass-bg-strong` (more opaque for readability). Labels above fields, 0.875rem weight 500. Inputs: background `rgba(255,255,255,0.7)`, 1px `var(--glass-border)`, radius 10px, padding `0.75rem 1rem`. Focus: 2px `--accent-1` border + `--accent-soft` ring. Error: `--danger` border + inline message. Submit = gradient primary button.

### Status badges
- 6px dot + label: green = "Live", amber = "In progress", gray = "Archived". Always paired with text (color is never the only cue).

### Timeline (experience/education)
- Vertical rail (2px, `rgba(23,26,46,0.1)`), dots = 12px glass circle with 6px gradient core. Cards glass. Mobile: rail at left edge with 16px gutter.

---

## 7. Animation & Motion

**Philosophy:** light, airy, deliberate. Transform/opacity only (never layout properties). Ambient layer may drift *very* slowly (±20px, 30–60s loop) — never more. Total reveal budget < 1.5s.

| Motion | Spec |
|---|---|
| Scroll reveal | Fade + `translateY(16px→0)`, 450ms, ease-out, `IntersectionObserver`, stagger 80ms for grids. Respect `prefers-reduced-motion` (disable all, show everything) |
| Hero load | Name letters/lines staggered 60ms each (< 600ms total); intro fades up 500ms; orbs start fully formed (no spin-up animation) |
| Hero name | One word in gradient text; subtle 1.05→1 scale settle on that word (optional) |
| Glass hover | 200ms ease, per component spec |
| Counter stats | Count up 800ms ease-out on reveal (only real numbers) |
| Rotating roles | Optional: cycle 3 roles every 2.5s with 300ms fade |
| Floating pill nav | Blur/opacity settle on load; tightened shadow on scroll |
| Back-to-top | Appears after 400px scroll, 200ms fade; glass circle button |
| Button micro-magnetic | Optional, primary CTA only, ±4px, 150ms ease-out |
| Page load | No preloader; content paints immediately |

**Cursors:** standard cursor only. **Parallax:** none. **Heavy effects:** none — glow stays within 35% opacity and only on the primary CTA hover.

---

## 8. Page Structure — All Sections (in order)

### 1. Floating Glass Navbar
Logo → links (About, Skills, Projects, Experience, Contact) → "Hire Me" gradient button. Max 6 links; extras go in footer.

### 2. Hero (`#home`)
- Eyebrow: "👋 Hi, I'm [Name]" (or "Frontend Developer based in [City]")
- H1: `[Name]` with **one word in gradient** + tagline line, e.g. *"I build fast, accessible, beautifully crafted web interfaces."*
- 1–2 sentence intro ≤ 140 chars, value-prop led
- CTAs: **View My Work** (primary raspberry) + **Contact Me** (glass)
- Social icons (GitHub, LinkedIn, Email, Resume PDF)
- Optional right column: monogram glass avatar card + mini "quick facts" glass card (location, availability, email)
- Scroll-down indicator: animated 2s chevron

### 3. About (`#about`) — bento layout
- Eyebrow + section title
- **Bento grid:** large glass panel = 2–3 paragraph story; panel = stats counters (only real numbers); panel = "What I do" highlights (3 items: Frontend Development, Responsive Design, Performance); panel = availability/current focus card
- Creative detail: one panel accent-tinted with `--accent-soft`

### 4. Skills (`#skills`)
- Glass panel with skills grouped by category (Languages, Frontend, Tools/Workflow)
- Chips with optional line icons. **No progress bars / percentage circles** — tags only
- Optionally one decorative "toolbelt" row of brand icons

### 5. Projects (`#projects`) — *the core section*
- Filter chips: All / Web Apps / Tools / Other
- **Featured project:** full-width glass panel — screenshot (16:9), title, description, 3 impact bullets, links
- Grid: 3 × glass project cards (screenshot, title, 1-line description, tags, GitHub/Live links)
- Every project needs a real screenshot in a consistent 16:9 frame

### 6. Experience (`#experience`)
- Vertical glass timeline: role, company, dates, 2–4 achievement bullets starting with action verbs, real metrics where possible ("Reduced bundle size by 30%")

### 7. Education & Certifications (`#education`)
- Two glass cards: degree (institution, dates, coursework line) + 1–3 certifications (name, issuer, year)

### 8. Testimonials (`#testimonials`) — optional
- Solid-white centered card (contrast against glass) with a simple prev/next + dots carousel, max 3 quotes. Only real quotes; else omit the section.

### 9. Contact (`#contact`)
- H2 with gradient "Let's work together"
- Left: glass contact items (email, phone, location, LinkedIn) as icon rows
- Right: **solid-glass-strong form** (Name, Email, Message) → Formspree or email integration. Never ship a dead form.

### 10. Footer
- Wordmark + role · social icons · quick links · back-to-top · `© [Year] [Name]`

---

## 9. Mobile Responsiveness

| Breakpoint | Behavior |
|---|---|
| ≤ 640px (mobile) | Single column. Floating pill nav → hamburger + full-screen glass overlay. Hero stacks (text first). Bento → single column (large panel first). Projects 1-col. CTA groups: buttons full-width. Form inputs full width. Nav pill shrinks to 56px height |
| 641–1024px (tablet) | 2-col project grid; bento 2-col; condensed nav links (drop "Experience" into overlay) |
| ≥ 1025px (desktop) | 3-col grid, full bento, all links visible |

**Mobile-specific rules**
- Touch targets ≥ 44×44px; hover effects get tap equivalents
- `clamp()` type; body never below 15px
- Ambient orbs: reduce to 2, lower opacity (0.10), smaller (30vw) — saves GPU on mobile; they must not cause horizontal scroll
- No horizontal scrolling ever (`overflow-x: hidden` guard on html/body)
- `backdrop-filter` works on mobile Safari — always include `-webkit-` prefix

---

## 10. UX Principles

1. **5-second clarity** — hero states name + role + value prop instantly.
2. **One primary action per section** — at most one CTA per section.
3. **Progressive disclosure** — 1–2 line summaries; details on click (project modal/page).
4. **Consistent navigation** — every nav target exists; no dead links.
5. **Scanability** — headings, short paragraphs, whitespace, consistent section headers.
6. **Accessibility (WCAG 2.1 AA):**
   - Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), one `h1`
   - Icons get `aria-label`/`sr-only`; form fields have labels
   - Full keyboard nav + visible focus rings
   - `prefers-reduced-motion` honored
   - Color never the only indicator
   - Glass surfaces keep contrast: don't place `--text-secondary` on very busy orb areas — keep orbs light (≤ 18% opacity) so text always sits on near-white
7. **Fast by default** — system font fallbacks, `loading="lazy"` below fold, preconnect to font/icon CDNs, no hero video, limit blur layers.
8. **Honest content** — no fake stats, fake testimonials, or placeholder images at launch.

---

## 11. Visual References

Use these for *structure, glass treatment, and creative restraint* — keep the light palette and values above:

- **Jacek Jeznach** — jacekjeznach.com (editorial spacing, typography)
- **Brittany Chiang** — brittanychiang.com (timeline + tag systems)
- **Rauno Freiberg** — rauno.me (refined minimal micro-interactions)
- **Patrick Heng** — patrickheng.com (text + project framing balance)
- **Apple product pages** — apple.com (glass depth, ambient light, restrained motion)
- **Warm editorial references** — Kinfolk magazine, Aesop's website: cream paper, one punchy accent, big type, lots of air. Study how they pair warm neutrals with a single bold color
- **Awwwards glassmorphism / minimal filters** — awwwards.com (curated examples of both styles done well)
- **Dribbble search "light glassmorphism portfolio"** — for moodboard inspiration only (beware over-styled mockups; keep it minimal)

---

## 12. Content Checklist — "All My Information"

Fill these and hand them to the builder:

- [ ] Full name & professional title (e.g. "Alex Chen — Frontend Developer")
- [ ] 1-line tagline / value prop
- [ ] Short bio (2–3 sentences) + longer about paragraphs
- [ ] Location, availability status
- [ ] Email, phone (optional), LinkedIn, GitHub, Twitter/X (optional)
- [ ] Resume PDF
- [ ] 3–6 real projects: name, category, screenshot, description, tech stack, GitHub/live links, 1 measurable result each
- [ ] Skills grouped into categories
- [ ] Work experience: role, company, dates, 3–4 achievement bullets each
- [ ] Education: degree, school, dates; certifications with issuer + year
- [ ] 2–3 real testimonials (or omit section)
- [ ] Profile photo (optional; else monogram)

---

## 13. Build Handoff Notes (for the AI builder)

1. **Stack:** plain HTML/CSS/JS (like the current repo) or a lightweight static setup — no React/Vue needed for a one-pager.
2. **Tokens first:** all colors/spacing/typography as CSS custom properties (exact values in Sections 3–5). Change tokens, never hard-coded values.
2b. **Palette source:** every color derives from the client's four brand hexes (#CC3A63, #A2AB73, #F9F0E0, #FFF7EB) — never introduce new hues. Keep the two-gradient rule: `--accent-gradient` for fills, `--accent-gradient-text` for text.
3. **Glass implementation:** one reusable `.glass` utility class; `-webkit-backdrop-filter` always; cap blur layers for perf; orbs behind `z-index: -1` fixed layer.
4. **SEO:** title, meta description, Open Graph tags, `og:image` = hero/project screenshot, semantic HTML.
5. **Analytics (optional):** privacy-friendly (Plausible/GoatCounter); skip if unsure.
6. **Contact form:** Formspree (free) or mailto fallback. Never ship a form that silently does nothing.
7. **Deploy:** GitHub Pages / Netlify / Vercel — free static hosting.
8. **Acceptance test:** Lighthouse ≥ 90 Performance & Accessibility; keyboard-only navigation passes; no horizontal scroll at 360px; glass renders correctly on Safari (prefix check).

---

*Generated as a design brief. Ready to be turned into code — share your details from Section 12 and I can build or restyle the site to match.*
