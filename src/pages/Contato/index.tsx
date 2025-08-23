const Contato = () => {
  return (
    <div className="groupContact">
      <section className="contato" id="contact">
        <article className="groupContact-primary">
          <div className="linhas"></div>
          <div className="linhas"></div>
          <div className="linhas"></div>
          <h2 className="titleContact">
            &#8249; <span className="letraMonoton">C</span>ontact &#8260;
            &#8250;
          </h2>
        </article>
        <article className="groupContact-secundary">
          <form className="form" id="form-contato">
            <input
              aria-required="true"
              role="textbox"
              aria-label="Nome completo"
              className="inputsFormContato"
              type="text"
              name="nome"
              id="nome"
              placeholder="Enter your first and last name"
              required
              min="3"
              max="50"
            />
            <input
              aria-required="true"
              role="textbox"
              aria-label="Email"
              className="inputsFormContato"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              required
            />
            <input
              aria-required="true"
              role="textbox"
              aria-label="Assunto do Email"
              className="inputsFormContato"
              type="text"
              name="assunto"
              id="assunto"
              placeholder="Message subject"
              required
            />
            <textarea
              aria-required="true"
              role="textbox"
              aria-label="Mensagem do email"
              className="inputsFormContato"
              name="mensagem"
              id="mensagem"
              placeholder="Your message..."
              required
            ></textarea>
            <input
              role="button"
              aria-label="Enviar email"
              type="submit"
              value="Send"
              id="enviar"
            />
          </form>
        </article>
        <div className="groupContact-terciary">
          <div className="circle-2"></div>
          <img
            loading="lazy"
            src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/jefferson-image.jpeg"
            alt="Foto do dono do portifólio "
          />
        </div>
      </section>
    </div>
  );
};

export default Contato;
