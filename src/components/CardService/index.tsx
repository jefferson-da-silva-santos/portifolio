// components/ServiceCard.tsx
import React, { useEffect, useState } from "react";
import type { ServiceCardProps } from "./types";
import useTheme from "../../hooks/useTheme";
import objectTheme from "../../assets/theme.json";
import {
  cardStyles,
  circleCenterStyles,
  textStyles,
  titleStyles,
} from "./styles";

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  cardClass,
  circleClass,
  imageClass,
}) => {
  const { theme } = useTheme();
  const [classBorderCard, setClassBorderCard] = useState("");

  useEffect(() => {
    setClassBorderCard(() =>
      theme === "light"
        ? "service-card-border-light"
        : "service-card-border-dark"
    );
  }, [theme]);

  return (
    <article
      style={cardStyles(theme, objectTheme)}
      className={`card-service ${cardClass} ${classBorderCard}`}
    >
      <div className={`circle-externo-servico ${circleClass}`}>
        <div
          className="circle-interno-servico"
          style={circleCenterStyles(theme, objectTheme)}
        >
          <img
            loading="lazy"
            className={imageClass}
            src={imageSrc}
            alt={imageAlt}
          />
        </div>
      </div>
      <h3
        className="title-card-service"
        style={titleStyles(theme, objectTheme)}
      >
        {title}
      </h3>
      <p
        style={textStyles(theme, objectTheme)}
        className="description-card-service"
      >
        {description}
      </p>
    </article>
  );
};

export default ServiceCard;
