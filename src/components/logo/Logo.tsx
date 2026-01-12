import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../const';

type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const sizeClasses: Record<LogoSize, string> = {
  xs: 'w-20 h-10 p-2',
  sm: 'w-26 h-13 p-2.5',
  md: 'w-32 h-16 p-3',
  lg: 'w-38 h-20 p-4',
  xl: 'w-44 h-24 p-5',
};

interface LogoProps {
  size?: LogoSize;
}

function Logo({ size = 'lg' }: LogoProps) {
  return (
    <NavLink className={`${sizeClasses[size]} flex items-center font-bold gap-2.5`} to={AppRoute.Tickets}>
      <img src="/logo.svg" alt="logo" />
    </NavLink>
  );
}

export default Logo;
