# Publicação e reversão

Pedido do responsável em 27/10/2026: toda alteração deve ter um PR bem descrito antes de entrar no site oficial. A regra também está no `AGENTS.md` deste projeto.

## Registro desta entrega

- PR da reformulação: https://github.com/zarielbloomp/placar-jogos-de-guerra/pull/1
- Versão anterior do código: `6c0f2b2`.
- Firebase: permissões dos seis assentos da Mesa e do Professor publicadas; autenticação das oito contas conferida. Leituras do segredo foram recusadas ao Público e sem autenticação.
- Partida: nova fonte privada inicializada, somente Preto e Amarelo, sem lances, participantes ou perguntas anteriores. Backup integral privado salvo antes do reinício.
- CI do PR: as cinco suítes passaram na revisão inicial; novas alterações devem repetir os checks antes do merge.
- O resultado final do deploy e a verificação no endereço oficial são registrados no próprio PR e no relatório de validação.

## Voltar o código

1. Abra o PR e use **Revert** após o merge, criando um novo PR de reversão. Também é possível pedir ao responsável técnico para preparar essa reversão.
2. Confira os testes e aprove o PR de reversão.
3. Aguarde o deploy do GitHub Pages e confira a versão apresentada no endereço oficial.

O histórico dos commits e os PRs preservam as alterações de código. Isso não desfaz mudanças feitas no jogo durante uma aula.

## Voltar dados e permissões

Reverter o HTML não restaura o Firebase. A versão anterior usava outra estrutura de dados e outras permissões. Antes de recuperar uma cópia antiga, salve também o estado mais recente em um novo backup privado e suspenda a operação da Mesa.

Recupere de forma coordenada a cópia integral de `jg/estado` e `jg/segredo`, as regras correspondentes e o código compatível. As cópias anteriores à ativação e as regras anteriores estão em `output/privado/`, fora do Git. O arquivo com horário anterior à primeira criação de `segredo/partida` é a cópia completa do formato antigo; a cópia posterior também registra a fonte vazia criada durante a preparação.

As revisões de gravação precisam continuar coerentes com as regras em uso. Não cole uma cópia antiga por cima de uma partida em andamento nem publique arquivos com gabaritos, identidades ou senhas no GitHub.

## Próximas alterações

Descreva em cada PR o problema, o comportamento final, os testes executados e qualquer mudança de dados ou permissões. Inclua como desfazer a alteração e evite misturar uma mudança de regra com simples correção visual sem explicar ambas.
