from pathlib import Path
from html.parser import HTMLParser
from urllib.request import Request, urlopen
from datetime import datetime, timezone
import json, hashlib

ROOT = Path(__file__).resolve().parents[2]
BASE = 'https://atiemppo.com'
SLUG = '/blog/sicetac-al-instante-5000-consultas-decisions-openai/'
OUT = Path('/tmp/atiemppo-blog-decisions-publication.json')

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta = {}
        self.links = []
        self.images = []
        self.canonical = None
        self.h1 = []
        self.in_h1 = False
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'meta': self.meta[a.get('property', a.get('name'))] = a.get('content')
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical = a.get('href')
        if tag == 'a': self.links.append(a.get('href'))
        if tag == 'img': self.images.append(a)
        if tag == 'h1': self.in_h1 = True
    def handle_endtag(self, tag):
        if tag == 'h1': self.in_h1 = False
    def handle_data(self, data):
        if self.in_h1: self.h1.append(data)

def fetch(path):
    request = Request(BASE+path, headers={'User-Agent':'ATIEMPPO-publication-check/1.0','Cache-Control':'no-cache'})
    with urlopen(request, timeout=30) as r:
        content = r.read()
        return content, {'url':r.url,'http_status':r.status,'bytes':len(content),'sha256':hashlib.sha256(content).hexdigest()}

report = {'verified_at_utc':datetime.now(timezone.utc).isoformat(),'state':'published_public_readback_verified','article_url':BASE+SLUG,'checks':[]}
html, receipt = fetch(SLUG)
p = Page()
p.feed(html.decode('utf-8'))
assert p.canonical == BASE+SLUG, p.canonical
assert '5.000 consultas' in ''.join(p.h1)
assert p.meta['og:image'] == BASE+'/assets/images/blog/sicetac-decisions-5000/01-celebramos.jpg'
assert any(link and link.startswith('https://wa.me/573134503694?text=') for link in p.links)
assert 'https://developers.openai.com/api/docs/guides/decisions' in p.links
assert '333 pruebas automatizadas' in html.decode('utf-8')
receipt.update({'canonical':p.canonical,'h1':''.join(p.h1),'og_image':p.meta['og:image'],'whatsapp_link':next(link for link in p.links if link and link.startswith('https://wa.me/573134503694?text='))})
report['checks'].append(receipt)

for img in p.images:
    path = img.get('src','')
    if '/sicetac-decisions-5000/' not in path: continue
    content, receipt = fetch(path)
    expected = hashlib.sha256((ROOT/path.lstrip('/')).read_bytes()).hexdigest()
    assert receipt['sha256'] == expected, path
    assert img.get('alt')
    receipt['matches_approved_source'] = True
    report['checks'].append(receipt)
assert len(report['checks']) == 4

for path in ['/blog/', '/', '/blog/sicetac-al-instante-conectar-agente-ia/']:
    content, receipt = fetch(path)
    if path in ['/blog/', '/']:
        q = Page()
        q.feed(content.decode('utf-8'))
        assert SLUG in q.links, path
        receipt['article_link_present'] = True
    report['checks'].append(receipt)

OUT.write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n')
print(json.dumps({'state':report['state'],'url':report['article_url'],'checks':len(report['checks']),'verified_at_utc':report['verified_at_utc'],'receipt':str(OUT)},ensure_ascii=False))
