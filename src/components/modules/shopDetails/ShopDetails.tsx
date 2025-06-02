import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { setUser, useCurrentToken } from "../../../redux/auth/authSlice";
import { getSubdomain } from "../../../utils/getSubDomain";
import { verifyToken } from "../../../utils/VerifyToken";
import LoadingSpin from "../../../utils/LoadingSpin";
import { useDispatch } from "react-redux";
import type { TUser } from "../../../types/type";

const ShopDetails = () => {
  const [loading, setLoading] = useState(true);
  const [shopName, setShopName] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const token = useAppSelector(useCurrentToken);

  const dispatch = useDispatch();

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  useEffect(() => {
    const tokenFromCookie = getCookie("token");
    console.log("tokenFromCookie: ", tokenFromCookie);
    let users;
    if (tokenFromCookie) {
      users = verifyToken(tokenFromCookie as string) as TUser;
    }
    if (!token && tokenFromCookie) {
      dispatch(setUser({ user: users, token: tokenFromCookie }));
    }

    const subdomain = getSubdomain();
    setShopName(subdomain);

    if (!token) {
      setAuthenticated(false);
      setLoading(false);
      return;
    }

    const verified = verifyToken(token);
    if (verified) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div>
        <LoadingSpin />
      </div>
    );

  if (!authenticated) return <div>Unauthorized</div>;
  return <div>This is {shopName} shop</div>;
};

export default ShopDetails;
