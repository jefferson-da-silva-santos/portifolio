import { useCallback, useEffect, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import { Link } from "react-router-dom";
import themeObject from "../../assets/theme.json";
import useTheme from "../../hooks/useTheme";
import { listIconTheme, useNavLinks } from "../../consts/dataConsts";
import type { INavegacaoProps } from "./types";
import "../../i18n";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../hooks/useLenguage";
import { containerStyle, iconStyles, linkStyle, listStyle } from "./styles";
import { useMenu } from "../../hooks/useMenu";
import { getThemeProps } from "../../utils/themeUtilities";

const MOBILE_BREAKPOINT = 896;

const isMobileWidth = () => window.innerWidth < MOBILE_BREAKPOINT;

const Navegacao: React.FC<INavegacaoProps> = ({ toggleTheme }) => {
  const { t } = useTranslation();
  const navLinks = useNavLinks();
  const { theme } = useTheme();
  const { icon, toggleLanguage } = useLanguage();
  const {
    isMenuMobileVisible,
    isMenuOpen,
    toggleMenuVisibility,
    closeMenu,
    classMenuList,
    iconMenu,
  } = useMenu();

  const [isMobile, setIsMobile] = useState(isMobileWidth);
  const [activeSection, setActiveSection] = useState<string>("");

  // Links de seção da própria página (#about, #skills...) e rotas (/blog)
  const sectionIds = navLinks
    .filter((link) => link.href.startsWith("#"))
    .map((link) => link.href.slice(1));
  const sectionKey = sectionIds.join(",");

  // Breakpoint: ao voltar para desktop, o menu mobile é descartado
  useEffect(() => {
    const handleResize = () => {
      const mobile = isMobileWidth();
      setIsMobile(mobile);
      if (!mobile && isMenuOpen) closeMenu();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen, closeMenu]);

  // Destaca no menu a seção que está visível na tela
  useEffect(() => {
    const sections = sectionKey
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));

    // No topo da página (hero) nenhum item fica ativo
    const handleTop = () => {
      if (window.scrollY < window.innerHeight * 0.4) setActiveSection("");
    };
    window.addEventListener("scroll", handleTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleTop);
    };
  }, [sectionKey]);

  // Menu mobile aberto: trava a rolagem da página e fecha com Esc
  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isMenuOpen, closeMenu]);

  const closeIfOpen = useCallback(() => {
    if (isMenuOpen) closeMenu();
  }, [isMenuOpen, closeMenu]);

  // Logo: volta para o início. Na própria home, rola até o topo e limpa o #hash.
  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname !== "/") return;
    e.preventDefault();
    closeIfOpen();
    window.history.replaceState(null, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveSection("");
  };

  const handleSectionClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    closeIfOpen();
    window.history.replaceState(null, "", `#${id}`);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const linkColor = getThemeProps(theme, themeObject, "navbar", "link", "color");
  const linkVars = { "--nav-link-color": linkColor } as CSSProperties;

  return (
    <div className="groupNav" style={containerStyle(theme, themeObject)}>
      {isMobile && isMenuOpen && (
        <div className="nav-backdrop" onClick={closeMenu} aria-hidden="true" />
      )}

      <nav className="nav" aria-label={t("navigation.ariaLabels.toggleMenu")}>
        <a
          style={linkStyle(theme, themeObject)}
          className="logoNav"
          href="/"
          aria-label="Jefferson Santos - início"
          onClick={handleLogoClick}
        >
          &#8249; <span className="letraMonoton">J</span>eff &#8260; &#8250;
        </a>

        <ul
          style={listStyle(theme, isMobile, isMenuMobileVisible)}
          className={`listNav ${classMenuList}`}
          id="lista-menus"
        >
          {navLinks.map((link) => {
            const isSection = link.href.startsWith("#");
            const id = link.href.slice(1);
            const isActive = isSection && activeSection === id;
            const className = `itemsMenu-header${isActive ? " is-active" : ""}`;

            return (
              <li key={link.href}>
                {isSection ? (
                  <a
                    className={className}
                    style={linkVars}
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    onClick={(e) => handleSectionClick(e, id)}
                  >
                    {link.text}
                  </a>
                ) : (
                  <Link
                    className={className}
                    style={linkVars}
                    to={link.href}
                    onClick={closeIfOpen}
                  >
                    {link.text}
                  </Link>
                )}
              </li>
            );
          })}

          <li>
            <button
              type="button"
              className="nav-icon-button"
              onClick={toggleLanguage}
              id="btn-idioma"
              aria-label={t("navigation.ariaLabels.changeLanguage")}
            >
              <img className="icon-idioma" src={icon} alt="" />
            </button>
          </li>

          <li>
            <button
              type="button"
              className="nav-icon-button icon-theme-1"
              aria-label={t("navigation.ariaLabels.changeTheme")}
              onClick={toggleTheme}
            >
              <img
                id="btn-tema"
                className="icon-theme"
                src={theme === "light" ? listIconTheme[0] : listIconTheme[1]}
                alt=""
              />
            </button>
          </li>
        </ul>

        <button
          type="button"
          className="select-menu-humburguer"
          id="menu"
          aria-label={t("navigation.ariaLabels.toggleMenu")}
          aria-expanded={isMenuOpen}
          aria-controls="lista-menus"
          onClick={toggleMenuVisibility}
        >
          <i style={iconStyles(theme)} className={iconMenu}></i>
        </button>
      </nav>
    </div>
  );
};

export default Navegacao;
