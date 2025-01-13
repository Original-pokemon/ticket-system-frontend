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
    flexGrow: '1',
    display: 'flex',

    // gap: '1.2rem',
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
    width: '100%',
    margin: '0 1.2rem',

    backgroundColor: theme.palette.background.default,

    [theme.breakpoints.values.md]: {
      padding: '0 2rem',
    },
  },

  '.footer': {},
}));

export default LayoutStyleBox;
