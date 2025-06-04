/* eslint-disable react-hooks/exhaustive-deps */
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
  const tokenFromRedux = useAppSelector(useCurrentToken);

  useEffect(() => {
    const subdomain = getSubdomain();
    setShopName(subdomain);

    const token = localStorage.getItem("accessToken") || tokenFromRedux;

    if (token) {
      const user = verifyToken(token) as TUser;
      if (user) {
        dispatch(setUser({ user, token }));
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    } else {
      setAuthenticated(false);
    }

    setLoading(false);
  }, [tokenFromRedux]);

  useEffect(() => {
    if (!token) return;

    const verified = verifyToken(token);
    if (verified) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
    setLoading(false);
  }, [token]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <LoadingSpin />
      </div>
    );
  }

  if (!authenticated) {
    return <div className="container mx-auto">Unauthorized</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center mt-5">
        <h1 className="text-xl">This is {shopName} shop</h1>
      </div>
    </div>
  );
};

export default ShopDetails;
