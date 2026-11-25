Objetivo: localizar perguntas rapidamente no Senhor da Guerra e conferir informação digitada no Alto Comando.
Contexto: index.html único; professor administra, mesa vota; dados fictícios em ?ensaio=1.
Restrições: somente feat/pesquisa nesta cópia; sem push, PR, Firebase real ou preenchimento automático do Google.
Método: bloco PESQUISA isolado, DOM seguro, pontos mínimos no render e staffPage; revisão independente.
Entrega: commits pequenos, testes registrados no CI, suíte cinco vezes em cópia externa e capturas 390/1366 px.
Pronto: busca por número/enunciado/fase/exército/categoria, teclado, isolamento dos perfis e URL escapada comprovados.

Integração para o merge:
- Implementação no bloco `/* ==== PESQUISA ==== */` até `/* ==== /PESQUISA ==== */`, antes de `const CSS` no módulo de UI.
- `render()` chama `window.JGPesquisa.atualizar(el)` depois de restaurar detalhes e antes de restaurar foco.
- `staffPage()` encaminha mesa para `window.JGPesquisa.conselho()`, uma tela com a pergunta publicada, seu padrão e a votação, sem arsenal futuro.
- Ao integrar `feat/conselho-sigilo`, usar o layout enxuto daquela branch e, depois de renderizar a pergunta atual e o padrão, chamar `window.JGPesquisa.montarVerificador(contêiner)` num contêiner exclusivo. Conservar `atualizar()` para os operadores; retirar o encaminhamento provisório de `staffPage()` somente depois de ligar a caixa na nova votação.
- O verificador recusa papéis diferentes de mesa e rotas `?telao=1`/`?plateia=1`. Se o layout mantiver `#jgVerificadorHost`, `atualizar()` monta/reanexa a caixa automaticamente. O atalho G continua no bloco.
- Busca dos operadores substitui a consulta do Arsenal em Analisar/Preparar; a edição continua no formulário original, com ações delegadas existentes. O número é o campo `number`, `missile` ou `numero`, com posição na lista como fallback para dados legados.

Validação local (sem Firebase):
- `node tests/pesquisa.cjs` está no simulador e no CI; sete cenários com assertivas de filtro, destaque, perfis, Google e isolamento.
- `tests/pesquisa-browser.cjs` usa Playwright e Chromium já instalados: definir `JG_PLAYWRIGHT` (módulo), `JG_CHROMIUM` (executável opcional), `JG_CAPTURES` (diretório fora do Git). Rodar `node tests/pesquisa-browser.cjs`. Não instala programas; navega só em arquivo local com `?ensaio=1` e bloqueia HTTP/HTTPS.
- Playwright verificou 64 perguntas fictícias, DOM seguro, teclado, foco e pergunta aberta após atualização, edição, perfis, rotas públicas e reflow 320/390/1366 px. Seis capturas em `Orquestrador-IA/saidas/jogos-de-guerra/capturas/pesquisa/`.
- Revisão independente: ações Editar/Excluir e preservação de foco corrigidas; segunda revisão sem impedimentos, nota 9,1/10.
- Suíte completa deve rodar numa cópia temporária com `index.html`, `database.rules.json` e `tests/`; o arquivo de regras é necessário para os testes offline de permissões. Nenhum output é commitado.
- Risco de integração: reconciliar apenas os dois pontos de contato acima com a branch que enxuga o Conselho. Permissões reais e sessões Firebase não foram exercitadas.

Resultado final: `node tests/simular-cenarios.cjs 5` concluiu 105 execu??es, zero falhas (21 su?tes, cinco rodadas), com 250 partidas e 26.000 batalhas simuladas. Relat?rio em `Orquestrador-IA/saidas/jogos-de-guerra/capturas/pesquisa/resultado-cenarios.json`.
