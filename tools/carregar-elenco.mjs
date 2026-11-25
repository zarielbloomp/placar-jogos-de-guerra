import fs from 'node:fs';

function gerar(data) {
  if (!Array.isArray(data?.exercitos) || data.exercitos.length !== 2) throw Error('Informe dois exércitos.');
  const sorted = ['preto','amarelo'].map(cor => {
    const found = data.exercitos.filter(e => e?.cor === cor);
    if (found.length !== 1) throw Error('Informe exatamente Preto e Amarelo.');
    const e = found[0];
    if (typeof e.nome !== 'string' || !e.nome.trim() || !Array.isArray(e.soldados) || e.soldados.length !== 12) throw Error(`${cor}: informe nome e 12 soldados.`);
    for (const key of ['co','sub','hb']) {
      if (e.soldados.some(s => typeof s?.[key] !== 'boolean') || e.soldados.filter(s => s[key]).length !== 1) throw Error(`${cor}: deve haver exatamente um ${key.toUpperCase()}.`);
    }
    if (e.soldados.some(s => s.co && s.sub)) throw Error(`${cor}: CO e SUB devem ser pessoas diferentes.`);
    if (e.soldados.some(s => typeof s.codinome !== 'string' || !s.codinome.trim() || s.codinome.trim().length > 100 || typeof s.real !== 'string')) throw Error(`${cor}: codinome ou nome real inválido.`);
    const names = e.soldados.map(s => s.codinome.trim().toLocaleLowerCase());
    if (new Set(names).size !== names.length) throw Error(`${cor}: codinomes repetidos.`);
    return e;
  });
  const allNames=sorted.flatMap(e=>e.soldados.map(s=>s.codinome.trim().toLocaleLowerCase()));
  if (new Set(allNames).size !== allNames.length) throw Error('Codinomes repetidos entre exércitos.');
  const partida={nm:['Preto','Verde','Branco','Vermelho','Azul','Amarelo'],un:['Preto','','','','','Amarelo'],rv:[],n:2,E:[],res:Array.from({length:6},()=>({r:0,c:0,d:0,h:0,co:0,sub:0})),adj:[0,0,0,0,0,0],fase:1,pc:0,revision:0,individual:1,schemaVersion:3,activeArmies:[0,5],people:{},roster:Array.from({length:6},()=>[]),reviews:[0,0,0,0,0,0],phaseClosed:null};
  const elenco={};
  sorted.forEach((e,i)=>{const army=i?5:0;partida.un[army]=e.nome.trim();partida.roster[army]=e.soldados.map(s=>s.codinome.trim());elenco[army]=Object.fromEntries(e.soldados.map((s,k)=>[k,{r:s.real.trim(),f:s.co?'CO':s.sub?'SUB':'PAR'}]));partida.people[army]=elenco[army]});
  return {partida,elenco};
}
try {
  const [input,mode,output,...extra]=process.argv.slice(2);
  if (!input || !['--validar','--saida'].includes(mode) || extra.length || (mode==='--validar' && output) || (mode==='--saida' && !output)) throw Error('Uso: node tools/carregar-elenco.mjs entrada.json --validar | --saida arquivo.json');
  const result=gerar(JSON.parse(fs.readFileSync(input,'utf8')));
  if(mode==='--saida'){fs.writeFileSync(output,JSON.stringify(result,null,2)+'\n',{flag:'wx'});console.log('Arquivo gerado. O site não possui campo para identificar o homem-bomba; essa informação não foi incluída.');}
  else console.log('Elenco válido. O site não possui campo para identificar o homem-bomba.');
} catch(e) { console.error(e.message);process.exitCode=1; }
