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

`app/_lib/site.ts` holds the contact email, social links and the signup endpoint.
The main page has two forms, both delivered as JSON to a
[FormSubmit](https://formsubmit.co) AJAX endpoint that emails them on (see
`app/_lib/submitLead.ts`):

- **Founders List** (`FoundersForm`): `name`, `email`, `phone`, `interests`
- **Join our team** (`CareersForm`): `name`, `email`, `phone`, `roles`, `about`

FormSubmit activates a recipient separately for each site address (it checks the
page the form is on), and its bot protection blocks requests sent from servers.
So the forms submit through a hidden iframe of `/submit-bridge` loaded from the
one address FormSubmit has activated (`formBridge.origin`, the project's
`vercel.app` URL). That makes the forms work on any domain without further
activation. The bridge only accepts messages from the site's own domains
(`isAllowedParent`) and may only be embedded by them (`frame-ancestors` header
in `next.config.ts`). If the vercel.app address ever changes, submit the form
once from the new one, click **Activate Form** in the FormSubmit email, and
update `formBridge.origin`.

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
