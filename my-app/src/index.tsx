import React from "react";
import ReactDOM from "react-dom/client";
// import APP from "./App";
import Client from "./socket_test/client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <APP></APP> */}
    <Client></Client>
  </React.StrictMode>
);
