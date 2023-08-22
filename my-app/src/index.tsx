import React from "react";
import ReactDOM from "react-dom/client";
// import Login from "./socket_test/login_test"; // 테스트용
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);
