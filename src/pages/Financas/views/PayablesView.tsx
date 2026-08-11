// pages/Financas/views/PayablesView.tsx

import { useState } from "react";
import type { FinanceStore } from "../useFinance";
import { TransactionListView } from "../components/TransactionListView";
import { TransactionDetailModal } from "../components/TransactionDetailModal";

export function PayablesView({ store, password }: { store: FinanceStore; password: string }) {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <>
      <TransactionListView
        store={store}
        type="EXPENSE"
        title="A pagar"
        doneLabel="Pago"
        filters={["Todos", "Pendentes", "Atrasados", "Pagos"]}
        onOpenTransaction={setOpenId}
      />
      {openId && <TransactionDetailModal store={store} password={password} transactionId={openId} onClose={() => setOpenId(null)} />}
    </>
  );
}