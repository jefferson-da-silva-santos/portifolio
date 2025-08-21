import { useContext } from "react";
import { LanguageContext } from "../contexts/LenguageContext";

export const useLanguage = () => useContext(LanguageContext);