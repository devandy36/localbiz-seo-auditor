visiscan

Aplicação web para auditoria rápida de **SEO técnico**, **acessibilidade** e **sinais iniciais de performance**, com relatório estruturado e recomendações acionáveis.

## Contexto
Este projeto foi desenvolvido para simular um cenário real de diagnóstico de sites de **negócios locais**, onde é necessário identificar rapidamente pontos de melhoria que impactam visibilidade orgânica, experiência do usuário e qualidade técnica.

A solução foi construída de forma incremental (por sprints), priorizando primeiro **estrutura, estados de interface e acessibilidade**, antes de integrar extrações e APIs.

## Funcionalidades (Sprint 1)
- Formulário para entrada de URL com validação
- Estados de interface:
  - `idle` (pronto)
  - `loading` (processando)
  - `error` (falha)
  - `success` (resultado inicial)
- Tratamento de erro com foco no campo e mensagem acessível
- Layout responsivo (mobile-first)
- Base de componentes (cards, alerts, botões, badges)

## Funcionalidades planejadas (próximos sprints)
- Extração on-page:
  - Title, meta description
  - Contagem de H1/H2
  - Imagens sem `alt`
  - Links sem texto/sem contexto
- Checklist e score (0–100) com recomendações automáticas
- Integração com API de performance (ex.: PageSpeed Insights)
- Exportação de relatório (JSON e HTML printável)
- Histórico de análises

## Tecnologias
- HTML5 (semântica e acessibilidade)
- CSS3 (Grid/Flex, responsividade)
- JavaScript (ES6+, módulos, manipulação de DOM)
- Arquitetura por camadas (UI / serviços / estado / utilitários)

## Como executar
1. Clone o repositório:
   `git clone <repo>`
2. Abra o arquivo `index.html` no navegador  
   (recomendado: Live Server no VS Code)

## Estrutura do projeto
- `src/js/state/` estado global do app (store simples)
- `src/js/modules/` UI e orquestração de análise
- `src/js/services/` integrações (Sprint 2+)
- `src/js/utils/` validações e helpers
- `docs/` documentação, prints e decisões

## Decisões técnicas
As decisões principais do projeto estão documentadas em `docs/decisions.md`.

## Evidências
Adicione capturas em `docs/screenshots/` e referencie aqui:
- Interface inicial (Sprint 1)
- Exemplo de erro de validação
- Exemplo de resultado

## Roadmap
O planejamento por etapas está em `docs/roadmap.md`.

## Autor
Desenvolvido por Andressa Duarte.

