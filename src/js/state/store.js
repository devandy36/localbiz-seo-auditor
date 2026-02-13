const initialState = {
  status: "idle", // idle | loading | error | success
  normalizedUrl: "",
  errorMessage: "",
  result: null,
};

let state = { ...initialState };
const listeners = new Set();

export function getState() {
  return state;
}

export function subscribe(fn) {
  listeners.add(fn);
  fn(state);
  return () => listeners.delete(fn);
}

function setState(partial) {
  state = { ...state, ...partial };
  for (const fn of listeners) fn(state);
}

export function resetToIdle() {
  setState({ ...initialState });
}

export function setLoading(normalizedUrl) {
  setState({
    status: "loading",
    normalizedUrl,
    errorMessage: "",
    result: null,
  });
}

export function setError(message) {
  setState({
    status: "error",
    errorMessage: message || "Algo deu errado. Tente novamente.",
    result: null,
  });
}

export function setSuccess(result) {
  setState({
    status: "success",
    errorMessage: "",
    result,
  });
}
