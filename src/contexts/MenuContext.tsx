import { createContext } from "react";
import type { MenuContextProps } from "./types";

export const MenuContext = createContext<MenuContextProps>({
  isMenuMobileVisible: false,
  toggleMenuVisibility: () => {},
  classMenuList: '',
  iconMenu: ''
});