import { getThemeProps } from "../../utils/themeUtilities";


export const stylesButton = (
  theme: string,
  themeObject: object,
  isHoverButton: boolean[],
  i: number
) => {
  const isHovering = isHoverButton[i];
  const buttonProps = getThemeProps(theme, themeObject, "init", "buttons");

  return {
    color: buttonProps.color,
    backgroundColor: buttonProps.background,
    boxShadow: isHovering
      ? buttonProps.hoverBoxShadow
      : buttonProps.boxShadow,
  };
};

export const handleSetHoverButtonIcon = (
  index: number,
  isHoverButton: boolean[],
  theme: string,
  themeObject: object
) => {
  const isHovering = isHoverButton[index];
  const buttonProps = getThemeProps(theme, themeObject, "init", "buttons");

  return {
    color: isHovering ? buttonProps.icon.hoverColor : buttonProps.icon.color,
  };
};

export const styleContainer = (theme: string, themeObject: object) => {
  const containerProps = getThemeProps(theme, themeObject, "init", "container");
  return {
    backgroundColor: containerProps.background,
  };
};

export const styleTitle = (theme: string, themeObject: object) => {
  const titleProps = getThemeProps(theme, themeObject, "init", "title");
  return {
    color: titleProps.color,
  };
};