import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { UserProvider } from "./UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
