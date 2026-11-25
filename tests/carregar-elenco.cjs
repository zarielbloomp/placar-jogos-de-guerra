const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),assert=require('node:assert/strict'),{spawnSync}=require('node:child_process');
const sample=JSON.parse(fs.readFileSync('tests/fixtures/exercitos-exemplo.json','utf8'));
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'jg-elenco-'));
function invoke(data,mode='--validar'){const input=path.join(tmp,'input.json'),output=path.join(tmp,'output.json');fs.writeFileSync(input,JSON.stringify(data));return spawnSync(process.execPath,['tools/carregar-elenco.mjs',input,mode,...(mode==='--saida'?[output]:[])],{encoding:'utf8'})}
let r=invoke(sample,'--saida');assert.equal(r.status,0,r.stderr);const out=JSON.parse(fs.readFileSync(path.join(tmp,'output.json'),'utf8'));assert.equal(out.partida.schemaVersion,3);assert.equal(out.partida.revision,0);assert.equal(out.partida.roster[0].length,12);assert.equal(out.partida.roster[5].length,12);assert.equal(out.elenco[0][4].f,'CO');assert.equal(out.elenco[5][1].f,'SUB');assert.deepEqual(out.partida.people,out.elenco);assert.match(r.stdout,/homem-bomba/);
for(const mutate of [x=>x.exercitos.pop(),x=>x.exercitos[0].soldados.pop(),x=>x.exercitos[0].soldados[0].co=true,x=>x.exercitos[0].soldados[4].sub=true,x=>x.exercitos[0].soldados[0].codinome=' ',x=>x.exercitos[0].soldados[0].codinome=x.exercitos[0].soldados[1].codinome,x=>x.exercitos[0].soldados[6].hb=false,x=>x.exercitos[1].soldados[0].codinome=x.exercitos[0].soldados[0].codinome]){const data=structuredClone(sample);mutate(data);r=invoke(data);assert.notEqual(r.status,0)}
r=invoke(sample,'--saida');assert.notEqual(r.status,0,'não sobrescreve arquivo');
fs.rmSync(tmp,{recursive:true,force:true});console.log('PASS validação e conversão do elenco fictício');

// Compara o formato produzido com o cadastro efetivamente executado pelo controlador, sem rede.
(async()=>{
 const vm=require('node:vm'),html=fs.readFileSync('index.html','utf8'),code=html.match(/<script>([\s\S]*?)<\/script>/)[1].split('// INICIALIZACAO')[0];
 const context=vm.createContext({document:{getElementById:()=>({style:{},classList:{toggle(){}}}),body:{classList:{toggle(){}}}},console,crypto:require('node:crypto').webcrypto,Date,URLSearchParams,location:{search:''},localStorage:{getItem:()=>null},sessionStorage:{getItem:()=>null},setTimeout:()=>0,clearTimeout(){}});
 vm.runInContext(code,context);const run=s=>vm.runInContext(s,context);
 run("mgPaint=()=>{};var stored=mgDefV3();mgSourceRef={transaction:async fn=>{const n=fn(stored);if(n===undefined)return{committed:false,snapshot:{val:()=>stored}};stored=cl(n);return{committed:true,snapshot:{val:()=>stored}}}};mgMirror=async()=>{};MG={role:'professor',seat:7,game:mgDefV3(),questions:{},elenco:{},votes:{},connected:true,busy:false,error:'',ready:true};mgAuto=false;");
 for(const army of sample.exercitos){const index=army.cor==='preto'?0:5;await run(`mgAction('saveArmy',${JSON.stringify({army:index,name:army.nome})})`);for(const person of army.soldados){const payload={army:index,codename:person.codinome,realname:person.real,role:person.co?'CO':person.sub?'SUB':'PAR'};await run(`mgAction('saveParticipant',${JSON.stringify(payload)})`);assert.equal(run('MG.error'),'')}}
 const actual=JSON.parse(run('JSON.stringify(MG.game)'));
 assert.deepEqual(actual.roster,out.partida.roster);assert.deepEqual(actual.people,out.partida.people);assert.deepEqual(actual.un,out.partida.un);assert.equal(actual.revision,26);assert.equal(out.partida.revision,0);
 console.log('PASS formato do elenco comparado ao cadastro do controlador simulado');
})().catch(e=>{console.error(e);process.exitCode=1});
