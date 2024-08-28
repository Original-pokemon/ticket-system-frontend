
import { Box } from "@mui/material";
import {
  Admin,
  Layout,
  RefreshIconButton,
  Resource,
  localStorageStore,
} from "react-admin";
import { ReactQueryDevtools } from "react-query/devtools";
import category from "./category";
import tickets from "./tickets";
import { authProvider } from "./authProvider";
import { dataProvider } from "./dataProvider";
import manager from "./manager";
import petrolStation from "./petrol-station";
import { QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min
    },
  },
});

const MyLayout = (props: any) => (
  <>
    <Layout
      {...props}
      maxWidth="xl"
      toolbar={
        <Box display="flex" gap={1} mr={1}>
          <RefreshIconButton />
        </Box>
      }
    />
    <ReactQueryDevtools initialIsOpen={false} />
  </>
);

const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    queryClient={queryClient}
    store={localStorageStore(undefined, "HelpDesk")}
    layout={MyLayout}
    disableTelemetry
    requireAuth
  >
    <Resource name="ticket" {...tickets} recordRepresentation="title" />
    <Resource name="category" recordRepresentation="description" {...category}>
    </Resource>
    <Resource name="manager" {...manager} recordRepresentation="user.user_name" />
    <Resource name="petrol-station" {...petrolStation} />
    <Resource name="task-performer" recordRepresentation="user.user_name" />
    <Resource name="bush" recordRepresentation="description" />
    <Resource name="status" recordRepresentation="description" />
    <Resource name="status-history" />
    <Resource name="attachment" />
    <Resource name="comment" />
  </Admin>
);

export default App;
