# Women's Parlour SaaS Platform — Product Specification

## Vision

Build a premium, feminine, modern beauty-service platform that combines:

- Appointment booking
- Beauty service management
- E-commerce
- Staff/admin operations
- Customer relationship management
- Multi-business SaaS scalability

The platform must feel luxurious and emotionally appealing while remaining accessible to all income brackets.

The long-term goal is not just a single parlour website, but a reusable multi-tenant SaaS platform that can be rebranded and deployed for multiple beauty businesses using the same codebase.

---

# Core Technical Direction

## Frontend Stack

- Next.js 15+
- TypeScript
- TailwindCSS
- ShadCN UI
- Framer Motion
- React Hook Form
- Zod
- TanStack Query

## Backend

- Next.js Route Handlers
- PostgreSQL
- Prisma ORM
- Redis
- UploadThing / S3

## Authentication

- Clerk OR Auth.js

## Payments

- Stripe

---

# Product Goals

## Phase 1

Launch a premium beauty platform for a single salon.

## Phase 2

Convert platform into a multi-tenant SaaS where multiple salons can subscribe and customize their own storefronts.

## Phase 3

Add SaaS billing, automation, analytics, and white-labeling.

---

# UI/UX Direction

## Brand Feel

The platform should feel:

- Elegant
- Feminine
- Premium
- Fashion-forward
- Calm
- Sophisticated
- Luxurious but welcoming

Think:

- Porsche-level polish
- Apple-level simplicity
- Sephora-level beauty branding

---

# Homepage Experience

The homepage must instantly communicate:

> “This is a premium beauty experience.”

## Homepage Sections

### 1. Hero Section

- Emotional luxury imagery
- Smooth animations
- Booking CTA
- Shop CTA

### 2. Services Showcase

- Makeup
- Nails
- Eyelashes
- Facials
- Hair
- Spa services

### 3. Featured Products

- Product carousel/grid
- Promotions
- Best sellers

### 4. Testimonials

- Reviews
- Before/after visuals

### 5. Instagram/TikTok Feed

- Reels
- Beauty transformations
- Social proof

### 6. Memberships & Packages

Optional recurring beauty plans.

---

# Core Features

# 1. Booking System

## Booking Flow

1. Select service category
2. Select service
3. Select stylist/staff
4. Select date
5. Select available time
6. Enter customer details
7. Pay deposit/full amount
8. Confirmation

## Features

- Real-time availability
- Calendar management
- Staff scheduling
- Booking reminders
- SMS/email notifications
- Deposits
- Cancellation policies
- Rescheduling

## Appointment Statuses

- Pending
- Confirmed
- In Progress
- Completed
- Cancelled
- No Show

---

# 2. E-Commerce Shop

## Features

- Product catalog
- Categories
- Product search
- Cart
- Wishlist
- Discounts/coupons
- Checkout
- Order tracking

## Product Types

- Physical products
- Beauty kits
- Gift cards
- Bundles

---

# 3. Admin Dashboard

## Admin Capabilities

### Appointment Management

- Calendar view
- Booking editing
- Manual bookings
- Staff assignment

### Product Management

- Inventory management
- Product uploads
- Pricing
- Discounts

### Customer Management

- Customer profiles
- Booking history
- Purchase history
- Notes/preferences

### Staff Management

- Invite admins/staff
- Role permissions
- Availability setup

### Analytics

- Revenue
- Product sales
- Bookings
- Customer growth
- Top-performing services

---

# 4. SaaS / Multi-Tenant Architecture

## Every Salon/Tenant Must Have

- Own branding
- Own products
- Own bookings
- Own staff
- Own analytics
- Own customers

## Domain Support

- salon.platform.com
- customdomain.com

## White-Label Features

Each tenant can customize:

- Logo
- Colors
- Fonts
- Homepage banners
- Domain

---

# Design System

## Color Direction

Suggested palette:

- Soft blush
- Cream
- Rose gold
- Deep charcoal

Alternative palette:

- Nude beige
- Warm white
- Gold accents
- Matte black

## Typography

### Headings

- Playfair Display
- Cormorant Garamond

### Body

- Inter
- Manrope

## Motion Design

Use subtle Framer Motion animations:

- Fade reveals
- Smooth transitions
- Hover interactions
- Floating elements

Avoid excessive motion.

---

# Mobile Experience

This platform must be mobile-first.

Beauty businesses receive most traffic from:

- Instagram
- TikTok
- WhatsApp

## Mobile Goals

- Fast booking
- Thumb-friendly navigation
- Fast checkout
- Sticky CTA buttons
- Optimized image loading

---

# Security Requirements

- Secure authentication
- Role-based access control
- Rate limiting
- Input validation
- CSRF protection
- Secure payment processing

---

# SEO & Marketing

## SEO

- Fast loading
- OpenGraph support
- Structured metadata
- Sitemap generation
- SEO-friendly URLs

## Marketing Integrations

- Meta Pixel
- TikTok Pixel
- Google Analytics
- Email marketing
- SMS campaigns

---

# Suggested Monorepo Structure

```txt
/apps
  /web
  /admin
  /api

/packages
  /ui
  /database
  /auth
  /config
  /types
  /utils
```

---

# Database Entities

## Core Tables

### Tenants

- id
- name
- domain
- branding
- subscription_plan

### Users

- id
- tenant_id
- role
- email

### Services

- id
- tenant_id
- name
- duration
- price

### Appointments

- id
- customer_id
- service_id
- staff_id
- status
- datetime

### Products

- id
- tenant_id
- name
- inventory
- price

### Orders

- id
- customer_id
- total
- status

---

# Development Roadmap

## Phase 1 — Foundation

- Monorepo setup
- Authentication
- Database schema
- Design system
- Landing page

## Phase 2 — Booking System

- Booking engine
- Calendar
- Notifications
- Staff schedules

## Phase 3 — E-Commerce

- Product catalog
- Cart
- Checkout
- Orders

## Phase 4 — Admin Dashboard

- Analytics
- Staff management
- Product management
- Booking management

## Phase 5 — SaaS Enablement

- Multi-tenancy
- White-labeling
- Subscription billing

---

# AI Builder Instructions

The UI should:

- Feel premium and luxurious
- Be mobile-first
- Use elegant spacing
- Use large typography
- Prioritize clean layouts
- Use reusable components
- Avoid clutter
- Use ShadCN components consistently
- Use TailwindCSS utilities
- Use Framer Motion subtly
- Prioritize accessibility
- Use modern dashboard layouts
- Use reusable cards, tables, dialogs, sheets, and forms

## Important

This is NOT just a salon website.

This is a reusable SaaS beauty-business operating system.
