// pages/Financas/views/ContactsView.tsx

import { useMemo, useState } from "react";
import type { FinanceStore } from "../useFinance";
import { buildContactSummaries, formatBRL } from "../selectors";
import { ContactFormModal } from "../components/ContactFormModal";
import type { Contact } from "../types";

export function ContactsView({ store }: { store: FinanceStore }) {
  const { contacts, transactions, installments } = store.state;
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Contact | null | "new">(null);

  const summaries = useMemo(() => buildContactSummaries(contacts, transactions, installments), [contacts, transactions, installments]);

  const list = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return summaries;
    return summaries.filter((c) => c.name.toLowerCase().includes(term) || c.description.toLowerCase().includes(term));
  }, [search, summaries]);

  return (
    <div>
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        <div className="blog-search" style={{ flex: 1, minWidth: 220 }}>
          <i className="bx bx-search" />
          <input placeholder="Buscar pessoa, descrição..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <button className="btn-blog" onClick={() => setEditing("new")}>
          <i className="bx bx-user-plus" /> Nova pessoa
        </button>
      </div>

      {list.length === 0 ? (
        <div className="fin-empty">
          <i className="bx bx-group" />
          <p>{contacts.length === 0 ? "Nenhuma pessoa cadastrada ainda." : "Nenhuma pessoa encontrada."}</p>
        </div>
      ) : (
        <div className="fin-contacts-grid">
          {list.map((c) => (
            <div key={c.id} className="fin-contact-card" onClick={() => setEditing(c)}>
              <div className="fin-contact-card__head">
                <div className="fin-contact-card__avatar">{c.name.slice(0, 2).toUpperCase()}</div>
                <div style={{ minWidth: 0 }}>
                  <div className="fin-contact-card__name">{c.name}</div>
                  <div className="fin-contact-card__desc">{c.description}</div>
                </div>
              </div>
              <div className="fin-contact-card__stats">
                <div className="fin-contact-card__stat">
                  <span className="fin-contact-card__stat-label">Pendente</span>
                  <span className="fin-contact-card__stat-value" style={{ color: "#f59e0b" }}>
                    {formatBRL(c.pending)}
                  </span>
                </div>
                <div className="fin-contact-card__stat">
                  <span className="fin-contact-card__stat-label">Recebido</span>
                  <span className="fin-contact-card__stat-value" style={{ color: "#22c55e" }}>
                    {formatBRL(c.received)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <ContactFormModal
          store={store}
          contact={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}