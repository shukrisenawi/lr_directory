# Redesign Proposal: IDXI Directory — "Ocean Current"

## Masalah Design Sedia Ada

| Isu | Penerangan |
|-----|-----------|
| Dual personality | Public warm/cream, admin klinikal putih — tiada identity konsisten |
| "Pharma Clean" | Terlalu klinikal untuk direktori perikanan/laut |
| Tiada identiti marin | Langsung tiada elemen visual yang relate dengan industri |
| Border-radius tak konsisten | 22px-28px public vs 8px admin |
| Typography tak konsisten | Spec guna Inter tapi implementation guna Instrument Sans |
| Flat berlebihan | Tiada depth, nampak murah |
| Warm tones tak padan | Cream background tak mencerminkan jenama profesional |

---

## Design Direction Baru: "Ocean Current"

> Inspirasi: Lautan, profesionalisme, kepercayaan — warna biru lautan dalam, aksen amber keemasan (matahari terbit di laut), dan elemen organik lembut.

### Color Palette

```
Primary (Deep Ocean):    #0A2647    (navy pekat — header, footer, sidebar)
Secondary (Current):     #1E5A8A    (biru sederhana — cards, section bg)
Accent (Sunrise):        #F59E0B    (amber/keemasan — CTA, highlights)
Accent Alt (Coral):      #06B6D4    (cyan — secondary CTAs, badges)
Surface (Foam):          #F8FAFC    (putih kebiruan — page backgrounds)
Surface Card:            #FFFFFF    (kad putih)
Muted (Tide):            #64748B    (slate — teks secondary, metadata)
Border (Shallows):       #E2E8F0    (border ringan)
Dark Text (Abyss):       #0F172A    (teks utama gelap)

Gradients:
  - Hero: #0A2647 → #1E3A5F (deep ocean)
  - Card hover: subtle lift with shadow
```

### Typography

| Level | Font | Size | Weight |
|-------|------|------|--------|
| Display | Inter | 3.5rem (56px) | 600 |
| H1 | Inter | 2.25rem (36px) | 600 |
| H2 | Inter | 1.5rem (24px) | 600 |
| H3 | Inter | 1.25rem (20px) | 600 |
| Body | Inter | 0.9375rem (15px) | 400 |
| Small | Inter | 0.8125rem (13px) | 400 |
| Label (uppercase) | Inter | 0.6875rem (11px) | 600 |

### Border Radius System (Konsisten)

```
sm: 6px
md: 10px
lg: 16px
xl: 24px
full: 9999px (pill)
```

### Shadows (Depth)

```
sm: 0 1px 2px rgba(10, 38, 71, 0.05)
md: 0 4px 12px rgba(10, 38, 71, 0.08)
lg: 0 8px 30px rgba(10, 38, 71, 0.12)
xl: 0 20px 60px rgba(10, 38, 71, 0.15)
```

### Effects

- **Subtle gradients** pada hero dan section headers
- **Glassmorphism** ringan pada search bar dan nav (backdrop-blur)
- **Hover lift** pada cards (translateY -2px + shadow increase)
- **Ocean wave divider** antara sections (optional SVG)
- **Smooth transitions** (200-300ms ease)

---

## Halaman Utama (Public)

