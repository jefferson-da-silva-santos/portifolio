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
        <span className="fcta-light fcta-light--a" aria-hidden="true" />
        <span className="fcta-light fcta-light--b" aria-hidden="true" />

        <div className="fcta-main">
          <p className="fcta-eyebrow">{t("freelaCta.eyebrow")}</p>
          <h2 id="fcta-title" className="fcta-title">
            {t("freelaCta.titleA")} <span>{t("freelaCta.titleB")}</span>
          </h2>
          <p className="fcta-text">{t("freelaCta.text")}</p>
          <ul className="fcta-items">
            {items.map((item) => (
              <li key={item}>
                <i aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <div className="fcta-actions">
            <a className="fcta-btn" href={whatsapp} target="_blank" rel="noopener noreferrer">
              {t("freelaCta.primary")}
              <span className="fcta-btn-icon" aria-hidden="true">
                <i className="bx bx-right-arrow-alt" />
              </span>
            </a>
            <a className="fcta-link" href="#contact" onClick={goToContact}>
              {t("freelaCta.secondary")}
            </a>
          </div>
        </div>

        <dl className="fcta-stats">
          {stats.map((s) => (
            <div key={s.label}>
              <dd>{s.value}</dd>
              <dt>{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default FreelaCTA;
