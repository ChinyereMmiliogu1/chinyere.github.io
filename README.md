# Chinyere Clara Mmiliogu — Portfolio

> **Community. Operations. Data. Impact.**
> A portfolio website showcasing community building, programme & event execution,
> operations, and data analytics.

Built with **HTML + Tailwind CSS + JavaScript**, and designed to deploy to
**GitHub Pages** with zero build step.

---

## 📁 Project structure

```
community_portfolio/
├── index.html              # The whole site (single page, anchored sections)
├── css/
│   └── styles.css          # Custom styles + animations on top of Tailwind
├── js/
│   ├── main.js             # Nav, scroll-spy, reveal animations, counters
│   └── gallery.js          # Project preview images + photo lightbox
├── assets/
│   ├── images/             # ← add hero.jpg + portrait.jpg here
│   │   ├── community_projects/   # ← event photos, one folder per project
│   │   └── README.md
│   └── cv/                 # ← add your CV PDF here
│       └── README.md
├── .nojekyll               # Tells GitHub Pages to serve files as-is
└── README.md               # You are here
```

Tailwind is loaded via the **Play CDN** (`<script src="https://cdn.tailwindcss.com">`),
so there is **nothing to install or build** — just edit and push.

---

## ✅ Before you publish — fill in these placeholders

Search `index.html` for each item and replace it with your real details:

| Placeholder                                   | Where it appears                         | Replace with                        |
|-----------------------------------------------|------------------------------------------|-------------------------------------|
| `YOUR-LINKEDIN`                               | Hero, Résumé, Contact (3 links)          | Your LinkedIn profile URL slug      |
| `assets/cv/Chinyere-Clara-Mmiliogu-CV.pdf`    | Hero, Résumé, Contact                    | Add the PDF (name it exactly this)  |
| `assets/images/banner.jpg`                    | Hero banner (optional)                   | The marbled banner from the Wix site |

Email (`clarammiliogu@gmail.com`) and phone (`07062625920`) are already filled in
from the Wix site's Contact section. The street address from that page is **not**
included — add it to the Contact section yourself if you want it public here too.

> 💡 The site still looks complete without a photo, banner or CV — the portrait
> shows a "CM" placeholder, the banner falls back to CSS art, and CV links simply
> won't download until the file is added.

---

## 🚀 Deploy to GitHub Pages

### Option A — via the GitHub website (easiest, no Git needed)

1. Create a new repository on GitHub, e.g. `portfolio` (make it **Public**).
2. Click **Add file → Upload files**, then drag in the entire contents of this
   folder (`index.html`, the `css`, `js`, `assets` folders, and `.nojekyll`).
   > On Windows, `.nojekyll` may be hidden — enable "Hidden items" in Explorer,
   > or don't worry: create it directly on GitHub with **Add file → Create new
   > file**, name it `.nojekyll`, and commit.
3. Commit the upload.
4. Go to **Settings → Pages**.
5. Under **Build and deployment → Source**, choose **Deploy from a branch**.
6. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
7. Wait ~1 minute. Your site will be live at:
   `https://<your-username>.github.io/portfolio/`

### Option B — via Git command line

```bash
cd community_portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Then enable Pages under **Settings → Pages** as in steps 4–7 above.

### Want the site at the root (`https://<username>.github.io/`)?

Name the repository exactly `<your-username>.github.io` and push to it. GitHub
serves that repo at your account's root URL.

---

## 👀 Preview locally

