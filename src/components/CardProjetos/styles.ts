import { getThemeProps } from "../../utils/themeUtilities";

export const cardStyles = (theme: string, themeObject: object) => ({
  backgroundColor: getThemeProps(theme, themeObject, "projects", "container", "card", "background"),
  borderColor: getThemeProps(theme, themeObject, "projects", "container", "card", "borderColor"),
});

export const titleCardStyles = (theme: string, themeObject: object) => ({
  color: getThemeProps(theme, themeObject, "projects", "container", "card", "title", "color")
});

export const textCardStyles = (theme: string, themeObject: object) => ({
  color: getThemeProps(theme, themeObject, "projects", "container", "card", "text", "color")
});

export const buttomCardStyles = (theme: string, themeObject: object) => ({
  color: getThemeProps(theme, themeObject, "projects", "container", "card", "button", "color"),
  backgroundColor: getThemeProps(theme, themeObject, "projects", "container", "card", "button", "background"),
  borderColor: getThemeProps(theme, themeObject, "projects", "container", "card", "button", "borderColor"),
});