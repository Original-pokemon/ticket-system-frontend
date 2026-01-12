import Sidebar from '../Sidebar/Sidebar';
import DataDrawer from '../layouts/data-layouts/DataDrawer/DataDrawer';
import Logo from '../logo/Logo';

type SideMenuPropertiesType = {
  open: boolean;
  onClose: () => void;
};

function SideMenu({ open, onClose }: SideMenuPropertiesType) {
  return (
    <DataDrawer
      direction="left"
      maxSize="sm"
      open={open}
      onClose={onClose}
    >
      <DataDrawer.Header title={<Logo />} />

      <DataDrawer.Body>
        <Sidebar />
      </DataDrawer.Body>
    </DataDrawer>
  );
}

export default SideMenu;
