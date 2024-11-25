import os
import subprocess
from pathlib import Path

EXCLUDE_DIRS = ["img\\favicon", "blog"]

MORE_COLS_DIRS = ["img\\music"]

for dirpath, dirnames, filenames in os.walk("img"):
    for filename in filenames:
        if filename.endswith("-mono.png"):
            continue
        if not (filename.endswith(".png") or filename.endswith(".jpg")):
            continue

        if any(dirpath.startswith(prefix) for prefix in EXCLUDE_DIRS):
            continue

        path = Path(dirpath) / filename
        out_path = (
            str(path).removesuffix(".png").removesuffix(".jpg") + "-mono.png"
        )
        if os.path.exists(out_path):
            continue

        print(path)
        args = [
            "magick",
            "convert",
            str(path),
        ]
        if any(match in str(path) for match in MORE_COLS_DIRS):
            args += [
                "-colors",
                "4",
                "-resize",
                "200x200",
            ]
        else:
            args += ["-monochrome"]
        args += ["-ordered-dither", "o8x8,2", out_path]

        print(args)

        subprocess.run(args)
