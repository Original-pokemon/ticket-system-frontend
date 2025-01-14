import { LogoStyledNavLink } from './Logo.style';
import { AppRoute } from '../../const';

function Logo() {
  return (
    <LogoStyledNavLink className="logo" to={AppRoute.Tickets}>
      <img src="/logo.svg" alt="logo" />
    </LogoStyledNavLink>
  );
}

export default Logo;
