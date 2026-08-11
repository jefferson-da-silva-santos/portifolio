// pages/Financas/components/ParcelaEditModal.tsx
// Edição manual de uma parcela do consórcio: útil para registrar o valor real
// de cada assembleia (que varia mês a mês) conforme os boletos forem chegando.

import { useState } from "react";
import { consorcioApi } from "../consorcioApi";
import type { ConsorcioParcela } from "../consorcioTypes";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "#NaoPrecisamosDeArmas00#";

type Props = {
  parcela: ConsorcioParcela;
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

export function ParcelaEditModal({ parcela, totalParcelas, onClose, onSaved }: Props) {
  const [valorDevido, setValorDevido] = useState(parcela.valorDevido.toLocaleString("pt-BR", { minimumFractionDigits: 2 }));
  const [dataPagamento, setDataPagamento] = useState(toInputDate(parcela.dataPagamento));
  const [valorPago, setValorPago] = useState(parcela.valorPago ? parcela.valorPago.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) : "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setSaving(true);
    setError(null);
    try {
      const updated = await consorcioApi.updateParcela(ADMIN_PASSWORD, parcela.id, {
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
    <div className="fin-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="fin-modal" style={{ maxWidth: 420 }}>
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