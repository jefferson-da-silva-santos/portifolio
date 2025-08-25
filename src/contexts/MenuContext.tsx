import { createContext } from "react";
import type { MenuContextProps } from "./types";

// Criação do contexto
export const MenuContext = createContext<MenuContextProps>({
  isMenuMobileVisible: false,
  toggleMenuVisibility: () => {},
});