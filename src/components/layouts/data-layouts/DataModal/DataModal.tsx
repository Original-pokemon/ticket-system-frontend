import React from 'react';
import {
  Modal,
  IconButton,
  Typography,
  SxProps,
  Theme,
  useMediaQuery,
  Box,
  Fade,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

type DataModalPropertiesType = {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  maxSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  fullScreen?: boolean;
  sx?: SxProps<Theme>;
  hideCloseButton?: boolean;
  actions?: React.ReactNode;
};

function DataModal({
  open,
  onClose,
  title,
  children,
  maxSize = 'sm',
  fullScreen = false,
  sx,
  hideCloseButton = false,
  actions,
}: DataModalPropertiesType) {
  const theme = useTheme();

  // Определяем, является ли экран малым
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Решаем, должен ли быть полноэкранный режим
  const shouldFullScreen = isSmallScreen || fullScreen;

  // Вычисляем максимальную ширину модального окна
  const getMaxWidth = () => {
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

  // Стили для контейнера модального окна
  const modalStyle: SxProps<Theme> = {
    position: 'fixed' as const,
    top: shouldFullScreen ? '50%' : 0,
    left: shouldFullScreen ? '50%' : 'auto',
    right: shouldFullScreen ? 'auto' : 0,
    transform: shouldFullScreen ? 'translate(-50%, -50%)' : 'none',
    width: shouldFullScreen ? '80%' : getMaxWidth(),
    maxHeight: shouldFullScreen ? `calc(100% - ${theme.spacing(4)})` : '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    overflowY: 'auto',
    p: 0,
    ...(shouldFullScreen && {
      margin: theme.spacing(2),
    }),
    ...sx,
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <Box sx={modalStyle}>
          {/* Заголовок */}
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              bgcolor: 'background.paper',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            {title && (
              <Typography variant="h6" component="div">
                {title}
              </Typography>
            )}
            {!hideCloseButton && (
              <IconButton aria-label="close" onClick={onClose} edge="end">
                <CloseIcon />
              </IconButton>
            )}
          </Box>
          {/* Содержимое */}
          <Box sx={{ p: 2, overflowY: 'auto' }}>{children}</Box>
          {/* Действия */}
          {actions && (
            <Box
              sx={{
                p: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              {actions}
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}

export default DataModal;
