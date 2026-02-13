function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export async function runMockAudit(normalizedUrl) {
  // simula tempo de auditoria
  await new Promise((r) => setTimeout(r, 700));

  const h = hashString(normalizedUrl);

  const score = clamp(55 + (h % 46), 0, 100); // 55..100
  const seo = clamp(50 + ((h >> 3) % 51), 0, 100);
  const a11y = clamp(45 + ((h >> 5) % 56), 0, 100);
  const perf = clamp(40 + ((h >> 7) % 61), 0, 100);

  const recos = [];

  if (seo < 75) recos.push("Revisar títulos (title) e meta description para intenção local e CTR.");
  if (seo < 70) recos.push("Checar headings (H1/H2) e estrutura semântica das páginas principais.");
  if (a11y < 75) recos.push("Garantir contraste, foco visível e labels/aria em campos de formulário.");
  if (perf < 75) recos.push("Otimizar imagens (compressão + formatos modernos) e evitar scripts pesados.");
  if (score < 80) recos.push("Padronizar canonical, sitemap e robots.txt para reduzir ruído de indexação.");

  if (recos.length === 0) {
    recos.push("Bom começo! Próximo passo: auditoria real com Lighthouse + coleta de dados (Sprint 2).");
  }

  return {
    url: normalizedUrl,
    score,
    seo,
    a11y,
    perf,
    summaries: {
      seo: seo >= 80 ? "Boa base técnica, pequenos ajustes." : "Ajustes importantes no básico técnico.",
      a11y: a11y >= 80 ? "Acessível na maioria dos pontos." : "Há fricções de acessibilidade.",
      perf: perf >= 80 ? "Performance ok no geral." : "Pode ganhar muito com otimização.",
    },
    recommendations: recos,
  };
}

