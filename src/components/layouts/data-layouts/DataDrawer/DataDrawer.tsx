import { Drawer, SxProps, Theme, useMediaQuery, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DrawerHeader from './DrawerHeader';
import DrawerActions from './DrawerActions';
import DrawerBody from './DrawerBody';
import { ReactElement } from 'react';

type DataDrawerProperties = {
  open: boolean;
  onClose: () => void;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  fullScreen?: boolean;
  sx?: SxProps<Theme>;
  maxSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  children: ReactElement | ReactElement[];
};

function DataDrawer({
  open,
  onClose,
  direction = 'right',
  fullScreen = false,
  maxSize,
  sx,
  children,
}: DataDrawerProperties) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const shouldFullScreen = isSmallScreen || fullScreen;

  const getSize = () => {
    if (shouldFullScreen) {
      return '100%';
    }
    if (typeof maxSize === 'number') {
      return maxSize;
    }
    switch (maxSize) {
      case 'xs': {
        return theme.breakpoints.values.xs;
      }
      case 'sm': {
        return theme.breakpoints.values.sm;
      }
      case 'md': {
        return theme.breakpoints.values.md;
      }
      case 'lg': {
        return theme.breakpoints.values.lg;
      }
      case 'xl': {
        return theme.breakpoints.values.xl;
      }
      default: {
        return theme.breakpoints.values.sm;
      }
    }
  };

  const paperStyles: SxProps<Theme> = {
    width: direction === 'left' || direction === 'right' ? getSize() : '100%',
    height: direction === 'top' || direction === 'bottom' ? getSize() : '100%',
    // transform: shouldFullScreen ? 'translate(-50%, -50%)' : 'none',
    borderRadius: '0 20px 20px 0',
    ...sx,
  };

  return (
    <Drawer
      anchor={direction}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: paperStyles,
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {children}
      </Box>
    </Drawer>
  );
}

DataDrawer.Header = DrawerHeader;
DataDrawer.Body = DrawerBody;
DataDrawer.Actions = DrawerActions;

export default DataDrawer;
