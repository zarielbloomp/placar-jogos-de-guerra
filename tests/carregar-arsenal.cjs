const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),assert=require('node:assert/strict'),{spawnSync}=require('node:child_process');
const sample=JSON.parse(fs.readFileSync('tests/fixtures/perguntas-exemplo.json','utf8'));
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'jg-arsenal-'));
try{
 function call(data,mode='--validar'){let input=path.join(tmp,'entrada.json'),output=path.join(tmp,'saida.json');fs.writeFileSync(input,JSON.stringify(data));return spawnSync(process.execPath,['tools/carregar-arsenal.mjs',input,mode,...(mode==='--saida'?[output]:[])],{encoding:'utf8'})}
 let r=call(sample,'--saida');assert.equal(r.status,0,r.stderr);assert.match(r.stdout,/não passa na validação/);const out=JSON.parse(fs.readFileSync(path.join(tmp,'saida.json'),'utf8'));assert.equal(Object.keys(out).length,64);assert.equal(out['missil-31'].category,'especial');assert.equal(out['missil-64'].army,5);assert.equal(out['missil-1'].expected,sample.preto[0].padrao);assert.equal(out['missil-1'].rev,1);assert.equal(out['missil-1'].approved,false);
 let legacy=structuredClone(sample);legacy.preto[30].fase=legacy.preto[31].fase='5/Saldos/Pós-guerra';assert.equal(call(legacy).status,0);
 for(const mutate of [x=>x.preto.pop(),x=>x.preto[0].n=2,x=>x.amarelo[0].cor='preto',x=>x.preto[0].pergunta=' ',x=>x.preto[0].fase='2/Avanço do Eixo',x=>x.preto[30].pergunta='pergunta comum',x=>x.preto[31].fase='Blitzkrieg']){let data=structuredClone(sample);mutate(data);assert.notEqual(call(data).status,0)}
 assert.notEqual(call(sample,'--saida').status,0);console.log('PASS arsenal: 64 itens, dados preservados, incompatibilidade e entradas inválidas');
}finally{fs.rmSync(tmp,{recursive:true,force:true})}
// A estrutura individual passa pelo validador do site; o conjunto integral evidencia o limite.
{
 const vm=require('node:vm'),html=fs.readFileSync('index.html','utf8'),code=html.match(/<script>([\s\S]*?)<\/script>/)[1].split('// INICIALIZACAO')[0];
 const ctx=vm.createContext({document:{getElementById:()=>({style:{},classList:{toggle(){}}}),body:{classList:{toggle(){}}}},console,crypto:require('node:crypto').webcrypto,Date,URLSearchParams,location:{search:''},localStorage:{getItem:()=>null},sessionStorage:{getItem:()=>null},setTimeout:()=>0,clearTimeout(){}});vm.runInContext(code,ctx);
 const input=path.join(os.tmpdir(),`jg-arsenal-source-${process.pid}.json`),output=path.join(os.tmpdir(),`jg-arsenal-result-${process.pid}.json`);
 try{fs.writeFileSync(input,JSON.stringify(sample));let r=spawnSync(process.execPath,['tools/carregar-arsenal.mjs',input,'--saida',output],{encoding:'utf8'});assert.equal(r.status,0,r.stderr);ctx.bank=JSON.parse(fs.readFileSync(output,'utf8'));assert.equal(vm.runInContext('Object.values(bank).every(q=>JSON.stringify(questionObject(q))===JSON.stringify(q))',ctx),true);assert.throws(()=>vm.runInContext('validateArsenal(bank)',ctx),/quatro/);console.log('PASS campos aceitos pelo site; banco completo recusado pelo limite de quatro');}finally{fs.rmSync(input,{force:true});fs.rmSync(output,{force:true})}
}
