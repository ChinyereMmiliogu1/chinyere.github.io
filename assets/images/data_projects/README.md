# Data project screenshots

Each folder here is one card in the **Data Projects** section. The screenshot in
it becomes that card's preview image, and clicking the preview opens it full
size in the same viewer the community photos use.

## Current state

| Folder                 | Files    | Project card              | Live link           |
|------------------------|----------|---------------------------|---------------------|
| `hub-perf-dashboard/`  | `01.png` | Hub Performance Dashboard | Google Sheets       |
| `learner-fb-analysis/` | `01.png` | Learner Feedback Analysis | Google Sheets       |
| `pizza-sales/`         | `01.png` | Pizza Sales Analytics     | Power BI (embedded) |
| `maiji-ndogo-water/`   | `01.png` | Maji Ndogo Water Analytics| Power BI (embedded) |

> The folder is spelled `maiji-ndogo-water` (as you named it), but the card
> title says **Maji Ndogo** — that's the spelling on your own dashboard header
> and in the Power BI embed title. Renaming the folder to `maji-ndogo-water`
> would be tidier; if you do, change the matching name in `js/gallery.js` and
> the `data-gallery="…"` in `index.html` at the same time.

## The three rules

1. **Use the folder that matches the project** (names are listed in
   `js/gallery.js` and used as `data-gallery="…"` in `index.html`).
2. **Name the files `01.png`, `02.png`, `03.png` …** in the order you want them
   shown. Always two digits, and no gaps in the numbering.
3. **Keep these as `.png`** — see below for why.

Adding more screenshots to a folder needs no code changes: the viewer keeps
looking one past the last file it knows about, so dropping in `02.png` is enough
to get arrows and a counter. If you *remove* one, update `count` in
`js/gallery.js` so the totals stay right.

## Why PNG here, but JPG for the event photos

JPEG compression works by discarding fine detail, which is invisible on a photo
of people but smears **small chart text** — axis labels, legends and KPI numbers
go fuzzy exactly where a dashboard needs to be readable. These files are only
120–210 KB as PNG, so there was nothing to gain by converting them.

This is also why **`tools/normalize_photos.py` does not touch this folder** —
that script converts everything it finds to JPEG. It is hard-scoped to
`community_projects/` and will leave these alone.

If you replace a screenshot, save it straight from the Power BI / Sheets window
as PNG. Two things worth doing by hand:

- **Flatten transparency.** A screenshot with a transparent background looks odd
  against the viewer's dark backdrop. All four current files have been flattened
  onto white.
- **Crop to the dashboard itself** — no browser chrome, no taskbar, no Windows
  title bar.

## How the preview is cropped

Previews sit in a **16:9 box, cropped to fill, anchored to the top**
(`object-position: center top` on `.data-media .project-preview`). That's
deliberate: it keeps the report title and the top KPI row visible, which is the
part of a dashboard that's still recognisable at thumbnail size. The bottom of a
tall screenshot will be cut off in the preview — the full image is always there
when the card is clicked.

## What happens if a folder is missing or empty?

Nothing breaks. The preview `<img>` removes itself via its inline `onerror`, the
`.has-preview` class comes off, and `.data-media:not(.has-preview)` hides the
image area entirely — so the card just starts at its icon and title, and isn't
clickable. The "View live report" / "Open the spreadsheet" button still works.

## Adding a new data project

1. Create a folder here and add `01.png`.
2. Register it in `js/gallery.js`:
   ```js
   GALLERIES['my-new-project'] = { count: 1, dir: 'data_projects', ext: '.png' };
   ```
   The `dir` and `ext` are required — without them the viewer looks for a `.jpg`
   in `community_projects/`.
3. In `index.html`, copy any `<article class="reveal data-card">` block in the
   Data Projects grid and update `data-gallery`, `data-gallery-title`, the
   preview `<img src>`, the title, question, chips and metrics.
4. Keep `data-gallery-mediaonly` on the `<article>`. It stops the whole card
   being a click target, which would otherwise fight with the report button.
5. For a Power BI report, see the copy-paste button snippet at the top of
   `js/report.js`.
