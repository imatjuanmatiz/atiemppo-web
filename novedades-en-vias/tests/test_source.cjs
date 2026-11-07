const fs=require('fs'), vm=require('vm'), assert=require('assert'), path=require('path');
const code=fs.readFileSync(path.join(__dirname,'..','app.js'),'utf8').replace(/loadState\(\);\s*$/,'');
const raw='https://raw.githubusercontent.com/imatjuanmatiz/atiemppo-web/main/novedades-en-vias/estado_vial.json';
function setup(fetch, timer=setTimeout) {
 const nodes=new Map();function element(id){if(!nodes.has(id))nodes.set(id,{id,hidden:false,innerHTML:'',textContent:'',after(){}});return nodes.get(id)}
 const context=vm.createContext({document:{getElementById:element,createElement:()=>({})},Intl,Date,String,console,fetch,AbortController,setTimeout:timer,clearTimeout});
 vm.runInContext(code,context);return {context,element};
}
function data(time=new Date().toISOString()){return {cut_id:'2026-11-07-am',fecha:'2026-11-07',ventana:'AM',generado_en:time,que_cambio:[],notas_cambio:[]}}
function response(d){return {ok:true,json:async()=>d}}
(async()=>{
 let urls=[];let t=setup(async (url)=>{urls.push(url);return response(data())});await vm.runInContext('loadState()',t.context);
 assert.match(t.element('memoria-vial').innerHTML,/Consultar los datos del corte<\/a>/);assert.doesNotMatch(t.element('memoria-vial').innerHTML,/historial de siete días/);
 assert.deepEqual(urls,[raw]);assert.match(t.element('load-status').textContent,/fuente pública del consolidado/);assert.match(t.element('load-status').textContent,/no confirma la vigencia/);assert.match(t.element('load-status').className,/ready/);
 t=setup(async()=>response(data(new Date(Date.now()-9*3600e3).toISOString())));await vm.runInContext('loadState()',t.context);
 assert.match(t.element('load-status').textContent,/más de 8 horas/);assert.match(t.element('load-status').className,/warning/);
 urls=[];t=setup(async url=>{urls.push(url);if(url===raw)throw Error('offline');return response(data())});await vm.runInContext('loadState()',t.context);
 assert.deepEqual(urls,[raw,'estado_vial.json']);assert.match(t.element('load-status').textContent,/copia de esta página/);assert.match(t.element('load-status').className,/warning/);
 let count=0;urls=[];t=setup((url,{signal})=>{urls.push(url);if(url===raw)return new Promise((_,reject)=>signal.addEventListener('abort',()=>reject(Error('timeout'))));return Promise.resolve(response(data()))},fn=>{if(++count===1)queueMicrotask(fn);return 0});
 await vm.runInContext('loadState()',t.context);assert.deepEqual(urls,[raw,'estado_vial.json']);assert.match(t.element('load-status').className,/warning/);
 t=setup(async()=>{throw Error('offline')});await vm.runInContext('loadState()',t.context);assert.match(t.element('load-status').className,/error/);
 assert.match(vm.runInContext('cutFreshness("2026-11-07T09:00:00")',t.context).text,/no verificable/);
 assert.match(vm.runInContext('cutFreshness(new Date(Date.now()+3600000).toISOString())',t.context).text,/fecha futura/);
 console.log('Raw, fallback, timeout, fecha vencida/futura y error total: verificados');
})().catch(error=>{console.error(error);process.exitCode=1});
