# Responsividade e acessibilidade

Pedido do responsável: celular, computador e telão acessíveis. Revisão técnica, sem promessa de certificação ou cobertura universal de tecnologias assistivas.

1. Testar teclado de confirmação e continuidade do foco sob renderizações. Corrigir foco inicial seguro (Cancelar), confinamento Tab/Shift+Tab, Escape e retorno ao acionador. Fundo inerte durante confirmação.
2. Landmarks main e atalho Pular para conteúdo. Restaurar foco de botões, campos e summaries após snapshots. Avisos de leitor de tela persistentes e deduplicados, sem anunciar o cronômetro a cada segundo.
3. Contraste de texto e campos; toque mínimo44px; formulários16px no celular; reflow de320px, texto longo, zoom200% e orientação horizontal. Cinemática respeita redução de movimento, não rouba foco e é dispensada ao navegar com Tab/Escape.
4. Suítes existentes mais testes de comportamento de foco/avisos. Navegador em frame real320/390/768/1280/1920 de ensaio, com dados fictícios. Revisão visual e teclado, sem alterar partida real.
5. PR descritivo, CI e deploy autorizado. Sem regras Firebase, reset ou mudança no formato do jogo. Reversão pelo PR para bd7618166a17aa1fcada8e2ae8f9f6fc9ad69512.
