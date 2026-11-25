// Plateia: mapa fixo, descarte de código inválido, cooldown, medidor, sem innerHTML, pooling, modo reduzido e REST sem SDK.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const bloco=html.match(/<script id="jgPlateiaModulo">([\s\S]*?)<\/script>/)[1],codigo=bloco.replace(/\/\*[\s\S]*?\*\//g,'');
let failed=0;async function test(n,fn){try{await fn();console.log('PASS',n)}catch(e){failed++;console.error('FAIL',n,e.stack.split('\n').slice(0,3).join(' | '))}}

// DOM mínimo: innerHTML/outerHTML/insertAdjacentHTML lançam erro para provar que nunca são usados.
function criarDOM(){let ativo=null;const ouvintesDoc={};
 function no(tag){const n={tagName:tag.toUpperCase(),filhos:[],attrs:{},style:{setProperty(k,v){this[k]=v}},dataset:{},hidden:false,_texto:'',ouvintes:{},parent:null,className:'',
  get textContent(){return this._texto+this.filhos.map(f=>f.textContent).join('')},set textContent(v){this._texto=String(v);this.filhos=[]},
  set innerHTML(v){throw Error('innerHTML proibido')},get innerHTML(){throw Error('innerHTML proibido')},set outerHTML(v){throw Error('outerHTML proibido')},insertAdjacentHTML(){throw Error('insertAdjacentHTML proibido')},
  classList:{s:new Set(),add(c){this.s.add(c)},remove(c){this.s.delete(c)},contains(c){return this.s.has(c)},toggle(c,f){f??!this.s.has(c)?this.s.add(c):this.s.delete(c)}},
  setAttribute(k,v){this.attrs[k]=String(v);if(k==='id')this.id=String(v)},getAttribute(k){return this.attrs[k]??null},
  append(...xs){for(const x of xs){if(typeof x==='string')throw Error('texto cru inserido');x.parent=this;this.filhos.push(x)}},
  remove(){if(this.parent)this.parent.filhos=this.parent.filhos.filter(f=>f!==this)},
  addEventListener(t,f){(this.ouvintes[t]??=[]).push(f)},removeEventListener(){},
  disparar(t,e={}){for(const f of this.ouvintes[t]||[])f(e)},focus(){ativo=this}};n.classList.s=new Set();return n}
 const body=no('body'),head=no('head'),documentElement=no('html');
 function todos(n,acc=[]){acc.push(n);for(const f of n.filhos)todos(f,acc);return acc}
 const document={body,head,documentElement,hidden:false,title:'',createElement:no,get activeElement(){return ativo},
  getElementById:id=>[...todos(head),...todos(body)].find(n=>n.id===id)||null,querySelector:()=>null,
  addEventListener(t,f){(ouvintesDoc[t]??=[]).push(f)},removeEventListener(t,f){ouvintesDoc[t]=(ouvintesDoc[t]||[]).filter(x=>x!==f)},
  tecla(key,extra={}){const e={key,target:body,preventDefault(){this.pd=true},...extra};for(const f of ouvintesDoc.keydown||[])f(e);return e}};
 return{document,todos:()=>todos(body)}}
function carregar({busca='',reduzido=false,firebase}={}){const dom=criarDOM(),timers=[];const window={location:{search:busca},matchMedia:()=>({matches:reduzido})};
 const ctx={window,document:dom.document,console,Date,Math,Promise,setTimeout:(f,ms)=>{timers.push({f,ms});return timers.length},clearTimeout(){},setInterval:()=>0,firebase};
 vm.runInNewContext(bloco,ctx);return{api:window.JGPlateia,t:window.JGPlateia._teste,dom,timers,window}}
const textos=dom=>dom.todos().map(n=>n._texto).join('|');

