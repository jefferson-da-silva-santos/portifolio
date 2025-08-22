export interface SocialButtonProps {
  href: string;
  ariaLabel: string;
  iconClass: string;
  functionStyle: (
    theme: string,
    themeObject: any,
    isHoverButton: boolean[],
    i: number
  ) => React.CSSProperties;
  functionIconStyle: (
    index: number,
    isHoverButton: boolean[],
    theme: string,
    themeObject: any
  ) => React.CSSProperties;
  onMouseEnter: (index: number, state: boolean) => void;
  onMouseLeave: (index: number, state: boolean) => void;
  index: number;
  isHoverButton: boolean[];
}