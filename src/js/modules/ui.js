import { resetToIdle } from "../state/store.js";

const $ = (sel) => document.querySelector(sel);

const form = $("#auditForm");
const input = $("#urlInput");
const errorEl = $("#urlError");
const statusText = $("#statusText");
const results = $("#results");
const scorePill = $("#scorePill");

const seoSummary = $("#seoSummary");
const a11ySummary = $("#a11ySummary");
const perfSummary = $("#perfSummary");
const recoList = $("#recoList");

const resetBtn = $("#resetBtn");

export function bindReset() {
  resetBtn?.addEventListener("click", () => {
    if (input) input.value = "";
    resetToIdle();
    input?.focus();
  });
}

export function showFieldError(message) {
  if (!errorEl) return;
  errorEl.textContent = message;
  errorEl.hidden = !message;

  if (message) {
    input?.setAttribute("aria-invalid", "true");
  } else {
    input?.removeAttribute("aria-invalid");
  }
}

export function render(state) {
  const { status, errorMessage, result } = state;

  // erro de validação / app
  showFieldError(status === "error" ? errorMessage : "");

  if (statusText) {
    if (status === "idle") statusText.textContent = "Pronto para auditar.";
    if (status === "loading") statusText.textContent = "Auditando… (mock do Sprint 1)";
    if (status === "error") statusText.textContent = "Corrija a URL e tente novamente.";
    if (status === "success") statusText.textContent = "Auditoria concluída.";
  }

  if (!results) return;

  if (status !== "success" || !result) {
    results.hidden = true;
    if (scorePill) scorePill.textContent = "Score: --";
    return;
  }

  results.hidden = false;

  if (scorePill) scorePill.textContent = `Score: ${result.score}`;

  if (seoSummary) seoSummary.textContent = result.summaries?.seo ?? "—";
  if (a11ySummary) a11ySummary.textContent = result.summaries?.a11y ?? "—";
  if (perfSummary) perfSummary.textContent = result.summaries?.perf ?? "—";

  if (recoList) {
    recoList.innerHTML = "";
    for (const item of result.recommendations ?? []) {
      const li = document.createElement("li");
      li.textContent = item;
      recoList.appendChild(li);
    }
  }
}
