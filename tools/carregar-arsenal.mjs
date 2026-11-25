import fs from 'node:fs';

const phases=['1/Construção da Guerra','2/Avanço do Eixo','3/Refluxo','4/Avanço aliado','5/Saldos/Pós-guerra'];
function convert(data){
  const bank={};
  for(const [color,army,start] of [['preto',0,1],['amarelo',5,33]]){
    const items=data?.[color];if(!Array.isArray(items)||items.length!==32)throw Error(`${color}: são necessárias 32 perguntas`);
    const numbers=new Set();const counts=[0,0,0,0,0];let blitz=0,bomba=0;
    for(const q of items){
      if(q?.cor!==color||!Number.isInteger(q.n)||q.n<start||q.n>start+31||numbers.has(q.n))throw Error(`${color}: cor ou numeração inválida`);
      numbers.add(q.n);
      for(const k of ['fase','pergunta','padrao','fonte'])if(typeof q[k]!=='string'||!q[k].trim())throw Error(`${color} ${q.n}: ${k} vazio`);
      const special=q.n-start===30?'blitz':q.n-start===31?'bomba':null;
      let phase,category='normal';
      if(special){
        const expected=special==='blitz'?/^OPERAÇÃO\s+BLITZKRIEG\b/i:/^HOMEM[ -]BOMBA\b/i;
        const allowed=special==='blitz'?'Blitzkrieg':'Homem Bomba';
        if(!expected.test(q.pergunta.trim())||![allowed,phases[4]].includes(q.fase))throw Error(`${color} ${q.n}: identificação especial inválida`);
        if(special==='blitz')blitz++;else bomba++;phase=5;category='especial';
      }else{phase=phases.indexOf(q.fase)+1;if(!phase)throw Error(`${color} ${q.n}: fase inválida`);counts[phase-1]++}
      const id=`missil-${q.n}`;
      const item={id,army,phase,title:`Míssil ${q.n}`,text:q.pergunta.trim(),expected:q.padrao.trim(),source:q.fonte.trim(),approved:false,category,rev:1};
      if(item.title.length>120||item.text.length>4000||item.expected.length>4000||item.source.length>500)throw Error(`${color} ${q.n}: campo excede os limites do site`);
      bank[id]=item;
    }
    if(counts.some(n=>n!==6)||blitz!==1||bomba!==1)throw Error(`${color}: são necessárias seis perguntas por fase e duas especiais`);
  }
  return bank;
}
try{
  const [input,mode,output,...extra]=process.argv.slice(2);
  if(!input||!['--validar','--saida'].includes(mode)||extra.length||(mode==='--validar'&&output)||(mode==='--saida'&&!output))throw Error('Uso: node tools/carregar-arsenal.mjs entrada.json --validar | --saida arquivo.json');
  const bank=convert(JSON.parse(fs.readFileSync(input,'utf8')));
  if(mode==='--saida')fs.writeFileSync(output,JSON.stringify(bank,null,2)+'\n',{flag:'wx'});
  console.log('Dados válidos: 64 perguntas preservadas. ATENÇÃO: o site aceita apenas quatro perguntas normais por exército e fase; esta saída com seis não passa na validação do site e não deve ser carregada até resolver a incompatibilidade.');
}catch(e){console.error(e.message);process.exitCode=1}
