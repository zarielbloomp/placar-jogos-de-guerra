# Carga local do elenco

`node tools/carregar-elenco.mjs entrada.json --validar` valida o arquivo. `node tools/carregar-elenco.mjs entrada.json --saida arquivo.json` produz um JSON com `partida` e `elenco`, correspondentes aos caminhos privados `jg/segredo/partida` e `jg/segredo/elenco`. Não acessa rede e não sobrescreve arquivo existente. A saída contém dados pessoais e deve ser guardada fora do Git.

A entrada tem `exercitos`, lista com Preto e Amarelo, cada um com `cor`, `nome` e 12 `soldados`; cada soldado tem `codinome`, `real` e booleanos `co`, `sub`, `hb`. A partida gerada é nova, com revisão zero; não use para substituir uma partida existente sem preservar e conferir os dados.

O site atual não cadastra a identidade do homem-bomba. O programa valida `hb`, mas não o inclui na saída: mantenha essa informação por procedimento reservado separado.

Arsenal: `node tools/carregar-arsenal.mjs entrada.json --validar` ou `node tools/carregar-arsenal.mjs entrada.json --saida arquivo.json`. A saída é um mapa por ID para `jg/segredo/arsenal`, com 64 perguntas e seus gabaritos; exige armazenamento reservado e não sobrescreve arquivos. As perguntas especiais 31/32 e 63/64 aceitam a fase especial ou a fase 5 com identificação pelo número e início do enunciado. A revisão começa em 1 e a aprovação fica desmarcada.

A entrada tem seis perguntas normais por fase por exército, mas o site aceita no máximo quatro. Portanto, a saída conserva os dados para conferência e **não é válida para carga no site atual**. A validação do programa confere a entrada, não autoriza importação; não há acesso à rede nem alteração do motor.
