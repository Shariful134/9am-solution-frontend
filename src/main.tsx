import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";

import router from "./routes/Routes";
import { RouterProvider } from "react-router-dom";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}></RouterProvider>
      </PersistGate>
      <Toaster position="top-center" />
    </Provider>
  </StrictMode>
);
