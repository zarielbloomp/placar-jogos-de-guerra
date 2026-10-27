# Jogos de Guerra 2026

Placar escolar ao vivo com **controle do professor pelo celular** e **apresentação pública no telão**. Cada combatente representa um aluno; os seis exércitos continuam existindo. O projeto é um único `index.html`, sem build, npm ou dependências locais.

## Links

- Placar: https://zarielbloomp.github.io/placar-jogos-de-guerra/
- Controle do professor: https://zarielbloomp.github.io/placar-jogos-de-guerra/?controle=1
- Telão: https://zarielbloomp.github.io/placar-jogos-de-guerra/?telao=1
- Demonstração isolada: https://zarielbloomp.github.io/placar-jogos-de-guerra/?demo=1&controle=1
- Análise das regras: [PDF](output/pdf/analise-jogos-de-guerra.pdf)

A demonstração usa dados da sessão do navegador e não escreve no Firebase. Os links normais compartilham o mesmo jogo no Firebase: abrir o controle não cria uma partida nova. A demonstração não sincroniza entre aparelhos.

## Preparação do professor

1. No Firebase Authentication, confirme que o provedor e-mail/senha está habilitado e crie as contas dos pontuadores. As senhas nunca vão para o código ou GitHub.
2. Em Realtime Database, revise as regras reais. O arquivo `database.rules.json` é um modelo: substitua os dois UIDs pelos UIDs das contas autorizadas e publique pelo console. Se houver só um editor, repita seu UID. Não publique o modelo com placeholders.
3. Antes do primeiro lance, acesse o controle com uma conta autorizada. Em **Elenco individual e configuração**, ajuste quantidade, nomes de guerra e elenco secreto. Cada linha é um aluno. A configuração inicial mantém os 12 nomes legados por exército; pode variar de 1 a 50 antes do jogo.
4. No telão, abra o link de apresentação, sem login. No celular, use o link de controle e faça login. Ambos precisam de internet. O aviso superior mostra conexão, salvamento e falhas.
5. Se o jogo antigo contiver identidades em lances, use **Remover cópias antigas do estado público**, no aviso do editor. A correção do HTML não apaga sozinha dados já armazenados no Firebase.
6. Faça um ensaio com contas e aparelhos reais antes da aula. A publicação do HTML não configura usuários, permissões ou regras do banco.

## Regras incorporadas

- Defesa total 20; parcial 10/10 e captura; falha com baixa identificada.
- Cair atirando, cartas, vida extra e resgate, preservando os índices antigos de lances.
- Ás de Espadas: escolha do companheiro pelo jogador, conforme interpretação da sugestão autorizada.
- Pelotão: sorteio de até três vivos distintos, até dois alvos escolhidos em sequência pelo rival. Se restarem menos de três, usar os disponíveis.
- Cronômetro local de 30, 90, 45 e 60 segundos; histórico; backup público; recursos com limite; cálculo de saldos e desempate.
- Morte, captura e libertação validam situação e captor. Lances antigos sem combatente identificado geram aviso de conciliação.
- Placar de batalha e classificação com saldos são apresentados separadamente. Empates na premiação impedem pódio automático. Exércitos sem ativos não recebem prêmios; situações especiais com prisioneiros devem ser decididas pela mesa.

## Sigilo e saldo final

- `jg/estado`: placar público, lances, nomes de guerra, revelações e pódio.
- `jg/segredo`: identidade real e função de cada aluno. Só as contas autorizadas devem ler/escrever.
- Login sozinho não libera a mesa: a leitura autorizada do elenco precisa funcionar. As regras do Firebase são a proteção efetiva.
- Registrar baixa não publica identidade ou patente. **Revelar identidade e função** publica explicitamente em `rv`; **Ocultar publicação** retira esse registro público. Não desfaz divulgações já vistas ou copiadas.
- No fechamento, comandante preso ainda oculto exige confirmação para publicar **apenas a patente**, necessária ao saldo de 10 pontos. O nome real não é publicado por essa ação. O próprio valor do saldo pode permitir inferir a patente.
- O modo literal subtrai 5 pontos (10 para CO) da origem, além de contar apenas vivos. A opção alternativa evita a subtração adicional; partidas antigas preservam a configuração. O manual não resolve claramente a interpretação de SUB: inicialmente vale como combatente comum; decisão diferente requer ajuste justificado.

## Sincronização e limitações

O estado usa transação e revisão. Se outro pontuador salvar primeiro, a operação conflitante é recusada e o estado é atualizado: confira e repita a ação. O site não mistura silenciosamente decisões conflitantes. Todos os aparelhos devem usar esta versão; um editor com versão antiga ainda pode sobrescrever dados. O elenco secreto é salvo por campo.

A correção de respostas, rodízio de alvos, escolha de participantes, sorteio geral de ataques, origem de cada carta, transferência após aniquilação, confisco de arsenal, tribunal e avaliação pedagógica continuam sob decisão do professor. O site registra resultados; não é um árbitro automático completo. O cronômetro não aparece sincronizado no telão. O relatório detalha as recomendações restantes.

O backup exporta somente o estado público (incluindo revelações explícitas); recuperação deve ser feita pelo responsável no console, após conferir a estrutura. Não há importador automático de backup nem backup do elenco secreto.

## Desenvolvimento e verificação

Abra `index.html` no navegador, ou sirva a pasta com qualquer servidor estático. Para exercitar a mesa sem banco real, use `?demo=1&controle=1`. O Firebase é carregado por scripts compat 10.12.2.

Teste automatizado sem dependências: `node tests/regras.cjs`. Verificação manual: registrar captura, libertação, morte, vida extra, cartas e pelotão; conferir placar, Memorial, classificação e visualização pública. Os testes simulados não comprovam autorização ou sincronização do banco real.

## Publicação

GitHub Pages: Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save. O arquivo `.nojekyll` permite servir diretamente o projeto estático. O site usa o Firebase existente; mudar a hospedagem não muda os dados.

Não envie senhas, exportações do banco ou identidades reais ao repositório. A configuração Firebase no HTML é pública por natureza; não equivale a credencial administrativa.
