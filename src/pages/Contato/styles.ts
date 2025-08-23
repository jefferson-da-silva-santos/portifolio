import { getThemeProps } from "../../utils/themeUtilities";

export const containerStyle = (theme: string, objectTheme: object) => ({
  backgroundColor: getThemeProps(theme, objectTheme, "contact", "container", "background"),
});

export const titleStyle = (theme: string, objectTheme: object) => ({
  color: getThemeProps(theme, objectTheme, "contact", "title", "color")
})

export const inputStyle = (theme: string, objectTheme: object) => ({
  borderColor: getThemeProps(theme, objectTheme, "contact", "form", "input", "borderColor"),
  backgroundColor: getThemeProps(theme, objectTheme, "contact", "form", "input", "background"),
  color: getThemeProps(theme, objectTheme, "contact", "form", "input", "color")
})