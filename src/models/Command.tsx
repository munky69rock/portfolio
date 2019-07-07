import * as React from "react";
import { Profile } from "./Profile";
import { Links } from "./Link";
import { FakeFiles } from "./File";

type Callable = null | string | JSX.Element;

interface ICommand {
  name: string;
  alias?: string[];
  call(args: string[]): Callable;
}

const PlainText = (props: { children: {}; indent?: number }) => {
  const { children, indent } = props;
  const style = { margin: "0 0 .25rem" };
  if (indent && indent > 0) {
    style.margin += ` ${indent}rem`;
  }
  return <p style={style}>{children}</p>;
};

const normalizePath = (path: string): string => {
  return path.replace(/^\.?\.\//, "");
};

const CommandSet = (() => {
  const commands = {} as { [name: string]: ICommand };

  return {
    all() {
      return this.allNames().map(name => commands[name]);
    },
    allNames(): string[] {
      return Object.keys(commands).sort();
    },
    find(command: string): ICommand | null {
      if (command in commands) {
        return commands[command];
      }
      return null;
    },
    addAll(newCommands: ICommand[]) {
      newCommands.forEach((command: ICommand) => {
        this.add(command);
      });
    },
    add(command: ICommand) {
      commands[command.name] = command;
      if (command.alias) {
        command.alias.forEach(name => (commands[name] = command));
      }
    }
  };
})();

CommandSet.addAll([
  {
    name: "welcome",
    call(): JSX.Element {
      return (
        <div>
          <PlainText>
            Available commands: {CommandSet.allNames().join(", ")}
          </PlainText>
          <PlainText>Try👇</PlainText>
        </div>
      );
    }
  },
  {
    name: "whoami",
    call(): JSX.Element {
      return (
        <div>
          <PlainText>
            <b>NAME</b>
          </PlainText>
          <PlainText indent={1}>{Profile.name}</PlainText>
          <PlainText>
            <b>TITLE</b>
          </PlainText>
          <PlainText indent={1}>
            {Profile.title}{" "}
            {Profile.company ? (
              <React.Fragment>
                @{" "}
                <a href={Profile.companyUrl} target="_blank">
                  {Profile.company}
                </a>
              </React.Fragment>
            ) : null}
          </PlainText>
          <PlainText indent={1}>
            {`(${Profile.positions.join(", ")} etc...)`}
          </PlainText>
          <PlainText>
            <b>SKILLS</b>
          </PlainText>
          <PlainText indent={1}>
            {Profile.skills.map((skill, i) => {
              const isLast = i !== Profile.skills.length - 1;
              return (
                <React.Fragment key={i}>
                  {`${skill}${isLast ? ", " : ""}`}
                  {i === 6 ? <br /> : null}
                </React.Fragment>
              );
            })}{" "}
            etc...
          </PlainText>
          <PlainText>
            <b>CONTACT</b>
          </PlainText>
          <PlainText indent={1}>
            <a href={`mailto:${Profile.contact}`}>{Profile.contact}</a>
          </PlainText>
        </div>
      );
    }
  },
  {
    name: "ls",
    call(args: string[]): JSX.Element {
      const path = args[0];
      if (args.length === 0 || normalizePath(path) === ".") {
        return (
          <div>
            <PlainText>
              {Links.values().map((l, i) => l.toHTMLAnchor(i))}
              {FakeFiles.values().map((f, i) => (
                <span style={{ marginRight: "8px" }} key={i}>
                  {f.name}
                </span>
              ))}
            </PlainText>
          </div>
        );
      }

      const target = normalizePath(path);
      const link = Links.find(target);
      if (link) {
        return (
          <PlainText>
            <a
              href={/@/.test(link.title) ? `mailto:${link.href}` : link.href}
              target="_blank"
            >
              {link.href}
            </a>
          </PlainText>
        );
      }
      const file = FakeFiles.find(target);
      if (file) {
        return <PlainText>{file.name}</PlainText>;
      }
      return <PlainText>'{path}' not found.</PlainText>;
    }
  },
  {
    name: "cd",
    call(args: string[]) {
      const path = args[0];
      if (!path) {
        return <PlainText>No dirname Specified.</PlainText>;
      }
      const link = Links.find(normalizePath(path));
      if (!link) {
        return <PlainText>'{path}' not found.</PlainText>;
      }
      location.href = link.href;
      return null;
    }
  },
  {
    name: "cat",
    call(args: string[]): JSX.Element {
      const path = args[0];
      if (!path) {
        return <PlainText>No filename Specified.</PlainText>;
      }
      const file = FakeFiles.find(normalizePath(path));
      if (!file) {
        return <PlainText>'{path}' not found.</PlainText>;
      }
      return (
        <div>
          {file.content.split("\n").map((line, i) => {
            return (
              <PlainText key={i}>
                <a
                  href={/@/.test(line) ? `mailto:${line}` : line}
                  target="_blank"
                >
                  {line}
                </a>
              </PlainText>
            );
          })}
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

  call(): Callable {
    if (!this.value) {
      return null;
    }
    const [name, ...args] = this.value.split(/\s+/);
    const command = CommandSet.find(name);
    if (command == null) {
      return `command not found: ${name}`;
    }
    return command.call(args);
  }
}

const defaultCommands = ["whoami", "ls", "cat ./works.txt", "welcome"];

export { ICommand, UserInput, CommandSet, Callable, defaultCommands };
