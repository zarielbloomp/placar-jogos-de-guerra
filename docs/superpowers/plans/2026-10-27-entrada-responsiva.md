# Organização visual da entrada

**Objetivo:** tornar a entrada clara e equilibrada em celular e computador.
**Escopo:** um index.html, sem dependências ou alteração de autenticação/Firebase.
**Direção:** marca e retrato integrados em um painel verde; acesso ao lado no computador e logo abaixo no celular. Créditos destacados no rodapé da composição, sem empurrar o login para baixo. Engrenagem continua no topo.

- [x] Reorganizar apenas loginPage e estilos delimitados à entrada. Manter ações, nomes acessíveis e formulários atuais.
- [x] Conferir entrada sem seleção, Mesa, Público, teclado, contraste e texto a200% em320/390/768/1280/1920px. Não adicionar testes que apenas reproduzem CSS.
- [x] Executar testes existentes de preferências, acessibilidade e autenticação, sintaxe e diff-check. CI completo no PR.
- [ ] Revisar, criar PR descrito, publicar e conferir versão oficial conforme autorização existente. Preservar dados reais.

Validação executada: 45 combinações de estado/largura/contraste/texto sem excesso horizontal, resultados em output/simulacoes/entrada-responsiva.json. Testes de preferências (1.200 combinações), acessibilidade (5 casos), autenticação (6 casos), sintaxe e diff-check aprovados. Revisão independente sem regressões concretas; CI completo e publicação registrados no PR.
