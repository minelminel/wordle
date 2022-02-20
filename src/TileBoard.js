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

const animate = keyframes`
  0% {
    transform: translate(0%, 0%)
      perspective(10000px)
      rotateX(0deg)
      rotateY(0deg)
  }
  50% {
    // text-transform: scale(1, -1);
    transform: translation(0%, 0%)
      scale(1, -1)
  }
  100% {
    transform: translate(0%, 0%)
      perspective(10000px)
      rotateX(.5turn)
      rotateY(0deg)
  }
`;

const StyledTile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  place-self: center;

  height: 4rem;
  width: 4rem;

  font-size: 2em;
  font-weight: bold;
  // line-height: 2rem;
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

  // if we have access to an index we can multiple by the delay
  offset-rotate: reverse;
  ${(props) =>
    Flags.ANIMATION &&
    props.animate &&
    css`
      animation: ${animate} 1s linear ${(props) => 0.66 * props.index}s;
    `}
`;

const Tile = (props) => {
  return (
    <StyledTile className="flip-animate" dataHover="Flip" {...props}>
      {props.letter}
    </StyledTile>
  );
};

export const TileBoard = ({
  pastGuesses = [["e", "a", "r", "t", "h"]],
  pastHints = [[0, 1, 1, 0, 0]],
  input = ["a"],
}) => {
  const [NUM_COLS, NUM_ROWS] = [5, 6]; // 30 tiles
  console.assert(pastGuesses.flat().length === pastHints.flat().length);

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
          width: "350px",
          height: "420px",
          display: "grid",
          gridGap: "7px",
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
            />
          ))}
      </Container>
    </>
  );
};

export default TileBoard;
