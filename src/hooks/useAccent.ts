import { useSyncExternalStore } from "react";

// Cor de destaque do site (azul ou laranja). Fica no atributo data-accent do <html>,
// então todas as variáveis --ac* do CSS trocam de uma vez.
export type Accent = "blue" | "orange";
const KEY = "accent";
const listeners = new Set<() => void>();

const read = (): Accent => {
  try {
    return localStorage.getItem(KEY) === "orange" ? "orange" : "blue";
  } catch {
    return "blue";
  }
};

export const applyAccent = (accent: Accent) => {
  document.documentElement.setAttribute("data-accent", accent);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", accent === "orange" ? "#140a02" : "#0b0b0b");
};

let current: Accent = typeof window === "undefined" ? "blue" : read();
if (typeof window !== "undefined") applyAccent(current);

const setAccent = (accent: Accent) => {
  current = accent;
  try {
    localStorage.setItem(KEY, accent);
  } catch {
    /* navegação privada: só não lembra a escolha */
  }
  applyAccent(accent);
  listeners.forEach((l) => l());
};

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

const useAccent = () => {
  const accent = useSyncExternalStore(subscribe, () => current, () => "blue" as Accent);
  const toggleAccent = () => setAccent(accent === "blue" ? "orange" : "blue");
  return { accent, toggleAccent, setAccent };
};

export default useAccent;
