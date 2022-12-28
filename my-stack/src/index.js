import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { TechProvider } from "./Contexts/TechProvider";
import { UserProvider } from "./Contexts/UserProvider";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TechProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </TechProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
