import React, { useEffect, useState } from 'react';
import useTheme from '../../hooks/useTheme';
import themeObject from '../../assets/theme.json';
import { useTranslation } from 'react-i18next';
import { getSkillsData } from '../../consts/dataConsts';
import { containerStyle, styleCardSkill, textStyle } from './styles';
import { getFirstLetterTitle, getRestOfTitle } from '../../utils/textUtilites';

const Habilidades = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [textSkill, setTextSkill] = useState<string>('');
  
  const skillsList = getSkillsData(theme);

  useEffect(() => {
    setTextSkill(t("skills.defaultText"));
  }, [t]);

  const titleStyle = {
    color: theme === "light"
      ? themeObject.themes.light.skills.container.colorTitle
      : themeObject.themes.dark.skills.container.colorTitle
  };

  const handleMouseEnter = (key: string) => {
    setTextSkill(t(`skills.${key}`));
  };

  const handleMouseLeave = () => {
    setTextSkill(t("skills.defaultText"));
  };

  return (
    <div className="groupSkills" id="skills" style={containerStyle(theme, themeObject)}>
      <section className="skills">
        <article className="groupSkills-primary hidden-scroll-left">
          <div className="dividir-titulo-linha">
            <div className="linhas"></div>
            <div className="linhas"></div>
            <div className="linhas"></div>
            <h2 className="titleSkills" style={titleStyle}>
              &#8249; <span className="letraMonoton">{getFirstLetterTitle(t("skills.title"))}</span>{getRestOfTitle(t("skills.title"))} &#8260; &#8250;
            </h2>
          </div>
          <p className="textSkills" id="description-skills" style={textStyle(theme, themeObject)}>
            {textSkill}
          </p>
        </article>
        <article className="groupSkills-secundary hidden-scroll-left">
          {skillsList.map((skill) => (
            <article
              key={skill.tech}
              onMouseEnter={() => handleMouseEnter(skill.key)}
              onMouseLeave={handleMouseLeave}
              className={`skill-element ${skill.tech.toLowerCase()} ${theme === "light" ? "skill-element-border-light" : "skill-element-border-dark"}`}
              style={styleCardSkill(theme, themeObject)}
            >
              <img
                loading="lazy"
                src={skill.image}
                alt={`Logo do ${skill.tech}`}
              />
            </article>
          ))}
        </article>
      </section>
    </div>
  );
};

export default Habilidades;