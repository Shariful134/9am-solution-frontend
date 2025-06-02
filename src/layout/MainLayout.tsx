import { Outlet } from "react-router";
import NavBar from "../components/modules/navBar/NavBar";

const MainLayout = () => {
  return (
    <div>
      <main className="min-h-screen">
        <NavBar></NavBar>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default MainLayout;
