import React from "react";
import { Container } from "react-bootstrap";
import styled, { css, keyframes } from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { Flags, Colors } from "./Const";

/**
 * TODO: Only run the flip when the hint value changes for a particular tile,
 * and when doing so, set the new tile as the :after pseudo-element
 *
 * https://codepen.io/kanishkkunal/pen/wgEBgX
 */

// CSS math
const TILE_SIZE = "3.4rem";
const SIZE = 300;

const animate = keyframes`
  0% {
    transform: translate(0%, 50%)
      // perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
  }
  50% {
    transform: translate(0%, 0%)
      // perspective(1000px)
      rotateX(.25turn)
      rotateY(0deg)
  }
  100% {
    transform: translate(0%, -50%)
      // perspective(1000px)
      rotateX(.25turn)
      rotateY(0deg)
  } 
`;

const StyledTile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  place-self: center;

  height: ${TILE_SIZE};
  width: ${TILE_SIZE};

  font-size: 2em;
  font-weight: bold;
  color: ${Colors.WHITE};
  text-transform: uppercase;

  border: 2px solid
    ${(props) =>
      props.hint === 2
        ? Colors.GREEN
        : props.hint === 1
        ? Colors.YELLOW
        : Colors.GRAY};
  background: ${(props) =>
    props.hint === 2
      ? Colors.GREEN
      : props.hint === 1
      ? Colors.YELLOW
      : props.hint === 0
      ? Colors.GRAY
      : Colors.BLACK};

  offset-rotate: reverse;
  ${(props) =>
    Flags.ANIMATION &&
    props.animate &&
    css`
      animation: ${animate} 1s linear ${(props) => 0.66 * props.index}s;
    `}
`;

const Tile = (props) => {
  props.animate && console.log(props);
  return <StyledTile {...props}>{props.letter}</StyledTile>;
};

export const TileBoard = ({ pastGuesses = [], pastHints = [], input = [] }) => {
  const [NUM_COLS, NUM_ROWS] = [5, 6]; // 30 tiles
  console.assert(pastGuesses.flat().length === pastHints.flat().length);
  const offset = pastGuesses.length ? pastGuesses.length - 1 : null;
  const animations =
    offset === null ? [] : Array.from({ length: 5 }, (v, k) => k + 5 * offset);
  const letters = [
    ...pastGuesses.flat(),
    ...input,
    ...Array(
      NUM_COLS * NUM_ROWS - pastGuesses.flat().length - input.length
    ).map((_, i) => ""),
  ];
  const hints = [
    ...pastHints.flat(),
    ...Array(NUM_COLS * NUM_ROWS - pastHints.flat().length).map((_, i) => -1),
  ];

  return (
    <>
      <Container
        className="p-0 mt-3 mb-3"
        style={{
          // 350x420
          width: `${SIZE}px`,
          height: `${SIZE * 1.2}px`,
          display: "grid",
          gridGap: "1px",
          gridTemplateRows: "repeat(6, 1fr)",
          gridTemplateColumns: "repeat(5, 1fr)",
        }}
      >
        {Array(NUM_COLS * NUM_ROWS)
          .fill(0)
          .map((_, i) => (
            <Tile
              key={uuidv4()}
              letter={letters[i]}
              hint={hints[i]}
              index={i}
              animate={animations.indexOf(i) > -1}
            />
          ))}
      </Container>
    </>
  );
};

export default TileBoard;
