export interface SocialButtonProps {
  href: string;
  ariaLabel: string;
  iconClass: string;
  functionStyle: (index: number) => React.CSSProperties;
  functionIconStyle: (index: number) => React.CSSProperties;
  onMouseEnter: (index: number, state: boolean) => void;
  onMouseLeave: (index: number, state: boolean) => void;
  index: number;
}