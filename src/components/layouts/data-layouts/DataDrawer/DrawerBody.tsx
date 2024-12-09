import { Box } from '@mui/material';

type DrawerBodyProperties = {
  children: React.ReactNode;
};

const DrawerBody: React.FC<DrawerBodyProperties> = ({ children }) => (
  <Box sx={{ p: 2, overflowY: 'auto', flexGrow: 1 }}>{children}</Box>
);

export type DrawerBodyType = ReturnType<typeof DrawerBody>;

export default DrawerBody;
