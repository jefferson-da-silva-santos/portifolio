import Navegacao from "../../components/Navegacao";
import useTheme from "../../hooks/useTheme";
import themeObject from "../../assets/theme.json";
import { useState } from "react";
import SocialButton from "./Link";
import { projectImages, socialButtonList } from "../../consts/dataConsts";
import { handleSetHoverButtonIcon, styleContainer, styleTitle } from "./styles";
import { stylesButton } from "./styles";
import eu from '../../assets/image/jeff.png';

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
      <div className="overlay"></div>
      <Navegacao toggleTheme={toggleTheme} />
      <header className="header" id="home">
        <section data-aos="fade-up" data-aos-offset="200" data-aos-easing="ease-in-sine" className="groupHeader-img">
          <img
            loading="lazy"
            src={eu}
            alt={projectImages[0].alt}
          />
        </section>
        <section data-aos="fade-up" data-aos-offset="200" data-aos-easing="ease-in-sine" className="groupHeader-texts">
          <div className="textsHeader">
            <h1
              style={styleTitle(theme, themeObject)}
            >
              Jefferson Santos
            </h1>
            <p className="title-secundary-header"></p>
            <p className="text-header">Desenvolvedor web especializado em criar experiências modernas e eficientes.</p>
            <div>
              <div className="bottom-button"></div>
              <button className="button-header">
                Veja meu trabalho
              </button>
            </div>
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
      </header>
    </div>
  );
};

export default Inicio;
