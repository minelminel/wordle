import React from "react";
import styled from "styled-components";

import { Colors } from "./Const";

const StyledNav = styled.header`
  text-align: center;
  padding: 0px;
  border-bottom: ${`1px solid ${Colors.GRAY}`};
`;

export const NavBar = ({ seed }) => {
  return (
    <>
      <StyledNav>
        <small>{`Wordle #${seed}`}</small>
      </StyledNav>
    </>
  );
};

export default NavBar;
