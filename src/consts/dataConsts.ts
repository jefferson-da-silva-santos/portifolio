import { useTranslation } from "react-i18next";
import type { INavLinks, IProjectImages, ISocialButton } from "./types";
import "../i18n";
import type { LanguageMap } from "../contexts/types";

export const ImageUrls = {
  logos: {
    react: "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png",
    node: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_node.webp",
    express: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_express.webp",
    nest: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_nest.webp",
    next: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_next.webp",
    next_dark: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_next_black.webp",
    sass: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_sass.webp",
    flutter: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_flutter.webp",
    java: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_java.webp",
    postgresql: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_postgres.webp",
    mysql: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_mysql.webp",
    git: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_git.webp",
    docker: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_docker.webp",
  },
  icons: {
    brazil: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/brasil.png",
    usa: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/eua.webp",
    spain: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/es_1.webp",
    italy: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/it_1.webp",
    france: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/france_1.webp",
    lightTheme: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/modo-claro.webp",
    darkTheme: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/modo-escuro.webp",
    coffee: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/cafe_semfundo.png",
  },
  services: {
    code: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/service_code.webp",
    phone: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/service_phone.webp",
    api: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/service_api.webp",
  }
};

export const projectImages: IProjectImages[] = [
  { url: ImageUrls.logos.react, alt: "Logo do Framework React" },
  { url: ImageUrls.icons.lightTheme, alt: "Icone do tema claro" },
  { url: ImageUrls.icons.darkTheme, alt: "Icone do tema escuro" },
  { url: ImageUrls.icons.coffee, alt: "xicara de café flutuante" }
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
    { text: t("navigation.links.projects"), href: "#project", controls: "project" },
    { text: t("navigation.links.services"), href: "#service", controls: "service" },
    { text: t("navigation.links.contact"), href: "#contact", controls: "contact" },
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
  pt: { icon: ImageUrls.icons.brazil, locale: 'pt' },
  en: { icon: ImageUrls.icons.usa, locale: 'en' },
  es: { icon: ImageUrls.icons.spain, locale: 'es' },
  it: { icon: ImageUrls.icons.italy, locale: 'it' },
  fr: { icon: ImageUrls.icons.france, locale: 'fr' },
};

export const handleNextImg = (theme: string) => {
  return theme === "dark" 
    ? ImageUrls.logos.next
    : ImageUrls.logos.next_dark;
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
    { tech: "PostgreSQL", key: "textPostgres", image: ImageUrls.logos.postgresql },
    { tech: "MySQL", key: "textMySQL", image: ImageUrls.logos.mysql },
    { tech: "Git", key: "textGit", image: ImageUrls.logos.git },
    { tech: "Docker", key: "textDocker", image: ImageUrls.logos.docker },
  ];
};

export const projectsData = [
  {
    title: "Cardápio Online",
    stack: "Stack: Vite | HTML | SASS | CSS | JavaScript | API ViaCep",
    imageClass: "cardapio",
    buttonClass: "cardapio"
  },
  {
    title: "Jéssica Planilhas",
    stack: "Stack: Vite | HTML | CSS | JavaScript | Bootstrap Icons",
    imageClass: "planilhas",
    buttonClass: "planilhas"
  },
  {
    title: "Loja de Sushi",
    stack: "Stack: Vite | HTML | CSS | SASS | JavaScript | autoprefixer",
    imageClass: "sushi",
    buttonClass: "sushi"
  },
  {
    title: "Lan House Infoccell",
    stack: "Stack: Vite | HTML | CSS | SASS | JavaScript",
    imageClass: "infoccell",
    buttonClass: "infoccell"
  },
  {
    title: "Bolachas Léo de Lita",
    stack: "Stack: Vite | HTML | CSS | SASS | JavaScript",
    imageClass: "leoLita",
    buttonClass: "leoLita"
  },
  {
    title: "Calculadora de IMC",
    stack: "Stack: HTML | CSS | JavaScript | SEO",
    imageClass: "calculadoraIMC",
    buttonClass: "calculadoraIMC"
  },
  {
    title: "Página de Venda de Plani",
    stack: "Stack: HTML | SASS | CSS | JavaScript | SEO",
    imageClass: "paginaVendasJessica",
    buttonClass: "paginaVendasJessica"
  },
  {
    title: "Promoção 3D",
    stack: "Stack: HTML | SASS | CSS | JavaScript | SEO",
    imageClass: "promocao3D",
    buttonClass: "promocao3D"
  },
  {
    title: "Promoção 3D",
    stack: "Stack: HTML | SASS | CSS | JavaScript | SEO",
    imageClass: "paginaPlanner",
    buttonClass: "paginaPlanner"
  }
];

export const servicesData = [
  {
    title: "Website Creation",
    description: "Creation of personalized websites, whether personal or for various business sectors",
    imageSrc: ImageUrls.services.code,
    imageAlt: "simbolo da programação",
    cardClass: "card-service-code",
    circleClass: "circle-externo-servico-code",
    imageClass: "service_code",
  },
  {
    title: "Responsive Websites",
    description: "All websites are responsive, to further improve the user experience on any device.",
    imageSrc: ImageUrls.services.phone,
    imageAlt: "imagem de um celular",
    cardClass: "card-service-phone",
    circleClass: "circle-externo-servico-phone",
    imageClass: "service_phone",
  },
  {
    title: "Creating APIs",
    description: "Creation of secure Rest APIs, and integration with external databases experience.",
    imageSrc: ImageUrls.services.api,
    imageAlt: "Simbolo de uma API",
    cardClass: "card-service-api",
    circleClass: "circle-externo-servico-api",
    imageClass: "service_api",
  },
];