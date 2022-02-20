import React from "react";
import { Container } from "react-bootstrap";
import styled, { css, keyframes } from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { Flags, Colors } from "./Const";

// CSS math
const COMPONENT_WIDTH = 459;
const COMPONENT_HEIGHT = 200;
const KEY_WIDTH = 38;
const KEY_HEIGHT = 58;
const KEY_GAP = 8;

const FlexRow = styled.div`
  display: flex;
  overflow-x: hidden;
  overflow-y: hidden;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: space-around;
  gap: ${KEY_GAP}px;
  margin-left: ${(props) =>
    props.squeeze
      ? `${KEY_GAP + Math.floor(KEY_WIDTH * 0.5)}px`
      : `${KEY_GAP}px`};
  margin-right: ${(props) =>
    props.squeeze
      ? `${KEY_GAP + Math.floor(KEY_WIDTH * 0.5)}px`
      : `${KEY_GAP}px`};
`;

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  gap: ${KEY_GAP}px;
`;

const StyledKey = styled.div`
  display: flex;
  flex-basis: ${(props) => `${props.special ? 165 : 100}%`};
  align-items: center;
  justify-content: center;
  place-self: center;

  height: ${KEY_HEIGHT}px;
  border-radius: 4px;

  font-size: 13.3px;
  font-weight: bold;
  color: ${Colors.WHITE};
  text-transform: uppercase;

  background: ${(props) =>
    props.hint === 2
      ? Colors.GREEN
      : props.hint === 1
      ? Colors.YELLOW
      : props.hint === 0
      ? Colors.GRAY
      : Colors.SLATE};
  }

  &:hover {
    cursor: pointer;
  }

  &:active {
    filter: brightness(80%);
  }
`;

const defaultHandler = (key) => console.log(key);

const Key = ({
  letter,
  hint = -1,
  special = false,
  handler = (key) => console.log(key),
}) => {
  return (
    <StyledKey
      letter={letter}
      hint={hint}
      special={special}
      onClick={() => handler(letter)}
    >
      {letter}
    </StyledKey>
  );
};

export const ScratchKeyBoard = ({
  hints = { i: 1, r: 2, s: 2, h: 2, c: 0, g: 0, a: 0, e: 0 },
  handler = defaultHandler,
}) => {
  return (
    <>
      <Container
        className="footer p-0"
        style={{
          maxWidth: `${COMPONENT_WIDTH}px`,
          position: "fixed",
          bottom: "-10%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          margin: "0 auto",
        }}
      >
        <FlexCol>
          <FlexRow>
            <Key
              key={uuidv4()}
              letter="q"
              hint={hints["q"]}
              handler={handler}
            />
            <Key
              key={uuidv4()}
              letter="w"
              hint={hints["w"]}
              handler={handler}
            />
            <Key
              key={uuidv4()}
              letter="e"
              hint={hints["e"]}
              handler={handler}
            />
            <Key
              key={uuidv4()}
              letter="r"
              hint={hints["r"]}
              handler={handler}
            />
            <Key
              key={uuidv4()}
              letter="t"
              hint={hints["t"]}
              handler={handler}
            />
            <Key
              key={uuidv4()}
              letter="y"
              hint={hints["y"]}
              handler={handler}
            />
            <Key
              key={uuidv4()}
              letter="u"
              hint={hints["u"]}
              handler={handler}
            />
            <Key
              key={uuidv4()}
              letter="i"
              hint={hints["i"]}
              handler={handler}
            />
            <Key
              key={uuidv4()}
              letter="o"
              hint={hints["o"]}
              handler={handler}
            />
            <Key
              key={uuidv4()}
              letter="p"
              hint={hints["p"]}
              handler={handler}
            />
          </FlexRow>
          <FlexRow squeeze={true}>
            <Key
              key={uuidv4()}
              letter="a"
              hint={hints["a"]}
              handler={handler}
            />
            <Key
              key={uuidv4()}
              letter="s"
              hint={hints["s"]}
              handler={handler}
            />
            <Key
              key={uuidv4()}
              letter="d"
              hint={hints["d"]}
              handler={handler}
            />
            <Key
              key={uuidv4()}
              letter="f"
              hint={hints["f"]}
              handler={handler}
            />
            <Key
              key={uuidv4()}
              letter="g"
              hint={hints["g"]}
              handler={handler}
            />
            <Key
              key={uuidv4()}
              letter="h"
              hint={hints["h"]}
              handler={handler}
            />
            <Key
              key={uuidv4()}
              letter="j"
              hint={hints["j"]}
              handler={handler}
            />
            <Key
              key={uuidv4()}
              letter="k"
              hint={hints["k"]}
              handler={handler}
            />
            <Key
              key={uuidv4()}
              letter="l"
              hint={hints["l"]}
              handler={handler}
            />
          </FlexRow>
          <FlexRow>
            <Key
              key={uuidv4()}
              letter="enter"
              special={true}
              handler={handler}
            />
            <Key
              key={uuidv4()}
              letter="z"
              hint={hints["z"]}
              handler={handler}
            />
            <Key
              key={uuidv4()}
              letter="x"
              hint={hints["x"]}
              handler={handler}
            />
            <Key
              key={uuidv4()}
              letter="c"
              hint={hints["c"]}
              handler={handler}
            />
            <Key
              key={uuidv4()}
              letter="v"
              hint={hints["v"]}
              handler={handler}
            />
            <Key
              key={uuidv4()}
              letter="b"
              hint={hints["b"]}
              handler={handler}
            />
            <Key
              key={uuidv4()}
              letter="n"
              hint={hints["n"]}
              handler={handler}
            />
            <Key
              key={uuidv4()}
              letter="m"
              hint={hints["m"]}
              handler={handler}
            />
            <Key key={uuidv4()} letter="del" special={true} handler={handler} />
          </FlexRow>
        </FlexCol>
      </Container>
    </>
  );
};

export default ScratchKeyBoard;
