import * as React from "react";
import { UserInput } from "../models/Command";
import { CommandLine } from "./CommandLine";

interface Props {
  commands: string[];
  onExec(command: string): void;
  onClear(): void;
}

class Terminal extends React.Component<Props, object> {
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
                isExecuted={true}
                onExec={this.props.onExec}
                onClear={this.props.onClear}
              />
            );
          })}
        <CommandLine
          input={new UserInput("")}
          isExecuted={false}
          onExec={this.props.onExec}
          onClear={this.props.onClear}
        />
      </div>
    );
  }
}

export { Terminal };
