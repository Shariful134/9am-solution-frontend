import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string) => {
  const decoded = jwtDecode<{ exp: number }>(token);
  if (decoded.exp * 1000 < Date.now()) {
    return null;
  } else {
    return decoded;
  }
};
