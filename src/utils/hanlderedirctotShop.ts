/* eslint-disable @typescript-eslint/no-explicit-any */
// export const handleRedirectToShop = async (shop: string) => {
//   const token = localStorage.getItem("accessToken") || "your-jwt-token";
//   const shopWindow: any =
//     (window.location.href = `http://${shop}.localhost:5173`);

//   shopWindow.onload = () => {
//     shopWindow.postMessage({ token }, `http://${shop}.localhost:5173`);
//   };
// };

export const handleRedirectToShop = (shop: string) => {
  const token = localStorage.getItem("accessToken");

  const shopUrl = `http://${shop}.localhost:5173`;
  const shopWindow = window.open(shopUrl);
  const interval = setInterval(() => {
    if (shopWindow) {
      shopWindow.postMessage({ token }, shopUrl);
    }
  }, 500);
  setTimeout(() => clearInterval(interval), 5000);
};

export const getTokenForShopDetails = () => {
  window.addEventListener("message", (e) => {
    if (e.origin !== "http://localhost:5173") return;
    const { token } = e.data;
    if (token) {
      localStorage.setItem("accessToken", token);
      //window.location.href = "/dashboard"; // redirect after receiving token
    }
  });
  window.opener?.postMessage({ status: "ready" }, "http://localhost:5173");
};
