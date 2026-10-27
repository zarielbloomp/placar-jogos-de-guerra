// Verifica comandos da interface com gravação recusada e o ciclo de divulgação.
// Usa somente armazenamento em memória; não chama Firebase.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const script=fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1].split('// INICIALIZACAO')[0];
function context(reject=true){
 const elements=new Map(),storage=new Map();const el=id=>{if(!elements.has(id))elements.set(id,{value:'',textContent:'',innerHTML:'',style:{},classList:{toggle(){}},appendChild(){}});return elements.get(id)};
 const ctx=vm.createContext({document:{getElementById:el,body:{classList:{toggle(){}}},createElement:()=>el('tmp')},console,setTimeout:()=>0,clearTimeout(){},setInterval:()=>0,clearInterval(){},URLSearchParams,location:{search:'?experimental=1',href:'http://localhost/index.html?experimental=1',origin:'http://localhost',pathname:'/index.html'},localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value)},sessionStorage:{getItem:()=>null,setItem(){}},navigator:{},crypto:require('node:crypto').webcrypto,Date,confirm:()=>true});
 vm.runInContext(script,ctx);vm.runInContext("ed=true;currentRole='admin';loaded=true;secretLoaded=true;S=def();SG=defSG();var statusMessage='';msg=value=>statusMessage=value;Q={q1:questionObject({id:'q1',army:0,phase:1,title:'Questão de teste',text:'Enunciado de teste',expected:'RESPOSTA_RESERVADA',approved:true})};$('labKind').value='normal'",ctx);
 if(reject)vm.runInContext("mutate=async()=>{msg('FALHA_DE_GRAVAÇÃO');return false}",ctx);
 return ctx;
}
const cases=[
 ['publicação recusada mantém aviso de falha',"await presentQuestion('q1')","S.presentation==null&&statusMessage==='FALHA_DE_GRAVAÇÃO'"],
 ['conclusão recusada mantém pergunta pendente',"S.presentation={qid:'q1',army:0,title:'Teste',pending:true,answered:false};await markAnswered()","S.presentation.pending&&!S.presentation.answered&&statusMessage==='FALHA_DE_GRAVAÇÃO'"],
 ['revelação recusada não anuncia gabarito publicado',"S.presentation={qid:'q1',answered:true,answerVisible:false};await revealExpected()","!S.presentation.answerVisible&&!S.presentation.expected&&statusMessage==='FALHA_DE_GRAVAÇÃO'"],
 ['sorteio recusado não anuncia ordem registrada',"await drawAttackOrder()","!S.turn&&statusMessage==='FALHA_DE_GRAVAÇÃO'"],
 ['batalha recusada não anuncia pergunta no telão',"S.turn={phase:1,order:[0],index:0};$('labQuestion').value='q1';$('labDefender').value='1';$('labSoldier').value='0';await startLabBattle()","!S.battle&&statusMessage==='FALHA_DE_GRAVAÇÃO'"],
 ['avanço recusado preserva fase e aviso',"eligibleAttackers=()=>[];await advanceLabPhase()","S.fase===1&&statusMessage==='FALHA_DE_GRAVAÇÃO'"],
 ['exemplo recusado preserva arsenal anterior',"await loadLabExample()","Object.keys(Q).length===1&&Q.q1&&statusMessage==='FALHA_DE_GRAVAÇÃO'"],
];
(async()=>{
 let passed=0,failed=0;
 for(const [name,action,check]of cases){const ctx=context();try{await vm.runInContext('(async()=>{'+action+'})()',ctx);assert.equal(vm.runInContext(check,ctx),true);console.log('PASS',name);passed++}catch(error){console.log('FAIL',name,'-',error.message);failed++}}
 try{const ctx=context(false);await vm.runInContext("(async()=>{await presentQuestion('q1')})()",ctx);assert.equal(vm.runInContext("S.presentation.pending&&!JSON.stringify(publicState(S)).includes('RESPOSTA_RESERVADA')",ctx),true);await vm.runInContext('(async()=>{await markAnswered()})()',ctx);assert.equal(vm.runInContext("S.presentation.answered&&!JSON.stringify(publicState(S)).includes('RESPOSTA_RESERVADA')",ctx),true);await vm.runInContext('(async()=>{await revealExpected()})()',ctx);assert.equal(vm.runInContext("S.presentation.answerVisible&&publicState(S).presentation.expected==='RESPOSTA_RESERVADA'",ctx),true);await vm.runInContext('(async()=>{await hidePresentation()})()',ctx);assert.equal(vm.runInContext("!S.presentation&&!JSON.stringify(publicState(S)).includes('RESPOSTA_RESERVADA')",ctx),true);console.log('PASS pergunta → conclusão → revelação explícita → retirada');passed++}catch(error){console.log('FAIL ciclo completo de apresentação -',error.message);failed++}
 console.log(`${passed} passaram; ${failed} falharam`);process.exitCode=failed?1:0;
})();
