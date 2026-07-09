# DOCA V2 Presentation — Design & Content Rules

## Purpose
These rules apply to every slide in `doca-v2.html`. Before writing any slide, check this file.

---

## 1. Writing Style

| Rule | Correct | Wrong |
|------|---------|-------|
| No em-dash | `for AI infrastructure, through DOCA.` | `for AI infrastructure — through DOCA.` |
| No ellipsis abuse | Use a period. | `...` at end of sentence |
| No AI phrasing | "Customers need X to solve Y" | "Leveraging synergies..." |
| Short bullets | Max 10 words per bullet | Full paragraphs in bullets |
| One message per slide | Each slide has ONE key claim | Multiple competing headlines |

**Separators allowed:** `·` (middle dot), `,`, `:`, `/`
**Never use:** `—` (em-dash), `–` (en-dash)

---

## 2. Color System

| Color | Hex | Usage |
|-------|-----|-------|
| Green | `#76b900` | DOCA platform, software layer, positive outcomes |
| Blue | `#3490e0` | ConnectX SuperNIC, networking, info |
| Teal | `#18a878` | BlueField DPU, programmable hardware |
| Red | `#e05050` | Problems, CPU bottleneck, before-state |
| Orange | `#d4820a` | Warnings, risks, urgency |
| Text | `#dce8ff` | Primary text |
| Text2 | `#7a9ac0` | Secondary text, descriptions |
| Text3 | `#364d68` | Labels, captions, metadata |

---

## 3. Typography

- **Eyebrow:** 11px, 700, `letter-spacing: .18em`, `text-transform: uppercase`, green
- **Headline:** `clamp(26px, 3.2vw, 44px)`, 800, `letter-spacing: -.026em`
- **Subline:** 14px, color text2
- **Card title / layer title:** 14px, 700
- **Body text / descriptions:** 12.5–13px, color text2
- **Labels / tags:** 9–10px, 700, uppercase, wide letter-spacing
- **Monospace (tech terms):** use `--mono` font for specs (e.g., `400Gb`, `RDMA/RoCE`)

---

## 4. Layout System

- **Slide content:** wrapped in `.sc` — `max-width: 900px`, centered, `padding: 22px 32px 14px`
- **Full viewport:** each slide is `position: absolute; inset: 0`
- **No horizontal scroll ever**
- **Mobile:** padding reduces to `14px 18px`, single-column grids
- **Grid cards:** `grid-template-columns: repeat(3, 1fr)` on desktop, `1fr` on mobile

---

## 5. Animation Rules

| Class | Type | Delay |
|-------|------|-------|
| `.a1` | fadeUp | 0.04s |
| `.a2` | fadeUp | 0.13s |
| `.a3` | fadeUp | 0.22s |
| `.a4` | fadeUp | 0.33s |
| `.a5` | fadeUp | 0.45s |
| `.a6` | fadeUp | 0.56s |
| `.la1–la9` | slideRight | 0.08s–0.80s stagger |

- Assign `.a1` to eyebrow, `.a2` to headline, `.a3` to thesis/intro, `.a4` to main content, `.a5` onward to secondary content and footer
- **No autoplay loops** on slide content (background canvas loop is fine)
- Animations reset when leaving a slide (via `display:none` reflow trick)

---

## 6. Component Patterns

### Thesis quote
```html
<div class="thesis a3">
  Short, one or two sentences. <strong style="color:var(--text)">Key phrase bold.</strong>
</div>
```
Left green border, subtle green background.

### Product card
```html
<div class="p-card [focal|hi]">
  <div class="p-icon-wrap"><svg>...</svg></div>
  <div class="p-body">
    <div class="p-tag">TYPE</div>
    <div class="p-name">Name</div>
    <div class="p-desc">One sentence. Max 15 words.</div>
  </div>
</div>
```
- `focal` = green (DOCA)
- `hi` = blue (ConnectX)
- default = neutral

### Layer stack (slide 2 pattern)
```html
<div class="lyr [hi|hi-teal|hi-blue]">
  <div class="lyr-icon"><svg>...</svg></div>
  <div class="lyr-main">
    <div class="lyr-title">Name</div>
    <div class="lyr-sub">Short description · with middot separators</div>
  </div>
</div>
```

### Before/After example
```html
<div class="ex-box">
  <div class="ex-tag">Example context</div>
  <div class="ex-q">Question framing the problem?</div>
  <div class="ex-cols">
    <div class="ex-col bad">...</div>
    <div class="ex-col good">...</div>
  </div>
  <div class="ex-result"><strong>Key takeaway:</strong> one sentence.</div>
</div>
```

### Callout / insight
```html
<div class="insight la9">
  <div class="insight-hd">LABEL</div>
  Short, 1-2 sentence insight. <strong style="color:var(--text)">Emphasis here.</strong>
</div>
```

---

## 7. Slide Structure Checklist

Every slide must have:
- [ ] `.eyebrow` with slide context (topic · slide N of 11)
- [ ] `.headline` with slide title (gradient optional)
- [ ] One primary visual/diagram OR content section
- [ ] Footer on slide 1 only (Barak + NVIDIA)
- [ ] All content wrapped in `.sc`

---

## 8. Slides Roadmap

| # | Title | Status | Key Visual |
|---|-------|--------|-----------|
| 1 | DOCA Solution Blueprints | ✅ Done | Thesis + 3 cards + example |
| 2 | What is DOCA | ✅ Done | Layer stack diagram |
| 3 | ConnectX & BlueField | Pending | Comparison table or split-screen |
| 4 | Market Landscape | Pending | Competitor bars + ecosystem |
| 5 | Key Customers | Pending | Customer cards with use cases |
| 6 | Market Urgency | Pending | Stats + 3 drivers |
| 7 | Strategic Alternatives | Pending | 5 strategy cards, B highlighted |
| 8 | Chosen Strategy | Pending | Blueprint flow diagram |
| 9 | Example Blueprint | Pending | Detailed before/after |
| 10 | Roadmap | Pending | 4-phase timeline |
| 11 | ROI & Metrics | Pending | 3-layer metrics table |
| 12 | Sources & Assumptions | Pending | Two-column transparency |
| 13 | Why Barak Rozenfeld | Pending | 3 pillars + JD fit table |
