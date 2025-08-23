import { getThemeProps } from "../../utils/themeUtilities";

export const inputStyle = (theme: string, objectTheme: object) => ({
  borderColor: getThemeProps(theme, objectTheme, "contact", "form", "input", "borderColor"),
  backgroundColor: getThemeProps(theme, objectTheme, "contact", "form", "input", "background"),
  color: getThemeProps(theme, objectTheme, "contact", "form", "input", "color")
})