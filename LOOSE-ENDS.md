# LOOSE ENDS — B&B Exteriors site finalization & migration

**Date:** 2026-06-29
**Build output:** `./dist` (deploy this folder to Cloudflare Pages)
**Assumed canonical domain:** `https://bnbexteriors.com` (non-www) — **MUST be confirmed** (see item 1).

---

## 0. IMPORTANT CONTEXT — this is a brand-new site, NOT a migration
The client provided **no existing/old website**. There is therefore **no prior SEO, no
legacy URLs, no backlinks, no old sitemap, and no GA4/GSC history to carry over.** The
SOP's anti-ranking-loss machinery (1:1 301 redirect map, old-URL inventory, ranking
baseline, "Change of Address") **does not apply** because there is nothing to migrate
*from*. Everything below is therefore about **launching cleanly and starting to build
SEO equity**, not preserving it.

> ⚠️ If it turns out the client *does* have an old site (e.g. a Wix/Webador page, a
> Facebook-only presence, or an old domain), STOP and run SOP Phases 1–2 first: crawl
> it, pull GSC indexed URLs + backlinks, and build a 1:1 301 redirect map in
> `dist/_redirects` **before** pointing DNS. The current `_redirects` only has the
> www→non-www rule.

---

## 1. Domain & NAP — must be verified by a human (cannot confirm from here)
- **Canonical domain is an assumption.** I used `bnbexteriors.com` (derived from the
  `info@bnbexteriors.com` email in the demo). The real registered domain may be
  `.ca`, `www`, or different. **Confirm the exact live domain**, then if it differs,
  find/replace it across: `dist/index.html` (canonical, OG/Twitter URLs, JSON-LD
  `@id`/`url`/`image`), `dist/sitemap.xml`, `dist/robots.txt`, and `dist/_redirects`.
- **NAP must be verified character-for-character against the Google Business Profile**
  (I cannot access GBP). Current values used everywhere on the site:
  - **Name:** B&B Exteriors
  - **Phone:** 250-268-9826  (tel links use `+12502689826`)
  - **Email:** info@bnbexteriors.com
  - **Hours:** Mon–Sat, 8:00am–6:00pm
  - **Service area:** Duncan → Qualicum Beach (Nanaimo, Lantzville, Parksville,
    Ladysmith listed in schema `areaServed`)
  - **Street address:** NONE provided. Treated as a **service-area business** — the
    `LocalBusiness` schema has `addressLocality: Nanaimo, BC, CA` but **no street
    address**. If the client has a real business address (or a verified GBP address),
    add `streetAddress` + `postalCode` to the JSON-LD so NAP matches GBP exactly.
- **Geo coordinates** were intentionally omitted from schema (no verified address). Add
  `geo` (lat/lng) once the GBP location is confirmed.

## 2. Backlinks & indexed-URL set — require Google Search Console (no access here)
- **No backlink data could be obtained** — this requires GSC (Links report) and the
  client has no GSC history (brand-new). There are **no known pages with backlinks to
  prioritize** because there is no prior site.
- **The complete indexed-URL set can only be confirmed in Google Search Console.**
  Once GSC is created and verified, check Pages/Coverage to be 100% sure no old URLs
  exist anywhere that need a 301. (Also run a quick `site:bnbexteriors.com` Google
  search and check the Wayback Machine for any forgotten old pages.)

## 3. Analytics & tracking — NOT installed (no IDs found, none provided)
- **GA4, GTM, and Meta Pixel: MISSING.** No existing tracking IDs were found (no old
  site to pull them from) and none were supplied. I added **commented-out, disabled**
  GTM and GA4 placeholder snippets in `<head>` of `dist/index.html` (`GTM-XXXXXXX` /
  `G-XXXXXXXXXX`). **Action:** create a GA4 property (and GTM container if desired),
  paste the real IDs, uncomment, redeploy, then **verify GA4 Realtime** shows your
  visit at launch. Add a Meta Pixel only if the client runs Facebook/Instagram ads.

## 4. Lead form — needs a real backend endpoint before go-live
- The quote form currently posts to **Web3Forms** (`action=...web3forms.com/submit`)
  but the `access_key` is a placeholder (`REPLACE_WITH_WEB3FORMS_ACCESS_KEY`). Until a
  real key is set, the form shows a friendly "Thank You" confirmation **without
  actually sending** (so no leads are silently lost to a dead endpoint).
