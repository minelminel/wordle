import React from "react";
import styled from "styled-components";

import { Colors } from "../Const";

const StyledNav = styled.header`
  text-align: center;
  padding: 5px 0px 0px 0px;
  border-bottom: ${`1px solid ${Colors.GRAY}`};
`;

export const NavBar = ({ seed }) => {
  return (
    <>
      <StyledNav>
        <h3>{`Wordle #${seed}`}</h3>
      </StyledNav>
    </>
  );
};

export default NavBar;
