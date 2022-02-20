import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";

import styled from "styled-components";

const Debug = styled.pre`
  background: repeating-linear-gradient(
    45deg,
    #606dbc,
    #606dbc 10px,
    #465298 10px,
    #465298 20px
  );
  height: 95vh;
  color: pink;
`;

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <Debug>
      {JSON.stringify(
        {
          _message: "hi becca!",
          innerHeight: window.innerHeight,
          outerHeight: window.outerHeight,
          innerWidth: window.innerWidth,
          outerWidth: window.outerWidth,
          devicePixelRation: window.devicePixelRatio,
        },
        null,
        2
      )}
    </Debug> */}
  </React.StrictMode>,
  document.getElementById("root")
);
