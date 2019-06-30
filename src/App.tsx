import * as React from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Terminal } from "./components/Terminal";
import { defaultCommands } from "./models/Command";
import "./App.css";

interface IState {
  commands: string[];
}

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      commands: defaultCommands
    };
    this.onCall = this.onCall.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onCall(command: string) {
    this.setState(state => {
      state.commands.push(command);
      return state;
    });
  }

  onClear() {
    this.setState({ commands: [] });
  }

  onClick() {
    const selection = window.getSelection();
    if (selection && selection.type !== "Range") {
      const inputs = document.querySelectorAll("input");
      const latestInput = inputs[inputs.length - 1] as HTMLInputElement;
      latestInput.focus();
    }
  }

  render() {
    return (
      <div onClick={this.onClick} className="App">
        <Header />
        <Main>
          <Terminal
            commands={this.state.commands}
            onCall={this.onCall}
            onClear={this.onClear}
          />
        </Main>
      </div>
    );
  }
}

export default App;
