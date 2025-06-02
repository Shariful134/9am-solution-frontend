import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../components/pages/Home";
import RegisterPage from "../components/pages/auth/RegisterPage";
import LoginPage from "../components/pages/auth/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,
        element: <Home></Home>,
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
]);

export default router;
