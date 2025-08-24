import { getThemeProps } from "../../utils/themeUtilities";

export const containerModalStyles = (theme: string, themeObject: object) => ({
  backgroundColor: getThemeProps(theme, themeObject, "modal", "container", "background")
});

export const sectionModalStyles = (theme: string, themeObject: object) => ({
  backgroundColor: getThemeProps(theme, themeObject, "modal", "section", "background")
})

export const titleModalStyles = (theme: string, themeObject: object) => ({
  color: getThemeProps(theme, themeObject, "modal", "title", "color"),
  textShadow: getThemeProps(theme, themeObject, "modal", "title", "textShadow")
})

export const textModalStyles = (theme: string, themeObject: object) => ({
  color: getThemeProps(theme, themeObject, "modal", "text", "color")
})

export const skillModalStyles = (theme: string, themeObject: object) => ({
  backgroundColor:  getThemeProps(theme, themeObject, "modal", "skill", "background"),
  border:  getThemeProps(theme, themeObject, "modal", "skill", "border")
})