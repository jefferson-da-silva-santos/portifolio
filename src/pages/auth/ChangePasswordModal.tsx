// pages/auth/ChangePasswordModal.tsx
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { BASE_API } from "../Blog";

export function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const { authFetch, logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  async function submit() {
    if (newPassword.length < 8) return setError("A nova senha precisa ter ao menos 8 caracteres.");
    if (newPassword !== confirmPassword) return setError("As senhas não coincidem.");
    setSaving(true);
    setError(null);
    try {
      const res = await authFetch(`${BASE_API}/api/auth/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Erro ao trocar senha."); return; }
      setSuccess(true);
      setTimeout(() => logout(), 1500);
    } catch {
      setError("Não foi possível conectar ao servidor.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fin-modal-overlay fin-modal-overlay--sheet" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="fin-modal fin-modal--sheet" style={{ maxWidth: 400 }}>
        <div className="fin-modal__grabber" />
        <div className="fin-modal__head">
          <h3>Trocar senha</h3>
          <button onClick={onClose}><i className="bx bx-x" /></button>
        </div>

        {success ? (
          <div className="financas-alert" style={{ borderColor: "rgba(34,197,94,0.35)", color: "#86efac" }}>
            <i className="bx bx-check-circle" /> Senha alterada! Redirecionando para o login...
          </div>
        ) : (
          <>
            <div className="admin-form-grid">
              <div className="admin-form-field admin-form-field--full">
                <label className="admin-label">Senha atual</label>
                <input type="password" className="input-blog" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} autoComplete="current-password" />
              </div>
              <div className="admin-form-field admin-form-field--full">
                <label className="admin-label">Nova senha</label>
                <input type="password" className="input-blog" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} autoComplete="new-password" />
              </div>
              <div className="admin-form-field admin-form-field--full">
                <label className="admin-label">Confirmar nova senha</label>
                <input type="password" className="input-blog" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" />
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
                <i className={`bx ${saving ? "bx-loader-alt bx-spin" : "bx-save"}`} /> {saving ? "Salvando..." : "Salvar nova senha"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}