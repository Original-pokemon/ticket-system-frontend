import { Box, BoxProps, styled } from '@mui/material';

const LayoutStyleBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  minHeight: '100vh',
  fontFamily: 'Inter, sans-serif',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.primary.main,

  '.navbar': {
    marginBottom: '1.2rem',
  },

  '.container': {
    width: '100%',
    flexGrow: '1',
    display: 'grid', // Используем grid вместо flex
    gridTemplateColumns: 'auto 1fr', // Первая колонка для меню, вторая для контента
    boxSizing: 'border-box',
    padding: '0',
  },

  '.menuContainer': {
    width: '250px',
    padding: '20px',

    borderRadius: '10px',

    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,

    [theme.breakpoints.values.lg]: {
      width: 'max-content',
    },
  },

  '.contentContainer': {
    minWidth: 0, // Важное свойство для предотвращения переполнения в grid
    padding: '0 1.2rem', // Используем padding вместо margin
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.default,

    [theme.breakpoints.values.md]: {
      padding: '0 2rem',
    },
  },

  '.footer': {},
}));

export default LayoutStyleBox;
