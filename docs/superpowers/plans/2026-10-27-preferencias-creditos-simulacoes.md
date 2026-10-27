# Preferências pessoais, créditos e simulações

Pedido autorizado: engrenagem de acessibilidade com efeito pessoal, créditos Miguel Conholato Nicoli (IMI4), Murilo Carreiro (EMI4), apoio Professor José Ponyes Schayder; conferir autenticação e simular cenários ao menos5x.

## Desenho

Preferências somente no localStorage deste navegador, separadas por perfil (visitante, cada assento, Professor e Público; ensaio separado). Ajustes de texto100-200%, contraste claro/escuro reforçado, espaçamento, reduzir animações e alvos maiores. Herdar preferências do visitante apenas no primeiro uso de perfil sem configuração; nunca herdar de outro assento. Validar JSON e permitir restaurar padrões. Sem envio ao Firebase, sem alterar jogo nem preferências de outros aparelhos. Avisar se navegador impedir salvar.

Engrenagem com nome acessível no login e cabeçalho. Painel modal com foco contido, Escape/Fechar e retorno ao acionador. Atualizações ao vivo preservam a seleção e o foco. Respeitar redução de movimento do sistema mesmo quando o controle local estiver desligado.

Créditos em destaque no login e cabeçalho, com os nomes/turmas informados, sem inferir identidade da imagem.

## Execução

1. Testes RED/GREEN de sanitização, persistência, separação por perfil e ausência de gravação remota; conferir navegação do painel.
2. Implementar apenas index.html, mantendo Firebase compat e dados atuais.
3. Conferir autenticação e permissões: contas por assento, voto imutável próprio, Público sem segredo. A projeção jg/estado continua pública por desenho; login é obrigatório na interface. Não afirmar que preferências são sincronizadas entre aparelhos ou que dados públicos exigem senha no endpoint.
4. Executar cada suíte de cenário5x, variando sementes das partidas completas; registrar logs e soma de testes. Incluir combinações de votos, empate, revisões, roleta/recursos, fases, sigilo, falhas de gravação, exclusão e acessibilidade. Não se declara cobertura de toda sequência possível de jogo, que é ilimitada.
5. Browser em larguras320-1920px, perfis diferentes no mesmo navegador e ausência de alteração em outra aba/aparelho. Sem alterar partida real.
6. PR, CI, merge e deploy; reversão para8e8a43164a394d1c4047508c04cf5cce3d76a4f2 sem restaurar Firebase.
