const Servicos = () => {
  return (
    <div className="groupService" id="service">
      <section className="service">
        <article className="groupService-primary hidden-scroll-bottom">
          <div className="linhas"></div>
          <div className="linhas"></div>
          <div className="linhas"></div>
          <h2 className="titleService">
            &#8249; <span className="letraMonoton">S</span>ervices &#8260;
            &#8250;
          </h2>
        </article>
        <article className="groupService-secundary">
          <article className="card-service hidden-scroll-s1">
            <div className="circle-externo-servico">
              <div className="circle-interno-servico">
                <img
                  loading="lazy"
                  src="src/img/code-icom.svg"
                  alt="simbolo da programação"
                />
              </div>
            </div>

            <h3 className="title-card-service">Website Creation</h3>
            <p className="description-card-service">
              Creation of personalized websites, whether personal or for various
              business sectors
            </p>
          </article>

          <article className="card-service hidden-scroll-s2">
            <div className="circle-externo-servico">
              <div className="circle-interno-servico">
                <img
                  loading="lazy"
                  src="src/img/mobile-icon.svg"
                  alt="imagem de um celular"
                />
              </div>
            </div>

            <h3 className="title-card-service">Responsive Websites</h3>
            <p className="description-card-service">
              All websites are responsive, to further improve the user
              experience on any device.
            </p>
          </article>

          <article className="card-service hidden-scroll-s3">
            <div className="circle-externo-servico">
              <div className="circle-interno-servico">
                <img
                  loading="lazy"
                  src="src/img/api-icon.svg"
                  alt="Simbolo de uma API"
                />
              </div>
            </div>

            <h3 className="title-card-service">Creating APIs</h3>
            <p className="description-card-service">
              Creation of secure Rest APIs, and integration with external
              databases experience.
            </p>
          </article>
        </article>
      </section>
    </div>
  );
};

export default Servicos;
