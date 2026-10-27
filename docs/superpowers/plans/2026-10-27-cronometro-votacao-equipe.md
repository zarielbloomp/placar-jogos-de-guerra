# Cronômetro, votação ao vivo, exemplos e equipe

Pedido: corrigir sincronização do relógio; manter30/45/60/90s e permitir duração personalizada; preparar exemplos removíveis; empate no julgamento deve chamar Professor; seis votos ao vivo, sétimo reservado. Crédito José Pontes Schayder junto da Equipe de produção, papel Professor.

Diagnóstico: presentationClock ocultava data-clock quando não havia atividade. Controller restringe tempos e iniciar pode reutilizar remaining do preset anterior. A projeção só publica escolhas após conclusão e inclui7; mudar para escolhas1–6 desde o início, sem7 em qualquer etapa.

- [x] Reproduzir relógio sem pergunta, duração/pausa/retomada e sigilo do7 em testes.
- [x] Corrigir UI/controller/projeção; duração inteira positiva, presets preservados, aviso contextual à Mesa. Sem remover campos ou mudar índices P.
- [x] Atualizar créditos atuais e expectativas de teste.
- [x] Conferir Mesa/Público em duas abas, contagem ao longo do tempo, seis votos, empate e Professor. Reflow320–1920px/a11y; repetir novos testes5x; CI completo.
- [x] Revisão independente e PR10. Publicação após CI e cadastro aditivo de exemplos serão registrados na descrição do PR. Backup privado preservado; sem reset nem apagar dados existentes. Exemplos identificados por EXEMPLO. Verificar pré-condições de cadastro antes de inserir.

Exemplos: quatro combatentes por exército, quatro perguntas-míssil e uma especial por exército na fase atual (10perguntas). Usuário poderá excluir antes do uso; resultados de teste devem ser desfeitos/reiniciados pelo Professor antes de remover cadastros usados, preservando as proteções de histórico do manual.

Revisão independente: corrigidos texto antigo de sigilo e relógio pausado em zero. A condição final considera atividade, execução, saldo ou deadline anterior positivo; um relógio inicial com deadline0 continua em espera. Regressões UX e cronômetro aprovadas. PR10 aberto; CI14suítes aprovado.
