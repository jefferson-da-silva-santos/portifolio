import { useState } from "react";
import themeObject from "../../assets/theme.json";
import useTheme from "../../hooks/useTheme";

interface INavegacaoProps {
  toggleTheme: () => void;
}

const Navegacao: React.FC<INavegacaoProps> = ({ toggleTheme }) => {
  const [isHover, setIsHover] = useState<Record<string, boolean>>({});
  const { theme } = useTheme();

  const navLinks = [
    { text: "home", href: "#home", controls: "home" },
    { text: "about", href: "#about", controls: "about" },
    { text: "skills", href: "#skills", controls: "skills" },
    { text: "projects", href: "#project", controls: "project" },
    { text: "service", href: "#service", controls: "service" },
    { text: "contact", href: "#contact", controls: "contact" },
  ];

  const getLinkStyle = (linkId: string) => {
    const isHovering = isHover[linkId];
    const defaultColor =
      theme === "light"
        ? themeObject.themes.light.navbar.link.color
        : themeObject.themes.dark.navbar.link.color;

    return {
      color: isHovering ? "#00ffff" : defaultColor,
    };
  };

  return (
    <div
      className="groupNav"
      style={
        theme == "light"
          ? {
              backgroundColor:
                themeObject.themes.light.navbar.container.background,
              boxShadow: themeObject.themes.light.navbar.container.boxShadow,
            }
          : {
              backgroundColor:
                themeObject.themes.dark.navbar.container.background,
              boxShadow: themeObject.themes.dark.navbar.container.boxShadow,
            }
      }
    >
      <nav className="nav">
        <a
          style={
            theme == "light"
              ? { color: themeObject.themes.light.navbar.logo.color }
              : { color: themeObject.themes.dark.navbar.logo.color }
          }
          className="logoNav"
          href=""
        >
          &#8249; <span className="letraMonoton">J</span>eff &#8260; &#8250;
        </a>
        <ul
          style={
            theme == "light"
              ? {
                  backgroundColor:
                    themeObject.themes.light.navbar.list.background,
                }
              : {
                  backgroundColor:
                    themeObject.themes.dark.navbar.list.background,
                }
          }
          className="listNav"
          id="lista-menus"
          role="tablist"
        >

           {navLinks.map((link) => (
            <li key={link.href}>
              <a
                style={getLinkStyle(link.href)}
                role="tab"
                aria-controls={link.controls}
                className="itemsMenu-header"
                href={link.href}
                onMouseEnter={() => setIsHover({ ...isHover, [link.href]: true })}
                onMouseLeave={() => setIsHover({ ...isHover, [link.href]: false })}
              >
                {link.text}
              </a>
            </li>
          ))}
          
          <li>
            <a href="#" id="btn-idioma" role="button" aria-label="Mudar idioma">
              <img
                loading="lazy"
                className="icon-idioma"
                src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/eua.webp"
                alt="icone do idioma"
              />
            </a>
          </li>
          <li>
            <a
              href="#"
              className="icon-theme-1"
              role="button"
              aria-label="Mudar tema"
            >
              <img
                loading="lazy"
                id="btn-tema"
                className="icon-theme"
                src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/modo-escuro.webp"
                alt="icone do tema"
                onClick={toggleTheme}
              />
            </a>
          </li>
        </ul>
        <div
          className="select-menu-humburguer"
          id="menu"
          role="button"
          aria-label="Abrir e fechar menu"
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
