// pages/Financas/views/HistoryView.tsx

import { useMemo, useState } from "react";
import type { FinanceStore } from "../useFinance";
import { buildRows, formatBRL } from "../selectors";
import type { ListRow } from "../types";
import { TransactionDetailModal } from "../components/TransactionDetailModal";

const TYPE_FILTERS = ["Todos", "Entradas", "Saídas"] as const;
const STATUS_FILTERS = ["Todos", "Pendentes", "Atrasados", "Pagos"] as const;

const statusColor = (status: ListRow["status"]) =>
  status === "PAID" ? "#22c55e" : status === "OVERDUE" ? "#ef4444" : "#f59e0b";

function groupByDay(rows: ListRow[], installments: { id: string; dueDate: string; paidAt?: string | null }[]) {
  const byId = new Map(installments.map((i) => [i.id, i]));
  const byKey = new Map<string, ListRow[]>();
  for (const r of rows) {
    const inst = byId.get(r.id);
    const ref = inst?.paidAt ?? inst?.dueDate;
    if (!ref) continue;
    const key = ref.slice(0, 10);
    byKey.set(key, [...(byKey.get(key) ?? []), r]);
  }
  return Array.from(byKey.keys())
    .sort((a, b) => b.localeCompare(a))
    .map((key) => ({
      label: new Date(key).toLocaleDateString("pt-BR", { day: "2-digit", month: "long" }),
      rows: byKey.get(key)!,
    }));
}

export function HistoryView({ store }: { store: FinanceStore }) {
  const { transactions, installments, contacts } = store.state;
  const [typeFilter, setTypeFilter] = useState<(typeof TYPE_FILTERS)[number]>("Todos");
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_FILTERS)[number]>("Todos");
  const [openId, setOpenId] = useState<string | null>(null);

  const allRows = useMemo(() => buildRows(installments, transactions, contacts), [installments, transactions, contacts]);

  const filtered = useMemo(() => {
    return allRows
      .filter((r) => {
        if (typeFilter === "Entradas") return r.type === "INCOME";
        if (typeFilter === "Saídas") return r.type === "EXPENSE";
        return true;
      })
      .filter((r) => {
        if (statusFilter === "Pendentes") return r.status === "PENDING";
        if (statusFilter === "Atrasados") return r.status === "OVERDUE";
        if (statusFilter === "Pagos") return r.status === "PAID";
        return true;
      });
  }, [allRows, typeFilter, statusFilter]);

  const groups = useMemo(() => groupByDay(filtered, installments), [filtered, installments]);

  return (
    <div>
      <div className="fin-filters">
        {TYPE_FILTERS.map((f) => (
          <button key={f} className={`fin-filter-chip${typeFilter === f ? " fin-filter-chip--active" : ""}`} onClick={() => setTypeFilter(f)}>
            {f}
          </button>
        ))}
      </div>
      <div className="fin-filters">
        {STATUS_FILTERS.map((f) => (
          <button key={f} className={`fin-filter-chip${statusFilter === f ? " fin-filter-chip--active" : ""}`} onClick={() => setStatusFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      {groups.length === 0 ? (
        <div className="fin-empty">
          <i className="bx bx-history" />
          <p>Nada por aqui com esse filtro.</p>
        </div>
      ) : (
        groups.map((g) => (
          <div key={g.label} className="fin-day-group">
            <div className="fin-day-head">
              <span>{g.label}</span>
            </div>
            <div className="fin-row-list">
              {g.rows.map((r) => (
                <div key={r.id} className="fin-row" onClick={() => setOpenId(r.transactionId)}>
                  <div className="fin-row__dot" style={{ background: statusColor(r.status) }} />
                  <div className="fin-row__body">
                    <div className="fin-row__title">{r.name}</div>
                    <div className="fin-row__desc">{r.description}</div>
                  </div>
                  <div className="fin-row__right">
                    <div className="fin-row__amount">{formatBRL(r.amount)}</div>
                    <div className="fin-row__status" style={{ color: statusColor(r.status) }}>
                      {r.statusLabel}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {openId && <TransactionDetailModal store={store} transactionId={openId} onClose={() => setOpenId(null)} />}
    </div>
  );
}