# B&B Exteriors — Migration Loose Ends & Go-Live Checklist

**Prepared:** 2026-06-29
**New build location:** `./dist` (static site, ready for Cloudflare Pages)
**Canonical production domain:** `https://www.bnbexteriors.com` (www, https — matches old site)
**Old site crawled:** `https://bnbexteriors.com` (Wix)

This file lists everything a human still needs to do or verify. The priority throughout is **preserving SEO equity** while migrating off the old Wix site.

---

## 1. What was carried over (done)

- **All 7 old URLs accounted for** (from `/sitemap.xml` → `/pages-sitemap.xml`):
  | Old URL | Old page | New page | Action |
  |---|---|---|---|
  | `/` | Home | `/` | Kept / rebuilt |
  | `/general-9` | Gutter Cleaning | `/gutter-cleaning/` | Rebuilt + 301 |
  | `/general-9-1` | Roof Cleaning & Moss Removal | `/roof-cleaning-moss-removal/` | Rebuilt + 301 |
  | `/general-9-2` | Soft Washing (Softwashing) | `/soft-washing/` | Rebuilt + 301 |
  | `/general-9-3` | Window Cleaning | `/window-cleaning/` | Rebuilt + 301 |
  | `/general-9-4` | Holiday Lighting | `/holiday-lighting/` | Rebuilt + 301 |
  | `/contact-1` | Contact | `/contact/` | Rebuilt + 301 |
- Clean folder URLs (one folder + `index.html` per page), trailing-slash consistent everywhere (canonicals, internal links, sitemap, `_redirects`).
- Per-page: unique keyword-led **title**, **meta description**, single **H1** + H2/H3 hierarchy, **self-referencing canonical**, **Open Graph + Twitter** tags, descriptive **image filenames + alt text**, descriptive **internal links**.
- **Body copy preserved** (not just meta): the real ranking content from each old service page was recreated (e.g. "we NEVER pressure wash roofs", 1–3 year moss treatment, 1–2× yearly gutter cleaning, reverse-S window method, biodegradable/eco/pet-friendly soft wash). New FAQ section added to the homepage with `FAQPage` schema.
- **JSON-LD schema:** `HomeAndConstructionBusiness` (LocalBusiness) with NAP/geo/hours/areaServed/sameAs/aggregateRating, `WebSite`, `Organization`, `FAQPage` (home), plus `Service` + `BreadcrumbList` on every service page and `ContactPage` on contact.
- **No orphan pages:** every service page is linked from the homepage service cards (or footer for Holiday Lighting), from the footer of every page, and from an "Other Services" cross-link block on each service page, and is in `sitemap.xml`.
- **Self-contained:** every image/icon/favicon/font is local (system font stack, no Google Fonts), no hotlinks, no placeholder services. Hero photos downscaled/recompressed for Core Web Vitals.
- **Forms:** First Name and Last Name are **separate fields** (`name="first_name"` / `name="last_name"`) on both the home and contact forms, per the revision note. Phone CTA is present site-wide and was not removed.

---

## 2. ⚠️ MUST DO before / at go-live (SEO-critical)

1. **Swap robots.txt at go-live.** `dist/robots.txt` currently **blocks all crawlers** so the public `*.pages.dev` preview is not indexed. When the production domain is live, replace `robots.txt` with the contents of **`robots-production.txt`** (`Allow: /` + `Sitemap:` line). **If you skip this, the live site will be deindexed.**
2. **Tracking IDs were NOT found on the old site and are NOT yet installed.** A scan of the old `bnbexteriors.com` source surfaced **no GTM container ID, no GA4 measurement ID, and no Meta Pixel**. Wix may have injected them through its dashboard rather than the page source.
   - **Action:** Log into the client's **existing** Google Tag Manager / GA4 / Meta accounts (per SOP Addendum A — *reuse, never recreate*), get the real IDs, and paste them into the **commented GTM placeholder block** present in the `<head>` (and the `<noscript>` block after `<body>`) of `dist/index.html`, then add the same to each sub-page. Verify in GA4 Realtime after launch.
   - If the client genuinely had no analytics before, create GA4 + GTM now to start a baseline — but confirm first.
