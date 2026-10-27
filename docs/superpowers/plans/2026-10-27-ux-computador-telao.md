# Computador e telão: entrada clara e foco no jogo

Objetivo: corrigir a hierarquia visual observada em1920px e reduzir passos desnecessários. O link?telao=1 não selecionava Público. Cabeçalho e retrato tomavam altura excessiva; pergunta, votos e acontecimentos ficavam separados pela rolagem. Contador zerado aparecia vermelho mesmo sem ataque.

Direção: atalhos explícitos Mesa/Professor/Público, URLs selecionam apenas formulário (nunca autenticação). Telão com classificação e cronômetro à esquerda, pergunta/votação no centro e acontecimentos à direita. Recursos e combatentes continuam acessíveis. Cabeçalho compacto preserva autores e Professor principal. Botão Tela cheia local, opcional, com tratamento de indisponibilidade. Computador aproveita largura real; celular e texto ampliado reorganizam sem cortes.

- [x] Testes de links, papéis do login, estado de apresentação, contador ocioso, tela cheia e sigilo antes de implementar.
- [x] Alterar apenas UI do index.html, sem dependências/build ou mudanças no motor/dados/permissões.
- [x] Conferir estados de espera/resposta/votação/empate/resultado e telas320–1920px, contraste e texto200%, teclado e foco. Simulações só em ensaio.
- [x] Testes existentes, nova suíte no CI, revisão independente, PR descrito, publicação e conferência oficial.

Limites: pergunta extensa pode aumentar a altura; nunca cortar enunciado ou esconder controles com overflow global. Ajustes de exibição e tela cheia são locais, sem escrita Firebase. Não restaurar nem alterar a partida real para validar UI.

Revisão independente encontrou foco do histórico sem identificação estável e estágio de Conselho antigo encobrindo novo pelotão. Regressões reproduzidas em testes antes da correção; corrigidas com id estável, restauração da rolagem e prioridade do pelotão aberto/espera. Navegador confirmou foco e scrollTop767,5 mantidos após atualização. Texto200%/contraste/espaçamento/alvos conferidos em105medições (21combinações×5), sem overflow;42layouts de entrada sem overflow. Nenhuma gravação na partida real. Tela cheia recusada neste navegador, fallbackF11 conferido; API normal/erro coberta em VM.
