# Images

Drop your photos here and the site will pick them up.

## Required / recommended files

| File name        | Used for                          | Notes                                                        |
|------------------|-----------------------------------|--------------------------------------------------------------|
| `hero.jpg`       | Hero portrait (overhangs banner)  | Portrait orientation (4:5), e.g. 800 × 1000 px.              |
| `portrait.jpg`   | About-section photo               | Portrait orientation (4:5) looks best, e.g. 800 × 1000 px.   |
| `banner.jpg`     | Hero banner art (**optional**)    | Wide/short, e.g. 2000 × 500 px. The marbled brown/teal image. |

If `hero.jpg` or `portrait.jpg` is missing, the site shows a dark brown
placeholder with the initials "CM". If `banner.jpg` is missing, the hero falls
back to a CSS-generated marbled banner — so nothing ever looks broken.

> ⚠️ **Windows tip:** File Explorer hides known extensions, so saving a file as
> `hero.jpg` can silently produce `hero.jpg.jpg`. If a photo doesn't appear, turn on
> *View → Show → File name extensions* and check for a doubled extension.

## Adding event photos to the community projects

Each community project card has a preview image and a click-to-open photo
gallery. Drop your photos into the matching folder under
**`community_projects/`** — named `01.jpg`, `02.jpg`, `03.jpg` … in the order you
want them shown.

| Folder                                   | Photos | Project card                        |
|------------------------------------------|-------:|-------------------------------------|
| `community_projects/grand-games/`        |      7 | ALX Inter-Hub Games & Awards Day  |
| `community_projects/business-showcase/`  |      5 | ALX Business Showcase               |
| `community_projects/staff-hangout/`      |      3 | Hub Support Staff Hangout           |
| `community_projects/womens-board/`       |      6 | Rest and Learn Programme            |
| `community_projects/valentines-connect/` |      4 | Valentine's Community Connect       |
| `community_projects/games-days/`         |      — | Monthly Games Days — no card       |

No code editing needed to add photos — see `community_projects/README.md` for the
full details, including how to pick which photo a card previews, how to optimise
straight-from-phone images, and how to add a Games Days card.

Missing or empty folders are fine: the card keeps its flat brown header and emoji
and just isn't clickable until photos exist.

## Adding dashboard screenshots to the data projects

Same idea, different folder and different file type. Each data project card
shows one dashboard screenshot, which opens full size when clicked.

| Folder                              | Files    | Project card                |
|-------------------------------------|----------|-----------------------------|
| `data_projects/hub-perf-dashboard/` | `01.png` | Hub Performance Dashboard   |
| `data_projects/learner-fb-analysis/`| `01.png` | Learner Feedback Analysis   |
| `data_projects/pizza-sales/`        | `01.png` | Pizza Sales Analytics       |
| `data_projects/maiji-ndogo-water/`  | `01.png` | Maji Ndogo Water Analytics  |

**These are `.png`, not `.jpg`** — JPEG compression smears small chart text, and
at 120–210 KB each there was no size reason to convert them. Keep new ones as
PNG too. `tools/normalize_photos.py` deliberately skips this folder for the same
reason (it converts to JPEG).

Data previews are cropped to a **16:9 box anchored to the top**, so the report
title and top KPI row stay visible. See `data_projects/README.md` for the rest.

## Tips
- Compress images before uploading (e.g. https://squoosh.app) to keep the site fast.
- Use `.jpg` for photos, `.png` for dashboards and screenshots, `.png`/`.svg` for logos.
