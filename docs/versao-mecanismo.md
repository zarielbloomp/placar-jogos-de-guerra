# O Mecanismo da Guerra — versão autorizada

Reformulação local: Mesa e Público, Preto e Amarelo, participação individual, Conselho com seis votos e Professor no desempate. O nome e a ilustração fornecidos pelo responsável estão incorporados ao site.

## Uso e regras

O login é a primeira tela. Na Mesa, escolha seu assento de 1 a 6; o Professor usa o assento 7. No computador do projetor, escolha Público. Cada pessoa utiliza sua senha do documento privado.

O painel reúne Controle, Analisar pergunta, Preparar e Histórico / Recursos. Cadastre os combatentes e as perguntas antes do primeiro lance. Em Controle, publique a pergunta, conduza o tempo da resposta e abra o Conselho. Seis votos são obrigatórios; empate exige o Professor entre as categorias empatadas.

A classificação permanece no telão sem números de pontos durante a fase. Fechar a fase publica os saldos gerais. Respostas esperadas permanecem sempre privadas. Nome real e função exigem revelação explícita.

O sorteio do pelotão é físico. A Mesa informa os três selecionados, e o atacante escolhe até dois, um por vez. Se restarem menos de três elegíveis, entram os disponíveis. Cada exército tem duas revisões no jogo inteiro, inclusive revisão da revisão. A reapuração automática aceita somente o resultado mais recente da fase atual, sem acontecimentos posteriores.

Situações especiais sem efeito definido no manual exigem decisão justificada do Professor. Cartas/cápsulas, crimes de guerra e transferência de bandeira após aniquilação continuam dependendo da arbitragem humana.

## Dados e publicação

`jg/segredo/partida` guarda a fonte privada versionada; `jg/segredo/arsenal`, os gabaritos; `jg/segredo/votos/<rodada>/<assento>`, os votos individuais. `jg/estado` recebe somente a projeção pública. As contas da Mesa são operadores de confiança com acesso operacional à fonte privada.

As permissões foram publicadas após autorização específica do responsável. As oito contas foram conferidas e a fonte privada vazia está preparada. A entrega segue pelo PR #1, com conferência do deploy e instruções de reversão.

Há backup integral privado anterior ao reinício. Credenciais, cópias reais e anexos originais ficam fora do Git. A imagem foi incorporada ao HTML para manter a distribuição em um arquivo único, sem build.

## Verificação

Execute as cinco suítes: `regras.cjs`, `apresentacao.cjs`, `partida-completa.cjs`, `mecanismo.cjs` e `controller.cjs`, na pasta `tests` com Node. O workflow também executa essas suítes sem acessar contas reais. O ensaio `?ensaio=1` usa somente dados fictícios locais e não sincroniza entre aparelhos diferentes.
