// Ajustes da final Preto x Amarelo: nomenclatura, telão sem senha, imagem restrita e revelação.
const fs=require('node:fs'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
let failed=0;async function test(n,fn){try{await fn();console.log('PASS',n)}catch(e){failed++;console.error('FAIL',n,e.message)}}
(async()=>{
await test('interface usa Senhor da Guerra e Alto Comando, sem rótulos antigos visíveis',()=>{const antigos=html.match(/(?<![A-Za-z_$À-ÿ])(Professor|Mesa)(?![A-Za-z_À-ÿ])|(?<=[ >(])(mesa|mesários?)(?![A-Za-z_À-ÿ'"])|(?<=[ >])professor(?![A-Za-z_À-ÿ'"!])/g)||[];assert.deepEqual(antigos,[]);assert.match(html,/Senhor da Guerra · assento 7/);assert.match(html,/`Alto Comando \$\{i\+1\}/);assert.doesNotMatch(html,/\b(a|A|uma) Alto Comando/)});
if(failed)process.exitCode=1;
})();