3. **Replace placeholder testimonials & rating.** The 3 homepage reviews (Sarah M., David T., Jennifer L.) are demo placeholders. The `aggregateRating` schema is set to `5.0 / reviewCount 3` to match what's shown. Before launch, swap in **real Google Business Profile reviews** and update `reviewCount`/`ratingValue` to match reality (fabricated review markup risks a Google penalty).
4. **Confirm NAP character-for-character against the Google Business Profile.** Used from the old site: **B&B Exteriors · Nanaimo, BC, Canada · 250-268-9826 · info@bnbexteriors.com · Mon–Sat 8am–6pm**. The old site shows no street address (service-area business). Verify the exact name, any address, and phone against GBP — I cannot access GBP.
5. **Wire the lead form to a real endpoint/webhook.** Both forms currently use a demo JS handler (no submission). Connect to a real handler (Cloudflare Pages Function, Formspree, or a Make/Zapier webhook). Map fields `first_name`, `last_name`, `phone`, `email`, `service`, `message` (+ `address` on contact). Per SOP Addendum H: set **Reply-To = customer's email**, send from a domain with SPF/DKIM/DMARC so notifications don't hit spam, and test deliverability to Gmail/Outlook. A honeypot field (`company`) is already in place.

---

## 3. Old URLs / redirects — confidence & gaps

