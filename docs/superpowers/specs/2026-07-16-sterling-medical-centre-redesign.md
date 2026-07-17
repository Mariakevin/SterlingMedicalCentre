# Sterling Medical Centre — Full Website Redesign

**Date:** 2026-07-16  
**Status:** Approved  
**Scope:** Full visual overhaul + restructured information architecture  
**Brand:** Sterling Medical Centre (name retained from existing site)

---

## 1. Overview

Complete redesign of the Sterling Medical Centre website. The current site uses a crimson/black color scheme with serif headings (Fraunces) and a single-column layout. The redesign shifts to a **Modern Clinical** aesthetic: medical teal primary, coral accent, clean sans-serif typography (Figtree + Noto Sans), and a restructured 11-section page layout with improved information hierarchy.

**Key changes:**
- New color palette (teal/coral/mint replacing crimson/black)
- New typography (Figtree + Noto Sans replacing Fraunces + Manrope)
- Restructured page sections (11 sections, new Process section added)
- Updated component patterns (cards, nav, hero, footer)
- Retained features (scroll animations, count-up stats, mobile menu, form validation)

---

## 2. Design Tokens

### 2.1 Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--primary` | `#0891B2` | Primary buttons, links, icons, active states |
| `--on-primary` | `#FFFFFF` | Text on primary-colored backgrounds |
| `--accent` | `#E8634A` | CTA buttons, highlights, emphasis (coral) |
| `--on-accent` | `#FFFFFF` | Text on accent backgrounds |
| `--bg` | `#F0FDFA` | Page background (mint) |
| `--fg` | `#134E4A` | Primary text, headings (deep teal) |
| `--card` | `#FFFFFF` | Card surfaces |
| `--card-fg` | `#134E4A` | Text on cards |
| `--muted` | `#E8F1F6` | Subtle backgrounds, tags, badges |
| `--muted-fg` | `#64748B` | Secondary/muted text |
| `--border` | `#CCFBF1` | Borders, dividers |
| `--destructive` | `#DC2626` | Errors, destructive actions |
| `--ring` | `#0891B2` | Focus rings |

**Dark sections** (Philosophy, Testimonials): `--fg` background (`#134E4A`) with `--card` text (`#FFFFFF`) and `--accent` (`#E8634A`) highlights.

### 2.2 Typography

| Role | Font | Weight | Size | Line-height |
|------|------|--------|------|-------------|
| Display | Figtree | 700 | 3.5rem (56px) | 1.1 |
| H1 | Figtree | 700 | 3rem (48px) | 1.15 |
| H2 | Figtree | 700 | 2.25rem (36px) | 1.2 |
| H3 | Figtree | 600 | 1.5rem (24px) | 1.3 |
| Body Large | Noto Sans | 400 | 1.125rem (18px) | 1.7 |
| Body | Noto Sans | 400 | 1rem (16px) | 1.7 |
| Small | Noto Sans | 500 | 0.875rem (14px) | 1.5 |
| Caption | Noto Sans | 400 | 0.75rem (12px) | 1.5 |

**Google Fonts import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&family=Noto+Sans:wght@300;400;500;700&display=swap');
```

### 2.3 Spacing (8px base)

| Token | Value |
|-------|-------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-12` | 48px |
| `--space-16` | 64px |
| `--space-24` | 96px |
| `--space-32` | 128px |

### 2.4 Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 8px | Cards, small containers |
| `--radius-md` | 12px | Containers, larger cards |
| `--radius-pill` | 9999px | Buttons (CTA pills), badges |

### 2.5 Transitions

| Token | Value |
|-------|-------|
| `--transition-fast` | 150ms ease-out |
| `--transition-base` | 200ms ease-out-expo |
| `--transition-slow` | 300ms ease-out-expo |

---

## 3. Page Structure (11 Sections)

### 3.1 Navigation

**Behavior:** Fixed top, white background, teal bottom border (2px `--primary`). Becomes slightly compact on scroll (reduced padding).

**Layout:**
- Left: Sterling logo (text or image) + "Sterling Medical Centre"
- Center: Nav links — Home, About, Services, Team, Testimonials
- Right: "Book Appointment" coral pill button (`--accent` bg, white text, `--radius-pill`)

