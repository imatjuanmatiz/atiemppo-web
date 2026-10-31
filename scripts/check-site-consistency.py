from pathlib import Path
from bs4 import BeautifulSoup
from urllib.parse import urlsplit,unquote
import json,subprocess,re,argparse,sys
parser=argparse.ArgumentParser(description='Check shared navigation, current account offer, assets and contact form contracts on a Jekyll build.')
parser.add_argument('build',type=Path,help='Generated Jekyll site directory')
args=parser.parse_args()
root=args.build; base=Path(__file__).resolve().parents[1]
routes=['/','/en/','/consultoria/','/en/consultoria/','/inteligencia-planeacion-transporte/','/en/inteligencia-planeacion-transporte/','/acompanamiento-ia/','/en/acompanamiento-ia/','/quienes-somos/','/en/quienes-somos/','/blog/','/en/blog/','/sicetac-al-instante/','/en/sicetac-al-instante/','/reportes/','/en/reportes/']
routes += ['/base-completa-sicetac/','/indices-sicetac/','/sicetac-api/','/servicios/','/formacion/profe-bruno-ia-aplicada/','/en/base-completa-sicetac/','/en/indices-sicetac/','/en/sicetac-api/','/en/formacion/profe-bruno-ia-aplicada/']
routes += [prefix+path for prefix in ['', '/en'] for path in ['/experiencias/','/sesion-personalizada/','/conferencias/','/workshop/','/contacto/']]
errors=[];warnings=[];checks=0
for route in routes:
 file=root/route.lstrip('/')/'index.html';soup=BeautifulSoup(file.read_text(),'html.parser');en=route.startswith('/en/')
 for test,ok in [('one H1',len(soup.find_all('h1'))==1),('shared footer',len(soup.select('.global-footer'))==1),('shared identity',bool(soup.select('link[href*="site-foundation.css"]'))),('register destination',soup.select_one('.global-account')['href']=='https://clientes.atiemppo.com/registro')]:
  checks+=1
  if not ok:errors.append([route,test])
 for link in soup.select('.global-menu a,.global-footer a,.portal-post a'):
  u=urlsplit(link.get('href',''));p=unquote(u.path)
  if not u.netloc and p.startswith('/'):
   target=root/p.lstrip('/');exists=target.is_file() or (target/'index.html').is_file();checks+=1
   if not exists:errors.append([route,'broken shared link',p])
 for elem in soup.select('main a[href],main img[src],link[rel=stylesheet],script[src]'):
  url=elem.get('href',elem.get('src',''));u=urlsplit(url)
  if not u.netloc and u.path.startswith('/'):
   target=root/unquote(u.path).lstrip('/')
   if not(target.is_file() or (target/'index.html').is_file()):warnings.append([route,'existing or main content link',url])
 if route in ['/','/en/','/inteligencia-planeacion-transporte/','/en/inteligencia-planeacion-transporte/']:
  checks+=1
  if re.search('acceso anticipado|early access|solicitar mi cuenta|request my free account',soup.get_text(),re.I):errors.append([route,'stale access message'])
 if route in ['/','/en/']:
  news=soup.select('.portal-post a');checks+=1
  if len(news)!=3:errors.append([route,'expected three selected articles'])
  if any(link['href'].startswith('/en/') != en for link in news):errors.append([route,'news wrong language'])
# Preserve submission destinations and fields; the EN service list may gain its
# previously missing equivalent of the existing Spanish transport session.
for f in ['index.html','en/index.html']:
 old=BeautifulSoup(subprocess.check_output(['git','show','HEAD:'+f],text=True),'html.parser');new=BeautifulSoup((root/f).read_text(),'html.parser')
 if not old.select_one('#contactForm'):
  # The shared form replaced inline home markup; compare the matching language.
  shared=BeautifulSoup(subprocess.check_output(['git','show','HEAD:_includes/contact.html'],text=True),'html.parser')
  name='contacto-en' if f.startswith('en/') else 'contacto'
  old=BeautifulSoup(str(shared.select_one('form[name="'+name+'"]')),'html.parser')
 def contract(s):
  form=s.select_one('#contactForm');return {'action':form.get('action'),'method':form.get('method'),'script_endpoint':form.get('data-google-script-url'),'redirects':[(e.get('name'),e.get('value')) for e in form.select('input[name="_next"],input[name="success_redirect"]')],'fields':[(e.name,e.get('name'),e.get('type'),e.has_attr('required')) for e in form.select('input,select,textarea')],'options':[e.get('value') for e in form.select('option')]}
 old_contract=contract(old);new_contract=contract(new)
 if f.startswith('en/') and 'sesion-red' not in old_contract['options']:
  new_contract['options']=[value for value in new_contract['options'] if value != 'sesion-red']
 checks+=1
 if old_contract!=new_contract:errors.append([f,'form contract changed'])
print(json.dumps({'checks':checks,'errors':errors,'main_content_warnings':warnings},ensure_ascii=False,indent=2))

sys.exit(1 if errors or warnings else 0)
