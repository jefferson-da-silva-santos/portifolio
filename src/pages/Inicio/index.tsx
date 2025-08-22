import Navegacao from "../../components/Navegacao";
import useTheme from "../../hooks/useTheme";
import themeObject from "../../assets/theme.json";
import { useState } from "react";
import SocialButton from "./Link";
import { projectImages, socialButtonList } from "../../consts/dataConsts";
import { handleSetHoverButtonIcon, styleContainer, styleTitle } from "./styles";
import { stylesButton } from "./styles";

const Inicio = () => {
  const { theme, toggleTheme } = useTheme();
  const [isHoverButton, setIsHoverButton] = useState<boolean[]>([]);

  const handleSetHoverButtom = (index: number, state: boolean) => {
    setIsHoverButton((prev) => ({
      ...prev,
      [index]: state,
    }));
  };

  return (
    <div
      className="groupHeader"
      style={styleContainer(theme, themeObject)}
    >
      <Navegacao toggleTheme={toggleTheme} />
      <header className="header" id="home">
        <section className="groupHeader-texts">
          <div className="textsHeader">
            <h1
              style={styleTitle(theme, themeObject)}
            >
              Jefferson Santos
            </h1>
            <p className="title-secundary-header"></p>
          </div>
          <div className="groupHeader-socialMedia">
            {socialButtonList.map((socialButton, index) => (
              <SocialButton
                key={index}
                href={socialButton.url}
                ariaLabel={socialButton.arialLAbel}
                iconClass={socialButton.iconClass}
                functionStyle={stylesButton}
                functionIconStyle={handleSetHoverButtonIcon}
                onMouseEnter={handleSetHoverButtom}
                onMouseLeave={handleSetHoverButtom}
                index={socialButton.index}
                isHoverButton={isHoverButton}
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
