# Loop Social

Website for Loop Social — indoor pickleball, cricket nets and a café in Ajax, Ontario.
Built with Next.js (App Router) and Tailwind CSS v4.

## What's live

**Pre-launch: only the Coming Soon page is public.** `app/page.tsx` renders the lead-capture
page at `/`; every other URL returns 404.

The full marketing site is built but deliberately unreachable. It lives in `app/_website/`,
a [private folder](https://nextjs.org/docs/app/getting-started/project-structure#private-folders),
so Next.js never routes it and nothing links to it.

### Launching the full website

Replace the contents of `app/page.tsx` with:

```tsx
import { Website } from "./_website/Website";

export default function Home() {
  return <Website />;
}
```

Before launch, swap the `ImagePlaceholder` blocks for real photography and fill in the
placeholder address, hours and social links.

## Configuration

`app/_lib/site.ts` holds the contact email, social links and the FormSubmit endpoint.
The main page has two forms, both delivered by [FormSubmit](https://formsubmit.co),
which emails each submission to `site.email`:

- **Founders List** (`FoundersForm`): name, email, phone, postal code, interests, pickleball level
- **Join our team** (`CareersForm`): name, email, phone, roles, about

On submit, the visitor goes straight to `/thank-you` while the submission is
sent in the background (`submitLead` in `app/_lib/submitLead.ts`). Each
submission is sent **once**:

1. Straight to FormSubmit from the page.
2. Only if FormSubmit explicitly refuses it, because this domain isn't activated
   yet, it goes through a hidden iframe of `/submit-bridge` loaded from the
   activated `vercel.app` address (`formBridge.origin`). The bridge only accepts
   messages from the site's own domains (`isAllowedParent`) and may only be
   embedded by them (`frame-ancestors` header in `next.config.ts`).

A slow or unreadable reply is never retried, since FormSubmit may already have
sent the email. FormSubmit activates each site address separately: the first
submission from a new domain makes it email an **Activate Form** link to the
inbox. Click it once and that domain works from then on.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Structure

- `app/page.tsx`: Coming Soon page (the only public route)
- `app/_components/`: shared pieces (logo, marquee, loop animation, forms)
- `app/_website/`: full marketing site (not routed yet)
- `app/_lib/`: site config and hooks
- `public/brand/`: logo SVGs (navy and cream)
