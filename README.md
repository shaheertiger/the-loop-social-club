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
The main page has two forms (see `app/_lib/leadForms.ts` for their fields):

- **Founders List** (`FoundersForm`): name, email, phone, postal code, interests, pickleball level
- **Join our team** (`CareersForm`): name, email, phone, roles, about

Both post to the site's own `/api/lead` route (`app/api/lead/route.ts`), which
validates the submission, writes it to the server log (visible under
**Logs** in the Vercel dashboard, so no lead is ever lost) and emails it to
`site.email`.

### Email delivery: set up Resend (do this once)

The route emails leads through [Resend](https://resend.com). Until the key is
set, the server can't send email and the forms fall back to FormSubmit from the
browser, which has proven unreliable (it needs a per-domain activation and its
bot protection blocks requests at random). To make delivery solid:

1. Create a free Resend account **using play@theloopsocial.ca** (the free
   `onboarding@resend.dev` sender may only email the account's own address).
2. In Resend, create an API key.
3. In the Vercel project, go to **Settings → Environment Variables** and add
   `RESEND_API_KEY` with that key (all environments), then redeploy.

Optional variables:

- `LEAD_TO_EMAIL`: inbox to send leads to (default `site.email`).
- `LEAD_FROM_EMAIL`: sender, e.g. `Loop Social <hello@theloopsocial.ca>`, once the
  domain is verified in Resend. Default: `Loop Social <onboarding@resend.dev>`.

### What the browser does

`submitLead` (`app/_lib/submitLead.ts`) tries, in order:

1. `POST /api/lead` on the same origin: no CORS, no activation, no third-party
   bot checks in the visitor's browser.
2. FormSubmit straight from the page (needs the domain activated once; FormSubmit
   emails an **Activate Form** link on the first attempt).
3. FormSubmit through a hidden iframe of `/submit-bridge` loaded from the
   activated `vercel.app` address (`formBridge.origin`). The bridge only accepts
   messages from the site's own domains (`isAllowedParent`) and may only be
   embedded by them (`frame-ancestors` header in `next.config.ts`).
4. If everything fails, the form shows a link that opens a pre-filled email to
   `site.email`, so the visitor can still send their details.

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
