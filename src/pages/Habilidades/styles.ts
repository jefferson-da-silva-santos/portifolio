import { getThemeProps } from "../../utils/themeUtilities";

export const styleCardSkill = (theme: string, themeObject: object) => ({
  backgroundColor: getThemeProps(
    theme,
    themeObject,
    "skills",
    "container",
    "card",
    "background"
  ),
});

export const titleStyle = (theme: string, themeObject: object) => ({
  backgroundColor: getThemeProps(
    theme,
    themeObject,
    "skills",
    "container",
    "colorTitle"
  ),
});

export const containerStyle = (theme: string, themeObject: object) => ({
  backgroundColor: getThemeProps(theme, themeObject, "skills", "container", "background")
});

export const textStyle = (theme: string, themeObject: object) => ({
  color: getThemeProps(theme, themeObject, "skills", "container", "colorText")
})