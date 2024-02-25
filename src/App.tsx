
import { Box } from "@mui/material";
import { Route } from "react-router-dom";
import {
  Admin,
  Layout,
  ListGuesser,
  RefreshIconButton,
  Resource,
  localStorageStore,
} from "react-admin";
import { ReactQueryDevtools } from "react-query/devtools";
// import Layout from "./Layout/Layout";
import category from "./category";
import tickets from "./tickets";
import { MessageShow } from "./messages/MessageShow";
import { authProvider } from "./authProvider";
import { dataProvider } from "./dataProvider";
import manager from "./manager";
import { BushList } from "./bush/BushList";
import { PetrolStationList } from "./petrol-station/PetrolStationList";
import { CategoryList } from "./category/CategoryList";
import petrolStation from "./petrol-station";

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
    store={localStorageStore(undefined, "HelpDesk")}
    layout={MyLayout}
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
    <Resource name="priority" recordRepresentation="description" />
    <Resource name="attachment" />
    <Resource name="comment" />

  </Admin>
);

export default App;
