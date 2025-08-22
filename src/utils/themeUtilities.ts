export const getThemeProps = (theme: string, themeObject: any, page: string, ...keys: string[]) => {
  let props = themeObject.themes[theme][page];
  keys.forEach(key => {
    props = props[key];
  });
  return props;
};