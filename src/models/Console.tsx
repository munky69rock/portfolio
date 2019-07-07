import { CommandSet, Callable } from "./Command";

/* tslint:disable:no-console */
class ConsoleApp {
  start() {
    console.log("%cWelcome to MUNKY.WORK site.", "font-weight: bold;");
    console.log("Enter commands:");
    CommandSet.allNames().forEach(name => {
      const command = CommandSet.find(name)!;
      if (window[name]) {
        console.log(`'${name}' is already assigned`);
        return;
      }
      let result: Callable = command.call([]);
      if (typeof result !== "string") {
        result = this.extractText(result as JSX.Element);
      }
      window[command.name] = (...args: string[]) =>
        this.extractText(command.call(args));
    });
    console.log(`%c${CommandSet.allNames().join(", ")}`, "color: #666;");
  }

  extractText(elem: Callable): string {
    if (typeof elem === "string") {
      return elem;
    }
    if (!elem) {
      return "";
    }
    if (Array.isArray(elem)) {
      return elem.map(e => this.extractText(e)).join("\n");
    }
    if (!elem.props || elem.type === "br") {
      return "";
    }
    if (Array.isArray(elem.props.children)) {
      return elem.props.children
        .map((child: JSX.Element) => this.extractText(child))
        .join("\n");
    }
    if (elem.type === "a") {
      return `${elem.props.children}: ${elem.props.href}`;
    }
    return this.extractText(elem.props.children);
  }
}

export { ConsoleApp };
