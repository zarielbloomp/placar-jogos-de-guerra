# O Mecanismo da Guerra — versão autorizada

Reformulação local: Mesa e Público, Preto e Amarelo, participação individual, Conselho com seis votos e Professor no desempate. O nome e a ilustração fornecidos pelo responsável estão incorporados ao site.

## Uso e regras

O login é a primeira tela. Na Mesa, escolha seu assento de 1 a 6; o Professor usa o assento 7. No computador do projetor, escolha Público. Cada pessoa utiliza sua senha do documento privado.

O painel reúne Controle, Analisar pergunta, Preparar e Histórico / Recursos. Cadastre os combatentes e as perguntas antes do primeiro lance. Em Controle, publique a pergunta, conduza o tempo da resposta e abra o Conselho. Seis votos são obrigatórios; empate exige o Professor entre as categorias empatadas.

A classificação permanece no telão sem números de pontos durante a fase. A Mesa pode mostrar ou ocultar a pontuação geral a qualquer momento; fechar a fase preserva essa escolha. O placar completo fica sempre visível para a equipe. Respostas esperadas permanecem sempre privadas. Nome real e função exigem revelação explícita.

O sorteio do pelotão é físico. A Mesa informa os três selecionados, e o atacante escolhe até dois, um por vez. Se restarem menos de três elegíveis, entram os disponíveis. Cada exército tem duas revisões no jogo inteiro, inclusive revisão da revisão. A reapuração automática aceita somente o resultado mais recente da fase atual, sem acontecimentos posteriores.

Situações especiais sem efeito definido no manual exigem decisão justificada do Professor. Cartas/cápsulas, crimes de guerra e transferência de bandeira após aniquilação continuam dependendo da arbitragem humana.

O Controle permite selecionar a fase e repetir sua apresentação. Perguntas-míssil são cadastradas por fase. Depois da votação, “Publicar resultado” anuncia os pontos calculados pelo manual, sem campo livre para alterar valores. Consulte [o guia de fases e anúncios](docs/fases-pontuacao-anuncios.md).

## Dados e publicação

`jg/segredo/partida` guarda a fonte privada versionada; `jg/segredo/arsenal`, os gabaritos; `jg/segredo/votos/<rodada>/<assento>`, os votos individuais. `jg/estado` recebe somente a projeção pública. As contas da Mesa são operadores de confiança com acesso operacional à fonte privada.

