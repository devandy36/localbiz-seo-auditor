// src/js/modules/analyzer.js
// Sprint 1: auditoria simulada (mock) para fechar UI + estados.
// Sprint 2: entra proxy/CORS + extração real e APIs.

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function runAudit(url) {
  // simula tempo de análise
  await new Promise((r) => setTimeout(r, 700));

  const seoSummary = pick([
    "Base aceitável. Ajustar title/meta e hierarquia de headings.",
    "Bom começo. Falta consistência em H1/H2 e links internos.",
    "SEO on-page ok, mas pode melhorar metadados e conteúdo local.",
  ]);

  const a11ySummary = pick([
    "Acessibilidade razoável. Revisar foco e labels.",
    "Boa base. Ajustar contraste e textos alternativos (alt).",
    "Precisa melhorar navegação por teclado e landmarks.",
  ]);

  const perfSummary = pick([
    "Performance pode melhorar: otimizar imagens e cache.",
    "Reduzir scripts e minimizar CSS/JS pode aumentar o score.",
    "Atenção ao carregamento: priorizar conteúdo acima da dobra.",
  ]);

  const checklist = [
    {
      level: "warn",
      title: "Meta description",
      detail: "Criar/ajustar meta description única e descritiva.",
    },
    {
      level: "ok",
      title: "Hierarquia de headings",
      detail: "Manter 1 H1 e organizar subtítulos em H2/H3.",
    },
    {
      level: "warn",
      title: "Imagens com ALT",
      detail: "Adicionar alt descritivo em imagens relevantes.",
    },
    {
      level: "warn",
      title: "Performance",
      detail: "Otimizar imagens (WebP) e reduzir recursos bloqueantes.",
    },
  ];

  return {
    url,
    seo: { score: 74, summary: seoSummary },
    accessibility: { score: 69, summary: a11ySummary },
    performance: { score: 66, summary: perfSummary },
    checklist,
  };
}
