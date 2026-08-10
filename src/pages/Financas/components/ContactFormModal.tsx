// pages/Financas/components/ContactFormModal.tsx

import { useState } from "react";
import type { FinanceStore } from "../useFinance";
import type { Contact } from "../types";

type Props = {
  store: FinanceStore;
  contact: Contact | null;
  onClose: () => void;
};

export function ContactFormModal({ store, contact, onClose }: Props) {
  const isEdit = !!contact;
  const [name, setName] = useState(contact?.name ?? "");
  const [phone, setPhone] = useState(contact?.phone ?? "");
  const [email, setEmail] = useState(contact?.email ?? "");
  const [notes, setNotes] = useState(contact?.notes ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (name.trim().length < 2) {
      setError("Informe o nome da pessoa.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const payload = { name: name.trim(), phone: phone.trim() || undefined, email: email.trim() || undefined, notes: notes.trim() || undefined };
      if (isEdit && contact) await store.updateContact(contact.id, payload);
      else await store.createContact(payload);
      onClose();
    } catch {
      setError("Não foi possível salvar a pessoa.");
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!contact) return;
    if (!confirm(`Remover ${contact.name}? Os compromissos ligados a ela continuam no histórico.`)) return;
    setSaving(true);
    try {
      await store.removeContact(contact.id);
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fin-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="fin-modal">
        <div className="fin-modal__head">
          <h3>{isEdit ? "Editar pessoa" : "Nova pessoa"}</h3>
          <button onClick={onClose}>
            <i className="bx bx-x" />
          </button>
        </div>

        <div className="admin-form-grid">
          <div className="admin-form-field admin-form-field--full">
            <label className="admin-label">Nome</label>
            <input className="input-blog" value={name} onChange={(e) => setName(e.target.value)} placeholder="João Silva" />
          </div>
          <div className="admin-form-field admin-form-field--full">
            <label className="admin-label">Telefone (opcional)</label>
            <input className="input-blog" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(81) 99999-9999" />
            <small className="admin-hint">Usado para cobrar direto pelo WhatsApp.</small>
          </div>
          <div className="admin-form-field admin-form-field--full">
            <label className="admin-label">E-mail (opcional)</label>
            <input className="input-blog" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="joao@email.com" />
          </div>
          <div className="admin-form-field admin-form-field--full">
            <label className="admin-label">Observações (opcional)</label>
            <textarea className="textarea-blog" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
        </div>

        {error && (
          <div className="financas-alert financas-alert--error" style={{ marginTop: "1rem" }}>
            <i className="bx bx-error-circle" /> {error}
          </div>
        )}

        <div className="admin-form-actions">
          {isEdit && (
            <button className="btn-blog btn-blog--danger" onClick={remove} disabled={saving}>
              <i className="bx bx-trash" /> Excluir
            </button>
          )}
          <button className="btn-blog btn-blog--ghost" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-blog" onClick={submit} disabled={saving}>
            <i className={`bx ${saving ? "bx-loader-alt bx-spin" : "bx-save"}`} /> {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}