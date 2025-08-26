import { useTranslation } from "react-i18next";
import type { INavLinks, IProjectImages, ISocialButton } from "./types";
import "../i18n";
import type { LanguageMap } from "../contexts/types";

export const ImageUrls = {
  logos: {
    react:
      "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png",
    node: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_node.webp",
    express:
      "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_express.webp",
    nest: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_nest.webp",
    next: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_next.webp",
    next_dark:
      "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_next_black.webp",
    sass: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_sass.webp",
    flutter:
      "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_flutter.webp",
    java: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_java.webp",
    postgresql:
      "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_postgres.webp",
    mysql:
      "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_mysql.webp",
    git: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_git.webp",
    docker:
      "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_docker.webp",
    vite: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_vite.webp",
    css: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_css.webp",
    javascript:
      "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_js.webp",
    typescript:
      "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_ts.webp",
    html: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_html.webp",
  },
  icons: {
    brazil:
      "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/brasil.png",
    usa: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/eua.webp",
    spain:
      "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/es_1.webp",
    italy:
      "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/it_1.webp",
    france:
      "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/france_1.webp",
    lightTheme:
      "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/modo-claro.webp",
    darkTheme:
      "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/modo-escuro.webp",
    coffee:
      "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/cafe_semfundo.png",
  },
  services: {
    code: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/service_code.webp",
    phone:
      "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/service_phone.webp",
    api: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/service_api.webp",
  },
};

export const projectImages: IProjectImages[] = [
  { url: ImageUrls.logos.react, alt: "Logo do Framework React" },
  { url: ImageUrls.icons.lightTheme, alt: "Icone do tema claro" },
  { url: ImageUrls.icons.darkTheme, alt: "Icone do tema escuro" },
  { url: ImageUrls.icons.coffee, alt: "xicara de café flutuante" },
];

export const listIconTheme: string[] = [
  ImageUrls.icons.lightTheme,
  ImageUrls.icons.darkTheme,
];

export const listIconLenguage: string[] = [
  ImageUrls.icons.brazil,
  ImageUrls.icons.usa,
  ImageUrls.icons.spain,
  ImageUrls.icons.italy,
  ImageUrls.icons.france,
];

export const useNavLinks = (): INavLinks[] => {
  const { t } = useTranslation();

  return [
    { text: t("navigation.links.home"), href: "#home", controls: "home" },
    { text: t("navigation.links.about"), href: "#about", controls: "about" },
    { text: t("navigation.links.skills"), href: "#skills", controls: "skills" },
    {
      text: t("navigation.links.projects"),
      href: "#project",
      controls: "project",
    },
    {
      text: t("navigation.links.services"),
      href: "#service",
      controls: "service",
    },
    {
      text: t("navigation.links.contact"),
      href: "#contact",
      controls: "contact",
    },
  ];
};

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

export const languageMap: LanguageMap = {
  pt: { icon: ImageUrls.icons.brazil, locale: "pt" },
  en: { icon: ImageUrls.icons.usa, locale: "en" },
  es: { icon: ImageUrls.icons.spain, locale: "es" },
  it: { icon: ImageUrls.icons.italy, locale: "it" },
  fr: { icon: ImageUrls.icons.france, locale: "fr" },
};

export const handleNextImg = (theme: string) => {
  return theme === "dark" ? ImageUrls.logos.next : ImageUrls.logos.next_dark;
};

export const getSkillsData = (theme: string) => {
  return [
    { tech: "Nodejs", key: "textNodejs", image: ImageUrls.logos.node },
    { tech: "Express", key: "textExpress", image: ImageUrls.logos.express },
    { tech: "NestJS", key: "textNestjs", image: ImageUrls.logos.nest },
    { tech: "React", key: "textReact", image: ImageUrls.logos.react },
    { tech: "Nextjs", key: "textNextJs", image: handleNextImg(theme) },
    { tech: "Sass", key: "textSass", image: ImageUrls.logos.sass },
    { tech: "Flutter", key: "textFlutter", image: ImageUrls.logos.flutter },
    { tech: "Java", key: "textJava", image: ImageUrls.logos.java },
    {
      tech: "PostgreSQL",
      key: "textPostgres",
      image: ImageUrls.logos.postgresql,
    },
    { tech: "MySQL", key: "textMySQL", image: ImageUrls.logos.mysql },
    { tech: "Git", key: "textGit", image: ImageUrls.logos.git },
    { tech: "Docker", key: "textDocker", image: ImageUrls.logos.docker },
  ];
};

export const technologiesData = {
  react: {
    imageSrc: ImageUrls.logos.react,
    text: "React",
    className: "react-item-list",
  },
  sass: {
    imageSrc: ImageUrls.logos.sass,
    text: "SASS",
    className: "sass-item-list",
  },
  java: {
    imageSrc: ImageUrls.logos.java,
    text: "Java",
    className: "java-item-list",
  },
  nest: {
    imageSrc: ImageUrls.logos.nest,
    text: "NestJS",
    className: "nest-item-list",
  },
  next: {
    imageSrc: ImageUrls.logos.next,
    text: "NextJs",
    className: "next-item-list",
  },
  express: {
    imageSrc: ImageUrls.logos.express,
    text: "Express",
    className: "express-item-list",
  },
  mysql: {
    imageSrc: ImageUrls.logos.mysql,
    text: "MySQL",
    className: "mysql-item-list",
  },
  postgresql: {
    imageSrc: ImageUrls.logos.postgresql,
    text: "PostgreSQL",
    className: "postgres-item-list",
  },
  git: {
    imageSrc: ImageUrls.logos.git,
    text: "GIT/GitHub",
    className: "git-item-list",
  },
  docker: {
    imageSrc: ImageUrls.logos.docker,
    text: "Docker",
    className: "docker-item-list",
  },
  flutter: {
    imageSrc: ImageUrls.logos.flutter,
    text: "Flutter",
    className: "flutter-item-list",
  },
  nodejs: {
    imageSrc: ImageUrls.logos.node,
    text: "NodeJs",
    className: "node-item-list",
  },
  vite: {
    imageSrc: ImageUrls.logos.vite,
    text: "Vite",
    className: "vite-item-list",
  },
  css: {
    imageSrc: ImageUrls.logos.css,
    text: "CSS",
    className: "css-item-list",
  },
  javascript: {
    imageSrc: ImageUrls.logos.javascript,
    text: "JavaScript",
    className: "js-item-list",
  },
  typescript: {
    imageSrc: ImageUrls.logos.typescript,
    text: "TypeScript",
    className: "ts-item-list",
  },
  html: {
    imageSrc: ImageUrls.logos.html,
    text: "HTML",
    className: "html-item-list",
  },
};

