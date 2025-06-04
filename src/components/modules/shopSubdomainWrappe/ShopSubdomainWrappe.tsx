// import { useEffect, useState } from "react";
// import { getSubdomain } from "../../../utils/getSubDomain";
// import Home from "../../pages/Home";
// import ShopDetails from "../shopDetails/ShopDetails";

// const ShopSubdomainWrapper = () => {
//   const [shop, setShop] = useState<string | null>(null);

//   useEffect(() => {
//     const host = window.location.host;
//     const parts = host.split(".");
//     if (parts.length > 2 && parts[1] == "localhost:5173") {
//       setShop(parts[0]);
//     }
//   }, []);
//   const subdomain = getSubdomain();
//   if (subdomain) {
//     return <ShopDetails shopNamed={shop} />;
//   }
//   return <Home />;
// };

// export default ShopSubdomainWrapper;
