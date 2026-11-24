# Keystone Law Firm, P.A.

## Website concept

An original high contrast editorial experience for Keystone Law Firm, P.A., a Miami-based practice serving individuals, families and businesses throughout South Florida.

### Visual direction

- Deep ink, vibrant cobalt, chalk white and soft lilac.
- Elegant Instrument Serif with direct modern DM Sans typography.
- Split-screen opening: confident messaging on dark ink alongside a cobalt index of real legal practices.
- Interactive practice explorer showing all 11 primary practices across three categories.
- Strong typographic storytelling, vivid partner presentation and prominent, accessible contact actions.
- No high-rise Miami stock photography, fake portraits, fabricated results, awards, testimonials or other unsupported trust claims.
- A temporary text wordmark and simple favicon pending review of the firm's actual logo mock.

### Site routes

- Home: / 
- Practice directory: /practice-areas
- Eleven individual practice pages: /practice-areas/:slug
- Our firm: /our-firm
- Resources: /insights
- Individual articles: /insights/:slug
- Contact: /contact
- Legal notice: /disclaimer

## Leadership

Head Partner and firm owner: Frank Wolland.
Managing Partner: Lo Laughlin.

## Build

React 18, Vite, React Router, custom responsive CSS, lucide-react.

```bash
npm install
npm run dev
npm run build
```

Vercel framework Vite, build `npm run build`, output directory `dist`. The SPA rewrite is defined in `vercel.json`.

## Prelaunch

Confirm exact address, phone number, scope of offered legal services, advertising compliance, privacy and legal notices, attorney profiles and logo before public launch. No unapproved form or user submission data collection.

### Hosting note

Two Vercel deployment status contexts have appeared on Keystone's GitHub commits, `keystone` and `keystone1`. The current Vercel connector has not been authorized to access these projects' settings or domain lists, so domain consolidation has not been performed. Preserve one project and primary domain once actual routing and ownership are confirmed.


## Website policy pages

Updated November 24, 2026. The public site now includes separate, searchable, linked policy pages:

- `/disclaimer`: legal notice, advertising, law firm identification and office location, no legal advice, no automatic representation, unsolicited communications, prospective client confidentiality, deadlines, results and jurisdiction.
- `/privacy`: disclosures specific to the current static site, Vercel hosting, remote Google Fonts, Google Maps links, available website and inquiry data, tracking scripts, purpose, retention and requests.
- `/terms`: permitted website use, limitations, third party links, content rights, relationship to an engagement agreement and applicable law.
- `/accessibility`: assistance information and website feedback, without pretending to have obtained an independent WCAG certification.

These are real website sections rather than a generic "final review" paragraph, but **firm counsel must approve the notices as the actual organization responsible for data processing and lawyer advertising**. The public source code has no website contact form, client portal or advertising pixels. Production configuration must be checked for any added analytics, security cookies, form services, email tools, log settings, or policy discrepancies. The site's real logo, current office address, and correct contact number should also be confirmed.
