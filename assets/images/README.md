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
want them shown. `01.jpg` becomes the card preview.

| Folder                                   | Project card                        |
|------------------------------------------|-------------------------------------|
| `community_projects/grand-games/`        | Inter-Hub Grand Games & Awards Day  |
| `community_projects/business-showcase/`  | ALX Business Showcase               |
| `community_projects/staff-hangout/`      | Hub Support Staff Hangout           |
| `community_projects/games-days/`         | Monthly Games Days                  |
| `community_projects/valentines-connect/` | Valentine's Community Connect       |

No code editing needed — see `community_projects/README.md` for the full details.

Empty folders are fine: the card keeps its flat brown header and emoji, and just
isn't clickable until you add `01.jpg`.

The `data_projects/` folder is available for dashboard screenshots, but those
cards don't use images yet.

## Tips
- Compress images before uploading (e.g. https://squoosh.app) to keep the site fast.
- Use `.jpg` for photos and `.png`/`.svg` for logos or graphics.
