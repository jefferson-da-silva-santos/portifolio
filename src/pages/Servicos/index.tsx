import ServiceCard from '../../components/CardService';
import { servicesData } from '../../consts/dataConsts';
import useTheme from '../../hooks/useTheme';
import objectTheme from '../../assets/theme.json';
import { containerStyles, titleStyles } from './styles';

const Servicos = () => {
  const {theme} = useTheme();

  return (
    <div className="groupService" id="service" style={containerStyles(theme, objectTheme)}>
      <section className="service">
        <article className="groupService-primary">
          <div className="linhas"></div>
          <div className="linhas"></div>
          <div className="linhas"></div>
          <h2 className="titleService" style={titleStyles(theme, objectTheme)}>
            &#8249; <span className="letraMonoton">S</span>ervices &#8260;
            &#8250;
          </h2>
        </article>
        <article className="groupService-secundary">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              imageSrc={service.imageSrc}
              imageAlt={service.imageAlt}
              cardClass={service.cardClass}
              circleClass={service.circleClass}
              imageClass={service.imageClass}
            />
          ))}
        </article>
      </section>
    </div>
  );
};

export default Servicos;