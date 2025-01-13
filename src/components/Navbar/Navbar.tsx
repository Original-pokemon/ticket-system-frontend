import {
  Menu as MenuIcon,
  Person as PersonIcon,
  Logout,
} from '@mui/icons-material';
import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Tooltip,
  useMediaQuery,
  useTheme,
  Box,
} from '@mui/material';
import Logo from '../logo/Logo';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { logout } from '../../store';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type NavbarProperties = {
  className?: string;
  onMenuClick: () => void;
};

function Navbar({ onMenuClick, className }: NavbarProperties) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [anchorElement, setAnchorElement] = useState<undefined | HTMLElement>();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElement(undefined);
  };

  return (
    <AppBar position="static" className={className}>
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
        )}

        {!isMobile && <Logo />}

        <Box sx={{ flexGrow: 1 }} />

        <Tooltip title="Открыть настройки пользователя">
          <IconButton color="inherit" onClick={handleOpenUserMenu}>
            <PersonIcon />
          </IconButton>
        </Tooltip>
        <Menu
          id="menu-nav-bar"
          anchorEl={anchorElement}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElement)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem
            onClick={() => {
              dispatch(logout());
              navigate(AppRoute.Login);
              handleCloseUserMenu();
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Выйти
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
