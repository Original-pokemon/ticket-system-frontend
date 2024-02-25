import { Layout, LayoutProps } from "react-admin";
import Menu from "./Menu";

export default (props: LayoutProps) => (
  <Layout {...props} menu={Menu} />
)