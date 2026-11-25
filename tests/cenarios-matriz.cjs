const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const code=html.match(/<script>([\s\S]*?)<\/script>/)[1].split('// INICIALIZACAO')[0];
const ctx=vm.createContext({document:{getElementById:()=>({style:{},classList:{toggle(){}}}),body:{classList:{toggle(){}}}},console,crypto:require('node:crypto').webcrypto,Date,URLSearchParams,location:{search:''},localStorage:{getItem:()=>null},sessionStorage:{getItem:()=>null},setTimeout:()=>0,clearTimeout(){}});
vm.runInContext(code,ctx);const run=s=>vm.runInContext(s,ctx);let failed=0;
function test(name,fn){try{run('S=def();SG=defSG()');fn();console.log('PASS '+name)}catch(e){failed++;console.error('FAIL '+name+': '+e.message)}}
test('C1 defesa total soma 20 e preserva combatente',()=>{run('applyEvent(S,makeEvent(0,0,5,0,1))');assert.equal(run('calc()[5][0]'),20);assert.equal(run('stat()[5][0]'),'v')});
test('C3 ataque parcial dá 10 a cada e prende defensor',()=>{run('applyEvent(S,makeEvent(1,0,5,0,1))');assert.equal(run('calc()[0][0]'),10);assert.equal(run('calc()[5][0]'),10);assert.equal(run('stat()[5][0]'),'p');assert.equal(run('captorOf(5,0)'),0)});
test('C4 erro mata defensor e registra memorial',()=>{run('applyEvent(S,makeEvent(2,0,5,0,1))');assert.equal(run('stat()[5][0]'),'m');assert.equal(run('calc()[5][2]'),1)});
test('C5 duas coletivas por defensor e terceira recusada',()=>{run('applyEvent(S,makeEvent(34,0,5,-1,1));applyEvent(S,makeEvent(35,0,5,-1,1))');assert.equal(run('S.res[5].c'),2);assert.throws(()=>run('applyEvent(S,makeEvent(36,0,5,-1,1))'),/coletiv/)});
test('E1 denúncia correta dá 10 ao denunciante e mata infrator',()=>{run('applyEvent(S,makeEvent(33,0,5,0,1))');assert.equal(run('calc()[0][0]'),10);assert.equal(run('stat()[5][0]'),'m')});
test('E2 denúncia incorreta perde 10',()=>{run('applyEvent(S,makeEvent(12,0,5,-1,1))');assert.equal(run('calc()[0][0]'),-10)});
test('F5 vida extra remove baixa e concede 20 ao rival',()=>{run('applyEvent(S,makeEvent(2,0,5,0,1));applyEvent(S,makeEvent(3,0,5,0,1))');assert.equal(run('stat()[5][0]'),'v');assert.equal(run('calc()[0][0]'),20)});
test('I2 blitz não consome coletiva nem míssil normal',()=>{run('applyEvent(S,makeEvent(37,0,5,-1,1))');assert.equal(run('S.res[5].c'),0);assert.equal(run('S.E.filter(e=>e.atk).length'),0)});
test('J empate impede encerramento automático',()=>{assert.equal(run('ranking()[0].t'),run('ranking()[1].t'));assert.equal(run('canFinish()'),false)});
for(const [id,reason] of Object.entries({F1:'registro do dado ausente',G10:'resultados parciais incompletos',H7:'transferência de ex-prisioneiro ausente',J5:'desempate persistente sem regra',J9:'transferência do arsenal ausente',K1:'eliminação por tribunal ausente',K2:'parâmetros de regras não configuráveis',L1:'fluxo de perguntas especiais incompleto',L2:'registro público de dado, cápsula e carta ausente'}))console.log('SKIP '+id+' — '+reason);
if(failed)process.exitCode=1;
