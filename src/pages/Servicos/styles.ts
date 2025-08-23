import { getThemeProps } from "../../utils/themeUtilities";

export const containerStyles = (theme: string, themeObject: object) => ({
  backgroundColor: getThemeProps(theme, themeObject, "services", "container", "background")
});

export const titleStyles = (theme: string, themeObject: object) => ({
  color: getThemeProps(theme, themeObject, "services", "container", "title", "color")
})