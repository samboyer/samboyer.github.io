import os
import subprocess

EXCLUDE_DIRS = ["img/favicon", "blog"]

for dirpath, dirnames, filenames in os.walk("img"):
    for filename in filenames:
        if filename.endswith("-mono.png"):
            continue
        if not (filename.endswith(".png") or filename.endswith(".jpg")):
            continue

        if any(dirpath.startswith(prefix) for prefix in EXCLUDE_DIRS):
            continue

        path = dirpath + "/" + filename
        out_path = path.removesuffix(".png").removesuffix(".jpg") + "-mono.png"
        if os.path.exists(out_path):
            continue

        print(path)
        subprocess.run(
            [
                "magick",
                "convert",
                path,
                "-ordered-dither",
                "o8x8,2",
                "-monochrome",
                out_path,
            ],
        )
