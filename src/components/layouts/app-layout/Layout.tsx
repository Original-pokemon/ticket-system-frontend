import { Outlet, useSearchParams } from 'react-router-dom';
import {
  Home as HomeIcon,
  CreditCard as CreditCardIcon,
  Receipt as ReceiptIcon,
  Map as MapIcon,
} from '@mui/icons-material';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import LayoutStyleBox from './Layout.style';
import Navbar from '../../Navbar/Navbar';
import MainMenu from '../../MainMenu/MainMenu';
import SideMenu from '../../SideMenu/SideMenu';
import { AppRoute } from '../../../const';
import ClassIcon from '@mui/icons-material/Class';
import Person2Icon from "@mui/icons-material/Person2";
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';

const menu = [
  {
    id: 1,
    title: 'Основное',
    listItems: [
      {
        id: 1,
        title: 'Задачи',
        url: AppRoute.Tickets,
        icon: <HomeIcon />,
      },
      {
        id: 2,
        title: 'Категории',
        url: AppRoute.TaskPerformers,
        icon: <ClassIcon />,
      },
      {
        id: 3,
        title: 'Менеджеры',
        url: AppRoute.Managers,
        icon: <Person2Icon />,
      },
      {
        id: 4,
        title: 'Станции АЗС',
        url: AppRoute.PetrolStations,
        icon: <LocalGasStationIcon />,
      },
    ],
  },
];

function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSideMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsSideMenuOpen(false);
  };

  return (
    <LayoutStyleBox className="main">
      <Navbar className="navbar" onMenuClick={handleMenuClick} />

      {isMobile && (
        <SideMenu open={isSideMenuOpen} onClose={handleMenuClose} menu={menu} />
      )}

      <Box className="container">
        {!isMobile && (
          <Box className="menuContainer">
            <MainMenu menu={menu} onClick={handleMenuClose} />
          </Box>
        )}
        <Box className="contentContainer">
          <Outlet />
        </Box>
      </Box>
    </LayoutStyleBox>
  );
}

export default Layout;