export const useProjectsData = () => {
  const { t } = useTranslation();

  return [
    {
      id: 1,
      imgUrl:
        "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/cardapio.png",
      title: t("project.list.0.title"),
      description: t("project.list.0.description"),
      stack: t("project.list.0.stack"),
      technologies: ["vite", "html", "sass", "css", "javascript"],
      imageClass: "cardapio",
      buttonClass: "cardapio",
      gitHubUrl: "",
      deployUrl: "",
    },
    {
      id: 2,
      imgUrl:
        "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/projeto-jessica-planilhas.webp",
      title: t("project.list.1.title"),
      description: t("project.list.1.description"),
      stack: t("project.list.1.stack"),
      technologies: ["vite", "html", "css", "javascript"],
      imageClass: "planilhas",
      buttonClass: "planilhas",
      gitHubUrl: "",
      deployUrl: "",
    },
    {
      id: 3,
      imgUrl:
        "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/sushi.png",
      title: t("project.list.2.title"),
      description: t("project.list.2.description"),
      stack: t("project.list.2.stack"),
      technologies: ["vite", "html", "css", "sass", "javascript"],
      imageClass: "sushi",
      buttonClass: "sushi",
      gitHubUrl: "",
      deployUrl: "",
    },
    {
      id: 4,
      imgUrl:
        "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/infoccell.png",
      title: t("project.list.3.title"),
      description: t("project.list.3.description"),
      stack: t("project.list.3.stack"),
      technologies: ["vite", "html", "css", "sass", "javascript"],
      imageClass: "infoccell",
      buttonClass: "infoccell",
      gitHubUrl: "",
      deployUrl: "",
    },
    {
      id: 5,
      imgUrl:
        "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/leo-de-lita.png",
      title: t("project.list.4.title"),
      description: t("project.list.4.description"),
      stack: t("project.list.4.stack"),
      technologies: ["vite", "html", "css", "sass", "javascript"],
      imageClass: "leoLita",
      buttonClass: "leoLita",
      gitHubUrl: "",
      deployUrl: "",
    },
    {
      id: 6,
      imgUrl:
        "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/projeto-calculadora-de-imc.webp",
      title: t("project.list.5.title"),
      description: t("project.list.5.description"),
      stack: t("project.list.5.stack"),
      technologies: ["html", "css", "javascript"],
      imageClass: "calculadoraIMC",
      buttonClass: "calculadoraIMC",
      gitHubUrl: "",
      deployUrl: "",
    },
    {
      id: 7,
      imgUrl:
        "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/planner.png",
      title: t("project.list.6.title"),
      description: t("project.list.6.description"),
      stack: t("project.list.6.stack"),
      technologies: ["html", "sass", "css", "javascript"],
      imageClass: "paginaVendasJessica",
      buttonClass: "paginaVendasJessica",
      gitHubUrl: "",
      deployUrl: "",
    },
    {
      id: 8,
      imgUrl:
        "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/promocao3d.png",
      title: t("project.list.7.title"),
      description: t("project.list.7.description"),
      stack: t("project.list.7.stack"),
      technologies: ["html", "sass", "css", "javascript"],
      imageClass: "promocao3D",
      buttonClass: "promocao3D",
      gitHubUrl: "",
      deployUrl: "",
    },
    {
      id: 9,
      imgUrl:
        "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/planner.png",
      title: t("project.list.8.title"),
      description: t("project.list.8.description"),
      stack: t("project.list.8.stack"),
      technologies: ["html", "sass", "css", "javascript"],
      imageClass: "paginaPlanner",
      buttonClass: "paginaPlanner",
      gitHubUrl: "",
      deployUrl: "",
    },
  ];
};
// export const projectsData =
export const useServicesData = () => {
  const { t } = useTranslation();
  const servicesData = [
    {
      title: t("services.card1.title"),
      description: t("services.card1.text"),
      imageSrc: ImageUrls.services.code,
      imageAlt: "simbolo da programação",
      cardClass: "card-service-code",
      circleClass: "circle-externo-servico-code",
      imageClass: "service_code",
    },
    {
      title: t("services.card2.title"),
      description: t("services.card2.text"),
      imageSrc: ImageUrls.services.phone,
      imageAlt: "imagem de um celular",
      cardClass: "card-service-phone",
      circleClass: "circle-externo-servico-phone",
      imageClass: "service_phone",
    },
    {
      title: t("services.card3.title"),
      description: t("services.card3.text"),
      imageSrc: ImageUrls.services.api,
      imageAlt: "Simbolo de uma API",
      cardClass: "card-service-api",
      circleClass: "circle-externo-servico-api",
      imageClass: "service_api",
    },
  ];

  return { servicesData };
};
