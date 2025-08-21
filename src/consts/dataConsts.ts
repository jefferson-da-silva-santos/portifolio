import { useTranslation } from "react-i18next";
import type { INavLinks, IProjectImages, ISocialButton } from "./types";
import "../i18n";

export const projectImages: IProjectImages[] = [
  {
    url: "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png",
    alt: "Logo do Framework React",
  },
  {
    url: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/modo-claro.webp",
    alt: "Icone do tema claro",
  },
  {
    url: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/modo-escuro.webp",
    alt: "Icone do tema escuro",
  },
];

// icones relacionados ao tema do portfólio
export const listIconTheme: string[] = [
  projectImages[1].url,
  projectImages[2].url,
];

// links de navegação do portfólio e seus respectivos ids
export const useNavLinks = (): INavLinks[] => {
  const { t } = useTranslation();

  return [
    { text: t("navigation.links.home"), href: "#home", controls: "home" },
    { text: t("navigation.links.about"), href: "#about", controls: "about" },
    { text: t("navigation.links.skills"), href: "#skills", controls: "skills" },
    { text: t("navigation.links.projects"), href: "#project", controls: "project" },
    { text: t("navigation.links.services"), href: "#service", controls: "service" },
    { text: t("navigation.links.contact"), href: "#contact", controls: "contact" },
  ];
};

// lista de botões de redes sociais com seus respectivos links e classes de ícones
export const socialButtonList: ISocialButton[] = [
  {
    arialLAbel: "Abrir github",
    url: "https://github.com/jefferson-da-silva-santos",
    iconClass: "bx bxl-github",
    index: 0,
  },
  {
    arialLAbel: "Abrir linkedin",
    url: "https://www.linkedin.com/in/jefferson-santos-a87b74277/",
    iconClass: "bx bxl-linkedin-square",
    index: 1,
  },
  {
    arialLAbel: "Abrir linkedin",
    url: "https://wa.me/558195124550?text=Olá%2C%20Jefferson!%20Encontrei%20seu%20portfólio%20e%20gostaria%20de%20saber%20mais%20sobre%20seus%20serviços%20de%20programação.%20Poderíamos%20conversar%3F",
    iconClass: "bx bxl-whatsapp",
    index: 2,
  },
];
