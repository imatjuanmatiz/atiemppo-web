#!/usr/bin/env python3
"""Build AVIF/WebP (and JPEG srcset) variants for heavy raster images.

Original files stay in place. Output metadata is written to
_data/responsive_images.json for the responsive-image include.
"""
import json
import subprocess
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path("/workspace")
OUT = ROOT / "_data" / "responsive_images.json"
REPORT = Path("/tmp/image-size-report.json")
WIDTHS = (640, 800, 1200, 1600)
THRESHOLD = 400_000
HERO = "assets/images/blog/colfecar-en-tu-region-cali/juan-pablo-matiz-colfecar-cali.jpg"
SKIP_PARTS = {"inventory", "icons"}


def run(cmd):
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)


def identify(path: Path):
    out = subprocess.check_output(
        ["identify", "-format", "%w %h", str(path)], text=True, stderr=subprocess.DEVNULL
    )
    width, height = out.split()
    return int(width), int(height)


def encode_variant(src: Path, dest: Path, kind: str, yuv: str):
    dest.parent.mkdir(parents=True, exist_ok=True)
    if kind == "avif":
        run(["avifenc", "-q", "64", "-s", "6", "--yuv", yuv, str(src), str(dest)])
    elif kind == "webp":
        run(["cwebp", "-q", "82", "-m", "4", str(src), "-o", str(dest)])
    elif kind == "jpg":
        run(["convert", str(src), "-quality", "82", "-strip", str(dest)])
    else:
        raise ValueError(kind)


def resize_png(src: Path, width: int, dest: Path):
    dest.parent.mkdir(parents=True, exist_ok=True)
    run(["convert", str(src), "-filter", "Lanczos", "-resize", f"{width}x", "-strip", str(dest)])


def build_one(path: Path):
    rel = path.relative_to(ROOT).as_posix()
    web_path = "/" + rel
    width, height = identify(path)
    original_bytes = path.stat().st_size
    make_variants = original_bytes >= THRESHOLD or rel == HERO
    entry = {"width": width, "height": height, "bytes": original_bytes}
    produced = []
    if not make_variants:
        return web_path, entry, produced

    targets = [w for w in WIDTHS if w < width]
    targets.append(width)
    yuv = "420" if path.suffix.lower() in {".jpg", ".jpeg"} else "444"
    stem = path.stem
    parent = path.parent
    avif_parts = []
    webp_parts = []
    jpeg_parts = []
    tmp_dir = Path("/tmp/atiemppo-img") / stem
    tmp_dir.mkdir(parents=True, exist_ok=True)

    for target in targets:
        if target == width:
            raster = path
        else:
            raster = tmp_dir / f"{target}.png"
            resize_png(path, target, raster)
        actual_w = target if target == width else identify(raster)[0]
        avif = parent / f"{stem}-{actual_w}.avif"
        webp = parent / f"{stem}-{actual_w}.webp"
        encode_variant(raster, avif, "avif", yuv)
        encode_variant(raster, webp, "webp", yuv)
        avif_parts.append((actual_w, "/" + avif.relative_to(ROOT).as_posix(), avif.stat().st_size))
        webp_parts.append((actual_w, "/" + webp.relative_to(ROOT).as_posix(), webp.stat().st_size))
        produced.append({"format": "avif", "width": actual_w, "bytes": avif.stat().st_size, "path": avif_parts[-1][1]})
        produced.append({"format": "webp", "width": actual_w, "bytes": webp.stat().st_size, "path": webp_parts[-1][1]})
        if path.suffix.lower() in {".jpg", ".jpeg"} and target != width:
            jpg = parent / f"{stem}-{actual_w}.jpg"
            encode_variant(raster, jpg, "jpg", yuv)
            jpeg_parts.append((actual_w, "/" + jpg.relative_to(ROOT).as_posix(), jpg.stat().st_size))
            produced.append({"format": "jpg", "width": actual_w, "bytes": jpg.stat().st_size, "path": jpeg_parts[-1][1]})

    def srcset(parts):
        return ", ".join(f"{url} {w}w" for w, url, _size in parts)

    entry["avif"] = srcset(avif_parts)
    entry["webp"] = srcset(webp_parts)
    if jpeg_parts:
        jpeg_parts.append((width, web_path, original_bytes))
        entry["srcset"] = srcset(jpeg_parts)
    entry["variant_bytes"] = {
        "avif": avif_parts[-1][2],
        "webp": webp_parts[-1][2],
    }
    return web_path, entry, produced


def main():
    sources = []
    for path in (ROOT / "assets" / "images").rglob("*"):
        if not path.is_file():
            continue
        if path.suffix.lower() not in {".png", ".jpg", ".jpeg"}:
            continue
        if any(part in SKIP_PARTS for part in path.parts):
            continue
        # Skip files this script already generated.
        if path.stem.rsplit("-", 1)[-1].isdigit() and path.suffix.lower() in {".avif", ".webp", ".jpg", ".png"}:
            name = path.name
            if any(name.endswith(f"-{w}{path.suffix}") for w in WIDTHS):
                continue
        sources.append(path)

    # Dimensions for every remaining raster, variants only for heavy files and the hero.
    data = {}
    report = []
    heavy = [p for p in sources if p.stat().st_size >= THRESHOLD or p.relative_to(ROOT).as_posix() == HERO]
    light = [p for p in sources if p not in heavy]

    for path in light:
        rel = "/" + path.relative_to(ROOT).as_posix()
        width, height = identify(path)
        data[rel] = {"width": width, "height": height, "bytes": path.stat().st_size}

    with ThreadPoolExecutor(max_workers=4) as pool:
        futures = [pool.submit(build_one, path) for path in heavy]
        for future in as_completed(futures):
            web_path, entry, produced = future.result()
            data[web_path] = entry
            report.append({
                "path": web_path,
                "original_bytes": entry["bytes"],
                "width": entry["width"],
                "height": entry["height"],
                "full_avif_bytes": entry.get("variant_bytes", {}).get("avif"),
                "full_webp_bytes": entry.get("variant_bytes", {}).get("webp"),
                "files": produced,
            })
            print(f"{web_path} {entry['bytes']} -> avif {entry.get('variant_bytes', {}).get('avif')}")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(data, indent=2, sort_keys=True) + "\n")
    report.sort(key=lambda item: item["original_bytes"], reverse=True)
    REPORT.write_text(json.dumps(report, indent=2) + "\n")
    print(f"wrote {OUT} ({len(data)} images, {len(report)} with variants)")


if __name__ == "__main__":
    main()
