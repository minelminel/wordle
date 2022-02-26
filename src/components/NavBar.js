import React from "react";
import styled from "styled-components";
import ToggleButton from "react-toggle-button";
import { Navbar, Container } from "react-bootstrap";

import { Colors } from "../Const";

const StyledNav = styled.header`
  text-align: center;
  padding: 5px 0px 0px 0px;
  border-bottom: ${`1px solid ${Colors.GRAY}`};
`;

export const NavBar = ({ seed, value, onToggle = (value) => {} }) => {
  return (
    <Navbar variant="dark" bg="none">
      <Container>
        <Navbar.Collapse>
          <Navbar.Brand
            className="mx-auto"
            style={{ paddingLeft: "3rem" }}
          >{`Wordle #${seed}`}</Navbar.Brand>
          <Navbar.Text className="justify-content-end">
            <ToggleButton
              activeLabel={`Hints`}
              inactiveLabel={`Game`}
              value={value}
              onToggle={onToggle}
            />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  return (
    <>
      <StyledNav>
        <h3>
          {`Wordle #${seed}`}
          <ToggleButton
            activeLabel={`Hints`}
            inactiveLabel={`Game`}
            value={value}
            onToggle={onToggle}
          />
        </h3>
      </StyledNav>
    </>
  );
};

export default NavBar;
