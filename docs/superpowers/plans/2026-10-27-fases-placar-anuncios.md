# Fases, placar privado e anúncios

Pedido do responsável: fase selecionável, perguntas por fase e míssil, placar completo da Mesa, anúncio dos pontos de cada resposta, botão para mostrar/ocultar pontuação pública e transições discretas. Valores confirmados pelo responsável: cálculo pelo manual; Mesa controla o anúncio. Entrega em novo PR e aplicação no site oficial.

## Desenho

- Preservar `fase`, categorias `normal`/`especial` e índices de `P`. Identificar `normal` como Pergunta-míssil na interface. Filtrar arsenal por fase/exército/modalidade, mantendo cadastro por fase e a cota de quatro mísseis.
- Seletor de fase de 1 a 5 e desempate 6. Antes de sair de uma fase incompleta, exigir confirmação no painel e justificativa do Professor, sem fechar a fase automaticamente ou apagar registros. Bloquear mudança com pergunta/Conselho/revisão em andamento. Reentrada mantém contagens e rodízio daquela fase.
- Mostrar à Mesa a classificação com pontos de resposta, saldos e total. O público recebe números gerais somente com autorização explícita pelo controle Mostrar/Ocultar. Ausência do campo novo preserva o fechamento de fase da versão anterior.
- Anúncio de resposta calculado a partir do lance confirmado. Nenhum campo livre de pontos. Botão Publicar resultado divulga somente o ganho daquela resposta; Retirar anúncio remove-o da projeção. Histórico público não recebe totais ocultos. Reapuração/desfazer/início de pergunta invalida anúncio anterior.
- Transição com título temático da fase, identificador e prazo absoluto. Repetir apresentação por ação explícita. Quem reconecta depois do prazo não recebe uma animação antiga. Respeitar redução de movimento e preservar foco/formulários durante atualizações.
- Não mudar regras Firebase nem reiniciar dados nesta entrega. Campos opcionais e projeção por lista de campos permitidos; gabaritos e identidades continuam privados.

## Execução

- [x] Escrever testes do motor/projeção/anúncios/seleção de fase e observar falhas.
- [x] Implementar funções puras e integrar ações transacionais.
- [x] Implementar controles e transições responsivos, conferindo valores e sigilo.
- [x] Validar em duas abas de ensaio e executar suítes existentes.
- [ ] Atualizar guia e PR com mudanças, testes e reversão; CI, merge e deploy.
- [ ] Conferir host oficial com partida preservada, sem mudanças nas permissões.
