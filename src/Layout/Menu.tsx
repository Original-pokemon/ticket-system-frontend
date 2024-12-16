import { useState } from 'react';
import Box from '@mui/material/Box';

import {
  useTranslate,
  MenuItemLink,
  MenuProps,
  useSidebarState,
} from 'react-admin';

import SubMenu from './SubMenu';
import category from '../components/category';
import tickets from '../components/tickets';
import manager from '../components/manager';

type MenuName = 'menuCatalog' | 'menuManager' | 'menuCategory';

const Menu = ({ dense = false }: MenuProps) => {
  const [state, setState] = useState({
    menuCatalog: true,
    menuManager: true,
    menuCategory: true,
  });
  const translate = useTranslate();
  const [open] = useSidebarState();

  const handleToggle = (menu: MenuName) => {
    setState(state => ({ ...state, [menu]: !state[menu] }));
  };

  return (
    <Box
      sx={{
        width: open ? 200 : 50,
        marginTop: 1,
        marginBottom: 1,
        transition: theme =>
          theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <MenuItemLink
        to="/ticket"
        state={{ _scrollToTop: true }}
        primaryText={tickets.options.label}
        leftIcon={<tickets.icon />}
        dense={dense}
      />
      <SubMenu
        handleToggle={() => handleToggle('menuManager')}
        isOpen={state.menuManager}
        name={manager.label.main}
        icon={<manager.icon />}
        dense={dense}
      >
        <MenuItemLink
          to="/manager"
          state={{ _scrollToTop: true }}
          primaryText={manager.label.user}
          leftIcon={<manager.icon />}
          dense={dense}
        />
        <MenuItemLink
          to="/ticket"
          state={{ _scrollToTop: true }}
          primaryText={manager.label.ticket}
          leftIcon={<tickets.icon />}
          dense={dense}
        />
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle('menuCategory')}
        isOpen={state.menuCatalog}
        name="pos.menu.category"
        icon={<category.icon />}
        dense={dense}
      >
        <MenuItemLink
          to="/category"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.category.description`, {
            smart_count: 2,
          })}
          leftIcon={<category.icon />}
          dense={dense}
        />
        <MenuItemLink
          to="/task-performer"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.categories.name`, {
            smart_count: 2,
          })}
          // leftIcon={<taskPerformer.icon />}
          dense={dense}
        />
      </SubMenu>
    </Box>
  );
};

export default Menu;