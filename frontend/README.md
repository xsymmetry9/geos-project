# GEOS App

Language-school tooling for creating, editing, printing, and organizing **Student Progress Reports (SPR)** and **Level Checks**. Data is stored in the browser (`localStorage`).

Live app: [https://main.geos-project.pages.dev/](https://main.geos-project.pages.dev/)

## Tech stack

- **Frontend:** React + TypeScript
- **Routing:** React Router
- **Styling:** Tailwind CSS v4 + shared design tokens in `src/styles/index.css`
- **PDF:** html2canvas-pro + jsPDF (print / extract)
- **Deployment:** Cloudflare Pages

---

## Recent work summary (SPR UX)

### Product / form

- Added an editable **date** field on SPR student information (defaults to today; print uses the saved date).
- Improved **attendance / total lessons** number inputs so clearing zeros is easy (digit-only text fields, empty while editing).
- Redesigned the multi-step SPR form (Info → Level → Feedback → Review):
  - Progress bar + step chips
  - Soft card panels for fields
  - Pill **Back / Next / Save** buttons (with icons)
  - Removed redundant section titles (progress bar shows the step)
- Level help: Info icon opens a **centered modal** with **3 columns** (lower / current / higher level). Arrow keys and buttons step through scores (e.g. 2.5 → 3).

### Navigation / chrome

- Header language control is a **dropdown** (English, Chinese, Korean, Japanese).
- Header includes **SPR** and **Level Check** menus (New Form / View Forms).
- Simplified branding (logo only; removed “Online Language Academy” text and Home link).
- Homepage table pagination: simple `< 1 2 3 >` (removed “Showing X of Y”).

### Print / PDF

- Extract PDF uses **JPEG @ 92%** (smaller files, print-clear). Print path stays high-quality PNG.
- Print preview actions (**View SPRs**, **Print**, **Extract**) sit at the **top**.
- Print UI chrome and empty values (`NA`, buttons, save popup) follow the selected language.

### Localization

- SPR form labels, errors, placeholders, steps, and help dialog text use `src/assets/other/labelText.json`.
- Stored values stay language-neutral (course codes, level scores).

---

## UI design system

Tokens live in `src/styles/index.css` (`@theme` + component classes). Prefer these over one-off colors.

### Color

| Token | Value | Use |
|--------|--------|-----|
| `--color-brand` | `#00796b` | Primary actions, active steps, headers |
| `--color-brand-dark` | `#005f54` | Hover / emphasis on brand |
| `--color-brand-soft` | `#e6f4f2` | Soft fills, selected help column |
| `--color-surface` | `#f4f7f6` | Page background, form cards |
| `--color-panel` | `#ffffff` | Panels / cards |
| `--color-ink` | `#1a2e2b` | Body text |
| `--color-muted` | `#5f726e` | Labels, secondary text |
| `--color-line` | `#d7e3e0` | Borders, dividers |
| `--color-active` | `#09c5eb` | Legacy accent (focus elsewhere) |

App shell uses a light brand radial wash over `--color-surface`.

### Typography

| Role | Font |
|------|------|
| UI (default) | **Poppins** (`--font-secondary`) |
| Print / long text (legacy) | Merriweather (`--font-primary`) |
| Chinese print | Noto Serif/Sans TC |
| Korean print | Noto Serif/Sans KR |
| Japanese print | Noto Serif/Sans JP |

Form labels: ~0.8rem, semibold, muted, capitalized.  
Inputs: ~0.95rem, ink on white.

### Layout primitives

- **`.panel`** — white card, 16px radius, light border + soft shadow. Used for main form shell and dialogs.
- **`.form-aspect`** — soft surface card (`--color-surface`), 12px radius, line border. Used for Info, Feedback, and each skill block on Level.
- **`.form-field` / `.form-textarea`** — rounded 10px bordered inputs with brand focus ring.
- **`.form-section-title`** — brand bar title (still used on Review/print-style blocks).
- Max form width ~`55rem` page / `max-w-lg` for the step content column.

### Components / patterns

**Progress (SPR steps)**  
- Meta row: current step name + `n / 4`  
- Track + brand gradient fill  
- Pill step chips; active = solid brand  

**Nav buttons (`.form-nav-btn-*`)**  
- Pill shape (`border-radius: 999px`)  
- Back: white + line border  
- Next / Save: brand fill + soft shadow  
- Icons: Lucide (`ChevronLeft` / `ChevronRight` / `Save`)  

**Dialogs**  
- Full-screen dimmed backdrop (`bg-ink/40` + light blur)  
- Centered `.panel`, brand header bar, close (X)  
- Level help: wide modal (~56rem), 3 columns; middle highlighted with brand border + soft fill  

**Header**  
- Sticky, frosted white bar  
- Dropdowns for SPR, Level Check, Language  

**Homepage pagination**  
- Centered numbered pages with chevrons; no “showing X of Y” text  

**PDF extract**  
- Screenshot via html2canvas (`scale: 2`) → JPEG quality `0.92` → jsPDF A4  

### Spacing rhythm (forms)

- Section stack gap ~`1.25rem`  
- Field gap ~`1.15rem`  
- Card padding ~`1rem`  
- Actions: top border divider, space-between Back and Next/Save  

### Do / don’t

- **Do** reuse tokens and `.form-*` / `.panel` classes for new SPR UI.  
- **Do** put user-facing strings in `labelText.json` (all four languages).  
- **Don’t** translate stored course codes or level score values.  
- **Don’t** introduce purple/glow/default-AI themes; stay on teal brand + soft surface.

---

## Key paths

| Area | Path |
|------|------|
| Design tokens / form CSS | `src/styles/index.css` |
| Copy / i18n | `src/assets/other/labelText.json` |
| Level descriptions | `src/assets/other/levelInformation.json` |
| SPR form shell | `src/pages/SPRForm.tsx`, `src/components/Form/PlotForm.tsx` |
| Form steps | `src/components/Form/components/*` |
| Print view | `src/components/PrintSPR.tsx`, `src/components/PrintStudentProgressReport.tsx` |
| Header | `src/components/Header.tsx` |

---

## Local development

```bash
npm install
npm run dev
```
