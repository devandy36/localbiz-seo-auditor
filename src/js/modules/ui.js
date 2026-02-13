// src/js/modules/ui.js
import { getUrlErrorMessage, normalizeUrl } from "../utils/validate.js";

export function bindUI({ onSubmit }) {
  const form = document.querySelector("#auditForm");
  const urlInput = document.querySelector("#url");
  const errorEl = document.querySelector("#errorMessage");
  const resultsEl = document.querySelector("#results");

  const btn = document.querySelector("#runAudit");
  const statusPill = document.querySelector("#statusPill");

  function setError(message) {
    if (!errorEl) return;
    errorEl.textContent = message || "";
    errorEl.hidden = !message;
  }

  function setStatus(status) {
    if (!statusPill) return;
    statusPill.textContent =
      status === "loading"
        ? "Analisando…"
        : status === "success"
        ? "Concluído"
        : status === "error"
        ? "Erro"
        : "Pronto";
  }

  function setButtonLoading(isLoading) {
    if (!btn) return;
    btn.disabled = isLoading;
    btn.textContent = isLoading ? "Auditando…" : "Auditar";
  }

  function showResults(show) {
    if (!resultsEl) return;
    resultsEl.hidden = !show;
  }

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const raw = urlInput?.value ?? "";
    const normalized = normalizeUrl(raw);
    const msg = getUrlErrorMessage(raw);

    if (msg) {
      setError(msg);
      showResults(false);
      return;
    }

    setError("");
    setStatus("loading");
    setButtonLoading(true);

    try {
      await onSubmit(normalized);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError("Falha ao auditar. Tente novamente.");
      throw err;
    } finally {
      setButtonLoading(false);
    }
  });

  // helpers que o main.js vai usar
  return {
    setError,
    setStatus,
    setButtonLoading,
    showResults,
  };
}

export function renderResults(results) {
  // resultados resumidos
  const seoSummary = document.querySelector("#seoSummary");
  const allySummary = document.querySelector("#allySummary");
  const perfSummary = document.querySelector("#perfSummary");

  if (seoSummary) seoSummary.textContent = results?.seo?.summary ?? "—";
  if (allySummary) allySummary.textContent = results?.a11y?.summary ?? "—";
  if (perfSummary) perfSummary.textContent = results?.perf?.summary ?? "—";

  // lista de recomendações
  const list = document.querySelector("#recommendations");
  if (list) {
    list.innerHTML = "";
    const items = results?.recommendations ?? [];
    for (const r of items) {
      const li = document.createElement("li");
      li.textContent = r;
      list.appendChild(li);
    }
  }
}
