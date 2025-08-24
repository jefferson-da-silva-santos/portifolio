import ServiceCard from '../../components/CardService';
import useTheme from '../../hooks/useTheme';
import objectTheme from '../../assets/theme.json';
import { containerStyles, titleStyles } from './styles';
import { useTranslation } from 'react-i18next';
import { useServicesData } from '../../consts/dataConsts';

const Servicos = () => {
  const {theme} = useTheme();
   const { t } = useTranslation();
    const firstLetterTitle = t("services.title").charAt(0).toUpperCase();
    const restOfTitle = t("services.title").slice(1);
    const {servicesData} = useServicesData();

  return (
    <div className="groupService" id="service" style={containerStyles(theme, objectTheme)}>
      <section className="service">
        <article className="groupService-primary">
          <div className="linhas"></div>
          <div className="linhas"></div>
          <div className="linhas"></div>
          <h2 className="titleService" style={titleStyles(theme, objectTheme)}>
            &#8249; <span className="letraMonoton">{firstLetterTitle}</span>{restOfTitle} &#8260;
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