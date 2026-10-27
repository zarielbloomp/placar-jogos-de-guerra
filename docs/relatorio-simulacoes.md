# Relatório de simulações e autenticação

Validação em 27/10/2026 das preferências, créditos, apresentação, cronômetro e votação ao vivo. As simulações automatizadas usam dados fictícios e não acessam o Firebase. O cadastro aditivo dos exemplos solicitados e a conferência do cronômetro oficial são registrados no PR da entrega; não fazem parte das métricas de simulação abaixo.

## Resultado

| Item | Conferência |
|---|---:|
| Suítes automatizadas | 17 |
| Repetições de cada suíte | 5 |
| Execuções de suítes | 85 |
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

São 200 partidas de compatibilidade (24.000 batalhas) e 50 no formato oficial Preto/Amarelo (2.000 batalhas). As sementes variaram entre as rodadas. A métrica fases no JSON refere-se à simulação de compatibilidade. As partidas oficiais percorrem cinco fases cada.

## Cenários cobertos

- Regras e recursos: defesa total/parcial/falha, coletiva, quatro mísseis, rodízio, prisão, morte, libertação, vida extra, cartas/pelotão e situações especiais cobertas nas suítes.
- Conselho: todas as 729 combinações dos seis votos em cada rodada; maioria, empate duplo/triplo e Professor restrito às categorias empatadas. Voto próprio, imutável, por assento.
- Revisões: mesma cota de duas, revisão da revisão, substituição do resultado, recursos sem duplicação, bloqueio quando há acontecimentos dependentes.
- Fases, anúncio e placar: conservação do histórico, bloqueio de atividade aberta, anúncio derivado do resultado, expiração e retirada, totais privados e divulgação explícita.
- Sigilo e falhas: gabarito e identidade não revelada fora da projeção pública; erro de gravação, conflito, offline, retomada e exclusão protegida.
- Acessibilidade: foco, Tab/Shift+Tab, Escape, avisos sem repetição, isolamento do localStorage, JSON inválido, armazenamento bloqueado, restaurar padrão, persistência da herança no primeiro acesso e matriz de opções por perfil.

## Autenticação real e perfis

Na conferência anterior de autenticação, oito contas foram verificadas em cada uma de cinco rodadas: 40 logins válidos. Em cada rodada, sete contas de operação leram a revisão privada, o Público recebeu recusa ao segredo, a leitura privada sem login foi recusada e a projeção pública continuou legível: 50 conferências de leitura. Falhas: 0. O relatório público contém só aliases, códigos de resposta e sucesso; nenhuma senha, e-mail, UID ou token.

A interface exige login e confere se a conta corresponde ao assento. Mesa 1–6 e Professor têm contas próprias; Público usa a conta compartilhada definida para o evento. A partida e os dados operacionais são compartilhados por Mesa/Professor conforme as permissões já autorizadas. Preferências são locais ao navegador/perfil, não dados privados de uma partida individual. `jg/estado` continua público por desenho; `jg/segredo` exige conta autorizada. Nenhuma permissão foi ampliada ou alterada nesta entrega. Bloqueios de escrita foram conferidos em simulação, sem tentar gravação do Público no banco real.

## Conferência visual

Reflow a 200% com contraste escuro, leitura espaçada e áreas maiores: cinco repetições em 320, 390, 768, 1280 e 1920 px, total 25 conferências sem excesso horizontal do documento e sem gabarito na visão pública. O cronômetro e os recursos dos exércitos foram reorganizados para continuar dentro da tela. Campos móveis acompanham a escala: 32 px em 200%. Mesa 1 com 150%/contraste claro e Mesa 2 com 200%/escuro mantiveram preferências distintas; outra aba do Público não mudou quando a Mesa foi ajustada.

A revisão identificou uma lacuna na herança inicial de preferências. Um teste reproduziu a falha antes da correção e passou depois: visitante em 130% → primeiro acesso da Mesa em 130% → visitante passa a 200% → a Mesa conserva 130%. O mesmo retorno foi conferido no navegador. As cinco rodadas foram repetidas com essa correção.

As opções também respeitam o modo do sistema de reduzir movimento e a navegação do modal por teclado. Não se declara teste físico com todos os dispositivos ou leitores de tela.

## Cronômetro, votação e equipe

O ensaio em duas abas conferiu o cronômetro sem pergunta: ambas exibiram 01:59 e depois 01:46; pausa em 01:45, reinício em 02:05 e troca para o preset de 01:30. Os testes cobrem duração personalizada, pausa/retomada, valores inválidos, troca de prazo e permanência do relógio zerado após pausar.

Os seis votos apareceram durante a votação; empate 3/3 gerou aviso à Mesa para chamar o Professor, sem trocar a fase. Após o desempate, o card público do sétimo permaneceu “Voto reservado”, com totais dos seis mesários separados do resultado final. O gabarito não apareceu no Público. Evidência: `output/simulacoes/cronometro-votacao-navegador.json`.

Votação e campos personalizados foram conferidos em 320, 390, 768, 1366 e 1920 px, no tamanho padrão e com texto 200%, espaçamento e alto contraste: 20 medições sem excesso horizontal. Campos têm mais de 44 px de altura; Tab passa de Minutos a Segundos. Evidência: `output/simulacoes/reflow-cronometro-votacao.json`.

