# Verificação de 27/10/2026

Foram atualizadas as três senhas, conforme pedido do responsável, e revalidada a autenticação. As senhas e o PDF de acessos permanecem somente no material privado, fora do repositório.

## Testes sem dados reais

- `node tests/regras.cjs`: 55 verificações de regras, sigilo, recursos, concorrência e acesso.
- `node tests/apresentacao.cjs`: oito verificações de apresentação e confirmação de gravação. Inclui o ciclo enunciado, conclusão, divulgação explícita do gabarito e retirada.
- `node tests/partida-completa.cjs`: 40 partidas determinísticas, cinco fases por partida, quatro ataques por exército em cada fase: 4.800 batalhas. São 5.693 conferências de consistência, 561 ciclos de desfazer/refazer e 292 vidas extras. Também confere recuperação do pacote de laboratório, recusa do quinto míssil, reinício e arquivos inválidos.

Os cenários usam participantes fictícios em memória. Não escrevem no Firebase nem geram lances na partida oficial.

O workflow `Testes do jogo` executa essas suítes automaticamente no GitHub a cada atualização e pull request, com acesso somente de leitura ao repositório e sem credenciais do Firebase.

## Verificação no serviço real

- Login dos três perfis com as novas senhas, por API e pela tela publicada.
- Público sem escrita e sem leitura do elenco/arsenal reservado.
- Mesa sem alteração de cadastro protegido, inclusive com uma revisão válida; revisão desatualizada recusada.
- Cronômetro temporário observado em duas páginas conectadas ao Firebase: ambas mostraram 00:30 e depois 00:22 durante a contagem real.
- Cronômetro original restaurado. Pontuação, eventos, elenco, apresentação e demais dados comparados antes/depois, com igualdade; somente a revisão de sincronização avançou.
- PDF privado atualizado e renderizado; código e documentos públicos verificados para ausência das senhas.

## Correções identificadas pelos testes

1. Restauração agora recusa fases inexistentes e dados ilegíveis do cronômetro, inclusive em snapshots de desfazer. Campos opcionais ausentes de arquivos antigos continuam aceitos.
2. Publicar/concluir/revelar pergunta, sortear sequência, preparar batalha e avançar fase só anunciam sucesso após confirmação de gravação. Uma recusa mantém o aviso de falha.
3. Carregar cenário fictício preserva o arsenal anterior se a atualização do estado não for confirmada.

## Limites da verificação

Testes não substituem o ensaio com a equipe e a rede da escola. Os registros antigos da partida ainda precisam de conciliação humana. Transferência após aniquilação, tribunal e outras exceções já descritas no relatório continuam sob decisão do professor. O laboratório continua local e separado do oficial.
