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
      animation: ${animate} 1s linear
        ${(props) => {
          const [row, col] = props.index;
          return 0.75 * col;
        }}s;
    `}
`;

const Tile = (props) => {
  return (
    <StyledTile className="flip-animate" dataHover="Flip" {...props}>
      {props.letter}
    </StyledTile>
  );
};

export const ScratchTileBoard = (props) => {
  return (
    <>
      <Container
        className="p-0 mt-3 mb-3"
        style={{
          width: "350px",
          height: "420px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridGap: "7px",
            gridTemplateRows: "repeat(6, 1fr)",
            gridTemplateColumns: "repeat(5, 1fr)",
          }}
        >
          <Tile key={uuidv4()} letter="c" hint={0} index={[0, 0]} />
          <Tile key={uuidv4()} letter="i" hint={1} index={[0, 1]} />
          <Tile key={uuidv4()} letter="g" hint={0} index={[0, 2]} />
          <Tile key={uuidv4()} letter="a" hint={0} index={[0, 3]} />
          <Tile key={uuidv4()} letter="r" hint={2} index={[0, 4]} />

          <Tile
            key={uuidv4()}
            letter="s"
            hint={2}
            index={[1, 0]}
            animate={true}
          />
          <Tile
            key={uuidv4()}
            letter="h"
            hint={2}
            index={[1, 1]}
            animate={true}
          />
          <Tile
            key={uuidv4()}
            letter="e"
            hint={0}
            index={[1, 2]}
            animate={true}
          />
          <Tile
            key={uuidv4()}
            letter="a"
            hint={0}
            index={[1, 3]}
            animate={true}
          />
          <Tile
            key={uuidv4()}
            letter="r"
            hint={2}
            index={[1, 4]}
            animate={true}
          />

          {Array(4)
            .fill()
            .map((_, r) =>
              Array(5)
                .fill(0)
                .map((_, c) => (
                  <Tile
                    key={uuidv4()}
                    letter=""
                    hint={null}
                    index={[r + 2, c]} // DEV
                    animate={false}
                  />
                ))
            )}
        </div>
      </Container>
    </>
  );
};

export default ScratchTileBoard;
