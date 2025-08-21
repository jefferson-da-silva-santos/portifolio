import { projectImages } from "../../consts/dataConsts";
import useTheme from "../../hooks/useTheme";
import { styleContainer, styleStrong, styleText, styleTitle } from "./styles";
const Sobre = () => {
  const {theme} = useTheme();

  return (
    <div className="groupSobre" id="about" style={styleContainer(theme)}>
      <section className="sobre">
        <article className="groupSobre-primary hidden-scroll-right">
          <div className="dividir-titulo-linha">
            <div className="linhas"></div>
            <div className="linhas"></div>
            <div className="linhas"></div>
            <h2 className="titleSobre" style={styleTitle(theme)}>
              &#8249; <span className="letraMonoton">A</span>bout &#8260;
              &#8250;
            </h2>
          </div>
          <p className="textSobre" style={styleText(theme)}>
            My name is <strong style={styleStrong(theme)}>Jefferson Santos</strong> and I am a technology
            enthusiast who decided to pursue a career in programming. Over the
            last <strong style={styleStrong(theme)}>four years</strong>, I have dedicated myself to
            understanding the main technologies on the market and applying 
            <strong style={styleStrong(theme)}> agile development methodologies</strong> (I&#8217;m a coffee
            lover).
          </p>
          <p className="textSobre" style={styleText(theme)}>
            I completed a technical course in
            <strong style={styleStrong(theme)}> Systems Development (DS)</strong> with a focus on
            <strong style={styleStrong(theme)}> Full Stack development</strong>. Since then, I have worked
            on projects as a freelancer and contributed to open source projects,
            continually improving my skills and experience in the field.
          </p>
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