A revisão independente identificou a orientação antiga de voto reservado e o desaparecimento do relógio pausado em zero. Os dois casos receberam regressões que falharam antes da correção e passaram depois. O relógio inicial ainda apresenta espera. José Pontes Schayder agora integra a Equipe de produção como Professor, junto de Miguel e Murilo.

## Conselho multicelular, revisão e reservas

Foram executadas cinco rodadas das 17 suítes: 85 execuções, nenhuma falha. A suíte multicelular usa seis controllers reais em contextos independentes compartilhando um backend Firebase simulado. Inclui 25 rodadas de seis votos simultâneos ao longo das repetições; mais cinco empates3/3 com Professor, duas revisões sucessivas por rodada, apuração única, preservação do relógio/cotas, projeção sem regressão e gravação antiga após troca de sessão. A revisão legada fechada é reaberta sem nova cota.

A revisão independente encontrou logout bloqueado por falha de liberação de assento e aparelho antigo gravando após perder sua reserva. Os dois foram reproduzidos antes da correção e receberam regressões. A nova revisão aprovou os ajustes. O código rejeita voto/gravação sem reserva vigente, e logout limpa a sessão local independentemente da liberação remota.

Cinco rodadas no Firebase REAL passaram: 181 conferências de reserva por conta, recusa de duplicidade e de outro assento/Público, expiração/recuperação, saída e sigilo do segredo. O teste escreveu somente jg/presencas/1–6, liberou suas reservas e não gravou partida, votos ou arsenal. Evidência: `output/simulacoes/presenca-firebase-real.json`. As regras de estado/segredo foram comparadas ao Console e preservadas. O ramo novo expõe apenas sessão aleatória/expiração para indicar ocupação no login.

No navegador, seis trocas de assento funcionaram; os três tipos de voto chegaram ao telão com cores distintas. Uma nova revisão manteve02:05 e liberou os botões; seis novos votos empataram3/3 e o Professor concluiu sem revelar sua categoria individual no Público. Os dois nomes de guerra foram conferidos. Justificativa/gabarito ficaram privados. Tab foi de Totalmente certa para Meio certa, com foco visível; Space confirmou um voto.

Reflow: 30 medições em320/390/768/1366/1920, revisão/votação/resultado, tamanho padrão e200%, contrastes claro/escuro e espaçamento, sem excesso horizontal. Foi encontrado e corrigido o apagamento das cores dos botões pelo alto contraste; a medição final confirmou tons semânticos claros no modo escuro e áreas maiores que44px. Evidência: `output/simulacoes/reflow-conselho-visual.json`. O cronômetro foi observado mudando de faixa: verde30s/60s, amarelo13s, vermelho1s e expirado0; em `output/simulacoes/cronometro-cores-navegador.json`.

Isso não é uma certificação de acessibilidade nem um percentual estatístico de ausência de erros. Não houve ensaio físico em seis modelos de telefone ou com toda tecnologia assistiva. O modo local não testa a rede real entre aparelhos; os testes separados do Firebase validam as permissões/reservas reais. A conferência da versão publicada está descrita no PR.

## Como reproduzir e limites

Execute `node tests/simular-cenarios.cjs 5`. As 17 suítes executam cinco vezes. Casos gerados têm sementes diferentes. O comando não usa rede nem Firebase. Resultados: `output/simulacoes/resultado-cenarios.json`; autenticação somente-leitura: `output/simulacoes/autenticacao-leitura.json`; reflow: `output/simulacoes/reflow-preferencias.json`.

Isso cobre todos os cenários automatizados definidos, não toda sequência possível de um jogo, de cartas físicas, de arbitragem humana ou de falha de rede. O sorteio físico e as decisões ambíguas do manual ainda exigem Professor/Mesa. Os testes automatizados acima são simulações. Login/leitura e a validação oficial descrita no PR usam o serviço real. Não foram apagados cadastros reais nem reiniciada a partida.

Últimas regressões: erro de rede e callback de inscrição de uma sessão encerrada não alteram a sessão seguinte; cadastro privado pendente não repõe o cache após sair. Os três testes falharam antes da correção e passaram depois. A revisão independente final não encontrou bloqueadores.

Integração adicional no Firebase real: seis logins independentes e assento ocupado desabilitado. No exemplo de revisão já existente, o voto1 foi enviado pela interface e os votos2–6 concorrentemente via REST com as respectivas contas. A Mesa mostrou6/6 e empate3/3; Professor votou pela interface e o Público recebeu Meio certa com o sétimo voto reservado. Não houve reset; a revisão antiga foi reaberta e o resultado do único lance foi substituído. O cronômetro permaneceu28s na reabertura/votação; na conclusão passou a zero conforme o encerramento normal. Os cliques simultâneos da automação do navegador foram inconclusivos por timeouts e não são contados como aprovação; não foi feito teste físico em seis celulares. Evidência: `output/simulacoes/votos-firebase-integrado.json`.

SHA256 do HTML validado: `86371bad4edf24139ce95713219f3cf4b3213206bcaa742b77412ffeebc6547a`.
