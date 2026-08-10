// pages/Financas/components/NoteFormModal.tsx

import { useState } from "react";
import type { FinanceStore } from "../useFinance";
import type { Note } from "../types";

type Props = {
  store: FinanceStore;
  note: Note | null;
  onClose: () => void;
};

export function NoteFormModal({ store, note, onClose }: Props) {
  const isEdit = !!note;
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");
  const [pinned, setPinned] = useState(note?.pinned ?? false);
  const [saving, setSaving] = useState(false);

  async function submit() {
    if (!title.trim() && !content.trim()) return onClose();
    setSaving(true);
    try {
      const payload = { title: title.trim(), content: content.trim(), pinned };
      if (isEdit && note) await store.updateNote(note.id, payload);
      else await store.createNote(payload);
      onClose();
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!note) return;
    if (!confirm("Excluir esta nota? Essa ação não pode ser desfeita.")) return;
    setSaving(true);
    try {
      await store.removeNote(note.id);
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fin-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="fin-modal">
        <div className="fin-modal__head">
          <h3>{isEdit ? "Editar nota" : "Nova nota"}</h3>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <button
              onClick={() => setPinned((p) => !p)}
              style={{
                background: pinned ? "rgba(0,255,255,0.12)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${pinned ? "#00ffff" : "#2e2e2e"}`,
                color: pinned ? "#00ffff" : "#9ca3af",
                borderRadius: "50%",
                width: "2rem",
                height: "2rem",
                cursor: "pointer",
              }}
              title={pinned ? "Desafixar" : "Fixar"}
            >
              <i className="bx bxs-bookmark" style={{ fontSize: "0.9rem" }} />
            </button>
            <button onClick={onClose}>
              <i className="bx bx-x" />
            </button>
          </div>
        </div>

        <input
          className="input-blog"
          style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.75rem" }}
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus={!isEdit}
        />

        <textarea
          className="textarea-blog"
          rows={8}
          placeholder="Escreva sua anotação ou lembrete..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="admin-form-actions">
          {isEdit && (
            <button className="btn-blog btn-blog--danger" onClick={remove} disabled={saving}>
              <i className="bx bx-trash" /> Excluir
            </button>
          )}
          <button className="btn-blog" onClick={submit} disabled={saving}>
            <i className={`bx ${saving ? "bx-loader-alt bx-spin" : "bx-save"}`} /> {saving ? "Salvando..." : "Salvar nota"}
          </button>
        </div>
      </div>
    </div>
  );
}