- **Action (SOP Lesson C / QA checklist):**
  - Insert a real Web3Forms access key (or switch to Formspree / Cloudflare Pages
    Functions / the client's CRM).
  - Set **Reply-To = the customer's email** so the client can reply directly.
  - Confirm the notification lands in the client's **inbox, not spam** (send a test).
  - First Name + Last Name are already **separate fields** (`first_name`/`last_name`) ✔
  - A honeypot field (`botcheck`) is included for spam protection ✔

## 5. Images / logos
- **All 6 remote Wix images were downloaded and are now local** in `dist/assets`
  (no hotlinks anywhere). Two were **mislabeled in the demo** and I corrected their use:
  - `4ac5e1_45ec...png` was NOT a soft-washing photo — it is the **real B&B Exteriors
    logo** (green circle). Now used as the site logo (header/footer), favicon, touch
    icons, and OG image source.
  - `4ac5e1_bc0c...png` was NOT a window-cleaning photo — it is the **WorkSafe BC
    logo**. Now used as a genuine "Insured / WorkSafe BC" trust badge in the Why-Us
    section.
- The 4 remaining JPGs are all genuine **before/after roof-cleaning & moss-removal**
  photos (originally 2048×2048, ~2.4 MB each). I **resized to 1280px and recompressed**
  (~600 KB each) for Core Web Vitals, and used them in the hero, Why-Us, and Gallery.
- **No usable photos exist for gutter, soft-washing, or window cleaning specifically.**
  Rather than mislabel a roof photo as window cleaning, the 4 **service cards use clean
  branded SVG illustrations** (local, `dist/assets/svc-*.svg`). **Recommended:** when
  the client supplies real photos of those three services, swap the SVGs for photos
  (keep descriptive filenames + alt text for image SEO).
- **No placeholder-service images were used.** Favicon (`favicon.ico` + PNG 16/32),
  Apple touch icon (180), PWA icons (192/512), and a 1200×630 `og-image.jpg` were all
  **generated locally** from the real logo.
- **Verify the testimonials are real & permitted.** The three reviews (Sarah M., David
  T., Jennifer L.) came from the demo and read as generic/placeholder. Confirm they are
  genuine before publishing. I deliberately **did NOT add `AggregateRating`/`Review`
  schema** so we don't ship fake star-rating structured data (Google penalizes this).
  Add real review schema once you have verifiable GBP review counts/ratings.

## 6. Social profiles
- Schema `sameAs` was left out (no verified Facebook/Instagram/GBP URLs provided). Add
  the client's real social + GBP URLs to the JSON-LD `sameAs` array once known.

## 7. robots.txt staging vs production
- `dist/robots.txt` is the **production** version (`Allow: /` + sitemap) — correct for
  the live domain.
- `dist/robots-staging.txt` (`Disallow: /`) is provided for the **preview/QA phase**.
  Per SOP Phase 4, while testing on the `*.pages.dev` preview URL, **temporarily rename
  `robots-staging.txt` → `robots.txt`** to keep Google out, then **restore the
  production `robots.txt` before go-live.** (Don't ship the Disallow version live.)

---

## REMAINING MANUAL GO-LIVE STEPS (from the migration SOP)
These require accounts/DNS access I don't have — a human must do them:

1. **Confirm the real domain** and find/replace it across the build (item 1) if it
   isn't `bnbexteriors.com`.
2. **Deploy `./dist` to Cloudflare Pages** (Direct Upload) and QA on the
   `*.pages.dev` preview URL (use the staging robots.txt while on preview).
3. **Swap robots.txt to the production version** before go-live (item 7).
4. **Point DNS using A/CNAME records ONLY** — `A @` → Cloudflare Pages IP, `www` →
   CNAME `*.pages.dev`. **Preserve `MX`, SPF, DKIM, DMARC and all verification TXT
   records untouched** so email never breaks. **Do NOT change nameservers** unless the
   domain is already on Cloudflare.
5. **Submit `sitemap.xml`** in Google Search Console (create + verify GSC first) and
   **request indexing** for the homepage. Also add to **Bing Webmaster Tools**.
6. **Verify GA4 in Realtime** after installing the real Measurement ID (item 3); confirm
   GTM/Tag Assistant if used.
7. **Update the Google Business Profile website URL** to the new canonical URL, and
   double-check NAP matches the site character-for-character (item 1).
8. **Wire and test the lead form** end-to-end (item 4) — submit, inbox delivery,
   Reply-To, not-in-spam.
9. **Monitor Search Console for 404s for 4–8 weeks.** If any unexpected old URL appears
   (e.g. a forgotten prior page), add a 1:1 `301` in `dist/_redirects` and redeploy.
10. **Confirm HTTPS/SSL** auto-provisioned (padlock) on both `www` and non-`www`, and
    that `www` → non-`www` redirects in one hop.

---

## TASK 1 / revision instructions
- **No revision instructions were provided** ("finalize the demo for production"). I
  made no speculative copy/branding/service changes — I only productionized the demo:
  self-hosted all assets, added SEO/meta/schema/OG, favicons, sitemap/robots/_redirects/
  404, fixed the two mislabeled brand images, optimized photos, and made the form/links
  production-ready. If the team intended specific content edits, none were actionable
  from the inputs given.

## Nothing else outstanding from the build itself
The `dist/` folder is complete, fully self-contained (no external/hotlinked assets —
verified), mobile-responsive, has a single H1, valid JSON-LD (LocalBusiness + WebSite +
FAQPage), self-referencing canonical, and no stray `noindex` on the production page.
The remaining items above all require **client/account access** (domain, GBP, GSC, GA4,
form backend) that cannot be completed from this environment.
