import { useRef } from "react";
import type { PointerEvent } from "react";
import { useTranslation } from "react-i18next";
import useTheme from "../../hooks/useTheme";
import { OWNER } from "../../consts/legal";
import foto from "../../assets/image/jeff-contact.webp";

const LINKEDIN = "https://www.linkedin.com/in/jefferson-santos-a87b74277/";

// Cartão de contato: inclina em 3D e tem um brilho holográfico que segue o mouse
const ContactCard = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width; // 0..1
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${((x - 0.5) * 16).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${((0.5 - y) * 14).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
    el.classList.add("is-active");
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.classList.remove("is-active");
  };

  const whatsapp = `${OWNER.whatsappUrl}?text=${encodeURIComponent(t("contactCard.whatsappMessage"))}`;

  return (
    <div className={`ccard-wrap ccard--${theme}`}>
      <div className="ccard-glow" aria-hidden="true" />
      <div ref={ref} className="ccard" onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className="ccard-photo">
          <img src={foto} alt={t("contactCard.photoAlt")} loading="lazy" width={720} height={843} />
          <span className="ccard-brand" aria-hidden="true">
            ‹ <b>J</b>eff /›
          </span>
        </div>

        <div className="ccard-body">
          <h3 className="ccard-name">{OWNER.name.replace(" da Silva", "")}</h3>
          <p className="ccard-role">{t("contactCard.role")}</p>

          <ul className="ccard-info">
            <li>
              <i className="bx bx-map" aria-hidden="true" />
              {OWNER.city}
            </li>
            <li>
              <i className="bx bx-time-five" aria-hidden="true" />
              {t("contactCard.reply")}
            </li>
          </ul>

          <div className="ccard-actions">
            <a className="ccard-btn ccard-btn--wpp" href={whatsapp} target="_blank" rel="noopener noreferrer">
              <i className="bx bxl-whatsapp" aria-hidden="true" />
              WhatsApp
            </a>
            <a className="ccard-icon" href={`mailto:${OWNER.email}`} aria-label={t("contactCard.email")}>
              <i className="bx bx-envelope" aria-hidden="true" />
            </a>
            <a className="ccard-icon" href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="bx bxl-linkedin" aria-hidden="true" />
            </a>
          </div>
        </div>

        <span className="ccard-holo" aria-hidden="true" />
        <span className="ccard-glare" aria-hidden="true" />
      </div>
    </div>
  );
};

export default ContactCard;
