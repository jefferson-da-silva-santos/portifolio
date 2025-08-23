import { getThemeProps } from "../../utils/themeUtilities";

export const footerStyle = (theme: string, objectTheme: object) => ({
  backgroundColor: getThemeProps(theme, objectTheme, "footer", "background"),
   color: getThemeProps(theme, objectTheme, "footer", "color"),
   boxShadow:  getThemeProps(theme, objectTheme, "footer", "boxShadow")
})