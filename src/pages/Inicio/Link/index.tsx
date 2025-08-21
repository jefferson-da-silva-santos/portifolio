// SocialButton.tsx

import React from "react";
import type { SocialButtonProps } from "./types";

const SocialButton: React.FC<SocialButtonProps> = ({
  href,
  ariaLabel,
  iconClass,
  functionStyle,
  functionIconStyle,
  onMouseEnter,
  onMouseLeave,
  index
}) => {
  return (
    <a
      style={functionStyle(index)}
      role="button"
      target="_blank"
      aria-label={ariaLabel}
      className="groupHeader-socialMediaButton"
      href={href}
      onMouseEnter={() => onMouseEnter(index, true)}
      onMouseLeave={() => onMouseLeave(index, false)}
    >
      <i style={functionIconStyle(index)} className={iconClass}></i>
    </a>
  );
};

export default SocialButton;