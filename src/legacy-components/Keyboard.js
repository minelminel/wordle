import React from "react";

import { v4 as uuidv4 } from "uuid";
import { Container, Row, Col } from "react-bootstrap";
import { Colors } from "../Const";

const keyboard = [
  [
    { letter: "Q", special: false },
    { letter: "W", special: false },
    { letter: "E", special: false },
    { letter: "R", special: false },
    { letter: "T", special: false },
    { letter: "Y", special: false },
    { letter: "U", special: false },
    { letter: "I", special: false },
    { letter: "O", special: false },
    { letter: "P", special: false },
  ],
  [
    { letter: "A", special: false },
    { letter: "S", special: false },
    { letter: "D", special: false },
    { letter: "F", special: false },
    { letter: "G", special: false },
    { letter: "H", special: false },
    { letter: "J", special: false },
    { letter: "K", special: false },
    { letter: "L", special: false },
  ],
  [
    { letter: "ENTER", special: true },
    { letter: "Z", special: false },
    { letter: "X", special: false },
    { letter: "C", special: false },
    { letter: "V", special: false },
    { letter: "B", special: false },
    { letter: "N", special: false },
    { letter: "M", special: false },
    { letter: "DEL", special: true },
  ],
];

const KeyboardKey = ({
  letter,
  special,
  hint,
  onClick = (e) => {
    console.log(e.target.value);
  },
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        fontSize: "13.3px",
        backgroundColor: "gray",
        borderRadius: "5px",
        height: "58px",
        width: special ? "55px" : "33px",
        lineHeight: "58px",
        textAlign: "center",
        margin: "auto",
        color: "white",
        fontWeight: "bold",
        backgroundColor:
          hint === 2
            ? Colors.GREEN
            : hint === 1
            ? Colors.YELLOW
            : hint === 0
            ? Colors.GRAY
            : Colors.SLATE,
      }}
    >
      {letter}
    </div>
  );
};

export const Keyboard = ({ hints, onInput }) => {
  return (
    <Container>
      {keyboard.map((row) => (
        <Row key={uuidv4()} className="mb-1">
          {row.map((gamekey) => (
            <Col
              key={uuidv4()}
              className="mx-0"
              style={{ paddingLeft: "0", paddingRight: "0" }}
            >
              <KeyboardKey
                key={uuidv4()}
                letter={gamekey.letter.toUpperCase()}
                special={gamekey.special}
                hint={hints[gamekey.letter.toLowerCase()]}
                onClick={() => onInput(gamekey.letter.toLowerCase())}
              />
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default Keyboard;
