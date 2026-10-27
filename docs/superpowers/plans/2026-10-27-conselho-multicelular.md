# Conselho multicelular — Implementation Plan

**Goal:** votos independentes e rápidos, revisão utilizável e apresentação legível.
**Architecture:** index.html único, staging ignorado em tmp/v3-*.js. Votos separados da fonte, projeção monotônica, fila de reapuração; reservas por assento com TTL.
**Tech Stack:** JavaScript, Firebase compat10.12.2, testes Node VM sem dependências.
**Spec:** docs/superpowers/specs/2026-10-27-conselho-multicelular.md
**Execução:** inline com superpowers:executing-plans; revisão independente do conjunto ao final.

## Restrições
Sigilo, compatibilidade de campos/índices, preferências locais, PT-BR, 320px/44px/teclado/foco/redução de movimento. PR antes de publicação. Sem reset real.

## Tarefas
- [x] RED: reproduzir revisão fechada/relógio alterado, assentos independentes sob concorrência, view atrasada e regressão da projeção; testar reserva concorrente/expiração/saída.
- [x] GREEN: hidratação imediata, fila de sync sem gravação por voto parcial, tratamento de sessão/tentativa repetida; revisão aberta com rodada nova e relógio preservado.
- [x] RED/GREEN: seleção de quem pergunta, projeção sanitizada e aviso público de revisão.
- [x] RED/GREEN: cores sem depender só delas, resultado/apuração destacados, relógio por faixas, botões e confirmação de voto; reserva de assentos no login e Firebase rules estritas.
- [ ] Testes significativos cinco vezes; regressões completas; navegador com seis sessões, revisão, empate, reflow e preferências. Revisão independente, PR, CI, regras/deploy e verificação real. Preservar backup; registrar reversão de código/regras/dados separadamente.

## Diagnóstico inicial
Fonte real: revisão pendente, council.open=false, status waiting, nenhum voto da rodada nova. Código mgReview reinicia60s e cria conselho fechado. Cada voto parcial desencadeia gravação CAS da partida por cada aparelho conectado; view usa snapshot da fonte antes de hidratar votos. Isso acrescenta gravações e disputas evitáveis. Testes anteriores exercitavam um único controller, sem seis sessões compartilhando listeners.

## Registro
Reproduções RED/GREEN: view sem voto recebido, gravação por parcial, revisão fechada/cronômetro alterado, gravação de sessão anterior substituindo nova, logout bloqueado por falha de release, voto após perda de reserva. Migração da revisão antiga também reproduzida. Revisão independente aprovada após corrigir os dois casos de lease. Browser: troca pelos seis assentos, três cores reais, revisão 02:05→02:05, seis votos novos, empate3/3 e Professor reservado; teclado Tab/Space. Reflow e alto contraste em conferência; neutralização das cores no modo escuro corrigida e medida novamente.

Validação final: 17suítes×5=85 execuções sem falhas, HTML85ca840. Firebase real:5rodadas/181conferências somente de presenças, nenhuma falha; regras publicadas após PR11 e CI17 aprovado, sem mudar permissões do estado/segredo. Publicação do código e conferência final serão registradas no PR.
