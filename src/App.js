/* eslint-disable react/destructuring-assignment */
import React from "react";
import styled from "styled-components";
import LengthControl from "./components/LengthControl";
import GlobalStyle from "./Global";
import Clock from "./components/Clock";
import bell from "./assets/audio/bell.mp3";

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Righteous, cursive;
  font-size: 1.5em;
  line-height: 1.8em;

  @media (max-width: 900px) {
    font-size: 1em;
    linge-height: 1.2em;
  }
`;

const AppContainer = styled.div`
  width: 60%;
  border: 2px solid var(--light);
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 3em 1fr 3fr;
  justify-items: center;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

const Title = styled.h1`
  grid-column: 1/3;
  margin: 0;
  padding: 0;
  line-height: 1.5em;

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

class App extends React.Component {
  state = {
    breakLength: 5,
    sessionLength: 25,
    minutesLeft: 25,
    secondsLeft: 0,
    currentTimer: "Session", //session or break
    clockInterval: null
  };

  changeControlValue = (compName, value) => {
    let valueToChange = 0;
    let oldValue = 0;

    if (compName === "session") {
      valueToChange = this.state.sessionLength;
      oldValue = this.state.sessionLength;
    } else if (compName === "break") {
      valueToChange = this.state.breakLength;
      oldValue = this.state.breakLength;
    } else {
      return;
    }

    if (value === "-" && valueToChange > 1) {
      valueToChange -= 1;
    } else if (value === "+" && valueToChange < 60) {
      valueToChange += 1;
    } else {
      return;
    }

    if (compName === "session") {
      this.setState({ sessionLength: valueToChange });
      if (
        this.state.clockInterval === null &&
        this.state.currentTimer === "Session" &&
        this.state.minutesLeft === oldValue
      ) {
        this.setState({ minutesLeft: valueToChange });
      }
    } else {
      this.setState({ breakLength: valueToChange });

      if (
        this.state.clockInterval === null &&
        this.state.currentTimer === "Break" &&
        this.state.minutesLeft === oldValue
      ) {
        this.setState({ minutesLeft: valueToChange });
      }
    }
  };

  updateClock = () => {
    let minutesLeft = this.state.minutesLeft;
    let secondsLeft = this.state.secondsLeft;

    if (secondsLeft === 0) {
      if (minutesLeft === 0) {
        this.changeTimer();
        return;
      }
      secondsLeft = 59;
      minutesLeft -= 1;
    } else {
      secondsLeft -= 1;
    }

    this.setState({ minutesLeft: minutesLeft, secondsLeft: secondsLeft });
  };

  changeTimer = () => {
    this.playBell();
    this.pause();
    let timer = this.state.currentTimer;
    let minutesLeft = this.state.minutesLeft;

    if (timer === "Session") {
      timer = "Break";
      minutesLeft = this.state.breakLength;
    } else {
      timer = "Session";
      minutesLeft = this.state.sessionLength;
    }
    this.setState({ currentTimer: timer, minutesLeft: minutesLeft });
    this.startStop();
  };

  playBell = () => {
    this.audioBeep.play();
  };

  startStop = () => {
    if (this.state.clockInterval === null) {
      const interval = setInterval(this.updateClock, 1000);
      this.setState({ clockInterval: interval });
    } else {
      this.pause();
    }
  };

  pause = () => {
    if (this.state.clockInterval !== null) {
      clearInterval(this.state.clockInterval);
      this.setState({ clockInterval: null });
    }
  };

  reset = () => {
    if (this.state.clockInterval !== null) {
      return;
    }

    let minutes = this.state.sessionLength;
    let minutesLeft = this.state.minutesLeft;
    let secondsLeft = this.state.secondsLeft;

    if (this.state.currentTimer === "Break") {
      minutes = this.state.breakLength;
    }

    minutesLeft = minutes;
    secondsLeft = 0;
    this.setState({ minutesLeft: minutesLeft, secondsLeft: secondsLeft });
  };

  render() {
    return (
      <AppWrapper>
        <GlobalStyle />
        <AppContainer>
          <Title>React Pomodoro Clock</Title>
          <LengthControl
            compName="session"
            title="Session Time"
            length={this.state.sessionLength}
            clickFunc={this.changeControlValue}
          />
          <LengthControl
            compName="break"
            title="Break Time"
            length={this.state.breakLength}
            clickFunc={this.changeControlValue}
          />
          <Clock
            Columns="1/3"
            minutesLeft={this.state.minutesLeft}
            secondsLeft={this.state.secondsLeft}
            timer={this.state.currentTimer}
            startStopFunc={this.startStop}
            pauseFunc={this.pause}
            resetFunc={this.reset}
          />
          <audio
            id="beep"
            preload="auto"
            src={bell}
            ref={audio => {
              this.audioBeep = audio;
            }}
          />
        </AppContainer>
      </AppWrapper>
    );
  }
}

export default App;
