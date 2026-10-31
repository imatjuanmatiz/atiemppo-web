"""Validate published-page outcomes for the main ES/EN visitor journeys.

Run after Jekyll: python3 scripts/check-bilingual-navigation.py /path/to/_site
This checks generated HTML. Query retention and keyboard/menu behavior also
require browser verification; no contact form is submitted by this checker.
"""

import argparse
import json
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit

from bs4 import BeautifulSoup


parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("build", type=Path)
args = parser.parse_args()
root = args.build.resolve()
source = Path(__file__).resolve().parents[1]
paired_routes = [
    "/", "/experiencias/", "/sesion-personalizada/", "/acompanamiento-ia/",
    "/conferencias/", "/workshop/", "/contacto/", "/consultoria/",
    "/inteligencia-planeacion-transporte/", "/sicetac-al-instante/",
    "/base-completa-sicetac/", "/indices-sicetac/", "/sicetac-api/",
    "/reportes/", "/quienes-somos/", "/blog/", "/agentes/",
    "/novedades-en-vias/", "/formacion/profe-bruno-ia-aplicada/",
    "/sesiones/", "/sesiones/registro/", "/sesiones/registro/confirmado/",
    "/blog/conferencias/", "/blog/colfecar-en-tu-region-cali/",
]
if (source / "en/servicios.html").is_file():
    paired_routes.append("/servicios/")

errors = []
checks = 0
cache = {}


def check(ok, *details):
    global checks
    checks += 1
    if not ok:
        errors.append(list(details))


def resolve(path):
    target = root / unquote(path).lstrip("/")
    if target.is_file():
        return target
    if (target / "index.html").is_file():
        return target / "index.html"
    # GitHub Pages also serves extensionless .html documents.
    html = target.with_suffix(".html")
    if not target.suffix and html.is_file():
        return html
    return None


def soup_for(path):
    target = resolve(path)
    if target is None:
        return None
    if target not in cache:
        cache[target] = BeautifulSoup(target.read_text(), "html.parser")
    return cache[target]


for es_route in paired_routes:
    for lang, route, counterpart in [
        ("es", es_route, "/en" + es_route),
        ("en", "/en" + es_route, es_route),
    ]:
        soup = soup_for(route)
        check(soup is not None, route, "missing language equivalent")
        if soup is None:
            continue
        check(bool(soup.html) and soup.html.get("lang", "").split("-")[0] == lang,
              route, "wrong document language")
        check(len(soup.select("main")) == 1, route, "expected one main landmark")
        check(len(soup.select("h1")) == 1, route, "expected one H1")
        check(len(soup.select(".global-footer")) == 1, route, "expected shared footer")
        check(len(soup.select(".bruno-link--floating")) == 1, route, "expected shared Bruno contact")
        check(bool(soup.select('link[href*="site-foundation.css"]')), route, "expected shared identity styles")
        switch = soup.select_one(".global-language")
        check(switch is not None and urlsplit(switch.get("href", "")).path == counterpart,
              route, "language switch must keep the same page", counterpart)
        check(switch is not None and switch.get("hreflang") == ("en" if lang == "es" else "es"),
              route, "wrong switch language")
        if lang == "en":
            account = soup.select_one(".global-account")
            check(account is not None and account.get("hreflang") == "es"
                  and "ES" in account.get_text(), route, "Spanish portal needs a visible language notice")
        for link in soup.select("main a[href]"):
            url = urlsplit(urljoin("https://atiemppo.com" + route, link["href"]))
            if url.scheme not in ("http", "https") or url.netloc not in ("atiemppo.com", "www.atiemppo.com"):
                continue
            if lang == "en" and url.path in paired_routes:
                notice = link.get("hreflang") == "es" and "spanish" in link.get_text().lower()
                check(notice, route, "English journey points to available Spanish equivalent", link["href"])

# A working page link can still leave a visitor at the wrong place if its anchor
# vanished when the homepage was updated. Check destinations and fragments.
inspection_routes = [prefix + route for route in paired_routes for prefix in ("", "/en")]
inspection_routes.extend(["/enfoque/", "/servicios/"])
for route in dict.fromkeys(inspection_routes):
    soup = soup_for(route)
    if soup is None:
        continue
    for link in soup.select("main a[href]"):
        url = urlsplit(urljoin("https://atiemppo.com" + route, link["href"]))
        if url.scheme not in ("http", "https") or url.netloc not in ("atiemppo.com", "www.atiemppo.com"):
            continue
        target = resolve(url.path)
        check(target is not None, route, "missing internal destination", link["href"])
        if target is not None and url.fragment:
            target_soup = soup_for(url.path)
            check(target_soup.find(id=unquote(url.fragment)) is not None,
                  route, "missing fragment", link["href"])

form_options = []
for route in ("/", "/en/", "/contacto/", "/en/contacto/"):
    soup = soup_for(route)
    if soup is None:
        continue
    form = soup.select_one("#contactForm")
    check(form is not None, route, "missing contact form")
    if form is None:
        continue
    values = [option.get("value") for option in form.select('select[name="servicio"] option')]
    check(len(values) == len(set(values)), route, "duplicate service option")
    form_options.append((route, set(values)))
    button = form.select_one('button[type="submit"]')
    check(button is not None and "arrow_forward" not in button.get_text(),
          route, "unrendered icon text in submit button")
for route, values in form_options[1:]:
    check(values == form_options[0][1], route, "service choices differ between languages/pages")

print(json.dumps({"checks": checks, "paired_routes": len(paired_routes), "errors": errors},
                 ensure_ascii=False, indent=2))
raise SystemExit(1 if errors else 0)
