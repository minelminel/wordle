import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

import { Colors } from "../Const";

const Tile = styled.div`
  height: 25px;
  width: 25px;
  margin: 0 auto;
  margin-bottom: 2px;
  border: 1px solid gray;
  background-color: transparent;
  text-align: center;
  text-transform: uppercase;
  color: transparent;

  &.candidate {
    background: ${Colors.PURPLE};
    color: ${Colors.WHITE};
  }
`;

export const Visualizer = ({ alphabet = {}, hints = [], guesses = [] }) => {
  /**
   * Show 5 columns corresponding to the TileBoard
   *
   * Each column shows the remaining possible letter selections,
   * with an additional step of saying "if this letter is known
   * to be in the word, and only 1 placement remains, remove all
   * other letters for the corresponding column"
   */

  const pop = (array, value) => {
    return array.indexOf(value) === -1
      ? array
      : [
          ...array.slice(0, Math.max(0, array.indexOf(value))),
          ...array.slice(array.indexOf(value) + 1),
        ];
  };

  const evaluateColumns = (alphabet, guesses, hints) => {
    const store = Object.fromEntries(
      Object.keys(alphabet).map((letter) => [
        letter,
        Array(5)
          .fill(0)
          .map((_, i) => i),
      ])
    );

    // filter `across`
    for (let row = 0; row < hints.length; row++) {
      for (let col = 0; col < 5; col++) {
        const letter = guesses[row][col];
        const value = hints[row][col];
        switch (value) {
          // TODO: consider if we have eliminated multiple letter placements
          // seed=335, guesses=earth,solid,slums
          case 2:
            // green: remove column index from all other letters
            Object.entries(store).forEach(([key, list]) => {
              if (key !== letter) {
                store[key] = pop(list, col);
              }
            });
            break;
          case 1:
            // yellow: remove from only this column index
            store[letter] = pop(store[letter], col);
            break;
          case 0:
            // black: not in any columns
            if (store[letter].length === 5) {
              store[letter] = [];
            }
            break;
          default:
            // default case: no-op
            break;
        }
      }
    }
    // filter `down`
    const inferred = Object.fromEntries(
      Object.entries(store)
        .filter(([key, list]) => list.length === 1)
        .map(([key, list]) => [key, store[key][0]])
    );
    Object.entries(inferred).forEach(([letter, column]) => {
      Object.entries(store).forEach(([key, list]) => {
        if (key !== letter) {
          store[key] = pop(list, column);
        }
      });
    });

    // format the columns
    const columns = Array(5)
      .fill(0)
      .map((_, i) => {
        return Object.fromEntries(
          Object.entries(store).map(([key, list]) => {
            return [key, list.indexOf(i) !== -1];
          })
        );
      });
    return columns;
  };

  const renderColumn = (column) => {
    return (
      <Col key={uuidv4()}>
        {Object.entries(column).map(([letter, candidate]) => (
          <Tile key={uuidv4()} className={candidate && `candidate`}>
            {letter}
          </Tile>
        ))}
      </Col>
    );
  };

  return (
    <Container>
      <Row className="mt-2">
        {evaluateColumns(alphabet, guesses, hints).map((column) =>
          renderColumn(column)
        )}
      </Row>
    </Container>
  );
};

export default Visualizer;
