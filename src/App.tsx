
import { Box } from "@mui/material";
import {
  Admin,
  Layout,
  RefreshIconButton,
  Resource,
  localStorageStore,
} from "react-admin";
import { ReactQueryDevtools } from "react-query/devtools";
import category from "./components/category";
import tickets from "./components/tickets";
import { authProvider } from "./authProvider";
import { dataProvider } from "./dataProvider";
import { QueryClient } from "react-query";
import PreloadData from "./preload-data/preload-data";
import manager from "./components/manager";
import petrolStation from "./components/petrol-station";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min
    },
  },
});

const MyLayout = (props: any) => (
  <>  
    <PreloadData />
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
