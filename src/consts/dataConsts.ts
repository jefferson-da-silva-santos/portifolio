import { useTranslation } from "react-i18next";
import type { INavLinks, IProjectImages, ISocialButton } from "./types";
import "../i18n";
import type { LanguageMap } from "../contexts/types";

// =======================
// IMPORTS DE LOGOS
// =======================
import react from "../assets/image/react.webp";
import node from "../assets/image/skill_node.webp";
import express from "../assets/image/skill_express.webp";
import nest from "../assets/image/skill_nest.webp";
import next from "../assets/image/skill_next.webp";
import next_dark from "../assets/image/skill_next_black.webp";
import sass from "../assets/image/skill_sass.webp";
import flutter from "../assets/image/skill_flutter.webp";
import java from "../assets/image/skill_java.webp";
import postgresql from "../assets/image/skill_postgres.webp";
import mysql from "../assets/image/skill_mysql.webp";
import git from "../assets/image/skill_git.webp";
import docker from "../assets/image/skill_docker.webp";
import vite from "../assets/image/skill_vite.webp";
import css from "../assets/image/skill_css.webp";
import javascript from "../assets/image/skill_js.webp";
import typescript from "../assets/image/skill_ts.webp";
import html from "../assets/image/skill_html.webp";
import nodecache from "../assets/image/nodecache.png";
import aos from "../assets/image/aos.png";
import emailjs from "../assets/image/emailjs.png";
// =======================
// IMPORTS DE ICONES
// =======================
import brazil from "../assets/image/brasil.png";
import usa from "../assets/image/eua.webp";
import spain from "../assets/image/es_1.webp";
import italy from "../assets/image/it_1.webp";
import france from "../assets/image/france_1.webp";
import lightTheme from "../assets/image/modo-claro.webp";
import darkTheme from "../assets/image/modo-escuro.webp";
import coffee from "../assets/image/cafe_semfundo.png";

// =======================
// IMPORTS DE SERVICES
// =======================
import code from "../assets/image/service_code.webp";
import phone from "../assets/image/service_phone.webp";
import api from "../assets/image/service_api.webp";

// =======================
// IMPORTS DE PROJETOS
// =======================
import cardapio from "../assets/image/cardapio.webp";
import jessicaPlanilhas from "../assets/image/projeto-jessica-planilhas.webp";
import sushi from "../assets/image/sushi.webp";
import infoccell from "../assets/image/infoccell.png";
import leoDeLita from "../assets/image/leo_de_lita.webp";
import calculadoraImc from "../assets/image/projeto-calculadora-de-imc.webp";
import planner from "../assets/image/planner.png";
import promocao3d from "../assets/image/promocao3d.png";
import jtecPlatform from "../assets/image/jtec_web.webp";
import jtecApi from "../assets/image/api_jtec.png";
import oticasLeal from "../assets/image/oticas_leal.webp";
import idePlatform from "../assets/image/ide.webp";
import ideApi from "../assets/image/api_ide.png";
import lpPiano from "../assets/image/curso_teclado.webp";
import lpReact from "../assets/image/curso_react.png";
import lpEbook from "../assets/image/ebookReceitas.png";
import lpMentoria from "../assets/image/mentoria.webp";
import lpDentista from "../assets/image/dentista.webp";
import portifolio from "../assets/image/portifolio.png";
import axios from "../assets/image/axios.png";
import boxicons from "../assets/image/boxicons.png";
import chartjs from "../assets/image/chartjs.svg";
import datafns from "../assets/image/data.svg";
import formik from "../assets/image/formik.png";
import hostinger from "../assets/image/hostinger.png";
import i18next from "../assets/image/i18next.png";
import jest from "../assets/image/jest.png";
import joi from "../assets/image/joi.png";
import jwt from "../assets/image/jwt.webp";
import materialui from "../assets/image/materialui.png";
import render from "../assets/image/render.jpg";
import sequelize from "../assets/image/sequelize.svg";
import vercel from "../assets/image/vercel.png";
import winston from "../assets/image/winston.png";
import primereact from "../assets/image/primereact.webp";
import netlify from "../assets/image/netlify.png";
import type { Tag } from "../pages/Blog";
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
    axios,
    boxicons,
    chartjs,
    datafns,
    formik,
    hostinger,
    i18next,
    jest,
    joi,
    jwt,
    materialui,
    render,
    sequelize,
    vercel,
    winston,
    primereact,
    netlify,
    nodecache,
    aos,
    emailjs,
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
    jtecPlatform,
    jtecApi,
    oticasLeal,
    idePlatform,
    ideApi,
    lpPiano,
    lpReact,
    lpEbook,
    lpMentoria,
    lpDentista,
    portifolio,
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
    {
      text: t("navigation.links.blog"),
      href: "/blog",
      controls: "blog",
    }
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
  axios: {
    imageSrc: ImageUrls.logos.axios,
    text: "Axios",
    className: "axios-item-list",
  },
  boxicons: {
    imageSrc: ImageUrls.logos.boxicons,
    text: "BoxIcons",
    className: "boxicons-item-list",
  },
  chartjs: {
    imageSrc: ImageUrls.logos.chartjs,
    text: "ChartJs",
    className: "chartjs-item-list",
  },
  datafns: {
    imageSrc: ImageUrls.logos.datafns,
    text: "DataFns",
    className: "datafns-item-list",
  },
  formik: {
    imageSrc: ImageUrls.logos.formik,
    text: "Formik",
    className: "formik-item-list",
  },
  hostinger: {
    imageSrc: ImageUrls.logos.hostinger,
    text: "Hostinger",
    className: "hostinger-item-list",
  },
  i18next: {
    imageSrc: ImageUrls.logos.i18next,
    text: "i18next",
    className: "i18next-item-list",
  },
  jest: {
    imageSrc: ImageUrls.logos.jest,
    text: "Jest",
    className: "jest-item-list",
  },
  joi: {
    imageSrc: ImageUrls.logos.joi,
    text: "Joi",
    className: "joi-item-list",
  },
  jwt: {
    imageSrc: ImageUrls.logos.jwt,
    text: "JWT",
    className: "jwt-item-list",
  },
  materialui: {
    imageSrc: ImageUrls.logos.materialui,
    text: "MaterialUI",
    className: "materialui-item-list",
  },
  primereact: {
    imageSrc: ImageUrls.logos.primereact,
    text: "PrimeReact",
    className: "primereact-item-list",
  },
  render: {
    imageSrc: ImageUrls.logos.render,
    text: "Render",
    className: "render-item-list",
  },
  sequelize: {
    imageSrc: ImageUrls.logos.sequelize,
    text: "Sequelize",
    className: "sequelize-item-list",
  },
  vercel: {
    imageSrc: ImageUrls.logos.vercel,
    text: "Vercel",
    className: "vercel-item-list",
  },
  winston: {
    imageSrc: ImageUrls.logos.winston,
    text: "Winston",
    className: "winston-item-list",
  },
  netlify: {
    imageSrc: ImageUrls.logos.netlify,
    text: "Netlify",
    className: "netlify-item-list",
  },
  nodecache: {
    imageSrc: ImageUrls.logos.nodecache,
    text: "Node Cache",
    className: "nodecache-item-list",
  },
  aos: {
    imageSrc: ImageUrls.logos.aos,
    text: "AOS",
    className: "aos-item-list",
  },
  emailjs: {
    imageSrc: ImageUrls.logos.emailjs,
    text: "EmailJS",
    className: "emailjs-item-list",
  },
};

