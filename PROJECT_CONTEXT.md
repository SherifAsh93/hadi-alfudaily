# Project: Hadi Alfudaily Portfolio & Orders Website

**Client:** Hadi Alfudaily (هادي الفضيلي)
**Developer:** Sherif (WebistryDev)
**Started:** September 19, 2026
**Status:** Deployed
**Live URL:** https://hadi-alfudaily.vercel.app
**GitHub:** https://github.com/SherifAsh93/hadi-alfudaily
**Database:** Neon PostgreSQL (Vercel integration)

---

## Overview

A dark/cinematic portfolio website for Sudanese filmmaker **Hadi Alfudaily** to showcase his work and capture client orders via a simple form.

## Color Scheme (Brand Colors)

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#0a0a0a` | Main background |
| Surface | `#141414` | Cards, sections |
| Surface Light | `#1e1e1e` | Hover states |
| Primary (Red) | `#c62828` | Brand accent color |
| Primary Dark | `#b71c1c` | Hover state |
| Text | `#ffffff` | Headings |
| Text Muted | `#a0a0a0` | Body text |
| Border | `#2a2a2a` | Card borders |

## Assets

| File | Description |
|------|-------------|
| `public/logo.jpeg` | Hadi Alfudaily Production logo (red HA monogram) |
| `public/hero.jpg` | Cinematic portrait photo of Hadi (red lighting) |

---

## Client Information

| Field | Value |
|-------|-------|
| **Name** | Hadi Alfudaily (هادي الفضيلي) |
| **Nationality** | Sudanese |
| **Based in** | Cairo, Egypt |
| **Profession** | Video Producer, Graphic Designer, Director |
| **Phone** | +20 11 47613886 |
| **WhatsApp** | +20 11 47613886 |

---

## Social Links

| Platform | URL |
|----------|-----|
| Facebook | `https://web.facebook.com/Hadi.Alfudaily` |
| Instagram | `https://www.instagram.com/hadi_alfudaily` |
| TikTok | `https://tiktok.com/@hadi_alfudaily` |
| LinkedIn | `https://www.linkedin.com/in/hadi-alfudaily-964b66320` |
| WhatsApp | `https://wa.me/201147613886` |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion |
| Database | Neon PostgreSQL (free tier) |
| ORM | Drizzle ORM |
| Hosting | Vercel (free tier) |
| Icons | Lucide React |
| Fonts | Cairo (Google Fonts) |

---

## Features

### Public Pages
- **Hero Section** - Cinematic full-screen with logo + CTA
- **Portfolio Grid** - Filterable gallery (images + videos)
- **Services Section** - 6 service cards with icons
- **About Section** - Bio and stats
- **Order Form** - Name + Phone + Category + Description
- **Floating WhatsApp** - Fixed contact button
- **Footer** - Social links

### Admin Panel
- **Dashboard** - Stats and quick actions
- **Portfolio Manager** - Add/delete portfolio items
- **Orders View** - View submitted orders

---

## Routes

| Route | Purpose | Auth |
|-------|---------|------|
| `/` | Homepage | Public |
| `/admin` | Admin dashboard | Password protected |
| `/admin/portfolio` | Manage portfolio | Password protected |
| `/admin/orders` | View orders | Password protected |

---

## Database Schema

### Portfolio Table
```sql
portfolio {
  id: serial PK
  title: varchar(200)
  description: text
  type: varchar(10) -- "image" | "video"
  url: varchar(500)
  category: varchar(50)
  order: integer
  created_at: timestamp
}
```

### Orders Table
```sql
orders {
  id: serial PK
  name: varchar(100)
  phone: varchar(30)
  category: varchar(50)
  description: text
  status: varchar(20) -- "new" | "contacted"
  created_at: timestamp
}
```

---

## Environment Variables

### Local (.env.local)
```env
DATABASE_URL=postgresql://neondb_owner:npg_...@ep-...neon.tech/neondb?sslmode=require
WHATSAPP_NUMBER=201147613886
ADMIN_PASSWORD=hadi2026
```

### Vercel (Environment Variables)
Set these in Vercel → Settings → Environment Variables:
- `DATABASE_URL` — Neon connection string
- `WHATSAPP_NUMBER` — `201147613886`
- `ADMIN_PASSWORD` — `hadi2026`

---

## Order Flow

1. User fills form (name, phone, category, description)
2. Click "إرسال الطلب"
3. Order saved to database
4. WhatsApp opens with pre-filled message
5. Hadi receives on WhatsApp instantly

---

## Files Structure

```
hadi-alfudaily/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   ├── admin/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── portfolio/page.tsx
│   │   └── orders/page.tsx
│   ├── api/
│   │   ├── orders/route.ts
│   │   ├── orders/list/route.ts
│   │   ├── portfolio/route.ts
│   │   └── portfolio/[id]/route.ts
│   └── actions/
│       ├── send-order.ts
│       ├── get-portfolio.ts
│       ├── add-portfolio.ts
│       ├── delete-portfolio.ts
│       └── get-orders.ts
├── components/
│   ├── Hero.tsx
│   ├── Portfolio.tsx
│   ├── Services.tsx
│   ├── About.tsx
│   ├── OrderForm.tsx
│   ├── FloatingWhatsApp.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
├── db/
│   ├── schema.ts
│   └── index.ts
├── lib/
│   ├── data.ts
│   └── utils.ts
├── public/
│   ├── logo.jpeg
│   └── projects/
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── drizzle.config.ts
└── .env.local
```

---

## Admin Access

- **URL:** `/admin`
- **Password:** `hadi2026`
- **Auth:** Client-side sessionStorage

---

## Next Steps

1. ~~Create Neon database~~ ✓
2. ~~Run `npm install`~~ ✓
3. ~~Create database tables~~ ✓
4. ~~Deploy to Vercel~~ ✓
5. Add portfolio items via admin panel
6. Test order form with WhatsApp
7. Custom domain (optional)

---

*Last updated: September 20, 2026*