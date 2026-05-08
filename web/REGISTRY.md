# Pokaliz Laire — Component Registry

Quick-reference map of every component, its file, and what it does.

---

## Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Homepage — composes all home sections |
| `/services` | `app/services/page.tsx` | Full services list with category filter |
| `/book` | `app/book/page.tsx` | 5-step booking wizard (service → staff → date/time → details → confirm) |
| `/shop` | `app/shop/page.tsx` | Product grid with search, category filter, sort, cart count |

---

## Layout Components

| Component | File | Description |
|-----------|------|-------------|
| `Navbar` | `components/layout/Navbar.tsx` | Sticky nav — transparent → glass on scroll. Mobile sheet menu. Logo + links + Book CTA |
| `Footer` | `components/layout/Footer.tsx` | Full footer — brand, 4 link columns, newsletter strip, bottom bar |

---

## Homepage Sections

| Component | File | Description |
|-----------|------|-------------|
| `HeroSection` | `components/home/HeroSection.tsx` | Full-screen hero — animated gradient bg, parallax title, stats, two CTAs, scroll indicator |
| `MarqueeStrip` | `components/home/MarqueeStrip.tsx` | Scrolling text band. Accepts `reverse` prop. Used between sections |
| `ServicesShowcase` | `components/home/ServicesShowcase.tsx` | 3×2 grid of service categories. Hover reveals gold bottom border + explore link |
| `FeaturedProducts` | `components/home/FeaturedProducts.tsx` | Asymmetric product grid (first card wider). Quick-add on hover. Wishlist button |
| `TestimonialsSection` | `components/home/TestimonialsSection.tsx` | Animated testimonial carousel — prev/next + dot nav. Giant decorative quote mark |
| `SocialFeed` | `components/home/SocialFeed.tsx` | Asymmetric 6-tile social grid. Video badge, hover likes/tag overlay |
| `MembershipsSection` | `components/home/MembershipsSection.tsx` | 3-tier membership cards (Soirée / Lumière / Couture). Middle card featured/scaled |

---

## Data

| File | Contents |
|------|----------|
| `lib/data.ts` | All dummy data: services (6 categories × 4 items), staff (6), products (8), testimonials (5), memberships (3), timeSlots, bookingDates, socialPosts |

---

## Design Tokens (globals.css + inline)

| Token | Value | Usage |
|-------|-------|-------|
| Noir | `#0D0B0E` | Main background |
| Charcoal | `#141118` / `#110E15` | Card backgrounds |
| Border | `#1A1620` / `#2C2438` | Card/section borders |
| Gold | `#C9A55A` | Primary accent — CTAs, icons, prices |
| Gold Light | `#E8C99A` | Hover state of gold |
| Rose Gold | `#B57850` | Tertiary accent |
| Cream | `#F2ECE4` | Primary text |
| Muted | `#554D60` | Secondary / subdued text |
| Deep muted | `#2C2438` | Placeholder / disabled |

| Font | Variable | Usage |
|------|----------|-------|
| Cormorant Garamond | `--font-cormorant` | All headings, display text, prices |
| Manrope | `--font-manrope` | All body, labels, buttons, UI text |

---

## ShadCN Components Used

- `Button` — `components/ui/button.tsx`
- `Card` — `components/ui/card.tsx`
- `Badge` — `components/ui/badge.tsx`
- `Input` — `components/ui/input.tsx`
- `Label` — `components/ui/label.tsx`
- `Select` — `components/ui/select.tsx`
- `Tabs` — `components/ui/tabs.tsx`
- `Sheet` — `components/ui/sheet.tsx` (used in Navbar mobile menu)
