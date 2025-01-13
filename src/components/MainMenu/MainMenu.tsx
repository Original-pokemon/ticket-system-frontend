import { List, ListItem, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
import MainMenuStyledList from './MainMenu.style';
import { AppRouteType } from '../../types';

type MenuItemType = {
  id: number;
  title: string;
  url: AppRouteType;
  icon: React.JSX.Element;
};

export type MenuType = {
  id: number;
  title: string;
  listItems: MenuItemType[];
}[];

type MenuProperties = {
  menu: MenuType;
  onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
  const target = event.currentTarget;

  target.classList.toggle('active');
};

function MainMenu({ menu, onClick }: MenuProperties) {
  return (
    <MainMenuStyledList >
      {menu.map((item) => (
        <ListItem
          className="item"
          key={item.id}
          alignItems="flex-start"
          disablePadding
        >
          <ListItemText className="title">{item.title}</ListItemText>

          <List className="list">
            {item.listItems.map((listItem) => (
              <ListItem
                component={NavLink}
                to={listItem.url}
                key={listItem.id}
                className="listItem"
                onClick={(event) => {
                  handleClick(event);
                  onClick(event);
                }}
              >
                {listItem.icon}
                <ListItemText className="listItemTitle">
                  {listItem.title}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </ListItem>
      ))}
    </MainMenuStyledList>
  );
}

export default MainMenu;
