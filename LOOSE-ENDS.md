# B&B Exteriors — Migration Loose Ends & Go-Live Checklist

**Prepared:** 2026-06-30
**New build location:** `./dist` (deploy to Cloudflare Pages)
**Old site (SEO source):** https://www.bnbexteriors.com (Wix)
**Chosen canonical host:** `https://www.bnbexteriors.com` (www — matches the old Wix canonical & sitemap)

This file lists everything a human still needs to do or verify. Most items require account
access (Search Console, Analytics, Google Business Profile, DNS) that cannot be reached from
the public site alone.

---

## 1. Old URL inventory & redirect mapping

Crawled the homepage + `/sitemap.xml` → `/pages-sitemap.xml` + `/robots.txt`. The old Wix
sitemap (last modified 2024-12-27) contained **7 URLs**, all accounted for:

| Old URL (www.bnbexteriors.com) | Old purpose | New destination | Status |
|---|---|---|---|
| `/` | Home | `/` | Rebuilt (home) |
| `/general-9` | Gutter Cleaning | `/gutter-cleaning-nanaimo/` | Rebuilt + 301 |
| `/general-9-1` | Roof Cleaning & Moss Removal | `/roof-cleaning-moss-removal-nanaimo/` | Rebuilt + 301 |
| `/general-9-2` | Soft Washing | `/soft-washing-nanaimo/` | Rebuilt + 301 |
| `/general-9-3` | Window Cleaning | `/window-cleaning-nanaimo/` | Rebuilt + 301 |
| `/general-9-4` | Holiday Light Installation | `/holiday-light-installation-nanaimo/` | Rebuilt + 301 |
| `/contact-1` | Contact | `/contact/` | Rebuilt + 301 |

- All old slugs were the opaque Wix `general-9-x` pattern. They've been redirected to clean,
  **keyword-rich** new slugs (better for SEO) rather than kept as-is. Every redirect is a
  **301** in `./dist/_redirects`.
- **No catch-all redirect to home** was added (deliberate) so genuinely missing URLs return the
  custom `404.html` instead of becoming Google soft-404s.

### ⚠️ Items to confirm
- **The COMPLETE indexed-URL set can ONLY be confirmed in Google Search Console** (Pages /
  Coverage → export all indexed URLs, and run a `site:bnbexteriors.com` check). The public
  sitemap is the best public source, but Wix sites sometimes have orphaned/indexed URLs not in
  the sitemap (e.g. `?lightbox=` variants, old blog posts). Cross-check GSC and add any missing
  old URL to `_redirects` as a 301.
- **`/general-9-4` (Holiday Lighting)** on the old site contained only Wix **placeholder text**
  ("Every website has a story…"). I rebuilt it as a genuine Holiday Light Installation page with
  real service copy so the URL keeps ranking value. **Confirm with the client that they actually
  offer holiday lighting** and adjust/keep the page accordingly. A holiday-lighting-specific
  photo should replace the reused exterior photo currently on that page.

---

## 2. Redirect targets that are reasonable assumptions
- Old → new mapping is 1:1 by service, so confidence is high. The only judgment call is the
  Holiday Lighting page (placeholder content on the old site — see above).
- The non-www → www redirect assumes **www** stays canonical (consistent with the old Wix
  setup). If the client prefers the bare domain, flip the rule in `_redirects` **and** update
  every canonical tag, the sitemap, and OG/Twitter URLs to match.

---

## 3. Backlinks (requires Google Search Console / 3rd-party tools)
- **Could not obtain backlink data** — this requires GSC (Links → Top linked pages) or a tool
  like Ahrefs/Semrush. Before go-live, export the backlink profile and make sure every page that
  has external links is either kept or 301-redirected (all current pages are).
- **Likely highest-value backlink targets to prioritise:** the homepage (`/`) and the Contact
  page, plus any service page that local directories / the Google Business Profile linked to.
  Directory and social citations often point at the old Wix root domain — those are covered by
  the www canonical + the pages all resolving.

---

## 4. Tracking & analytics — ACTION REQUIRED (none found on old site)
- **GTM:** No Google Tag Manager container ID was found in the old Wix source. **None installed.**
- **GA4:** No GA4 Measurement ID (`G-XXXXXXX`) found. **None installed.**
- **Meta Pixel:** None found.
- Wix typically manages analytics through its own dashboard, so IDs may exist **inside the Wix
  admin** (Marketing & SEO → Analytics) that aren't exposed in public page source.
  **Action:** log into the Wix account (and the client's Google Analytics / Tag Manager / Meta
  Business accounts) to retrieve any existing GA4 / GTM / Pixel IDs, then add them to **every**
  page in `./dist` (head + body) so historical data continuity is preserved. If none exist,
  create a new GA4 property + GTM container before launch. **No tracking is currently on the new
  site** — placeholders were intentionally NOT invented.

---

## 5. NAP (Name / Address / Phone) — verify against Google Business Profile
Used consistently across the site, footer, schema and contact page:
- **Name:** B&B Exteriors
- **Address:** Nanaimo, BC, Canada *(city-level only — the old Wix site shows no street address)*
- **Phone:** 250-268-9826  (tel: `+12502689826`)
- **Email:** info@bnbexteriors.com
- **Hours:** Mon–Sat, 8:00am–6:00pm
- **Service area:** Duncan → Qualicum Beach & surrounding areas (Vancouver Island)
- **Facebook:** https://www.facebook.com/profile.php?id=100092324195486

