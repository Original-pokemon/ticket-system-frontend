import { css } from '@emotion/react';

const singleStyle = css({
  display: 'flex',

  // [theme.breakpoints.values.xl]: {
  //   flexDirection: 'column',
  //   gap: '50px',
  // },

  '.view': {
    flex: 1,

    '.info': {
      '.topInfo': {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',

        img: {
          width: '200px',
          height: '120px',
          borderRadius: '10px',
          objectFit: 'cover',
        },

        h1: {
          fontWeight: 500,
        },
      },
      '.details': {
        fontSize: '18px',
        // backgroundColor: theme.palette.background.default,
        padding: '20px',
        margin: '20px 0',
        borderRadius: '10px',

        '.item': {
          margin: '30px 0',

          '.itemTitle': {
            fontWeight: 600,
            marginRight: '10px',
            textTransform: 'capitalize',
          },
        },
      },
    },

    '.otherDetails': {
      display: 'flex',
      flexWrap: 'wrap',

      '.otherDetail': {
        flex: '0 1 30%',
        margin: '10px',
      },
    },
  },
});

export default singleStyle;