export const useProjectsData = () => {
  const { t } = useTranslation();

  return [
    {
      id: 1,
      imgUrl: ImageUrls.projects.jtecPlatform,
      title: t("project.list.0.title"),
      description: t("project.list.0.description"),
      stack: t("project.list.0.stack"),
      technologies: ["next", "javascript"],
      libs: ["chartjs", "sass", "primereact", "axios", "boxicons", "formik"],
      infra: ["vercel", "vite"],
      imageClass: "jtecPlatform",
      buttonClass: "jtecPlatform",
      gitHubUrl: "",
      deployUrl: "https://track-you.vercel.app",
      isApi: false,
      category: categoryProjects[0],
    },
    {
      id: 2,
      imgUrl: ImageUrls.projects.jtecApi,
      title: t("project.list.1.title"),
      description: t("project.list.1.description"),
      stack: t("project.list.1.stack"),
      technologies: ["nodejs", "express"],
      libs: [
        "sequelize",
        "swagger",
        "jwt",
        "datafns",
        "winston",
        "jest",
        "joi",
      ],
      infra: ["postgresql", "docker", "vercel"],
      imageClass: "jtecApi",
      buttonClass: "jtecApi",
      gitHubUrl: "https://github.com/jefferson-da-silva-santos/TrackYouApi",
      deployUrl: "",
      isApi: true,
      category: categoryProjects[1],
    },
    {
      id: 3,
      imgUrl: ImageUrls.projects.leoDeLita,
      title: t("project.list.2.title"),
      description: t("project.list.2.description"),
      stack: t("project.list.2.stack"),
      technologies: ["react", "typescript"],
      libs: ["sass", "formik", "aos", "boxicons", "emailjs"],
      infra: ["hostinger", "vite"],
      imageClass: "leoDeLita",
      buttonClass: "leoDeLita",
      gitHubUrl: "",
      deployUrl: "https://bolachasleodelita.com.br",
      isApi: false,
      category: categoryProjects[0],
    },
    {
      id: 4,
      imgUrl: ImageUrls.projects.oticasLeal,
      title: t("project.list.3.title"),
      description: t("project.list.3.description"),
      stack: t("project.list.3.stack"),
      technologies: ["react", "javascript"],
      libs: ["sass", "aos", "boxicons", "primereact", "emailjs"],
      infra: ["netlify", "vite"],
      imageClass: "oticasLeal",
      buttonClass: "oticasLeal",
      gitHubUrl: "",
      deployUrl: "https://oticasleal.netlify.app",
      isApi: false,
      category: categoryProjects[0],
    },
    {
      id: 5,
      imgUrl: ImageUrls.projects.jessicaPlanilhas,
      title: t("project.list.4.title"),
      description: t("project.list.4.description"),
      stack: t("project.list.4.stack"),
      technologies: ["react", "typescript"],
      libs: ["sass", "aos", "boxicons", "materialui", "emailjs"],
      infra: ["netlify", "vite"],
      imageClass: "jessicaPlanilhas",
      buttonClass: "jessicaPlanilhas",
      gitHubUrl:
        "https://github.com/jefferson-da-silva-santos/website-jessica-planilhas",
      deployUrl: "https://jessica-planilhas.netlify.app",
      isApi: false,
      category: categoryProjects[0],
    },
    {
      id: 6,
      imgUrl: ImageUrls.projects.idePlatform,
      title: t("project.list.5.title"),
      description: t("project.list.5.description"),
      stack: t("project.list.5.stack"),
      technologies: ["react", "javascript"],
      libs: ["sass", "axios", "primereact", "aos", "boxicons", "formik"],
      infra: ["vercel", "vite"],
      imageClass: "idePlatform",
      buttonClass: "idePlatform",
      gitHubUrl: "https://github.com/jefferson-da-silva-santos/ide",
      deployUrl: "https://ide-e-pregai.netlify.app",
      isApi: false,
      category: categoryProjects[0],
    },
    {
      id: 7,
      imgUrl: ImageUrls.projects.ideApi,
      title: t("project.list.6.title"),
      description: t("project.list.6.description"),
      stack: t("project.list.6.stack"),
      technologies: ["nodejs", "express"],
      libs: ["sequelize", "jwt", "nodecache", "joi", "winston"],
      infra: ["postgresql", "vercel"],
      imageClass: "ideApi",
      buttonClass: "ideApi",
      gitHubUrl: "https://github.com/jefferson-da-silva-santos/ide-api",
      deployUrl: "",
      isApi: true,
      category: categoryProjects[1],
    },
    {
      id: 8,
      imgUrl: ImageUrls.projects.lpPiano,
      title: t("project.list.7.title"),
      description: t("project.list.7.description"),
      stack: t("project.list.7.stack"),
      technologies: ["react", "typescript"],
      libs: ["sass", "formik", "aos", "boxicons"],
      infra: ["render", "vite"],
      imageClass: "lpPiano",
      buttonClass: "lpPiano",
      gitHubUrl:
        "https://github.com/jefferson-da-silva-santos/loading-page-curso-teclado",
      deployUrl: "https://loading-page-curso-teclado.onrender.com",
      isApi: false,
      category: categoryProjects[0],
    },
    {
      id: 9,
      imgUrl: ImageUrls.projects.lpReact,
      title: t("project.list.8.title"),
      description: t("project.list.8.description"),
      stack: t("project.list.8.stack"),
      technologies: ["react", "typescript"],
      libs: ["sass", "formik", "aos", "boxicons"],
      infra: ["render", "vite"],
      imageClass: "lpReact",
      buttonClass: "lpReact",
      gitHubUrl:
        "https://github.com/jefferson-da-silva-santos/loading-page-curso-react",
      deployUrl: "https://loading-page-curso-react.onrender.com",
      isApi: false,
      category: categoryProjects[0],
    },
    {
      id: 10,
      imgUrl: ImageUrls.projects.lpEbook,
      title: t("project.list.9.title"),
      description: t("project.list.9.description"),
      stack: t("project.list.9.stack"),
      technologies: ["react", "typescript"],
      libs: ["sass", "formik", "aos", "boxicons"],
      infra: ["render", "vite"],
      imageClass: "lpEbook",
      buttonClass: "lpEbook",
      gitHubUrl:
        "https://github.com/jefferson-da-silva-santos/loading-page-ebook-receitas",
      deployUrl: "https://loading-page-ebook-receitas.onrender.com",
      isApi: false,
      category: categoryProjects[0],
    },
    {
      id: 11,
      imgUrl: ImageUrls.projects.lpMentoria,
      title: t("project.list.10.title"),
      description: t("project.list.10.description"),
      stack: t("project.list.10.stack"),
      technologies: ["react", "typescript"],
      libs: ["sass", "formik", "aos", "boxicons"],
      infra: ["render", "vite"],
      imageClass: "lpMentoria",
      buttonClass: "lpMentoria",
      gitHubUrl:
        "https://github.com/jefferson-da-silva-santos/loading-page-mentoria",
      deployUrl: "https://loading-page-mentoria.onrender.com",
      isApi: false,
      category: categoryProjects[0],
    },
    {
      id: 12,
      imgUrl: ImageUrls.projects.lpDentista,
      title: t("project.list.11.title"),
      description: t("project.list.11.description"),
      stack: t("project.list.11.stack"),
      technologies: ["react", "typescript"],
      libs: ["sass", "formik", "aos", "boxicons"],
      infra: ["render", "vite"],
      imageClass: "lpDentista",
      buttonClass: "lpDentista",
      gitHubUrl:
        "https://github.com/jefferson-da-silva-santos/loading-page-dentista",
      deployUrl: "https://loading-page-dentista.onrender.com",
      isApi: false,
      category: categoryProjects[0],
    },
    {
      id: 13,
      imgUrl: ImageUrls.projects.sushi,
      title: t("project.list.12.title"),
      description: t("project.list.12.description"),
      stack: t("project.list.12.stack"),
      technologies: ["react", "typescript"],
      libs: ["sass", "formik", "aos", "boxicons"],
      infra: ["netlify", "vite"],
      imageClass: "sushi",
      buttonClass: "sushi",
      gitHubUrl:
        "https://github.com/jefferson-da-silva-santos/website-sushi-store",
      deployUrl: "https://website-sushi-store.onrender.com",
      isApi: false,
      category: categoryProjects[0],
    },
    {
      id: 14,
      imgUrl: ImageUrls.projects.portifolio,
      title: t("project.list.13.title"),
      description: t("project.list.13.description"),
      stack: t("project.list.13.stack"),
      technologies: ["react", "typescript"],
      libs: ["sass", "formik", "aos", "boxicons", "i18next"],
      infra: ["netlify", "vite"],
      imageClass: "portifolio",
      buttonClass: "portifolio",
      gitHubUrl: "https://github.com/jefferson-da-silva-santos/portifolio",
      deployUrl: "here",
      isApi: false,
      category: categoryProjects[0],
    },
  ];
};


