# Community project photos

Each folder here is one project card on the site. Drop the event photos in,
and the site picks them up automatically — **no code editing needed.**

## The three rules

1. **Use the folder that matches the project** (names are fixed — see the table).
2. **Name the files `01.jpg`, `02.jpg`, `03.jpg` …** in the order you want them
   shown. Always two digits, and no gaps in the numbering.
3. **`01.jpg` becomes the card's preview image** — so put your best photo first.

## Folder → project card

| Folder                | Project card on the site               |
|-----------------------|----------------------------------------|
| `grand-games/`        | Inter-Hub Grand Games & Awards Day     |
| `business-showcase/`  | ALX Business Showcase                  |
| `staff-hangout/`      | Hub Support Staff Hangout              |
| `games-days/`         | Monthly Games Days                     |
| `valentines-connect/` | Valentine's Community Connect          |

## Example

```
grand-games/
├── 01.jpg   ← preview on the card, and first photo in the gallery
├── 02.jpg
├── 03.jpg
├── 04.jpg
└── 05.jpg
```

Clicking that card opens a full-screen gallery of all five photos, navigable by
swiping, the ← / → arrow buttons, or the arrow keys. Press **X** or **Esc** to close.

## What happens if a folder is empty?

Nothing breaks. The card keeps its flat brown header with the emoji, and it
simply isn't clickable. Add `01.jpg` and the preview and gallery appear.

## Photo tips

- **Landscape** photos look best (roughly 3:2 or 16:9). Portrait ones still work
  — they're letterboxed rather than cropped in the gallery.
- Aim for **1600 px on the long edge**, and compress before committing
  (https://squoosh.app is quick and free). Around 200–400 KB per photo keeps the
  page fast, especially on mobile data.
- Stick to **`.jpg`**. If a project's photos are `.png` instead, open
  `js/gallery.js` and add `ext: '.png'` to that project's line.

> ⚠️ **Windows tip:** File Explorer hides known extensions, so saving a file as
> `01.jpg` can silently produce `01.jpg.jpg`. If photos don't appear, turn on
> *View → Show → File name extensions* and check for a doubled extension.

## Optional: show the photo count immediately

By default the gallery discovers how many photos a folder has as you browse. If
you'd like the card to read "8 photos" and show dot indicators from the start,
open `js/gallery.js` and set the `count` for that project:

```js
'grand-games': { count: 8 },
```

Leave it at `0` to let the site work it out on its own.
