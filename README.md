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
│   └── main.js             # Nav, scroll-spy, reveal animations, counters
├── assets/
│   ├── images/             # ← add portrait.jpg + event photos here
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
| `your.email@example.com`                      | Contact section (2 places)               | Your real email address             |
| `assets/cv/Chinyere-Clara-Mmiliogu-CV.pdf`    | Hero, Résumé, Contact                    | Add the PDF (name it exactly this)  |
| `assets/images/portrait.jpg`                  | About section                            | Add your photo (optional)           |

> 💡 The site still looks complete without a photo or CV — the portrait shows a
> "CM" placeholder, and CV links simply won't download until the file is added.

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
- **Colours:** brand colours are defined once in the `tailwind.config` block near
  the top of `index.html` (`navy` = `#0B2D56`, `brandgreen` = `#00A86B`) and in
  the `:root` variables of `css/styles.css`.
- **Fonts:** Headings use **Montserrat**; body uses **Inter** (a clean,
  Aptos/Calibri-style humanist sans). Both load from Google Fonts in the
  `<head>`.
- **Sections/nav:** the navbar links map to section `id`s (`#about`,
  `#community-projects`, `#data-projects`, `#skills`, `#resume`, `#contact`).

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
