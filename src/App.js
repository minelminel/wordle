import React from "react";

import { v4 as uuidv4 } from "uuid";
import { Container, Row, Col } from "react-bootstrap";

import { Keyboard } from "./components/Keyboard";
import { Tile } from "./components/Tile";
import { TileBoard } from "./components/TileBoard";
import { Wordle } from "./Game";

const wordle = new Wordle(0);
window.wordle = wordle;

// DEV
const initialInput = "".split("");
const initialGuesses = [].map((ele) => ele.split(""));
const initialHints = initialGuesses.map((ele) => {
  const [hint, _] = wordle.evaluateGuess(ele);
  return hint;
});
//

const App = () => {
  const [pastGuesses, setPastGuesses] = React.useState(initialGuesses);
  const [pastHints, setPastHints] = React.useState(initialHints);
  const [input, setInput] = React.useState(initialInput);

  const reset = () => {
    setPastGuesses(initialGuesses);
    setPastHints(initialHints);
    setInput(initialInput);
    wordle.reset();
  };

  const handleInput = (event) => {
    if (event === "del") {
      setInput(input.slice(0, -1));
    } else if (event === "enter") {
      if (input.length === 5) {
        let hint, win;
        try {
          [hint, win] = wordle.evaluateGuess(input);
        } catch (error) {
          alert("Not A Valid Word");
          return;
        }
        // TODO: allow the user to press enter before resetting
        if (win === true) {
          alert(`You Win! The word was ${wordle.target.toUpperCase()}`);
          reset();
        } else if (pastGuesses.length === 5 && win === false) {
          alert(`Whoops! The word was ${wordle.target.toUpperCase()}`);
          reset();
        } else {
          // TODO: render the answer before telling the user they won
          setPastHints([...pastHints, hint]);
          setPastGuesses([...pastGuesses, input]);
          setInput([]);
        }
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
