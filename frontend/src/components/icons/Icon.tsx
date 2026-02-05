import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from './icons';
import type { SizeProp } from '@fortawesome/fontawesome-svg-core';

interface IconProps {
  name: keyof typeof icons;
  size?: SizeProp;
  color?: string;
  style?: React.CSSProperties;
}

function Icon({ name, size = "1x", color, style }: IconProps) {
  const iconToRender = icons[name];
  return (
    <FontAwesomeIcon 
      icon={iconToRender} 
      size={size} 
      color={color} 
      style={{ color: color, ...style }}
    />
  );
}

export default Icon