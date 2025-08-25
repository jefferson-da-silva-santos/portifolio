import { useState } from "react";
import { MenuContext } from "../contexts/MenuContext";

export const MenuProvider = ({ children }: any
) => {
  const [isMenuMobileVisible, setIsMenuMobileVisible] = useState(false);
  const [classMenuList, setClassMenuList] = useState("open-menu");
  const [iconMenu, setIconMenu] = useState("bx bx-menu-alt-right");

  const toggleMenuVisibility = () => {
    if (!isMenuMobileVisible) {
      setClassMenuList("open-menu");
      setIconMenu("bx bx-x");
      setIsMenuMobileVisible(true);
    } else {
      setClassMenuList("close-menu");
      setIconMenu("bx bx-menu-alt-right");
      setTimeout(() => {
        setIsMenuMobileVisible(false);
      }, 500);
    }
  };
  

  return (
    <MenuContext.Provider value={{ isMenuMobileVisible, toggleMenuVisibility, classMenuList, iconMenu }}>
      {children}
    </MenuContext.Provider>
  );
};