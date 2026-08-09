from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
POSTERS = ROOT / "assets" / "posters" / "v2"
OUTPUT = ROOT / "assets" / "library-a4" / "v2"

# Coordinates are expressed in the 1055 × 1491 V2 master space.
# Mobile CSS deliberately rebuilds a complete four-sided gold frame around
# every section, so no crop depends on a neighbouring poster rule.
REGIONS = {
    "squat": {
        "source": POSTERS / "squat-vers-chaise-a4-v2.webp",
        "hero-grey": (29, 310, 686, 1184),
        "objective": (690, 348, 1027, 528),
        "comment-faire": (690, 526, 1027, 970),
        "cadence": (690, 966, 1027, 1137),
        "volume": (690, 1130, 1027, 1260),
        "a-eviter": (690, 1252, 1027, 1434),
        "sequence": (42, 1182, 686, 1435),
    },
    "one-arm-row": {
        "source": POSTERS / "tirage-un-bras-appui-a4-v2.webp",
        "hero-grey": (38, 324, 671, 1178),
        "objective": (686, 350, 1027, 551),
        "comment-faire": (686, 548, 1027, 967),
        "cadence": (686, 965, 1027, 1148),
        "volume": (686, 1145, 1027, 1278),
        "a-eviter": (686, 1275, 1027, 1427),
        "sequence": (39, 1176, 671, 1424),
    },
}


for movement, config in REGIONS.items():
    destination = OUTPUT / movement
    destination.mkdir(parents=True, exist_ok=True)
    with Image.open(config["source"]).convert("RGB") as poster:
        for name, box in config.items():
            if name == "source":
                continue
            poster.crop(box).save(
                destination / f"{name}.webp",
                "WEBP",
                quality=94,
                method=6,
            )
