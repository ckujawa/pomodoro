/* eslint-disable react/button-has-type */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

const LengthControl = ({ compName, title, clickFunc, length }) => {
  return (
    <div id={`${compName}-control`}>
      <div id={`${compName}-label`}>{title}</div>
      <button
        id={`${compName}-decrement`}
        value="-"
        onClick={() => clickFunc(compName, "-")}
      >
        <FontAwesomeIcon icon={faArrowDown} />
      </button>
      <div id={`${compName}-length`}>{length}</div>
      <button
        id={`${compName}-increment`}
        value="+"
        onClick={() => clickFunc(compName, "+")}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
};

LengthControl.propTypes = {
  compName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  clickFunc: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired
}

export default LengthControl;
