// pages/Financas/components/TransactionListView.tsx
// Componente compartilhado entre ReceivablesView e PayablesView — mesma UI,
// só muda o `type` e os rótulos, igual ao ListScreen do app mobile.

import { useMemo, useState } from "react";
import type { FinanceStore } from "../useFinance";
import { buildMonthSummary, buildRows, formatBRL } from "../selectors";
import type { InstallmentStatus, TransactionType } from "../types";

type Props = {
  store: FinanceStore;
  type: TransactionType;
  title: string;
  doneLabel: string;
  filters: string[];
  onOpenTransaction: (id: string) => void;
};

const matches = (status: InstallmentStatus, filter: string) => {
  switch (filter) {
    case "Todos": return true;
    case "Pendentes": return status === "PENDING";
    case "Atrasados": return status === "OVERDUE";
    case "Recebidos":
    case "Pagos": return status === "PAID";
    default: return true;
  }
};

const statusColor = (status: InstallmentStatus) =>
  status === "PAID" ? "#22c55e" : status === "OVERDUE" ? "#ef4444" : "#f59e0b";

export function TransactionListView({ store, type, title, doneLabel, filters, onOpenTransaction }: Props) {
  const { transactions, installments, contacts } = store.state;
  const [filter, setFilter] = useState(filters[0]);
  const month = useMemo(() => new Date(), []);

  const rows = useMemo(
    () => buildRows(installments, transactions, contacts, type, month),
    [installments, transactions, contacts, type, month]
  );
  const summary = useMemo(() => buildMonthSummary(installments, transactions, month), [installments, transactions, month]);

  const visible = useMemo(() => rows.filter((r) => matches(r.status, filter)), [rows, filter]);

  const total = type === "INCOME" ? summary.receivable : summary.payable;
  const doneValue = type === "INCOME" ? summary.receivedSoFar : summary.paidSoFar;
  const openValue = type === "INCOME" ? summary.openReceivable : summary.openPayable;

  return (
    <div>
      <div className="fin-summary-card fin-summary-card--accent" style={{ marginBottom: "1.25rem" }}>
        <div className="fin-summary-card__label">
          <span>Total previsto — {title}</span>
        </div>
        <div className="fin-summary-card__value">{formatBRL(total)}</div>
        <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.5rem" }}>
          <div>
            <div className="fin-summary-card__hint">{doneLabel}</div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>{formatBRL(doneValue)}</div>
          </div>
          <div>
            <div className="fin-summary-card__hint">Em aberto</div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>{formatBRL(openValue)}</div>
          </div>
        </div>
      </div>

      <div className="fin-filters">
        {filters.map((f) => (
          <button
            key={f}
            className={`fin-filter-chip${filter === f ? " fin-filter-chip--active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="fin-empty">
          <i className="bx bx-inbox" />
          <p>Nada por aqui com esse filtro.</p>
        </div>
      ) : (
        <div className="fin-row-list">
          {visible.map((r) => (
            <div key={r.id} className="fin-row" onClick={() => onOpenTransaction(r.transactionId)}>
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
      )}
    </div>
  );
}