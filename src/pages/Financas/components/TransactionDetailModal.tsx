// pages/Financas/components/TransactionDetailModal.tsx
import { useEffect, useState } from "react";
import { FinanceApiError } from "../api";
import type { FinanceStore } from "../useFinance";
import { formatBRL } from "../selectors";
import type { Installment, Transaction } from "../types";

type Props = {
  store: FinanceStore;
  transactionId: string;
  onClose: () => void;
};

const statusInfo = (status: Installment["status"]) =>
  status === "PAID"
    ? { color: "#22c55e", label: "Paga" }
    : status === "OVERDUE"
      ? { color: "#ef4444", label: "Atrasada" }
      : status === "CANCELLED"
        ? { color: "#5b5b5b", label: "Cancelada" }
        : { color: "#f59e0b", label: "Pendente" };

export function TransactionDetailModal({ store, transactionId, onClose }: Props) {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const contact = transaction?.contactId ? store.state.contacts.find((c) => c.id === transaction.contactId) : undefined;

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await store.api.getTransactionDetail(transactionId);
      setTransaction(data.transaction);
      setInstallments(data.installments);
    } catch (err) {
      setError(err instanceof FinanceApiError ? err.message : "Erro ao carregar detalhe.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionId]);

  async function toggle(id: string) {
    setBusy(true);
    try {
      await store.toggleInstallmentPaid(id);
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function whatsapp() {
    if (!contact?.phone || !transaction) return;
    const next = installments.find((i) => i.status !== "PAID") ?? installments[installments.length - 1];
    const msg =
      `Olá, ${contact.name}! Tudo bem?\n\n` +
      `Passando para lembrar da parcela referente à ${transaction.title.toLowerCase()}.\n\n` +
      `Valor: ${formatBRL(next?.amount ?? transaction.totalAmount)}\n` +
      `Vencimento: ${next ? new Date(next.dueDate).toLocaleDateString("pt-BR") : "-"}\n\nObrigado!`;
    const phone = contact.phone.replace(/\D/g, "");
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  async function confirmDelete() {
    if (!confirm("Excluir esta cobrança? Todas as parcelas serão removidas. Essa ação não pode ser desfeita.")) return;
    setBusy(true);
    try {
      await store.removeTransaction(transactionId);
      onClose();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fin-modal-overlay fin-modal-overlay--sheet" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="fin-modal fin-modal--sheet">
        <div className="fin-modal__grabber" />
        <div className="fin-modal__head">
          <h3>Detalhes da cobrança</h3>
          <button onClick={onClose}>
            <i className="bx bx-x" />
          </button>
        </div>

        {loading && (
          <div className="fin-empty">
            <i className="bx bx-loader-alt bx-spin" />
            <p>Carregando...</p>
          </div>
        )}

        {error && (
          <div className="financas-alert financas-alert--error">
            <i className="bx bx-error-circle" /> {error}
          </div>
        )}

        {!loading && transaction && (
          <>
            <div style={{ marginBottom: "1.25rem" }}>
              {contact && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                  <div className="fin-contact-card__avatar" style={{ width: 30, height: 30, fontSize: "0.72rem" }}>
                    {contact.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span style={{ color: "#e5e5e5", fontSize: "0.85rem" }}>{contact.name}</span>
                </div>
              )}
              <div style={{ color: "#9ca3af", fontSize: "0.8rem", marginBottom: "0.2rem" }}>{transaction.title}</div>
              <div style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 700 }}>{formatBRL(transaction.totalAmount)}</div>
              <div style={{ color: "#9ca3af", fontSize: "0.82rem", marginTop: "0.2rem" }}>
                {installments.length > 1
                  ? `${installments.length}x de ${formatBRL(installments[0]?.amount ?? 0)}`
                  : formatBRL(installments[0]?.amount ?? transaction.totalAmount)}
              </div>
            </div>

            <div className="fin-pills">
              <span className="fin-pill">
                <span className="fin-pill__dot" style={{ background: "#22c55e" }} />
                {installments.filter((i) => i.status === "PAID").length} pagas
              </span>
              <span className="fin-pill">
                <span className="fin-pill__dot" style={{ background: "#ef4444" }} />
                {installments.filter((i) => i.status === "OVERDUE").length} atrasadas
              </span>
              <span className="fin-pill">
                <span className="fin-pill__dot" style={{ background: "#f59e0b" }} />
                {installments.filter((i) => i.status === "PENDING").length} pendentes
              </span>
            </div>

            <h4 style={{ color: "#fff", fontSize: "0.9rem", margin: "1.25rem 0 0.75rem" }}>Parcelas</h4>

            <div className="fin-installments">
              {installments.map((p) => {
                const st = statusInfo(p.status);
                return (
                  <div key={p.id} className="fin-installment-row" onClick={() => !busy && toggle(p.id)}>
                    <div className="fin-installment-row__dot" style={{ background: st.color }} />
                    <div className="fin-installment-row__body">
                      <div className="fin-installment-row__title">
                        Parcela {p.installmentNumber}/{p.totalInstallments}
                      </div>
                      <div className="fin-installment-row__due">
                        Vencimento {new Date(p.dueDate).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                    <div className="fin-installment-row__right">
                      <div className="fin-installment-row__amount">{formatBRL(p.amount)}</div>
                      <div className="fin-installment-row__status" style={{ color: st.color }}>
                        {st.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
              {transaction.type === "INCOME" && contact?.phone && (
                <button className="btn-blog btn-blog--ghost" onClick={whatsapp}>
                  <i className="bx bxl-whatsapp" /> Cobrar no WhatsApp
                </button>
              )}
              <button className="btn-blog btn-blog--danger" onClick={confirmDelete} disabled={busy}>
                <i className="bx bx-trash" /> Excluir cobrança
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}