// pages/Financas/views/CategoriesView.tsx

import { useMemo, useState } from "react";
import type { FinanceStore } from "../useFinance";
import type { TransactionType } from "../types";

export function CategoriesView({ store }: { store: FinanceStore }) {
  const { categories } = store.state;
  const [kind, setKind] = useState<TransactionType>("INCOME");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const list = useMemo(() => categories.filter((c) => c.type === kind), [categories, kind]);

  async function submit() {
    const trimmed = name.trim();
    if (trimmed.length < 2) return;
    if (list.some((c) => c.name.toLowerCase() === trimmed.toLowerCase())) {
      setError("Essa categoria já foi cadastrada.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await store.addCategory(trimmed, kind);
      setName("");
    } catch {
      setError("Não foi possível criar a categoria.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string, label: string) {
    if (!confirm(`Remover "${label}"?`)) return;
    await store.removeCategory(id);
  }

  return (
    <div>
      <div className="fin-segmented" style={{ marginBottom: "1.25rem" }}>
        <button
          className={`fin-segmented__btn${kind === "INCOME" ? " fin-segmented__btn--active" : ""}`}
          onClick={() => setKind("INCOME")}
        >
          Entrada
        </button>
        <button
          className={`fin-segmented__btn${kind === "EXPENSE" ? " fin-segmented__btn--active" : ""}`}
          onClick={() => setKind("EXPENSE")}
        >
          Saída
        </button>
      </div>

      <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1.25rem" }}>
        <input
          className="input-blog"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nova categoria"
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />
        <button className="btn-blog" onClick={submit} disabled={saving}>
          <i className="bx bx-plus" />
        </button>
      </div>

      {error && (
        <div className="financas-alert financas-alert--error">
          <i className="bx bx-error-circle" /> {error}
        </div>
      )}

      <div className="fin-row-list">
        {list.map((c) => (
          <div key={c.id} className="fin-row" style={{ cursor: "default" }}>
            <div className="fin-row__icon">
              <i className="bx bx-purchase-tag-alt" style={{ color: "#00ffff" }} />
            </div>
            <div className="fin-row__body">
              <div className="fin-row__title">{c.name}</div>
            </div>
            <button
              onClick={() => remove(c.id, c.name)}
              style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: "1.1rem" }}
              title="Excluir"
            >
              <i className="bx bx-trash" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}