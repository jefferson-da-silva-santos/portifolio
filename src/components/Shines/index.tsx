import type { IShinesProps } from "./types";

export const Shines = ({isHover}: IShinesProps) => {
  return (
    <div className={`shines ${isHover ? 'shines-animed' : ''}`}>
      <div className="primary-shine"></div>
      <div className="secundary-shine"></div>
    </div>
  );
};
