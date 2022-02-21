import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Container, Row, Col } from "react-bootstrap";
import App from "./App";

import styled from "styled-components";

console.log("hello");

const Header = styled.div`
  // width: 100vw;
  height: 50px;
  background: red;
  &::before {
    content: "navbar";
  }
`;

const TileBoard = styled.div`
  width: 150px;
  height: 50px;
  background: green;
  // &::before {
  //   content: "tileboard";
  // }
`;

const KeyBoard = styled.div`
  width: 390px;
  height: 200px;
  background: blue;
  &::before {
    content: "keyboard";
  }
`;

const Screen = {
  WIDTH: window.innerWidth,
  HEIGHT: window.innerHeight,
};

const Layout = (props) => {
  // React.useEffect(() => {
  //   console.log("Resizing...");
  //   window.onresize = function () {
  //     document.body.height = window.innerHeight;
  //   };
  //   window.onresize(); // called to initially set the height.
  // }, []);

  const gutter =
    window.outerHeight -
    (window.innerHeight - document.documentElement.offsetHeight);

  return (
    <Container
      style={{
        overflow: "hidden",
        border: "1px dashed white",
      }}
      className="d-flex flex-column justify-content-center vh-100"
    >
      {/* <Row className="wordle-header"> */}
      {/* <Col className="d-flex justify-content-center fixed-top p-0"> */}
      <header>
        <Header />
      </header>
      {/* </Col> */}
      {/* </Row> */}
      <Row
        className="wordle-tileboard flex-fill h-100 align-items-center"
        style={{
          border: "2px dashed purple",
          // minHeight: "100vh",
          minHeight: "-webkit-fill-available",
        }}
      >
        <Col className="d-flex justify-content-center p-0">
          <TileBoard>{`Gutter: ${gutter}px`}</TileBoard>
        </Col>
      </Row>
      <Row className="wordle-footer fixed-bottom">
        <Col className="d-flex justify-content-center p-0">
          {/* <footer> */}
          <KeyBoard />
          {/* </footer> */}
        </Col>
      </Row>
      <div
        style={{
          border: "10px solid pink",
          height: "0px",
          position: "absolute",
          bottom: "-100px",
        }}
      ></div>
    </Container>
  );
};

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <Layout />
  </React.StrictMode>,
  document.getElementById("root")
);
