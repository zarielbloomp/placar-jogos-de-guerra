# Carga local do elenco

`node tools/carregar-elenco.mjs entrada.json --validar` valida o arquivo. `node tools/carregar-elenco.mjs entrada.json --saida arquivo.json` produz um JSON com `partida` e `elenco`, correspondentes aos caminhos privados `jg/segredo/partida` e `jg/segredo/elenco`. Não acessa rede e não sobrescreve arquivo existente. A saída contém dados pessoais e deve ser guardada fora do Git.

A entrada tem `exercitos`, lista com Preto e Amarelo, cada um com `cor`, `nome` e 12 `soldados`; cada soldado tem `codinome`, `real` e booleanos `co`, `sub`, `hb`. A partida gerada é nova, com revisão zero; não use para substituir uma partida existente sem preservar e conferir os dados.

O site atual não cadastra a identidade do homem-bomba. O programa valida `hb`, mas não o inclui na saída: mantenha essa informação por procedimento reservado separado.
