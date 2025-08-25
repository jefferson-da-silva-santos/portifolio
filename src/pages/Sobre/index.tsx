import { useTranslation } from "react-i18next";
import { projectImages } from "../../consts/dataConsts";
import useTheme from "../../hooks/useTheme";
import { styleContainer, styleText, styleTitle } from "./styles";
import { useEffect, useState } from "react";
import { getFirstLetterTitle, getRestOfTitle, toggleClassInText } from "../../utils/textUtilites";

const Sobre = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [description1, setDescription1] = useState<string>("");
  const [description2, setDescription2] = useState<string>("");

  const oldClass = theme === 'light' ? 'strong-light' : 'strong-dark';
  const newClass = theme === 'light' ? 'strong-dark' : 'strong-light';

  useEffect(() => {
    setDescription1(toggleClassInText(t("about.description1"), oldClass, newClass));
    setDescription2(toggleClassInText(t("about.description2"), oldClass, newClass));
  }, [theme, t, oldClass, newClass]);

  return (
    <div className="groupSobre" id="about" style={styleContainer(theme)}>
      <section className="sobre">
        <article className="groupSobre-primary hidden-scroll-right">
          <div className="dividir-titulo-linha">
            <div className="linhas"></div>
            <div className="linhas"></div>
            <div className="linhas"></div>
            <h2 className="titleSobre" style={styleTitle(theme)}>
              &#8249; <span className="letraMonoton">{getFirstLetterTitle(t("about.title"))}</span>{getRestOfTitle(t("about.title"))} &#8260;
              &#8250;
            </h2>
          </div>
          <p className="textSobre" style={styleText(theme)} dangerouslySetInnerHTML={{ __html: description1 }}></p>
          <p className="textSobre" style={styleText(theme)} dangerouslySetInnerHTML={{ __html: description2 }}></p>
        </article>
        <article className="groupSobre-secundary hidden-scroll-right">
          <div className="circle"></div>
          <img
            loading="lazy"
            className="minha-img"
            src={projectImages[3].url}
            alt={projectImages[3].alt}
          />
        </article>
      </section>
    </div>
  );
};

export default Sobre;