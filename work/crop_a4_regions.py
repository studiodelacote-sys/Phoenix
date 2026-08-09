from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "library-a4"

REGIONS = {
    "squat": {
        "source": ROOT / "assets/images/library/squat.png",
        "hero": (24, 315, 675, 1168),
        "objective": (680, 345, 1015, 530),
        "instructions": (680, 525, 1015, 925),
        "cadence": (680, 920, 1015, 1092),
        "volume": (680, 1080, 1015, 1205),
        "avoid": (680, 1190, 1015, 1412),
        "sequence": (38, 1160, 675, 1415),
    },
    "one-arm-row": {
        "source": ROOT / "assets/images/library/row.png",
        "hero": (24, 315, 675, 1168),
        "objective": (680, 345, 1015, 550),
        "instructions": (680, 540, 1015, 965),
        "cadence": (680, 955, 1015, 1148),
        "volume": (680, 1135, 1015, 1260),
        "avoid": (680, 1245, 1015, 1418),
        "sequence": (38, 1160, 675, 1418),
    },
}

for movement, config in REGIONS.items():
    target = OUT / movement
    target.mkdir(parents=True, exist_ok=True)
    with Image.open(config["source"]).convert("RGB") as poster:
        for name, box in config.items():
            if name == "source":
                continue
            poster.crop(box).save(target / f"{name}.webp", "WEBP", quality=92, method=6)
