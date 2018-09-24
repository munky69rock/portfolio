import * as React from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Terminal } from "./components/Terminal";
import "./App.css";

const DEFAULT_COMMANDS = [
  "whoami",
  "github",
  "links",
  "works",
  "contact",
  "help"
];

interface State {
  commands: string[];
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      commands: DEFAULT_COMMANDS
    };
    this.onExec = this.onExec.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onExec(command: string) {
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
    if (selection.type !== "Range") {
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
            onExec={this.onExec}
            onClear={this.onClear}
          />
        </Main>
      </div>
    );
  }
}

export default App;
