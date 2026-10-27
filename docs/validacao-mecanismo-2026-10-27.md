# Validação local — O Mecanismo da Guerra

Situação atualizada: ativação explicitamente autorizada pelo responsável em 27/10/2026. Novas regras publicadas no Firebase, oito contas autenticadas e fonte privada inicializada com a partida vazia. Backup integral salvo antes do reinício. A entrega segue pelo PR #1; o resultado do deploy e a conferência no endereço oficial serão registrados no PR.

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

## Ativação e limites da conferência

As permissões foram publicadas pelo console autenticado. A API confirmou autenticação das oito contas e leitura permitida à Mesa/Professor. A leitura de `jg/segredo` foi negada ao Público e sem autenticação. Um teste de escrita com a conta do Público foi bloqueado pela revisão automática e foi retirado da verificação; a negativa de escrita foi conferida na regra preparada e na interface, sem alegar teste de mutação em produção.

O painel novo carregou a fonte oficial vazia usando a conta real do Professor. A inicialização foi concluída preservando a fonte já criada após a API recusar o cabeçalho ETag em uma chamada PATCH; a cópia integral anterior permanece privada.

O CI inicial do PR passou: https://github.com/zarielbloomp/placar-jogos-de-guerra/actions/runs/40512181763. Alterações posteriores devem passar novamente antes do merge. O deploy final e a sincronização real entre dois clientes ficam registrados no PR.

As seis contas da Mesa têm acesso operacional à fonte privada; a aplicação pressupõe uma Mesa de confiança. Voltar o código não restaura o Firebase; consultar `publicacao-e-reversao.md`.
