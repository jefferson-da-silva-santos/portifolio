// pages/Financas/components/ParcelaEditModal.tsx
import { useMemo, useState } from "react";
import { createConsorcioApi } from "../consorcioApi";
import type { ConsorcioParcela } from "../consorcioTypes";

type AuthFetch = (input: string, init?: RequestInit) => Promise<Response>;

type Props = {
  parcela: ConsorcioParcela;
  authFetch: AuthFetch;
  totalParcelas: number;
  onClose: () => void;
  onSaved: (p: ConsorcioParcela) => void;
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
function toInputDate(iso?: string | null) {
  return iso ? iso.slice(0, 10) : "";
}

export function ParcelaEditModal({ parcela, authFetch, totalParcelas, onClose, onSaved }: Props) {
  const api = useMemo(() => createConsorcioApi(authFetch), [authFetch]);

  const [valorDevido, setValorDevido] = useState(parcela.valorDevido.toLocaleString("pt-BR", { minimumFractionDigits: 2 }));
  const [dataPagamento, setDataPagamento] = useState(toInputDate(parcela.dataPagamento));
  const [valorPago, setValorPago] = useState(parcela.valorPago ? parcela.valorPago.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) : "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setSaving(true);
    setError(null);
    try {
      const updated = await api.updateParcela(parcela.id, {
        valorDevido: parseCurrency(valorDevido),
        dataPagamento: dataPagamento || null,
        valorPago: valorPago ? parseCurrency(valorPago) : null,
      });
      onSaved(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar parcela.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fin-modal-overlay fin-modal-overlay--sheet" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="fin-modal fin-modal--sheet" style={{ maxWidth: 420 }}>
        <div className="fin-modal__grabber" />
        <div className="fin-modal__head">
          <h3>Parcela {parcela.numero}/{totalParcelas}</h3>
          <button onClick={onClose}>
            <i className="bx bx-x" />
          </button>
        </div>

        <div className="admin-form-grid">
          <div className="admin-form-field admin-form-field--full">
            <label className="admin-label">Valor devido (assembleia)</label>
            <input className="input-blog" value={valorDevido} onChange={(e) => setValorDevido(maskCurrency(e.target.value))} />
          </div>
          <div className="admin-form-field admin-form-field--full">
            <label className="admin-label">Data do pagamento (deixe vazio se ainda não pago)</label>
            <input type="date" className="input-blog" value={dataPagamento} onChange={(e) => setDataPagamento(e.target.value)} />
          </div>
          <div className="admin-form-field admin-form-field--full">
            <label className="admin-label">Valor pago</label>
            <input className="input-blog" value={valorPago} onChange={(e) => setValorPago(maskCurrency(e.target.value))} placeholder="0,00" />
          </div>
        </div>

        {error && (
          <div className="financas-alert financas-alert--error" style={{ marginTop: "1rem" }}>
            <i className="bx bx-error-circle" /> {error}
          </div>
        )}

        <div className="admin-form-actions">
          <button className="btn-blog btn-blog--ghost" onClick={onClose}>Cancelar</button>
          <button className="btn-blog" onClick={submit} disabled={saving}>
            <i className={`bx ${saving ? "bx-loader-alt bx-spin" : "bx-save"}`} /> {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}