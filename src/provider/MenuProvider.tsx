import { useState } from "react";
import { MenuContext } from "../contexts/MenuContext";

export const MenuProvider = ({ children }: any
) => {
  const [isMenuMobileVisible, setIsMenuMobileVisible] = useState(false);

  const toggleMenuVisibility = () => {
    setIsMenuMobileVisible((prev) => !prev);
  };

  return (
    <MenuContext.Provider value={{ isMenuMobileVisible, toggleMenuVisibility }}>
      {children}
    </MenuContext.Provider>
  );
};