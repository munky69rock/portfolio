import { CommandSet, Executable } from './Command';

/* tslint:disable:no-console */
class ConsoleApp {
    start() {
        console.log('%cWelcome to MUNKY69ROCK site.', 'font-weight: bold;');
        console.log('Enter commands:');
        CommandSet.instance.all().forEach(command => {
            if (window[command.name]) {
                console.log(`${command.name} is already assigned`);
                return;
            }
            let result: Executable = command.exec([]);
            if (typeof result !== 'string') {
                result = this.extractText(result as JSX.Element);
            }
            window[command.name] = result;
        });
        console.log(`%c${CommandSet.instance.allNames().join(', ')}`, 'color: #666;');
    }

    extractText(elem: JSX.Element): String {
        if (!elem.props) {
            return '';
        }
        if (Array.isArray(elem.props.children)) {
            return elem.props.children.map((child: JSX.Element) => {
                return this.extractText(child);
            }).join('\n');
        }
        if (elem.type === 'br') {
            return '';
        }
        if (elem.type === 'a') {
            return `${elem.props.children}: ${elem.props.href}`;
        }
        if (elem.type === 'p') {
            return `${elem.props.children}`;
        }
        if (typeof elem.props.children === 'string') {
            return elem.props.children;
        }
        if (elem.props.children.type === 'a') {
            return `${elem.props.children.props.children}: ${elem.props.children.props.href}`;
        }
        if (elem.props.children.type === 'p') {
            return `${elem.props.children.props.children}`;
        }
        return this.extractText(elem.props.children);
    }
}

export { ConsoleApp };