# Jogos de Guerra 2026

Placar escolar ao vivo, controle pelo celular e telão. Cada combatente representa um aluno. Um único `index.html`, sem build ou dependências locais, com Firebase compat 10.12.2.

## Links

- [Site oficial](https://zarielbloomp.github.io/placar-jogos-de-guerra/)
- [Controle oficial](https://zarielbloomp.github.io/placar-jogos-de-guerra/?controle=1)
- [Telão oficial](https://zarielbloomp.github.io/placar-jogos-de-guerra/?telao=1)
- [Demonstração isolada](https://zarielbloomp.github.io/placar-jogos-de-guerra/?demo=1&controle=1)
- [Laboratório guiado](https://zarielbloomp.github.io/placar-jogos-de-guerra/?experimental=1&controle=1)
- [Telão do laboratório](https://zarielbloomp.github.io/placar-jogos-de-guerra/?experimental=1&telao=1)
- [Relatório ao professor](output/pdf/relatorio-professor.pdf)
- [Tutorial detalhado](output/pdf/tutorial-jogos-de-guerra.pdf)
- [Análise original do manual](output/pdf/analise-jogos-de-guerra.pdf)

## Oficial e experimental

O oficial compartilha a mesma partida no Firebase entre celular e computador, com internet. Abrir outro link não cria outra partida. Placar, Memorial, classificação, pergunta apresentada, gabarito explicitamente revelado e cronômetro são sincronizados.

O laboratório não chama o Firebase. Usa armazenamento local separado e sincroniza apenas entre abas da mesma origem e perfil do navegador. Não sincroniza entre celular e computador diferentes. Os perfis desse modo são simulações; use apenas material fictício. O exemplo carrega seis exércitos, três alunos por grupo e vinte perguntas ilustrativas por exército. O modo guiado permite sortear sequência, escolher rival/aluno, apresentar pergunta, julgar, avançar turno e conferir fases/munição. Ele não é um árbitro automático completo.

## Acessos reais

A primeira tela do controle oficial é o login: escolha Professor, Mesa ou Público e digite a senha. Uma sessão lembrada exige Continuar ou Usar outra conta. Perfil e Sair ficam no cabeçalho. Outro acesso autorizado permanece disponível em uma opção avançada. As contas existem no Firebase Authentication. Senhas distintas foram entregues em PDF privado, fora do repositório.

- Professor: administração, elenco, perguntas, configuração, conciliação e recuperação.
- Mesa: operação de lances, recursos, cronômetro e apresentação; leitura dos dados reservados. Não altera cadastros protegidos.
- Público: somente leitura. O telão também funciona sem login.

`database.rules.json` contém as regras publicadas para este projeto, com UIDs das contas e preservação do editor anterior autorizado. Em outro projeto, substitua os identificadores e publique suas regras. Não coloque senhas ou credenciais administrativas no HTML.

## Navegação por tarefas

Professor e Mesa recebem painel inicial e menu: Operar partida, Perguntas, Placar ao vivo, Histórico, Ferramentas e Como usar. Participantes é exclusivo do Professor. Público recebe apenas Placar, Histórico e Ajuda. A apresentação tem link próprio sem login. O laboratório pede entrada explícita no ensaio e identifica os perfis simulados. Tipos de lance foram agrupados por situação, preservando todos os índices.

## Perguntas

Professor cadastra título, enunciado, resposta esperada, fonte, exército, fase, categoria e aprovação. Arsenal normal: quatro por fase e vinte por exército. Há importação/exportação JSON por grupo, feita pela equipe responsável; não há portal de alunos ou conta independente por grupo. Importados ficam pendentes de aprovação.

Enunciado é publicado pela mesa. Depois da resposta, um botão explícito revela a resposta esperada. Marcar resposta concluída sozinho não pontua. Resultados são julgados pelo professor e registrados na mesa ou pelo painel guiado experimental. Perguntas usadas têm edição bloqueada.

## Regras e conferência

- Participação individual, mantendo seis exércitos e cinco fases.
- Ás de Espadas: jogador escolhe companheiro elegível, conforme interpretação autorizada da recomendação encaminhada.
- Pelotão: até três vivos sorteados; rival escolhe até dois em sequência. Com menos de três, entram os disponíveis.
- Total 20; parcial 10/10 com captura; falha com morte sem pontos antes da roleta.
- Quatro ataques normais por exército/fase; rodízio após defesa total; duas coletivas. Blitzkrieg separada de coletiva.
- Cronômetro compartilhado de 30/90/45/60 segundos, sem julgamento automático. No fluxo guiado, começar até 30 s e concluir até 90 s da publicação.
- Situação e captor são conferidos nos lances. Desfazer respeita dependências e devolve recursos associados.
- Classificação apresenta composição do saldo; empate ou divergências impedem pódio automático.
- Conciliação explícita preserva histórico e pontos, acrescentando ajustes das contagens conferidas pela mesa.

O jogo existente foi preservado. Há contagens antigas sem correspondência completa com o elenco; confira pessoas e registros reais antes de conciliar. Não invente a identidade de baixas antigas.

Tribunal, qualidade da resposta, cadeia de cartas/cápsulas, confisco de arsenal e transferência após aniquilação não têm automação completa. A libertação comum é bloqueada quando a origem não tem ativos, evitando voltar automaticamente à bandeira errada. Essa exceção deve ser resolvida pelo professor. Cápsulas/cartas continuam físicas; não foi inventada distribuição de probabilidades. SUB, efeitos coletivos e desconto na origem precisam de interpretação formal do professor.

## Dados e sigilo

- `jg/estado`: estado público, nomes de guerra, lances, cronômetro e revelações explícitas.
- `jg/segredo`: identidades reais e funções; `arsenal` contém perguntas e gabaritos reservados.
- Público não lê o segredo nem escreve. Professor escreve nos dois caminhos; Mesa lê o segredo e atualiza somente campos operacionais do estado.
- Registrar baixa não revela identidade/patente. Revelação publica intencionalmente. No fechamento, CO preso pode exigir confirmação da publicação somente da patente para calcular o saldo.
- Retirar publicação não desfaz cópias já vistas. Backup público pode conter revelações explícitas.

Admin usa transação; Mesa usa atualização atômica apenas dos campos permitidos, com revisão incremental validada no servidor. Revisão desatualizada é recusada; confira o estado recarregado antes de repetir. Todos os operadores devem recarregar a versão atual. Não há gravação offline.

## Backup e recuperação

Backup público e restauração validada ficam em Partida e apresentação. Somente Professor restaura ou zera. Backup público não inclui todo o elenco secreto/arsenal; exportações do arsenal e backup completo do laboratório contêm gabaritos e devem ficar privados. O laboratório tem importador do pacote completo local.

## Verificação e publicação

Execute `node tests/regras.cjs`: 55 testes passaram na entrega. Foram verificados autenticação dos três perfis, leitura pública do placar, bloqueio do segredo público, bloqueio de cadastros para Mesa e conflito de revisão no Firebase. Ensaios do fluxo guiado foram feitos no navegador; faça também um ensaio com a equipe e os aparelhos da aula.

GitHub Pages serve a branch `main`, raiz `/`. Nenhum build necessário. Abra `index.html` ou use servidor estático para desenvolvimento. Não envie senhas, backups reais ou identidades ao GitHub. `output/privado/` e `tmp/` estão ignorados.
