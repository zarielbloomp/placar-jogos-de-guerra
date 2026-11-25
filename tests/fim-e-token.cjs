// A07: fim de jogo sem vencedor arbitrário (empate, eliminação, líder único, pódio provisório).
// A11: plateia renova o token e repete UMA vez quando o 401 é de token vencido; negação real continua recusa.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const js=html.match(/<script id="fx-telao">([\s\S]*?)<\/script>/)[1];
let failed=0;async function test(n,fn){try{await fn();console.log('PASS',n)}catch(e){failed++;console.error('FAIL',n,e.message.slice(0,400))}}
const ini=js.indexOf('function resultado(g)'),fimSrc=js.indexOf('function vitoria(g)');
const resultado=new Function(js.slice(ini,fimSrc)+';return resultado')();
const FIM={phaseClosed:5,phase:5,scoresVisible:true};

(async()=>{
await test('único líder elegível no fim: vitória dele',()=>{const r=resultado({...FIM,armies:[{id:5,rank:2,points:150,alive:2},{id:0,rank:1,points:200,alive:3}]});assert.equal(r.tipo,'vitoria');assert.equal(r.lider.id,0)});
await test('empate no primeiro lugar: desempate, sem vencedor',()=>{assert.equal(resultado({...FIM,armies:[{id:0,rank:1,points:180,alive:3},{id:5,rank:1,points:180,alive:2}]}).tipo,'empate')});
await test('líder eliminado ou sem vivos é ignorado (com e sem o campo novo)',()=>{let r=resultado({...FIM,ineligible:[0],armies:[{id:0,rank:1,points:215,alive:1},{id:5,rank:2,points:150,alive:2}]});assert.equal(r.lider.id,5);assert.equal(r.tipo,'vitoria');r=resultado({...FIM,armies:[{id:0,rank:1,points:215,alive:0},{id:5,rank:2,points:150,alive:2}]});assert.equal(r.lider.id,5);assert.equal(resultado({...FIM,armies:[{id:0,alive:0},{id:5,alive:0}]}).tipo,'sem')});
await test('antes do fechamento da fase 5 é pódio provisório',()=>{assert.equal(resultado({phaseClosed:null,phase:3,scoresVisible:true,armies:[{id:0,rank:1,points:9,alive:1},{id:5,rank:2,points:1,alive:1}]}).tipo,'provisorio')});
await test('efeito usa o resultado: empate mostra cartela de Berlim/Hiroshima/Nagasaki sem confete nem VITÓRIA; provisório sem confete',()=>{assert.match(js,/function vitoria\(g\)\{const r=resultado\(g\);/);const empate=js.slice(js.indexOf("if(r.tipo==='empate')"),js.indexOf("if(r.tipo==='provisorio')")),prov=js.slice(js.indexOf("if(r.tipo==='provisorio')"),js.indexOf('const arm=r.arm'));assert.match(empate,/Berlim, Hiroshima e Nagasaki decidem/);for(const p of ['confete','VITÓRIA','VENCEDOR'])assert.ok(!empate.includes(p)&&!prov.includes(p),p);assert.match(prov,/PÓDIO PROVISÓRIO/)});

const motor=html.match(/<script>([\s\S]*?)<\/script>/)[1].split('// INICIALIZACAO')[0];
const c=vm.createContext({document:{getElementById:()=>({style:{},classList:{toggle(){}}}),body:{classList:{toggle(){}}}},console,crypto:require('node:crypto').webcrypto,Date,URLSearchParams,location:{search:''},localStorage:{getItem:()=>null,setItem(){}},sessionStorage:{getItem:()=>null},setTimeout:(f,n)=>{const t=setTimeout(f,n);t.unref();return t},clearTimeout});vm.runInContext(motor,c);
const projetar=rank=>vm.runInContext(`(()=>{const s=mgDefV3();const orig=mgRanking;mgRanking=()=>${JSON.stringify(rank)};try{return mgPublicState(s)}finally{mgRanking=orig}})()`,c);
await test('projeção: inelegível nunca fica acima de elegível nem empata com ele',()=>{const p=projetar([{i:0,v:[0,0],t:215,eligible:false},{i:5,v:[0,1],t:150,eligible:true}]);assert.deepEqual([...p.rank],[5,0]);assert.equal(p.rankPositions[5],1);assert.equal(p.rankPositions[0],2);assert.deepEqual([...p.ineligible],[0]);const q=projetar([{i:5,v:[0,1],t:180,eligible:true},{i:0,v:[0,0],t:180,eligible:false}]);assert.equal(q.rankPositions[0],2)});
await test('projeção: empate real entre elegíveis continua empate (1º e 1º)',()=>{const p=projetar([{i:0,v:[0,1],t:180,eligible:true},{i:5,v:[0,1],t:180,eligible:true}]);assert.equal(p.rankPositions[0],1);assert.equal(p.rankPositions[5],1);assert.deepEqual([...p.ineligible],[])});

// A11 com fonte REST simulada
const bloco=html.match(/<script id="jgPlateiaModulo">([\s\S]*?)<\/script>/)[1];const w={location:{search:''},matchMedia:()=>({matches:false})};vm.runInNewContext(bloco,{window:w,document:{},console,Date,Math,Promise,setTimeout,clearTimeout,setInterval:()=>0});const T=w.JGPlateia._teste;
function rede(respostasPut){const chamadas=[];let n=0;const resp=(status,obj)=>({ok:status>=200&&status<300,status,json:async()=>obj,headers:{get:()=>null}});return{chamadas,f:async(url,op={})=>{chamadas.push({url:url.replace(/auth=[^&]+/,'auth=*'),metodo:op.method||'GET',token:(/auth=([^&]+)/.exec(url)||[])[1]});if(url.includes('accounts:signUp'))return resp(200,{localId:'uid-x',idToken:'T1',refreshToken:'R1',expiresIn:'3600'});if(url.includes('securetoken'))return resp(200,{user_id:'uid-x',id_token:'T2',refresh_token:'R2',expires_in:'3600'});if(op.method==='PUT'){const r=respostasPut[n++]||[200,{}];return resp(r[0],r[1])}return resp(404,null)}}}
const ls=()=>{const m=new Map();return{getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v))}};
await test('401 por token vencido: renova e repete uma vez com o token novo',async()=>{const r=rede([[401,{error:'Auth token is expired'}],[200,{}]]);const fonte=T.fonteRest({fetch:r.f,armazenamento:ls()});await fonte.enviarReacao('fogo');const puts=r.chamadas.filter(x=>x.metodo==='PUT');assert.equal(puts.length,2);assert.deepEqual(puts.map(x=>x.token),['T1','T2']);assert.equal(r.chamadas.filter(x=>x.url.includes('securetoken')).length,1)});
await test('401 de regra (Permission denied) é recusa direta, sem renovar nem repetir',async()=>{const r=rede([[401,{error:'Permission denied'}]]);const fonte=T.fonteRest({fetch:r.f,armazenamento:ls()});await assert.rejects(fonte.enviarReacao('fogo'),e=>e.code==='PERMISSION_DENIED');assert.equal(r.chamadas.filter(x=>x.metodo==='PUT').length,1);assert.equal(r.chamadas.filter(x=>x.url.includes('securetoken')).length,0)});
await test('token vencido que continua recusado depois da renovação vira recusa, sem laço',async()=>{const r=rede([[401,{error:'Auth token is expired'}],[401,{error:'Auth token is expired'}],[200,{}]]);const fonte=T.fonteRest({fetch:r.f,armazenamento:ls()});await assert.rejects(fonte.salvarTorcida('preto'),e=>e.code==='PERMISSION_DENIED');assert.equal(r.chamadas.filter(x=>x.metodo==='PUT').length,2)});
if(failed)process.exitCode=1;
})();
