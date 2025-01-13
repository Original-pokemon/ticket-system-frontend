import MainMenu, { MenuType } from '../MainMenu/MainMenu';
import DataDrawer from '../layouts/data-layouts/DataDrawer/DataDrawer';
import Logo from '../logo/Logo';

type SideMenuPropertiesType = {
  open: boolean;
  onClose: () => void;
  menu: MenuType;
};

function SideMenu({ open, onClose, menu }: SideMenuPropertiesType) {
  return (
    <DataDrawer
      direction="left"
      maxSize="sm"
      sx={{ width: 320 }}
      open={open}
      onClose={onClose}
    >
      <DataDrawer.Header title={<Logo />} onClose={onClose} />

      <DataDrawer.Body>
        <MainMenu menu={menu} onClick={onClose} />
      </DataDrawer.Body>
    </DataDrawer>
  );
}

export default SideMenu;