As novas permissões foram publicadas no Firebase após autorização específica do responsável. As oito contas foram conferidas e a fonte privada vazia já está preparada. Esta entrega segue pelo [PR #1](https://github.com/zarielbloomp/placar-jogos-de-guerra/pull/1), com testes antes do merge e conferência do deploy. Consulte [publicação e reversão](docs/publicacao-e-reversao.md) para recuperar uma versão anterior.

Há backup integral privado anterior ao reinício. Credenciais, cópias reais e anexos originais ficam fora do Git. A imagem foi incorporada ao HTML para manter a distribuição em um arquivo único, sem build.

## Verificação

Execute `node tests/simular-cenarios.cjs 5`: as 17 suítes rodam cinco vezes. O workflow também executa todas sem acessar contas reais. O ensaio `?ensaio=1` usa apenas dados locais e não sincroniza entre aparelhos diferentes.

## Links

- [Site atualmente publicado](https://zarielbloomp.github.io/placar-jogos-de-guerra/)
- [Repositório](https://github.com/zarielbloomp/placar-jogos-de-guerra)
- [Relatório ao Professor](output/pdf/relatorio-professor.pdf)
- [Tutorial detalhado](output/pdf/tutorial-jogos-de-guerra.pdf)
- [Comparação com o manual](output/pdf/analise-jogos-de-guerra.pdf)

Um único index.html, sem build, com Firebase compat 10.12.2. Para detalhes das decisões de regras, consulte [o guia](docs/guia-mecanismo.md).

## Acessibilidade e telas

A interface inclui navegação por teclado, atalho para o conteúdo, confirmação com foco contido e retorno ao acionador, avisos persistentes para leitores de tela e redução de movimento. Campos móveis usam texto de16px e botões têm área mínima de44px. A validação de reflow cobre320 a1920px, com dados fictícios. Consulte [a revisão de acessibilidade](docs/acessibilidade.md) para escopo e limites; isso não substitui ensaio com usuários e tecnologias assistivas reais.

## Preferências e autoria

A engrenagem Acessibilidade aparece no login e no cabeçalho. Texto100-200%, contraste claro/escuro, espaçamento, redução de movimento e alvos maiores ficam no navegador, por perfil. Não são enviados ao Firebase e não mudam o telão em outro aparelho. Preferências do visitante são usadas no primeiro acesso de um perfil sem configuração própria; Restaurar padrão afeta somente o perfil atual. A preferência do sistema por reduzir movimento continua valendo. O cronômetro adapta sua apresentação ao espaço para ficar inteiro.

Créditos em destaque: Miguel Conholato Nicoli (IMI4) e Murilo Carreiro (EMI4), junto do Professor José Pontes Schayder, conforme nomes informados pelo responsável.

O acesso ao painel exige Firebase Auth e conta correspondente ao assento. Cada conselheiro registra seu voto próprio. Mesa/Professor compartilham a partida e os dados operacionais autorizados; o Público usa uma conta compartilhada. A projeção `jg/estado` é pública por desenho; o segredo exige conta autorizada. As preferências não são uma barreira de autenticação.

Para repetir toda a cobertura automatizada pelo menos cinco vezes: `node tests/simular-cenarios.cjs 5`. O resultado fica em `output/simulacoes/resultado-cenarios.json`; logs de ensaio em `tmp/simulacoes/`. O comando usa apenas dados fictícios. A simulação oficial cobre Preto/Amarelo e Conselho; a simulação legada verifica compatibilidade. Consulte [o relatório de simulações](docs/relatorio-simulacoes.md).


### Computador e telão

Os links `?telao=1`, `?controle=1` e `?professor=1` selecionam o formulário correto; todos continuam exigindo a senha da conta correspondente. O Professor também tem botão próprio na entrada. O caminho anterior pela Mesa/assento7 continua disponível.

No computador, a visão pública organiza classificação/cronômetro à esquerda, pergunta/Conselho no centro e acontecimentos à direita. Recursos ficam abaixo; combatentes podem ser consultados. O cabeçalho preserva os créditos e o Professor. O histórico aceita teclado e mantém foco/rolagem em atualizações. Texto ampliado e telas estreitas reorganizam a composição sem esconder enunciados.

O botão **Tela cheia** usa a função do navegador apenas neste aparelho. Se o navegador recusar, o site orienta usar **F11** no computador. Isso não altera jogo, permissões ou preferências de outros dispositivos.

A suíte `node tests/ux-telao.cjs` cobre entrada direta sem autenticação automática, Professor, fluxo público, transição para pelotão, cronômetro ocioso, sigilo e tela cheia/falha. Integra o CI e o comando de cinco rodadas. A nova organização foi conferida em ensaio com ataque, seis votos, empate, desempate do Professor, anúncio e histórico por teclado. Conferências de largura: `output/simulacoes/ux-telao-reflow.json` e `ux-login-reflow.json`.


### Relógio e votação ao vivo

O cronômetro do telão funciona mesmo sem uma pergunta aberta. A Mesa mantém 30/45/60/90 segundos e pode escolher **Tempo personalizado**, informar minutos e segundos e tocar **Iniciar** ou **Reiniciar**. Iniciar com uma duração nova aplica esse valor; pausar e retomar o mesmo prazo preserva o saldo. Prazo total deve ser inteiro e positivo. A conversão de relógio do servidor continua compensando diferenças entre aparelhos.

O Público acompanha as categorias dos votos 1–6 conforme chegam e a contagem por categoria. O sétimo voto não é publicado, inclusive após a apuração; somente a indicação de recebimento e o resultado final são mostrados. Empate da validação da resposta gera aviso para chamar o Professor na conta dele, sem trocar de fase. Não confundir com eventual desempate final do placar.

Créditos atuais: **Equipe de produção** com Miguel Conholato Nicoli (IMI4), Murilo Carreiro (EMI4) e José Pontes Schayder (Professor).

Exemplos solicitados para teste são identificados por EXEMPLO. Cadastros ainda não usados podem ser excluídos normalmente. Se já participaram de resultados, o Professor precisa desfazer/reiniciar os testes antes da exclusão, preservando a proteção de histórico. Backups privados ficam fora do Git. Não remover proteções de histórico para excluir exemplos.


### Conselho em aparelhos diferentes

Cada mesário deve escolher **seu próprio assento (Mesa 1 a Mesa 6)** e usar a senha correspondente. Assentos ocupados ficam cinza; a reserva é atômica. **Sair** libera o assento. Ao fechar o navegador ou perder conexão, a reserva expira em até 45 segundos sem renovação. Uma sessão antiga não pode continuar alterando o jogo depois de perder a reserva. Público continua compartilhado, sem bloqueio de assento. Todos precisam recarregar a versão publicada para usar esse controle.

Os votos são recebidos por assento, sem gravar a partida inteira a cada voto parcial. A Mesa mostra confirmação e o telão atualiza os seis votos; a apuração final é registrada uma só vez. Verde/✓ indica totalmente certa, amarelo/≈ meio certa e vermelho/× totalmente errada. O voto individual do Professor continua reservado no Público.

**Abrir revisão** já libera outra votação, com seis votos novos. O cronômetro fica como estava; não reinicia em 60 segundos. Uma revisão antiga que ficou fechada é reaberta ao conectar a versão nova, sem consumir outra cota. O aviso público identifica o exército solicitante e a rodada; a justificativa permanece privada. As duas revisões incluem revisão da revisão.

No ataque há a seleção opcional **Quem faz a pergunta**: combatente vivo do atacante. O telão destaca os dois nomes de guerra. O resultado aparece em um bloco grande antes da pergunta; pontuação continua sob controle da Mesa. O relógio tem faixa de cor, texto e barra de tempo. Preferências locais e redução de movimento continuam respeitadas. Regras novas limitam a escrita de presença à conta do assento; permissões do segredo/estado anteriores permanecem intactas.
