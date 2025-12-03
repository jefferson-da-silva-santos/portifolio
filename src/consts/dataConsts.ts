import { useTranslation } from "react-i18next";
import type { INavLinks, IProjectImages, ISocialButton } from "./types";
import "../i18n";
import type { LanguageMap } from "../contexts/types";

// =======================
// IMPORTS DE LOGOS
// =======================
import react from '../assets/image/react.webp';
import node from '../assets/image/skill_node.webp';
import express from '../assets/image/skill_express.webp';
import nest from '../assets/image/skill_nest.webp';
import next from '../assets/image/skill_next.webp';
import next_dark from '../assets/image/skill_next_black.webp';
import sass from '../assets/image/skill_sass.webp';
import flutter from '../assets/image/skill_flutter.webp';
import java from '../assets/image/skill_java.webp';
import postgresql from '../assets/image/skill_postgres.webp';
import mysql from '../assets/image/skill_mysql.webp';
import git from '../assets/image/skill_git.webp';
import docker from '../assets/image/skill_docker.webp';
import vite from '../assets/image/skill_vite.webp';
import css from '../assets/image/skill_css.webp';
import javascript from '../assets/image/skill_js.webp';
import typescript from '../assets/image/skill_ts.webp';
import html from '../assets/image/skill_html.webp';

// =======================
// IMPORTS DE ICONES
// =======================
import brazil from '../assets/image/brasil.png';
import usa from '../assets/image/eua.webp';
import spain from '../assets/image/es_1.webp';
import italy from '../assets/image/it_1.webp';
import france from '../assets/image/france_1.webp';
import lightTheme from '../assets/image/modo-claro.webp';
import darkTheme from '../assets/image/modo-escuro.webp';
import coffee from '../assets/image/cafe_semfundo.png';

// =======================
// IMPORTS DE SERVICES
// =======================
import code from '../assets/image/service_code.webp';
import phone from '../assets/image/service_phone.webp';
import api from '../assets/image/service_api.webp';

// =======================
// IMPORTS DE PROJETOS
// =======================
import cardapio from '../assets/image/cardapio.png';
import jessicaPlanilhas from '../assets/image/projeto-jessica-planilhas.webp';
import sushi from '../assets/image/sushi.png';
import infoccell from '../assets/image/infoccell.png';
import leoDeLita from '../assets/image/leo-de-lita.png';
import calculadoraImc from '../assets/image/projeto-calculadora-de-imc.webp';
import planner from '../assets/image/planner.png';
import promocao3d from '../assets/image/promocao3d.png';

// ======================================
// OBJETO FINAL, FIEL À SUA ESTRUTURA
// ======================================

