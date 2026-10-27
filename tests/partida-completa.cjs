// Ensaio determinístico do motor: não acessa rede, Firebase ou dados reais.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const script=fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1].split('// INICIALIZACAO')[0];
const elements=new Map();const el=id=>{if(!elements.has(id))elements.set(id,{value:'',textContent:'',innerHTML:'',style:{},classList:{toggle(){}},appendChild(){}});return elements.get(id)};
const ctx=vm.createContext({document:{getElementById:el,body:{classList:{toggle(){}}},createElement:()=>el('tmp')},console,setTimeout:()=>0,clearTimeout(){},setInterval:()=>0,clearInterval(){},URLSearchParams,location:{search:'',href:'http://localhost/index.html',origin:'http://localhost',pathname:'/index.html'},localStorage:{getItem:()=>null,setItem(){}},sessionStorage:{getItem:()=>null,setItem(){}},navigator:{},crypto:require('node:crypto').webcrypto,Date,confirm:()=>true});
vm.runInContext(script,ctx);
assert.throws(()=>vm.runInContext('var invalidPhase=def();invalidPhase.fase=99;validateBackup(invalidPhase)',ctx),/fase/i,'Backup com fase inexistente deve ser recusado');
assert.throws(()=>vm.runInContext("var invalidClock=def();invalidClock.clock={running:true,deadline:'inválido',remaining:90,preset:90};validateBackup(invalidClock)",ctx),/cronômetro/i,'Backup com cronômetro ilegível deve ser recusado');
assert.equal(vm.runInContext('var legacyBackup=def();delete legacyBackup.fase;validateBackup(legacyBackup).fase',ctx),1,'Backup antigo sem fase recebe a etapa inicial');
assert.equal(vm.runInContext('var partialClock=def();partialClock.clock={running:false,remaining:27};validateBackup(partialClock).clock.remaining',ctx),27,'Cronômetro antigo sem metadados novos continua válido');
assert.throws(()=>vm.runInContext("var nestedClock=def();nestedClock.E=[{...makeEvent(0,0,1,0,1),battleSnapshot:{clock:{running:true,deadline:'inválido'}}}];validateBackup(nestedClock)",ctx),/cronômetro/i,'Desfazer não pode restaurar um cronômetro ilegível do arquivo');
assert.throws(()=>vm.runInContext("S=def();S.roster=ROS.map(a=>a.slice());S.roster[1]=['ALUNO ÚNICO'];applyEvent(S,makeEvent(1,0,1,0,1));applyEvent(S,makeEvent(9,0,1,0,1))",ctx),/bandeira|transferência/i,'Não devolver automaticamente prisioneiro à origem sem ativos');
const result=vm.runInContext(`(()=>{
 let battles=0,checkpoints=0,undos=0,resurrections=0;
 const ensure=(condition,message)=>{if(!condition)throw Error(message)};
 for(let seed=1;seed<=40;seed++){
  let randomState=seed;const random=()=>{randomState^=randomState<<13;randomState^=randomState>>>17;randomState^=randomState<<5;return randomState>>>0};
  S=def();S.roster=Array.from({length:6},(_,a)=>Array.from({length:30},(_,k)=>'EXEMPLO '+a+'/'+k));SG=defSG();Q={};
  for(let a=0;a<6;a++)for(let phase=1;phase<=5;phase++)for(let n=0;n<4;n++){const id='seed-'+seed+'-'+a+'-'+phase+'-'+n;Q[id]=questionObject({id,army:a,phase,title:'Questão de ensaio '+id,text:'Relacionar processos históricos.',expected:'GABARITO_RESERVADO_'+id,approved:true})}
  ensure(validateArsenal(Q),'Arsenal inválido');
  const check=()=>{ensure(!hasRosterMismatch(),'Contagens e Memorial divergiram, seed '+seed);ensure(!JSON.stringify(publicState(S)).includes('GABARITO_RESERVADO_'),'Gabarito publicado antes de ação explícita');const statuses=stat();for(let a=0;a<6;a++){ensure(statuses[a].length===30,'Elenco perdeu aluno');ensure(calc()[a].slice(1).every(n=>n>=0),'Contagem negativa');ensure(S.res[a].c<=2,'Mais de duas coletivas');for(let p=1;p<=5;p++)ensure(attacksUsed(a,p)<=4,'Mais de quatro mísseis por fase')}checkpoints++};
  for(let phase=1;phase<=5;phase++){
   S.fase=phase;
   for(let round=0;round<4;round++){
    const offset=random()%6,order=Array.from({length:6},(_,n)=>(n+offset)%6);S.turn={phase,order,index:0,id:'sequence-'+phase+'-'+round};
    for(const a of order){
     ensure(currentAttacker()===a,'Vez de ataque incorreta');const b=(a+1)%6,statuses=stat(),eligible=statuses[b].map((status,k)=>status==='v'&&!rotationPending(b,k).length?k:-1).filter(k=>k>=0);ensure(eligible.length,'Sem aluno elegível no cenário');const k=eligible[random()%eligible.length],q=Q['seed-'+seed+'-'+a+'-'+phase+'-'+round],outcome=['total','parcial','falhou'][random()%3],collective=S.res[b].c<2&&random()%13===0;
     prepareLabBattle(S,q,b,k);ensure(S.presentation.expected===undefined,'Gabarito no enunciado inicial');resolveLabBattle(S,outcome,collective);battles++;check();
     if(random()%9===0){const points=JSON.stringify(calc()),index=S.turn.index;removeEvent(S,S.E.length-1);ensure(S.battle.pending&&S.presentation.pending,'Desfazer não reabriu batalha');ensure(S.turn.index===index-1,'Desfazer não devolveu a vez');ensure(!S.presentation.answerVisible,'Desfazer manteve gabarito');resolveLabBattle(S,outcome,collective);ensure(JSON.stringify(calc())===points,'Refazer alterou pontuação');undos++;check()}
     if(outcome==='falhou'&&!collective&&random()%5===0){applyEvent(S,makeEvent(3,a,b,k,phase,'Vida extra no ensaio'));ensure(stat()[b][k]==='v','Vida extra não reviveu');resurrections++;check()}
    }
    ensure(currentAttacker()===-1,'Sequência não terminou');
   }
   for(let a=0;a<6;a++)ensure(attacksUsed(a,phase)===4,'Fase terminou sem os quatro ataques');
  }
  ensure(S.E.filter(e=>e.atk).length===120,'Partida não tem 120 ataques normais');
  const bundle=validateLabBundle({schema:'jg-laboratorio-v2',state:publicState(S),questions:Q});ensure(JSON.stringify(calc(bundle.state))===JSON.stringify(calc()),'Backup mudou pontuação');ensure(JSON.stringify(stat(bundle.state))===JSON.stringify(stat()),'Backup mudou Memorial');ensure(Object.keys(bundle.questions).length===120,'Backup perdeu perguntas');
  const before=JSON.stringify(S.E);try{applyEvent(S,makeEvent(2,0,1,stat()[1].findIndex(q=>q==='v'),5));throw Error('Quinto míssil aceito')}catch(error){ensure(/quatro/.test(error.message),'Falha inesperada no quinto míssil: '+error.message)}ensure(JSON.stringify(S.E)===before,'Rejeição alterou histórico');
  resetMatch(S);ensure(S.E.length===0&&!S.presentation&&!S.battle&&!S.turn&&!S.clock,'Reinício deixou efeitos anteriores');ensure(names(0).length===30&&Object.keys(Q).length===120,'Reinício apagou cadastro ou arsenal');check();
 }
 return {partidas:40,fases:200,batalhas:battles,conferencias:checkpoints,desfazerRefazer:undos,vidasExtras:resurrections};
})()`,ctx,{timeout:120000});
assert.equal(result.batalhas,4800);assert(result.desfazerRefazer>0);assert(result.vidasExtras>0);console.log('PASS partidas completas:',JSON.stringify(result));