**Mobile:** Hamburger menu → full-screen overlay with links stacked vertically, coral CTA at bottom.

**Accessibility:** `aria-label="Main navigation"`, `aria-expanded` on mobile toggle, focus trap in mobile menu, escape key closes menu.

### 3.2 Hero

**Layout:** 2-column (55% / 45% on desktop, stacked on mobile).

**Left column:**
- Eyebrow tag: "Welcome to Sterling Medical Centre" in `--primary` text with subtle `--muted` pill background
- Headline: "Where Healing Feels Like Home" in `--fg`, Figtree 700, 3.5rem
- Subtext: 2-3 sentences about compassionate care in `--muted-fg`, Noto Sans 400, 18px
- Two CTAs side by side:
  - Primary: "Book Your Visit" — coral bg (`--accent`), white text, `--radius-pill`
  - Secondary: "Meet Our Team" — teal outline (`--primary` border), teal text, transparent bg

**Right column:**
- Hero image (doctor-consultation.jpg or clinic-interior.jpg) with `--radius-md` (12px) corners
- Floating doctor card (positioned absolute, bottom-left of image): small circular avatar + "Dr. Sarah Chen" + "Family Medicine" — white card, `--radius-sm`, subtle shadow

**Mobile:** Stacked vertically, image first, content below. Floating card repositioned.

### 3.3 Trust Bar

**Layout:** Full-width row, 4 stat columns. White background, subtle `--border` top/bottom.

**Stats (with count-up animation on scroll):**
| Stat | Number | Label |
|------|--------|-------|
| Patients Satisfied | 5000+ | "Patients Satisfied" |
| Years of Service | 15+ | "Years of Service" |
| Specialists | 12+ | "Medical Specialists" |
| Patient Satisfaction | 98% | "Patient Satisfaction" |

**Design:** Number in `--primary`, large Figtree 700. Label in `--muted-fg`, Noto Sans 400 small. Vertical `--border` divider between columns.

**Animation:** IntersectionObserver triggers count-up from 0 to final value over 2 seconds.

### 3.4 Philosophy

**Background:** Deep teal (`--fg` / `#134E4A`). Text: white (`--card` / `#FFFFFF`).

**Header:** "Our Philosophy" centered, white text. Subtitle: "Three pillars guide everything we do" in muted white (`--muted` opacity).

**3 columns (equal width):**

| Pillar | Icon | Title | Description |
|--------|------|-------|-------------|
| Rooted | Heart icon (coral) | "Rooted in Care" | Compassion at the core of every interaction |
| Flowing | Leaf icon (coral) | "Flowing with Purpose" | Evidence-based, thoughtful treatment plans |
| Rising | Sunrise icon (coral) | "Rising Together" | Empowering patients toward better health |

**Icon style:** SVG line icons, 48px, coral (`--accent`) color, centered in a circular `--accent` bg with 20% opacity (rgba(232,99,74,0.15)).

**Mobile:** Single column, icons stacked vertically.

### 3.5 Services

**Background:** White (`--card`).

**Header:** "Our Services" centered, `--fg` text. Subtitle: "Comprehensive care for every stage of life" in `--muted-fg`.

**Grid:** 3×2 (3 columns, 2 rows on desktop). 1 column on mobile.

**Each card:**
- Icon (48px, `--primary` color) in `--muted` circular background
- Service name (Figtree 600, 1.25rem)
- Short description (Noto Sans 400, 1rem, `--muted-fg`)
- White background, `--radius-sm`, subtle border (`--border`), hover: shadow + slight translateY(-2px)

**Services (6 cards):**
| Icon | Title | Description |
|------|-------|-------------|
| Stethoscope | General Medicine | Comprehensive health assessments and preventive care |
| Heart | Cardiology | Heart health monitoring and cardiovascular treatment |
| Brain | Neurology | Expert diagnosis and treatment of neurological conditions |
| Bone | Orthopaedics | Musculoskeletal care, injuries, and rehabilitation |
| Baby | Paediatrics | Child-friendly healthcare from infancy through adolescence |
| Shield | Preventive Care | Vaccinations, screenings, and wellness programs |

**Icons:** Use Lucide or Heroicons (SVG, line style, consistent 2px stroke).

### 3.6 Full-width Image

