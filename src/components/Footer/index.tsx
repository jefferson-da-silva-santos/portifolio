import { useTranslation } from "react-i18next";
import useTheme from "../../hooks/useTheme";
import { footerStyle } from "./styles";
import objectTheme from "../../assets/theme.json";
import { OWNER, openPrivacyPolicy } from "../../consts/legal";

const Footer = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <footer className="footer" style={footerStyle(theme, objectTheme)}>
      <p>
        © {new Date().getFullYear()} {OWNER.name}
        {OWNER.document && ` · ${OWNER.document}`}
      </p>
      {/* Decreto 7.962/2013, art. 2º, II — endereço físico e eletrônico */}
      <p className="footer-legal">
        {OWNER.city} · <a href={`mailto:${OWNER.email}`}>{OWNER.email}</a> ·{" "}
        <button type="button" className="footer-link" onClick={openPrivacyPolicy}>
          {t("privacy.title")}
        </button>
      </p>
    </footer>
  );
};

export default Footer;
