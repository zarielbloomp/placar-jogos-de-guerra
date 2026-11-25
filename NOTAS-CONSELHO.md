Objetivo: concluir nesta cópia feat/conselho-sigilo os bugs Astra e os ajustes de Conselho/telão confirmados pelo Murilo.
Escopo: somente placar-conselho, index.html sem build e testes offline, preservando o histórico até 0189ca5; nada na fila, na integração, em dados privados ou no Firebase real.
Critério de pronto: terceira coletiva recusada antes de abrir; cápsulas vinculadas a morte individual elegível com consumo único; rodapé livre em 1366×768/1920×1080; uma torcida e um controle de som; moderação por 7/8/9; pergunta legível, classificação e sigilo verificados.
Verificação: testes de regressão antes da correção, suítes existentes, navegador headless com rede bloqueada e dados EXEMPLO, revisão independente e commits locais limpos.

Motor:
- A cota das duas coletivas é conferida antes de criar batalha/relógio, e a opção esgotada sai do formulário do defensor.
- Tipos 3–6 usam origin para identificar a baixa individual normal (tipo 2) da mesma fase e dos mesmos exércitos. Recusam mortes definitivas, baixa já substituída e cápsula já utilizada. O vínculo também protege desfazer com dependências.
- Revisão da segunda coletiva continua substituindo seu resultado sem consumir terceira cota. Registros antigos sem origin continuam legíveis; a validação de replay infere a baixa e considera consumo legado.

Pendentes nesta execução: moderação, som/torcida unificados, layout, verificação visual, suíte completa e revisão final.
