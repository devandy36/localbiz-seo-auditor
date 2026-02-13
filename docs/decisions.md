# Decisões técnicas — LocalBiz SEO Auditor

## 1) Separação de responsabilidades
- UI separada da lógica de análise para evitar acoplamento entre DOM e regras.
- Orquestração concentrada em um módulo (analyzer), renderização em ui.js.

## 2) Estado sem framework
- Store simples (subscribe/setState) para padronizar estados: idle/loading/error/success.

## 3) Validação de URL
- Validação com new URL() por confiabilidade.
- Mensagens acessíveis com aria-live e foco no campo.

## 4) Acessibilidade
- Skip-link, status com aria-live e estilos de foco.

## 5) Desenvolvimento incremental
- Sprint 1 focado em UI/estados; extração e APIs entram nos próximos sprints.

## 6) Limitação (CORS)
- Extração de HTML externo no navegador exige proxy (planejado para Sprint 2).
