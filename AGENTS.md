# Instruções para agentes

- O app é um único `index.html`, sem build e sem dependências locais. Mantenha assim.
- Firebase é carregado por `<script>` (SDK compat 10.12.2). Não migre para npm/bundler sem pedido explícito.
- Textos da interface em português do Brasil.
- Compatibilidade de dados: o estado público fica em `jg/estado` e o elenco secreto em `jg/segredo`.
  Ao adicionar campos, trate a ausência deles (lances antigos não os têm). Não remova nem renomeie campos existentes.
- Novos tipos de lance entram no FIM do array `P` (os lances salvos guardam o índice do tipo).
- Nunca exponha dados de `jg/segredo` (identidade real, CO/SUB) na visão pública sem ação explícita do editor.
- Teste: abra o `index.html` no navegador, registre lances em modo editor e confira placar, Memorial e classificação.
- Toda alteração deve passar por um PR bem descrito antes de entrar no site oficial, conforme pedido do responsável. Registre o comportamento, os testes, a ativação de dados/permissões e como reverter. Preserve backups privados fora do Git; reverter código não restaura dados Firebase.
