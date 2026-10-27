# Professor e painéis por exército

Pedido aprovado: iniciar/reiniciar pelo Professor; consulta de perguntas por cor; recursos claros; vivos, presos e mortos separados; CO/SUB públicos só após revelação explícita.

Execução inline, mantendo index.html único e Firebase compat. Sem reiniciar a partida real na entrega.

1. Regressões: somente Professor inicia/reinicia; reinício preserva roster/people/nomes/arsenal, limpa efeitos e revelações; rodada nova não reutiliza votos. Estado opcional mantém partidas antigas compatíveis.
2. Controles visíveis no início do painel do Professor: iniciar com primeiro atacante escolhido, reiniciar com confirmação e backup disponível. Sem justificativa adicional. Reinício prepara fase1; iniciar não apaga histórico e recusa partida já iniciada.
3. Perguntas da consulta divididas em Preto/Amarelo, título/cor, fase e categoria. Recursos com cotas usadas/restantes; CO/SUB como usos registrados, sem sugerir descoberta.
4. Combatentes públicos por exército e situação, com quantidades e legenda textual; função apenas se p.revealed=true e role CO/SUB, independente de ter nome real. Leitores de tela também não recebem função secreta.
5. Suíte nova, regressões existentes cinco vezes, navegador320–1920/200%/contraste/teclado, revisão independente, PR descrito, CI e publicação. Reversão de código não restaura dados.
