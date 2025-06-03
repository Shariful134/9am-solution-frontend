import { getSubdomain } from "../../../utils/getSubDomain";
import Home from "../../pages/Home";
import ShopDetails from "../shopDetails/ShopDetails";

const ShopSubdomainWrapper = () => {
  const subdomain = getSubdomain();
  if (subdomain) {
    return <ShopDetails shopNamed={subdomain} />;
  }
  return <Home />;
};

export default ShopSubdomainWrapper;
