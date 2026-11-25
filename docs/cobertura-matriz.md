# Cobertura da matriz

`tests/cenarios-matriz.cjs` executa testes do motor e do controlador com transações simuladas. Os nomes incluem os IDs da matriz; os testes agrupados F6 a F8 cobrem os três bônus. O teste L4 usa duas sessões e uma transação simulada compartilhada.

A matriz original antecede mudanças do próprio site: B6 agora é verificado como implementado. F1, G10 (exceto fogo amigo parcial), H7, J5, J9, K1, K2, L1 e L2 permanecem como `SKIP` com motivo. Testes dos cenários parciais comprovam o comportamento disponível, não o fluxo completo descrito no manual; as diferenças observadas estão em `divergencias-matriz.md`.

A5, G1, G3, G7, G9 e K5 descrevem atos físicos ou nenhuma ação no software; não há evento do site a simular. T01 pressupõe outras cores, mas a regra da casa limita esta final a Preto e Amarelo. As partes indisponíveis de T10, T17, T22–T23, T27, T30, T32, T38–T44 permanecem sujeitas às lacunas e decisões registradas na matriz; os testes não transformam essas partes em funcionalidades completas.

Os testes existentes das demais suítes continuam registrados no simulador, inclusive os de votação simultânea e sessões múltiplas. Cada execução é local e usa dados fictícios.