Because the browser loads `css/` and `js/` as separate files, open the site
through a tiny local server rather than double-clicking the file (both work, but
a server matches production exactly):

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000
```

Or use the **VS Code "Live Server"** extension → right-click `index.html` →
*Open with Live Server*.

---

## ✏️ Customising content

- **Text & projects:** everything lives in `index.html` in clearly commented
  sections (`<!-- ===== COMMUNITY PROJECTS ===== -->`, etc.). Edit the text
  directly.
- **Colours:** the palette is a reproduction of the original Wix portfolio theme.
  It's defined once in the `tailwind.config` block near the top of `index.html`
  and mirrored as CSS variables in `:root` at the top of `css/styles.css`:

  | Token | Hex | Used for |
  |---|---|---|
  | `nav` | `#4A3120` | navbar strip |
  | `banner` | `#46301F` | hero banner band (under the marbled art) |
  | page background | `#FFFFFF` | hero lower half, Data Projects |
  | `greige` | `#F1ECE7` | warm band — About, Skills |
  | `grey` | `#F4F4F4` | cool band — Community Projects, Résumé |
  | `cocoa` | `#41291A` | Contact band |
  | `cocoa-deep` | `#33200F` | footer |
  | `heading` | `#74533A` | section headings, card titles, stat numbers |
  | `btn` | `#5C3317` | button fill |
  | `ink` | `#414852` | body text (cool dark slate) |
  | `muted` | `#6E7480` | captions, labels, meta text |
  | `tan` | `#C9A075` | active nav link, accents on dark |
  | `gold` | `#DFA85A` | Contact-section icons |
  | `hair` / `line-cool` | `#E2DDD6` / `#E4E4E4` | hairlines and card borders |

  Three details do most of the work in making this read as the Wix theme, so
  take care if you change them:
  1. **Section headings are thin** — Jost weight **300** at ~48px, not bold.
  2. **Buttons have zero border-radius** — small solid brown rectangles.
  3. **Body text is small with loose line-height** (`0.875rem` / `1.85`).

  On the dark banner, the red and green circles use lightened variants
  (`#DD7F6B` / `#85C3A0`) so they stay legible against the brown.
- **Fonts:** Headings use **Jost** (a Futura-style geometric sans matching the
  Wix site's thin headings); body uses **Inter**. Both load from Google Fonts in
  the `<head>`.
- **Hero banner art:** the brown/teal marbled banner is generated in CSS
  (`.hero-marble` in `css/styles.css`). To use the real fluid-art image from the
  Wix site instead, save it as **`assets/images/banner.jpg`** — it will be picked
  up automatically and cover the CSS version. If the file isn't there, the
  `<img>` removes itself and the CSS art shows, so nothing breaks either way.
- **Sections/nav:** the navbar links map to section `id`s (`#about`,
  `#community-projects`, `#data-projects`, `#skills`, `#resume`, `#contact`).

---

## 📸 Community project photo galleries

Each community project card shows a preview photo and opens a full-screen gallery
when clicked — navigable by **swiping**, the **← / → arrow buttons**, or the
**arrow keys**; closed with the **X**, **Esc**, or by tapping the backdrop.

To add photos, drop them into the matching folder and name them in order:

```
assets/images/community_projects/
├── grand-games/          ← Inter-Hub Grand Games & Awards Day
│   ├── 01.jpg            ← becomes the card's preview image
│   ├── 02.jpg
│   └── 03.jpg            ← gallery order = filename order
├── business-showcase/    ← ALX Business Showcase
├── staff-hangout/        ← Hub Support Staff Hangout
├── games-days/           ← Monthly Games Days
└── valentines-connect/   ← Valentine's Community Connect
```

**No code editing required** — `js/gallery.js` finds the end of each set by
loading forward until a file is missing. Empty folders are fine: those cards keep
their flat brown header and simply aren't clickable.

Full details (photo sizing, the optional `count` setting, `.png` support) are in
`assets/images/community_projects/README.md`.

---

## 🧩 Optional: production Tailwind build

The Play CDN is perfect for a portfolio, but it prints a console note that it's
not for production and requires JavaScript. If you'd like a fully pre-built CSS
file with no CDN dependency, you can switch to the Tailwind CLI later:

```bash
npm install -D tailwindcss
npx tailwindcss -i ./css/tailwind-input.css -o ./css/tailwind.css --minify
```

…then replace the CDN `<script>` with `<link rel="stylesheet" href="css/tailwind.css">`.
This is entirely optional.

---

## ♿ Accessibility & performance notes

- Semantic HTML, a skip-to-content link, and `aria` labels on interactive controls.
- Animations respect `prefers-reduced-motion`.
- Works without a photo or CV present (graceful fallbacks).
- Fast: no framework, minimal JS, system-friendly fonts.

---

© Chinyere Clara Mmiliogu. Content from the portfolio plan; site built with HTML,
Tailwind CSS & JavaScript.
