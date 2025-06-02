import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <main className="min-h-screen">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default MainLayout;