**Layout:** Full viewport width, 480px height on desktop, 320px on mobile.

**Image:** doctor-consultation.jpg (or clinic-interior.jpg), `object-fit: cover`, centered.

**Overlay:** Subtle dark gradient at bottom (transparent to 20% black) for depth.

**Purpose:** Visual breathing room between Services and Team sections.

### 3.7 Team

**Background:** Mint (`--bg` / `#F0FDFA`).

**Header:** "Meet Our Team" centered, `--fg` text. Subtitle: "Dedicated professionals committed to your well-being" in `--muted-fg`.

**Layout:** 3 cards in a row (1 column on mobile).

**Each card:**
- Doctor photo (square, 300×300, `object-fit: cover`, `--radius-sm`)
- Name (Figtree 600, 1.25rem, `--fg`)
- Specialty (Noto Sans 400, 0.875rem, `--primary`)
- Brief description (Noto Sans 400, 1rem, `--muted-fg`)
- White background, `--radius-sm`, subtle shadow

**Data:**
| Photo | Name | Specialty | Description |
|-------|------|-----------|-------------|
| doctor-female.jpg | Dr. Sarah Chen | Family Medicine | "15 years of experience in comprehensive family healthcare" |
| doctor-male.jpg | Dr. Michael Okafor | Internal Medicine | "Specialist in chronic disease management and prevention" |
| doctor-female-2.jpg | Dr. Emily Park | Paediatrics | "Passionate about child health and developmental care" |

### 3.8 Process (NEW)

**Background:** White (`--card`).

**Header:** "Your Journey With Us" centered, `--fg` text. Subtitle: "Simple, transparent, patient-first" in `--muted-fg`.

**Layout:** 3 steps in a horizontal row with connecting lines between them. Stacked vertically on mobile.

**Steps:**
| Step | Number | Title | Description |
|------|--------|-------|-------------|
| 1 | 01 | Arrive | "Walk in or book online. We respect your time with minimal wait." |
| 2 | 02 | Listen | "We take the time to understand your concerns, history, and goals." |
| 3 | 03 | Plan Together | "Collaborate on a treatment plan that fits your life and needs." |

**Design:**
- Step number in large Figtree 700, `--primary` color (48px)
- Horizontal dashed line connecting steps (in `--border` color)
- Title in Figtree 600, `--fg`
- Description in Noto Sans 400, `--muted-fg`
- Each step centered in its column

**Mobile:** Vertical stack with vertical connecting line.

### 3.9 Testimonials

**Background:** Deep teal (`--fg` / `#134E4A`). Text: white.

**Header:** "Patient Stories" centered, white text. Subtitle: "Real experiences from real patients" in muted white.

**Layout:** 3 cards in a row (1 column on mobile).

**Each card:**
- Quote text (Noto Sans 400, 1rem, white, with opening quotation mark graphic in coral)
- Patient name (Figtree 600, 0.875rem, white)
- "Verified Patient" label (Noto Sans 400, 0.75rem, muted white)
- White/transparent card with subtle white border (rgba(255,255,255,0.15))

**Testimonials:**
| Quote | Name |
|-------|------|
| "The care I received was exceptional. Dr. Chen took the time to listen and explain everything clearly." | — James W. |
| "My family has been coming here for years. The staff is warm, professional, and truly caring." | — Maria L. |
| "I was nervous about my first visit, but the team made me feel completely at ease." | — David R. |

### 3.10 Booking

**Layout:** 2-column (50/50 on desktop, stacked on mobile).

**Left column — Contact Info:**
- "Get In Touch" heading (Figtree 700, `--fg`)
- Address: "123 Health Avenue, Medical District, Suite 200"
- Phone: "(555) 123-4567"
- Email: "info@sterlingmedical.com"
- Hours: "Mon–Fri: 8:00 AM – 6:00 PM | Sat: 9:00 AM – 2:00 PM"
- Each item with a small icon (MapPin, Phone, Mail, Clock) in `--primary`

**Right column — Contact Form:**
- Name input (text, required)
- Email input (email, required)
- Phone input (tel, optional)
- Message textarea (required)
- "Send Message" button — coral bg (`--accent`), white text, `--radius-pill`

**Form validation:** Client-side, inline error messages below each field. Error state: `--destructive` border + text. Success: brief confirmation message.

