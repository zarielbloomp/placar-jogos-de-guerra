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

Execute as doze suítes: `regras.cjs`, `apresentacao.cjs`, `partida-completa.cjs`, `mecanismo.cjs` `controller.cjs`, `fases-placar.cjs` `fases-controller.cjs` `exclusao.cjs` `acessibilidade.cjs`, `preferencias.cjs`, `autenticacao.cjs` e `simulacao-v3.cjs`, na pasta `tests` com Node. O workflow também executa essas suítes sem acessar contas reais. O ensaio `?ensaio=1` usa somente dados fictícios locais e não sincroniza entre aparelhos diferentes.

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

Créditos em destaque: Miguel Conholato Nicoli (IMI4) e Murilo Carreiro (EMI4), com Professor principal José Pontes Schayder, conforme nomes informados pelo responsável.

O acesso ao painel exige Firebase Auth e conta correspondente ao assento. Cada conselheiro registra seu voto próprio. Mesa/Professor compartilham a partida e os dados operacionais autorizados; o Público usa uma conta compartilhada. A projeção `jg/estado` é pública por desenho; o segredo exige conta autorizada. As preferências não são uma barreira de autenticação.

Para repetir toda a cobertura automatizada pelo menos cinco vezes: `node tests/simular-cenarios.cjs 5`. O resultado fica em `output/simulacoes/resultado-cenarios.json`; logs de ensaio em `tmp/simulacoes/`. O comando usa apenas dados fictícios. A simulação oficial cobre Preto/Amarelo e Conselho; a simulação legada verifica compatibilidade. Consulte [o relatório de simulações](docs/relatorio-simulacoes.md).
