const Navegacao = () => {
  return (
    <div className="groupNav">
      <nav className="nav">
        <a className="logoNav" href="">
          &#8249; <span className="letraMonoton">J</span>eff &#8260; &#8250;
        </a>
        <ul className="listNav" id="lista-menus" role="tablist">
          <li>
            <a
              role="tab"
              aria-controls="home"
              className="itemsMenu-header itemsMenu-header--dark"
              href="#home"
            >
              home
            </a>
          </li>
          <li>
            <a
              role="tab"
              aria-controls="about"
              className="itemsMenu-header itemsMenu-header--dark"
              href="#about"
            >
              about
            </a>
          </li>
          <li>
            <a
              role="tab"
              aria-controls="skills"
              className="itemsMenu-header itemsMenu-header--dark"
              href="#skills"
            >
              skills
            </a>
          </li>
          <li>
            <a
              role="tab"
              aria-controls="project"
              className="itemsMenu-header itemsMenu-header--dark"
              href="#project"
            >
              projects
            </a>
          </li>
          <li>
            <a
              role="tab"
              aria-controls="service"
              className="itemsMenu-header itemsMenu-header--dark"
              href="#service"
            >
              service
            </a>
          </li>
          <li>
            <a
              role="tab"
              aria-controls="contact"
              className="itemsMenu-header itemsMenu-header--dark"
              href="#contact"
            >
              contact
            </a>
          </li>
          <li>
            <a href="#" id="btn-idioma" role="button" aria-label="Mudar idioma">
              <img
                loading="lazy"
                className="icon-idioma"
                src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/eua.webp"
                alt="icone do idioma"
              />
            </a>
          </li>
          <li>
            <a
              href="#"
              className="icon-theme-1"
              role="button"
              aria-label="Mudar tema"
            >
              <img
                loading="lazy"
                id="btn-tema"
                className="icon-theme"
                src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/modo-escuro.webp"
                alt="icone do tema"
              />
            </a>
          </li>
        </ul>
        <div
          className="select-menu-humburguer"
          id="menu"
          role="button"
          aria-label="Abrir e fechar menu"
        >
          <div className="linha-menu-humburguer"></div>
          <div className="linha-menu-humburguer"></div>
          <div className="linha-menu-humburguer"></div>
        </div>
      </nav>
    </div>
  );
};

export default Navegacao;
