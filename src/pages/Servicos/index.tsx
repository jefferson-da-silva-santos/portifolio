import useTheme from "../../hooks/useTheme";
import objectTheme from "../../assets/theme.json";
import { containerStyles, titleStyles } from "./styles";
import { useTranslation } from "react-i18next";
import { getFirstLetterTitle, getRestOfTitle } from "../../utils/textUtilites";

// Serviços em carrossel contínuo: passa sozinho e pausa quando o mouse entra
const SERVICES = [
  { key: "sites", icon: "bx-code-alt", color: "#93f02f" },
  { key: "mobile", icon: "bx-mobile-alt", color: "#9956f6" },
  { key: "systems", icon: "bx-server", color: "#ff9d57" },
  { key: "whatsapp", icon: "bxl-whatsapp", color: "#25d366" },
  { key: "automation", icon: "bx-git-branch", color: "#00e5ff" },
  { key: "content", icon: "bx-movie-play", color: "#ff4fa0" },
] as const;

const Servicos = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const card = (s: (typeof SERVICES)[number], copy: boolean) => (
    <li
      key={`${s.key}-${copy ? "b" : "a"}`}
      className="svc-card"
      style={{ "--c": s.color } as React.CSSProperties}
      aria-hidden={copy || undefined}
    >
      <span className="svc-icon">
        <i className={`bx ${s.icon}`} aria-hidden="true" />
      </span>
      {s.key === "whatsapp" || s.key === "automation" || s.key === "content" ? (
        <span className="svc-tag">{t("services.aiTag")}</span>
      ) : null}
      <h3 className="svc-title">{t(`services.items.${s.key}.title`)}</h3>
      <p className="svc-text">{t(`services.items.${s.key}.text`)}</p>
    </li>
  );

  return (
    <div className="groupService" id="service" style={containerStyles(theme, objectTheme)}>
      <section className="service">
        <article className="groupService-primary" data-aos="fade-right">
          <div className="linhas"></div>
          <div className="linhas"></div>
          <div className="linhas"></div>
          <h2 className="titleService" style={titleStyles(theme, objectTheme)}>
            &#8249; <span className="letraMonoton">{getFirstLetterTitle(t("services.title"))}</span>
            {getRestOfTitle(t("services.title"))} &#8260; &#8250;
          </h2>
        </article>
        <div className={`svc-marquee svc--${theme}`} data-aos="fade-up">
          <ul className="svc-track">
            {SERVICES.map((s) => card(s, false))}
            {SERVICES.map((s) => card(s, true))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Servicos;
