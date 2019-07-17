/* eslint-disable react/destructuring-assignment */
import React from "react";
import styled from "styled-components";
import LengthControl from "./components/LengthControl";
import GlobalStyle from "./Global";

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
  font-size: 2em;
  line-height: 1.8em;
`;

class App extends React.Component {
  state = {
    breakLength: 5,
    sessionLength: 25
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

  render() {
    return (
      <AppWrapper>
        <GlobalStyle />
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
      </AppWrapper>
    );
  }
}

export default App;
