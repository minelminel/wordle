import React from "react";
import { v4 as uuidv4 } from "uuid";

import NavBar from "./NavBar";
import KeyBoard from "./KeyBoard";
import TileBoard from "./TileBoard";
import { Wordle } from "./Game";
import { Keys } from "./Const";

// TODO: do this in a useEffect with finish state dependency array
const wordle = new Wordle();
window.wordle = wordle;

export const App = (props) => {
  const [pastGuesses, setPastGuesses] = React.useState([]);
  const [pastHints, setPastHints] = React.useState([]);
  const [input, setInput] = React.useState([]);
  const [gameEnded, setGameEnded] = React.useState(false);

  const reset = () => {
    wordle.reset();
    setPastGuesses([]);
    setPastHints([]);
    setInput([]);
    setGameEnded(false);
  };

  const handleInput = (e) => {
    if (e === Keys.DELETE) {
      setInput([...input.slice(0, -1)]);
    } else if (e === Keys.ENTER) {
      if (gameEnded) {
        reset();
        return;
      } else if (!wordle.isValid(input)) {
        alert(`Invalid Word: ${input.join("")}`);
        return;
      }
      const [hint, ended] = wordle.evaluateGuess(input);
      setGameEnded(ended);
      if (ended) {
        if (wordle.isAnswer(input)) {
          alert(`You Win! The word was ${wordle.getAnswer().toUpperCase()}`);
        } else {
          alert(`You Lose! The word was ${wordle.getAnswer().toUpperCase()}`);
        }
      }
      setPastGuesses([...pastGuesses, input]);
      setPastHints([...pastHints, hint]);
      setInput([]);
    } else {
      setInput([...input, e]);
    }
  };

  return (
    <>
      <NavBar seed={wordle.seed} />
      <TileBoard
        pastHints={pastHints}
        pastGuesses={pastGuesses}
        input={input}
      />
      <KeyBoard hints={wordle.alphabet} handler={handleInput} />
    </>
  );
};

export default App;
