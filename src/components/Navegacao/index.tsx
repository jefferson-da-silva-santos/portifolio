// src/components/Navegacao.js (Versão refatorada)
import { useState } from "react";
import themeObject from "../../assets/theme.json";
import useTheme from "../../hooks/useTheme";
import { listIconTheme, useNavLinks } from "../../consts/dataConsts";
import type { INavegacaoProps } from "./types";
import "../../i18n";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../hooks/useLenguage";
import { containerStyle, getLinkStyle, linkStyle, listStyle } from "./styles";

const Navegacao: React.FC<INavegacaoProps> = ({ toggleTheme }) => {
  const [isHover, setIsHover] = useState<Record<string, boolean>>({});
  const [iconTheme] = useState(listIconTheme);
  const { t } = useTranslation();
  const navLinks = useNavLinks();
  const { theme } = useTheme();
  const { language, icon, toggleLanguage } = useLanguage();

  return (
    <div className="groupNav" style={containerStyle(theme, themeObject)}>
      <nav className="nav">
        <a style={linkStyle(theme, themeObject)} className="logoNav" href="">
          &#8249; <span className="letraMonoton">J</span>eff &#8260; &#8250;
        </a>
        <ul
          style={listStyle(theme, themeObject)}
          className="listNav"
          id="lista-menus"
          role="tablist"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                style={getLinkStyle(link.href, isHover, theme, themeObject)}
                role="tab"
                aria-controls={link.controls}
                className="itemsMenu-header"
                href={link.href}
                onMouseEnter={() =>
                  setIsHover({ ...isHover, [link.href]: true })
                }
                onMouseLeave={() =>
                  setIsHover({ ...isHover, [link.href]: false })
                }
              >
                {link.text}
              </a>
            </li>
          ))}

          <li>
            <a
              onClick={toggleLanguage}
              id="btn-idioma"
              role="button"
              aria-label={t("navigation.ariaLabels.changeLanguage")}
            >
              <img
                loading="lazy"
                className="icon-idioma"
                src={icon}
                alt="icone do idioma"
              />
            </a>
          </li>
          <li>
            <a
              href="#"
              className="icon-theme-1"
              role="button"
              aria-label={t("navigation.ariaLabels.changeTheme")}
              onClick={(e) => {
                e.preventDefault();
                toggleTheme();
              }}
            >
              <img
                loading="lazy"
                id="btn-tema"
                className="icon-theme"
                src={theme === "light" ? iconTheme[0] : iconTheme[1]}
                alt="icone do tema"
              />
            </a>
          </li>
        </ul>
        <div
          className="select-menu-humburguer"
          id="menu"
          role="button"
          aria-label={t("navigation.ariaLabels.toggleMenu")}
        >
          <div className="linha-menu-humburguer"></div>
          <div className="linha-menu-humburguer"></div>
          <div className="linha-menu-humburguer"></div>
        </div>
      </nav>
    </div>
  );
};

export default Navegacao;