export const ImageUrls = {
  logos: {
    react,
    node,
    express,
    nest,
    next,
    next_dark,
    sass,
    flutter,
    java,
    postgresql,
    mysql,
    git,
    docker,
    vite,
    css,
    javascript,
    typescript,
    html,
  },
  icons: {
    brazil,
    usa,
    spain,
    italy,
    france,
    lightTheme,
    darkTheme,
    coffee,
  },
  services: {
    code,
    phone,
    api,
  },
  projects: {
    cardapio,
    jessicaPlanilhas,
    sushi,
    infoccell,
    leoDeLita,
    calculadoraImc,
    planner,
    promocao3d,
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
    arialLAbel: "Abrir whatsapp",
    url: "https://wa.me/558199367426?text=Olá%2C%20Jefferson!%20Encontrei%20seu%20portfólio%20e%20gostaria%20de%20saber%20mais%20sobre%20seus%20serviços%20de%20programação.%20Poderíamos%20conversar%3F",
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
      imgUrl: ImageUrls.projects.cardapio,
      title: t("project.list.0.title"),
      description: t("project.list.0.description"),
      stack: t("project.list.0.stack"),
      technologies: ["vite", "html", "sass", "css", "javascript"],
      imageClass: "cardapio",
      buttonClass: "cardapio",
      gitHubUrl: "https://github.com/jefferson-da-silva-santos/cardapio-online",
      deployUrl: "https://cardapioonlinee.netlify.app",
    },
    {
      id: 2,
      imgUrl: ImageUrls.projects.jessicaPlanilhas,
      title: t("project.list.1.title"),
      description: t("project.list.1.description"),
      stack: t("project.list.1.stack"),
      technologies: ["vite", "html", "css", "javascript"],
      imageClass: "planilhas",
      buttonClass: "planilhas",
      gitHubUrl: "https://github.com/jefferson-da-silva-santos/cardapio-online",
      deployUrl: "https://cardapioonlinee.netlify.app",
    },
    {
      id: 3,
      imgUrl: ImageUrls.projects.sushi,
      title: t("project.list.2.title"),
      description: t("project.list.2.description"),
      stack: t("project.list.2.stack"),
      technologies: ["vite", "html", "css", "sass", "javascript"],
      imageClass: "sushi",
      buttonClass: "sushi",
      gitHubUrl: "https://github.com/jefferson-da-silva-santos/cardapio-online",
      deployUrl: "https://cardapioonlinee.netlify.app",
    },
    {
      id: 4,
      imgUrl: ImageUrls.projects.infoccell,
      title: t("project.list.3.title"),
      description: t("project.list.3.description"),
      stack: t("project.list.3.stack"),
      technologies: ["vite", "html", "css", "sass", "javascript"],
      imageClass: "infoccell",
      buttonClass: "infoccell",
      gitHubUrl: "https://github.com/jefferson-da-silva-santos/cardapio-online",
      deployUrl: "https://cardapioonlinee.netlify.app",
    },
    {
      id: 5,
      imgUrl: ImageUrls.projects.leoDeLita,
      title: t("project.list.4.title"),
      description: t("project.list.4.description"),
      stack: t("project.list.4.stack"),
      technologies: ["vite", "html", "css", "sass", "javascript"],
      imageClass: "leoLita",
      buttonClass: "leoLita",
      gitHubUrl: "https://github.com/jefferson-da-silva-santos/cardapio-online",
      deployUrl: "https://cardapioonlinee.netlify.app",
    },
    {
      id: 6,
      imgUrl: ImageUrls.projects.calculadoraImc,
      title: t("project.list.5.title"),
      description: t("project.list.5.description"),
      stack: t("project.list.5.stack"),
      technologies: ["html", "css", "javascript"],
      imageClass: "calculadoraIMC",
      buttonClass: "calculadoraIMC",
      gitHubUrl: "https://github.com/jefferson-da-silva-santos/cardapio-online",
      deployUrl: "https://cardapioonlinee.netlify.app",
    },
    {
      id: 7,
      imgUrl: ImageUrls.projects.planner,
      title: t("project.list.6.title"),
      description: t("project.list.6.description"),
      stack: t("project.list.6.stack"),
      technologies: ["html", "sass", "css", "javascript"],
      imageClass: "paginaVendasJessica",
      buttonClass: "paginaVendasJessica",
      gitHubUrl: "https://github.com/jefferson-da-silva-santos/cardapio-online",
      deployUrl: "https://cardapioonlinee.netlify.app",
    },
    {
      id: 8,
      imgUrl: ImageUrls.projects.promocao3d,
      title: t("project.list.7.title"),
      description: t("project.list.7.description"),
      stack: t("project.list.7.stack"),
      technologies: ["html", "sass", "css", "javascript"],
      imageClass: "promocao3D",
      buttonClass: "promocao3D",
      gitHubUrl: "https://github.com/jefferson-da-silva-santos/cardapio-online",
      deployUrl: "https://cardapioonlinee.netlify.app",
    },
    {
      id: 9,
      imgUrl: ImageUrls.projects.planner,
      title: t("project.list.8.title"),
      description: t("project.list.8.description"),
      stack: t("project.list.8.stack"),
      technologies: ["html", "sass", "css", "javascript"],
      imageClass: "paginaPlanner",
      buttonClass: "paginaPlanner",
      gitHubUrl: "https://github.com/jefferson-da-silva-santos/cardapio-online",
      deployUrl: "https://cardapioonlinee.netlify.app",
    },
  ];
};

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