### 1. Welcome Page (Frontpage)
- **Hero**: Gradient biru laut dalam (#0A2647 → #1E3A5F) dengan pattern wave/pattern overlay
- **Logo**: Lebih prominent dengan glass effect
- **Search bar**: Glassmorphism, rounded-xl, floating shadow
- **Tagline**: Clean, professional, dengan subtle text-shadow
- **Categories**: Pill buttons with icons, hover effect amber
- **New Listings**: Card dengan image, overlay gradient pada image, hover lift
- **Testimonial**: Clean card dengan quote styling, avatar ring
- **CTA Section**: Background wave divider, dual CTA buttons
- **Footer**: Dark navy, link columns, social icons

### 2. Directory Page
- **Search header**: Consolidated dalam card dengan background ringan
- **Filter bar**: Horizontal filter pills, active state amber
- **Grid cards**: Aspect ratio konsisten, image dengan overlay gradient bottom
- **Company type badge**: Coral/cyan untuk visual variety
- **Empty state**: Illustrated empty state dengan illustration

### 3. Company Detail Page
- **Hero image**: Full-width dengan overlay gradient
- **Company info**: Sticky sidebar, clean typography
- **Tabs**: Products / About / Contact dengan animated underline

### 4. Category Page
- **Header**: Large category title dengan icon dan description
- **Subcategory grid**: Compact cards dengan count badge
- **Company listing**: Filterable, sortable

---

## Halaman Authenticated (App Shell)

### Sidebar (Dashboard Navigation)
- **Background**: Dark navy (#0A2647), bukan putih/light
- **Active state**: Amber accent left border + subtle amber bg
- **Icons**: Lucide icons, white/amber
- **User section**: Bottom-anchored with avatar + role badge
- **Collapsed state**: Compact icons + tooltip

### Header
- **Breadcrumbs**: Clean, small font
- **Search**: Global command palette (optional)
- **Notifications**: Badge with amber dot
- **User menu**: Avatar dropdown with role indicator

### Dashboard Content
- **Welcome banner**: Subtle gradient card dengan role-specific message
- **Stats cards**: Grid dengan icon, subtle shadow, hover effect
- **Quick actions**: Button group with icons

---

## Halaman Auth

- **Split layout**: Left panel dengan brand illustration/message, right panel form
- **Background**: Subtle gradient atau pattern
- **Card**: Centered, glassmorphism light, shadow-lg
- **Form**: Clean input dengan focus ring amber
- **Logo**: Small brand logo di atas form

---

## Fasa Pelaksanaan

| Fasa | Skop | Anggaran |
|------|------|----------|
| 1 | CSS theme tokens, variables, base styles | 1 session |
| 2 | Welcome page redesign | 1 session |
| 3 | Directory & category pages | 1 session |
| 4 | App shell (sidebar + header) | 1 session |
| 5 | Dashboard & admin pages | 1 session |
| 6 | Auth pages | 1 session |
| 7 | Refinement & responsive | 1 session |

---

## Mockup Ringkas Welcome Page (Layout)

```
 ┌──────────────────────────────────────────────────────┐
 │ [Logo] IDXI                        [Login] [Register] │ ← Transparent nav on hero
 │──────────────────────────────────────────────────────│
 │                                                       │
 │    🌊  INFOFISH DIRECTORY                              │
 │    Find trusted fishery suppliers,                     │
 │    processors, and service partners.                   │
 │                                                       │
 │  ┌──────────────────────────────────────────────┐     │
 │  │ 🔍 What: Seafood, Processor...  📍 Where:   │🔍│     │ ← Glass search
 │  └──────────────────────────────────────────────┘     │
 │                                                       │
 │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐            │
 │  │Fish │ │Boat │ │Proc │ │Fz Stor│ │Equip │            │ ← Category pills
 │  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘            │
 │──────────────────────────────────────────────────────│
 │  Browse Categories...                                 │
 │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐│
 │  │Frozen Fish│ │Fresh Fish│ │Processing │ │ Logistics││
 │  │Tuna,Salmon│ │Grouper.. │ │Equipment..│ │Cold Stor││
 │  └──────────┘ └──────────┘ └──────────┘ └──────────┘│
 │──────────────────────────────────────────────────────│
 │  ┌────┐  ┌────┐  ┌────┐                              │
 │  │Card│  │Card│  │Card│   New Listings               │
 │  └────┘  └────┘  └────┘                              │
 │──────────────────────────────────────────────────────│
 │  Testimonial Section                                 │
 │──────────────────────────────────────────────────────│
 │  CTA: Claim Your Listing                             │
 │──────────────────────────────────────────────────────│
 │  Footer — Dark Navy                                  │
 └──────────────────────────────────────────────────────┘
```

---

## Teknikal Implementation

- **CSS variables**: Update `:root` in `app.css` with new HSL values
- **Tailwind theme**: Extend in `@theme` directive
- **shadcn components**: Update `--radius` variable, component variants stay
- **Font**: Change from Instrument Sans → Inter (via bunny.net)
- **Components affected**: ~20 page components + ~10 layout components
- **No structural changes**: Layout components (AppShell, sidebar, header) maintain same structure, only styling tokens change
