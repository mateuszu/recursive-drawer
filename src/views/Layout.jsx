import "./Layout.css";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const Layout = () => {
  return (
    <div className="app">
      <Nav />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
