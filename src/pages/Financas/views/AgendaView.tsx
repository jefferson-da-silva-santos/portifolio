// pages/Financas/views/AgendaView.tsx

import { useMemo, useState } from "react";
import type { FinanceStore } from "../useFinance";
import { buildAgenda, formatSigned } from "../selectors";
import { TransactionDetailModal } from "../components/TransactionDetailModal";

export function AgendaView({ store }: { store: FinanceStore }) {
  const { transactions, installments, contacts } = store.state;
  const [openId, setOpenId] = useState<string | null>(null);

  const agenda = useMemo(() => buildAgenda(installments, transactions, contacts, 14), [installments, transactions, contacts]);

  return (
    <div>
      {agenda.map((day) => (
        <div key={day.id} className="fin-day-group">
          <div className={`fin-day-head${day.highlight ? " fin-day-head--highlight" : ""}`}>
            <span>{day.label}</span>
          </div>

          {day.items.length === 0 ? (
            <div style={{ color: "#5b5b5b", fontSize: "0.82rem", padding: "0.4rem 0" }}>Nenhum compromisso</div>
          ) : (
            <div className="fin-row-list">
              {day.items.map((i) => {
                const income = i.type === "INCOME";
                return (
                  <div key={i.id} className="fin-row" onClick={() => setOpenId(i.transactionId)}>
                    <div className="fin-row__icon">
                      <i
                        className={`bx ${income ? "bx-up-arrow-alt" : "bx-down-arrow-alt"}`}
                        style={{ color: income ? "#22c55e" : "#ef4444" }}
                      />
                    </div>
                    <div className="fin-row__body">
                      <div className="fin-row__title">{i.name}</div>
                      <div className="fin-row__desc">{i.description}</div>
                    </div>
                    <div className="fin-row__right">
                      <div className="fin-row__amount" style={{ color: income ? "#22c55e" : "#ef4444" }}>
                        {formatSigned(i.amount, i.type)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}

      {openId && <TransactionDetailModal store={store} transactionId={openId} onClose={() => setOpenId(null)} />}
    </div>
  );
}