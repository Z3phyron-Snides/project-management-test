import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.scss";
import '@fontsource/poppins';

import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRoutes";
import store from "./store/store";
import Navbar from "./components/navbar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Navbar/>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
