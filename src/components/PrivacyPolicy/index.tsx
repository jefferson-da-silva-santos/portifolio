import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { OWNER, PRIVACY_UPDATED_AT } from "../../consts/legal";

// Aviso de privacidade exigido pela LGPD (Lei 13.709/2018, art. 9º) e pelo
// Marco Civil da Internet (Lei 12.965/2014, art. 7º, VIII).
interface PrivacyPolicyProps {
  open: boolean;
  onClose: () => void;
  theme: string;
}

const SECTIONS = ["data", "purpose", "basis", "sharing", "retention", "rights", "storage"] as const;

const PrivacyPolicy = ({ open, onClose, theme }: PrivacyPolicyProps) => {
  const { t, i18n } = useTranslation();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const updated = new Date(`${PRIVACY_UPDATED_AT}T12:00:00`).toLocaleDateString(i18n.language);

  return (
    <div className="privacy-overlay" onClick={onClose}>
      <div
        className={`privacy-dialog privacy-dialog--${theme}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header>
          <h2 id="privacy-title">{t("privacy.title")}</h2>
          <button ref={closeRef} type="button" onClick={onClose} aria-label={t("privacy.close")}>
            <i className="bx bx-x" aria-hidden="true" />
          </button>
        </header>
        <div className="privacy-body">
          <p>{t("privacy.intro", { name: OWNER.name })}</p>
          {SECTIONS.map((key) => (
            <section key={key}>
              <h3>{t(`privacy.sections.${key}.title`)}</h3>
              <p>{t(`privacy.sections.${key}.text`)}</p>
            </section>
          ))}
          <section>
            <h3>{t("privacy.sections.contact.title")}</h3>
            <p>
              {OWNER.name}
              {OWNER.document && ` · ${OWNER.document}`} · {OWNER.city}
              <br />
              <a href={`mailto:${OWNER.email}`}>{OWNER.email}</a>
            </p>
          </section>
          <p className="privacy-updated">{t("privacy.updated", { date: updated })}</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
