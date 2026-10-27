# Acesso e navegação por perfil

**Objetivo:** fazer o professor e a mesa encontrarem sua tarefa sem procurar login no rodapé ou interpretar uma tela extensa. Execução e publicação autorizadas pelo usuário.

**Arquitetura:** manter index.html e Firebase compat 10.12.2. Acrescentar entrada explícita e navegação por áreas reutilizando formulários e regras existentes. Nenhuma mudança de dados, pontuação ou permissões do banco.

**Desenho:** primeira tela com perfis Professor/Mesa/Público e formulário de senha; sessão lembrada exige botão Continuar. Identificação e Sair sempre no cabeçalho. Painel inicial orienta preparar participantes, perguntas e operar. Áreas separadas: Partida, Perguntas, Placar, Histórico, Elenco (Professor), Ferramentas e Ajuda. Público tem Placar/Histórico/Ajuda. Link direto de telão é apresentação pública; ensaio exige entrada explícita com aviso, sem fingir autenticação real.

- [x] Testes de autorização de entrada e navegação: sessão lembrada não entra sozinha; Mesa sem configuração; público sem edição; telão direto.
- [x] Implementar entrada, estado de sessão, painéis por papel, tarefas e categorias de lances.
- [x] Verificar navegador: primeiro acesso, login errado, Professor, Mesa, Público, sessão lembrada, sair, ensaio e telão; layout compacto em viewport de 600 px e desktop. Registro de baixa somente no laboratório, com Memorial e classificação conferidos.
- [x] Atualizar tutorial e README; revisar layout de todas as páginas dos PDFs.
- [x] Rodar testes, revisar alteração, publicar e conferir Pages: 55 testes passaram; revisão independente identificou atalhos de recursos, corrigidos com regressões. HTML publicado comparado ao arquivo revisado e entrada conferida no Chrome.

**Riscos:** não exibir conteúdo reservado antes de autorização; callback assíncrono não esconder mensagem de erro; preservar estado ao trocar área; manter ações administrativas fora da Mesa; não apagar sessão por abrir telão; não inventar login no laboratório.
