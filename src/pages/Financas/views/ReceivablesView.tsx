// pages/Financas/views/ReceivablesView.tsx

import { useState } from "react";
import type { FinanceStore } from "../useFinance";
import { TransactionListView } from "../components/TransactionListView";
import { TransactionDetailModal } from "../components/TransactionDetailModal";

export function ReceivablesView({ store }: { store: FinanceStore }) {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <>
      <TransactionListView
        store={store}
        type="INCOME"
        title="A receber"
        doneLabel="Recebido"
        filters={["Todos", "Pendentes", "Atrasados", "Recebidos"]}
        onOpenTransaction={setOpenId}
      />
      {openId && <TransactionDetailModal store={store} transactionId={openId} onClose={() => setOpenId(null)} />}
    </>
  );
}