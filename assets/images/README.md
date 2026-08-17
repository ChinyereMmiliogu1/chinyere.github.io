# Images

Drop your photos here and the site will pick them up.

## Required / recommended files

| File name        | Used for                          | Notes                                                        |
|------------------|-----------------------------------|--------------------------------------------------------------|
| `hero.jpg`       | Hero banner photo (left side)     | Portrait orientation (4:5), e.g. 800 × 1000 px.              |
| `portrait.jpg`   | About-section profile photo       | Portrait orientation (4:5) looks best, e.g. 800 × 1000 px.   |

If either file is missing, the site automatically shows a dark coffee-brown
placeholder with the initials "CM" — so it never looks broken.

> ⚠️ **Windows tip:** File Explorer hides known extensions, so saving a file as
> `hero.jpg` can silently produce `hero.jpg.jpg`. If a photo doesn't appear, turn on
> *View → Show → File name extensions* and check for a doubled extension.

## Adding event photos to projects (optional)

The `community_projects/` and `data_projects/` folders are ready for your photos.
Project cards currently use flat brown headers with an emoji. To use a real photo
instead, open `index.html`, find the relevant `<div class="project-media ...">`
block, and replace it with an image, e.g.:

```html
<div class="project-media" style="padding:0; min-height:180px;">
  <img src="assets/images/community_projects/grand-games.jpg" alt="Inter-Hub Grand Games" class="w-full h-full object-cover" />
  <span class="project-tag" style="position:absolute; bottom:0.95rem; left:1.15rem;">Lead Coordinator</span>
</div>
```

## Tips
- Compress images before uploading (e.g. https://squoosh.app) to keep the site fast.
- Use `.jpg` for photos and `.png`/`.svg` for logos or graphics.
