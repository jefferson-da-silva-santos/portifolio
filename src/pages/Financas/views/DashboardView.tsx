// pages/Financas/views/DashboardView.tsx

import { useMemo, useState } from "react";
import type { FinanceStore } from "../useFinance";
import { buildMonthSummary, nextUpcoming, MONTH_LABEL, shiftMonth, formatBRL, formatSigned } from "../selectors";

export function DashboardView({ store }: { store: FinanceStore }) {
  const { transactions, installments, contacts } = store.state;
  const [month, setMonth] = useState(new Date());

  const summary = useMemo(() => buildMonthSummary(installments, transactions, month), [installments, transactions, month]);
  const upcoming = useMemo(() => nextUpcoming(installments, transactions, contacts, 6), [installments, transactions, contacts]);

  return (
    <div>
      <div className="fin-month-switcher">
        <button onClick={() => setMonth((m) => shiftMonth(m, -1))}>
          <i className="bx bx-chevron-left" />
        </button>
        <span>{MONTH_LABEL(month)}</span>
        <button onClick={() => setMonth((m) => shiftMonth(m, 1))}>
          <i className="bx bx-chevron-right" />
        </button>
      </div>

      <div className="fin-summary-grid">
        <div className="fin-summary-card fin-summary-card--accent">
          <div className="fin-summary-card__label">
            <span>A receber</span>
            <i className="bx bx-down-arrow-circle" />
          </div>
          <div className="fin-summary-card__value">{formatBRL(summary.openReceivable)}</div>
          <div className="fin-summary-card__hint">{summary.pendingReceivables} cobranças pendentes</div>
        </div>

        <div className="fin-summary-card">
          <div className="fin-summary-card__label">
            <span>A pagar</span>
            <i className="bx bx-up-arrow-circle" />
          </div>
          <div className="fin-summary-card__value">{formatBRL(summary.openPayable)}</div>
          <div className="fin-summary-card__hint">{summary.pendingPayables} pendentes</div>
        </div>

        <div className="fin-summary-card">
          <div className="fin-summary-card__label">
            <span>Previsão do mês</span>
            <i className="bx bx-trending-up" />
          </div>
          <div
            className={`fin-summary-card__value ${summary.forecast >= 0 ? "fin-summary-card__value--positive" : "fin-summary-card__value--negative"}`}
          >
            {summary.forecast >= 0 ? "+ " : "− "}
            {formatBRL(Math.abs(summary.forecast))}
          </div>
          <div className="fin-summary-card__hint">entradas − saídas</div>
        </div>
      </div>

      <div className="fin-pills">
        <span className="fin-pill">
          <span className="fin-pill__dot" style={{ background: "#22c55e" }} />
          {summary.incomeCount} entradas
        </span>
        <span className="fin-pill">
          <span className="fin-pill__dot" style={{ background: "#ef4444" }} />
          {summary.expenseCount} saídas
        </span>
        <span className="fin-pill">
          <span className="fin-pill__dot" style={{ background: "#f59e0b" }} />
          {summary.next7DaysCount} em 7 dias
        </span>
        {summary.overdueCount > 0 && (
          <span className="fin-pill fin-pill--danger">
            <span className="fin-pill__dot" style={{ background: "#ef4444" }} />
            {summary.overdueCount} atrasados
          </span>
        )}
      </div>

      <div className="fin-section-head">
        <h3>Próximos compromissos</h3>
      </div>

      {upcoming.length === 0 ? (
        <div className="fin-empty">
          <i className="bx bx-calendar-check" />
          <p>Nenhum compromisso por aqui.</p>
        </div>
      ) : (
        <div className="fin-row-list">
          {upcoming.map((u) => {
            const income = u.type === "INCOME";
            return (
              <div key={u.id} className="fin-row" onClick={() => store.toggleInstallmentPaid(u.id)}>
                <div className="fin-row__icon">
                  <i className={`bx ${income ? "bx-up-arrow-alt" : "bx-down-arrow-alt"}`} style={{ color: income ? "#22c55e" : "#ef4444" }} />
                </div>
                <div className="fin-row__body">
                  <div className="fin-row__title">{u.name}</div>
                  <div className="fin-row__desc">{u.description}</div>
                </div>
                <div className="fin-row__right">
                  <div className="fin-row__amount" style={{ color: income ? "#22c55e" : "#ef4444" }}>
                    {formatSigned(u.amount, u.type)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}