# Evolução oficial e laboratório de controle completo
Data: 26/10/2026. Execução e publicação autorizadas pelo usuário.

## Contrato
Continuar com um index.html, SDK Firebase compat 10.12.2, jg/estado e jg/segredo. Preservar campos e índices antigos. Não alterar dados reais durante os ensaios.

## Versão oficial
- Corrigir novas divergências encontradas e preservar histórico legado.
- Separar resultados de Blitzkrieg e defesa coletiva; consumir o limite de duas coletivas automaticamente.
- Acrescentar conferência do rodízio de alunos e de quatro mísseis nas cinco fases normais. Legado sem alvo recebe aviso de conferência, sem inventar correspondência.
- Cronômetro compartilhado entre controle e telão, usando horário de término. 30 s para começar, 90 s para concluir, 45 s Blitzkrieg e 60 s recurso; o professor controla início, pausa e decisão.
- Encerramento não deve apresentar pódio se gravação falhar, houver empate ou inconsistência entre totais e elenco. Ferramenta explícita de conciliação auditável para dados legados, sem reescrever lances antigos.
- Decisões pedagógicas e ambiguidades ficam na mesa: SUB preso, mutilação em fogo amigo, reserva, aniquilação com presos, continuidade após empate. Não aplicar mudança automática sem regra inequívoca.
- Backup/recuperação validada, com confirmação e histórico. Excluir qualquer segredo não explicitamente publicado.

## Laboratório experimental
Mesmo arquivo, modo ?experimental=1, com banner permanente e armazenamento local separado. Não chama Firebase. Estado público local e perguntas/gabaritos locais separados. Telão experimental sincroniza somente entre abas do mesmo navegador/origem, por evento storage. O protótipo não oferece contas independentes de grupos nem sigilo contra quem tem acesso ao mesmo perfil do navegador; usar material fictício na avaliação. Implantação multiaparelho requer projeto/permissões separados após aprovação do professor.

- Cadastro de arsenal por exército: fase, pergunta, resposta esperada, fonte e aprovação da mesa. Quatro questões por fase; vinte por exército. Importação/exportação por grupo para preparar material sem distribuir logins de editor.
- Sorteio auditável de ordem de ataques com os exércitos ativos. O atacante escolhe o exército rival e o alvo conforme o manual; não sortear o alvo normal automaticamente.
- Preparação de batalha: escolhe questão aprovada da fase, confere munição e rodízio, mostra somente enunciado no telão após publicação explícita. Gabarito só na mesa local.
- Professor julga total/parcial/falha. Registrar o lance e marcar a questão utilizada na mesma alteração do estado local, sem correção automática por texto.
- Fases com painel 0/4 por exército e avanço consciente. Ausência de regra para fase extra não cria munição nova automática. Histórico e backup completos do laboratório separados do oficial.
- Roteiro fictício para demonstrar o fluxo, sem importar os dados reais do Firebase.

## Entregas
Relatório para o professor: curto, funcionalidades, mudanças, limites e decisões para aprovação. Tutorial em PDF: preparação, login, controle móvel, telão, elenco, lances, cartas, recursos, timer, correção, backup, encerramento, problemas comuns; capítulo separado para laboratório, arsenal e sorteios.

## Plano e validação
1. Reproduzir bugs e escrever testes de regras; implementar melhorias oficiais.
2. Testar isolamento do laboratório e banco de questões; implementar fluxo de batalha, sorteio e fases.
3. Rodar testes Node e ensaios no navegador (incluindo largura de celular e telão). Revisão independente e correção dos problemas importantes.
4. Produzir dois PDFs, renderizar todas as páginas e conferir texto/layout. Atualizar README com links separados.
5. Publicar no repositório existente e verificar Pages. Manter a exigência de ensaio autenticado real como limite explícito.
