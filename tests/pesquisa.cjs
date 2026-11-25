const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');let ui=html.split('// INICIALIZACAO')[1].split('\nmgInit(')[0];
ui=ui.replace('  const CSS=', '  window.__pesquisa={state,staffPage};\n  const CSS=');
class Element{
  constructor(tag){this.tagName=tag;this.children=[];this.attrs={};this.events={};this.value='';this.textContent='';}
  append(...children){this.children.push(...children);}
  replaceChildren(...children){this.children=children;}
  setAttribute(k,v){this.attrs[k]=v;}
  removeAttribute(k){delete this.attrs[k];if(k==='href')delete this.href;}
  addEventListener(k,v){this.events[k]=v;}
  dispatchEvent(e){this.events[e.type]?.(e);}
}
const document={getElementById:()=>null,createElement:tag=>new Element(tag)},window={},location={search:''};
vm.runInNewContext(ui,{window,document,location,console,setTimeout,Date,Event});const api=window.JGPesquisa,state=window.__pesquisa.state;
let failed=0;function test(n,f){try{f();console.log('PASS',n);}catch(e){failed++;console.error('FAIL',n,e.message);}}
const q={number:64,title:'Crise',text:'Aviões e industrialização',phase:2,army:5,category:'especial',expected:'NÃO LOCALIZAR GABARITO'};
state.view={role:'professor',game:{},questions:[q]};
test('filtro por número, enunciado sem acentos, fase, exército e categoria; nunca gabarito',()=>{for(const term of ['64','AVIOES','industrializacao','Fase 2','Amarelo','especial'])assert(api.matches(q,0,term),term);assert(!api.matches(q,0,'NÃO LOCALIZAR GABARITO'));assert(!api.matches(q,0,'inexistente'));assert(api.matches(q,0,''));});
test('destaque preserva texto e trata caracteres HTML como texto',()=>{const text='<img src=x onerror=alert(1)> Aviões';const parts=api.segments(text,'avioes');assert.equal(parts.map(p=>p.text).join(''),text);assert.equal(parts.find(p=>p.match).text,'Aviões');assert.equal(api.segments('aaaa','aa').filter(p=>p.match).length,2);});
test('Google usa somente termo manual e encodeURIComponent',()=>{const term='ação & x=1 # ? / + <script>';assert.equal(api.googleURL(term),'https://www.google.com/search?q='+encodeURIComponent(term));});
test('verificador vazio, rel seguro, URL manual, Enter e Esc',()=>{state.view.role='mesa';const host=new Element('div');const box=api.montarVerificador(host),input=box.children[1],link=box.children.at(-1);assert.equal(input.value,'');assert.equal(link.href,undefined);assert.equal(link.target,'_blank');assert.equal(link.rel,'noopener noreferrer');input.value='resposta & informação';input.dispatchEvent(new Event('input'));assert.equal(link.href,api.googleURL(input.value));let clicks=0;link.click=()=>clicks++;input.events.keydown({key:'Enter',preventDefault(){}});assert.equal(clicks,1);input.events.keydown({key:'Escape',preventDefault(){}});assert.equal(input.value,'');assert.equal(link.href,undefined);});
test('recusa jogador, público, professor, visitante e rotas públicas mesmo autenticadas',()=>{for(const role of ['professor','public','jogador',null]){state.view.role=role;assert.equal(api.montarVerificador(new Element('div')),null);}state.view.role='mesa';for(const route of ['?ensaio=1&telao=1','?ensaio=1&plateia=1']){location.search=route;assert.equal(api.montarVerificador(new Element('div')),null);}location.search='';});
test('Alto Comando recebe só pergunta atual, padrão e voto, lista só via busca (jgBuscaHost), sem vazar no HTML',()=>{state.view={role:'mesa',seat:1,game:{activity:{text:'ATUAL',expected:'PADRÃO ATUAL'}},questions:[{id:'futura',title:'FUTURA SIGILOSA',expected:'GABARITO FUTURO'}]};const out=window.__pesquisa.staffPage();assert(out.includes('ATUAL'));assert(out.includes('PADRÃO ATUAL'));assert(out.includes('jgVerificadorHost'));assert(out.includes('jgBuscaHost'));for(const secret of ['FUTURA SIGILOSA','GABARITO FUTURO','Arsenal','Preparar'])assert(!out.includes(secret));});
test('bloco isolado não usa HTML de dados, rede, armazenamento nem drafts; teclado e toque presentes',()=>{const block=html.split('/* ==== PESQUISA ==== */')[1].split('/* ==== /PESQUISA ==== */')[0];for(const bad of ['innerHTML','fetch(','localStorage','sessionStorage','state.drafts','firebase','iframe'])assert(!block.includes(bad),bad);assert.match(block,/e.key==='\/'/);assert.match(block,/toLowerCase\(\)==='g'/);assert.match(block,/e.key==='Escape'/);assert.match(block,/e.key==='Enter'/);assert.match(block,/min-height:44px/);assert.match(block,/textContent=text/);});
if(failed)process.exitCode=1;
