/* eslint-disable react/destructuring-assignment */
import React from "react";
import styled from "styled-components";
import LengthControl from "./components/LengthControl";
import GlobalStyle from "./Global";
import Clock from "./components/Clock";

const AppWrapper = styled.div`
  background-color: var(--main);
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
`;

const AppContainer = styled.div`
  height: 50%;
  width: 60%;
  border: 2px solid var(--light);
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 3em 1fr 3fr;
  justify-items: center;
  align-items: center;
`;

const Title = styled.h1`
  grid-column: 1/3;
  margin: 0;
  padding: 0;
  line-height: 1.5em;

`;

class App extends React.Component {
  state = {
    breakLength: 5,
    sessionLength: 25,
    minutesLeft: 25,
    secondsLeft: 0,
    currentTimer: 'Session', //session or break
    clockInterval: null,
  };

  changeControlValue = (compName, value) => {
    let valueToChange = 0;

    if (compName === "session") {
      valueToChange = this.state.sessionLength;
    } else if (compName === "break") {
      valueToChange = this.state.breakLength;
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
      this.setState({ sessionLength: valueToChange }, () => {
        console.log(this.state);
      });
    } else {
      this.setState({ breakLength: valueToChange });
    }
  };

  updateClock = () => {
    let minutesLeft = this.state.minutesLeft;
    let secondsLeft = this.state.secondsLeft;

    if (secondsLeft === 0) {
      secondsLeft = 59;
      minutesLeft -= 1;
    } else {
      secondsLeft -= 1;
    }

    this.setState({ minutesLeft: minutesLeft, secondsLeft: secondsLeft });
  }

  startStop = () => {
    if (this.state.clockInterval === null) {
      const interval = setInterval(this.updateClock, 1000);
      this.setState({ clockInterval: interval });
    } else {
      clearInterval(this.state.clockInterval);
      this.setState({ clockInterval: null, });
    }
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
            />
        </AppContainer>
      </AppWrapper>
    );
  }
}

export default App;
