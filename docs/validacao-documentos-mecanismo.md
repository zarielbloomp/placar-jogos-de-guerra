# Validação dos documentos - 27/10/2026

Documentos gerados com ReportLab pela runtime empacotada, após registro de operação PDF. Conferência de conteúdo realizada com o manual original (pp. 2-7), plano autorizado e rótulos/fluxos da interface v3.

| Documento | Páginas | Destino |
| --- | ---: | --- |
| Relatório ao Professor | 2 | `output/pdf/relatorio-professor.pdf` |
| Tutorial detalhado | 5 | `output/pdf/tutorial-jogos-de-guerra.pdf` |
| Adendo atualizado de regras | 1 | `output/pdf/analise-jogos-de-guerra.pdf` |
| Acessos privados | 1 | `output/privado/acessos-professor.pdf` |

As nove páginas foram renderizadas com Poppler e inspecionadas em folha de contato. A revisão corrigiu páginas órfãs no relatório e no documento privado. Resultado final sem cortes, sobreposição ou páginas excedentes. A folha de contato contém credenciais e permanece em `tmp/`, ignorado pelo Git; não publicar.

Os três PDFs públicos foram extraídos novamente com pypdf e comparados com os e-mails e senhas do JSON de acessos privado: nenhuma ocorrência desses valores nos PDFs públicos. O PDF privado lê as credenciais diretamente desse JSON. A inspeção confirma separação dos documentos; não constitui auditoria de segurança do backend.

Conteúdo explícito atualizado após ativação autorizada em 27/10/2026: permissões Firebase publicadas, oito autenticações confirmadas, partida reiniciada com backup integral privado e cadastros vazios. Nova versão preparada para publicação no PR #1; deploy ainda será confirmado no PR pelo responsável. O tutorial descreve Mesa 1-6, Professor 7, Público com senha, 30 segundos seguidos do botão de 90, revisão apenas da última batalha na fase atual e pontuação geral acumulada com saldos após fechar fase. Exceções de pelotão e ações especiais exigem o Professor. Incluídos cadastro de categoria Normal/Especial e arbitragem explícita do Professor para Blitzkrieg parcial.

Gerador: `tmp/v3-docs.py`. Não houve alteração de `index.html` por esta tarefa.

Nova geração após autorização: quatro PDFs regenerados, nove páginas novamente renderizadas com Poppler e inspecionadas em `tmp/pdfs/release-docs-sheet.png`. Rastreio de e-mails e senhas do JSON privado repetido nos PDFs públicos: nenhuma ocorrência. A nova folha de contato também inclui o documento privado e não deve ser publicada.
