import Words from "./Words.json";

console.log("Wordle.js");

const [answers, _] = Words;
const guesses = Words.flat();

export class Wordle {
  /**
   * Thoughts:
   * - game state should be held either inside this component entirely, or in a FSM data store
   * - operations should not be allowed to fail under valid gameplay, we do everything with isFoo checks before transitioning
   * - FSM general data store needs to hold {numTurns, pastGuesses, pastHints, currentInput, (alphabetHints->pastHints,PastGuesses)}
   * - FSM transitions:
   * - FMS states:
   *
   * https://github.com/jakesgordon/javascript-state-machine
   */
  constructor(seed = null) {
    this._seed = seed;
    this.answers = answers;
    this.guesses = guesses;
    this.seed =
      this._seed === null
        ? this.constructor.randomInteger(0, this.answers.length)
        : this._seed;
    this.turns = 0;
    this.alphabet = {};
    this.reset();
  }

  reset() {
    this.seed =
      this._seed === null
        ? this.constructor.randomInteger(0, this.answers.length)
        : this._seed;
    this.turns = 0;
    this.alphabet = Object.fromEntries(
      Array.from(Array(26))
        .map((_, i) => i + "a".charCodeAt(0))
        .map((x) => [String.fromCharCode(x), -1])
    );
    console.log(`Reset game: seed=${this.seed} word=${this.getAnswer()}`);
  }

  playTurn(guess) {
    // [hints, gameover]
    this.turns += 1;
    guess = typeof guess === "string" ? guess.split("") : guess;
    return [
      this.getHint(this.getAnswer(), guess),
      this.isAnswer(guess) || this.turns === 6,
    ];
  }

  isValidGuess(guess) {
    guess = typeof guess === "string" ? guess : guess.join("");
    return this.guesses.indexOf(guess) !== -1;
  }

  isAnswer(guess) {
    guess = typeof guess === "string" ? guess : guess.join("");
    return this.getAnswer() === guess;
  }

  getAnswer() {
    return this.answers[this.seed];
  }

  getHint(answer, guess) {
    const n = 5; // TODO: get from const
    console.assert(
      answer.length === guess.length,
      `Length mismatch between answer (${answer.length}) & guess (${guess.length})`
    );
    const store = Object.fromEntries(
      Array(n)
        .fill(0)
        .map((_, i) => [
          i,
          {
            index: i,
            answer: answer[i],
            guess: guess[i],
            hint: null,
          },
        ])
    );
    const unknownEntries = (obj) => {
      return Object.values(obj).filter((e) => e.hint === null);
    };
    // Green:
    unknownEntries(store)
      .filter((e) => e.answer === e.guess)
      .map((e) => (store[e.index].hint = 2));
    // Gray & Yellow:
    const letters = unknownEntries(store).map((e) => e.answer);
    unknownEntries(store).filter((e) => {
      if (letters.indexOf(e.guess) === -1) {
        store[e.index].hint = 0;
      } else {
        store[e.index].hint = 1;
        delete letters[letters.indexOf(e.guess)];
      }
    });
    const hints = Object.values(store).map((e) => e.hint);
    // update keyboard alphabet
    for (let i = 0; i < n; i++) {
      const key = guess[i];
      this.alphabet[key] = Math.max(this.alphabet[key], hints[i]);
    }
    return hints;
  }

  static isArrayEqual(a, b) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  }

  static randomInteger(min, max) {
    // The maximum is exclusive and the minimum is inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  display(hint) {
    const emojis = {
      0: "⬛️",
      1: "🟨",
      2: "🟩",
    };
    return hint.map((e) => emojis[e]).join("");
  }
}

export default Wordle;
