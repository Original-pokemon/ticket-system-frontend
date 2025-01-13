import { css } from '@emotion/react';
import { List, ListProps, styled } from '@mui/material';

const MainMenuStyledList = styled(List)<ListProps>(() => ({
  '.item': {
    display: 'flex',
    color: 'rgb(115 115 115)',
    flexDirection: 'column',

    '.title': {
      fontSize: '16px',
      fontWeight: 600,
      textTransform: 'uppercase',
    },

    '.listItem': {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      borderRadius: '5px',
      color: 'rgb(115 115 115)'
    },
  },
}));

export default MainMenuStyledList;
