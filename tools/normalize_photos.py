"""
One-off normaliser for the community project photos.

For each project folder:
  * reads the files in numeric order (01.jpg.png, 02.jpg.JPG, ...)
  * honours EXIF rotation, then strips all EXIF (phone photos often carry
    GPS coordinates -- those should not ship to a public site)
  * flattens transparency onto white, converts to RGB
  * caps the long edge at 1600px
  * saves as progressive JPEG q82 named 01.jpg, 02.jpg, ...
  * moves the untouched originals outside the repo

Run from the repo root.
"""
import os
import re
import shutil
import sys

from PIL import Image, ImageOps

BASE = os.path.join("assets", "images", "community_projects")
BACKUP = os.path.join("..", "community_portfolio_photo_originals")
MAX_EDGE = 1600
QUALITY = 82

leading_number = re.compile(r"^(\d+)")


def main():
    if not os.path.isdir(BASE):
        sys.exit("run me from the repo root: " + BASE + " not found")

    folders = sorted(
        d for d in os.listdir(BASE) if os.path.isdir(os.path.join(BASE, d))
    )
    grand_before = grand_after = 0
    summary = []

    for folder in folders:
        src_dir = os.path.join(BASE, folder)
        originals = []
        for name in os.listdir(src_dir):
            path = os.path.join(src_dir, name)
            if not os.path.isfile(path):
                continue
            m = leading_number.match(name)
            if not m:
                continue  # README.md, .gitkeep etc.
            originals.append((int(m.group(1)), name))

        if not originals:
            summary.append((folder, 0, 0, 0))
            continue

        originals.sort()
        backup_dir = os.path.join(BACKUP, folder)
        os.makedirs(backup_dir, exist_ok=True)

        before = after = 0
        for position, (_, name) in enumerate(originals, start=1):
            src = os.path.join(src_dir, name)
            before += os.path.getsize(src)

            with Image.open(src) as im:
                im = ImageOps.exif_transpose(im)  # respect phone rotation
                if im.mode in ("RGBA", "LA", "P"):
                    im = im.convert("RGBA")
                    flat = Image.new("RGB", im.size, (255, 255, 255))
                    flat.paste(im, mask=im.split()[-1])
                    im = flat
                elif im.mode != "RGB":
                    im = im.convert("RGB")

                if max(im.size) > MAX_EDGE:
                    im.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)

                # New name may collide with a not-yet-moved original, so stage it.
                staged = os.path.join(src_dir, "__new_%02d.jpg" % position)
                im.save(staged, "JPEG", quality=QUALITY,
                        optimize=True, progressive=True)  # no exif= -> stripped

            shutil.move(src, os.path.join(backup_dir, name))

        for position in range(1, len(originals) + 1):
            staged = os.path.join(src_dir, "__new_%02d.jpg" % position)
            final = os.path.join(src_dir, "%02d.jpg" % position)
            os.replace(staged, final)
            after += os.path.getsize(final)

        grand_before += before
        grand_after += after
        summary.append((folder, len(originals), before, after))

    print("%-22s %5s %12s %12s %8s" % ("FOLDER", "N", "BEFORE", "AFTER", "SAVED"))
    for folder, n, before, after in summary:
        if not n:
            print("%-22s %5d %12s %12s %8s" % (folder, 0, "-", "-", "-"))
            continue
        print("%-22s %5d %9.1f MB %9.2f MB %7.0f%%" % (
            folder, n, before / 1048576, after / 1048576,
            100 * (1 - after / before)))
    print("-" * 62)
    print("%-22s %5s %9.1f MB %9.2f MB %7.0f%%" % (
        "TOTAL", "", grand_before / 1048576, grand_after / 1048576,
        100 * (1 - grand_after / grand_before)))


if __name__ == "__main__":
    main()
