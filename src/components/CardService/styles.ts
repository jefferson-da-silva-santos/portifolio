import { getThemeProps } from "../../utils/themeUtilities";

export const cardStyles = (theme: string, objectTheme: object) => ({
  backgroundColor: getThemeProps(
    theme,
    objectTheme,
    "services",
    "container",
    "card",
    "background"
  ),
});

export const circleCenterStyles = (theme: string, objectTheme: object) => ({
  backgroundColor: getThemeProps(
    theme,
    objectTheme,
    "services",
    "container",
    "card",
    "circleCenter",
    "background"
  ),
});

export const titleStyles = (theme: string, objectTheme: object) => ({
  color: getThemeProps(
    theme,
    objectTheme,
    "services",
    "container",
    "card",
    "title",
    "color"
  ),
});

export const textStyles = (theme: string, objectTheme: object) => ({
  color: getThemeProps(
    theme,
    objectTheme,
    "services",
    "container",
    "card",
    "text",
    "color"
  ),
});
