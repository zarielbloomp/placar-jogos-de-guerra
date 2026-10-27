# Jogos de Guerra Implementation Plan

> **For agentic workers:** execução nativa nesta sessão com superpowers:executing-plans. O usuário autorizou aplicação imediata e acrescentou controle móvel, telão ao vivo e participação individual.

**Goal:** corrigir o placar e disponibilizar controle móvel e telão sincronizados, com relatório de regras.
**Architecture:** um index.html, Firebase compat 10.12.2, mesmas raízes e índices de tipos. Novos campos opcionais e operações com revisão transacional.
**Tech Stack:** HTML/CSS/JS sem build; testes Node nativos; PDF com ReportLab.
**Spec:** docs/superpowers/specs/2026-10-26-jogos-de-guerra-design.md, complementado pelas mensagens do usuário.

## Global Constraints
Interface em português; nenhuma identidade/patente pública sem ação de revelar; compatibilidade com lances antigos; P somente recebe tipos no fim; não usar dados reais nos testes.

## Review Focus
- Registros antigos sem soldado e arrays vazios retornados pelo Firebase.
- Duas mesas alterando o mesmo jogo e falha de autorização.
- Patente inferível no saldo: fechamento exige ação explícita de publicação.
- Repetir morte/prisão/vida extra e captor errado.
- Pelotão com menos de três elegíveis, até dois alvos distintos, em sequência.

### Task 1: Regras e sigilo
- [ ] Criar testes Node com DOM e Firebase simulados, reproduzindo vazamento e baixas duplicadas.
- [ ] Implementar normalização, transições válidas, novos tipos, classificação única e publicação explícita das patentes no fechamento.
- [ ] Verificar ataque, prisão, libertação, cartas, empate e legado.

### Task 2: Operação e sincronização
- [ ] Implementar revisão transacional com rejeição de conflito e atualização de todos os clientes.
- [ ] Atualizar segredo por campo, exigir leitura autorizada antes de habilitar edição.
- [ ] Criar controle móvel, telão, demonstração isolada, cronômetros, pelotão e exportação pública.
- [ ] Testar no navegador com registros de demonstração; nunca gravar no banco real.

### Task 3: Documentação, revisão e publicação
- [ ] Produzir PDF completo, renderizar e conferir páginas.
- [ ] Atualizar README e regras de exemplo, revisar código e testes.
- [ ] Criar GitHub, enviar apenas arquivos do projeto e ativar Pages. Conferir URL pública e links de controle/telão.
