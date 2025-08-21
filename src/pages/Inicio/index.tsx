import Navegacao from "../../components/Navegacao";
import useTheme from "../../hooks/useTheme";
import themeObject from "../../assets/theme.json";
import { useState } from "react";
import SocialButton from "./Link";

 const socialButtonList = [
    {
      arialLAbel: "Abrir github",
      url: "https://github.com/jefferson-da-silva-santos",
      iconClass: "bx bxl-github",
      index: 0,
    },
    {
      arialLAbel: "Abrir linkedin",
      url: "https://www.linkedin.com/in/jefferson-santos-a87b74277/",
      iconClass: "bx bxl-linkedin-square",
      index: 1,
    },
    {
      arialLAbel: "Abrir linkedin",
      url: "https://wa.me/558195124550?text=Olá%2C%20Jefferson!%20Encontrei%20seu%20portfólio%20e%20gostaria%20de%20saber%20mais%20sobre%20seus%20serviços%20de%20programação.%20Poderíamos%20conversar%3F",
      iconClass: "bx bxl-whatsapp",
      index: 2,
    },
 ];

const Inicio = () => {
  const { theme, toggleTheme } = useTheme();
  const [isHoverButton, setIsHoverButton] = useState<Record<number, boolean>>(
    {}
  );

  const stylesButtom = (i: number) => {
    const isHovering = isHoverButton[i];
    return theme === "light"
      ? {
          color: themeObject.themes.light.init.buttons.color,
          backgroundColor: themeObject.themes.light.init.buttons.background,
          boxShadow: !isHovering
            ? themeObject.themes.light.init.buttons.boxShadow
            : themeObject.themes.light.init.buttons.hoverBoxShadow,
        }
      : {
          color: themeObject.themes.dark.init.buttons.color,
          backgroundColor: themeObject.themes.dark.init.buttons.background,
          boxShadow: !isHovering
            ? themeObject.themes.dark.init.buttons.boxShadow
            : themeObject.themes.dark.init.buttons.hoverBoxShadow,
        };
  };

  const handleSetHoverButtom = (index: number, state: boolean) => {
    setIsHoverButton((prev) => ({
      ...prev,
      [index]: state,
    }));
  };

  const handleSetHoverButtonIcon = (index: number) => {
    const isHovering = isHoverButton[index];
    return {
      color: isHovering
        ? theme === "light"
          ? themeObject.themes.light.init.buttons.icon.hoverColor
          : themeObject.themes.dark.init.buttons.icon.hoverColor
        : theme === "light"
        ? themeObject.themes.light.init.buttons.icon.color
        : themeObject.themes.dark.init.buttons.icon.color,
    };
  };

  return (
    <div
      className="groupHeader"
      style={
        theme == "light"
          ? {
              backgroundColor:
                themeObject.themes.light.init.container.background,
            }
          : {
              backgroundColor:
                themeObject.themes.dark.init.container.background,
            }
      }
    >
      <Navegacao toggleTheme={toggleTheme} />
      <header className="header" id="home">
        <section className="groupHeader-texts">
          <div className="textsHeader">
            <h1
              style={
                theme === "light"
                  ? {
                      color: themeObject.themes.light.init.title.color,
                    }
                  : {
                      color: themeObject.themes.dark.init.title.color,
                    }
              }
            >
              Jefferson Santos
            </h1>
            <p className="title-secundary-header"></p>
          </div>
          <div className="groupHeader-socialMedia">
            {socialButtonList.map((socialButton) => (
              <SocialButton
                href={socialButton.url}
                ariaLabel={socialButton.arialLAbel}
                iconClass={socialButton.iconClass}
                functionStyle={stylesButtom}
                functionIconStyle={handleSetHoverButtonIcon}
                onMouseEnter={handleSetHoverButtom}
                onMouseLeave={handleSetHoverButtom}
                index={socialButton.index}
              />
            ))}
          </div>
        </section>
        <section className="groupHeader-img">
          <img
            loading="lazy"
            src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png"
            alt="simbolo do framework react"
          />
        </section>
      </header>
    </div>
  );
};

export default Inicio;
