import { styled } from '@mui/material';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';

export const dataGridClasses = {
  wrapHeader: 'wrap-header-cell',
};

export const DataGridStyled = styled(DataGrid)<DataGridProps>(({ theme }) => ({
  minHeight: '240px',
  height: '100vh',
  padding: '20px',

  backgroundColor: theme.palette.background.paper,

  [`.${dataGridClasses.wrapHeader}`]: {
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    lineHeight: 1.2,
  },
}));
