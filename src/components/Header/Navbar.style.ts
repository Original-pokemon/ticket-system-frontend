import { Box, BoxProps, styled } from '@mui/material';

export const NavBarStyledBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  width: '100%',
  height: '8vh',
  minHeight: '40px',
  padding: '1.2rem',

  marginBottom: '2rem',
  backgroundColor: theme.palette.primary.main,

  '.icons': {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',

    '.icon': {
      [theme.breakpoints.values.sm]: {
        display: 'none',
      },
    },

    '.user': {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: theme.palette.text.secondary,

      img: {
        width: '26px',
        height: '26px',
        borderRadius: '50%',
        objectFit: 'cover',
      },
    },
  },
}));
