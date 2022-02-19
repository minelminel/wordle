/**
 * Game Engine
 *
 * @method reset
 * @method handleGuess
 */

import Words from "./Words.json";

console.log(`Game.js`);

const [answers, _] = Words;
const guesses = Words.flat();

console.log(answers.length, guesses.length);

export class Wordle {
  /**
   *
   * @param {*} seed
   */
  constructor(seed = 0) {
    // index of the answer array determines the target word
    this.seed = seed;
    this.answers = answers;
    this.guesses = guesses;
    this.turns = [];
    this.alphabet = {};
    this.target = null;
    this.reset();
    console.log(this.alphabet);
  }

  /**
   * Initialize the game state by selecting a target word
   */
  reset() {
    this.turns = [];
    this.alphabet = Object.fromEntries(
      Array.from(Array(26))
        .map((e, i) => i + "a".charCodeAt(0))
        .map((x) => [String.fromCharCode(x), -1])
    );
    this.target = this.answers[this.seed];
  }

  /**
   *
   * @param {string} guess
   * @returns
   */
  evaluateGuess(guess) {
    if (guess.length !== 5) {
      throw "guess length != 5";
    }
    console.log(`Target: ${this.target}`);
    console.log(`Guess: ${guess}`);
    this.turns.push(guess);
    const target = this.target.split("");
    const hints = [];
    for (let i in guess) {
      if (target.indexOf(guess[i]) === -1) {
        console.debug(`guess=${guess} i=${i} (${guess[i]}) : Gray`);
        hints.push(0);
      } else if (target[i] === guess[i]) {
        console.debug(`guess=${guess} i=${i} (${guess[i]}) : Green`);
        hints.push(2);
      } else {
        if (guess.slice(0, i).indexOf(guess[i]) !== -1) {
          console.debug(
            `guess=${guess} i=${i} (${guess[i]}) : Gray (considered)`
          );
          hints.push(0);
        } else {
          console.debug(`guess=${guess} i=${i} (${guess[i]}) : Yellow`);
          hints.push(1);
        }
      }
    }
    // update keyboard alphabet as separate step
    for (let i in hints) {
      console.log(
        `Current alphabet value: ${guess[i]} ${this.alphabet[guess[i]]}`
      );
      console.log(`Latest alphabet value: ${guess[i]} ${hints[i]}`);
      this.alphabet[guess[i]] = Math.max(hints[i], this.alphabet[guess[i]]);
    }
    return hints;
  }
}

export default Wordle;