**Accessibility:** All inputs have `<label>`, `aria-required`, `aria-describedby` for errors. Focus management on submit.

### 3.11 Footer

**Background:** Deep charcoal (`#1A1A2E` or `#0F172A`). Text: white.

**Layout:** 3 columns + bottom bar.

| Column | Content |
|--------|---------|
| Brand | Logo + "Sterling Medical Centre" + brief tagline |
| Quick Links | Home, About, Services, Team, Testimonials |
| Contact | Address, Phone, Email |

**Bottom bar:** 
- Left: "© 2026 Sterling Medical Centre. All rights reserved."
- Right: Social media icons (Facebook, Twitter/X, Instagram, LinkedIn) — SVG, white, 20px, hover: coral

---

## 4. Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | < 640px | Single column, stacked sections, hamburger nav |
| Tablet | 640–1024px | 2-column grids where applicable, compact nav |
| Desktop | > 1024px | Full 3-column grids, 2-column hero/booking |

**Touch targets:** Minimum 44×44px on all interactive elements.

---

## 5. Accessibility Requirements

- **WCAG AAA** compliance (target: 7:1 contrast for body text where possible, minimum 4.5:1)
- All images have descriptive `alt` text
- Focus states visible on all interactive elements (3px focus ring in `--ring` color)
- `prefers-reduced-motion`: disable scroll animations, reduce transitions to instant
- Skip navigation link ("Skip to main content")
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- ARIA landmarks and labels on all sections
- Form fields: labels, `aria-required`, `aria-describedby` for errors/hints
- Keyboard navigation: logical tab order, no keyboard traps
- Mobile menu: focus trap, escape key to close, `aria-expanded`

---

## 6. Animation & Interactions

**Scroll animations:**
- Sections fade in + slight translateY(20px) on scroll into view
- IntersectionObserver with 10% threshold
- `prefers-reduced-motion: reduce` → no animations

**Count-up stats:**
- Trigger when Trust Bar enters viewport
- Animate from 0 to final value over 2 seconds
- Use `requestAnimationFrame` for smooth performance

**Hover states:**
- Cards: subtle shadow + translateY(-2px), 200ms ease-out
- Buttons: opacity change or background darken, 150ms
- Nav links: color transition to `--primary`, 150ms

**Focus states:**
- 3px outline in `--ring` color, 2px offset
- Visible on keyboard focus only (`:focus-visible`)

---

## 7. Feature Retention

Features carried forward from the current site:
- ✅ Scroll-triggered animations (IntersectionObserver)
- ✅ Mobile hamburger menu
- ✅ Contact form with validation
- ✅ Count-up statistics
- ✅ Back-to-top button (coral, bottom-right)
- ✅ Progress bar (top of page on scroll)

---

## 8. File Structure

```
greenvalleyclinic/
├── index.html          (rewrite — new sections, new markup)
├── css/
│   └── style.css       (rewrite — new design tokens, new components)
├── js/
│   └── script.js       (update — new animations, updated form validation)
├── images/
│   ├── clinic-interior.jpg    (existing)
│   ├── doctor-consultation.jpg (existing)
│   ├── doctor-female.jpg      (existing)
│   ├── doctor-female-2.jpg    (existing)
│   ├── doctor-male.jpg        (existing)
│   └── sterling-logo.png      (existing)
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-07-16-sterling-medical-centre-redesign.md (this file)
```

---

## 9. Out of Scope

- No new images or photography (reuse existing 6 images)
- No backend/form submission (client-side validation only)
- No multi-page navigation (single-page site)
- No dark mode toggle (dark sections are static design, not theme-switchable)
- No CMS integration
- No analytics or tracking
- No animation library dependencies (vanilla JS + CSS only)

---

## 10. Success Criteria

1. All 11 sections render correctly at 375px, 768px, 1024px, and 1440px widths
2. No WCAG AAA violations (automated scan)
3. All interactive elements keyboard-accessible
4. Page loads under 3 seconds on 3G (no external JS dependencies beyond Google Fonts)
5. Form validation works with screen readers
6. Count-up animation triggers correctly
7. Mobile menu opens/closes with focus trap
8. All existing images used at least once
9. No console errors
10. Design matches approved palette and typography exactly
