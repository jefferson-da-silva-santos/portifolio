import Navegacao from "../../components/Navegacao";
import useTheme from "../../hooks/useTheme";
import themeObject from "../../assets/theme.json";
const Inicio = () => {
  const { theme, toggleTheme } = useTheme();
  const stylesButtom =
    theme === "light"
      ? {
          color: themeObject.themes.light.init.buttons.color,
          backgroundColor: themeObject.themes.light.init.buttons.background,
          boxShadow: themeObject.themes.light.init.buttons.boxShadow,
        }
      : {
          color: themeObject.themes.dark.init.buttons.color,
          backgroundColor: themeObject.themes.dark.init.buttons.background,
          boxShadow: themeObject.themes.dark.init.buttons.boxShadow,
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
        <section className="groupHeader-texts hidden-scroll-left">
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
            <a
              style={stylesButtom}
              role="button"
              target="_blank"
              aria-label="Abrir github"
              className="groupHeader-socialMediaButton"
              href="https://github.com/jefferson-da-silva-santos"
            >
              <i className="bx bxl-github"></i>
            </a>
            <a
              style={stylesButtom}
              role="button"
              target="_blank"
              aria-label="Abrir linkedin"
              className="groupHeader-socialMediaButton"
              href="https://www.linkedin.com/in/jefferson-santos-a87b74277/"
            >
              <i className="bx bxl-linkedin-square"></i>
            </a>
            <a
              style={stylesButtom}
              role="button"
              target="_blank"
              aria-label="Abrir whatsapp"
              className="groupHeader-socialMediaButton"
              href="https://wa.me/558195124550?text=Olá%2C%20Jefferson!%20Encontrei%20seu%20portfólio%20e%20gostaria%20de%20saber%20mais%20sobre%20seus%20serviços%20de%20programação.%20Poderíamos%20conversar%3F"
            >
              <i className="bx bxl-whatsapp"></i>
            </a>
          </div>
        </section>
        <section className="groupHeader-img hidden-scroll-left">
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
