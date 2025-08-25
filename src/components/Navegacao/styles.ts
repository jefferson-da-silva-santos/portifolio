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

export const listStyle = (theme: string, isMobile: boolean, isMenuMobileVisible: boolean) => ({
  backgroundColor: isMobile ? theme === "light" ? "#fff" : "#0b0b0b" : "transparent",
  display: isMobile ? isMenuMobileVisible ? "flex" : "none" : "flex",
  boxShadow: isMobile ? theme === "light" ? "0px 0px 8px rgb(184, 184, 184)" : "0px 0px 8px rgb(0, 0, 0)" : "none",
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

export const iconStyles = (theme: string) => ({
  fontSize: "3rem",
  color: theme === "dark" ? "white" : "black",
})