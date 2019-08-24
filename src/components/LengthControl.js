/* eslint-disable react/button-has-type */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import styled from "styled-components";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import { Button } from "./Button";

const Control = styled.div`
  margin: 0 20px;
  padding: 10px;
  border: 3px solid var(--dark);
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 900px) {
    grid-column: 1/1;
    border: 10px;
  }
`;

const ControlWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0;
  padding: 0;

  > div {
    font-size: 2.3em;
    padding: 0 10px;
  }
`;

const LengthControl = ({ compName, title, clickFunc, length }) => {
  return (
    <Control id={`${compName}-control`}>
      <div id={`${compName}-label`}>{title}</div>
      <ControlWrapper>
        <Button
          id={`${compName}-decrement`}
          value="-"
          onClick={() => clickFunc(compName, "-")}
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </Button>
        <div id={`${compName}-length`}>{length}</div>
        <Button
          id={`${compName}-increment`}
          value="+"
          onClick={() => clickFunc(compName, "+")}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </Button>
      </ControlWrapper>
    </Control>
  );
};

LengthControl.propTypes = {
  compName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  clickFunc: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired
};

export default LengthControl;
