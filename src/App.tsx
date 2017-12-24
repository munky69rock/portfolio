import * as React from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Terminal } from './components/Terminal';

const DEFAULT_COMMANDS = [
  'github',
  'sns',
  'works',
  'help'
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
  }

  onExec(command: string) {
    this.setState((state) => {
      state.commands.push(command);
      return state;
    });
  }

  onClear() {
    this.setState({ commands: [] });
  }

  render() {
    return (
      <div>
        <Header />
        <Main>
          <Terminal commands={this.state.commands} onExec={this.onExec} onClear={this.onClear} />
        </Main>
      </div>
    );
  }
}

export default App;
