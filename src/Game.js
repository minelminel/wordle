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

export class Wordle {
  /**
   *
   * @param {*} seed
   */
  constructor(seed = null) {
    // index of the answer array determines the target word
    this.answers = answers;
    this.guesses = guesses;
    this.seed =
      seed === null ? this.constructor.randomInteger(0, answers.length) : seed;
    // this.alphabet = {};
    // this.target = null;
    this.turns = 0;
    this.reset();
    console.debug(`Seed: ${this.seed}`);
  }

  /**
   * Initialize the game state by selecting a target word
   */
  reset() {
    this.alphabet = Object.fromEntries(
      Array.from(Array(26))
        .map((e, i) => i + "a".charCodeAt(0))
        .map((x) => [String.fromCharCode(x), -1])
    );
    this.target = this.answers[this.seed];
  }

  static randomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  isValid(guess) {
    return this.guesses.indexOf(guess.join("")) !== -1;
  }

  isAnswer(guess) {
    return this.target === guess.join("");
  }

  getAnswer() {
    return this.target;
  }

  /**
   *
   * @param {string} guess
   * @returns
   */
  evaluateGuess(guess) {
    console.debug(guess);
    if (guess.length !== 5) {
      throw "guess length != 5";
    } else if (this.guesses.indexOf(guess.join("")) === -1) {
      throw `invalid guess: ${guess.join("").toUpperCase()}`;
    }
    console.debug(`Target: ${this.target}`);
    console.debug(`Guess: ${guess.join("")}`);
    const target = this.target.split("");
    const hints = [];
    this.turns += 1;
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
    hints.forEach((_, i) => {
      this.alphabet[guess[i]] = Math.max(hints[i], this.alphabet[guess[i]]);
    });
    const win = guess.join("") === this.target || this.turns === 6;
    return [hints, win];
  }
}

export default Wordle;
