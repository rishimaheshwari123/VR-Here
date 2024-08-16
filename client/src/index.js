import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Helmet, HelmetProvider } from 'react-helmet-async';

import App from "./App";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./redux/reducer/store";
import { BrowserRouter } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <HelmetProvider>
  {/* // <React.StrictMode> */}
    <Provider store={store}>

      <BrowserRouter>
        <ToastContainer />
        <App />
        <Analytics />
        <SpeedInsights />
      </BrowserRouter>
    </Provider>
  {/* // </React.StrictMode> */}
  </HelmetProvider>

);


