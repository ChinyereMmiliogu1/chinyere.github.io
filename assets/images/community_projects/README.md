# Community project photos

Each folder here is one project card on the site. The photos in it become that
card's click-to-open gallery.

> Looking for the **data** projects? Their dashboard screenshots live in
> `../data_projects/`, and are `.png` rather than `.jpg` — see the README there.

## Current state

| Folder                | Photos | Project card                           |
|-----------------------|-------:|----------------------------------------|
| `grand-games/`        |      7 | ALX Inter-Hub Games & Awards Day     |
| `business-showcase/`  |      5 | ALX Business Showcase                  |
| `staff-hangout/`      |      3 | Hub Support Staff Hangout              |
| `womens-board/`       |      6 | Rest and Learn Programme (Afara Leadership Centre) |
| `valentines-connect/` |      4 | Valentine's Community Connect          |
| `games-days/`         |      — | Monthly Games Days — no card, see the note at the bottom |

## The three rules

1. **Use the folder that matches the project** (names are fixed — see the table).
2. **Name the files `01.jpg`, `02.jpg`, `03.jpg` …** in the order you want them
   shown. Always two digits, and no gaps in the numbering.
3. **Photos must be real `.jpg` files.** See the extension warning below.

Adding photos needs no code changes — the gallery keeps looking one past the
last photo it knows about. If you *remove* photos, update `count` in
`js/gallery.js` so the totals stay right.

## Choosing the card's preview image

The preview is **not** tied to `01.jpg`. Each card has its own `<img src>` in
`index.html`, so you can preview any photo without disturbing gallery order:

```html
<!-- in index.html, inside the project's <button class="project-media …"> -->
<img src="assets/images/community_projects/grand-games/05.jpg" … />
```

Change the number to change the preview. Previews are shown in a **3:2 box,
cropped to fill**, so a wide group shot works best. Portrait photos, flyers and
stacked collages get cropped — for those, point the preview at a landscape photo
from the same folder instead.

> `grand-games` previews `05.jpg` (the trophy and hub name cards) rather than
> `01.jpg`, which is portrait and crops awkwardly. `womens-board` previews
> `02.jpg` (the talk session) rather than `01.jpg`, which is the flyer.

## 🔒 One photo has been edited

`womens-board/01.jpg` is the event flyer, and it printed a street address plus two
phone numbers — one of them someone else's. Those two areas are now **blurred out**
in the copy that ships. Everything else on the flyer is untouched.

The unedited original is in `../../../community_portfolio_photo_originals/` —
outside the repo, so it never gets published. Don't copy it back in.

Some `womens-board` photos also show young people close up. If any of them were
minors at the time, get a parent's or the centre's okay before this goes live —
that's a call only you can make.

## ⚠️ Windows hides file extensions

Saving a file as `01.jpg` in File Explorer can silently produce `01.jpg.png` or
`01.jpg.JPG`, because Explorer keeps the original extension and hides it from you.
Turn on **View → Show → File name extensions** so you can see the real names.

If it happens anyway, run the normaliser (below) — it fixes the names for you.

## Optimising new photos

Straight-from-phone photos are 2–6 MB each, which makes the gallery slow on
mobile data. There's a script that fixes this in one pass — it renames files
correctly, converts everything to real JPEG, caps the long edge at 1600 px, and
strips EXIF metadata (phone photos often embed GPS coordinates, which shouldn't
ship to a public site).

From the repo root:

```bash
python -m pip install --user Pillow      # once
python tools/normalize_photos.py
```

It moves your untouched originals to `../community_portfolio_photo_originals/`,
outside the repo, so nothing is lost. The first run took the photo set from
33.9 MB to 5.2 MB.

It only ever looks inside this folder. The data project screenshots in
`../data_projects/` are left alone on purpose — the script converts to JPEG,
which would soften the small text on a dashboard.

## What happens if a folder is missing or empty?

Nothing breaks. The card keeps its flat brown header with the emoji and simply
isn't clickable. Add photos and the preview and gallery appear on their own.

## Adding a Monthly Games Days card

There's no card for it on the page. To add one:

1. Create `games-days/` here and add `01.jpg`, `02.jpg`, …
2. In `index.html`, copy any project `<article>` block in the Community Projects
   grid, set `data-gallery="games-days"`, point the preview `<img src>` at one of
   your new photos, and rewrite the title/description.
3. Set `'games-days': { count: N }` in `js/gallery.js` to how many photos you added.
