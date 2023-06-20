import subprocess
import os


for dirpath, dirnames, filenames in os.walk("img"):
    for filename in filenames:
        if (
            filename.endswith(".png") or filename.endswith(".jpg")
        ) and not filename.endswith("-mono.png"):
            path = dirpath+'/'+filename
            out_path = path.removeprefix('.png').removesuffix('.jpg') + '-mono.png'
            print(path)
            subprocess.run(f'magick convert {path}  -ordered-dither o8x8,2 -monochrome {out_path}')
