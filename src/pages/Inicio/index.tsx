import Navegacao from "../../components/Navegacao";
import useTheme from "../../hooks/useTheme";
import themeObject from "../../assets/theme.json";
import { useState } from "react";
import SocialButton from "./Link";
import { projectImages, socialButtonList } from "../../consts/dataConsts";

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
            src={projectImages[0].url}
            alt={projectImages[0].alt}
          />
        </section>
      </header>
    </div>
  );
};

export default Inicio;
