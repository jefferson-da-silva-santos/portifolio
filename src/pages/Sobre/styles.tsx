import themeObject from "../../assets/theme.json";

export const styleContainer = (theme: string) => ({
  backgroundColor:
    theme === "light"
      ? themeObject.themes.light.about.container.background
      : themeObject.themes.dark.about.container.background,
});

export const styleStrong = (theme: string) => ({
  color:
    theme === "light"
      ? themeObject.themes.light.about.container.strong
      : themeObject.themes.dark.about.container.strong,
});

export const styleText = (theme: string) => ({
  color:
    theme === "light"
      ? themeObject.themes.light.about.container.colorText
      : themeObject.themes.dark.about.container.colorText,
});

export const styleTitle = (theme: string) => ({
  color:
    theme === "light"
      ? themeObject.themes.light.about.container.colorTitle
      : themeObject.themes.dark.about.container.colorTitle,
});