# O Mecanismo da Guerra - Conselho e telão

Execução das alterações e reinício autorizados pelo responsável. Novo nome confirmado: O Mecanismo da Guerra.

## Desenho aprovado pelo pedido e esclarecimentos

- Duas áreas: Mesa (seis contas individuais e Professor no mesmo painel) e Público. Um único index.html e Firebase compat, sem build.
- Apenas Preto (índice histórico 0) e Amarelo (índice histórico 5). Preservar seis posições internas e os índices P. Elencos e arsenal começam vazios; nomes serão enviados depois.
- Ranking geral permanente ao lado do telão, sem números de pontos durante a fase. Publicar pontuação somente ao fechar fase. Pontos detalhados e respostas esperadas permanecem em jg/segredo.
- Telão concentra pergunta/atividade, fase, relógio grande, andamento do Conselho, recursos e últimos acontecimentos. Identidade real só após revelação explícita.
- Pelotão: seleção física nas cartas; mesa informa três nomes de guerra elegíveis. Atacante escolhe até dois, um por vez. Não substituir sorteio físico por aleatoriedade digital.
- Conselho: seis assentos independentes, opções total/parcial/falhou. Apurar só após os seis votos; maior contagem vence. Empate entre categorias exige sétimo voto do Professor entre as opções empatadas. Assentos públicos têm nomes fictícios de guerra. Enquanto aberto, público vê recebimento dos votos, não escolhas parciais.
- Duas revisões por exército no jogo inteiro. Revisão da revisão consome a mesma cota. Reapuração substitui resultado anterior sem dobrar pontos ou recursos e respeita dependências.
- Painel de recursos por exército, individualizado: recursos/apelações, coletivas, dispositivo, homem-bomba, CO e SUB. Condições ambíguas continuam com o Professor; registrar justificativa.

## Arquitetura

Motor existente reaproveitado para cálculo e validação de lances. Fonte privada versionada em jg/segredo/partida; arsenal e elenco continuam privados. Publicar em jg/estado apenas projeção sem pontos durante a fase e sem gabaritos. Votos separados em jg/segredo/votos, com escrita por UID/assento e rodada; seis mesas com o mesmo acesso operacional, voto exclusivo por conta. Revisões por CAS; projeção pública rejeita revisões antigas.

## Etapas

- [x] Implementar funções puras de Conselho/projeção/revisão com testes e invariantes.
- [x] Implementar painel móvel e telão em fluxo único, reaproveitando índices e validadores do jogo.
- [x] Criar cinco contas adicionais, preparar permissões por assento e documento privado. Preparar backup integral antes de reiniciar.
- [ ] Verificar fluxos, concorrência, seis votos, empate, recursos, sigilo, fim de fase e pelotão físico.
- [ ] Publicar permissões após confirmação pontual exigida pelo navegador; reiniciar com cópia privada de recuperação e verificar acessos reais.
- [ ] Atualizar documentos para esta versão única e publicar no GitHub Pages; conferir produção.

## Registro da execução

- Nome e ilustração fornecidos incorporados em login, cabeçalho e classificação; imagem preservada em dados embutidos no HTML.
- Backup integral privado salvo antes de qualquer reinício; cinco novas contas criadas.
- Motor, integração, documentos e ensaio local concluídos; produção não alterada.
- Publicação das permissões aguardando a confirmação específica solicitada após bloqueio da revisão automática.
- Decisão: arbitrar parcial de pelotão e Blitzkrieg com justificativa do Professor; não criar consequência automática sem definição no manual.
- Decisão: em caso de menos de três vivos, pelotão recebe todos os elegíveis, mantendo até dois alvos.
