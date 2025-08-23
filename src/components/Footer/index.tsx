import useTheme from "../../hooks/useTheme";
import { footerStyle } from "./styles";
import objectTheme from '../../assets/theme.json';

const Footer = () => {
  const {theme} = useTheme();

  return (
    <footer className="footer" style={footerStyle(theme, objectTheme)}>
      <p>@ {new Date().getFullYear()} | Jefferson Santos</p>
    </footer>
  );
};

export default Footer;
