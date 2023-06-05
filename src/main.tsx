import React from "react";
import ReactDOM from "react-dom/client";
import "./tailwind.css";
import Root from "$lib/Root/Root.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600&display=swap"
      rel="stylesheet"
    />
    <Root />
  </React.StrictMode>
);