(async()=>{
await test('mapa fixo tem exatamente os 10 códigos das regras, imutável',()=>{const {t}=carregar();assert.deepEqual([...t.CODIGOS],['fogo','palmas','coracao','choque','bomba','caveira','bandeira','susto','riso','medalha']);const regra=/^(fogo|palmas|coracao|choque|bomba|caveira|bandeira|susto|riso|medalha)$/;for(const c of t.CODIGOS){assert.match(c,regra);assert.ok(t.MAPA[c].emoji&&t.MAPA[c].rotulo&&t.MAPA[c].combo)}assert.ok(Object.isFrozen(t.MAPA)&&Object.isFrozen(t.MAPA.fogo));assert.equal(t.MAPA.fogo.emoji,'🔥')});

await test('código inválido, herdado ou com HTML é descartado; telão nunca exibe texto do banco',()=>{const {api,t,dom}=carregar();for(const e of ['<img src=x onerror=alert(1)>','__proto__','toString','constructor','FOGO','',null,42,{}])assert.equal(api.onReacao({e}),false);assert.equal(api.onReacao(null),false);assert.equal(api.onReacao('fogo'),false);assert.equal(api.onReacao({e:'fogo',texto:'<b>x</b>'}),true);assert.ok(!textos(dom).includes('<'));assert.equal(t.reacaoRecente({e:'xss',t:1000},1000),false)});

await test('reação com mais de 15 s pelo relógio do servidor é ignorada',()=>{const {t}=carregar();const agora=1_000_000;assert.equal(t.reacaoRecente({e:'fogo',t:agora-15000},agora),true);assert.equal(t.reacaoRecente({e:'fogo',t:agora-15001},agora),false);assert.equal(t.reacaoRecente({e:'fogo',t:agora+60000},agora),false);assert.equal(t.reacaoRecente({e:'fogo',t:'abc'},agora),false)});

await test('cooldown de 1,5 s, um envio por vez e sem reenvio automático',async()=>{const {t}=carregar();let agora=0,chamadas=0,soltar;const envio=t.criarEnvio({agora:()=>agora,enviar:()=>{chamadas++;return new Promise(r=>soltar=r)}});const p=envio.tentar('fogo');assert.equal(await envio.tentar('palmas'),'ocupado');soltar();assert.equal(await p,'enviado');agora=1000;assert.equal(await envio.tentar('fogo'),'espera');agora=1500;assert.equal(envio.estado().emEspera,false);const q=envio.tentar('riso');soltar();assert.equal(await q,'enviado');assert.equal(chamadas,2);assert.equal(await envio.tentar('xss'),'invalido');assert.equal(chamadas,2)});

await test('3 negações seguidas pausam 10 s em silêncio; erro de rede não repete',async()=>{const {t}=carregar();let agora=0,chamadas=0,modo='negar';const envio=t.criarEnvio({agora:()=>agora,enviar:async()=>{chamadas++;if(modo==='negar')throw Object.assign(Error('x'),{code:'PERMISSION_DENIED'});throw Error('rede')}});for(let i=0;i<3;i++){assert.equal(await envio.tentar('fogo'),'negado');agora+=1500}assert.equal(envio.estado().pausado,true);assert.equal(await envio.tentar('fogo'),'pausado');assert.equal(chamadas,3);agora+=10000;modo='rede';assert.equal(await envio.tentar('fogo'),'erro');assert.equal(chamadas,4)});

await test('medidor de torcida agrega só preto/amarelo e aceita objeto ou Map',()=>{const {t}=carregar();assert.deepEqual({...t.contarTorcida({})},{preto:0,amarelo:0,total:0,pctPreto:50});assert.deepEqual({...t.contarTorcida({a:'preto',b:'preto',c:'amarelo',d:'<script>',e:7})},{preto:2,amarelo:1,total:3,pctPreto:67});assert.equal(t.contarTorcida(new Map([['a','amarelo']])).pctPreto,0)});

await test('telão: listener único, ignora antigo/inválido, medidor com debounce e contador ao vivo',()=>{const refs={},lidos=[];const db={ref(p){lidos.push(p);const r=refs[p]??={ev:{},on(t,f){(this.ev[t]??=[]).push(f)},off(t,f){this.ev[t]=(this.ev[t]||[]).filter(x=>x!==f)},orderByChild(k){this.ordem=k;return this},limitToLast(n){this.lim=n;return this}};return r}};
 const {t,dom,timers}=carregar();const o=t.iniciarTelao(false,db);assert.ok(lidos.every(p=>!p.includes('segredo')));const q=refs['jg/plateia/reacoes'];assert.equal(q.ordem,'t');assert.equal(q.lim,40);
 const snap=(key,v)=>({key,val:()=>v});const agora=Date.now();q.ev.child_added[0](snap('u1',{e:'fogo',t:agora}));q.ev.child_added[0](snap('u2',{e:'fogo',t:agora-60000}));q.ev.child_changed[0](snap('u3',{e:'<b>',t:agora}));q.ev.child_changed[0](snap('u1',{e:'fogo',t:agora}));
 const info=t.estado().T.chuva.info();assert.equal(info.fila,1,'só a reação recente e válida entra');
 const tor=refs['jg/plateia/torcida'];tor.ev.child_added[0](snap('a','preto'));tor.ev.child_added[0](snap('b','amarelo'));tor.ev.child_added[0](snap('c','preto'));tor.ev.child_added[0](snap('d','roxo'));
 const debounce=timers.filter(x=>x.ms===1000);assert.equal(debounce.length,1,'um único desenho agendado por janela de 1 s');debounce[0].f();
 assert.equal(o.barra.pct.textContent,'Preto 67% · Amarelo 33%');assert.equal(o.barra.pP.style.width,'67%');assert.equal(o.barra.pessoas.textContent,'Ao vivo: 4 pessoas');assert.ok(!textos(dom).includes('u1'));
 t.pararTelao();assert.equal(q.ev.child_added.length,0);assert.equal(tor.ev.child_added.length,0)});

await test('pooling: no máximo 60 elementos, reaproveitados ao fim da animação',()=>{const {t,dom}=carregar();const T=t.montarCamada();for(let i=0;i<100;i++)T.chuva.enfileirar('palmas');for(let i=0;i<20;i++)T.chuva.escoar(8);let info=T.chuva.info();assert.equal(info.total,60);assert.equal(info.ativos,60);assert.equal(info.descartadas,40);const gotas=dom.todos().filter(n=>n.className==='jgp-gota');assert.equal(gotas.length,60);gotas.slice(0,5).forEach(g=>g.disparar('animationend'));assert.equal(T.chuva.info().livres,5);T.chuva.enfileirar('fogo');T.chuva.escoar();info=T.chuva.info();assert.equal(info.total,60,'não cria elemento novo');assert.equal(gotas[4]._texto,'🔥')});

await test('modo reduzido (sistema ou ?fx=0) vira contador discreto sem criar gotas',()=>{for(const cfg of [{reduzido:true},{busca:'?telao=1&fx=0'}]){const {api,t,dom}=carregar(cfg);for(let i=0;i<3;i++)api.onReacao({e:'fogo'});api.onReacao({e:'riso'});const T=t.estado().T;assert.equal(T.chuva.info().total,0);assert.equal(T.contador.hidden,false);assert.equal(T.contador._texto,'🔥 3   😄 1');assert.equal(dom.todos().filter(n=>n.className==='jgp-gota').length,0)}});

await test('combo: 5 iguais em 4 s mostram letreiro uma vez, sem repetir na pausa',()=>{const {t}=carregar();let agora=0;const c=t.criarCombo({agora:()=>agora});const r=[];for(let i=0;i<5;i++){r.push(c.registrar('fogo'));agora+=500}assert.deepEqual(r.slice(0,4),[null,null,null,null]);assert.equal(r[4],'ONDA DE FOGO!');for(let i=0;i<5;i++){assert.equal(c.registrar('fogo'),null);agora+=500}agora+=10000;for(let i=0;i<4;i++)c.registrar('fogo');assert.equal(c.registrar('fogo'),'ONDA DE FOGO!')});

await test('atalhos 1-0 disparam localmente sem escrever no Firebase; ? abre ajuda e Esc fecha',()=>{const db={ref(){return{on(){},off(){},orderByChild(){return this},limitToLast(){return this},set(){throw Error('não pode gravar')}}}};const {t,dom}=carregar();t.iniciarTelao(false,db);const T=t.estado().T;assert.ok(dom.document.tecla('1').pd);assert.ok(dom.document.tecla('0').pd);assert.equal(T.chuva.info().fila,2);dom.document.tecla('5',{ctrlKey:true});dom.document.tecla('3',{target:{tagName:'INPUT'}});assert.equal(T.chuva.info().fila,2);const o=t.estado().ouvindo;dom.document.tecla('?');assert.equal(o.barra.ajuda.hidden,false);assert.equal(dom.document.activeElement,o.barra.fechar);dom.document.tecla('Escape');assert.equal(o.barra.ajuda.hidden,true);t.pararTelao()});

await test('placar público esconde pontos quando o telão oculta e nunca usa jg/segredo',()=>{const {t}=carregar();const e={fase:2,nm:['Preto STAB','','','','','Amarelo ACEIFA'],rank:[5,0],rankPositions:{5:1,0:2},scoreVisible:false,points:{0:999,5:888}};let m=t.placarPublico(e,[{id:2,title:'O AVANÇO DO EIXO'}]);assert.equal(m.fase,'Fase 2 · O AVANÇO DO EIXO');assert.equal(m.pontosVisiveis,false);assert.deepEqual(m.exercitos.map(x=>[x.nome,x.posicao,x.pontos]),[['Amarelo ACEIFA',1,null],['Preto STAB',2,null]]);m=t.placarPublico({...e,scoreVisible:true});assert.deepEqual(m.exercitos.map(x=>x.pontos),[888,999]);assert.equal(t.placarPublico(null).fase,'Aguardando a partida');assert.ok(!codigo.includes('segredo'))});

await test('bloco da plateia não usa innerHTML, eval nem console',()=>{for(const proibido of ['innerHTML','outerHTML','insertAdjacentHTML','document.write','eval(','new Function','console.'])assert.ok(!codigo.includes(proibido),proibido)});

// REST simulado: nenhum SDK, sessão reaproveitada, renovação antes de expirar, PUT nos caminhos do contrato.
function criarFetch(){const chamadas=[];let contas=0,negar=false,aberta=true;const resp=(status,obj)=>({ok:status>=200&&status<300,status,json:async()=>obj});
 const f=async(url,op={})=>{chamadas.push({url,metodo:op.method||'GET',corpo:op.body});if(url.includes('accounts:signUp')){contas++;return resp(200,{localId:'uid-teste-'+contas,idToken:'TOKEN-'+contas,refreshToken:'REFRESH-'+contas,expiresIn:'3600'})}
  if(url.includes('securetoken'))return resp(200,{user_id:'uid-teste-1',id_token:'TOKEN-renovado',refresh_token:'REFRESH-2',expires_in:'3600'});
  if(url.endsWith('/jg/estado.json'))return resp(200,{fase:1,rank:[0,5],scoreVisible:false,points:{0:5,5:7}});
  if(url.endsWith('/jg/plateia/aberta.json'))return resp(200,aberta);
  if(url.includes('/jg/plateia/torcida/')&&!op.method)return resp(200,null);
  if(op.method==='PUT')return negar?resp(401,{error:'Permission denied'}):resp(200,JSON.parse(op.body));
  return resp(404,null)};return{f,chamadas,get contas(){return contas},set negar(v){negar=v},set aberta(v){aberta=v}}}
function armazenamento(){const m=new Map();return{getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v)),m}}

