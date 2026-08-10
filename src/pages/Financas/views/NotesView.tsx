// pages/Financas/views/NotesView.tsx

import { useMemo, useState } from "react";
import type { FinanceStore } from "../useFinance";
import type { Note } from "../types";
import { NoteFormModal } from "../components/NoteFormModal";

function relativeLabel(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "agora";
  if (diffMin < 60) return `há ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `há ${diffH}h`;
  const diffD = Math.floor(diffH / 24);
  if (diffD === 1) return "ontem";
  if (diffD < 7) return `há ${diffD} dias`;
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

export function NotesView({ store }: { store: FinanceStore }) {
  const { notes } = store.state;
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Note | null | "new">(null);

  const list = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return notes;
    return notes.filter((n) => n.title.toLowerCase().includes(term) || n.content.toLowerCase().includes(term));
  }, [search, notes]);

  async function togglePin(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    await store.togglePinNote(id);
  }

  return (
    <div>
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        <div className="blog-search" style={{ flex: 1, minWidth: 220 }}>
          <i className="bx bx-search" />
          <input placeholder="Pesquisar notas..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <button className="btn-blog" onClick={() => setEditing("new")}>
          <i className="bx bx-plus" /> Nova nota
        </button>
      </div>

      {list.length === 0 ? (
        <div className="fin-empty">
          <i className="bx bx-note" />
          <p>{notes.length === 0 ? "Nenhuma nota ainda." : "Nenhuma nota encontrada."}</p>
        </div>
      ) : (
        <div className="fin-notes-grid">
          {list.map((n) => (
            <div key={n.id} className={`fin-note-card${n.pinned ? " fin-note-card--pinned" : ""}`} onClick={() => setEditing(n)}>
              <button className={`fin-note-card__pin${n.pinned ? " fin-note-card__pin--active" : ""}`} onClick={(e) => togglePin(e, n.id)}>
                <i className="bx bxs-bookmark" />
              </button>
              <div className="fin-note-card__title">{n.title || "Sem título"}</div>
              {n.content && <div className="fin-note-card__content">{n.content}</div>}
              <div className="fin-note-card__date">{relativeLabel(n.updatedAt)}</div>
            </div>
          ))}
        </div>
      )}

      {editing && <NoteFormModal store={store} note={editing === "new" ? null : editing} onClose={() => setEditing(null)} />}
    </div>
  );
}