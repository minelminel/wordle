import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import ScratchTileBoard from "./ScratchTileBoard";
import ScratchKeyBoard from "./ScratchKeyBoard";
import ScratchNavBar from "./ScratchNavBar";

ReactDOM.render(
  <React.StrictMode>
    <ScratchNavBar />
    <ScratchTileBoard />
    <ScratchKeyBoard />
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById("root")
);
