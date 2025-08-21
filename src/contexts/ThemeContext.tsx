import { createContext } from "react";

const ThemeContext = createContext({
  theme: "dark", // Default theme
  toggleTheme: () => {},
});

export default ThemeContext;

