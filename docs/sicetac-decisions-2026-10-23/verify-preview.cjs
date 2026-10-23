const fs = require('node:fs');
const {chromium} = require('playwright');
const root = process.env.ATICA_BLOG_QA_DIR || '/tmp/atiemppo-blog-decisions-qa';
const base = process.env.ATICA_BLOG_PREVIEW_URL || 'http://127.0.0.1:4329';
if (!['127.0.0.1','localhost'].includes(new URL(base).hostname)) throw Error('Only local preview servers are allowed');
const slug = '/blog/sicetac-al-instante-5000-consultas-decisions-openai/';
(async () => {
  fs.mkdirSync(root, {recursive:true});
  const browser = await chromium.launch({headless:true, executablePath:process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  const report = {status:'local_preview_not_published', external_network_allowed:false, viewports:[]};
  for (const width of [320,390,1366]) {
    const page = await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.route('**/*', r => r.request().url().startsWith(base) ? r.continue() : r.abort());
    const res = await page.goto(base+slug,{waitUntil:'networkidle'});
    await page.locator('.global-header[data-nav-ready]').waitFor({state:'attached'});
    await page.locator('article img').evaluateAll(async imgs => {
      for (const img of imgs) {img.loading='eager'; await img.decode();}
    });
    const checks = await page.evaluate(() => ({
      title:document.title,
      canonical:document.querySelector('link[rel=canonical]')?.href,
      ogImage:document.querySelector('meta[property="og:image"]')?.content,
      h1:document.querySelectorAll('h1').length,
      viewport:innerWidth,
      scrollWidth:document.documentElement.scrollWidth,
      flowColumns:getComputedStyle(document.querySelector('.decisions-flow')).gridTemplateColumns,
      images:[...document.querySelectorAll('article img')].map(i=>({src:i.getAttribute('src'),alt:i.alt,complete:i.complete,width:i.naturalWidth,height:i.naturalHeight,declaredWidth:Number(i.getAttribute('width')),declaredHeight:Number(i.getAttribute('height'))})),
      whatsapp:document.querySelector('.decisions-cta a')?.href,
      internalLinks:[...document.querySelectorAll('.post-body a[href^="/"]')].map(a=>a.getAttribute('href')),
      mobileMenuExpanded:document.querySelector('.global-menu-toggle').getAttribute('aria-expanded'),
      apiSource:!!document.querySelector('.post-body a[href="https://developers.openai.com/api/docs/guides/decisions"]'),
      articleText:document.querySelector('.post-body').innerText,
    }));
    if (res.status()!==200 || checks.scrollWidth>width || checks.h1!==1 || errors.length) throw Error(JSON.stringify({width,status:res.status(),errors,...checks}));
    if(checks.canonical!=='https://atiemppo.com'+slug || !checks.apiSource || !checks.whatsapp.startsWith('https://wa.me/573134503694?text=')) throw Error('Metadata/CTA failed');
    if(checks.images.length!==3 || checks.images.some(i=>!i.alt || !i.complete || i.width!==i.declaredWidth || i.height!==i.declaredHeight)) throw Error('Image check failed');
    if(!checks.articleText.includes('333 pruebas automatizadas') || !checks.articleText.includes('sin recordar una ruta anterior')) throw Error('Content check failed');
    delete checks.articleText;
    for(const link of checks.internalLinks) {
      const response = await page.request.get(base+link);
      if(response.status()!==200) throw Error('Broken internal link: '+link+' '+response.status());
    }
    await page.screenshot({path:root+'/portada-'+width+'.png'});
    await page.locator('.decisions-flow').screenshot({path:root+'/flujo-'+width+'.png'});
    if(width===1366) await page.screenshot({path:root+'/articulo-completo.png',fullPage:true});
    if(width===390) {
      await page.locator('.decisions-cta').evaluate(el=>window.scrollTo(0,el.getBoundingClientRect().top+scrollY-100));
      await page.screenshot({path:root+'/whatsapp-390.png'});
    }
    report.viewports.push({status:res.status(),width,errors,...checks});
    await page.close();
  }
  const page = await browser.newPage();
  await page.route('**/*', r=>r.request().url().startsWith(base)?r.continue():r.abort());
  report.discovery={};
  for(const route of ['/blog/','/']) {
    await page.goto(base+route,{waitUntil:'networkidle'});
    const found = await page.locator('a[href="'+slug+'"]').count();
    report.discovery[route]=found;
    if(!found)throw Error('Article absent from '+route);
  }
  await browser.close();
  fs.writeFileSync(root+'/verification.json',JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report,null,2));
})().catch(e=>{console.error(e);process.exit(1)});