await test('REST: login anônimo uma vez, sessão reaproveitada na recarga e renovada perto de expirar',async()=>{const {t}=carregar();const rede=criarFetch(),ls=armazenamento();let agora=0;
 let fonte=t.fonteRest({fetch:rede.f,armazenamento:ls,agora:()=>agora});assert.equal(await fonte.garantir(),'uid-teste-1');
 fonte=t.fonteRest({fetch:rede.f,armazenamento:ls,agora:()=>agora});assert.equal(await fonte.garantir(),'uid-teste-1');assert.equal(rede.contas,1,'recarga não cria conta nova');
 agora=3600000-200000;await fonte.garantir();assert.ok(rede.chamadas.some(c=>c.url.includes('securetoken')&&c.corpo.startsWith('grant_type=refresh_token')));assert.equal(rede.contas,1);assert.match(ls.m.get('jg-plateia-sessao-v1'),/TOKEN-renovado/)});

await test('REST: grava só reacoes/<uid> e torcida/<uid> com timestamp do servidor; 401 vira negação',async()=>{const {t}=carregar();const rede=criarFetch();const fonte=t.fonteRest({fetch:rede.f,armazenamento:armazenamento()});await fonte.enviarReacao('fogo');await fonte.salvarTorcida('amarelo');const puts=rede.chamadas.filter(c=>c.metodo==='PUT');
 assert.equal(puts[0].url,'https://jogos-de-guerra-default-rtdb.firebaseio.com/jg/plateia/reacoes/uid-teste-1.json?auth=TOKEN-1');assert.deepEqual(JSON.parse(puts[0].corpo),{e:'fogo',t:{'.sv':'timestamp'}});
 assert.equal(puts[1].url,'https://jogos-de-guerra-default-rtdb.firebaseio.com/jg/plateia/torcida/uid-teste-1.json?auth=TOKEN-1');assert.equal(JSON.parse(puts[1].corpo),'amarelo');
 assert.ok(rede.chamadas.every(c=>!c.url.includes('segredo')&&c.metodo!=='DELETE'));rede.negar=true;await assert.rejects(fonte.enviarReacao('fogo'),e=>e.code==='PERMISSION_DENIED')});

