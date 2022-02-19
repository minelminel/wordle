import React from "react";

import { v4 as uuidv4 } from "uuid";
import { Container, Row, Col } from "react-bootstrap";

import { Keyboard } from "./components/Keyboard";
import { Tile } from "./components/Tile";
import { TileBoard } from "./components/TileBoard";
import { Wordle } from "./Game";

const wordle = new Wordle();
window.wordle = wordle;
// console.info(wordle.evaluateGuess("earth"));
// console.info(wordle.evaluateGuess("solid"));
// console.info(wordle.evaluateGuess("dodge"));

const App = () => {
  const [pastGuesses, setPastGuesses] = React.useState([]);
  const [pastHints, setPastHints] = React.useState([]);
  const [input, setInput] = React.useState([]);

  const handleInput = (event) => {
    if (event === "del") {
      setInput(input.slice(0, -1));
    } else if (event === "enter") {
      if (input.length === 5) {
        let hint;
        try {
          hint = wordle.evaluateGuess(input);
        } catch (error) {
          alert("Not A Valid Word");
          return;
        }
        // check if we won: all 2's sum to 10
        if (hint.reduce((partialSum, a) => partialSum + a, 0) === 10) {
          alert(`You Win! The word was ${input.join("").toUpperCase()}`);
          // allow the user to press enter to reset
        }
        // TODO: render the answer before telling the user they won
        setPastHints([...pastHints, hint]);
        setPastGuesses([...pastGuesses, input]);
        setInput([]);
      }
    } else if (input.length < 5) {
      setInput([...input, event]);
    } else {
      // pass
    }
  };

  return (
    <div className="App">
      <Container>
        <nav className="p-3">
          <h1>Wordle</h1>
          <hr />
        </nav>
        <Row>
          <Col>
            <TileBoard
              pastGuesses={pastGuesses}
              pastHints={pastHints}
              input={input}
            />
          </Col>
        </Row>
        <Row>
          <Keyboard hints={wordle.alphabet} onInput={handleInput} />
        </Row>
      </Container>
    </div>
  );
};

export default App;
