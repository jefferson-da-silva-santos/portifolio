
import type { SocialButtonProps } from "./types";
import useTheme from "../../../hooks/useTheme";
import themeObject from "../../../assets/theme.json";

const SocialButton: React.FC<SocialButtonProps> = ({
  href,
  ariaLabel,
  iconClass,
  functionStyle,
  functionIconStyle,
  onMouseEnter,
  onMouseLeave,
  index,
  isHoverButton
}) => {
  const { theme } = useTheme();
  return (
    <a
      style={functionStyle(theme, themeObject, isHoverButton, index)}
      role="button"
      target="_blank"
      aria-label={ariaLabel}
      className="groupHeader-socialMediaButton"
      href={href}
      onMouseEnter={() => onMouseEnter(index, true)}
      onMouseLeave={() => onMouseLeave(index, false)}
    >
      <i style={functionIconStyle(
        index,
        isHoverButton,
        theme,
        themeObject
      )} className={iconClass}></i>
    </a>
  );
};

export default SocialButton;