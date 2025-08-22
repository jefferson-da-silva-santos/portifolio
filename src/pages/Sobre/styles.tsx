import themeObject from "../../assets/theme.json";
import { getThemeProps } from "../../utils/themeUtilities";

export const styleContainer = (theme: string) => ({
  backgroundColor: getThemeProps(theme, themeObject, "about", "container", "background"),
});

export const styleStrong = (theme: string) => ({
  color: getThemeProps(theme, themeObject, "about", "container", "strong")
});

export const styleText = (theme: string) => ({
  color: getThemeProps(theme, themeObject, "about", "container", "colorText"),
});

export const styleTitle = (theme: string) => ({
  color: getThemeProps(theme, themeObject, "about", "container", "colorTitle"),
});