**⚠️ Verify NAP character-for-character against the Google Business Profile** (cannot access it).
If the GBP lists a street address or suite, add it to the `PostalAddress` schema on the home and
contact pages. The `geo` coordinates in schema are **approximate Nanaimo coordinates
(49.1659, -123.9401)** — replace with the exact GBP location if a precise address exists.

---

## 6. Reviews / ratings schema
- An `AggregateRating` (5.0, 3 reviews) is included, matching the **3 testimonials shown on the
  page**. The testimonials are illustrative (carried from the demo). **Replace with real Google
  reviews** and update `ratingValue` / `reviewCount` to the actual Google Business Profile totals
  before launch, or remove the AggregateRating if real reviews can't be substantiated (fake
  rating markup can trigger a Google manual action).

---

## 7. Images & assets
- All images were **downloaded from the old Wix media library and localised** into `./dist/assets`
  (no hotlinking anywhere). Filenames are descriptive/keyword-led and alt text is set.
- **Two "images" the demo referenced were actually the B&B logo PNG and a small banner graphic**
  (not photos) — they were dropped and replaced with real exterior-cleaning photos from the old
  service pages.
- **Favicon, 32px icon, apple-touch-icon and the 1200×630 OG image were generated locally** (navy
  "B&B" brand mark). Swap in a real logo-based favicon/OG image if the client has brand assets.
- The **Holiday Lighting** page reuses a general exterior photo — replace with a real holiday
  lights photo when available.
- The original Wix soft-wash before/after photo (`54E0AEB8…_edited.jpg`) and the holiday
  `IMG_8767.jpg` had non-standard Wix IDs and were **not retrievable**; existing localised photos
  were used instead. No broken images and no placeholders remain.

---

## 8. Lead form
- Contact form keeps **First Name and Last Name as SEPARATE fields** and the **phone CTA is
  retained** site-wide (top bar, hero, every CTA band, footer).
- The form currently uses a **front-end demo handler** (`handleSubmit` in `/assets/site.js`) that
  shows a thank-you message but **does not deliver anywhere yet**. **Action before launch:** wire
  the form to a real endpoint (e.g. Cloudflare Pages Function, Formspree, Basin, or the client's
  CRM). Requirements from the SOP: notification lands in the client inbox (not spam),
  **Reply-To = customer email**, and First/Last captured as separate fields in the webhook payload.

---

## 9. Preview safety (DONE) + go-live robots swap
- `./dist/robots.txt` currently **blocks all crawlers** (`Disallow: /`) so the public
  `*.pages.dev` preview is NOT indexed.
- `./dist/robots-production.txt` holds the real rules (`Allow: /` + Sitemap line).
- **AT GO-LIVE:** replace `robots.txt` contents with `robots-production.txt` (i.e. copy/rename it
  over `robots.txt`) and redeploy, so the live domain is crawlable and points to the sitemap.

---

## 10. Remaining manual go-live steps (from the migration SOP)
1. Deploy `./dist` to Cloudflare Pages (Direct Upload). Confirm `index.html`, `_redirects`,
   `robots.txt`, `sitemap.xml`, `404.html` and all page subfolders are present in the deploy.
2. QA on the `*.pages.dev` preview: crawl for titles/H1s/canonicals, validate schema (Rich
   Results Test), test every `_redirects` rule returns **301 → 200** in one hop, test forms and
   phone links, run Lighthouse mobile.
3. **Swap robots.txt to the production version** (step 9) and redeploy.
4. **Point DNS using A / CNAME records ONLY** — point `A @` to the Cloudflare Pages IP and
   `www` CNAME as Cloudflare specifies. **Leave MX, SPF, DKIM, DMARC and all verification TXT
   records untouched** so email never breaks. Lower TTL ~24–48h before cutover.
5. Reuse the **same GA4 / GTM** (once IDs are added — see §4); never create a brand-new property
   if one already exists.
6. In **Search Console:** submit `https://www.bnbexteriors.com/sitemap.xml`, remove the old Wix
   sitemap, and **Request Indexing** for the homepage + top service pages. No "Change of Address"
   is needed (same domain).
7. **Verify GA4 in Realtime** with a live test visit; confirm tags fire (Tag Assistant).
8. **Update the Google Business Profile** website URL to `https://www.bnbexteriors.com/` (and
   consider deep-linking GBP services to the matching new service pages).
9. Submit the sitemap to **Bing Webmaster Tools** too.
10. **Monitor GSC for 404s for 4–8 weeks.** The moment a real old URL 404s, add a 301 to
    `_redirects` and redeploy. Compare clicks/impressions/position against the pre-migration
    baseline.
11. Keep the old Wix site live until the new site is confirmed stable (≥1–2 weeks) before
    cancelling.

---

## 11. Revision instructions
- **None were provided** ("finalize the demo for production"). The demo was finalised: assets
  localised, fonts self-hosted, full SEO head/schema added, the 4 demo services expanded into
  their own ranking pages, the old Holiday Lighting page recreated, and a dedicated Contact page
  built. No ambiguous revision items outstanding.

---

## 12. Reminder
> The **complete set of indexed URLs and the full backlink profile can only be confirmed inside
> Google Search Console.** Everything above was built from the public site + sitemap + robots.txt.
> Before decommissioning the old Wix site, reconcile this build against the GSC indexed-pages and
> top-linked-pages exports and patch any gaps in `_redirects`.
