# Baytseha Frontend

Next.js storefront for بيت الصحة - Baytseha wellness store.

## Stack

- Next.js 15 App Router
- TypeScript (strict)
- Tailwind CSS
- Zustand (cart state)
- React Hook Form + Zod
- Deferred Meta/TikTok/Snapchat pixels

## Local Setup

1. Copy env example:
   ```bash
   cp .env.example .env.local
   ```

2. Install and run:
   ```bash
   npm install
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000).

## Docker (local dev)

From project root:
```bash
docker compose up --build
```

## EasyPanel Deployment

- Service name: `baytseha-store`
- Domain: `Baytseha.shop`
- Port: `3000`
- Set env vars from `.env.example` in EasyPanel config.
- `NEXT_PUBLIC_API_BASE_URL` must point to the backend API domain.

## Routes

- `/` - Home page
- `/collections` - Product collection
- `/products/[slug]` - Product landing page
- `/about` - About page
- `/contact` - Contact page
- `/privacy` - Privacy policy
- `/terms` - Terms and conditions
- `/returns` - Returns and delivery policy
- `/thank-you/[orderId]` - Order confirmation

## Content Placeholders

Before production launch, replace:
- Product images (currently gradient placeholders)
- Ingredient lists (pending supplier verification)
- Reviews/UGC (pending real customer orders)
- Support contact details (WhatsApp, email)
- Social links (TikTok, Snapchat, Instagram handles)
- Privacy policy and terms finalized by legal counsel

## Compliance

Products are wellness support teas, not medicines. All copy uses support/wellness language per docs/12-compliance-claims-proof.md.
