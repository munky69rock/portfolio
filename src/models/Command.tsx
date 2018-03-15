import * as React from 'react';

type Executable = null | String | JSX.Element;

interface Command {
    name: string;
    exec(args: string[]): Executable;
}

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
        if (!this.commands) {
            this.commands = {
                [command.name]: command
            };
        } else {
            this.commands[command.name] = command;
        }
    }

    private constructor() { }
}

CommandSet.instance.addAll([
    {
        name: 'ls',
        exec(): string {
            return '.';
        }
    },
    {
        name: 'help',
        exec(): string {
            return `available commands: ${CommandSet.instance.allNames().join(', ')}`;
        }
    },
    {
        name: 'whoami',
        exec(): JSX.Element {
            const plainTextStyle = { margin: '0 0 .25rem' };
            const indentedTextStyle = { margin: '0 0 .25rem 1rem' };
            return (
                <div>
                    <p style={plainTextStyle}>Name: Masayuki Uehara</p>
                    <p style={plainTextStyle}>Title: Freelance Engineer (Frontend, Backend,
                        Native App(iOS, Android), Deep Learning etc...)</p>
                    <p style={plainTextStyle}>Specs:</p>
                    <p style={indentedTextStyle}>Languages: Ruby, Python, Perl, JavaScript, Swift, Java etc...</p>
                    <p style={indentedTextStyle}>Other Stacks: git, vim, MySQL, PostgreSQL, Docker, AWS etc...</p>
                </div>
            );
        }
    },
    {
        name: 'github',
        exec(): JSX.Element {
            return (
                <div>
                    <a href="https://github.com/munky69rock">munky69rock</a>
                </div>
            );
        }
    },
    {
        name: 'sns',
        exec(): JSX.Element {
            return (
                <div>
                    <a href="https://twitter.com/munky69rock">twitter</a>
                    <a href="https://www.facebook.com/munky69rock">facebook</a>
                    <a href="https://qiita.com/munky69rock">qiita</a>
                    <a href="https://www.wantedly.com/users/16629">wantedly</a>
                </div>
            );
        }
    },
    {
        name: 'works',
        exec(): JSX.Element {
            return (
                <div>
                    <a href="https://mnist.munky.work">mnist.munky.work</a>
                </div>
            );
        }
    },
    {
        name: 'contact',
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