await test('tela da plateia: sem SDK, polling do placar, cooldown visual e aviso de plateia fechada',async()=>{let sdk=0;const firebase=new Proxy({},{get(){sdk++;return()=>{throw Error('SDK proibido')}}});const {api,dom,timers}=carregar({busca:'?plateia=1',firebase});const rede=criarFetch();
 const p=await api.iniciar({document:dom.document,window:{location:{search:'?plateia=1'}},fonte:api._teste.fonteRest({fetch:rede.f,armazenamento:armazenamento()})});
 assert.equal(sdk,0,'não toca no SDK');assert.equal(p.ui.status._texto,'Ao vivo. Toque para torcer e reagir.');assert.equal(p.ui.cards[0].pts._texto,'Pontos ocultos');assert.ok(timers.some(x=>x.ms===15000),'polling a cada 15 s');
 assert.equal(p.ui.botoes.fogo.getAttribute('aria-disabled'),'false');await p.reagir('fogo');assert.equal(p.ui.botoes.palmas.getAttribute('aria-disabled'),'true','cooldown bloqueia todos');assert.ok(p.ui.botoes.fogo.classList.contains('jgp-carregando'));assert.equal(p.ui.retorno._texto,'Fogo enviado!');
 await p.reagir('palmas');assert.equal(rede.chamadas.filter(c=>c.metodo==='PUT').length,1,'segundo toque no cooldown não envia');
 await p.escolher('preto');assert.equal(p.ui.torc.preto.getAttribute('aria-pressed'),'true');
 rede.negar=true;rede.aberta=false;await new Promise(r=>setTimeout(r,1600));await p.reagir('riso');await new Promise(r=>setImmediate(r));assert.equal(p.ui.status._texto,'A plateia está fechada no momento.');
 for(const b of Object.values(p.ui.botoes))assert.ok(b.attrs.type==='button'&&b.filhos[0].attrs['aria-hidden']==='true');p.parar()});


