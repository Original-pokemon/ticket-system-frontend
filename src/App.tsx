
import { Route, Routes } from "react-router-dom";
import { AppRoute } from "./const";
import AuthGuard from "./components/AuthGuard/AuthGuard";
import TicketsList from "./pages/TicketsList/TicketsList";
import ManagersList from "./pages/ManagersList/ManagersList";
import { PetrolStationList } from "./pages/PetrolStationList/PetrolStationList";
import { CategoriesList } from "./pages/CategoriesList/CategoriesList";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login/Login";
import Layout from "./components/layouts/app-layout/Layout";
import 'react-toastify/dist/ReactToastify.css';
import { Ticket } from "./pages/Ticket/Ticket";
import Manager from "./pages/Manager/Manager";
import PetrolStation from "./pages/PetrolStation/PetrolStation";
import Category from "./pages/Category/Category";
import { ThemeProvider } from "./components/theme-provider/theme-provider";

const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <ToastContainer />
    <Routes>
      <Route path={AppRoute.Login} element={<Login />} />
      <Route element={<AuthGuard />}>
        <Route element={<Layout />}>
          <Route path={AppRoute.Tickets} element={<TicketsList />} />
          <Route path={AppRoute.Ticket} element={<Ticket />} />
          <Route path={AppRoute.Managers} element={<ManagersList />} />
          <Route path={AppRoute.Manager} element={<Manager />} />
          <Route path={AppRoute.PetrolStations} element={<PetrolStationList />} />
          <Route path={AppRoute.PetrolStation} element={<PetrolStation />} />
          <Route path={AppRoute.TaskPerformers} element={<CategoriesList />} />
          <Route path={AppRoute.TaskPerformer} element={<Category />} />
          <Route path={AppRoute.PageNotFound} element={<TicketsList />} />
        </Route>
      </Route>
    </Routes>
  </ThemeProvider>
);
App
export default App;
