import { getThemeProps } from "../../utils/themeUtilities";

export const containerStyle = (theme: string, themeObject: any) => ({
  backgroundColor: getThemeProps(
    theme,
    themeObject,
    "navbar",
    "container",
    "background"
  ),
  boxShadow: getThemeProps(
    theme,
    themeObject,
    "navbar",
    "container",
    "boxShadow"
  ),
});

export const linkStyle = (theme: string, themeObject: any) => ({
  color: getThemeProps(theme, themeObject, "navbar", "logo", "color"),
});

export const listStyle = (theme: string, themeObject: any) => ({
  backgroundColor: getThemeProps(
    theme,
    themeObject,
    "navbar",
    "list",
    "background"
  ),
});

export const getLinkStyle = (
  linkId: string,
  isHover: Record<string, boolean>,
  theme: string,
  themeObject: any
) => {
  const isHovering = isHover[linkId];
  const defaultColor = getThemeProps(
    theme,
    themeObject,
    "navbar",
    "link",
    "color"
  );

  return {
    color: isHovering ? "#00ffff" : defaultColor,
  };
};
