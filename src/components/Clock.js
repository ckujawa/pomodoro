import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faSync } from "@fortawesome/free-solid-svg-icons";

import { Button } from "./Button";

const ClockDiv = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-size: 2em;
  ${props => props.Columns && `grid-column: ${props.Columns}`}

  @media (max-width: 900px) {
    grid-column: 1/1;
  }
`;

const ClockFace = styled.div`
  padding: 15px;
  font-size: 2em;
  color: ${props => (props.timer === "Session" ? "green" : "red")};
`;

const ControlPanel = styled.div`
  width: 100%;
  font-size: 0.5em;
  display: flext;
  align-items: center;
  justify-content: center;
`;

const Clock = ({
  Columns,
  minutesLeft,
  secondsLeft,
  timer,
  startStopFunc,
  pauseFunc,
  resetFunc
}) => {
  const seconds =
    secondsLeft.toString().length === 1 ? "0" + secondsLeft : secondsLeft;

  return (
    <ClockDiv Columns={Columns}>
      <div id='timer-label'>{timer}</div>
      <ClockFace
        id='time-left'
        timer={timer}>{`${minutesLeft
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</ClockFace>
      <ControlPanel>
        <Button onClick={pauseFunc}>
          <FontAwesomeIcon icon={faPause} />
        </Button>
        <Button id='start_stop' onClick={startStopFunc}>
          <FontAwesomeIcon icon={faPlay} />
        </Button>
        <Button id='reset' onClick={resetFunc}>
          <FontAwesomeIcon icon={faSync} />
        </Button>
      </ControlPanel>
    </ClockDiv>
  );
};

export default Clock;
