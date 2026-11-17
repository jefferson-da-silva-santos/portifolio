import { useCallback, useRef, useState } from "react";
import { MenuContext } from "../contexts/MenuContext";

// Duração da animação de fechar (closeMenu em media.scss)
const CLOSE_ANIMATION_MS = 500;

export const MenuProvider = ({ children }: any) => {
  const [isMenuMobileVisible, setIsMenuMobileVisible] = useState(false);
  const [classMenuList, setClassMenuList] = useState("open-menu");
  const [iconMenu, setIconMenu] = useState("bx bx-menu-alt-right");
  const closeTimer = useRef<number | undefined>(undefined);

  const openMenu = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setClassMenuList("open-menu");
    setIconMenu("bx bx-x");
    setIsMenuMobileVisible(true);
  }, []);

  const closeMenu = useCallback(() => {
    setClassMenuList("close-menu");
    setIconMenu("bx bx-menu-alt-right");
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setIsMenuMobileVisible(false);
    }, CLOSE_ANIMATION_MS);
  }, []);

  const toggleMenuVisibility = useCallback(() => {
    if (classMenuList === "open-menu" && isMenuMobileVisible) closeMenu();
    else openMenu();
  }, [classMenuList, isMenuMobileVisible, closeMenu, openMenu]);

  // "aberto" = visível e não está no meio da animação de fechar
  const isMenuOpen = isMenuMobileVisible && classMenuList === "open-menu";

  return (
    <MenuContext.Provider
      value={{
        isMenuMobileVisible,
        isMenuOpen,
        toggleMenuVisibility,
        closeMenu,
        classMenuList,
        iconMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
