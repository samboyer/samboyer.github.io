import jinja2

MY_MUSICS = [
    {
        "title": "BLOOM ETERNAL - THE ORIGINAL SOUNDTRACK REMASTERED",
        "image": "img/music/bloom-remastered.jpg",
        "image_mono": "img/music/bloom-remastered-mono.png",
        "year": 2024,
        "links": [
            {
                "platform": "soundcloud",
                "url": "https://soundcloud.com/sb00sounds/sets/bloom-eternal-remastered",
            },
            {
                "platform": "bandcamp",
                "url": "https://sb00.bandcamp.com/album/bloom-eternal-the-original-soundtrack-remastered",
            },
        ],
        "preview_mp3": None,  # TODO!
    },
    {
        "title": "farewell flowers (piano demos)",
        "image": "img/music/farewell-flowers.jpg",
        "image_mono": "img/music/farewell-flowers-mono.png",
        "year": 2022,
        "links": [
            {
                "platform": "soundcloud",
                "url": "https://soundcloud.com/sb00sounds/sets/farewell-flowers",
            },
            {
                "platform": "bandcamp",
                "url": "https://sb00.bandcamp.com/album/farewell-flowers-piano-demos",
            },
        ],
        "preview_mp3": None,  # TODO!
    },
    {
        "title": "Arity Music (misc remixes)",
        "image": "img/music/arity.jpg",
        "image_mono": "img/music/arity-mono.png",
        "year": "2019-2024",
        "links": [
            {
                "platform": "soundcloud",
                "url": "https://soundcloud.com/sb00sounds/sets/stuff-i-worked-on",
            },
            {
                "platform": "youtube",
                "url": "https://www.youtube.com/@aritymusic6019/videos",
            },
        ],
        "preview_mp3": None,  # TODO!
    },
    {
        "title": "transgressions in cyberspace",
        "image": "img/music/transgressions.jpg",
        "image_mono": "img/music/transgressions-mono.png",
        "year": "2022",
        "links": [
            {
                "platform": "soundcloud",
                "url": "https://soundcloud.com/sb00sounds/sets/transgressions-in-cyberspace",
            },
            {
                "platform": "bandcamp",
                "url": "https://sb00.bandcamp.com/album/transgressions-in-cyberspace",
            },
        ],
        "preview_mp3": None,  # TODO!
    },
    {
        "title": "after long last",
        "image": "img/music/after-long-last.jpg",
        "image_mono": "img/music/after-long-last-mono.png",
        "year": "2021",
        "links": [
            {
                "platform": "soundcloud",
                "url": "https://soundcloud.com/sb00sounds/sets/after-long-last",
            },
            {
                "platform": "bandcamp",
                "url": "https://sb00.bandcamp.com/album/after-long-last",
            },
        ],
        "preview_mp3": None,  # TODO!
    },
]


environment = jinja2.Environment(loader=jinja2.FileSystemLoader("."))
tmpl = environment.get_template("my_music.html.tmpl")
with open("my_music.html", "w") as results:
    results.write(tmpl.render({"tracks": MY_MUSICS}))
