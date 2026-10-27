# Projeto de melhoria - Jogos de Guerra 2026

Data: 26/10/2026. Situação: proposta para aprovação antes de alterar o produto.

## Objetivo
Ajudar o professor e os dois pontuadores a conduzir as partidas, com placar público confiável, operações rápidas e elenco secreto protegido.

## Abordagem proposta
Evoluir o index.html existente, sem build, npm ou dependências locais. Manter Firebase compat 10.12.2, jg/estado e jg/segredo, campos e índices antigos. Uma reescrita com framework aumentaria a manutenção e contrariaria as instruções do projeto; apenas mudanças visuais deixariam erros de regras e privacidade sem solução.

## Entrega
1. PDF comparando todas as seções do manual com o código, priorizando riscos e apresentando redações para as mudanças do professor.
2. Interface responsiva em português, preservando o tema do jogo, com placar público, Memorial, classificação e mesa de comando organizada.
3. Proteção de identidades: nenhum nome real ou patente será copiado de SG para lances públicos automaticamente. Revelar continua sendo ação explícita. Dados públicos legados serão tratados sem exibir identidades sem revelação; eventual saneamento do banco precisa ocorrer pelo editor autenticado.
4. Pontuação final: contabilizar vivos e presos, incluindo comandante preso com valor 10; distinguir modo literal do manual e eventual interpretação alternativa, sem modificar silenciosamente partidas antigas. Não expor a patente para justificar o saldo sem revelação: ajustes de saldo autorizados serão publicados como valor agregado.
5. Novos tipos de lance ao final de P para Cair atirando e cartas. Ás de Espadas: o jogador escolhe um companheiro elegível. Pelotão: sorteio de três vivos distintos; rival escolhe até dois, sequencialmente; permitir encerrar após o primeiro; cada alvo pode defender e pontuar ou morrer. Registrar resultado e participantes, sem substituir por ajuste obscuro.
6. Validações: impedir baixas duplicadas, vivos negativos e liberação de quem não está preso; conferir captor; identificar alvos. Avisar sobre quatro mísseis por fase e controlar recursos sem ciclo silencioso. Não inventar limite para Blitzkrieg.
7. Cronômetro de apoio para 30, 90, 45 e 60 segundos, backup público exportável e histórico rastreável. Não incluir segredo no backup público.
8. Sincronização: sinalizar pendência e erro, impedir editor de sobrescrever estado não carregado; reduzir conflito entre pontuadores. Acesso de editor depende da autorização real no Firebase, não somente de estar autenticado.
9. Repositório GitHub e hospedagem por GitHub Pages, se a sessão e permissões permitirem; verificar URL após publicação. Não enviar identidades reais nem o manual ao repositório público.

## Regras e limites
As duas sugestões foram autorizadas pelo usuário. Quem escolhe no Ás de Espadas é interpretação proposta, pois a transcrição não identifica explicitamente o responsável. Permanecem decisões do professor: SUB vale 5 ou 10 quando preso; rodada de desempate se o empate persistir; regras de reserva e integração de desertores; sorteio quando restam menos de três vivos; se a ausência de ativos equivale imediatamente à eliminação quando há presos.

Não automatizar decisões pedagógicas, tribunal militar, correção de respostas ou avaliação individual. Ajustes excepcionais precisam de observação. Não manipular dados reais durante testes. Testes em ambiente isolado, com SDK Firebase simulado, e conferência visual no navegador; autenticação e regras do banco real precisam de validação separada sem senha disponível.

## Validação
Cobrir fluxo de ataque, prisão, libertação, morte e vida extra; privacidade no Memorial e histórico; cartas e pelotão; final sem premiar eliminados; empate; arquivos antigos sem novos campos; falha de rede e permissões. Revisar diff e verificar PDF renderizado antes de concluir.