- **Reached & confirmed:** all 7 sitemap URLs above were fetched successfully; redirects are 1:1 to the best-match new page (no mass redirect-to-home).
- **`/general-9-4` (Holiday Lighting):** the old page had only Wix **placeholder body text** ("Every website has a story…"), but the title was "Holiday Light Installation" and it's a real service in the nav. I rebuilt it with sensible standard holiday-lighting copy (design / install / mid-season service / takedown & storage). **Confirm with the client** that this reflects the service they actually offer, and expand with real details/pricing.
- **The complete indexed-URL set can only be confirmed in Google Search Console.** The Wix sitemap is the authoritative list I had, but Wix sites often have additional indexed/orphan URLs (e.g. `/about-us`, `/our-services`, `/testimonials`, lightbox/gallery URLs, `?lightbox=` params the old robots.txt disallowed). **Pull GSC → Pages/Coverage and `site:bnbexteriors.com`** to get the full set, and add any missing 301s to `dist/_redirects`.
- **Monitor GSC for new 404s for 4–8 weeks** after launch and add a 1:1 301 the moment one appears (SOP Phase 9.1 / Addendum F). `_redirects` has specific rules only and **no catch-all to home** by design.
- **Redirect targets that are safe assumptions:** the www/https canonicalization rules at the top of `_redirects` assume www is the canonical host (matches the old site's canonical + sitemap). Confirm Cloudflare custom-domain settings also resolve apex → www.

---

## 4. Backlinks (requires Search Console / third-party tools — I could not access)

- **Backlink data could not be obtained** — it requires GSC (Links report) and/or Ahrefs/Moz. Pull **GSC → Links → Top linked pages** before and after launch.
- **Likely backlink targets to prioritize** (protect these redirects first): the **homepage**, **`/contact-1`**, and the four core service pages (`/general-9`…`/general-9-3`). Directory listings, the Facebook page, and any printed material most likely point at the homepage and the phone number.
- **Reminder:** the full set of pages with external backlinks — and the full set of indexed URLs — **can only be confirmed in Search Console**. Treat section 3 as provisional until GSC is checked.

---

## 5. Assets

- All 6 images referenced by the design were downloaded from `static.wixstatic.com` and localized into `dist/images/` (no hotlinks).
- **`window-cleaning-nanaimo.png`** — the original fetched asset was only **516×97px** (a low-res banner) and looked badly stretched as a cover image, so it was **replaced with a clean, branded local placeholder** (1000×750, window motif + label). **Swap in a real window-cleaning photo when available.**
- Favicon, touch icons (16/32/180/192/512), `favicon.svg`, and the 1200×630 `og-image.jpg` were **generated locally** with a B&B brand mark. Replace with the client's real logo/branded OG image if they have one.
- Hero/team/service photos were downscaled to 1200px and recompressed (~380–430 KB each) for page speed. Consider exporting WebP/AVIF versions for a further Core Web Vitals win.

---

## 6. Remaining manual go-live steps (from the migration SOP)

> Note: the SOP references SiteGround + `.htaccess`. This build targets **Cloudflare Pages**, so redirects use `dist/_redirects` (already written) instead of `.htaccess`. The DNS/SEO principles below still apply.

1. **Deploy `dist/` to the Cloudflare Pages preview**, QA it (links, forms, mobile, schema via Rich Results Test, redirects). Get **client + SEO-partner sign-off** on the preview before cutover.
2. **Swap `robots.txt` → production version** (section 2.1). Re-check there is **no stray `noindex`** on any production page (only `404.html` is intentionally noindex).
3. **DNS cutover — A/CNAME records ONLY; do NOT change nameservers.** Point the domain at Cloudflare per Cloudflare Pages custom-domain instructions. **Preserve MX, SPF, DKIM, DMARC and any verification TXT/CNAME exactly** so email/verifications don't break (SOP Phase 7). Lower TTL ~24–48h beforehand; cut over off-peak (avoid Fri/holidays).
4. **SSL** valid on **both** `www` and non-`www` — test in Chrome *and* Safari (SOP Addendum B). Confirm the exact URL printed on any **QR codes / truck decals / business cards** resolves with a valid cert (Addendum C).
5. **Submit `sitemap.xml` in GSC**, remove the old Wix sitemap, and **Request Indexing** for the homepage + top service pages. Watch the Page-indexing report for "Page with redirect" / "Crawled – not indexed" / "Duplicate canonical".
6. **Verify GA4 in Realtime** and that GTM/Tag Assistant fires (after IDs are installed — section 2.2). Test a conversion.
7. **Update the Google Business Profile website URL** to `https://www.bnbexteriors.com/` and confirm it loads from the GBP link. Update citations/social profiles that linked to old deep URLs.
8. **Submit to Bing Webmaster Tools** (import from GSC).
9. **Monitor vs baseline for 4–8 weeks:** GSC clicks/impressions/avg position, 404 spikes, Core Web Vitals. Keep the old Wix site live until the new site is confirmed stable (≥1–2 weeks), then decommission. Keep an archive of the old site.

---

## 7. Revision instructions — ambiguities

- The task said "no revision instructions provided," but the **SOP cover page** carried two revision notes, both applied:
  - *"Mobile optimize the site"* → responsive across breakpoints; base font bumped to ~17px for legibility (Addendum M); menu/CTA visible; images lazy-loaded and compressed.
  - *"Full Name divided into First Name and Last Name on the webhook data"* → the demo already had separate visible fields; I added explicit `name="first_name"` / `name="last_name"` (+ autocomplete) so the **webhook payload** carries them separately. **You still need to wire the webhook** (section 2.5) for this to take effect on real submissions.
- No other revision instructions were supplied. If the client/SEO partner has preferred exact meta titles/descriptions, target keywords, required slugs, or a real logo/OG image, supply them and they can be dropped in.

---

## 8. Nothing else outstanding is hidden

Everything I could complete from the source material is built into `./dist`. The items above are the ones that require **client/agency access I don't have** (GBP, GSC, GA/GTM/Pixel accounts, the form/webhook backend, DNS) or a **human confirmation/decision**. None block the preview deploy; all should be resolved before/at production go-live.
