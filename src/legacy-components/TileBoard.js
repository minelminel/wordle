import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import { Tile } from "./Tile";

/**
 * Takes in an array of past guesses and resulting hints.
 * Needs to consider the fact we must live update as the user presses buttons.
 *
 * @returns
 */
export const TileBoard = ({ pastGuesses = [], pastHints = [], input = [] }) => {
  const NUM_COLS = 5;
  const NUM_ROWS = 6;
  console.assert(pastGuesses.length === pastHints.length);

  // initialize the board
  const letterLayer = Array(NUM_ROWS)
    .fill(0)
    .map(
      (_) =>
        Array(NUM_COLS)
          .fill(0)
          .map((_) => "") // default unevaluated tile state
    );
  const hintLayer = Array(NUM_ROWS)
    .fill(0)
    .map(
      (_) =>
        Array(NUM_COLS)
          .fill(0)
          .map((_) => -1) // default unevaluated tile state
    );
  // fill-in using any previous actions
  for (let row in pastGuesses) {
    console.assert(pastGuesses[row].length === pastHints[row].length);
    letterLayer[row] = Array(NUM_COLS)
      .fill(0)
      .map((_, col) => pastGuesses[row][col]);
    hintLayer[row] = Array(NUM_COLS)
      .fill(0)
      .map((_, col) => pastHints[row][col]);
  }

  // update the current row to display inputs
  const currentRow = pastGuesses.length;
  if (currentRow === 6) {
    console.warn("Game Over");
  } else {
    letterLayer[currentRow] = [...input, ...letterLayer[currentRow]].slice(
      0,
      NUM_COLS
    );
  }

  // console.log(JSON.stringify(letterLayer, null, 2));

  // trigger animation(s)
  return (
    <div style={{ padding: "20px" }}>
      {Array(NUM_ROWS)
        .fill(0)
        .map((_, row) => (
          <Row key={uuidv4()} className="mb-2">
            {Array(NUM_COLS)
              .fill(0)
              .map((_, col) => {
                return (
                  <Tile
                    key={uuidv4()}
                    letter={letterLayer[row][col]}
                    hint={hintLayer[row][col]}
                  />
                );
              })}
          </Row>
        ))}
    </div>
  );
};

export default TileBoard;
