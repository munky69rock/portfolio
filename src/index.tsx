import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import { ConsoleApp } from "./models/Console";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
new ConsoleApp().start();
registerServiceWorker();
