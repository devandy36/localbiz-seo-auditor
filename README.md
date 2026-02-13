chore: finalize README + polish UI
# VisiScan

Auditoria rápida de SEO técnico, acessibilidade e sinais iniciais de performance — feita para quem precisa enxergar problemas óbvios antes de partir para otimizações mais pesadas.

🔗 **Demo (GitHub Pages):** https://devandy36.github.io/localbiz-seo-auditor/

---

## Por que eu fiz esse projeto

Eu queria um projeto de portfólio que parecesse real: interface limpa, fluxo claro, validação bem feita e uma base organizada para evoluir por etapas.

O foco do **Sprint 1** não é “raspar a web” ainda (por causa de CORS e limitações de ambiente), e sim **validar experiência, estados de UI e arquitetura** para a auditoria virar “de verdade” no próximo sprint.

---

## O que este projeto entrega (Sprint 1)

- Formulário de URL com validação usando `new URL()`
- Estados de interface bem definidos: **idle / loading / error / success**
- Feedback acessível (mensagens e foco)
- Layout responsivo (mobile-first)
- Componentes reutilizáveis (cards, botões, badges, etc.)
- Base pronta para plugar a auditoria real via service/proxy no Sprint 2

---

## Como funciona (visão rápida)

1. A pessoa cola uma URL válida (com `https://`)
2. O sistema valida e inicia a “auditoria” (mock no Sprint 1)
3. A interface responde com:
   - **Score geral**
   - **Resumo por categoria** (SEO / A11y / Performance)
   - **Recomendações iniciais**

---

## Tecnologias e organização

- **HTML semântico**
- **CSS (base/layout/components)** separado por responsabilidade
- **JavaScript modular** (módulos por função)
- Estado centralizado simples (store)
- Código pensando em evolução (sprints), não só “passar na tela”

Estrutura (resumo):

- `src/css/` → estilos por camada (base, layout, components)  
- `src/js/` → lógica principal e módulos  
- `docs/` → notas/decisões/roadmap (quando aplicável)

---

## Próximos passos (ideias de evolução)

- Auditoria real via serviço (proxy) para contornar CORS
- Coleta de sinais on-page:
  - título e meta description
  - hierarquia de headings (H1/H2…)
  - imagens sem `alt`
  - links “genéricos” (ex: “clique aqui”)
- Score por categoria com regras transparentes
- Exportar relatório (JSON e/ou PDF simples)
- Histórico local de auditorias (localStorage)

---

## Como rodar localmente

Opção 1: extensão **Live Server** no VS Code  
1. Clique com o botão direito no `index.html`
2. “Open with Live Server”

Opção 2: abrir o `index.html` direto no navegador  
> (para o Sprint 1, funciona bem — o JS é carregado como módulo)

---

## Autor

Desenvolvido por **Andressa Duarte**.  
Projeto de portfólio com foco em estrutura, UI e base técnica para evoluir uma auditoria de SEO local.


