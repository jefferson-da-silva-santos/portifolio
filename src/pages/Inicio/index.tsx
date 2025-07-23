import Navegacao from "../../components/Navegacao";

const Inicio = () => {
  return (
    <div className="groupHeader">
      <Navegacao />
      <header className="header" id="home">
        <section className="groupHeader-texts hidden-scroll-left">
          <div className="textsHeader">
            <h1>Jefferson Santos</h1>
            <p className="title-secundary-header"></p>
          </div>
          <div className="groupHeader-socialMedia">
            <a
              role="button"
              target="_blank"
              aria-label="Abrir github"
              className="geoupHeader-socialMediaButton"
              href="https://github.com/jefferson-da-silva-santos"
            >
              <i className="bi bi-github"></i>
            </a>
            <a
              role="button"
              target="_blank"
              aria-label="Abrir linkedin"
              className="geoupHeader-socialMediaButton"
              href="https://www.linkedin.com/in/jefferson-santos-a87b74277/"
            >
              <i className="bi bi-linkedin"></i>
            </a>
            <a
              role="button"
              target="_blank"
              aria-label="Abrir whatsapp"
              className="geoupHeader-socialMediaButton"
              href="https://wa.me/558195124550?text=Olá%2C%20Jefferson!%20Encontrei%20seu%20portfólio%20e%20gostaria%20de%20saber%20mais%20sobre%20seus%20serviços%20de%20programação.%20Poderíamos%20conversar%3F"
            >
              <i className="bi bi-whatsapp"></i>
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
