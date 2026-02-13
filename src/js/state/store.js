// src/js/state/store.js
const state = {
  status: "idle", // idle | loading | success | error
  url: "",
  error: "",
  report: null,
};

const listeners = new Set();

export function getState() {
  return { ...state };
}

export function setState(patch) {
  Object.assign(state, patch);
  listeners.forEach((fn) => fn(getState()));
}

export function subscribe(fn) {
  listeners.add(fn);
  // dispara um snapshot inicial
  fn(getState());
  return () => listeners.delete(fn);
}

