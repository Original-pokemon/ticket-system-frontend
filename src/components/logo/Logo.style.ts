import { styled } from '@mui/material';
import { NavLink, NavLinkProps } from 'react-router-dom';

export const LogoStyledNavLink = styled(NavLink)<NavLinkProps>({
  width: '100px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  fontWeight: 'bold',
  gap: '10px',
});
