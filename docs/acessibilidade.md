# Responsividade e acessibilidade

Revisão de27/10/2026. Um único index.html, sem build ou dependências novas.

## Alterações

- Atalho Pular para o conteúdo e região principal identificada em login, Mesa e Público.
- Confirmações com título/descrição, foco inicial no Cancelar, Tab/Shift+Tab contidos, Escape e retorno ao acionador; fundo inerte.
- Foco de campos, botões e resumos preservado após atualização ao vivo. Troca de aba anuncia a região principal.
- Avisos persistentes e deduplicados para leitores de tela. Cronômetro sem anúncio a cada segundo. Sem gabarito ou identidade privada nos avisos públicos.
- Efeitos respeitam redução de movimento e podem ser dispensados por Tab/Escape sem roubar foco. Avisos flutuantes têm fechar e são dispensados ao navegar com Tab para não encobrir o próximo controle.
- Botões com área mínima de44px; campos móveis com texto de16px; campos com borda mais definida; foco, textos secundários e destaques com contraste reforçado.
- Colunas e formulários adaptáveis, textos longos com quebra, confirmação rolável em telas baixas. Abas têm rolagem própria quando necessário.

## Conferência executada

Navegador com iframe de viewport real, em modo ensaio sem Firebase:20 combinações (quatro abas da Mesa em320,390,768,1280 e1920px) e cinco do Público, com pergunta longa. Nenhuma rolagem horizontal do documento; as abas podem rolar dentro da navegação. Menor botão visível medido:44px. Login conferido a320px. Confirmação em768x360px manteve Cancelar visível e focado. Tab, Shift+Tab, Escape, retorno ao Excluir e atalho ao conteúdo conferidos. Atualização de cronômetro preservou foco em Iniciar.

Contraste calculado a partir das cores aplicadas: texto secundário5,13:1, destaque do cabeçalho8,95:1, borda dos campos4,34:1, destaque sobre fundo claro5,67:1 e foco6,01:1. Essas amostras não representam uma auditoria exaustiva de cada combinação de estado.

Cinco testes automatizados de comportamento cobrem confinamento de foco, diálogo sem controles, restauração de botão após recriar o DOM, deduplicação dos avisos/sigilo e descrição da confirmação. As oito suítes anteriores também passaram, incluindo40partidas/4800batalhas.

## Escopo da validação

Foram conferidos DOM acessível, teclado, layout e lógica de avisos. Não foi executado ensaio com NVDA, VoiceOver, dispositivos físicos ou zoom nativo do navegador. Não se declara certificação de conformidade integral. O suporte por tecnologias assistivas reais deve fazer parte da validação em sala.

Sem mudança de regras, permissões ou dados Firebase. A preferência por responsividade e acessibilidade foi registrada no AGENTS.md para as próximas alterações.

## Engrenagem de preferências pessoais

Disponível no login e cabeçalho, com identificação acessível. O painel aceita texto de 100 a 200%, alto contraste claro/escuro, espaçamento de leitura, redução de animações e botões maiores. Cada configuração é validada e salva apenas no localStorage deste navegador, separada por perfil e pelo modo ensaio. Não há gravação de preferências no Firebase. Ao entrar em outro aparelho, os ajustes não são sincronizados.

No primeiro acesso de perfil sem preferência própria, herdar o ajuste usado antes do login permite manter a tela legível. A configuração inicial é registrada para não acompanhar mudanças futuras do visitante. Preferências de outro assento não são herdadas. Se o armazenamento for bloqueado, o ajuste funciona na aba e um aviso explica que não será guardado para a próxima visita. Restaurar padrão é local ao perfil. A redução de movimento do sistema nunca é desativada pelo painel.

O teste de isolamento usou Mesa 1 com 150%/contraste claro e Mesa 2 com 200%/contraste escuro no mesmo navegador. Uma segunda aba do Público manteve seus ajustes quando a Mesa mudou. O reflow com 200%/contraste escuro/espaçamento/alvos maiores foi repetido 5 vezes em 320, 390, 768, 1280 e 1920 px. Campos agora possuem labels explicitamente associados por ID e acompanham a escala de texto, inclusive no celular (32 px em 200%). O cronômetro permanece inteiro, reorganizando a área e limitando a escala visual onde o espaço é pequeno.