await test('plateia acompanha fechamento e reabertura pelo polling sem recarregar',async()=>{
 const {api,dom,timers}=carregar({busca:'?plateia=1'}),rede=criarFetch();rede.aberta=false;
 const p=await api.iniciar({document:dom.document,fonte:api._teste.fonteRest({fetch:rede.f,armazenamento:armazenamento()})});
 await new Promise(r=>setImmediate(r));assert.equal(p.estado().fechada,true);
 rede.aberta=true;await timers.filter(x=>x.ms===15000).at(-1).f();
 assert.equal(p.estado().fechada,false);assert.equal(p.ui.botoes.fogo.getAttribute('aria-disabled'),'false');
 await p.reagir('fogo');assert.equal(rede.chamadas.filter(c=>c.metodo==='PUT').length,1);
 rede.aberta=false;await timers.filter(x=>x.ms===15000).at(-1).f();
 assert.equal(p.estado().fechada,true);p.parar();
});

await test('REST com ETag: 1ª leitura pede ETag, as seguintes mandam If-None-Match e 304 reaproveita sem corpo',async()=>{const {t}=carregar();const pedidos=[];let corpos=0;const f=async(url,op={})=>{pedidos.push({url,h:{...(op.headers||{})}});const cond=op.headers&&op.headers['If-None-Match']==='"e1"';return{ok:!cond,status:cond?304:200,headers:{get:k=>k==='ETag'?'"e1"':null},json:async()=>{corpos++;return{fase:3}}}};
 const fonte=t.fonteRest({fetch:f,armazenamento:armazenamento()});assert.deepEqual({...await fonte.lerEstado()},{fase:3});assert.deepEqual({...await fonte.lerEstado()},{fase:3});
 assert.equal(pedidos[0].h['X-Firebase-ETag'],'true');assert.equal(pedidos[0].h['If-None-Match'],undefined);assert.equal(pedidos[1].h['If-None-Match'],'"e1"');assert.equal(corpos,1,'304 não lê corpo');assert.equal(t.CFG.pollMs,15000);assert.equal(t.CFG.pollOcultoMs,30000)});

