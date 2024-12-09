import { Box } from '@mui/material';

type DrawerActionsProperties = {
  children: React.ReactNode;
};

const DrawerActions: React.FC<DrawerActionsProperties> = ({ children }) => (
  <Box
    sx={{
      p: 2,
      borderTop: '1px solid',
      borderColor: 'divider',
    }}
  >
    {children}
  </Box>
);

export type DrawerActionsType = ReturnType<typeof DrawerActions>;
export default DrawerActions;
