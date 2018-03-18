import * as React from "react";
import "./Main.css";

class Main extends React.Component {
  render() {
    return <main className="Main">{this.props.children}</main>;
  }
}

export { Main };
