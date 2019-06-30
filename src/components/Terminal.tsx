import * as React from "react";
import { UserInput } from "../models/Command";
import { CommandLine } from "./CommandLine";

interface IProps {
  commands: string[];
  onCall(command: string): void;
  onClear(): void;
}

class Terminal extends React.Component<IProps, object> {
  render() {
    return (
      <div>
        {this.props.commands
          .map(name => new UserInput(name))
          .map((input, i) => {
            return (
              <CommandLine
                key={i}
                input={input}
                isCalled={true}
                onCall={this.props.onCall}
                onClear={this.props.onClear}
              />
            );
          })}
        <CommandLine
          input={new UserInput("")}
          isCalled={false}
          onCall={this.props.onCall}
          onClear={this.props.onClear}
        />
      </div>
    );
  }
}

export { Terminal };
