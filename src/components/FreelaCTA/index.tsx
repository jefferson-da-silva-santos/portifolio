import { useTranslation } from "react-i18next";
import useTheme from "../../hooks/useTheme";
import { OWNER } from "../../consts/legal";

// Faixa de chamada para freelance, entre Serviços e Contato
const FreelaCTA = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const items = t("freelaCta.items", { returnObjects: true }) as string[];
  const stats = t("freelaCta.stats", { returnObjects: true }) as { value: string; label: string }[];
  const whatsapp = `${OWNER.whatsappUrl}?text=${encodeURIComponent(t("freelaCta.whatsappMessage"))}`;

  const goToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className={`fcta-section fcta--${theme}`} aria-labelledby="fcta-title">
      <div className="fcta" data-aos="fade-up">
        <div className="fcta-bg" aria-hidden="true">
          <span className="fcta-grid" />
          <span className="fcta-aurora" />
        </div>

        <div className="fcta-main">
          <span className="fcta-eyebrow">
            <i aria-hidden="true" />
            {t("freelaCta.eyebrow")}
          </span>
          <h2 id="fcta-title" className="fcta-title">
            {t("freelaCta.titleA")} <span>{t("freelaCta.titleB")}</span>
          </h2>
          <p className="fcta-text">{t("freelaCta.text")}</p>
          <ul className="fcta-items">
            {items.map((item) => (
              <li key={item}>
                <i className="bx bx-check" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="fcta-side">
          <dl className="fcta-stats">
            {stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
          <div className="fcta-actions">
            <a className="fcta-btn fcta-btn--primary" href={whatsapp} target="_blank" rel="noopener noreferrer">
              <i className="bx bxl-whatsapp" aria-hidden="true" />
              {t("freelaCta.primary")}
              <i className="bx bx-right-arrow-alt fcta-arrow" aria-hidden="true" />
            </a>
            <a className="fcta-btn" href="#contact" onClick={goToContact}>
              <i className="bx bx-envelope" aria-hidden="true" />
              {t("freelaCta.secondary")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreelaCTA;
