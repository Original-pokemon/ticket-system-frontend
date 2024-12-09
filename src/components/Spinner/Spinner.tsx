import { Box, CircularProgress, CircularProgressProps } from '@mui/material';

type SpinnerProperties = {
  fullscreen: boolean; // Если true, спиннер будет блокировать весь экран
} & CircularProgressProps;

function Spinner({
  fullscreen = false,
  size = 40,
  ...rest
}: SpinnerProperties) {
  return (
    <Box
      sx={{
        position: fullscreen ? 'fixed' : 'relative',
        top: fullscreen ? 0 : 'auto',
        left: fullscreen ? 0 : 'auto',
        width: fullscreen ? '100vw' : '100%',
        height: fullscreen ? '100vh' : '100%',
        backgroundColor: fullscreen ? 'rgba(0, 0, 0, 0.5)' : 'transparent', // Прозрачный фон, если fullscreen
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: fullscreen ? 1000 : 'auto', // Поднимаем z-index при fullscreen
      }}
    >
      <CircularProgress size={size} {...rest} />
    </Box>
  );
}

export default Spinner;
