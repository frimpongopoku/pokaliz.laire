# Pokaliz Laire — Component Registry

Quick-reference map of every component, page, and data file.
Current version: **0.10.0**

---

## Customer-Facing Pages (`app/(public)/`)

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Homepage — composes all home sections |
| `/services` | `app/services/page.tsx` | Full services list with category filter |
| `/book` | `app/book/page.tsx` | 5-step booking wizard (service → staff → date/time → details → confirm) |
| `/shop` | `app/shop/page.tsx` | Product grid with search, category filter, sort, cart count |

---

## Admin Pages (`app/(admin)/admin/`)

| Route | File | Description |
|-------|------|-------------|
| `/admin` | `admin/page.tsx` | Overview dashboard — revenue chart, KPI strip, recent appointments table, top products |
| `/admin/appointments` | `admin/appointments/page.tsx` | Appointments — status tabs, search, List\|Calendar toggle, table rows open view sheet, inline confirm/reschedule/cancel actions |
| `/admin/customers` | `admin/customers/page.tsx` | Customer list — summary strip, status filter tabs, searchable table |
| `/admin/products` | `admin/products/page.tsx` | Products — grid + list views, add/edit/view sheet chain |
| `/admin/staff` | `admin/staff/page.tsx` | Staff — card grid + table, add/view sheet, status dots |
| `/admin/marketing/social` | `admin/marketing/social/page.tsx` | Social feed — asymmetric grid preview, add/edit/delete/toggle-visible, management table |

---

## Admin Layout Components (`components/admin/`)

| Component | File | Description |
|-----------|------|-------------|
| `AdminHeader` | `AdminHeader.tsx` | Page title + subtitle bar used at top of every admin page |
| `AdminSidebar` | `AdminSidebar.tsx` | Left nav — logo, nav groups (Main, Marketing), active state, collapsible Marketing group with AnimatePresence |

---

## Admin Sheet Components (`components/admin/`)

| Component | File | Description |
|-----------|------|-------------|
| `AppointmentViewSheet` | `AppointmentViewSheet.tsx` | View appointment detail — client card, details grid, notes, activity timeline. Footer: Confirm / Reschedule (opens RescheduleSheet) / Cancel by status |
| `RescheduleSheet` | `RescheduleSheet.tsx` | Reschedule flow — new date input, time select, collapsible staff reassignment grid (Off Today disabled), reason chips, notes, live from→to changes summary pill |
| `NewBookingSheet` | `NewBookingSheet.tsx` | New booking creation — existing/new client toggle, service accordion, staff grid, date+time, status toggle, notes, live summary pill |
| `AddStaffSheet` | `AddStaffSheet.tsx` | Add staff — name, role autocomplete, email, phone, status toggle, specialty tags, gradient avatar preview |
| `StaffViewSheet` | `StaffViewSheet.tsx` | View staff detail — avatar, contact, stats grid, star bar, specialties, recent appointments list |
| `ProductSheet` | `ProductSheet.tsx` | Add/Edit product — dual mode (isEditing = !!product), gradient picker, category toggle, stock→status auto-derivation with override, edit mode shows sales stats |
| `ProductViewSheet` | `ProductViewSheet.tsx` | View product detail — gradient hero tile, stock level bar, performance grid. Footer: Edit (chains into ProductSheet) |
| `SocialPostSheet` | `SocialPostSheet.tsx` | Add/Edit social post — image URL with live preview + gradient fallback, caption counter, hashtag, visibility toggle |

---

## Admin Calendar (`components/admin/`)

| Component | File | Description |
|-----------|------|-------------|
| `CalendarView` | `CalendarView.tsx` | Week-view calendar — 64px/hour time axis, 9am–6pm, appointment blocks positioned absolutely by time, sweep-line `assignLanes()` for overlaps, color-coded by status, week nav (May 5–11 / May 12–18), "today" = May 12 gold highlight |

---

## Customer-Facing Layout & Sections

| Component | File | Description |
|-----------|------|-------------|
| `Navbar` | `components/layout/Navbar.tsx` | Sticky nav — transparent → glass on scroll, mobile sheet menu |
| `Footer` | `components/layout/Footer.tsx` | Full footer — brand, 4 link columns, newsletter strip |
| `HeroSection` | `components/home/HeroSection.tsx` | Full-screen hero — animated gradient bg, parallax title, stats, two CTAs |
| `MarqueeStrip` | `components/home/MarqueeStrip.tsx` | Scrolling text band. Accepts `reverse` prop |
| `ServicesShowcase` | `components/home/ServicesShowcase.tsx` | 3×2 service categories grid, hover reveals gold border + explore link |
| `FeaturedProducts` | `components/home/FeaturedProducts.tsx` | Asymmetric product grid, quick-add on hover |
| `TestimonialsSection` | `components/home/TestimonialsSection.tsx` | Animated testimonial carousel, prev/next + dot nav |
| `SocialFeed` | `components/home/SocialFeed.tsx` | Asymmetric 6-tile social grid. Video badge, hover overlay |
| `MembershipsSection` | `components/home/MembershipsSection.tsx` | 3-tier membership cards, middle card featured/scaled |

---

## Data Files

| File | Contents |
|------|----------|
| `lib/data.ts` | Customer-facing dummy data: services (6 categories × 4 items), staff (6), products (8), testimonials (5), memberships (3), timeSlots, bookingDates, socialPosts |
| `lib/admin-data.ts` | Admin dummy data: `appointments[]`, `customers[]`, `adminStaff[]`, `adminProducts[]`. Types: `Appointment`, `AppointmentStatus`, `Customer`, `AdminProduct`, `StaffMember` |

---

## Version Tracking

| File | Purpose |
|------|---------|
| `version.json` | Semver tracking separate from package.json — patch for bug fixes, minor for features. Changelog array inside. |

---

## Design Tokens

### Admin (Plus Jakarta Sans, dark purple-black)

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0D0B0E` | Deepest admin bg (sheet bg) |
| Surface | `#110E16` | Card / input backgrounds |
| Border | `#1C1828` | All admin borders |
| Border hover | `#2C2438` | Hover border state |
| Muted text | `#4D4560` | Labels, icons, placeholder |
| Secondary text | `#6B6378` | Sub-values |
| Body text | `#9B93A8` | General content |
| Primary text | `#C0B8CC` | Main content |
| Heading text | `#E8E0F0` | Page/section titles |
| Gold | `#C9A55A` | Accent — prices, CTAs, today indicator |
| Font | `--font-jakarta` (Plus Jakarta Sans) | All admin UI |

### Customer-Facing

| Token | Value | Usage |
|-------|-------|-------|
| Noir | `#0D0B0E` | Main background |
| Gold | `#C9A55A` | Primary accent |
| Gold Light | `#E8C99A` | Hover gold |
| Cream | `#F2ECE4` | Primary text |
| Muted | `#554D60` | Secondary text |
| Font (headings) | `--font-cormorant` (Cormorant Garamond) | Headings, display, prices |
| Font (body) | `--font-manrope` (Manrope) | Body, labels, buttons |

---

## ShadCN Components Used

- `Sheet` / `SheetContent` / `SheetHeader` / `SheetTitle` / `SheetClose` — all slide-over panels
- `Button` — `components/ui/button.tsx`
- `Card` — `components/ui/card.tsx`
- `Badge` — `components/ui/badge.tsx`
- `Input` — `components/ui/input.tsx`
- `Label` — `components/ui/label.tsx`
- `Select` — `components/ui/select.tsx`
- `Tabs` — `components/ui/tabs.tsx`
