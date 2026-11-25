Objetivo final, conforme redistribuição de Claude/Murilo: entregar somente A01, A02 e A04 do relatório Astra nesta cópia feat/conselho-sigilo, até 03:45 de 25/11/2026.
Escopo: somente placar-conselho, index.html sem build e testes offline, preservando o histórico até 0189ca5; nada na fila, na integração, em dados privados ou no Firebase real. Pesquisa, plateia, telão, FX e regras do banco ficam com outras frentes.
Critério de pronto: terceira coletiva recusada antes de abrir; cápsulas vinculadas a morte individual elegível com consumo único; deadline de 45 s preservado ao marcar resposta da Blitz; marcação idempotente; extensão somente explícita e justificada; suíte de cinco rodadas verde fora do Git.
Verificação: regressões reproduzidas antes da correção, suítes existentes, relógio falso com offset e CAS em memória, revisão independente e commits locais limpos.

Motor:
- A cota das duas coletivas é conferida antes de criar batalha/relógio, e a opção esgotada sai do formulário do defensor.
- Tipos 3–6 usam origin para identificar a baixa individual normal (tipo 2) da mesma fase e dos mesmos exércitos. Recusam mortes definitivas, baixa já substituída e cápsula já utilizada. O vínculo também protege desfazer com dependências.
- Revisão da segunda coletiva continua substituindo seu resultado sem consumir terceira cota. Registros antigos sem origin continuam legíveis; a validação de replay infere a baixa e considera consumo legado.

A04:
- A Blitz guarda seu deadline ao abrir. Marcar início não altera o relógio (inclusive pausado ou já expirado), e replyStarted impede reiniciar o prazo em chamadas repetidas.
- Ataque normal continua passando de 30 s de preparação a 90 s na primeira marcação; chamadas seguintes preservam o deadline e o instante original de início.
- Reset, aumento de preset ou retomada que ultrapassem o limite da Blitz exigem justificativa explícita de até 500 caracteres. Ajustes ficam no histórico privado da batalha; a projeção pública não leva a justificativa.
- O formulário do relógio apresenta o campo de justificativa só durante Blitz pendente. A marcação da Blitz agora informa que mantém os 45 s. Nenhuma mudança no layout da pesquisa, da plateia ou do telão.
- Seis regressões em tests/blitz-prazo.cjs: marcação após 30 s com offset; repetição/expiração; relógio pausado; extensão sem justificativa; extensão justificada sem vazamento na projeção; prazo normal de 30/90 s.

Coordenação e limites:
- A01/A02 estão no commit 094ed18, com seis regressões e revisão independente do motor aprovada (9/10). A04 tem suíte própria registrada no simulador e workflow.
- Todo o diff não commitado de moderação/som/rodapé/classificação/FX/regras foi descartado por ordem do coordenador para não duplicar a integração. Não há esses ajustes nesta entrega.
- A03 foi informado como resolvido em 0821f72 na integração. A07 permanece com o desenvolvedor da plateia. Não alterei essas frentes.
- A05 e A13 continuam limites de segurança: membros autorizados ainda podem receber segredo bruto, e o esquema público não garante rejeição de todos os campos extras. Máscara de tela e projeção do cliente não constituem sigilo de permissão. Nenhuma publicação real ou teste de login foi feito.
- Relatório de referência: Orquestrador-IA/saidas/jogos-de-guerra/10-revisao-codex-astra.md. As linhas auditadas eram de outra branch; correções foram feitas sobre as funções desta cópia.

Resultado final:
- `node tests/simular-cenarios.cjs 5` concluiu 120 execuções (24 suítes × 5), zero falhas, em cópia temporária fora do repositório. Incluiu 250 partidas e 26.000 batalhas simuladas.
- Relatório: `Orquestrador-IA/saidas/jogos-de-guerra/capturas/conselho-sol/resultado-final-a01-a02-a04.json`. SHA-256 do HTML conferido com o arquivo desta branch.
- Revisão independente de A04: sem impedimento; testes Blitz/cronômetro/mecanismo/controller e desfazer conferidos, nota 9,2/10.
- Playwright headless com rede externa bloqueada: formulário mantém deadline após marcação/repetição, recusa reset sem justificativa, transmite a justificativa do campo e preserva reflow em 390 px. Captura `conselho-sol/blitz-390.png`.
- Fora do Git: relatórios de simulação, capturas e rascunhos descartados da frente duplicada. Entrega com commits locais, sem push ou PR; coordenadores recebem o HEAD final por Maestri.
