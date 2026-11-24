// Ajustes da final Preto x Amarelo: nomenclatura, telão sem senha, imagem restrita e revelação.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
function loadUI(){let ui=html.split('// INICIALIZACAO')[1].split('\nmgInit(')[0];ui=ui.replace('  const CSS=','  window.__t={state,loginPage,publicPage,portrait};\n  const CSS=');const window={};vm.runInNewContext(ui,{window,document:{getElementById:()=>null,documentElement:{}},console,setTimeout,Date});return window.__t}
let failed=0;async function test(n,fn){try{await fn();console.log('PASS',n)}catch(e){failed++;console.error('FAIL',n,e.message)}}
(async()=>{
await test('interface usa Senhor da Guerra e Alto Comando, sem rótulos antigos visíveis',()=>{const antigos=html.match(/(?<![A-Za-z_$À-ÿ])(Professor|Mesa)(?![A-Za-z_À-ÿ])|(?<=[ >(])(mesa|mesários?)(?![A-Za-z_À-ÿ'"])|(?<=[ >])professor(?![A-Za-z_À-ÿ'"!])/g)||[];assert.deepEqual(antigos,[]);assert.match(html,/Senhor da Guerra · assento 7/);assert.match(html,/`Alto Comando \$\{i\+1\}/);assert.doesNotMatch(html,/\b(a|A|uma) Alto Comando/)});
await test('ilustração do Senhor Schayder aparece só para o Senhor da Guerra',()=>{const t=loadUI();t.state.entry=null;t.state.view={role:null};assert.doesNotMatch(t.loginPage(),/<img/);for(const entry of ['public','mesa','professor']){t.state.entry=entry;assert.doesNotMatch(t.loginPage(),/<img/,'entrada '+entry)}t.state.view={role:'public',game:{}};assert.doesNotMatch(t.publicPage(),/<img/);for(const role of [null,'public','mesa']){t.state.view={role};assert.equal(t.portrait('x'),'',String(role))}t.state.view={role:'professor',seat:7};assert.match(t.portrait('x'),/<img class="x" src="data:image\/jpeg/);t.state.view={role:null};assert.match(t.loginPage(),/José Pontes Schayder <small>· Senhor da Guerra/)});
await test('código não guarda conta nem senha do Público',()=>{assert.doesNotMatch(html.split('// INICIALIZACAO')[0].match(/const MG_ACCOUNTS=[^;]+;/)[0],/publico/)});
if(failed)process.exitCode=1;
})();
