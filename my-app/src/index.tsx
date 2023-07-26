import React from "react";
import ReactDOM from "react-dom/client";
// import APP from "./App";
import Client from "./socket_test/client";
import Login from "./socket_test/login_test";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <APP></APP> */}
    <Login></Login>
  </React.StrictMode>
);
