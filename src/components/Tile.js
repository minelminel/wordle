import React from "react";

import { Colors } from "../Const";

const style = {
  width: "62px",
  height: "62px",
  lineHeight: "62px",
  margin: "auto",
  fontSize: "32px",
  fontWeight: "bold",
  color: "#FFFFFF",
};

/**
 * Tile
 *
 */
export const Tile = ({ letter = "", hint = -1 }) => {
  const backgroundColor =
    hint === 2
      ? Colors.GREEN
      : hint === 1
      ? Colors.YELLOW
      : hint === 0
      ? Colors.GRAY
      : Colors.BLACK;
  const borderColor =
    hint === 2 ? Colors.GREEN : hint === 1 ? Colors.YELLOW : Colors.GRAY;
  return (
    <div
      style={{
        ...style,
        backgroundColor: backgroundColor,
        border: `2px solid ${borderColor}`,
      }}
    >
      {letter.toUpperCase()}
    </div>
  );
};

export default Tile;
