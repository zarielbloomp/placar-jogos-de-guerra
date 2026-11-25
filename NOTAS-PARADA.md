# Continuação da tarefa

Trabalho incompleto. A suíte `tests/cenarios-matriz.cjs` cobre nove cenários do motor e documenta nove lacunas; falta transformar todos os demais cenários suportados/parciais e casos T01–T46 em testes independentes, inclusive fluxos com Firebase simulado. B6 da matriz antiga já mudou no site e deve ser testado na versão atual, não marcado como ausente. Falta `docs/divergencias-matriz.md` com resultados reproduzidos e linhas correspondentes.

`tools/carregar-elenco.mjs` e seus testes estão implementados. O formato não inclui `hb`: o site não guarda essa identidade, por isso o comando avisa sobre a perda; conferir se esse comportamento é aceitável no procedimento de carga. Há teste de conversão, mas falta comparar automaticamente a saída com o estado gerado pelo cadastro do site.

Falta toda a tarefa 3. Atenção: a amostra exige seis perguntas normais por fase, enquanto `validateArsenal` em `index.html:203` recusa mais de quatro por exército/fase. Não contornar classificando perguntas normais como especiais nem entregar uma carga incompatível sem resolver essa divergência com o responsável. O motor não deve ser alterado nesta branch.

A suíte longa foi iniciada fora do repositório; verificar seu resultado antes de afirmar que passou. Não houve push, PR ou acesso ao Firebase real.
