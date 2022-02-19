import React from "react";

import { v4 as uuidv4 } from "uuid";
import { Container, Row, Col } from "react-bootstrap";

import { Keyboard } from "./components/Keyboard";
import { Tile } from "./components/Tile";
import { Wordle } from "./Game";

const wordle = new Wordle(246);
window.wordle = wordle;
console.info(wordle.evaluateGuess("earth"));
console.info(wordle.evaluateGuess("solid"));
// console.info(wordle.evaluateGuess("dodge"));

const gamestate = [
  [
    ["e", 1],
    ["a", 0],
    ["r", 0],
    ["t", 0],
    ["h", 0],
  ],
  [
    ["s", 0],
    ["o", 2],
    ["l", 0],
    ["i", 0],
    ["d", 1],
  ],
  // [
  //   ["d", 2],
  //   ["o", 2],
  //   ["d", 2],
  //   ["g", 2],
  //   ["e", 2],
  // ],
  [
    ["", -1],
    ["", -1],
    ["", -1],
    ["", -1],
    ["", -1],
  ],
  [
    ["", -1],
    ["", -1],
    ["", -1],
    ["", -1],
    ["", -1],
  ],
  [
    ["", -1],
    ["", -1],
    ["", -1],
    ["", -1],
    ["", -1],
  ],
  [
    ["", -1],
    ["", -1],
    ["", -1],
    ["", -1],
    ["", -1],
  ],
];

const App = () => {
  const [guess, setGuess] = React.useState([]);

  const handleInput = (event) => {
    if (event === "del") {
      setGuess(guess.slice(0, -1));
    } else if (event === "enter") {
      console.log(guess.length);
      if (guess.length === 5) {
        // submit to wordle, get mask
        console.log(guess);
        const hint = wordle.evaluateGuess(guess);
        console.log(hint);
      }
    } else if (guess.length < 5) {
      setGuess([...guess, event]);
    } else {
      // pass
    }
  };

  console.log(`Current Buffer: ${guess}`);

  return (
    <div className="App">
      <Container>
        <nav className="p-3">
          <h1>Wordle</h1>
          <hr />
        </nav>
        <div style={{ padding: "20px" }}>
          {gamestate.map((row) => (
            <Row key={uuidv4()} className="mb-2">
              {row.map((turn) => (
                <Tile key={uuidv4()} letter={turn[0]} hint={turn[1]} />
              ))}
            </Row>
          ))}
        </div>
        <Row>
          <Keyboard hints={wordle.alphabet} onInput={handleInput} />
        </Row>
      </Container>
    </div>
  );
};

export default App;
