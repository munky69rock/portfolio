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
      window[command.name] = result;
    });
    console.log(`%c${CommandSet.allNames().join(", ")}`, "color: #666;");
  }

  extractText(elem: JSX.Element): String {
    if (!elem || !elem.props) {
      return "";
    }
    if (Array.isArray(elem.props.children)) {
      return elem.props.children
        .map((child: JSX.Element) => {
          return this.extractText(child);
        })
        .join("\n");
    }
    if (elem.type === "br") {
      return "";
    }
    if (elem.type === "a") {
      return `${elem.props.children}: ${elem.props.href}`;
    }
    if (elem.type === "p") {
      return `${elem.props.children}`;
    }
    if (typeof elem.props.children === "string") {
      return elem.props.children;
    }
    if (elem.props.children.type === "a") {
      return `${elem.props.children.props.children}: ${elem.props.children.props.href}`;
    }
    if (elem.props.children.type === "p") {
      return `${elem.props.children.props.children}`;
    }
    return this.extractText(elem.props.children);
  }
}

export { ConsoleApp };
