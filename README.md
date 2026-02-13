
# VisiScan — SEO Audit (Sprint 1)

VisiScan é uma aplicação web para **auditoria rápida** de **SEO técnico**, **acessibilidade** e sinais iniciais de **performance**.  
A ideia é simples: você informa uma URL e recebe um resumo claro com categorias, score e recomendações.

> Projeto de portfólio — foco em organização, UI/UX, validação, estados de interface e base para evolução (Sprint 2).

---

## Demo

- GitHub Pages: https://devandy36.github.io/VisiScan/

## O que este projeto entrega (Sprint 1)

- **Validação de URL** (com feedback acessível)
- **Estados de UI**: idle / loading / error / success
- **Estrutura semântica** e componentes reutilizáveis
- **Acessibilidade**: foco visível, navegação por teclado, mensagens de status
- **Base pronta** para integrar auditoria real no Sprint 2 (via service/proxy por causa de CORS)

---

## Como funciona (visão rápida)

1. Usuário cola uma URL (ex: `https://exemplo.com`)
2. O sistema valida e inicia a auditoria (mockada no Sprint 1)
3. A interface retorna:
   - **Score geral**
   - **Resumo por categoria** (SEO / A11y / Performance)
   - **Lista de recomendações iniciais**

---

## Tecnologias e escolhas

- **HTML semântico**
- **CSS modular** (base / layout / components)
- **JavaScript (ES Modules)**  
  Estrutura separada por responsabilidade (UI, store, validação, analyzer)

---

## Estrutura do projeto

```txt
/
├─ index.html
├─ src/
│  ├─ css/
│  │  ├─ base.css
│  │  ├─ layout.css
│  │  └─ components.css
│  └─ js/
│     ├─ main.js
│     ├─ modules/
│     │  ├─ ui.js
│     │  └─ analyzer.js
│     ├─ state/
│     │  └─ store.js
│     └─ utils/
│        └─ validate.js
└─ docs/
   └─ roadmap.md
