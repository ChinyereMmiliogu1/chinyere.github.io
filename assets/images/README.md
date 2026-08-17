# Images

Drop your photos here and the site will pick them up.

## Required / recommended files

| File name        | Used for                          | Notes                                                        |
|------------------|-----------------------------------|--------------------------------------------------------------|
| `portrait.jpg`   | About-section profile photo       | Portrait orientation (4:5) looks best, e.g. 800 × 1000 px.   |

If `portrait.jpg` is missing, the About section automatically shows a navy
placeholder with the initials "CM" — so the site never looks broken.

## Adding event photos to projects (optional)

The project cards currently use coloured gradient headers with an emoji. To use
real event photos instead, open `index.html`, find the relevant
`<div class="project-media ...">` block, and replace it with an image, e.g.:

```html
<div class="project-media" style="padding:0; min-height:180px;">
  <img src="assets/images/grand-games.jpg" alt="Inter-Hub Grand Games" class="w-full h-full object-cover" />
  <span class="project-tag" style="position:absolute; bottom:1.1rem; left:1.25rem;">Lead Coordinator</span>
</div>
```

## Tips
- Compress images before uploading (e.g. https://squoosh.app) to keep the site fast.
- Use `.jpg` for photos and `.png`/`.svg` for logos or graphics.
