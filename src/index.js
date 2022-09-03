import { ScrollToTop } from "utils";
import { AllProviders } from "AllProviders";
import { ToastPortal } from "ToastPortal";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { makeServer } from "./server";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AllProviders>
        <ScrollToTop>
          <App />
          <ToastPortal />
        </ScrollToTop>
      </AllProviders>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// Call make Server
makeServer();
