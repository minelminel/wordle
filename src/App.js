import React from "react";
import { Container } from "react-bootstrap";

import NavBar from "./components/NavBar";
import KeyBoard from "./components/KeyBoard";
import TileBoard from "./components/TileBoard";
import { Visualizer } from "./components/Visualizer";
import { Wordle } from "./Wordle";
import { Keys } from "./Const";

// TODO: do this in a useEffect with finish state dependency array
const wordle = new Wordle();
window.wordle = wordle;

// DEV: enter initial state here
const initialInput = "".split("");
const initialGuesses = [].map((e) => e.split(""));
const initialHints = initialGuesses.map((e) =>
  wordle.getHint(wordle.getAnswer(), e)
);

export const App = (props) => {
  const [showVisualizer, setShowVisualizer] = React.useState(false);
  const [pastGuesses, setPastGuesses] = React.useState(initialGuesses);
  const [pastHints, setPastHints] = React.useState(initialHints);
  const [input, setInput] = React.useState(initialInput);
  const [gameEnded, setGameEnded] = React.useState(false);

  const reset = () => {
    wordle.reset();
    setPastGuesses(initialGuesses);
    setPastHints(initialHints);
    setInput(initialInput);
    setGameEnded(false);
    initialGuesses.forEach((e) => wordle.playTurn(e));
  };

  const handleToggle = (value) => {
    setShowVisualizer(!value);
  };

  const handleInput = (e) => {
    if (e === Keys.DELETE) {
      if (input.length) {
        setInput([...input.slice(0, -1)]);
      }
    } else if (e === Keys.ENTER) {
      // bug?
      if (gameEnded) {
        reset();
        return;
      } else if (!wordle.isValidGuess(input)) {
        alert(`Invalid Word: ${input.join("")}`);
        return;
      }
      if (input.length < 5) {
        setInput([...input, e]);
        return;
      }
      const [hints, ended] = wordle.playTurn(input);
      setGameEnded(ended);
      if (ended) {
        // TODO: do alert on timeout so we can render the answer first
        if (wordle.isAnswer(input)) {
          setTimeout(
            () =>
              alert(
                `You Win! 🥳 The word was ${wordle.getAnswer().toUpperCase()}`
              ),
            250
          );
        } else {
          setTimeout(
            () =>
              alert(
                `Uh oh! 😓 The word was ${wordle.getAnswer().toUpperCase()}`
              ),
            250
          );
        }
      }
      setPastGuesses([...pastGuesses, input]);
      setPastHints([...pastHints, hints]);
      setInput([]);
    } else {
      setInput([...input, e]);
    }
  };

  return (
    <>
      <Container
        style={{
          overflow: "hidden",
          minHeight: `${window.innerHeight - 5}px`,
        }}
      >
        <NavBar
          seed={wordle.seed}
          value={showVisualizer}
          onToggle={handleToggle}
        />
        {showVisualizer && (
          <Visualizer
            alphabet={wordle.alphabet}
            hints={pastHints}
            guesses={pastGuesses}
          />
        )}
        {!showVisualizer && (
          <TileBoard
            pastHints={pastHints}
            pastGuesses={pastGuesses}
            input={input}
          />
        )}
        {!showVisualizer && (
          <KeyBoard hints={wordle.alphabet} handler={handleInput} />
        )}
      </Container>
    </>
  );
};

export default App;
