// Camada de apresentação do telão: isolada, só leitura, desligável e acessível.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8'),css=(html.match(/<style id="fx-telao">([\s\S]*?)<\/style>/)||[])[1]||'',js=(html.match(/<script id="fx-telao">([\s\S]*?)<\/script>/)||[])[1]||'';
let failed=0;function test(n,fn){try{fn();console.log('PASS',n)}catch(e){failed++;console.error('FAIL',n,e.message)}}
test('bloco fx existe fora do script principal e compila',()=>{assert(css.length>1000&&js.length>1000);new Function(js);assert(html.indexOf('<script id="fx-telao">')>html.indexOf('\nmgInit('))});
test('não grava no Firebase nem chama ações do jogo',()=>{for(const proibido of ['mgAction(','.set(','.update(','transaction(','firebase.','.ref(','localStorage.setItem','sessionStorage.setItem'])assert(!js.includes(proibido),proibido)});
test('?fx=0 desliga e só age na visão pública',()=>{assert.match(js,/get\('fx'\)==='0'/);assert.match(js,/role==='public'/)});
test('respeita redução de movimento e não usa flash de tela cheia',()=>{assert.match(js,/mgMotion==='reduce'/);assert.match(js,/prefers-reduced-motion/);assert.match(css,/html\[data-fx-reduce\][^{]*\{animation:none!important\}/);assert(!/animation:[^;}]*infinite/.test(css.replace(/html\.fx-crit[^}]*\}/,'')),'só o relógio crítico repete (1 por segundo)');assert(!/background:#fff(fff)?[;!}]/i.test(css),'sem fundo branco')});
test('som só depois do botão Ativar som',()=>{assert.match(js,/on:false/);assert.match(js,/Ativar som/)});
test('gancho da plateia aceita só a lista fechada de reações',()=>{const ctx={window:{},document:{documentElement:{dataset:{}}},location:{search:''},URLSearchParams};ctx.window.mgRenderUI=null;vm.runInNewContext(js,ctx);for(const e of ['fogo','palmas','coracao','choque','bomba','caveira','bandeira','susto','riso','medalha'])assert.match(js,new RegExp(e+":'"));assert.match(js,/if\(!window\.JGPlateia\)window\.JGPlateia=\{onReacao:/);assert.doesNotMatch(js,/Object\.assign\(window\.JGPlateia/,'não pode escrever no objeto congelado da plateia')});
if(failed)process.exitCode=1;
