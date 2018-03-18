import * as React from "react";
const packageJson = require("../../package.json");
import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <header className="Header">
        <h1 className="Title">
          MUNKY.WORK <small>{packageJson.version}</small>
        </h1>
      </header>
    );
  }
}

export { Header };
