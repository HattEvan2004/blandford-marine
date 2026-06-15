# Blandford Marine — Website

A static, multi-page marketing website for **Blandford Marine**, a full-service marine
shop and boat dealership in Hubbards, Nova Scotia. Plain HTML, CSS and JavaScript — no
build step, no framework. It hosts anywhere that serves static files (Vercel, Netlify,
GitHub Pages, any web host).

---

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `services.html` | Services (detailed) |
| `boats.html` | Boats for Sale / brokerage |
| `gallery.html` | Gallery |
| `about.html` | About |
| `faq.html` | FAQ |
| `contact.html` | Contact (form + map) |

Shared assets live in `assets/` — one stylesheet (`assets/css/style.css`), one script
(`assets/js/main.js`), the logo, and the favicon (`assets/img/`).

---

## Before you publish — finish these

Search the project for two tags:

- **`[[CONFIRM]]`** — facts to verify with the client before launch: opening hours, the
  founding year, the second phone line (listings used 902-227-1303; the site currently
  uses the office line 902-228-2205), current boat inventory and prices, storage details,
  brand wording, and real customer reviews. The testimonials are empty placeholders on
  purpose — **do not invent reviews.** Replace them with real, permissioned quotes.
- **`[[PHOTO]]`** — image slots. Each one is a styled placeholder telling you what kind of
  shot belongs there. To use a real photo, replace the placeholder block with an image, e.g.:

  ```html
  <!-- before -->
  <div class="ph"><div class="ph-label"><span class="k">[[PHOTO]] photo_xx.jpg</span><span class="t">Crew at work</span></div></div>

  <!-- after -->
  <img src="assets/img/crew-at-work.jpg" alt="Blandford Marine crew hauling a boat" loading="lazy" />
  ```

  Put your image files in `assets/img/`. Blur any visible boat registration / hull numbers,
  and get consent before publishing photos of identifiable people.

---

## Run it locally

Just open `index.html` in a browser. Or serve the folder so links behave like the live site:

```bash
# Python 3
python3 -m http.server 8080
# then visit http://localhost:8080
```

---

## Put it on GitHub

```bash
cd blandford-marine
git init
git add .
git commit -m "Initial Blandford Marine website"
git branch -M main
# create an empty repo on github.com first (no README), then:
git remote add origin https://github.com/<your-username>/blandford-marine.git
git push -u origin main
```

---

## Deploy to Vercel

This is a static site, so there is **no build command and no framework** to configure.

**Option A — connect the GitHub repo (recommended):**
1. Go to vercel.com and sign in with GitHub.
2. **Add New… → Project**, then import the `blandford-marine` repo.
3. When asked for a framework, choose **Other**. Leave Build Command and Output
   Directory blank (it serves the files as-is).
4. Click **Deploy**. Every future `git push` to `main` redeploys automatically.

**Option B — Vercel CLI:**
```bash
npm i -g vercel
cd blandford-marine
vercel        # follow prompts; accept defaults
vercel --prod # promote to production
```

### Optional: clean URLs
`vercel.json` (included) turns on `cleanUrls`, so pages serve at `/services` instead of
`/services.html`. It is optional — delete the file if you'd rather keep `.html` URLs.
Internal links use `.html` and work either way.

### Custom domain
In the Vercel project: **Settings → Domains → Add**, then point the client's domain
(e.g. `blandfordmarine.ca`) at Vercel following the DNS instructions shown.

---

## Wiring up the contact form

The form on `contact.html` is front-end only until you connect it. Easiest path is
[Formspree](https://formspree.io):

1. Create a form there and copy your endpoint.
2. In `contact.html`, change the form tag to:
   ```html
   <form class="lead" action="https://formspree.io/f/XXXXXXX" method="POST">
   ```
   and remove `id="leadForm"` (so the demo handler stops intercepting it).

Alternatively, replace the submit button with a `mailto:` link to
`accounting@blandfordmarine.ca`.

---

## Notes

- Colors are tuned to the logo gold (`#A89C2E`) on deep-water navy. Tokens are at the top
  of `assets/css/style.css` (`:root`) — change them in one place to retune the whole site.
- Structured data (Google "local business" + FAQ) is included in the page `<head>`s. Keep
  the address, phone, and hours in sync with what's shown on the page.
- Fonts load from Google Fonts (Archivo, Public Sans, Spline Sans Mono).
