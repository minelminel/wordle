import React from "react";
import styled from "styled-components";

import { Colors } from "./Const";

const StyledNav = styled.header`
  text-align: center;
  padding: 10px 0px 5px 0px;
  border-bottom: ${`1px solid ${Colors.GRAY}`};
`;

export const NavBar = ({ seed }) => {
  return (
    <>
      <StyledNav>
        <h1>{`Wordle #${seed}`}</h1>
      </StyledNav>
    </>
  );
};

export default NavBar;