export const categoryProjects = ["frontend", "backend"];

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


export const TAG_REGISTRY: Record<string, Tag> = {
  JavaScript:      { name: "JavaScript",    color: "#F7DF1E", bg: "rgba(247,223,30,0.09)",   icon: "bxl-javascript" },
  TypeScript:      { name: "TypeScript",    color: "#3178C6", bg: "rgba(49,120,198,0.09)",   icon: "bxl-typescript" },
  Python:          { name: "Python",        color: "#3776AB", bg: "rgba(55,118,171,0.09)",   icon: "bxl-python" },
  Java:            { name: "Java",          color: "#F89820", bg: "rgba(248,152,32,0.09)",   icon: "bxl-java" },
  "C++":           { name: "C++",           color: "#00599C", bg: "rgba(0,89,156,0.09)",     icon: "bx-code-alt" },
  "C#":            { name: "C#",            color: "#9B4F96", bg: "rgba(155,79,150,0.09)",   icon: "bx-code-alt" },
  Go:              { name: "Go",            color: "#00ACD7", bg: "rgba(0,172,215,0.09)",    icon: "bx-code-alt" },
  Rust:            { name: "Rust",          color: "#CE412B", bg: "rgba(206,65,43,0.09)",    icon: "bx-code-alt" },
  Kotlin:          { name: "Kotlin",        color: "#7F52FF", bg: "rgba(127,82,255,0.09)",   icon: "bx-code-alt" },
  Swift:           { name: "Swift",         color: "#FA7343", bg: "rgba(250,115,67,0.09)",   icon: "bx-code-alt" },
  PHP:             { name: "PHP",           color: "#777BB4", bg: "rgba(119,123,180,0.09)",  icon: "bxl-php" },
  Ruby:            { name: "Ruby",          color: "#CC342D", bg: "rgba(204,52,45,0.09)",    icon: "bx-code-alt" },
  Dart:            { name: "Dart",          color: "#0175C2", bg: "rgba(1,117,194,0.09)",    icon: "bx-code-alt" },
  Bash:            { name: "Bash",          color: "#4EAA25", bg: "rgba(78,170,37,0.09)",    icon: "bx-terminal" },
  Solidity:        { name: "Solidity",      color: "#8892BF", bg: "rgba(136,146,191,0.09)",  icon: "bx-code-alt" },
  Elixir:          { name: "Elixir",        color: "#6E4A7E", bg: "rgba(110,74,126,0.09)",   icon: "bx-code-alt" },
  React:           { name: "React",         color: "#61DAFB", bg: "rgba(97,218,251,0.09)",   icon: "bxl-react" },
  Vue:             { name: "Vue",           color: "#42B883", bg: "rgba(66,184,131,0.09)",   icon: "bxl-vuejs" },
  Angular:         { name: "Angular",       color: "#DD0031", bg: "rgba(221,0,49,0.09)",     icon: "bxl-angular" },
  Svelte:          { name: "Svelte",        color: "#FF3E00", bg: "rgba(255,62,0,0.09)",     icon: "bx-code-block" },
  "Next.js":       { name: "Next.js",       color: "#EEEEEE", bg: "rgba(238,238,238,0.06)",  icon: "bx-code-block" },
  "Nuxt.js":       { name: "Nuxt.js",       color: "#00DC82", bg: "rgba(0,220,130,0.09)",   icon: "bx-code-block" },
  Astro:           { name: "Astro",         color: "#FF5D01", bg: "rgba(255,93,1,0.09)",     icon: "bx-code-block" },
  Vite:            { name: "Vite",          color: "#646CFF", bg: "rgba(100,108,255,0.09)",  icon: "bx-zap" },
  Tailwind:        { name: "Tailwind",      color: "#38BDF8", bg: "rgba(56,189,248,0.09)",   icon: "bx-palette" },
  Bootstrap:       { name: "Bootstrap",     color: "#7952B3", bg: "rgba(121,82,179,0.09)",   icon: "bxl-bootstrap" },
  Sass:            { name: "Sass",          color: "#CC6699", bg: "rgba(204,102,153,0.09)",  icon: "bxl-sass" },
  "Material UI":   { name: "Material UI",  color: "#007FFF", bg: "rgba(0,127,255,0.09)",    icon: "bx-palette" },
  "Node.js":       { name: "Node.js",       color: "#339933", bg: "rgba(51,153,51,0.09)",   icon: "bxl-nodejs" },
  Express:         { name: "Express",       color: "#CCCCCC", bg: "rgba(204,204,204,0.06)",  icon: "bx-server" },
  NestJS:          { name: "NestJS",        color: "#E0234E", bg: "rgba(224,35,78,0.09)",    icon: "bx-server" },
  Fastify:         { name: "Fastify",       color: "#DDDDDD", bg: "rgba(221,221,221,0.06)",  icon: "bx-server" },
  Django:          { name: "Django",        color: "#44B78B", bg: "rgba(68,183,139,0.09)",   icon: "bx-server" },
  Flask:           { name: "Flask",         color: "#AAAAAA", bg: "rgba(170,170,170,0.06)",  icon: "bx-server" },
  FastAPI:         { name: "FastAPI",       color: "#009688", bg: "rgba(0,150,136,0.09)",    icon: "bx-server" },
  Laravel:         { name: "Laravel",       color: "#FF2D20", bg: "rgba(255,45,32,0.09)",    icon: "bxl-php" },
  "Spring Boot":   { name: "Spring Boot",  color: "#6DB33F", bg: "rgba(109,179,63,0.09)",   icon: "bx-leaf" },
  PostgreSQL:      { name: "PostgreSQL",   color: "#4169E1", bg: "rgba(65,105,225,0.09)",   icon: "bx-data" },
  MySQL:           { name: "MySQL",         color: "#4479A1", bg: "rgba(68,121,161,0.09)",   icon: "bx-data" },
  MongoDB:         { name: "MongoDB",       color: "#47A248", bg: "rgba(71,162,72,0.09)",    icon: "bx-data" },
  Redis:           { name: "Redis",         color: "#DC382D", bg: "rgba(220,56,45,0.09)",    icon: "bx-data" },
  SQLite:          { name: "SQLite",        color: "#5599AA", bg: "rgba(85,153,170,0.09)",   icon: "bx-data" },
  Firebase:        { name: "Firebase",      color: "#FFCA28", bg: "rgba(255,202,40,0.09)",   icon: "bxl-firebase" },
  Docker:          { name: "Docker",        color: "#2496ED", bg: "rgba(36,150,237,0.09)",   icon: "bxl-docker" },
  Kubernetes:      { name: "Kubernetes",    color: "#326CE5", bg: "rgba(50,108,229,0.09)",   icon: "bx-cube" },
  AWS:             { name: "AWS",           color: "#FF9900", bg: "rgba(255,153,0,0.09)",    icon: "bxl-aws" },
  GCP:             { name: "GCP",           color: "#4285F4", bg: "rgba(66,133,244,0.09)",   icon: "bxl-google-cloud" },
  Azure:           { name: "Azure",         color: "#0078D4", bg: "rgba(0,120,212,0.09)",    icon: "bx-cloud" },
  Terraform:       { name: "Terraform",     color: "#7B42BC", bg: "rgba(123,66,188,0.09)",   icon: "bx-cube-alt" },
  "GitHub Actions":{ name: "GitHub Actions",color: "#2088FF", bg: "rgba(32,136,255,0.09)",   icon: "bxl-github" },
  Git:             { name: "Git",           color: "#F05032", bg: "rgba(240,80,50,0.09)",    icon: "bxl-git" },
  GitHub:          { name: "GitHub",        color: "#EEEEEE", bg: "rgba(238,238,238,0.06)",  icon: "bxl-github" },
  TensorFlow:      { name: "TensorFlow",   color: "#FF6F00", bg: "rgba(255,111,0,0.09)",    icon: "bx-brain" },
  PyTorch:         { name: "PyTorch",       color: "#EE4C2C", bg: "rgba(238,76,44,0.09)",    icon: "bx-brain" },
  "Hugging Face":  { name: "Hugging Face", color: "#FFD21E", bg: "rgba(255,210,30,0.09)",   icon: "bx-brain" },
  LangChain:       { name: "LangChain",    color: "#00A67E", bg: "rgba(0,166,126,0.09)",    icon: "bx-link-alt" },
  "React Native":  { name: "React Native", color: "#61DAFB", bg: "rgba(97,218,251,0.09)",   icon: "bxl-react" },
  Flutter:         { name: "Flutter",       color: "#02569B", bg: "rgba(2,86,155,0.09)",     icon: "bx-mobile" },
  Electron:        { name: "Electron",      color: "#47848F", bg: "rgba(71,132,143,0.09)",   icon: "bx-desktop" },
  Jest:            { name: "Jest",          color: "#C21325", bg: "rgba(194,19,37,0.09)",    icon: "bx-check-shield" },
  Cypress:         { name: "Cypress",       color: "#69D3A7", bg: "rgba(105,211,167,0.09)",  icon: "bx-check-shield" },
  Linux:           { name: "Linux",         color: "#FCC624", bg: "rgba(252,198,36,0.09)",   icon: "bxl-tux" },
  Figma:           { name: "Figma",         color: "#F24E1E", bg: "rgba(242,78,30,0.09)",    icon: "bxl-figma" },
  Unity:           { name: "Unity",         color: "#CCCCCC", bg: "rgba(204,204,204,0.06)",  icon: "bx-game" },
    HTML:            { name: "HTML",           color: "#E34F26", bg: "rgba(227,79,38,0.09)",    icon: "bxl-html5" },
  CSS:             { name: "CSS",            color: "#1572B6", bg: "rgba(21,114,182,0.09)",   icon: "bxl-css3" },
  GraphQL:         { name: "GraphQL",        color: "#E10098", bg: "rgba(225,0,152,0.09)",    icon: "bx-data" },
  Apollo:          { name: "Apollo",         color: "#311C87", bg: "rgba(49,28,135,0.09)",    icon: "bx-planet" },
  Prisma:          { name: "Prisma",         color: "#2D3748", bg: "rgba(45,55,72,0.09)",     icon: "bx-data" },
  Supabase:        { name: "Supabase",       color: "#3ECF8E", bg: "rgba(62,207,142,0.09)",   icon: "bx-data" },
  Strapi:          { name: "Strapi",         color: "#4945FF", bg: "rgba(73,69,255,0.09)",    icon: "bx-server" },
  "Socket.IO":     { name: "Socket.IO",      color: "#010101", bg: "rgba(1,1,1,0.06)",        icon: "bx-transfer" },
  WebSockets:      { name: "WebSockets",     color: "#4B5563", bg: "rgba(75,85,99,0.09)",     icon: "bx-transfer" },
  Nginx:           { name: "Nginx",          color: "#009639", bg: "rgba(0,150,57,0.09)",     icon: "bx-server" },
  Apache:          { name: "Apache",         color: "#D22128", bg: "rgba(210,33,40,0.09)",    icon: "bx-server" },
  Jenkins:         { name: "Jenkins",        color: "#D24939", bg: "rgba(210,73,57,0.09)",    icon: "bx-cog" },
  "CircleCI":      { name: "CircleCI",       color: "#343434", bg: "rgba(52,52,52,0.09)",     icon: "bx-cog" },
  "GitLab CI":     { name: "GitLab CI",      color: "#FC6D26", bg: "rgba(252,109,38,0.09)",   icon: "bxl-gitlab" },
  Ansible:         { name: "Ansible",        color: "#EE0000", bg: "rgba(238,0,0,0.09)",      icon: "bx-cog" },
  DigitalOcean:    { name: "DigitalOcean",   color: "#0080FF", bg: "rgba(0,128,255,0.09)",    icon: "bx-cloud" },
  Vercel:          { name: "Vercel",         color: "#000000", bg: "rgba(0,0,0,0.06)",        icon: "bx-cloud" },
  Netlify:         { name: "Netlify",        color: "#00C7B7", bg: "rgba(0,199,183,0.09)",    icon: "bx-cloud" },
  Railway:         { name: "Railway",        color: "#0B0D0E", bg: "rgba(11,13,14,0.09)",     icon: "bx-train" },
  "PlanetScale":   { name: "PlanetScale",    color: "#000000", bg: "rgba(0,0,0,0.06)",        icon: "bx-data" },
  CockroachDB:     { name: "CockroachDB",    color: "#6933FF", bg: "rgba(105,51,255,0.09)",   icon: "bx-data" },
  MariaDB:         { name: "MariaDB",        color: "#003545", bg: "rgba(0,53,69,0.09)",      icon: "bx-data" },
  Neo4j:           { name: "Neo4j",          color: "#018BFF", bg: "rgba(1,139,255,0.09)",    icon: "bx-data" },
  Cassandra:       { name: "Cassandra",      color: "#1287B1", bg: "rgba(18,135,177,0.09)",   icon: "bx-data" },
  Hadoop:          { name: "Hadoop",         color: "#FFCC00", bg: "rgba(255,204,0,0.09)",    icon: "bx-data" },
  Spark:           { name: "Spark",          color: "#E25A1C", bg: "rgba(226,90,28,0.09)",    icon: "bx-data" },
  Pandas:          { name: "Pandas",         color: "#150458", bg: "rgba(21,4,88,0.09)",      icon: "bx-brain" },
  NumPy:           { name: "NumPy",          color: "#013243", bg: "rgba(1,50,67,0.09)",      icon: "bx-brain" },
  ScikitLearn:     { name: "Scikit-Learn",   color: "#F7931E", bg: "rgba(247,147,30,0.09)",   icon: "bx-brain" },
  OpenAI:          { name: "OpenAI",         color: "#10A37F", bg: "rgba(16,163,127,0.09)",   icon: "bx-brain" },
  "Claude AI":     { name: "Claude AI",      color: "#FF6B35", bg: "rgba(255,107,53,0.09)",   icon: "bx-brain" },
  "Gemini AI":     { name: "Gemini AI",      color: "#4285F4", bg: "rgba(66,133,244,0.09)",   icon: "bx-brain" },
  "Mistral AI":    { name: "Mistral AI",     color: "#FF7000", bg: "rgba(255,112,0,0.09)",    icon: "bx-brain" },
  "LLaMA":         { name: "LLaMA",          color: "#8000FF", bg: "rgba(128,0,255,0.09)",    icon: "bx-brain" },
  Ollama:          { name: "Ollama",         color: "#000000", bg: "rgba(0,0,0,0.06)",        icon: "bx-chip" },
  "Stable Diffusion": { name: "Stable Diffusion", color: "#5A67D8", bg: "rgba(90,103,216,0.09)", icon: "bx-image" },
  Midjourney:      { name: "Midjourney",     color: "#000000", bg: "rgba(0,0,0,0.06)",        icon: "bx-image" },
  "Three.js":      { name: "Three.js",       color: "#000000", bg: "rgba(0,0,0,0.06)",        icon: "bx-cube" },
  WebGL:           { name: "WebGL",          color: "#990000", bg: "rgba(153,0,0,0.09)",      icon: "bx-cube" },
  PWA:             { name: "PWA",            color: "#5A0FC8", bg: "rgba(90,15,200,0.09)",    icon: "bx-mobile" },
  Tauri:           { name: "Tauri",          color: "#FFC131", bg: "rgba(255,193,49,0.09)",   icon: "bx-desktop" },
  "Expo":          { name: "Expo",           color: "#000020", bg: "rgba(0,0,32,0.09)",       icon: "bx-mobile" },
  Playwright:      { name: "Playwright",     color: "#2EAD33", bg: "rgba(46,173,51,0.09)",    icon: "bx-check-shield" },
  Vitest:          { name: "Vitest",         color: "#6E9F18", bg: "rgba(110,159,24,0.09)",   icon: "bx-check-shield" },
  Mocha:           { name: "Mocha",          color: "#8D6748", bg: "rgba(141,103,72,0.09)",   icon: "bx-check-shield" },
  Chai:            { name: "Chai",           color: "#A30701", bg: "rgba(163,7,1,0.09)",      icon: "bx-check-shield" },
  ESLint:          { name: "ESLint",         color: "#4B32C3", bg: "rgba(75,50,195,0.09)",    icon: "bx-check" },
  Prettier:        { name: "Prettier",       color: "#F7B93E", bg: "rgba(247,185,62,0.09)",   icon: "bx-check" },
  Zod:             { name: "Zod",            color: "#3E67B1", bg: "rgba(62,103,177,0.09)",   icon: "bx-check-shield" },
  Joi:             { name: "Joi",            color: "#F9A03C", bg: "rgba(249,160,60,0.09)",   icon: "bx-check-shield" },
  Webpack:         { name: "Webpack",        color: "#8DD6F9", bg: "rgba(141,214,249,0.09)",  icon: "bx-package" },
  Parcel:          { name: "Parcel",         color: "#FFB347", bg: "rgba(255,179,71,0.09)",   icon: "bx-package" },
  Rollup:          { name: "Rollup",         color: "#EC4A3F", bg: "rgba(236,74,63,0.09)",    icon: "bx-package" },
  MVC:              { name: "MVC",              color: "#6C757D", bg: "rgba(108,117,125,0.09)", icon: "bx-layer" },
  MVVM:             { name: "MVVM",             color: "#20C997", bg: "rgba(32,201,151,0.09)",  icon: "bx-layer" },
  "Clean Architecture": { name: "Clean Architecture", color: "#343A40", bg: "rgba(52,58,64,0.09)", icon: "bx-buildings" },
  "Hexagonal":      { name: "Hexagonal",        color: "#7952B3", bg: "rgba(121,82,179,0.09)",  icon: "bx-shape-polygon" },
  "Onion Architecture": { name: "Onion Architecture", color: "#6610F2", bg: "rgba(102,16,242,0.09)", icon: "bx-layer" },
  SOLID:            { name: "SOLID",            color: "#0D6EFD", bg: "rgba(13,110,253,0.09)",  icon: "bx-check-shield" },
  DRY:              { name: "DRY",              color: "#198754", bg: "rgba(25,135,84,0.09)",   icon: "bx-copy" },
  KISS:             { name: "KISS",             color: "#FFC107", bg: "rgba(255,193,7,0.09)",   icon: "bx-bulb" },
  YAGNI:            { name: "YAGNI",            color: "#DC3545", bg: "rgba(220,53,69,0.09)",   icon: "bx-x-circle" },
  "Design Patterns":{ name: "Design Patterns",  color: "#212529", bg: "rgba(33,37,41,0.09)",    icon: "bx-network-chart" },
  Singleton:        { name: "Singleton",        color: "#FD7E14", bg: "rgba(253,126,20,0.09)",  icon: "bx-circle" },
  Factory:          { name: "Factory",          color: "#20C997", bg: "rgba(32,201,151,0.09)",  icon: "bx-cog" },
  "Factory Method": { name: "Factory Method",   color: "#0CA678", bg: "rgba(12,166,120,0.09)",  icon: "bx-cog" },
  Observer:         { name: "Observer",         color: "#6610F2", bg: "rgba(102,16,242,0.09)",  icon: "bx-show" },
  Strategy:         { name: "Strategy",         color: "#198754", bg: "rgba(25,135,84,0.09)",   icon: "bx-git-branch" },
  Adapter:          { name: "Adapter",          color: "#6F42C1", bg: "rgba(111,66,193,0.09)",  icon: "bx-plug" },
  Decorator:        { name: "Decorator",        color: "#D63384", bg: "rgba(214,51,132,0.09)",  icon: "bx-paint" },
  Facade:           { name: "Facade",           color: "#0DCAF0", bg: "rgba(13,202,240,0.09)",  icon: "bx-buildings" },
  Repository:       { name: "Repository",       color: "#ADB5BD", bg: "rgba(173,181,189,0.09)", icon: "bx-data" },
  ServiceLayer:     { name: "Service Layer",    color: "#495057", bg: "rgba(73,80,87,0.09)",    icon: "bx-server" },
  CQRS:             { name: "CQRS",             color: "#E8590C", bg: "rgba(232,89,12,0.09)",   icon: "bx-transfer-alt" },
  EventDriven:      { name: "Event Driven",     color: "#15AABF", bg: "rgba(21,170,191,0.09)",  icon: "bx-bolt-circle" },
  "Domain Driven Design": { name: "DDD",        color: "#343A40", bg: "rgba(52,58,64,0.09)",    icon: "bx-sitemap" },
  MERN:             { name: "MERN Stack",       color: "#3FA037", bg: "rgba(63,160,55,0.09)",   icon: "bx-layer" },
  MEAN:             { name: "MEAN Stack",       color: "#DD0031", bg: "rgba(221,0,49,0.09)",    icon: "bx-layer" },
  MEVN:             { name: "MEVN Stack",       color: "#42B883", bg: "rgba(66,184,131,0.09)",  icon: "bx-layer" },
  PERN:             { name: "PERN Stack",       color: "#336791", bg: "rgba(51,103,145,0.09)",  icon: "bx-layer" },
  JAMstack:         { name: "JAMstack",         color: "#F0047F", bg: "rgba(240,4,127,0.09)",   icon: "bx-layer" },
  T3:               { name: "T3 Stack",         color: "#000000", bg: "rgba(0,0,0,0.06)",       icon: "bx-layer" },
  LAMP:             { name: "LAMP Stack",       color: "#F89820", bg: "rgba(248,152,32,0.09)",  icon: "bx-layer" },
  Serverless:       { name: "Serverless",       color: "#FD5750", bg: "rgba(253,87,80,0.09)",   icon: "bx-cloud-lightning" },
  Microservices:    { name: "Microservices",    color: "#0CA678", bg: "rgba(12,166,120,0.09)",  icon: "bx-network-chart" },
  Monolith:         { name: "Monolith",         color: "#6C757D", bg: "rgba(108,117,125,0.09)", icon: "bx-square" },
  BFF:              { name: "BFF",              color: "#3BC9DB", bg: "rgba(59,201,219,0.09)",  icon: "bx-devices" },
  "Fullstack":      { name: "Fullstack",        color: "#212529", bg: "rgba(33,37,41,0.09)",    icon: "bx-code-curly" },
  SSR:              { name: "SSR",              color: "#495057", bg: "rgba(73,80,87,0.09)",    icon: "bx-server" },
  CSR:              { name: "CSR",              color: "#868E96", bg: "rgba(134,142,150,0.09)", icon: "bx-desktop" },
  SSG:              { name: "SSG",              color: "#9775FA", bg: "rgba(151,117,250,0.09)", icon: "bx-file" },
  Edge:             { name: "Edge Computing",   color: "#339AF0", bg: "rgba(51,154,240,0.09)",  icon: "bx-world" },
};