import * as React from "react";

type Executable = null | String | JSX.Element;

interface Command {
  name: string;
  alias?: string[];
  exec(args: string[]): Executable;
}

const PlainText = (props: { children: {}; indent?: number }) => {
  const { children, indent } = props;
  const style = { margin: "0 0 .25rem" };
  if (indent && indent > 0) {
    style.margin += ` ${indent}rem`;
  }
  return <p style={style}>{children}</p>;
};

class CommandSet {
  private static _instance: CommandSet;
  private commands: { [name: string]: Command };

  public static get instance(): CommandSet {
    if (!this._instance) {
      this._instance = new CommandSet();
    }
    return this._instance;
  }

  all(): Command[] {
    return this.allNames().map(name => this.commands[name]);
  }

  allNames(): string[] {
    return Object.keys(this.commands).sort();
  }

  find(command: string): Command | null {
    if (command in this.commands) {
      return this.commands[command];
    }
    return null;
  }

  addAll(commands: Command[]) {
    commands.forEach((command: Command) => {
      this.add(command);
    });
  }

  add(command: Command) {
    this.commands[command.name] = command;
    if (command.alias) {
      command.alias.forEach(name => (this.commands[name] = command));
    }
  }

  private constructor() {
    this.commands = {};
  }
}

CommandSet.instance.addAll([
  {
    name: "help",
    exec(): JSX.Element {
      return (
        <div>
          <PlainText>
            Available commands: {CommandSet.instance.allNames().join(", ")}
          </PlainText>
          <PlainText>Try👇</PlainText>
        </div>
      );
    }
  },
  {
    name: "whoami",
    exec(): JSX.Element {
      return (
        <div>
          <PlainText>Name: Masayuki Uehara</PlainText>
          <PlainText>
            Title: Freelance Web Engineer<br />
          </PlainText>
          <PlainText indent={1}>
            Frontend, Backend, Native App(iOS, Android), Deep Learning etc...
          </PlainText>
          <PlainText>Skills:</PlainText>
          <PlainText indent={1}>
            Ruby, Python, Perl, JavaScript, TypeScript, Swift, Java,<br />
            Solidity, React, MySQL, PostgreSQL, Docker, AWS etc...
          </PlainText>
        </div>
      );
    }
  },
  {
    name: "github",
    exec(): JSX.Element {
      return (
        <div>
          <a href="https://github.com/munky69rock">munky69rock</a>
        </div>
      );
    }
  },
  {
    name: "links",
    exec(): JSX.Element {
      return (
        <div>
          <PlainText>
            <a href="https://twitter.com/munky69rock">twitter</a>
          </PlainText>
          <PlainText>
            <a href="https://www.facebook.com/munky69rock">facebook</a>
          </PlainText>
          <PlainText>
            <a href="https://qiita.com/munky69rock">qiita</a>
          </PlainText>
          <PlainText>
            <a href="https://www.wantedly.com/users/16629">wantedly</a>
          </PlainText>
        </div>
      );
    }
  },
  {
    name: "ls",
    alias: ["works"],
    exec(): JSX.Element {
      return (
        <div>
          <PlainText>
            <a href="https://munky.work" target="_blank">https://munky.work</a>
          </PlainText>
          <PlainText>
            <a href="https://mnist.munky.work" target="_blank">https://mnist.munky.work</a>
          </PlainText>
          <PlainText>
            <a href="https://ethereum-cv.munky.work" target="_blank">https://ethereum-cv.munky.work</a>
          </PlainText>
        </div>
      );
    }
  },
  {
    name: "contact",
    exec(): JSX.Element {
      return (
        <div>
          <a href="mailto:munky69rock@gmail.com">munky69rock@gmail.com</a>
        </div>
      );
    }
  }
]);

class UserInput {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  exec(): Executable {
    if (!this.value) {
      return null;
    }
    const [name, ...args] = this.value.split(/\s+/);
    const command = CommandSet.instance.find(name);
    if (command == null) {
      return `command not found: ${name}`;
    }
    return command.exec(args);
  }
}

export { Command, UserInput, CommandSet, Executable };
