import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../components/pages/Home";
import RegisterPage from "../components/pages/auth/RegisterPage";
import LoginPage from "../components/pages/auth/LoginPage";

import UserLayout from "../layout/UserLayout";
import UserDashBoardPage from "../components/modules/dashboard/UserDashboard";
import ProtectedRoutes from "../layout/ProtectedRoutes";
import ShopDetails from "../components/modules/shopDetails/ShopDetails";
import { getSubdomain } from "../utils/getSubDomain";
import ShopSubdomainWrapper from "../components/modules/shopSubdomainWrappe/ShopSubdomainWrappe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      // {
      //   index: true,

      //   element: getSubdomain() ? <ShopDetails /> : <Home />,
      // },
      {
        index: true,
        element: <ShopSubdomainWrapper />,
      },
      {
        path: "/register",
        element: <RegisterPage></RegisterPage>,
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
    ],
  },
  // User layout based routes
  {
    path: "/user",
    element: (
      <ProtectedRoutes role="user">
        <UserLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "dashboard",
        element: <UserDashBoardPage />,
      },
      {
        path: "*",
        element: <ShopDetails />,
      },
    ],
  },
]);

export default router;
