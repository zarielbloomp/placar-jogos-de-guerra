// Sigilo do elenco: codinome só aparece (jg/estado, telão, plateia, Alto Comando, avisos) depois que o soldado é atacado.
// Dados fictícios (EXEMPLO). Senhor da Guerra e Pontuadores continuam vendo tudo.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const motor=html.match(/<script>([\s\S]*?)<\/script>/)[1].split('// INICIALIZACAO')[0];
const ctx=vm.createContext({document:{getElementById:()=>({style:{},classList:{toggle(){}}}),body:{classList:{toggle(){}}}},console,crypto:require('node:crypto').webcrypto,Date,URLSearchParams,location:{search:''},localStorage:{getItem:()=>null,setItem(){}},sessionStorage:{getItem:()=>null},setTimeout:(f,n)=>{const t=setTimeout(f,n);t.unref();return t},clearTimeout});
vm.runInContext(motor,ctx);const run=c=>vm.runInContext(c,ctx);
const nodes={};const ui=(()=>{let u=html.split('// INICIALIZACAO')[1].split('\nmgInit(')[0];u=u.replace('  const CSS=','  window.__t={state,staffPage,publicPage,announceView:typeof announceView===\'function\'?announceView:null};\n  const CSS=');const window={};
 for(const id of ['mgLiveStatus','mgLiveAlert']){let t='';nodes[id]={get textContent(){return t},set textContent(v){t=String(v)}}}
 vm.runInNewContext(u,{window,document:{getElementById:id=>nodes[id]||null,documentElement:{}},console,setTimeout,Date});return window.__t})();
const TODOS=['EXEMPLO_ALFA','EXEMPLO_BRAVO','EXEMPLO_CHARLIE','EXEMPLO_DELTA','EXEMPLO_ECO','EXEMPLO_FOX'];
run(`var s=mgDefV3();s.roster[0]=['EXEMPLO_ALFA','EXEMPLO_BRAVO','EXEMPLO_CHARLIE'];s.roster[5]=['EXEMPLO_DELTA','EXEMPLO_ECO','EXEMPLO_FOX'];s.people={0:{0:{r:'EXEMPLO_NOME_ALFA',f:'CO'}},5:{1:{r:'EXEMPLO_NOME_ECO',f:'SUB'}}};`);
function telas(role,seat){run(`MG.role=${JSON.stringify(role)};MG.seat=${JSON.stringify(seat)};MG.game=${role==='public'?'null':'s'};MG.elenco=${role==='public'?'{}':'s.people'};MG.public=mgProject(s);MG.ready=true;`);const v=JSON.parse(JSON.stringify(run('mgView()')));ui.state.view=v;const pag=role==='public'?ui.publicPage():ui.staffPage();let aviso='';if(ui.announceView){ui.announceView(v);aviso=nodes.mgLiveStatus.textContent+' '+nodes.mgLiveAlert.textContent}return{v,pag,aviso,estado:JSON.stringify(run('mgPublicState(s)'))+JSON.stringify(run('mgProject(s)'))}}
const contem=(txt,lista)=>lista.filter(n=>txt.includes(n));
let failed=0;function test(n,fn){try{fn();console.log('PASS',n)}catch(e){failed++;console.error('FAIL',n,e.message.slice(0,400))}}

test('antes de qualquer ataque: jg/estado, telão, Alto Comando e avisos não têm codinome nem nome real',()=>{
 const p=run('mgPublicState(s)');assert.deepEqual([...p.roster[0]],['Soldado 1','Soldado 2','Soldado 3']);assert.deepEqual([...p.roster[5]],['Soldado 1','Soldado 2','Soldado 3']);assert.equal(p.statuses[0].length,3,'contagem preservada');
 for(const [role,seat] of [['public',null],['mesa',2]]){const t=telas(role,seat);assert.deepEqual(contem(t.estado+t.pag+t.aviso+JSON.stringify({p:t.v.participants,a:t.v.game&&t.v.game.activity,pel:t.v.game&&t.v.game.peloton}),[...TODOS,'EXEMPLO_NOME']),[],role)}});

test('ao abrir o ataque, só o alvo aparece; quem pergunta (não atacado) continua sigiloso',()=>{
 run(`s=mgStartBattle(s,{id:'q',army:0,phase:1,title:'P',text:'Enunciado EXEMPLO',approved:true,category:'normal'},5,1,'normal',false,2);`);
 for(const [role,seat] of [['public',null],['mesa',3]]){const t=telas(role,seat),tudo=t.estado+t.pag+JSON.stringify({p:t.v.participants,a:t.v.game&&t.v.game.activity,pel:t.v.game&&t.v.game.peloton});assert.ok(t.pag.includes('EXEMPLO_ECO'),role+': alvo visível para a pergunta ser lida');assert.deepEqual(contem(tudo,TODOS.filter(n=>n!=='EXEMPLO_ECO')),[],role);assert.ok(!tudo.includes('EXEMPLO_NOME'),role+': nome real só com revelação')}
 assert.equal(run('mgPublicState(s).battle.asker.codename'),'Soldado 3')});

test('soldado atingido por um lance (morto, preso ou memorial) continua divulgado depois que o ataque termina',()=>{
 run(`var s2=mgDefV3();s2.roster[0]=['EXEMPLO_ALFA','EXEMPLO_BRAVO','EXEMPLO_CHARLIE'];s2.roster[5]=['EXEMPLO_DELTA','EXEMPLO_ECO','EXEMPLO_FOX'];s2.E=[mgWithState(s2,()=>makeEvent(2,0,5,2,1,''))];`);
 const p=run('mgPublicState(s2)');assert.equal(p.roster[5][2],'EXEMPLO_FOX');assert.equal(p.statuses[5][2],'m');assert.deepEqual([...p.roster[5].slice(0,2)],['Soldado 1','Soldado 2']);assert.ok(!JSON.stringify(p).includes('EXEMPLO_DELTA'))});

test('Senhor da Guerra e Pontuadores (7, 8, 9) veem todos os codinomes para operar',()=>{for(const seat of [7,8,9]){const t=telas('professor',seat);const nomes=t.v.participants.map(x=>x.codename);for(const n of TODOS)assert.ok(nomes.includes(n),seat+' '+n)}});

test('estado antigo sem eventos nem batalha continua funcionando',()=>{const p=run(`(()=>{const o=mgDefV3();o.roster[0]=['EXEMPLO_ALFA'];delete o.E;delete o.rv;return mgPublicState(mgNormalize(o))})()`);assert.deepEqual([...p.roster[0]],['Soldado 1'])});

test('nada permite deduzir o codinome: rótulo depende só da posição',()=>{run(`var s3=mgDefV3();s3.roster[0]=['EXEMPLO_ZZZZZZZZZZZZ','A'];`);const p=run('mgPublicState(s3)');assert.deepEqual([...p.roster[0]],['Soldado 1','Soldado 2'])});
if(failed)process.exitCode=1;