await test('aba oculta continua o polling a cada 30 s',async()=>{const {api,dom,timers}=carregar({busca:'?plateia=1'}),rede=criarFetch();dom.document.hidden=true;const p=await api.iniciar({document:dom.document,fonte:api._teste.fonteRest({fetch:rede.f,armazenamento:armazenamento()})});assert.ok(timers.some(x=>x.ms===30000));assert.ok(!timers.some(x=>x.ms===15000));p.parar()});

await test('telão: plateia fechada para a chuva na hora e ignora novas reações da plateia',()=>{const refs={};const db={ref(p){return refs[p]??={ev:{},on(t,f){(this.ev[t]??=[]).push(f)},off(){},orderByChild(){return this},limitToLast(){return this}}}};const {t}=carregar();t.iniciarTelao(false,db);const T=t.estado().T,snap=(key,v)=>({key,val:()=>v});
 for(let i=0;i<5;i++)refs['jg/plateia/reacoes'].ev.child_added[0](snap('u'+i,{e:'fogo',t:Date.now()}));T.chuva.escoar(8);assert.ok(T.chuva.info().ativos>0);
 refs['jg/plateia/aberta'].ev.value[0](snap('aberta',false));let i=T.chuva.info();assert.equal(i.ativos,0);assert.equal(i.fila,0);
 refs['jg/plateia/reacoes'].ev.child_changed[0](snap('u9',{e:'riso',t:Date.now()}));assert.equal(T.chuva.info().fila,0);assert.equal(t.estado().ouvindo.barra.barra.filhos.at(-1).hidden,false,'aviso PLATEIA PAUSADA');
 refs['jg/plateia/aberta'].ev.value[0](snap('aberta',true));refs['jg/plateia/reacoes'].ev.child_changed[0](snap('u9',{e:'riso',t:Date.now()+1}));assert.equal(T.chuva.info().fila,1);t.pararTelao()});

await test('moderação só para assentos 7, 8 e 9; pausar pede confirmação e grava jg/plateia/aberta',async()=>{const gravados=[];let ouvinte;const db={ref(p){assert.equal(p,'jg/plateia/aberta');return{on(t,f){ouvinte=f},off(){},set:async v=>{gravados.push(v)}}}};const firebase={apps:[1],database:()=>db};const {api,t,dom,window}=carregar({firebase});
 for(const v of [{role:'mesa',seat:3},{role:'public'},{role:'professor',seat:6},null])assert.equal(t.podeModerar(v),false);for(const s of [7,8,9])assert.equal(t.podeModerar({role:'professor',seat:s}),true);
 const sessao=dom.document.createElement('div');dom.document.body.append(sessao);dom.document.querySelector=s=>s==='#mgApp .mg-session'?sessao:null;
 api.telao({role:'professor',seat:8,demo:false});ouvinte({val:()=>true});const n=dom.document.getElementById('jgpModeracao');assert.equal(n.filhos[0]._texto,'A PLATEIA ESTÁ ABERTA');assert.equal(n.getAttribute('data-aberta'),'true');
 let perguntas=0;window.confirm=()=>{perguntas++;return false};await t.alternarPlateia();assert.equal(perguntas,1);assert.deepEqual(gravados,[]);
 window.confirm=()=>true;await t.alternarPlateia();assert.deepEqual(gravados,[false]);assert.equal(n.filhos[0]._texto,'PLATEIA PAUSADA');assert.equal(n.getAttribute('data-aberta'),'false');
 await t.alternarPlateia();assert.deepEqual(gravados,[false,true],'reabrir não pede confirmação');
 api.telao({role:'mesa',seat:2,demo:false});assert.equal(dom.document.getElementById('jgpModeracao'),null)});

await test('teclas do operador não duplicam: fx marca preventDefault no dado e não dispara reação quando a plateia existe',()=>{const fx=html.match(/<script id="fx-telao">([\s\S]*?)<\/script>/)[1];assert.match(fx,/esperaDado=0;e\.preventDefault\(\);dado\(Number\(dig\)\)/);assert.match(fx,/if\(dig!=null\)\{if\(!window\.JGPlateia\|\|!window\.JGPlateia\.telao\)window\.jgReacao/);assert.match(codigo,/e\.defaultPrevented\)return/);assert.match(fx,/riso:'😄'/);assert.equal(carregar().t.MAPA.riso.emoji,'😄')});

if(failed)process.exitCode=1;
})();
