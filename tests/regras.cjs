const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const cut=script.includes('// INICIALIZACAO')?script.split('// INICIALIZACAO')[0]:script.split("$('nm').innerHTML=S.nm.map")[0];
const els=new Map();const el=id=>{if(!els.has(id))els.set(id,{value:'',textContent:'',innerHTML:'',style:{},classList:{toggle(){}},appendChild(){}});return els.get(id)};
const ctx=vm.createContext({document:{getElementById:el,body:{classList:{toggle(){}}},createElement:()=>el('tmp')},console,setTimeout:()=>0,clearTimeout(){},setInterval:()=>0,clearInterval(){},URLSearchParams,location:{search:'',href:'http://localhost/index.html',origin:'http://localhost',pathname:'/index.html'},localStorage:{getItem:()=>null,setItem(){}},sessionStorage:{getItem:()=>null,setItem(){}},navigator:{},crypto:require('node:crypto').webcrypto,Date,confirm:()=>true});
vm.runInContext(cut,ctx);const run=s=>vm.runInContext(s,ctx);let failed=0,passed=0;
function test(name,fn){try{run('S=def(); SG=defSG();');fn();console.log('PASS',name);passed++}catch(e){console.log('FAIL',name,'-',e.message);failed++}}
test('26 índices originais preservados',()=>{assert.equal(run('P[23][0]'),'Ajuste manual / outro lance');assert.match(run('P[25][0]'),/preso/)});
test('não publica identidade ao registrar baixa',()=>{run("SG[1][0]={r:'IDENTIDADE_TESTE',f:'CO'}; applyEvent(S,makeEvent(2,0,1,0,1));");assert(!run("JSON.stringify(publicState(S)).includes('IDENTIDADE_TESTE')"));assert.equal(run('S.E[0].rf'),'')});
test('baixa atualiza placar e Memorial de forma consistente',()=>{run('applyEvent(S,makeEvent(2,0,1,0,1))');assert.equal(run('calc()[1][1]'),11);assert.equal(run('stat()[1][0]'),'m')});
test('recusa segunda morte do mesmo aluno',()=>{run('applyEvent(S,makeEvent(2,0,1,0,1))');assert.throws(()=>run('applyEvent(S,makeEvent(2,0,1,0,1))'),/vivo|situação|situa/)});
test('prisão e libertação conservam os totais',()=>{run('applyEvent(S,makeEvent(1,0,1,0,1));applyEvent(S,makeEvent(9,0,1,0,1));');assert.equal(run('calc()[1][1]'),12);assert.equal(run('calc()[0][3]'),0);assert.equal(run('stat()[1][0]'),'v')});
test('recusa libertação pelo captor errado',()=>{run('applyEvent(S,makeEvent(1,0,1,0,1))');assert.throws(()=>run('applyEvent(S,makeEvent(9,2,1,0,1))'),/captor|aprision/)});
test('vida extra exige morto e restaura o aluno',()=>{assert.throws(()=>run('applyEvent(S,makeEvent(3,0,1,0,1))'));run('applyEvent(S,makeEvent(2,0,1,0,1));applyEvent(S,makeEvent(3,0,1,0,1));');assert.equal(run('stat()[1][0]'),'v');assert.equal(run('calc()[1][2]'),0)});
test('saneia nomes e patentes de lances legados sem renomear campos',()=>{run("S.E=[{ty:2,a:0,b:1,da:[0,0,0,0,0],db:[0,-1,1,0,0],rn:'SEGREDO',rf:'CO'}]");assert.equal(run('publicState(S).E[0].rn'),'');assert.equal(run('publicState(S).E[0].rf'),'')});
test('saldo comum literal e CO explicitamente revelado',()=>{run('S.pc=0;applyEvent(S,makeEvent(1,0,1,0,1));');assert.equal(run('tot(calc()[0],0)'),75);assert.equal(run('tot(calc()[1],1)'),60);run("S.rv=[{a:1,k:0,r:'',f:'CO'}]");assert.equal(run('tot(calc()[0],0)'),80);assert.equal(run('tot(calc()[1],1)'),55)});
test('normaliza arrays ausentes do Firebase e mantém legado',()=>{run('S=normalize({nm:def().nm,fase:3})');assert.equal(run('S.E.length'),0);assert.equal(run('S.fase'),3);assert.equal(run('calc()[0][1]'),12)});
test('pelotão sorteia até três distintos e aceita no máximo dois alvos',()=>{run('S.pel=drawPeloton(1)');assert.equal(run('new Set(S.pel.candidates).size'),3);assert.equal(run('S.pel.max'),2);run('S.pel.resolved=S.pel.candidates.slice(0,2)');assert.throws(()=>run('validatePeloton(S.pel.candidates[2])'),/dois|encerr/)});
test('empate não produz vencedor arbitrário',()=>{assert.equal(run('ranking()[0].t'),run('ranking()[1].t'));assert.equal(run('canFinish()'),false)});
test('defesa total identifica o aluno sem mudar sua situação',()=>{run('applyEvent(S,makeEvent(0,0,1,2,1))');assert.equal(run('S.E[0].sb'),2);assert.equal(run('stat()[1][2]'),'v')});
test('cadastro individual aceita tamanho próprio por exército',()=>{run("S.roster=ROS.map(a=>a.slice());S.roster[0]=['ALUNO 1','ALUNO 2']");assert.equal(run('calc()[0][1]'),2)});
test('Firebase omite listas vazias internas do pelotão',()=>{run('S=normalize({pel:{army:1,captor:0,candidates:[0,1,2],max:2,at:1}})');assert.equal(run('S.pel.resolved.length'),0)});
test('desfazer baixa com vida extra dependente é recusado',()=>{run('applyEvent(S,makeEvent(2,0,1,0,1));applyEvent(S,makeEvent(3,0,1,0,1))');assert.throws(()=>run('removeEvent(S,0)'),/depend|situa|morto/)});
test('desfazer alvo do pelotão libera nova escolha',()=>{run("S.pel=drawPeloton(1);S.pel.captor=0;S.E.push({...makeEvent(23,0,1,-1,1,'Sorteio'),peloton:cl(S.pel)});let target=S.pel.candidates[0];let e=makeEvent(22,0,1,target,1);e.pelotonAt=S.pel.at;applyEvent(S,e);S.pel.resolved.push(target);removeEvent(S,1)");assert.equal(run('S.pel.resolved.length'),0)});
test('desfazer recurso devolve sua utilização',()=>{run("S.res[0].r=1;S.E.push({...makeEvent(23,0,-1,-1,1,'Recurso'),resource:'r'});removeEvent(S,0)");assert.equal(run('S.res[0].r'),0)});
(async()=>{
 try{run("S=def();ed=true;loaded=true;busy=false;connected=false; SG=defSG()");await run('mutate(()=>applyEvent(S,makeEvent(2,0,1,0,1)))');assert.equal(run('S.E.length'),0);console.log('PASS operação offline não altera placar');passed++}catch(e){console.log('FAIL operação offline não altera placar -',e.message);failed++}
 try{run("S=def();SG=defSG();ed=true;secretLoaded=true;busy=false;S.rv=[{a:1,k:0,r:'',f:'CO',scope:'rank'}];sref={child:()=>({set:async()=>{}})}");await run("sg(1,0,'r','SEGREDO_NOVO')");assert.equal(run('S.rv[0].r'),'');console.log('PASS editar segredo não amplia revelação da patente');passed++}catch(e){console.log('FAIL editar segredo não amplia revelação da patente -',e.message);failed++}
 console.log(`${passed} passaram; ${failed} falharam`);process.exitCode=failed?1:0;
})();
