import * as React from 'react';
import { UserInput } from '../models/Command';

const styles = require('./CommandLine.css');

interface Props {
    input: UserInput;
    isExecuted: boolean;
    onExec(command: string): void;
    onClear(): void;
}

interface State {
    value: string;
}

class CommandLine extends React.Component<Props, State> {
    constructor(props: Props) {
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
        if (this.state.value === 'clear') {
            this.props.onClear();
        } else {
            this.props.onExec(this.state.value.replace(/^\s+|\s+$/, ''));
        }
        this.setState({ value: '' });
    }

    handleKeyEvent(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.ctrlKey && event.key === 'l') {
            this.props.onClear();
        }
    }

    render() {
        const input = this.props.input;
        const isExecuted = this.props.isExecuted;
        const result = isExecuted ? input.exec() : '';
        return (
            <form onSubmit={this.handleSubmit}>
                <div className={styles.commandLine}>
                    <span className={styles.prompt}>$</span>
                    <input
                        type="text"
                        value={this.state.value}
                        readOnly={isExecuted}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyEvent}
                        autoFocus={!isExecuted}
                    />
                </div>
                {result && <div className={styles.resultArea}>{result}</div>}
            </form>
        );
    }
}

export { CommandLine };