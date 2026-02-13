// src/js/main.js
import { setState, getState } from "./state/store.js";
import { mount } from "./modules/ui.js";
import { runAudit } from "./modules/analyzer.js";
import { normalizeUrl, getUrlErrorMessage } from "./utils/validate.js";

const form = document.getElementById("auditForm");
const input = document.getElementById("url");

function resetToIdle() {
  setState({
    status: "idle",
    url: "",
    error: "",
    report: null,
  });
}

async function handleSubmit(e) {
  e.preventDefault();

  const raw = input?.value ?? "";
  const err = getUrlErrorMessage(raw);

  if (err) {
    setState({ status: "error", error: err, report: null });
    input?.focus();
    return;
  }

  const url = normalizeUrl(raw);

  setState({ status: "loading", url, error: "", report: null });

  try {
    const report = await runAudit(url);
    setState({ status: "success", report, error: "" });
  } catch (error) {
    setState({
      status: "error",
      error: "Falha ao auditar. Tente novamente.",
      report: null,
    });
  }
}

// inicia UI reativa
mount();

// estado inicial (garantia)
if (!getState()?.status) resetToIdle();

// bind submit
form?.addEventListener("submit", handleSubmit);

// botão “Nova auditoria” (se existir no HTML)
const resetBtn = document.getElementById("resetBtn");
resetBtn?.addEventListener("click", () => {
  if (input) input.value = "";
  resetToIdle();
});
  