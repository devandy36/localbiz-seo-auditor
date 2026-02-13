// src/js/main.js
import { getUrlErrorMessage, normalizeUrl } from "./utils/validate.js";

/**
 * Elementos do DOM
 */
const form = document.getElementById("auditForm");
const input = document.getElementById("urlInput");
const errorEl = document.getElementById("urlError");
const statusText = document.getElementById("statusText");
const results = document.getElementById("results");

const scorePill = document.getElementById("scorePill");
const seoSummary = document.getElementById("seoSummary");
const a11ySummary = document.getElementById("a11ySummary");
const perfSummary = document.getElementById("perfSummary");
const recoList = document.getElementById("recoList");
const resetBtn = document.getElementById("resetBtn");
const auditButton = document.getElementById("auditButton");

/**
 * Estado simples (Sprint 1)
 */
const state = {
  status: "idle", // idle | loading | success | error
  url: "",
  data: null,
};

/**
 * Helpers de UI
 */
function setStatus(nextStatus, message) {
  state.status = nextStatus;
  if (statusText) statusText.textContent = message || "";
}

function showError(message) {
  if (!errorEl) return;
  errorEl.hidden = !message;
  errorEl.textContent = message || "";
}

function setLoading(isLoading) {
  if (auditButton) auditButton.disabled = isLoading;
  if (input) input.disabled = isLoading;
}

function showResults(visible) {
  if (!results) return;
  results.hidden = !visible;
}

function clearResults() {
  if (scorePill) scorePill.textContent = "Score: --";
  if (seoSummary) seoSummary.textContent = "—";
  if (a11ySummary) a11ySummary.textContent = "—";
  if (perfSummary) perfSummary.textContent = "—";
  if (recoList) recoList.innerHTML = "";
}

function renderRecommendations(items = []) {
  if (!recoList) return;
  recoList.innerHTML = "";

  items.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    recoList.appendChild(li);
  });
}

function renderAuditResult(data) {
  // data: { score, summaries: { seo, a11y, perf }, recommendations: [] }
  const score = typeof data?.score === "number" ? data.score : null;

  if (scorePill) scorePill.textContent = `Score: ${score ?? "--"}`;
  if (seoSummary) seoSummary.textContent = data?.summaries?.seo ?? "—";
  if (a11ySummary) a11ySummary.textContent = data?.summaries?.a11y ?? "—";
  if (perfSummary) perfSummary.textContent = data?.summaries?.perf ?? "—";

  renderRecommendations(Array.isArray(data?.recommendations) ? data.recommendations : []);
}

/**
 * Mock do Sprint 1 (pode substituir no Sprint 2)
 */
async function runMockAudit(url) {
  // pequeno delay só pra mostrar estado "loading"
  await new Promise((r) => setTimeout(r, 650));

  // regra simples só pra variar o resultado
  const hasHttps = url.startsWith("https://");
  const scoreBase = hasHttps ? 78 : 62;

  const score = Math.max(30, Math.min(95, scoreBase + Math.floor(Math.random() * 12)));

  return {
    url,
    score,
    summaries: {
      seo: "Meta title ok. Revisar headings e canonical.",
      a11y: "Boa estrutura. Ajustar contraste e labels em campos.",
      perf: "Imagens podem ser otimizadas. Avaliar lazy-load.",
    },
    recommendations: [
      "Adicionar/validar meta title e meta description únicos por página.",
      "Garantir 1 H1 por página e hierarquia correta de headings.",
      "Otimizar imagens (WebP/AVIF) e reduzir peso acima de 200KB.",
      "Configurar cache (cache-control) para assets estáticos.",
      "Checar contraste e aria-labels/labels em inputs e botões.",
    ],
  };
}

/**
 * Fluxo principal
 */
function resetToIdle() {
  state.status = "idle";
  state.url = "";
  state.data = null;

  setLoading(false);
  showError("");
  clearResults();
  showResults(false);

  setStatus("idle", "Pronto para auditar.");
}

async function handleSubmit(event) {
  event.preventDefault();

  const raw = input?.value ?? "";
  const normalized = normalizeUrl(raw);

  const errorMsg = getUrlErrorMessage(raw);
  if (errorMsg) {
    state.status = "error";
    showError(errorMsg);
    showResults(false);
    clearResults();
    setStatus("error", "Corrija a URL e tente novamente.");
    return;
  }

  // ok
  showError("");
  clearResults();
  showResults(false);

  state.status = "loading";
  state.url = normalized;

  setLoading(true);
  setStatus("loading", "Auditando…");

  try {
    const data = await runMockAudit(normalized);
    state.status = "success";
    state.data = data;

    renderAuditResult(data);
    showResults(true);

    setStatus("success", "Auditoria concluída.");
  } catch (err) {
    state.status = "error";
    showResults(false);
    clearResults();
    showError("Não foi possível executar a auditoria agora.");

    setStatus("error", "Falha ao auditar. Tente novamente.");
  } finally {
    setLoading(false);
  }
}

/**
 * Inicialização
 */
if (!state.status) resetToIdle();
resetToIdle();

form?.addEventListener("submit", handleSubmit);

resetBtn?.addEventListener("click", () => {
  if (input) input.value = "";
  resetToIdle();
});

  