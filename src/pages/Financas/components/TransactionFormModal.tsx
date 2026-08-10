// pages/Financas/components/TransactionFormModal.tsx
// Mesma lógica resolvida no app mobile: alterna entre "valor total" e "valor
// por parcela" quando o lançamento é parcelado, evitando o bug de o usuário
// digitar o valor da parcela e o sistema tratar como total (dividindo errado).

import { useMemo, useState } from "react";
import type { FinanceStore } from "../useFinance";
import { formatBRL } from "../selectors";
import type { TransactionType } from "../types";

type Props = {
  store: FinanceStore;
  mode: TransactionType;
  onClose: () => void;
};

type Kind = "Única" | "Parcelada" | "Recorrente";

const DUE_DATE_HINT: Record<Kind, string> = {
  Única: "",
  Parcelada: "Vencimento da 1ª parcela. As próximas vencem no mesmo dia dos meses seguintes.",
  Recorrente: "Data da primeira cobrança. As próximas repetem nesse dia, todo mês.",
};

function maskCurrency(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (!digits) return "";
  const cents = parseInt(digits, 10);
  return (cents / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function parseCurrency(masked: string) {
  const digits = masked.replace(/\D/g, "");
  return digits ? parseInt(digits, 10) / 100 : 0;
}
function maskDate(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}
function dateToISO(masked: string) {
  const [dd, mm, yyyy] = masked.split("/");
  return `${yyyy}-${mm}-${dd}`;
}
function isValidDate(masked: string) {
  if (masked.length !== 10) return false;
  const [dd, mm, yyyy] = masked.split("/").map(Number);
  const d = new Date(yyyy, mm - 1, dd);
  return d.getFullYear() === yyyy && d.getMonth() === mm - 1 && d.getDate() === dd;
}

export function TransactionFormModal({ store, mode, onClose }: Props) {
  const income = mode === "INCOME";
  const categories = useMemo(() => store.state.categories.filter((c) => c.type === mode), [store.state.categories, mode]);

  const [person, setPerson] = useState("");
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? "");
  const [amount, setAmount] = useState("");
  const [kind, setKind] = useState<Kind>("Única");
  const [installments, setInstallments] = useState("2");
  const [amountMode, setAmountMode] = useState<"TOTAL" | "PER_INSTALLMENT">("PER_INSTALLMENT");
  const [date, setDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const parsedInstallments = parseInt(installments || "0", 10);
  const parsedAmount = parseCurrency(amount);
  const totalPreview =
    kind === "Parcelada" && amountMode === "PER_INSTALLMENT" && parsedInstallments > 0 ? parsedAmount * parsedInstallments : null;

  async function confirmNewCategory() {
    const trimmed = newCategoryName.trim();
    if (trimmed.length < 2) return;
    const created = await store.addCategory(trimmed, mode);
    setCategoryId(created.id);
    setNewCategoryName("");
    setAddingCategory(false);
  }

  async function submit() {
    if (income && person.trim().length < 2) return setError("Informe quem deve pagar.");
    if (title.trim().length < 2) return setError("Descreva o lançamento.");
    if (parsedAmount <= 0) return setError("Informe um valor maior que zero.");
    if (!isValidDate(date)) return setError("Use o formato dd/mm/aaaa.");
    if (kind === "Parcelada" && (!parsedInstallments || parsedInstallments < 2 || parsedInstallments > 360)) {
      return setError("Entre 2 e 360 parcelas.");
    }

    setError(null);
    setSaving(true);
    try {
      const isPerInstallment = kind === "Parcelada" && amountMode === "PER_INSTALLMENT";
      const totalAmount = isPerInstallment ? parsedAmount * parsedInstallments : parsedAmount;

      await store.addTransaction({
        type: mode,
        title: title.trim(),
        categoryId: categoryId || undefined,
        contactName: income ? person.trim() : undefined,
        totalAmount,
        frequency: kind === "Recorrente" ? "MONTHLY" : "ONCE",
        installments: kind === "Parcelada" ? parsedInstallments : 1,
        startDate: dateToISO(date),
      });
      onClose();
    } catch {
      setError("Não foi possível salvar o lançamento.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fin-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="fin-modal">
        <div className="fin-modal__head">
          <h3>{income ? "Dinheiro a receber" : "Conta a pagar"}</h3>
          <button onClick={onClose}>
            <i className="bx bx-x" />
          </button>
        </div>

        <div className="admin-form-grid">
          {income && (
            <div className="admin-form-field admin-form-field--full">
              <label className="admin-label">Pessoa / cliente</label>
              <input className="input-blog" value={person} onChange={(e) => setPerson(e.target.value)} placeholder="João Silva" />
            </div>
          )}

          <div className="admin-form-field admin-form-field--full">
            <label className="admin-label">Descrição</label>
            <input
              className="input-blog"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={income ? "Divisão do ChatGPT Plus" : "Servidor"}
            />
          </div>

          {categories.length > 0 && (
            <div className="admin-form-field admin-form-field--full">
              <label className="admin-label">Categoria</label>
              <div className="fin-segmented">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    className={`fin-segmented__btn${categoryId === c.id ? " fin-segmented__btn--active" : ""}`}
                    onClick={() => setCategoryId(c.id)}
                    type="button"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!addingCategory ? (
            <button
              type="button"
              onClick={() => setAddingCategory(true)}
              style={{ background: "none", border: "none", color: "#00ffff", fontSize: "0.8rem", cursor: "pointer", padding: 0, textAlign: "left" }}
            >
              <i className="bx bx-plus-circle" /> Nova categoria
            </button>
          ) : (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                className="input-blog"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder={`Categoria de ${income ? "entrada" : "saída"}`}
                autoFocus
              />
              <button className="btn-blog btn-blog--sm" type="button" onClick={confirmNewCategory}>
                <i className="bx bx-check" />
              </button>
              <button className="btn-blog btn-blog--ghost btn-blog--sm" type="button" onClick={() => setAddingCategory(false)}>
                <i className="bx bx-x" />
              </button>
            </div>
          )}

          <div className="admin-form-field admin-form-field--full">
            <label className="admin-label">Tipo</label>
            <div className="fin-segmented">
              {(["Única", "Parcelada", "Recorrente"] as Kind[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  className={`fin-segmented__btn${kind === k ? " fin-segmented__btn--active" : ""}`}
                  onClick={() => setKind(k)}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          {kind === "Parcelada" && (
            <>
              <div className="admin-form-field admin-form-field--full">
                <label className="admin-label">Quantidade de parcelas</label>
                <input
                  className="input-blog"
                  value={installments}
                  onChange={(e) => setInstallments(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  placeholder="6"
                  inputMode="numeric"
                />
              </div>
              <div className="admin-form-field admin-form-field--full">
                <label className="admin-label">O valor digitado é</label>
                <div className="fin-segmented">
                  <button
                    type="button"
                    className={`fin-segmented__btn${amountMode === "PER_INSTALLMENT" ? " fin-segmented__btn--active" : ""}`}
                    onClick={() => setAmountMode("PER_INSTALLMENT")}
                  >
                    Valor de cada parcela
                  </button>
                  <button
                    type="button"
                    className={`fin-segmented__btn${amountMode === "TOTAL" ? " fin-segmented__btn--active" : ""}`}
                    onClick={() => setAmountMode("TOTAL")}
                  >
                    Valor total
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="admin-form-field admin-form-field--full">
            <label className="admin-label">{kind === "Parcelada" && amountMode === "PER_INSTALLMENT" ? "Valor de cada parcela" : "Valor"}</label>
            <input
              className="input-blog"
              value={amount}
              onChange={(e) => setAmount(maskCurrency(e.target.value))}
              placeholder="0,00"
              inputMode="decimal"
            />
            {totalPreview !== null && (
              <small className="admin-hint">Total do parcelamento: {formatBRL(totalPreview)}</small>
            )}
          </div>

          <div className="admin-form-field admin-form-field--full">
            <label className="admin-label">{kind === "Única" ? "Vencimento" : "Primeiro vencimento"}</label>
            <input
              className="input-blog"
              value={date}
              onChange={(e) => setDate(maskDate(e.target.value))}
              placeholder="dd/mm/aaaa"
              inputMode="numeric"
            />
            {DUE_DATE_HINT[kind] && <small className="admin-hint">{DUE_DATE_HINT[kind]}</small>}
          </div>
        </div>

        {error && (
          <div className="financas-alert financas-alert--error" style={{ marginTop: "1rem" }}>
            <i className="bx bx-error-circle" /> {error}
          </div>
        )}

        <div className="admin-form-actions">
          <button className="btn-blog btn-blog--ghost" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-blog" onClick={submit} disabled={saving}>
            <i className={`bx ${saving ? "bx-loader-alt bx-spin" : "bx-save"}`} /> {saving ? "Salvando..." : "Salvar lançamento"}
          </button>
        </div>
      </div>
    </div>
  );
}