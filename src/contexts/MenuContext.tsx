import { createContext } from "react";
import type { MenuContextProps } from "./types";

export const MenuContext = createContext<MenuContextProps>({
  isMenuMobileVisible: false,
  isMenuOpen: false,
  toggleMenuVisibility: () => {},
  closeMenu: () => {},
  classMenuList: '',
  iconMenu: ''
});
