import React from "react";
import { ModalProjectContext } from "../contexts/ModalProjectContext";

const useModalProject = () => {
  const context = React.useContext(ModalProjectContext);
  if (!context) {
    throw new Error("useModalProject must be used within a ModalProjectProvider");
  }
  return context;
}

export default useModalProject