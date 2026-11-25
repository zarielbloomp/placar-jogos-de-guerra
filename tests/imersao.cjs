// Imersão do telão: bloco isolado, desligável por ?fx=0, sem HTML vindo do banco e sem flashes rápidos.
const fs=require('node:fs'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const js=html.match(/<script id="fx-imersao-js">([\s\S]*?)<\/script>/)[1],css=html.match(/<style id="fx-imersao">([\s\S]*?)<\/style>/)[1];
const codigo=js.replace(/\/\*[\s\S]*?\*\//g,'');
let failed=0;function test(n,fn){try{fn();console.log('PASS',n)}catch(e){failed++;console.error('FAIL',n,e.message)}}
test('?fx=0 encerra o script na primeira linha e o CSS só vale com html.fx-imersao',()=>{assert.match(codigo,/get\('fx'\)==='0'[^;]*\)return;/);for(const regra of css.replace(/\/\*[\s\S]*?\*\//g,'').split('}').map(r=>r.split('{')[0].trim()).filter(r=>r&&!r.startsWith('@')&&!/^(from|to|\d)/.test(r)))assert.match(regra,/fx-imersao|#fxAtmos|\.fx-citacao|data-mg-motion/,regra)});
test('não usa innerHTML, insertAdjacentHTML, eval nem lê ou grava o Firebase',()=>{for(const p of ['innerHTML','outerHTML','insertAdjacentHTML','document.write','eval(','new Function','firebase','.ref(','fetch('])assert.ok(!codigo.includes(p),p)});
test('citações são fixas por fase e entram por textContent',()=>{assert.match(codigo,/p\.textContent='“'\+c\[0\]\+'”'/);assert.match(codigo,/s\.textContent=c\[1\]/);const fases=[...codigo.matchAll(/(\d):\['/g)].map(m=>m[1]);assert.deepEqual(fases,['1','2','3','4','5'])});
test('clarão da atmosfera: intervalo mínimo de 9 s e opacidade até 0,12 (bem abaixo de 3 flashes/s)',()=>{assert.match(codigo,/t\+9000\+Math\.random\(\)\*14000/);assert.match(codigo,/0\.12\*A\.clarao/);assert.ok(!/#fff(fff)?\b/i.test(codigo))});
test('atmosfera leve e sem vazamento: 640x360, 30 FPS, 36 partículas criadas uma vez, cancela o quadro ao desligar',()=>{assert.match(codigo,/cv\.width=640;cv\.height=360/);assert.match(codigo,/\(\+\+A\.quadro&1\)/);assert.match(codigo,/if\(!A\.p\.length\)for\(let i=0;i<36;i\+\+\)/);assert.match(codigo,/cancelAnimationFrame\(A\.raf\)/);assert.match(codigo,/document\.hidden/)});
test('redução de movimento desliga atmosfera, animação de liderança e trilha',()=>{assert.match(codigo,/if\(reduz\(\)\)atmosDesligar\(\)/);assert.match(codigo,/!reduz\(\)&&!document\.hidden/);assert.match(css,/prefers-reduced-motion:reduce\)\{#fxAtmos\{display:none\}/)});
test('trilha só toca depois de Ativar som e reaproveita os mesmos nós',()=>{assert.match(codigo,/s\.on&&!!ctx/);assert.match(codigo,/if\(quer&&!D\.g\)/);assert.match(codigo,/setTargetAtTime\(quer\?0\.03:0\.0001/)});
test('pergunta legível: começa grande e só reduz até caber acima da barra da plateia',()=>{assert.match(codigo,/Math\.min\(60,Math\.max\(32,/);assert.match(codigo,/getElementById\('jgpBarra'\)/);assert.match(codigo,/px>24&&q\.getBoundingClientRect\(\)\.bottom>limite\(\)/);assert.ok(!/expected/.test(codigo),'nunca toca no padrão de resposta')});
if(failed)process.exitCode=1;
