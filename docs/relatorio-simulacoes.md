# Relatório de simulações e autenticação

Validação em27/10/2026, antes da publicação das preferências pessoais e créditos. Apenas dados fictícios nas simulações. Conferência real do Firebase limitada a login e leitura, sem alterar partida, regras ou credenciais.

## Resultado

| Item | Conferência |
|---|---:|
| Suítes automatizadas | 12 |
| Repetições de cada suíte | 5 |
| Execuções de suítes | 60 |
| Falhas | 0 |
| Partidas simuladas | 250 |
| Batalhas simuladas | 26000 |
| Combinações de seis votos | 3645 |
| Casos de empate entre essas combinações | 750 |
| Reapuração/revisão no formato oficial | 200 |
| Conferências de projeção pública no formato oficial | 6000 |
| Combinações de preferências por perfil | 6000 |
| Desfazer/refazer na compatibilidade | 2688 |
| Vidas extras na compatibilidade | 1510 |

São200partidas de compatibilidade (24.000batalhas) e50no formato oficial Preto/Amarelo (2.000batalhas). As sementes variaram entre as rodadas. A métrica fases no JSON refere-se à simulação de compatibilidade. As partidas oficiais percorrem cinco fases cada.

## Cenários cobertos

- Regras e recursos: defesa total/parcial/falha, coletiva, quatro mísseis, rodízio, prisão, morte, libertação, vida extra, cartas/pelotão e situações especiais cobertas nas suítes.
- Conselho: todas as729combinações dos seis votos em cada rodada; maioria, empate duplo/triplo e Professor restrito às categorias empatadas. Voto próprio, imutável, por assento.
- Revisões: mesma cota de duas, revisão da revisão, substituição do resultado, recursos sem duplicação, bloqueio quando há acontecimentos dependentes.
- Fases, anúncio e placar: conservação do histórico, bloqueio de atividade aberta, anúncio derivado do resultado, expiração e retirada, totais privados e divulgação explícita.
- Sigilo e falhas: gabarito e identidade não revelada fora da projeção pública; erro de gravação, conflito, offline, retomada e exclusão protegida.
- Acessibilidade: foco, Tab/Shift+Tab, Escape, avisos sem repetição, isolamento do localStorage, JSON inválido, armazenamento bloqueado, restaurar padrão e matriz de opções por perfil.

## Autenticação real e perfis

Oito contas verificadas em cada uma de cinco rodadas:40logins válidos. Em cada rodada, sete contas de operação leram a revisão privada, o Público recebeu recusa ao segredo, a leitura privada sem login foi recusada e a projeção pública continuou legível:50conferências de leitura. Falhas:0. O relatório público contém só aliases, códigos de resposta e sucesso; nenhuma senha, e-mail, UID ou token.

A interface exige login e confere se a conta corresponde ao assento. Mesa1-6 e Professor têm contas próprias; Público usa a conta compartilhada definida para o evento. A partida e os dados operacionais são compartilhados por Mesa/Professor conforme as permissões já autorizadas. Preferências são locais ao navegador/perfil, não dados privados de uma partida individual. `jg/estado` continua público por desenho; `jg/segredo` exige conta autorizada. Nenhuma permissão foi ampliada ou alterada nesta entrega. Bloqueios de escrita foram conferidos em simulação, sem tentar gravação do Público no banco real.

## Conferência visual

Reflow a200% com contraste escuro, leitura espaçada e áreas maiores: cinco repetições em320,390,768,1280e1920px, total25conferências sem excesso horizontal do documento e sem gabarito na visão pública. O cronômetro foi reorganizado para continuar inteiro. Mesa1com150%/contraste claro e Mesa2com200%/escuro mantiveram preferências distintas; outra aba do Público não mudou quando a Mesa foi ajustada.

As opções também respeitam o modo do sistema de reduzir movimento e a navegação do modal por teclado. Não se declara teste físico com todos os dispositivos ou leitores de tela.

## Como reproduzir e limites

Execute `node tests/simular-cenarios.cjs 5`. As12suítes executam cinco vezes. Casos gerados têm sementes diferentes. O comando não usa rede nem Firebase. Resultados: `output/simulacoes/resultado-cenarios.json`; autenticação somente-leitura: `output/simulacoes/autenticacao-leitura.json`; reflow: `output/simulacoes/reflow-preferencias.json`.

Isso cobre todos os cenários automatizados definidos, não toda sequência possível de um jogo, de cartas físicas, de arbitragem humana ou de falha de rede. O sorteio físico e as decisões ambíguas do manual ainda exigem Professor/Mesa. Login/leitura foram testes reais; demais ações foram simulações. Não foram apagados cadastros reais nem reiniciada a partida.

SHA256 do HTML validado: `ca90823d9a9c520bb6a16351b623c75145b175985b4fde2ba37a6aa0637d29c9`.
