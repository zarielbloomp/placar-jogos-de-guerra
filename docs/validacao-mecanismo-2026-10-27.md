# Validação local — O Mecanismo da Guerra

Situação: implementação e documentos preparados; permissões novas, reinício oficial e publicação aguardam confirmação específica. O console Firebase não foi alterado após a rejeição da revisão automática.

## Evidências

- Motor legado: 55 verificações passaram.
- Apresentação legada e recusas de gravação: 8 verificações passaram. Essa suíte verifica compatibilidade de funções antigas; o novo telão nunca revela gabaritos.
- Simulação: 40 partidas, 200 fases e 4.800 batalhas; 5.693 conferências, 561 operações de desfazer/refazer e 292 vidas extras.
- Motor novo: 20 cenários passaram, incluindo seis votos, empates, limites de revisões, reapuração coletiva, pelotão físico, arbitragem de parcial, oito ataques por fase e CO capturado sem revelação.
- Integração: sete cenários passaram, incluindo fonte imutável, apuração automática, conflito de revisão com repetição limitada e bloqueio de resultado manual que contornaria o Conselho.
- Expressão de validação do voto do Professor: conferida nas combinações de seis votos. Isso não substitui teste de regras no Firebase real ou no emulador.

## Navegador

Ensaio isolado em servidor local. Cadastrei seis combatentes fictícios e uma pergunta com gabarito privado, publiquei o enunciado e abri a votação. Três votos Totalmente certa e três Meio certa produziram empate no telão. O Professor recebeu apenas as duas categorias empatadas; seu voto Meio certa concluiu o julgamento e a situação do alvo passou a preso na outra aba.

O telão não mostrou identidades privadas, gabarito ou pontos durante esse fluxo. Conferi o login obrigatório e a ilustração fornecida na entrada, no cabeçalho e na classificação. Layouts conferidos em 390×844 e 1280×720; a configuração temporária de viewport foi removida ao terminar.

As imagens de prévia mostram dados fictícios. O backup anterior ao reinício e as credenciais ficam somente em `output/privado/`.

## Pendências de produção

1. Receber a confirmação específica de aplicação das novas permissões solicitada ao responsável.
2. Publicar as regras preparadas e conferir login, permissões individuais e recusas reais, incluindo tentativa de voto de outro assento e voto fora do empate.
3. Salvar novo backup integral, criar a fonte privada vazia, limpar os dados anteriores conforme reinício autorizado e publicar a projeção inicial Preto/Amarelo.
4. Atualizar a branch de publicação do GitHub Pages, conferir CI e repetir sincronização real entre dois clientes.

Não foi alegada conclusão dessas etapas. Os seis operadores têm acesso operacional à fonte privada; a aplicação pressupõe uma Mesa de confiança.
