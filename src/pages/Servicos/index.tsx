import ServiceCard from '../../components/CardService';
import useTheme from '../../hooks/useTheme';
import objectTheme from '../../assets/theme.json';
import { containerStyles, titleStyles } from './styles';
import { useTranslation } from 'react-i18next';
import { useServicesData } from '../../consts/dataConsts';
import { getFirstLetterTitle, getRestOfTitle } from '../../utils/textUtilites';

const Servicos = () => {
  const {theme} = useTheme();
   const { t } = useTranslation();
    const {servicesData} = useServicesData();

  return (
    <div className="groupService" id="service" style={containerStyles(theme, objectTheme)}>
      <section className="service">
        <article className="groupService-primary" data-aos="fade-right">
          <div className="linhas"></div>
          <div className="linhas"></div>
          <div className="linhas"></div>
          <h2 className="titleService" style={titleStyles(theme, objectTheme)}>
            &#8249; <span className="letraMonoton">{getFirstLetterTitle(t("services.title"))}</span>{getRestOfTitle(t("services.title"))} &#8260;
            &#8250;
          </h2>
        </article>
        <article className="groupService-secundary" data-aos="fade-left">
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