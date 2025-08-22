import { useTranslation } from "react-i18next";
import { projectImages } from "../../consts/dataConsts";
import useTheme from "../../hooks/useTheme";
import { styleContainer, styleText, styleTitle } from "./styles";
const Sobre = () => {
  const {theme} = useTheme();
  const { t } = useTranslation();

  // Prime letra do título em maiúscula e restante em minúscula
  const firstLetterTitle = t("about.title").charAt(0).toUpperCase();
  const restOfTitle = t("about.title").slice(1);

  return (
    <div className="groupSobre" id="about" style={styleContainer(theme)}>
      <section className="sobre">
        <article className="groupSobre-primary hidden-scroll-right">
          <div className="dividir-titulo-linha">
            <div className="linhas"></div>
            <div className="linhas"></div>
            <div className="linhas"></div>
            <h2 className="titleSobre" style={styleTitle(theme)}>
              &#8249; <span className="letraMonoton">{firstLetterTitle}</span>{restOfTitle} &#8260;
              &#8250;
            </h2>
          </div>
          <p className="textSobre" style={styleText(theme)} dangerouslySetInnerHTML={{ __html: t("about.description1") }}></p>
          <p className="textSobre" style={styleText(theme)} dangerouslySetInnerHTML={{ __html: t("about.description2") }}></p>
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
