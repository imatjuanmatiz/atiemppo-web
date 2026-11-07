#!/usr/bin/env python3
"""Verify that published text context agrees with the offer pages and their CTAs."""
import argparse
import html
import json
from pathlib import Path
import re
import sys
from urllib.parse import parse_qs, urlsplit

from bs4 import BeautifulSoup


def normalized(text):
    return " ".join(html.unescape(text).split())


def page_file(build, url):
    path = urlsplit(url).path.lstrip("/")
    target = build / path
    return target if target.is_file() else target / "index.html"


parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("build", type=Path, help="Rendered Jekyll output directory")
parser.add_argument("--source", type=Path, default=Path(__file__).resolve().parents[1])
args = parser.parse_args()
data = json.loads((args.source / "_data/experiences.json").read_text())
errors = []
checks = 0


def check(ok, label):
    global checks
    checks += 1
    if not ok:
        errors.append(label)


files = [("llms.txt", "es", False), ("llms-full.txt", "es", True), ("en/llms.txt", "en", True)]
for name, lang, full in files:
    target = args.build / name
    check(target.is_file(), f"{name}: output exists")
    if not target.is_file():
        continue
    text = target.read_text()
    ec = data[lang]
    check(not re.search(r"\{[{%]|^layout:|^permalink:", text, re.M), f"{name}: rendered plain text, without Liquid or frontmatter")
    legacy_term = re.search(r"superinteligencia|superintelligence", text, re.I)
    legacy_acronym = re.search(r"\bSI\b", text)
    check(not (legacy_term or legacy_acronym), f"{name}: current IA/AI terminology")
    check("/sesiones/registro/" not in text, f"{name}: no past registration action")
    check("juanmatiz@atiemppo.co" in text and "https://wa.me/573188022396" in text, f"{name}: company contact remains available")
    heading = "Formación y talleres vigentes" if lang == "es" else "Learning and workshops available by proposal"
    section_match = re.search(r"^## " + re.escape(heading) + r"\n(.*?)(?=^## |\Z)", text, re.M | re.S)
    check(section_match is not None, f"{name}: current formation section")
    if section_match is None:
        continue
    section = section_match.group(1)
    section_text = normalized(section)
    check("/sesiones/" not in section, f"{name}: current offer separated from historical archive")
    check({offer["key"] for offer in ec["offers"]} == {"teams", "conferences", "workshop", "personal"}, f"{name}: all four commercial experiences")
    prefix = ec["prefix"]
    compare_url = f"https://atiemppo.com{prefix}/experiencias/"
    check(compare_url in section, f"{name}: direct comparison destination")
    check(page_file(args.build, compare_url).is_file(), f"{name}: comparison destination built")
    for offer in ec["offers"]:
        url = f"https://atiemppo.com{prefix}{offer['path']}"
        request_url = f"https://atiemppo.com{prefix}/contacto/?servicio={offer['service']}"
        label = f"{name}/{offer['key']}"
        check(url in section and request_url in section, f"{label}: information and exact request destination")
        offer_file = page_file(args.build, url)
        check(offer_file.is_file(), f"{label}: destination page built")
        if not offer_file.is_file():
            continue
        soup = BeautifulSoup(offer_file.read_text(), "html.parser")
        visible_text = normalized(soup.get_text(" ", strip=True))
        for field in ("format_audience", "format_activity", "format_outcome"):
            value = normalized(offer[field])
            check(value in section_text and value in visible_text, f"{label}: {field} agrees across text context and HTML")
        request_matches = []
        for anchor in soup.select('a[href]'):
            parsed = urlsplit(anchor.get("href", ""))
            if parsed.path == f"{prefix}/contacto/" and parse_qs(parsed.query).get("servicio") == [offer["service"]]:
                request_matches.append(anchor)
        check(bool(request_matches), f"{label}: page CTA preserves the same service")
        if full:
            check(normalized(offer["scope"]) in section_text, f"{label}: scope included in detailed context")
            for takeaway in offer["takeaways"]:
                check(normalized(takeaway) in section_text, f"{label}: agreed takeaway included")
            if offer.get("example"):
                check(normalized(offer["example"]["task"]) in section_text, f"{label}: example task preserved")
                check(normalized(offer["example"]["delivery"]) in section_text, f"{label}: example delivery preserved")
    commercial = ec.get("commercial", {})
    check(len(commercial.get("steps", [])) == 4, f"{name}: four steps from request to confirmation")
    for field in ("terms", "steps"):
        for item in commercial.get(field, []):
            check(normalized(item["text"]) in section_text, f"{name}: {field}/{item['title']} reflected from source")
    for item in commercial.get("request_inputs", []):
        check(normalized(item) in section_text, f"{name}: requested proposal input preserved")
    for url in re.findall(r"https://atiemppo\.com/[^\s<>\"]+", section):
        check(page_file(args.build, url).is_file(), f"{name}: linked local destination exists: {url}")

print(json.dumps({"checks": checks, "errors": errors, "files": [row[0] for row in files]}, ensure_ascii=False, indent=2))
sys.exit(1 if errors else 0)
