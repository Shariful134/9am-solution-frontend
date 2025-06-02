import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAppDispath, useAppSelector } from "../redux/hooks";
import { logout, useCurrentToken } from "../redux/auth/authSlice";
import { verifyToken } from "../utils/VerifyToken";
import type { TUser } from "../types/type";

type Tprotected = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoutes = ({ children, role }: Tprotected) => {
  const token = useAppSelector(useCurrentToken);
  console.log("protectedRoutes: ", role);
  const dispatch = useAppDispath();
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  console.log(user);

  if (role != undefined && role != user?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if (!token) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }

  return children;
};

export default ProtectedRoutes;
