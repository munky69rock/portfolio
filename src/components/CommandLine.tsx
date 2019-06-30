import * as React from "react";
import { UserInput } from "../models/Command";
import "./CommandLine.css";

interface IProps {
  input: UserInput;
  isCalled: boolean;
  onCall(command: string): void;
  onClear(): void;
}

interface IState {
  value: string;
}

class CommandLine extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { value: this.props.input.value };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (this.state.value === "clear") {
      this.props.onClear();
    } else {
      this.props.onCall(this.state.value.replace(/^\s+|\s+$/, ""));
    }
    this.setState({ value: "" });
  }

  handleKeyEvent(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Tab") {
      event.preventDefault();
      // TODO: tab-completion
      return;
    }
    if (event.ctrlKey && event.key === "l") {
      this.props.onClear();
    }
  }

  render() {
    const input = this.props.input;
    const isCalled = this.props.isCalled;
    const result = isCalled ? input.call() : "";
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="CommandLine">
          <span className="Prompt">$</span>
          <input
            type="text"
            value={this.state.value}
            readOnly={isCalled}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyEvent}
            autoFocus={!isCalled}
          />
        </div>
        {result && <div className="ResultArea">{result}</div>}
      </form>
    );
  }
}

export { CommandLine };
