import { Box, BoxProps, styled } from '@mui/material';

export const DataCellBoxStyled = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
}));
