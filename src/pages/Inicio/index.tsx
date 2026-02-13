import Navegacao from "../../components/Navegacao";
import useTheme from "../../hooks/useTheme";
import themeObject from "../../assets/theme.json";
import { useState } from "react";
import SocialButton from "./Link";
import { projectImages, socialButtonList } from "../../consts/dataConsts";
import { handleSetHoverButtonIcon, styleContainer, styleTitle } from "./styles";
import { stylesButton } from "./styles";
import eu from '../../assets/image/jeff.png';

import background_dark from '../../assets/image/background.png';
import background_light from '../../assets/image/background_light.png';
import { useTranslation } from "react-i18next";

const Inicio = () => {
  const { theme, toggleTheme } = useTheme();
  const [isHoverButton, setIsHoverButton] = useState<boolean[]>([]);

  const handleSetHoverButtom = (index: number, state: boolean) => {
    setIsHoverButton((prev) => ({
      ...prev,
      [index]: state,
    }));
  };

  const { t } = useTranslation();

  return (
    <div
      className="groupHeader"

      style={{
        ...styleContainer(theme, themeObject),
        backgroundImage: `url(${theme === 'dark' ? background_dark : background_light})`
      }}
    >
      <div className="overlay" style={{
        backgroundColor: theme === 'dark' ? '#010210a8' : 'transparent'
      }}></div>
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
            <p className="text-header" style={{
              color: theme === 'dark' ? '#fff' : '#474a54',
              fontWeight: theme === 'dark' ? '100' : '400'
            }}>{t('init.text')}</p>
            <a className="link-header" href="#project">
              <div className="groupHeader-button">
                <div className="bottom-button"></div>
                <button className={`button-header ${theme}`}>
                  {t('init.textButton')}
                </button>
              </div>
            </a>
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
